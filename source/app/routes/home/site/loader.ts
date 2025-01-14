import { publicGate } from "~/shared/.server/services/auth";
import { getAllPublishedPosts } from "~/shared/.server/repository/posts";
import { getPostsWithSlicedString } from "~/shared/utils/getPostsWithSlicedString";

import type { TSerializedUser } from "~/shared/types/react";
import { NavigationLink } from "~/shared/constants/navigation";
import {
  PAGE_PARAMETER_NAME,
  ROLE_ADMIN,
  ROLE_USER,
  SEARCH_PARAMETER_NAME,
} from "~/shared/constants/common";
import type { Route } from "../+types/route";

export async function loader({ request }: Route.LoaderArgs) {
  return await publicGate(
    request,
    {
      isPublicRoute: true,
      allowedRoles: [ROLE_ADMIN, ROLE_USER],
    },
    async (sessionUser: TSerializedUser | null) => {
      const url = new URL(request.url);
      const query = url.searchParams.get(SEARCH_PARAMETER_NAME) || "";
      const page = Number(url.searchParams.get(PAGE_PARAMETER_NAME) || "1");

      const { allPosts, actualPage, pagesCount } = await getAllPublishedPosts(
        query,
        page
      );

      return {
        posts: getPostsWithSlicedString(allPosts),
        user: sessionUser,
        query,
        actualPage,
        pagesCount,
      };
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );
}
