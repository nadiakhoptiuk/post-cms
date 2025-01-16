import { getUserById, updateUserById } from "~/shared/.server/repository/users";
import {
  getUserDataFromRequest,
  passwordHash,
} from "~/shared/.server/utils/usersUtils";
import type { TSerializedUser } from "~/shared/types/react";

export const updateUserAction = async (
  formData: FormData,
  sessionUser: TSerializedUser,
  userId: number
) => {
  const { firstName, lastName, email, password, role } =
    await getUserDataFromRequest(formData);

  const existingUser = await getUserById(userId);

  if (!existingUser) {
    throw new Error("User with such id does not exist");
  }

  const hashedPassword = await passwordHash(password);

  return await updateUserById(userId, {
    firstName,
    lastName,
    email,
    role,
    password: hashedPassword,
    updatedById: sessionUser.id,
  });
};
