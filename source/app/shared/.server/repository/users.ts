import prisma from "prisma/prismaClient";
import { passwordHash, verifyPassword } from "../services/usersUtils";

import { TSerializedUser, TUser, TUserPassword } from "~/shared/types/remix";

export async function createNewUser(userData: TUser & TUserPassword) {
  const { password, ...userDataWithOutPassword } = userData;

  const existedUser = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  });

  if (existedUser) {
    throw new Error("User with such email is already exist in database");
  }

  const hashedPassword = await passwordHash(password);

  return await prisma.user.create({
    data: { ...userDataWithOutPassword, password: hashedPassword },
  });
}

export async function verifyUserAndSerialize(email: string, password: string) {
  const existedUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!existedUser) {
    throw new Error("User with such email does not exist in database");
  }

  const serializedUser: TSerializedUser | null = await verifyPassword(
    existedUser,
    password as string
  );

  if (!serializedUser) {
    throw new Error("Invalid username or password");
  }

  return serializedUser;
}

export async function getAllUsers() {
  const users = await prisma.user.findMany({
    select: {
      firstName: true,
      lastName: true,
      email: true,
      id: true,
      createdAt: true,
      role: true,
      updatedAt: true,
    },
    orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
  });

  return users;
}
