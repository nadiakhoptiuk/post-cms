import { redirect } from "react-router";

import { authGate } from "~/shared/.server/services/auth";
import {
  getActionIdFromRequest,
  getIdFromParams,
} from "~/shared/.server/utils/commonUtils";

import { NavigationLink } from "~/shared/constants/navigation";
import {
  ACTION_DELETE,
  ACTION_UPDATE,
  ROLE_ADMIN,
  SESSION_SUCCESS_KEY,
} from "~/shared/constants/common";
import type { TSerializedUser } from "~/shared/types/react";
import type { Route } from "./+types/route";
import { deletePostById, getPostById } from "~/shared/.server/repository/posts";
import { updatePostAction } from "~/shared/.server/actions/updatePost";
import { commitSession, getSession } from "~/shared/.server/services/session";

export async function action({ request, params }: Route.ActionArgs) {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN],
    },
    async (sessionUser: TSerializedUser) => {
      const postId = getIdFromParams(params);

      const formData = await request.formData();
      const action = getActionIdFromRequest(formData);

      const existingPost = await getPostById(postId);

      if (!existingPost) {
        throw new Error("Post with such id does not exist");
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
            existingPost.slug
          );
          break;
      }

      if (!result) {
        throw Error("Something went wrong");
      }

      const session = await getSession(request.headers.get("cookie"));
      session.set(SESSION_SUCCESS_KEY, "successfully updated");

      return redirect(NavigationLink.DASHBOARD_ALL_POSTS, {
        headers: { "Set-Cookie": await commitSession(session) },
      });
    },
    {
      failureRedirect: NavigationLink.HOME,
    }
  );
}
