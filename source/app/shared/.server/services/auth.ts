import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";

import { TSerializedUser } from "~/shared/types/remix";
import { createNewUser } from "../repository/users";
import { serializeUser } from "./usersUtils";

export const authenticator = new Authenticator<TSerializedUser>();

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email");
    const firstName = form.get("firstName");
    const lastName = form.get("lastName");
    const password = form.get("password");

    if (
      typeof firstName !== "string" ||
      typeof email !== "string" ||
      typeof lastName !== "string" ||
      typeof password !== "string"
    ) {
      throw new Error("invalid data");
    }

    const role = "USER";

    const createdUser = await createNewUser({
      firstName,
      lastName,
      email,
      password,
      role,
    });

    return serializeUser(createdUser);
  }),
  "user-signup"
);
