import { data } from "react-router";
import { commitSession } from "~/shared/.server/services/session";
import {
  getActionIdFromRequest,
  getIdFromRequest,
} from "~/shared/.server/utils/commonUtils";
import { authGate } from "~/shared/.server/services/auth";
import {
  considerComplaint,
  getComplaintById,
} from "~/shared/.server/repository/complaints";
import { getPostById } from "~/shared/.server/repository/posts";

import {
  ACTION_ACCEPT,
  ACTION_REJECT,
  ROLE_ADMIN,
  SESSION_SUCCESS_KEY,
} from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type { Route } from "./+types/route";
import { acceptComplaintAction } from "./actions/accept";
import {
  HTTP_STATUS_CODES,
  InternalError,
} from "~/shared/.server/utils/InternalError";

export async function action({ request }: Route.ActionArgs) {
  return await authGate(
    request,
    { isPublicRoute: false, allowedRoles: [ROLE_ADMIN] },
    async (sessionUser, t, session) => {
      const formData = await request.formData();

      const complaintId = getIdFromRequest(formData, t);
      const existingComplaint = await getComplaintById(complaintId);

      if (existingComplaint && existingComplaint.status !== null) {
        throw new InternalError(
          t("responseErrors.conflictConsidered"),
          HTTP_STATUS_CODES.CONFLICT_409
        );
      } else if (!existingComplaint) {
        throw new InternalError(
          t("responseErrors.notFound"),
          HTTP_STATUS_CODES.NOT_FOUND_404
        );
      }

      const postId = Number(formData.get("postId"));
      const existingPost = await getPostById(postId);

      if (!existingPost) {
        throw new InternalError(
          t("responseErrors.notFound"),
          HTTP_STATUS_CODES.NOT_FOUND_404
        );
      }

      const action = getActionIdFromRequest(formData);

      let result;
      let notifyMessage;

      switch (action) {
        case ACTION_REJECT:
          result = await considerComplaint(complaintId, sessionUser.id, {
            accept: false,
          });
          notifyMessage = t("notifications.success.rejected");
          break;

        case ACTION_ACCEPT:
          result = await acceptComplaintAction(
            complaintId,
            sessionUser.id,
            postId,
            t
          );
          notifyMessage = t("notifications.success.accepted");
          break;
      }

      if (!result) {
        throw new InternalError(
          t("responseErrors.failed"),
          HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR_500
        );
      }

      session.set(SESSION_SUCCESS_KEY, notifyMessage);

      return data(
        { result },
        {
          headers: {
            "Set-Cookie": await commitSession(session),
          },
        }
      );
    },
    { failureRedirect: NavigationLink.LOGIN }
  );
}
