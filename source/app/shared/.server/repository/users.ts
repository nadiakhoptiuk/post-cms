import prisma from "prisma/prismaClient";
import { passwordHash } from "../services/usersUtils";

import { TUser } from "~/shared/types/remix";

export async function createNewUser(userData: TUser) {
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
