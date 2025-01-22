import { data } from "react-router";

import { commitSession } from "~/shared/.server/services/session";
import { authGate } from "~/shared/.server/services/auth";
import {
  getActionIdFromRequest,
  getIdFromRequest,
} from "~/shared/.server/utils/commonUtils";
import {
  getPostById,
  moderatePostById,
} from "~/shared/.server/repository/posts";
import { rejectPublishPostAction } from "./actions/reject";

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

export async function action({ request }: Route.ActionArgs) {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN],
    },
    async (sessionUser, t, session) => {
      const formData = await request.formData();
      const postId = getIdFromRequest(formData, t);

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
          t("responseErrors.conflictModerated"),
          HTTP_STATUS_CODES.CONFLICT_409
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
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );
}
