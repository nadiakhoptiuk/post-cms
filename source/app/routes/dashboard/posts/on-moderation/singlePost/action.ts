import { redirect } from "react-router";

import { authGate } from "~/shared/.server/services/auth";
import { confirmPublishPost } from "~/shared/.server/utils/postUtils";

import { ROLE_ADMIN } from "~/shared/constants/common";
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
      const postId = params.postId;
      if (!postId) {
        throw new Error("Post Id not Found");
      }

      await confirmPublishPost(Number(postId), sessionUser.id);

      return redirect(NavigationLink.DASHBOARD_POSTS_ON_MODERATION);
    },
    {
      failureRedirect: NavigationLink.HOME,
    }
  );
}
