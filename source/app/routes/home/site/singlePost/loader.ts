import { publicGate } from "~/shared/.server/services/auth";
import { getPostBySlug } from "~/shared/.server/repository/posts";
import { getTagsWithNamesByPostId } from "~/shared/.server/repository/postsToTags";

import { ROLE_ADMIN, ROLE_USER } from "~/shared/constants/common";
import type {
  NewSerializeFrom,
  TDBPostRecord,
  TPost,
  TPostToTag,
  TSerializedUser,
} from "~/shared/types/react";
import type { Route } from "../../+types/route";
import {
  HTTP_STATUS_CODES,
  InternalError,
} from "~/shared/.server/utils/InternalError";

export async function loader({ request, params }: Route.LoaderArgs): Promise<{
  post: TPost & TDBPostRecord & { tags: TPostToTag[] };
  user: TSerializedUser | null;
}> {
  return await publicGate(
    request,
    {
      isPublicRoute: true,
      allowedRoles: [ROLE_ADMIN, ROLE_USER],
    },
    async (sessionUser, t) => {
      if (!params.slug) {
        throw new InternalError(
          t("responseErrors.notFound"),
          HTTP_STATUS_CODES.NOT_FOUND_404
        );
      }

      const post = await getPostBySlug(params.slug);

      if (!post) {
        throw new InternalError(
          t("responseErrors.notFound"),
          HTTP_STATUS_CODES.NOT_FOUND_404
        );
      }

      const postTags = await getTagsWithNamesByPostId(post.id);

      return {
        post: { ...post, tags: postTags },
        user: sessionUser,
      };
    }
  );
}

export type TLoader = typeof loader;
export type TLoaderData = NewSerializeFrom<TLoader>;
