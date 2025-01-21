import bcrypt from "bcryptjs";
import type {
  TDBUser,
  TRolesEnum,
  TSerializedUser,
  TUserPassword,
} from "~/shared/types/react";
import { getUserByEmailWithPassword } from "../repository/users";
import { HTTP_STATUS_CODES, InternalError } from "./InternalError";
import type { TFunction } from "i18next";

export const getUserDataFromRequest = async (
  formData: FormData,
  t: TFunction
) => {
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role") as TRolesEnum;

  if (
    !role ||
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    throw new InternalError(
      t("responseErrors.invalidField"),
      HTTP_STATUS_CODES.BAD_REQUEST_400
    );
  }

  return { firstName, lastName, email, password, role };
};

export async function passwordHash(password: string): Promise<string> {
  const saltRounds = 10;

  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
}

export async function checkPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export const serializeUser = (
  user: TDBUser & TUserPassword
): TSerializedUser => {
  const { id, firstName, lastName, role } = user;

  return { firstName, lastName, role, id };
};

export const verifyPasswordAndSerialize = async (
  user: TDBUser & TUserPassword,
  enteredPassword: string,
  t: TFunction
): Promise<TSerializedUser> => {
  const isPasswordValid = await checkPassword(enteredPassword, user.password);

  if (!isPasswordValid) {
    throw new InternalError(
      t("responseErrors.invalidField"),
      HTTP_STATUS_CODES.UNAUTHORIZED_401
    );
  }

  return serializeUser(user);
};

export async function verifyUserAndSerialize(
  email: string,
  password: string,
  t: TFunction
) {
  const existingUser = await getUserByEmailWithPassword(email);

  if (!existingUser) {
    throw new InternalError(
      t("responseErrors.notFound"),
      HTTP_STATUS_CODES.NOT_FOUND_404
    );
  }

  if (existingUser && existingUser.deletedAt !== null) {
    throw new InternalError(
      t("responseErrors.deletedAccount"),
      HTTP_STATUS_CODES.NOT_FOUND_404
    );
  }

  return await verifyPasswordAndSerialize(existingUser, password, t);
}
