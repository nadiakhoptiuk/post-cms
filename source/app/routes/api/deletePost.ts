import { redirect } from "react-router";
import { getSession } from "~/shared/.server/services/session";
import type { Route } from "../../+types/root";

import { SESSION_USER_KEY } from "~/shared/constants/common";
import { deletePostById } from "~/shared/.server/repository/posts";
import { NavigationLink } from "~/shared/constants/navigation";

export async function action({ request, params }: Route.ActionArgs) {
  if (!params.postId) {
    return new Response("Post id not Found", { status: 404 });
  }

  const session = await getSession(request.headers.get("cookie"));
  const sessionUser = session.get(SESSION_USER_KEY);

  await deletePostById(Number(params.postId), sessionUser.id);

  const url = new URL(request.url);
  const isDashboardLayout = url.pathname.includes(NavigationLink.DASHBOARD);

  return redirect(
    isDashboardLayout
      ? NavigationLink.DASHBOARD_ALL_POSTS
      : NavigationLink.MY_POSTS
  );
}
