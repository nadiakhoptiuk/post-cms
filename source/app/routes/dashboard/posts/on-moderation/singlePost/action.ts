import { redirect } from "react-router";

import { getSession } from "~/shared/.server/services/session";
import { confirmPublishPost } from "~/shared/.server/utils/postUtils";

import { SESSION_USER_KEY } from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type { Route } from "./+types/route";

export async function action({ request, params }: Route.ActionArgs) {
  const postId = params.postId;

  if (!postId) {
    throw new Response("Not Found", { status: 404 });
  }

  const session = await getSession(request.headers.get("cookie"));
  const sessionUser = session.get(SESSION_USER_KEY);

  await confirmPublishPost(Number(postId), sessionUser.id);

  return redirect(NavigationLink.DASHBOARD_POSTS_ON_MODERATION);
}
