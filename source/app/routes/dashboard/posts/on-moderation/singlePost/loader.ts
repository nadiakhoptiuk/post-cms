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
import {
  HTTP_STATUS_CODES,
  InternalError,
} from "~/shared/.server/utils/InternalError";

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
    async (_, t) => {
      const postId = getIdFromParams(params);

      const tags = getTagsWithNamesByPostId(postId);
      const post = await getPostById(postId);

      if (!post) {
        throw new InternalError(
          t("responseErrors.notFound"),
          HTTP_STATUS_CODES.NOT_FOUND_404
        );
      }

      return { post, tags };
    },
    {
      failureRedirect: NavigationLink.HOME,
    }
  );
}

export type TLoaderData = NewSerializeFrom<typeof loader>;
