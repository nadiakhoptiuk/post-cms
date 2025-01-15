import {
  getUserById,
  restoreUserById,
} from "~/shared/.server/repository/users";
import type { TSerializedUser } from "~/shared/types/react";

export const restoreUserAction = async (
  userId: number,
  sessionUser: TSerializedUser
) => {
  const existingUser = await getUserById(userId);

  if (!existingUser) {
    throw new Error("User with such id does not exist");
  } else if (existingUser && existingUser.restoredAt !== null) {
    throw new Error("User has been already restored");
  }

  return await restoreUserById(userId, sessionUser.id);
};
