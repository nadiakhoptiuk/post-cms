import { data } from "react-router";

import { authGate } from "~/shared/.server/services/auth";
import { getIdFromParams } from "~/shared/.server/utils/commonUtils";
import { getPostById } from "~/shared/.server/repository/posts";
import { getTagsWithNamesByPostId } from "~/shared/.server/repository/postsToTags";

import { ROLE_ADMIN } from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type { Route } from "./+types/route";
import type {
  NewSerializeFrom,
  TDBPostRecord,
  TPost,
  TPostToTag,
} from "~/shared/types/react";

export async function loader({ request, params }: Route.LoaderArgs): Promise<{
  post: TPost & TDBPostRecord;
  tags: TPostToTag[];
}> {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN],
    },
    async () => {
      const postId = getIdFromParams(params);

      const tags = getTagsWithNamesByPostId(postId);
      const post = await getPostById(postId);

      if (!post) {
        throw data("Not found", { status: 404 });
      }

      return { post, tags };
    },
    {
      failureRedirect: NavigationLink.HOME,
    }
  );
}

export type TLoaderData = NewSerializeFrom<typeof loader>;
