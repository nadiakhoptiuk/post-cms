import { redirect } from "react-router";

import { getAllPosts } from "~/shared/.server/repository/posts";
import { getSession } from "~/shared/.server/services/session";
import { getPostsWithSlicedString } from "~/shared/utils/getPostsWithSlicedString";

import { SESSION_USER_KEY } from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type { Route } from "./+types/route";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("cookie"));
  const sessionUser = session.get(SESSION_USER_KEY);

  if (!sessionUser) {
    redirect(NavigationLink.HOME);
  }

  const allPosts = await getAllPosts();

  return { posts: getPostsWithSlicedString(allPosts), user: sessionUser };
}
