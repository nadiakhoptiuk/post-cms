import { redirect } from "react-router";

import { authGate } from "~/shared/.server/services/auth";
import { getUserDataFromRequest } from "~/shared/.server/utils/usersUtils";
import {
  createNewUser,
  getUserByEmailWithPassword,
} from "~/shared/.server/repository/users";
import { commitSession } from "~/shared/.server/services/session";

import { NavigationLink } from "~/shared/constants/navigation";
import { ROLE_ADMIN, SESSION_SUCCESS_KEY } from "~/shared/constants/common";
import type { Route } from "../+types/route";
import {
  HTTP_STATUS_CODES,
  InternalError,
} from "~/shared/.server/utils/InternalError";

export async function action({ request }: Route.ActionArgs) {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN],
    },
    async (_, t, session) => {
      const formData = await request.formData();

      const { firstName, lastName, email, password, role } =
        await getUserDataFromRequest(formData, t);

      const existingUser = await getUserByEmailWithPassword(email);

      if (existingUser) {
        throw new InternalError(
          t("responseErrors.conflictExisted"),
          HTTP_STATUS_CODES.CONFLICT_409
        );
      }

      const createdUser = await createNewUser({
        firstName,
        lastName,
        email,
        password,
        role,
      });

      if (createdUser) {
        throw new InternalError(
          t("responseErrors.failed"),
          HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR_500
        );
      }

      session.set(SESSION_SUCCESS_KEY, t("notifications.success.created"));

      return redirect(NavigationLink.DASHBOARD_USERS, {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );
}
