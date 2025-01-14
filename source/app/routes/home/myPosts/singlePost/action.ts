import { redirect } from "react-router";

import { authGate } from "~/shared/.server/services/auth";
import {
  getPostIdFromParams,
  updatePostAction,
} from "~/shared/.server/utils/postUtils";
import { getActionIdFromRequest } from "~/shared/.server/utils/commonUtils";
import { deletePostById } from "~/shared/.server/repository/posts";

import {
  ACTION_DELETE,
  ACTION_UPDATE,
  ROLE_ADMIN,
  ROLE_USER,
} from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type { TSerializedUser } from "~/shared/types/react";
import type { Route } from "../../+types/route";

export async function action({ request, params }: Route.ActionArgs) {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN, ROLE_USER],
    },
    async (sessionUser: TSerializedUser) => {
      const postId = getPostIdFromParams(params);

      const formData = await request.formData();
      const action = await getActionIdFromRequest(formData);

      switch (action) {
        case ACTION_DELETE:
          await deletePostById(Number(postId), sessionUser.id);
          break;

        case ACTION_UPDATE:
          await updatePostAction(formData, sessionUser, Number(postId));
          break;
      }

      return redirect(NavigationLink.MY_POSTS);
    },
    {
      failureRedirect: NavigationLink.HOME,
    }
  );
}
