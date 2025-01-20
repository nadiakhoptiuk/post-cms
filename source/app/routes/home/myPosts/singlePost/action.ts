import { data, redirect } from "react-router";

import { authGate } from "~/shared/.server/services/auth";
import {
  getActionIdFromRequest,
  getIdFromParams,
} from "~/shared/.server/utils/commonUtils";
import { deletePostById, getPostById } from "~/shared/.server/repository/posts";

import {
  ACTION_DELETE,
  ACTION_UPDATE,
  ROLE_ADMIN,
  ROLE_USER,
} from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type { TSerializedUser } from "~/shared/types/react";
import type { Route } from "../../+types/route";
import { updatePostAction } from "~/shared/.server/actions/updatePost";

export async function action({ request, params }: Route.ActionArgs) {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN, ROLE_USER],
    },
    async (sessionUser: TSerializedUser) => {
      const postId = getIdFromParams(params);

      const formData = await request.formData();
      const action = getActionIdFromRequest(formData);

      const existingPost = await getPostById(postId);

      if (!existingPost) {
        throw Error("Post with such id does not exists");
      } else if (existingPost && existingPost?.ownerId !== sessionUser.id) {
        throw data("Operation is permitted", { status: 403 });
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
        throw Error("Somethong went wrong");
      }

      return redirect(NavigationLink.MY_POSTS);
    },
    {
      failureRedirect: NavigationLink.HOME,
    }
  );
}
