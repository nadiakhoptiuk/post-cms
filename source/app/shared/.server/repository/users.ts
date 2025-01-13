import { desc, eq, ilike, or, sql } from "drizzle-orm";

import { db } from "server/app";
import { passwordHash, verifyPasswordAndSerialize } from "../utils/usersUtils";

import type {
  TSerializedUser,
  TSignupData,
  TUpdatedById,
  TUser,
  TUserPassword,
} from "~/shared/types/react";
import { users } from "~/database/schema";
import { PAGINATION_LIMIT } from "~/shared/constants/common";
import { getCountForPagination } from "../utils/commonUtils";

export async function createNewUser(userData: TSignupData & TUserPassword) {
  const { password, ...userDataWithOutPassword } = userData;

  const existedUser = await db
    .select()
    .from(users)
    .where(eq(users.email, userDataWithOutPassword.email));

  if (existedUser[0]) {
    throw new Error("User with such email is already exist in database");
  }

  const hashedPassword = await passwordHash(password);

  return await db
    .insert(users)
    .values({ ...userDataWithOutPassword, password: hashedPassword });
}

export async function verifyUserAndSerialize(email: string, password: string) {
  const existedUser = await db
    .select({
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      id: users.id,
      role: users.role,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
      password: users.password,
      deletedAt: users.deletedAt,
    })
    .from(users)
    .where(eq(users.email, email));

  if (!existedUser[0]) {
    throw new Error("User with such email does not exist in database");
  }

  if (existedUser[0] && existedUser[0].deletedAt !== null) {
    throw new Error("This account was deleted");
  }

  const serializedUser: TSerializedUser | null =
    await verifyPasswordAndSerialize(existedUser[0], password);

  if (!serializedUser) {
    throw new Error("Invalid username or password");
  }

  return serializedUser;
}

export async function getAllUsers(query: string, page: number) {
  const totalCount = await db.$count(
    users,
    or(
      ilike(users.firstName, `%${query}%`),
      ilike(users.lastName, `%${query}%`),
      ilike(users.email, `%${query}%`)
    )
  );

  if (totalCount === 0) {
    return { allUsers: [], actualPage: 1, pagesCount: 1 };
  }

  const { offset, actualPage, pagesCount } = getCountForPagination(
    totalCount,
    page
  );

  const upd = db
    .select({
      updatedBy: sql`CONCAT(${users.firstName}, ' ', ${users.lastName})`.as(
        "updatedBy"
      ),
      id: users.id,
    })
    .from(users)
    .as("upd");

  const del = db
    .select({
      deletedBy: sql`CONCAT(${users.firstName}, ' ', ${users.lastName})`.as(
        "deletedBy"
      ),
      id: users.id,
    })
    .from(users)
    .as("del");

  const allUsers = await db
    .select({
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      id: users.id,
      role: users.role,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
      updatedBy: upd.updatedBy,
      deletedAt: users.deletedAt,
      deletedBy: del.deletedBy,
    })
    .from(users)
    .where(
      or(
        ilike(users.firstName, `%${query}%`),
        ilike(users.lastName, `%${query}%`),
        ilike(users.email, `%${query}%`)
      )
    )
    .leftJoin(upd, eq(users.updatedById, upd.id))
    .leftJoin(del, eq(users.deletedById, del.id))
    .limit(PAGINATION_LIMIT)
    .offset(offset)
    .orderBy(desc(users.lastName), desc(users.firstName));

  return { allUsers, actualPage, pagesCount };
}

export async function getUserById(id: number) {
  const upd = db
    .select({
      updatedBy: sql`CONCAT(${users.firstName}, ' ', ${users.lastName})`.as(
        "updatedBy"
      ),
      id: users.id,
    })
    .from(users)
    .as("upd");

  const del = db
    .select({
      deletedBy: sql`CONCAT(${users.firstName}, ' ', ${users.lastName})`.as(
        "deletedBy"
      ),
      id: users.id,
    })
    .from(users)
    .as("del");

  const existingUser = await db
    .select({
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      id: users.id,
      role: users.role,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
      updatedBy: upd.updatedBy,
      deletedAt: users.deletedAt,
      deletedBy: del.deletedBy,
    })
    .from(users)
    .where(eq(users.id, id))
    .leftJoin(upd, eq(users.updatedById, upd.id))
    .leftJoin(del, eq(users.deletedById, del.id));

  return existingUser[0];
}

export async function updateUserById(
  id: number,
  userData: TUser & TUserPassword & TUpdatedById
) {
  const existedUser = await getUserById(id);

  if (!existedUser) {
    throw new Error("User with such id does not exist");
  }

  const { password, ...userDataWithOutPassword } = userData;

  const hashedPassword = await passwordHash(password);

  const updatedUser = await db
    .update(users)
    .set({
      ...userDataWithOutPassword,
      updatedAt: sql`NOW()`,
      password: hashedPassword,
    })
    .where(eq(users.id, id));

  return updatedUser;
}

export async function deleteUserById(id: number, deletedById: number) {
  const existedUser = await getUserById(id);

  if (!existedUser) {
    throw new Error("User with such id does not exist");
  } else if (existedUser.deletedAt !== null) {
    throw new Error("Cannot delete User which is already deleted");
  }

  const updatedUser = await db
    .update(users)
    .set({ deletedAt: sql`NOW()`, deletedById: deletedById })
    .where(eq(users.id, id))
    .returning({
      id: users.id,
      deletedAt: users.deletedAt,
      deletedById: users.deletedById,
    });

  return updatedUser[0];
}

export async function restoreUserById(id: number) {
  const existedUser = await getUserById(id);

  if (!existedUser) {
    throw new Error("User with such id does not exist");
  }

  const updatedUser = await db
    .update(users)
    .set({ deletedAt: null, deletedById: null })
    .where(eq(users.id, id))
    .returning({
      id: users.id,
      deletedAt: users.deletedAt,
      deletedById: users.deletedById,
    });

  return updatedUser[0];
}
