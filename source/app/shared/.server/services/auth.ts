import { data, redirect } from "react-router";

import {
  createNewUser,
  deleteUserById,
  getUserByEmailWithPassword,
  getUserById,
} from "../repository/users";
import { commitSession, getSession } from "./session";

import type { GetCurrentUserOptions, GetRouteOptions } from "../types/common";
import { NavigationLink } from "~/shared/constants/navigation";
import { SESSION_ERROR_KEY, SESSION_USER_KEY } from "~/shared/constants/common";
import { getSessionUserFromRequest } from "../utils/commonUtils";
import { errorHandler } from "../utils/errorHandler";

import type { TSerializedUser } from "~/shared/types/react";
import { passwordHash, verifyUserAndSerialize } from "../utils/usersUtils";

export const loginUser = async (request: Request): Promise<Response> => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    throw new Error("invalid data");
  }

  const session = await getSession(request.headers.get("cookie"));

  const serializedUser = await verifyUserAndSerialize(email, password);

  session.set(SESSION_USER_KEY, serializedUser);

  return redirect(NavigationLink.HOME, {
    headers: { "Set-Cookie": await commitSession(session) },
  });
};

export const signupUser = async (request: Request): Promise<Response> => {
  const formData = await request.formData();

  const email = formData.get("email");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const password = formData.get("password");

  if (
    typeof firstName !== "string" ||
    typeof email !== "string" ||
    typeof lastName !== "string" ||
    typeof password !== "string"
  ) {
    throw new Error("Invalid data");
  }

  const session = await getSession(request.headers.get("cookie"));

  const existingUser = await getUserByEmailWithPassword(email);

  if (existingUser) {
    throw new Error("User with such email has already exist in database");
  }

  const hashedPassword = await passwordHash(password);

  await createNewUser({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  return redirect(NavigationLink.LOGIN, {
    headers: { "Set-Cookie": await commitSession(session) },
  });
};

export const logoutUser = async (
  request: Request,
  options?: GetCurrentUserOptions
): Promise<Response> => {
  const { successRedirect } = options || {};

  const session = await getSession(request.headers.get("Cookie"));
  session.unset(SESSION_USER_KEY);

  return redirect(successRedirect || NavigationLink.HOME, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export const deleteUserAccount = async (
  request: Request,
  sessionUser: TSerializedUser,
  options?: GetCurrentUserOptions
): Promise<Response> => {
  const { successRedirect } = options || {};

  const userId = sessionUser.id;

  await deleteUserById(userId, userId);

  const session = await getSession(request.headers.get("Cookie"));
  session.unset(SESSION_USER_KEY);

  return redirect(successRedirect || NavigationLink.HOME, {
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
  const { isPublicRoute, allowedRoles, isAuthRoute = false } = routeOptions;

  const session = await getSession(request.headers.get("Cookie"));
  const sessionUser = await getSessionUserFromRequest(request);

  if (!sessionUser && !isPublicRoute) {
    throw redirect(failureRedirect || NavigationLink.LOGIN);
  }

  if ((!sessionUser && isAuthRoute) || (!sessionUser && isPublicRoute)) {
    return null;
  }

  const existingUser = await getUserById(sessionUser.id);

  if (!existingUser && !isPublicRoute) {
    session.unset(SESSION_USER_KEY);
    throw redirect(failureRedirect || NavigationLink.LOGIN, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  // if user has been deleted
  if (existingUser && existingUser.deletedAt !== null) {
    session.unset(SESSION_USER_KEY);
    throw redirect(NavigationLink.HOME, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  if (existingUser && isAuthRoute) {
    throw redirect(NavigationLink.HOME);
  }

  if (existingUser && !allowedRoles.includes(sessionUser.role)) {
    throw redirect(NavigationLink.HOME);
  }

  return sessionUser;
};

export const publicGate = async (
  request: Request,
  routeOptions: GetRouteOptions,
  cb: (sessionUser: TSerializedUser | null) => Promise<any>,
  options?: GetCurrentUserOptions
) => {
  try {
    const sessionUser = await getAuthUser(request, routeOptions, options);

    return await cb(sessionUser);
  } catch (error) {
    const res = errorHandler(error);

    if (res instanceof Response) {
      return res;
    }

    const session = await getSession(request.headers.get("cookie"));
    session.set(SESSION_ERROR_KEY, res.data);

    return data(res, {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }
};

export const authGate = async (
  request: Request,
  routeOptions: GetRouteOptions,
  cb: (sessionUser: TSerializedUser) => Promise<any>,
  options?: GetCurrentUserOptions
) => {
  try {
    const sessionUser = await getAuthUser(request, routeOptions, options);

    if (!sessionUser) {
      throw redirect(NavigationLink.LOGIN);
    }

    return await cb(sessionUser);
  } catch (error) {
    const res = errorHandler(error);

    if (res instanceof Response) {
      return res;
    }

    const session = await getSession(request.headers.get("cookie"));
    session.set(SESSION_ERROR_KEY, res.data);

    return data(res, {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }
};
