import { data, redirect, type Session } from "react-router";
import type { TFunction } from "i18next";

import {
  createNewUser,
  deleteUserById,
  getUserByEmailWithPassword,
  getUserById,
} from "../repository/users";
import { commitSession, getSession } from "./session";
import i18next from "~/shared/.server/services/i18n";

import type { GetCurrentUserOptions, GetRouteOptions } from "../types/common";
import { NavigationLink } from "~/shared/constants/navigation";
import {
  SESSION_ERROR_KEY,
  SESSION_SUCCESS_KEY,
  SESSION_USER_KEY,
} from "~/shared/constants/common";
import { getSessionUserFromRequest } from "../utils/commonUtils";
import { passwordHash, verifyUserAndSerialize } from "../utils/usersUtils";
import { errorHandler } from "../utils/errorHandler";

import type { TSerializedUser } from "~/shared/types/react";
import { HTTP_STATUS_CODES, InternalError } from "../utils/InternalError";

export const loginUser = async (request: Request): Promise<Response> => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");

  const t = await i18next.getFixedT(request);

  if (typeof email !== "string" || typeof password !== "string") {
    throw new InternalError(
      t("responseErrors.invalidField"),
      HTTP_STATUS_CODES.BAD_REQUEST_400
    );
  }

  const session = await getSession(request.headers.get("cookie"));

  const serializedUser = await verifyUserAndSerialize(email, password, t);

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

  const t = await i18next.getFixedT(request);

  if (
    typeof firstName !== "string" ||
    typeof email !== "string" ||
    typeof lastName !== "string" ||
    typeof password !== "string"
  ) {
    throw new InternalError(
      t("responseErrors.invalidField"),
      HTTP_STATUS_CODES.BAD_REQUEST_400
    );
  }

  const session = await getSession(request.headers.get("cookie"));

  const existingUser = await getUserByEmailWithPassword(email);

  if (existingUser) {
    throw new InternalError(
      t("responseErrors.conflictExisted"),
      HTTP_STATUS_CODES.CONFLICT_409
    );
  }

  const hashedPassword = await passwordHash(password);

  const newUser = await createNewUser({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  if (!newUser) {
    throw new InternalError(
      t("responseErrors.failed"),
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR_500
    );
  }

  session.set(SESSION_SUCCESS_KEY, t("notifications.success.signup"));

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

  const t = await i18next.getFixedT(request);
  session.set(SESSION_SUCCESS_KEY, t("notifications.success.logout"));

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

  const deletedUser = await deleteUserById(userId, userId);

  if (!deletedUser) {
    const t = await i18next.getFixedT(request);
    throw new InternalError(
      t("responseErrors.failed"),
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR_500
    );
  }

  const session = await getSession(request.headers.get("Cookie"));
  session.unset(SESSION_USER_KEY);

  const t = await i18next.getFixedT(request);
  session.set(SESSION_SUCCESS_KEY, t("notifications.success.deleted"));

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
    const t = await i18next.getFixedT(request);
    throw new InternalError(
      t("responseErrors.failed"),
      HTTP_STATUS_CODES.UNAUTHORIZED_401
    );
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
    // throw redirect(NavigationLink.HOME);
    const t = await i18next.getFixedT(request);
    throw new InternalError(
      t("responseErrors.forbidden"),
      HTTP_STATUS_CODES.FORBIDDEN_403
    );
  }

  return sessionUser;
};

export const publicGate = async (
  request: Request,
  routeOptions: GetRouteOptions,
  cb: (sessionUser: TSerializedUser | null, t: TFunction) => Promise<any>,
  options?: GetCurrentUserOptions
) => {
  try {
    const sessionUser = await getAuthUser(request, routeOptions, options);

    const t = await i18next.getFixedT(request, "common");

    return await cb(sessionUser, t);
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
  cb: (
    sessionUser: TSerializedUser,
    t: TFunction,
    session: Session
  ) => Promise<any>,
  options?: GetCurrentUserOptions
) => {
  try {
    const session = await getSession(request.headers.get("cookie"));
    const sessionUser = await getAuthUser(request, routeOptions, options);

    if (!sessionUser) {
      throw redirect(NavigationLink.LOGIN);
    }
    const t = await i18next.getFixedT(request, "common");

    return await cb(sessionUser, t, session);
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
