import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";

import { getPostBySlug } from "~/shared/.server/repository/posts";
import { getSession } from "~/shared/.server/services/session";

import { SESSION_USER_KEY } from "~/shared/constants/common";
import type { Route } from "../../+types/route";

export async function loader({ request, params }: Route.LoaderArgs) {
  if (!params.slug) {
    throw new Response("Not Found", { status: 404 });
  }

  const session = await getSession(request.headers.get("cookie"));
  const sessionUser = session.get(SESSION_USER_KEY);

  const post = await getPostBySlug(params.slug);

  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }

  const { window: serverWindow } = new JSDOM("");
  const purify = DOMPurify(serverWindow);
  const sanitizedHTML = purify.sanitize(post.content);

  return { post: { ...post, content: sanitizedHTML }, user: sessionUser };
}
