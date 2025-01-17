import { deleteUserById, getUserById } from "~/shared/.server/repository/users";
import { logoutUser } from "~/shared/.server/services/auth";

import type { TSerializedUser } from "~/shared/types/react";

export const deleteUserAction = async (
  request: Request,
  userId: number,
  sessionUser: TSerializedUser
) => {
  const existingUser = await getUserById(userId);

  if (!existingUser) {
    throw new Error("User with such id does not exist");
  } else if (existingUser && existingUser.deletedAt !== null) {
    throw new Error("User has been already deleted");
  }

  const deletedUser = await deleteUserById(userId, sessionUser.id);

  if (userId === sessionUser.id) {
    await logoutUser(request);
  }

  return deletedUser;
};
