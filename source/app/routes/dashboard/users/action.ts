import { data } from "react-router";
import { authGate } from "~/shared/.server/services/auth";
import { getActionIdFromRequest } from "~/shared/.server/utils/commonUtils";
import { deleteUserAction } from "./actions/delete";
import { restoreUserAction } from "./actions/restore";
import { getIdFromRequest } from "~/shared/.server/utils/commonUtils";
import { commitSession } from "~/shared/.server/services/session";

import {
  ACTION_DELETE,
  ACTION_RESTORE,
  ROLE_ADMIN,
  SESSION_SUCCESS_KEY,
} from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import {
  HTTP_STATUS_CODES,
  InternalError,
} from "~/shared/.server/utils/InternalError";
import type { Route } from "./+types/route";

export async function action({ request }: Route.ActionArgs) {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN],
    },
    async (sessionUser, t, session) => {
      const formData = await request.formData();
      const action = getActionIdFromRequest(formData);
      const userId = getIdFromRequest(formData);

      let resultUser;

      switch (action) {
        case ACTION_DELETE:
          resultUser = await deleteUserAction(request, userId, sessionUser, t);
          break;

        case ACTION_RESTORE:
          resultUser = await restoreUserAction(userId, sessionUser, t);
          break;
      }

      if (!resultUser) {
        throw new InternalError(
          t("responseErrors.failed"),
          HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR_500
        );
      }
      session.set(
        SESSION_SUCCESS_KEY,
        action === ACTION_DELETE
          ? t("notifications.success.deleted")
          : t("notifications.success.restored")
      );

      return data(
        { resultUser },
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
