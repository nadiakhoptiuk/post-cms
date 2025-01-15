import { desc, eq, ilike, or, sql } from "drizzle-orm";

import { db } from "server/app";

import type {
  TSignupData,
  TUpdatedById,
  TUser,
  TUserPassword,
} from "~/shared/types/react";
import { users } from "~/database/schema";
import { PAGINATION_LIMIT } from "~/shared/constants/common";
import { getCountForPagination } from "../utils/commonUtils";
import { del, rstr, upd } from "./repositoryUtils";

export async function createNewUser(userData: TSignupData & TUserPassword) {
  return await db.insert(users).values({ ...userData });
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
      restoredAt: users.restoredAt,
      restoredBy: rstr.restoredBy,
    })
    .from(users)
    .where(eq(users.id, id))
    .leftJoin(upd, eq(users.updatedById, upd.id))
    .leftJoin(del, eq(users.deletedById, del.id))
    .leftJoin(rstr, eq(users.restoredById, rstr.id));

  return existingUser[0];
}

export async function getUserByEmailWithPassword(email: string) {
  const existingUser = await db
    .select({
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      password: users.password,
      id: users.id,
      role: users.role,
      createdAt: users.createdAt,
      deletedAt: users.deletedAt,
    })
    .from(users)
    .where(eq(users.email, email));

  return existingUser[0];
}

export async function updateUserById(
  id: number,
  userData: TUser & TUserPassword & TUpdatedById
) {
  const updatedUser = await db
    .update(users)
    .set({
      ...userData,
      updatedAt: sql`NOW()`,
    })
    .where(eq(users.id, id))
    .returning({
      id: users.id,
      updatedAt: users.updatedAt,
      updatedById: users.updatedById,
    });

  return updatedUser[0];
}

export async function deleteUserById(id: number, deletedById: number) {
  const deletedUser = await db
    .update(users)
    .set({
      deletedAt: sql`NOW()`,
      deletedById: deletedById,
      restoredAt: null,
      restoredById: null,
    })
    .where(eq(users.id, id))
    .returning({
      id: users.id,
      deletedAt: users.deletedAt,
      deletedById: users.deletedById,
    });

  return deletedUser[0];
}

export async function restoreUserById(id: number, restoredById: number) {
  const restoredUser = await db
    .update(users)
    .set({
      deletedAt: null,
      deletedById: null,
      restoredAt: sql`NOW()`,
      restoredById: restoredById,
    })
    .where(eq(users.id, id))
    .returning({
      id: users.id,
      restoredAt: users.restoredAt,
      restoredById: users.restoredById,
    });

  return restoredUser[0];
}
