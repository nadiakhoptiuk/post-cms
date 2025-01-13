import { redirect } from "react-router";

import { getUserPostById } from "~/shared/.server/repository/posts";
import { getSession } from "~/shared/.server/services/session";

import { SESSION_USER_KEY } from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type { Route } from "../../+types/root";
import { getUserById } from "~/shared/.server/repository/users";
import { errorHandler } from "~/shared/.server/utils/errorHandler";

export async function loader({ request, params }: Route.LoaderArgs) {
  const postId = params.postId;
  if (!postId) {
    throw new Response("Not Found", { status: 404 });
  }

  const session = await getSession(request.headers.get("cookie"));
  const sessionUser = session.get(SESSION_USER_KEY);

  if (!sessionUser) {
    redirect(NavigationLink.LOGIN);
  }
  try {
    const existingUser = getUserById(sessionUser.id);
    if (!existingUser) {
      throw new Error("User with such id does not exist");
    }

    const post = await getUserPostById(sessionUser.id, Number(postId));

    if (!post) {
      throw new Response("Not found", { status: 404 });
    }

    return { post };
  } catch (error) {
    errorHandler(error);
  }
}
