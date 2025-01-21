import { redirect } from "react-router";

import { authGate } from "~/shared/.server/services/auth";
import {
  getActionIdFromRequest,
  getIdFromParams,
} from "~/shared/.server/utils/commonUtils";
import { deletePostById, getPostById } from "~/shared/.server/repository/posts";
import { updatePostAction } from "~/shared/.server/actions/updatePost";
import { commitSession } from "~/shared/.server/services/session";

import { NavigationLink } from "~/shared/constants/navigation";
import {
  ACTION_DELETE,
  ACTION_UPDATE,
  ROLE_ADMIN,
  SESSION_SUCCESS_KEY,
} from "~/shared/constants/common";
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
      const postId = getIdFromParams(params, t);

      const formData = await request.formData();
      const action = getActionIdFromRequest(formData);

      const existingPost = await getPostById(postId);

      if (!existingPost) {
        throw new InternalError(
          t("responseErrors.notFound"),
          HTTP_STATUS_CODES.NOT_FOUND_404
        );
      }

      let result;
      let notifyMessage;

      switch (action) {
        case ACTION_DELETE:
          result = await deletePostById(postId);
          notifyMessage = t("notifications.success.deleted");
          break;

        case ACTION_UPDATE:
          result = await updatePostAction(
            formData,
            sessionUser.id,
            postId,
            existingPost.slug,
            t
          );
          notifyMessage = t("notifications.success.updated");
          break;
      }

      if (!result) {
        throw new InternalError(
          t("responseErrors.internalError"),
          HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR_500
        );
      }

      session.set(SESSION_SUCCESS_KEY, notifyMessage);

      return redirect(NavigationLink.DASHBOARD_ALL_POSTS, {
        headers: { "Set-Cookie": await commitSession(session) },
      });
    },
    {
      failureRedirect: NavigationLink.HOME,
    }
  );
}
