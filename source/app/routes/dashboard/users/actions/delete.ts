import type { TFunction } from "i18next";
import { deleteUserById, getUserById } from "~/shared/.server/repository/users";
import { logoutUser } from "~/shared/.server/services/auth";
import {
  HTTP_STATUS_CODES,
  InternalError,
} from "~/shared/.server/utils/InternalError";

import type { TSerializedUser } from "~/shared/types/react";

export const deleteUserAction = async (
  request: Request,
  userId: number,
  sessionUser: TSerializedUser,
  t: TFunction
) => {
  const existingUser = await getUserById(userId);

  if (!existingUser) {
    throw new InternalError(
      t("responseErrors.notFound"),
      HTTP_STATUS_CODES.NOT_FOUND_404
    );
  } else if (existingUser && existingUser.deletedAt !== null) {
    throw new InternalError(
      t("responseErrors.conflictDeleted"),
      HTTP_STATUS_CODES.CONFLICT_409
    );
  }

  const deletedUser = await deleteUserById(userId, sessionUser.id);

  if (userId === sessionUser.id) {
    await logoutUser(request);
  }

  return deletedUser;
};
