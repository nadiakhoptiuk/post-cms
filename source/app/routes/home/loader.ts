import { getAllPublishedPosts } from "~/shared/.server/repository/posts";
import { getSession } from "~/shared/.server/services/session";
import { getPostsWithSlicedString } from "~/shared/utils/getPostsWithSlicedString";

import {
  PAGE_PARAMETER_NAME,
  SEARCH_PARAMETER_NAME,
  SESSION_USER_KEY,
} from "~/shared/constants/common";
import type { Route } from "./+types/route";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("cookie"));
  const sessionUser = session.get(SESSION_USER_KEY);

  const url = new URL(request.url);
  const query = url.searchParams.get(SEARCH_PARAMETER_NAME) || "";
  const page = Number(url.searchParams.get(PAGE_PARAMETER_NAME) || "1");

  const { allPosts, actualPage, pagesCount } = await getAllPublishedPosts(
    query,
    page
  );

  return {
    posts: getPostsWithSlicedString(allPosts),
    user: sessionUser,
    actualPage,
    pagesCount,
  };
}
