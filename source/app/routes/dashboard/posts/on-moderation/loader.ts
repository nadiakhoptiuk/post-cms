import { authGate } from "~/shared/.server/services/auth";
import { getAllPostsForModeration } from "~/shared/.server/repository/posts";

import {
  PAGE_PARAMETER_NAME,
  ROLE_ADMIN,
  SEARCH_PARAMETER_NAME,
} from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type { Route } from "./+types/route";

export async function loader({ request }: Route.LoaderArgs) {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN],
    },
    async () => {
      const url = new URL(request.url);
      const query = url.searchParams.get(SEARCH_PARAMETER_NAME) || "";
      const page = Number(url.searchParams.get(PAGE_PARAMETER_NAME) || "1");

      const { allPosts, actualPage, pagesCount } =
        await getAllPostsForModeration(query, page);

      return {
        posts: allPosts,

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
