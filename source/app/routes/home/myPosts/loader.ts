import { getAllUserPostsById } from "~/shared/.server/repository/posts";
import { getPostsWithSlicedString } from "~/shared/utils/getPostsWithSlicedString";

import { ROLE_ADMIN, ROLE_USER } from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type { Route } from "../+types/route";
import { authGate } from "~/shared/.server/services/auth";
import type { TSerializedUser } from "~/shared/types/react";

export async function loader({ request }: Route.LoaderArgs) {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN, ROLE_USER],
    },
    async (sessionUser: TSerializedUser) => {
      const allUserPosts = await getAllUserPostsById(sessionUser.id);

      return {
        posts: getPostsWithSlicedString(allUserPosts),
        userId: sessionUser.id,
      };
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );
}
