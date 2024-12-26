import bcrypt from "bcryptjs";
import { TDBUser } from "~/shared/types/remix";

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

export const serializeUser = (user: TDBUser) => {
  const { id, firstName, lastName, role } = user;

  return { firstName, lastName, role, id };
};
