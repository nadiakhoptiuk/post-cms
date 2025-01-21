import { redirect } from "react-router";

import { authGate } from "~/shared/.server/services/auth";
import {
  getActionIdFromRequest,
  getIdFromParams,
} from "~/shared/.server/utils/commonUtils";
import { deletePostById, getPostById } from "~/shared/.server/repository/posts";
import { updatePostAction } from "~/shared/.server/actions/updatePost";
import { commitSession } from "~/shared/.server/services/session";

import {
  ACTION_DELETE,
  ACTION_UPDATE,
  ROLE_ADMIN,
  ROLE_USER,
  SESSION_SUCCESS_KEY,
} from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import {
  HTTP_STATUS_CODES,
  InternalError,
} from "~/shared/.server/utils/InternalError";
import type { Route } from "../../+types/route";

export async function action({ request, params }: Route.ActionArgs) {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN, ROLE_USER],
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
      } else if (existingPost && existingPost?.ownerId !== sessionUser.id) {
        throw new InternalError(
          t("responseErrors.forbidden"),
          HTTP_STATUS_CODES.FORBIDDEN_403
        );
      }

      let result;

      switch (action) {
        case ACTION_DELETE:
          result = await deletePostById(postId);
          break;

        case ACTION_UPDATE:
          result = await updatePostAction(
            formData,
            sessionUser.id,
            postId,
            existingPost.slug,
            t
          );
          break;
      }

      if (!result) {
        throw new InternalError(
          t("responseErrors.notFound"),
          HTTP_STATUS_CODES.NOT_FOUND_404
        );
      }

      session.set(SESSION_SUCCESS_KEY, t("notifications.success.update"));

      return redirect(NavigationLink.MY_POSTS, {
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
