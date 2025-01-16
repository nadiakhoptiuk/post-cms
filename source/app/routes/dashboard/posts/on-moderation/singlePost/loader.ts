import { data } from "react-router";

import { authGate } from "~/shared/.server/services/auth";
import { getPostIdFromParams } from "~/shared/.server/utils/postUtils";
import { getPostById } from "~/shared/.server/repository/posts";

import { ROLE_ADMIN } from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type { Route } from "./+types/route";

export async function loader({ request, params }: Route.LoaderArgs) {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN],
    },
    async () => {
      const postId = getPostIdFromParams(params);

      const post = await getPostById(postId);

      if (!post) {
        throw data("Not found", { status: 404 });
      }

      return { post };
    },
    {
      failureRedirect: NavigationLink.HOME,
    }
  );
}
