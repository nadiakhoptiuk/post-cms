import { data } from "react-router";

import { getPostById } from "~/shared/.server/repository/posts";
import { authGate } from "~/shared/.server/services/auth";

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
      const postId = params.postId;
      if (!postId) {
        throw new Error("Post Id not Found");
      }

      const post = await getPostById(Number(postId));

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
