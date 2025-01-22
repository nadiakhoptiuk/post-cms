import { authGate } from "~/shared/.server/services/auth";
import { getAllUserModeratedPosts } from "~/shared/.server/repository/posts";

import { ROLE_ADMIN, ROLE_USER } from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type { Route } from "../+types/route";
import type {
  NewSerializeFrom,
  TDBPostRecord,
  TModeratedAt,
  TPost,
  TSerializedUser,
} from "~/shared/types/react";
import { getPaginationDataFromRequest } from "~/shared/.server/utils/commonUtils";

export const loader = async ({
  request,
}: Route.LoaderArgs): Promise<{
  user: TSerializedUser;
  posts: Array<TPost & TDBPostRecord & TModeratedAt>;
  pagesCount: number;
  actualPage: number;
}> => {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN, ROLE_USER],
    },
    async (sessionUser) => {
      const { page } = getPaginationDataFromRequest(request);

      const { posts, pagesCount, actualPage } = await getAllUserModeratedPosts(
        sessionUser.id,
        page
      );

      return { sessionUser, posts, pagesCount, actualPage };
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );
};

export type TLoaderData = NewSerializeFrom<typeof loader>;
