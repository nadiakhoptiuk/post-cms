import { authGate } from "~/shared/.server/services/auth";
import { getPaginationDataFromRequest } from "~/shared/.server/utils/commonUtils";
import { getAllPostsForModeration } from "~/shared/.server/repository/posts";

import { ROLE_ADMIN } from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type {
  WithPaginationData,
  WithSearchData,
} from "~/shared/.server/types/common";
import type {
  NewSerializeFrom,
  TAuthor,
  TDBPostRecord,
  TPost,
} from "~/shared/types/react";
import type { Route } from "./+types/route";

export async function loader({
  request,
}: Route.LoaderArgs): Promise<
  { posts: Array<TPost & TDBPostRecord & TAuthor> } & WithPaginationData &
    WithSearchData
> {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN],
    },
    async () => {
      const { query, page } = getPaginationDataFromRequest(request);

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

export type TLoaderData = NewSerializeFrom<typeof loader>;
