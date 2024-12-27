import { redirect } from "@remix-run/node";
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";

import prisma from "prisma/prismaClient";
import { createNewUser, verifyUserAndSerialize } from "../repository/users";
import { serializeUser } from "./usersUtils";
import { commitSession, getSession } from "./session";

import { TSerializedUser } from "~/shared/types/remix";
import { GetCurrentUserOptions, GetRouteOptions } from "../types/common";
import { NavigationLink } from "~/shared/constants/navigation";
import { SESSION_ERROR_KEY, SESSION_USER_KEY } from "~/shared/constants/common";

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
  const { successRedirect, failureRedirect } = options || {};

  const session = await getSession(request.headers.get("cookie"));

  try {
    const serializedUser = await authenticator.authenticate(
      authenticatorKey,
      request
    );

    session.set(SESSION_USER_KEY, serializedUser);

    if (successRedirect) {
      throw redirect(successRedirect, {
        headers: { "Set-Cookie": await commitSession(session) },
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      session.set(SESSION_ERROR_KEY, error.message);

      throw redirect(failureRedirect || NavigationLink.LOGIN, {
        headers: { "Set-Cookie": await commitSession(session) },
      });
    }
  }
};

export const logoutUser = async (
  request: Request,
  options?: GetCurrentUserOptions
) => {
  const { successRedirect } = options || {};

  const session = await getSession(request.headers.get("Cookie"));
  session.unset(SESSION_USER_KEY);

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
  const sessionUser: TSerializedUser = session.get(SESSION_USER_KEY);

  if (!sessionUser && !isPublicRoute) {
    session.unset(SESSION_USER_KEY);
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
    session.unset(SESSION_USER_KEY);
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
