import { authGate } from "~/shared/.server/services/auth";
import { confirmPublishPost } from "~/shared/.server/utils/postUtils";

import { ROLE_ADMIN } from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type { TSerializedUser } from "~/shared/types/react";
import type { Route } from "./+types/route";

export async function action({ request }: Route.ActionArgs) {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN],
    },
    async (sessionUser: TSerializedUser) => {
      const formData = await request.formData();
      const postId = formData.get("postId");

      if (!postId) {
        throw new Error("Post Id not found");
      }

      await confirmPublishPost(Number(postId), sessionUser.id);
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );
}
