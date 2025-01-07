import { redirect } from "react-router";
import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";

import { getPostBySlug } from "~/shared/.server/repository/posts";
import { getSession } from "~/shared/.server/services/session";

import { SESSION_USER_KEY } from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type { Route } from "../../+types/root";

export async function loader({ request, params }: Route.LoaderArgs) {
  if (!params.slug) {
    throw new Response("Not Found", { status: 404 });
  }

  const session = await getSession(request.headers.get("cookie"));
  const sessionUser = session.get(SESSION_USER_KEY);

  if (!sessionUser) {
    redirect(NavigationLink.HOME);
  }

  const post = await getPostBySlug(params.slug);

  const { window: serverWindow } = new JSDOM("");
  const purify = DOMPurify(serverWindow);
  const sanitizedHTML = purify.sanitize(post.content);

  return { post: { ...post, content: sanitizedHTML }, user: sessionUser }; //TODO Check if I need a user here
}
