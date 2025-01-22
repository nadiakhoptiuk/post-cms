import { redirect } from "react-router";

import { authGate } from "~/shared/.server/services/auth";
import {
  getActionIdFromRequest,
  getIdFromParams,
} from "~/shared/.server/utils/commonUtils";
import { updateTagAction } from "./actions/update";
import { deleteTagById, getTagById } from "~/shared/.server/repository/tags";
import { commitSession } from "~/shared/.server/services/session";

import {
  ACTION_DELETE,
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
      const tagId = getIdFromParams(params, t);

      const formData = await request.formData();
      const action = getActionIdFromRequest(formData);

      const existingTag = await getTagById(tagId);

      if (!existingTag) {
        throw new InternalError(
          t("responseErrors.notFound"),
          HTTP_STATUS_CODES.NOT_FOUND_404
        );
      }

      let result;
      let notifyMessage;

      switch (action) {
        case ACTION_DELETE:
          result = await deleteTagById(tagId);
          notifyMessage = t("notifications.success.deleted");
          break;

        case ACTION_UPDATE:
          result = await updateTagAction(formData, sessionUser.id, tagId);
          notifyMessage = t("notifications.success.updated");
          break;
      }

      if (!result) {
        throw new InternalError(
          t("responseErrors.failed"),
          HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR_500
        );
      }

      session.set(SESSION_SUCCESS_KEY, notifyMessage);

      return redirect(NavigationLink.DASHBOARD_TAGS, {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    },
    {
      failureRedirect: NavigationLink.HOME,
    }
  );
}
