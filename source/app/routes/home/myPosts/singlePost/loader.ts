import { data } from "react-router";

import { authGate } from "~/shared/.server/services/auth";
import { getUserPostById } from "~/shared/.server/repository/posts";

import { ROLE_ADMIN, ROLE_USER } from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type { TSerializedUser } from "~/shared/types/react";
import type { Route } from "../../+types/route";

export async function loader({ request, params }: Route.LoaderArgs) {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN, ROLE_USER],
    },
    async (sessionUser: TSerializedUser) => {
      const postId = params.postId;

      if (!postId) {
        throw data("Not Found", { status: 404 });
      }

      const post = await getUserPostById(sessionUser.id, Number(postId));

      if (!post) {
        throw data("Not found", { status: 404 });
      }

      return { post };
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );
}
