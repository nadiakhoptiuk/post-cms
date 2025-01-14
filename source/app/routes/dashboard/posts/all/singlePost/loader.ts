import { getPostById } from "~/shared/.server/repository/posts";
import type { Route } from "./+types/route";
import { authGate } from "~/shared/.server/services/auth";
import { ROLE_ADMIN } from "~/shared/constants/common";
import { data } from "react-router";
import { NavigationLink } from "~/shared/constants/navigation";

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
        throw new Error("Post id not found");
      }

      const post = await getPostById(Number(postId));

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
