import { authGate } from "~/shared/.server/services/auth";
import { getIdFromRequest } from "~/shared/.server/utils/commonUtils";
import { deletePostById, getPostById } from "~/shared/.server/repository/posts";

import { NavigationLink } from "~/shared/constants/navigation";
import { ROLE_ADMIN } from "~/shared/constants/common";
import type { Route } from "./+types/route";

export async function action({ request }: Route.ActionArgs) {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN],
    },
    async () => {
      const formData = await request.formData();
      const postId = getIdFromRequest(formData);

      const existingPost = await getPostById(postId);

      if (!existingPost) {
        throw new Error("Post with such id does not exist");
      }

      return await deletePostById(postId);
    },
    {
      failureRedirect: NavigationLink.HOME,
    }
  );
}
