import bcrypt from "bcryptjs";
import type {
  TDBUser,
  TRolesEnum,
  TSerializedUser,
  TUserPassword,
} from "~/shared/types/react";
import { getUserByEmailWithPassword } from "../repository/users";

export const getUserDataFromRequest = async (formData: FormData) => {
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
    throw new Error("Some field data is not a string");
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
  enteredPassword: string
): Promise<TSerializedUser> => {
  const isPasswordValid = await checkPassword(enteredPassword, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid username or password");
  }

  return serializeUser(user);
};

export async function verifyUserAndSerialize(email: string, password: string) {
  const existingUser = await getUserByEmailWithPassword(email);

  if (!existingUser) {
    throw new Error("User with such email does not exist in database");
  }

  if (existingUser && existingUser.deletedAt !== null) {
    throw new Error("This account was deleted");
  }

  return await verifyPasswordAndSerialize(existingUser, password);
}
