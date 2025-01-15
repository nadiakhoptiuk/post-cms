import { redirect } from "react-router";

import { authGate } from "~/shared/.server/services/auth";
import { getPostIdFromParams } from "~/shared/.server/utils/postUtils";
import { getActionIdFromRequest } from "~/shared/.server/utils/commonUtils";
import { updatePostAction } from "../actions/update";
import { deletePostAction } from "../actions/delete";

import { NavigationLink } from "~/shared/constants/navigation";
import {
  ACTION_DELETE,
  ACTION_UPDATE,
  ROLE_ADMIN,
} from "~/shared/constants/common";
import type { TSerializedUser } from "~/shared/types/react";
import type { Route } from "./+types/route";
import { getPostById } from "~/shared/.server/repository/posts";

export async function action({ request, params }: Route.ActionArgs) {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN],
    },
    async (sessionUser: TSerializedUser) => {
      const postId = getPostIdFromParams(params);

      const formData = await request.formData();
      const action = getActionIdFromRequest(formData);

      const existingPost = await getPostById(Number(postId));

      if (!existingPost) {
        throw new Error("Post with such id does not exist");
      }

      let result;

      switch (action) {
        case ACTION_DELETE:
          result = await deletePostAction(Number(postId), sessionUser.id);
          break;

        case ACTION_UPDATE:
          result = await updatePostAction(
            formData,
            sessionUser.id,
            Number(postId),
            existingPost.slug
          );
          break;
      }

      if (!result) {
        throw Error("Something went wrong");
      }

      return redirect(NavigationLink.DASHBOARD_ALL_POSTS);
    },
    {
      failureRedirect: NavigationLink.HOME,
    }
  );
}
