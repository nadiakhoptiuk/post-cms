import type { TFunction } from "i18next";
import { getUserById, updateUserById } from "~/shared/.server/repository/users";
import {
  HTTP_STATUS_CODES,
  InternalError,
} from "~/shared/.server/utils/InternalError";
import {
  getUserDataFromRequest,
  passwordHash,
} from "~/shared/.server/utils/usersUtils";
import type { TSerializedUser } from "~/shared/types/react";

export const updateUserAction = async (
  formData: FormData,
  sessionUser: TSerializedUser,
  userId: number,
  t: TFunction
) => {
  const { firstName, lastName, email, password, role } =
    await getUserDataFromRequest(formData, t);

  const existingUser = await getUserById(userId);

  if (!existingUser) {
    throw new InternalError(
      t("responseErrors.notFound"),
      HTTP_STATUS_CODES.NOT_FOUND_404
    );
  }

  const hashedPassword = await passwordHash(password);

  const updatedUser = await updateUserById(userId, {
    firstName,
    lastName,
    email,
    role,
    password: hashedPassword,
    updatedById: sessionUser.id,
  });

  if (!updatedUser) {
    throw new InternalError(
      t("responseErrors.failed"),
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR_500
    );
  }

  return updatedUser;
};
