import { data } from "react-router";

import { authGate } from "~/shared/.server/services/auth";
import { getIdFromParams } from "~/shared/.server/utils/commonUtils";
import { getUserPostById } from "~/shared/.server/repository/posts";
import { getAllTags } from "~/shared/.server/repository/tags";
import { getTagsWithNamesByPostId } from "~/shared/.server/repository/postsToTags";

import { ROLE_ADMIN, ROLE_USER } from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type {
  NewSerializeFrom,
  TDBPostRecord,
  TPost,
  TSerializedUser,
  TTag,
} from "~/shared/types/react";
import type { Route } from "../../+types/route";

export async function loader({ request, params }: Route.LoaderArgs): Promise<{
  post: TPost & TDBPostRecord;
  allTags: TTag[];
}> {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN, ROLE_USER],
    },
    async (sessionUser: TSerializedUser) => {
      const postId = getIdFromParams(params);

      const post = await getUserPostById(sessionUser.id, postId);

      if (!post) {
        throw data("Not found", { status: 404 });
      }

      const postTags = await getTagsWithNamesByPostId(postId);
      const allTags = await getAllTags();

      return {
        post: {
          ...post,
          slug: post.slug.slice(0, -37),
          tags: postTags.map((tag) => tag.tagName),
        },
        allTags,
      };
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );
}

export type TLoaderData = NewSerializeFrom<typeof loader>;
