import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";

import { createNewUser, verifyUserAndSerialize } from "../repository/users";
import { serializeUser } from "./usersUtils";

import { TSerializedUser } from "~/shared/types/remix";
import { GetCurrentUserOptions, GetRouteOptions } from "../types/common";
import { commitSession, getSession } from "./session";
import { redirect } from "@remix-run/node";
import { NavigationLink } from "~/shared/constants/navigation";
import prisma from "prisma/prismaClient";

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

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email");
    const password = form.get("password");

    if (typeof email !== "string" || typeof password !== "string") {
      throw new Error("invalid data");
    }

    const serializedUser = await verifyUserAndSerialize(email, password);

    return serializedUser;
  }),
  "user-login"
);

export const loginUser = async (
  request: Request,
  authenticatorKey: "user-signup" | "user-login",
  options?: GetCurrentUserOptions
) => {
  const { successRedirect } = options || {};

  const serializedUser = await authenticator.authenticate(
    authenticatorKey,
    request
  );

  const session = await getSession(request.headers.get("cookie"));
  session.set("user", serializedUser);

  if (successRedirect) {
    throw redirect(successRedirect, {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }
};

export const logoutUser = async (
  request: Request,
  options?: GetCurrentUserOptions
) => {
  const { successRedirect } = options || {};

  const session = await getSession(request.headers.get("Cookie"));
  session.unset("user");

  throw redirect(successRedirect || NavigationLink.HOME, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export const getAuthUser = async (
  request: Request,
  routeOptions: GetRouteOptions,
  options?: GetCurrentUserOptions
) => {
  const { failureRedirect } = options || {};
  const { isPublicRoute, allowedRoles, allowedRoutes } = routeOptions;

  const session = await getSession(request.headers.get("Cookie"));
  const sessionUser: TSerializedUser = session.get("user");

  if (!sessionUser && !isPublicRoute) {
    session.unset("user");
    throw redirect(failureRedirect || NavigationLink.LOGIN, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  if (!sessionUser && isPublicRoute) {
    return null;
  }

  const existedUser = await prisma.user.findUnique({
    where: { id: sessionUser.id },
  });

  if (!existedUser && !isPublicRoute) {
    session.unset("user");
    throw redirect(failureRedirect || NavigationLink.LOGIN, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  if (existedUser && !allowedRoles.includes(sessionUser.role)) {
    throw redirect(allowedRoutes[sessionUser.role] || NavigationLink.HOME, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  return sessionUser;
};
