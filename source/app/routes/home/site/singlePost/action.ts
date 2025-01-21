import { authGate } from "~/shared/.server/services/auth";
import { complainAction } from "../actions/complain";
import { commitSession } from "~/shared/.server/services/session";

import {
  ROLE_ADMIN,
  ROLE_USER,
  SESSION_SUCCESS_KEY,
} from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import {
  HTTP_STATUS_CODES,
  InternalError,
} from "~/shared/.server/utils/InternalError";
import type { Route } from "./+types/route";
import { data } from "react-router";

export async function action({ request }: Route.ActionArgs) {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN, ROLE_USER],
    },
    async (sessionUser, t, session) => {
      const formData = await request.formData();

      const complainedPost = await complainAction(formData, sessionUser.id, t);

      if (!complainedPost) {
        throw new InternalError(
          t("responseErrors.notFound"),
          HTTP_STATUS_CODES.NOT_FOUND_404
        );
      }

      session.set(SESSION_SUCCESS_KEY, t("notifications.success.sent"));

      return data(
        { complainedPost },
        {
          headers: {
            "Set-Cookie": await commitSession(session),
          },
        }
      );
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );
}
