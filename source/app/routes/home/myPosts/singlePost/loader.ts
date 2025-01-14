import { data } from "react-router";

import { authGate } from "~/shared/.server/services/auth";
import { getPostIdFromParams } from "~/shared/.server/utils/postUtils";
import { getUserPostById } from "~/shared/.server/repository/posts";

import { ROLE_ADMIN, ROLE_USER } from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type {
  NewSerializeFrom,
  TDBPostRecord,
  TPost,
  TSerializedUser,
} from "~/shared/types/react";
import type { Route } from "../../+types/route";

export async function loader({ request, params }: Route.LoaderArgs): Promise<{
  post: TPost & TDBPostRecord;
}> {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN, ROLE_USER],
    },
    async (sessionUser: TSerializedUser) => {
      const postId = getPostIdFromParams(params);

      const post = await getUserPostById(sessionUser.id, Number(postId));

      if (!post) {
        throw data("Not found", { status: 404 });
      }

      return { post: { ...post, slug: post.slug.slice(0, -37) } };
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );
}

export type TLoaderData = NewSerializeFrom<typeof loader>;
