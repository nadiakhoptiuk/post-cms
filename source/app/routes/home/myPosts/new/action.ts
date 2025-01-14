import { redirect } from "react-router";

import { authGate } from "~/shared/.server/services/auth";
import { createNewPost } from "~/shared/.server/repository/posts";
import { generateUniqueIdForSlug } from "~/shared/.server/utils/postUtils";
import { getPostDataFromRequest } from "~/shared/.server/utils/commonUtils";

import { NavigationLink } from "~/shared/constants/navigation";
import { ROLE_ADMIN, ROLE_USER } from "~/shared/constants/common";
import type { TSerializedUser } from "~/shared/types/react";
import type { Route } from "../../+types/route";

export async function action({ request }: Route.ActionArgs) {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN, ROLE_USER],
    },
    async (sessionUser: TSerializedUser) => {
      const { title, slug, content } = await getPostDataFromRequest(request);

      const idForSlug = await generateUniqueIdForSlug();

      await createNewPost(sessionUser.id, {
        title,
        slug: `${slug}-${idForSlug}`,
        content,
      });

      return redirect(NavigationLink.MY_POSTS);
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );
}
