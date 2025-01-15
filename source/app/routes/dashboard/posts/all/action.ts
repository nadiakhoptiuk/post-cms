import { authGate } from "~/shared/.server/services/auth";
import { getIdFromRequest } from "~/shared/.server/utils/commonUtils";
import { deletePostAction } from "./actions/delete";

import { NavigationLink } from "~/shared/constants/navigation";
import { ROLE_ADMIN } from "~/shared/constants/common";
import type { TSerializedUser } from "~/shared/types/react";
import type { Route } from "./+types/route";
import { getPostById } from "~/shared/.server/repository/posts";

export async function action({ request }: Route.ActionArgs) {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN],
    },
    async (sessionUser: TSerializedUser) => {
      const formData = await request.formData();
      const postId = getIdFromRequest(formData);

      const existingPost = await getPostById(Number(postId));

      if (!existingPost) {
        throw new Error("Post with such id does not exist");
      }

      await deletePostAction(Number(postId), sessionUser.id);
    },
    {
      failureRedirect: NavigationLink.HOME,
    }
  );
}
