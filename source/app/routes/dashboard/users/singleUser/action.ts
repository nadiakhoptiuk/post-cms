import { redirect } from "react-router";

import { authGate } from "~/shared/.server/services/auth";
import {
  getActionIdFromRequest,
  getIdFromParams,
} from "~/shared/.server/utils/commonUtils";
import { updateUserAction } from "../actions/update";
import { deleteUserAction } from "../actions/delete";
import { restoreUserAction } from "../actions/restore";
import { commitSession } from "~/shared/.server/services/session";

import {
  ACTION_DELETE,
  ACTION_RESTORE,
  ACTION_UPDATE,
  ROLE_ADMIN,
  SESSION_SUCCESS_KEY,
} from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import {
  HTTP_STATUS_CODES,
  InternalError,
} from "~/shared/.server/utils/InternalError";
import type { Route } from "./+types/route";

export async function action({ request, params }: Route.ActionArgs) {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN],
    },
    async (sessionUser, t, session) => {
      const userId = getIdFromParams(params, t);

      const formData = await request.formData();
      const action = getActionIdFromRequest(formData);

      let resultUser;
      let notificationMessage;

      switch (action) {
        case ACTION_DELETE:
          resultUser = await deleteUserAction(request, userId, sessionUser, t);
          notificationMessage = t("notifications.success.deleted");
          break;

        case ACTION_UPDATE:
          resultUser = await updateUserAction(formData, sessionUser, userId, t);
          notificationMessage = t("notifications.success.updated");
          break;

        case ACTION_RESTORE:
          resultUser = await restoreUserAction(userId, sessionUser, t);
          notificationMessage = t("notifications.success.restored");
          break;
      }

      if (!resultUser) {
        throw new InternalError(
          t("responseErrors.failed"),
          HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR_500
        );
      }

      session.set(SESSION_SUCCESS_KEY, notificationMessage);

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
