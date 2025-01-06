import { redirect } from "react-router";

import { getUserPostById } from "~/shared/.server/repository/posts";
import { getSession } from "~/shared/.server/services/session";

import { SESSION_USER_KEY } from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type { Route } from "./+types/route";

export async function loader({ request, params }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("cookie"));
  const sessionUser = session.get(SESSION_USER_KEY);

  if (!sessionUser) {
    redirect(NavigationLink.LOGIN);
  }

  const post = await getUserPostById(sessionUser.id, Number(params.postId));

  console.log("post", post);

  // const { window: serverWindow } = new JSDOM("");
  // const purify = DOMPurify(serverWindow);
  // const sanitizedHTML = purify.sanitize(post.content.slice(0, 100));

  // console.log({ ...post, content: sanitizedHTML });

  return { post };
}
