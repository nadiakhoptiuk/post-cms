import type { TFunction } from "i18next";
import {
  getUserById,
  restoreUserById,
} from "~/shared/.server/repository/users";
import {
  HTTP_STATUS_CODES,
  InternalError,
} from "~/shared/.server/utils/InternalError";
import type { TSerializedUser } from "~/shared/types/react";

export const restoreUserAction = async (
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
  } else if (existingUser && existingUser.restoredAt !== null) {
    throw new InternalError(
      t("responseErrors.conflictRestored"),
      HTTP_STATUS_CODES.CONFLICT_409
    );
  }

  return await restoreUserById(userId, sessionUser.id);
};
