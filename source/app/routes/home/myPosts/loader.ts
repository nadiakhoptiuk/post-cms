import { authGate } from "~/shared/.server/services/auth";
import { getAllUserPostsById } from "~/shared/.server/repository/posts";
import { getPostsWithSlicedString } from "~/shared/utils/getPostsWithSlicedString";

import { ROLE_ADMIN, ROLE_USER } from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type {
  NewSerializeFrom,
  TDBPostRecord,
  TPost,
  TPostAdditionalFields,
  TSerializedUser,
} from "~/shared/types/react";
import type { Route } from "../+types/route";

export async function loader({ request }: Route.LoaderArgs): Promise<{
  user: TSerializedUser;
  posts: Array<TPost & TDBPostRecord & TPostAdditionalFields>;
}> {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN, ROLE_USER],
    },
    async (sessionUser) => {
      const allUserPosts = await getAllUserPostsById(sessionUser.id);

      return {
        posts: getPostsWithSlicedString(allUserPosts), //TODO sanitize
        user: sessionUser,
      };
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );
}

export type TLoaderData = NewSerializeFrom<typeof loader>;
