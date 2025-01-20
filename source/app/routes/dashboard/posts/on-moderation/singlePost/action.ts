import { redirect } from "react-router";

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
} from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type { TSerializedUser } from "~/shared/types/react";
import type { Route } from "./+types/route";

export async function action({ request, params }: Route.ActionArgs) {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN],
    },
    async (sessionUser: TSerializedUser) => {
      const postId = getIdFromParams(params);

      const existingPost = await getPostById(postId);

      if (!existingPost) {
        throw new Error("Post with such id does not exist");
      } else if (
        (existingPost && existingPost.publishedAt !== null) ||
        (existingPost && existingPost.rejectedAt !== null)
      ) {
        throw new Error("Post has been already moderated");
      }

      const formData = await request.formData();
      const action = getActionIdFromRequest(formData);

      let result;

      switch (action) {
        case ACTION_PUBLISH:
          result = await moderatePostById(
            postId,
            {
              moderatedById: sessionUser.id,
            },
            { confirmed: true }
          );
          break;

        case ACTION_REJECT:
          result = await rejectPublishPostAction(
            formData,
            postId,
            sessionUser.id
          );
          break;
      }

      if (!result) {
        throw Error("Something went wrong");
      }

      return redirect(NavigationLink.DASHBOARD_POSTS_ON_MODERATION);
    },
    {
      failureRedirect: NavigationLink.HOME,
    }
  );
}
