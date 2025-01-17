import { data } from "react-router";

import { authGate } from "~/shared/.server/services/auth";
import { getIdFromParams } from "~/shared/.server/utils/commonUtils";
import { getPostById } from "~/shared/.server/repository/posts";

import { NavigationLink } from "~/shared/constants/navigation";
import { ROLE_ADMIN } from "~/shared/constants/common";
import type {
  NewSerializeFrom,
  TDBPostRecord,
  TPost,
} from "~/shared/types/react";
import type { Route } from "./+types/route";

export async function loader({
  request,
  params,
}: Route.LoaderArgs): Promise<{ post: TDBPostRecord & TPost }> {
  return await authGate(
    request,
    {
      isPublicRoute: false,
      allowedRoles: [ROLE_ADMIN],
    },
    async () => {
      const postId = getIdFromParams(params);

      const post = await getPostById(postId);

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
