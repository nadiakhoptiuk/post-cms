import { data, redirect } from "react-router";

import { authGate } from "~/shared/.server/services/auth";
import { updatePostAction } from "~/shared/.server/utils/postUtils";

import { NavigationLink } from "~/shared/constants/navigation";
import { ROLE_ADMIN } from "~/shared/constants/common";
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
        throw data("Not Found", { status: 404 });
      }

      await updatePostAction(request, sessionUser, Number(postId));

      return redirect(NavigationLink.DASHBOARD_ALL_POSTS);
    },
    {
      failureRedirect: NavigationLink.HOME,
    }
  );
}
