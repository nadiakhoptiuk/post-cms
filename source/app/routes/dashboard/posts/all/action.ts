import { authGate } from "~/shared/.server/services/auth";
import { getIdFromRequest } from "~/shared/.server/utils/postUtils";
import { deletePostById } from "~/shared/.server/repository/posts";

import { NavigationLink } from "~/shared/constants/navigation";
import { ROLE_ADMIN } from "~/shared/constants/common";
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
      const postId = getIdFromRequest(formData);

      await deletePostById(Number(postId), sessionUser.id);
    },
    {
      failureRedirect: NavigationLink.HOME,
    }
  );
}
