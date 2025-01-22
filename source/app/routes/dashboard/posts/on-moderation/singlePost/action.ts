import { redirect } from "react-router";

import { commitSession } from "~/shared/.server/services/session";
import { authGate } from "~/shared/.server/services/auth";
import {
  getPostById,
  moderatePostById,
} from "~/shared/.server/repository/posts";
import {
  getActionIdFromRequest,
  getIdFromParams,
} from "~/shared/.server/utils/commonUtils";
import { rejectPublishPostAction } from "../actions/reject";

import {
  ACTION_PUBLISH,
  ACTION_REJECT,
  ROLE_ADMIN,
  SESSION_SUCCESS_KEY,
} from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type { Route } from "./+types/route";
import {
  HTTP_STATUS_CODES,
  InternalError,
} from "~/shared/.server/utils/InternalError";

export async function action({ request, params }: Route.ActionArgs) {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN],
    },
    async (sessionUser, t, session) => {
      const postId = getIdFromParams(params);

      const existingPost = await getPostById(postId);

      if (!existingPost) {
        throw new InternalError(
          t("responseErrors.notFound"),
          HTTP_STATUS_CODES.NOT_FOUND_404
        );
      } else if (
        (existingPost && existingPost.publishedAt !== null) ||
        (existingPost && existingPost.rejectedAt !== null)
      ) {
        throw new InternalError(
          t("responseErrors.conflictModerated"),
          HTTP_STATUS_CODES.CONFLICT_409
        );
      }

      const formData = await request.formData();
      const action = getActionIdFromRequest(formData);

      let result;
      let notifyMessage;

      switch (action) {
        case ACTION_PUBLISH:
          result = await moderatePostById(
            postId,
            {
              moderatedById: sessionUser.id,
            },
            { confirmed: true }
          );
          notifyMessage = t("notifications.success.published");
          break;

        case ACTION_REJECT:
          result = await rejectPublishPostAction(
            formData,
            postId,
            sessionUser.id,
            t
          );
          notifyMessage = t("notifications.success.rejected");
          break;
      }

      if (!result) {
        throw new InternalError(
          t("responseErrors.failed"),
          HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR_500
        );
      }

      session.set(SESSION_SUCCESS_KEY, notifyMessage);

      return redirect(NavigationLink.DASHBOARD_POSTS_ON_MODERATION, {
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
