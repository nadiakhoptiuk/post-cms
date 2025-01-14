import { redirect } from "react-router";

import { authGate } from "~/shared/.server/services/auth";
import { updatePostAction } from "~/shared/.server/utils/postUtils";
import { getPostIdFromParams } from "~/shared/.server/utils/commonUtils";

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
      const postId = getPostIdFromParams(params);

      await updatePostAction(request, sessionUser, Number(postId));

      return redirect(NavigationLink.DASHBOARD_ALL_POSTS);
    },
    {
      failureRedirect: NavigationLink.HOME,
    }
  );
}
