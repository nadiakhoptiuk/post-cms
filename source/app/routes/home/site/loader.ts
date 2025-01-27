import { publicGate } from "~/shared/.server/services/auth";
import { getAllPublishedPosts } from "~/shared/.server/repository/posts";
import { getPostsWithSlicedString } from "~/shared/utils/getPostsWithSlicedString";
import { getPaginationDataFromRequest } from "~/shared/.server/utils/commonUtils";
import { transformPostData } from "~/shared/.server/utils/postUtils";

import type {
  NewSerializeFrom,
  TDBPostRecord,
  TPost,
  TPostAdditionalFields,
  TSerializedUser,
} from "~/shared/types/react";
import { NavigationLink } from "~/shared/constants/navigation";
import { ROLE_ADMIN, ROLE_USER } from "~/shared/constants/common";
import type { Route } from "../+types/route";

export async function loader({ request }: Route.LoaderArgs): Promise<{
  posts: Array<TPost & TDBPostRecord & TPostAdditionalFields>;
  user: TSerializedUser | null;
  query: string;
  actualPage: number;
  pagesCount: number;
}> {
  return await publicGate(
    request,
    {
      isPublicRoute: true,
      allowedRoles: [ROLE_ADMIN, ROLE_USER],
    },
    async (sessionUser) => {
      const { query, page } = getPaginationDataFromRequest(request);

      const { allPosts, actualPage, pagesCount } = await getAllPublishedPosts(
        query,
        page
      );

      const transformedPosts = allPosts.map((post) => {
        return transformPostData(post);
      });

      return {
        posts: getPostsWithSlicedString(transformedPosts),
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

export type TLoader = typeof loader;
export type TLoaderData = NewSerializeFrom<TLoader>;
