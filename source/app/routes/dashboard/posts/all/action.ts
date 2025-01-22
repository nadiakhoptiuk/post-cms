import { data } from "react-router";
import { authGate } from "~/shared/.server/services/auth";
import { getIdFromRequest } from "~/shared/.server/utils/commonUtils";
import { deletePostById, getPostById } from "~/shared/.server/repository/posts";
import { commitSession } from "~/shared/.server/services/session";

import { NavigationLink } from "~/shared/constants/navigation";
import { ROLE_ADMIN, SESSION_SUCCESS_KEY } from "~/shared/constants/common";
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
    async (_, t, session) => {
      const formData = await request.formData();
      const postId = getIdFromRequest(formData, t);

      const existingPost = await getPostById(postId);

      if (!existingPost) {
        throw new InternalError(
          t("responseErrors.notFound"),
          HTTP_STATUS_CODES.NOT_FOUND_404
        );
      }

      const deletedPost = await deletePostById(postId);

      if (!deletedPost) {
        throw new InternalError(
          t("responseErrors.notFound"),
          HTTP_STATUS_CODES.NOT_FOUND_404
        );
      }

      session.set(SESSION_SUCCESS_KEY, t("notifications.success.deleted"));

      return data(
        { deletedPost },
        {
          headers: {
            "Set-Cookie": await commitSession(session),
          },
        }
      );
    },
    {
      failureRedirect: NavigationLink.HOME,
    }
  );
}
