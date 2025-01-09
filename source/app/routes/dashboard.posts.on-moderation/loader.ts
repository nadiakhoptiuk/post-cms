import { redirect } from "react-router";

import { getAllPostsForModeration } from "~/shared/.server/repository/posts";
import { getSession } from "~/shared/.server/services/session";

import {
  PAGE_PARAMETER_NAME,
  SEARCH_PARAMETER_NAME,
  SESSION_USER_KEY,
} from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type { Route } from "./+types/route";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("cookie"));
  const sessionUser = session.get(SESSION_USER_KEY);

  if (!sessionUser) {
    redirect(NavigationLink.HOME);
  }

  const url = new URL(request.url);
  const query = url.searchParams.get(SEARCH_PARAMETER_NAME) || "";
  const page = Number(url.searchParams.get(PAGE_PARAMETER_NAME) || "1");

  const { allPosts, actualPage, pagesCount } = await getAllPostsForModeration(
    query,
    page
  );

  return { posts: allPosts, user: sessionUser, actualPage, pagesCount };
}
