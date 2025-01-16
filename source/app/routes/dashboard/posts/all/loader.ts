import { authGate } from "~/shared/.server/services/auth";
import { getPaginationDataFromRequest } from "~/shared/.server/utils/commonUtils";
import { getAllPostsForAdmin } from "~/shared/.server/repository/posts";

import { ROLE_ADMIN } from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type {
  NewSerializeFrom,
  TDBPostRecord,
  TPost,
  TSerializedUser,
} from "~/shared/types/react";
import type {
  WithPaginationData,
  WithSearchData,
} from "~/shared/.server/types/common";
import type { Route } from "./+types/route";

export async function loader({ request }: Route.LoaderArgs): Promise<
  {
    posts: Array<TDBPostRecord & TPost>;
    user: TSerializedUser;
  } & WithPaginationData &
    WithSearchData
> {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN],
    },
    async (sessionUser: TSerializedUser) => {
      const { query, page } = getPaginationDataFromRequest(request);

      const { allPosts, actualPage, pagesCount } = await getAllPostsForAdmin(
        query,
        page
      );

      return {
        posts: allPosts,
        user: sessionUser,
        actualPage,
        pagesCount,
        query,
      };
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );
}

export type TLoaderData = NewSerializeFrom<typeof loader>;
