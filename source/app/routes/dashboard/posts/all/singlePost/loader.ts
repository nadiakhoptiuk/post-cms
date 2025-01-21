import { authGate } from "~/shared/.server/services/auth";
import { getIdFromParams } from "~/shared/.server/utils/commonUtils";
import { getPostById } from "~/shared/.server/repository/posts";
import { getAllTags } from "~/shared/.server/repository/tags";
import { getTagsWithNamesByPostId } from "~/shared/.server/repository/postsToTags";

import { NavigationLink } from "~/shared/constants/navigation";
import { ROLE_ADMIN } from "~/shared/constants/common";
import type {
  NewSerializeFrom,
  TDBPostRecord,
  TPost,
  TTag,
  TTagsArray,
} from "~/shared/types/react";
import type { Route } from "./+types/route";
import {
  HTTP_STATUS_CODES,
  InternalError,
} from "~/shared/.server/utils/InternalError";

export async function loader({ request, params }: Route.LoaderArgs): Promise<{
  post: TDBPostRecord & TPost & TTagsArray;
  allTags: TTag[];
}> {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN],
    },
    async (_, t) => {
      const postId = getIdFromParams(params);

      const post = await getPostById(postId);

      if (!post) {
        throw new InternalError(
          t("responseErrors.notFound"),
          HTTP_STATUS_CODES.NOT_FOUND_404
        );
      }

      const postTags = await getTagsWithNamesByPostId(postId);
      const allTags = await getAllTags();

      return {
        post: {
          ...post,
          slug: post.slug.slice(0, -37),
          tags: postTags.map((tag) => tag.tagName),
        },
        allTags: allTags,
      };
    },
    {
      failureRedirect: NavigationLink.LOGIN,
    }
  );
}

export type TLoaderData = NewSerializeFrom<typeof loader>;
