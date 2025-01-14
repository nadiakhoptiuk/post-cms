import { data } from "react-router";
import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";

import { getPostBySlug } from "~/shared/.server/repository/posts";

import { ROLE_ADMIN, ROLE_USER } from "~/shared/constants/common";
import { publicGate } from "~/shared/.server/services/auth";
import type { TSerializedUser } from "~/shared/types/react";
import type { Route } from "../../+types/route";

export async function loader({ request, params }: Route.LoaderArgs) {
  return await publicGate(
    request,
    {
      isPublicRoute: true,
      allowedRoles: [ROLE_ADMIN, ROLE_USER],
    },
    async (sessionUser: TSerializedUser | null) => {
      if (!params.slug) {
        throw data("Not Found", { status: 404 });
      }

      const post = await getPostBySlug(params.slug);

      if (!post) {
        throw data("Not Found", { status: 404 });
      }

      const { window: serverWindow } = new JSDOM("");
      const purify = DOMPurify(serverWindow);
      const sanitizedHTML = purify.sanitize(post.content);

      return { post: { ...post, content: sanitizedHTML }, user: sessionUser };
    }
  );
}
