import { redirect } from "react-router";

import { getSession } from "~/shared/.server/services/session";
import { getPostIdFromParams } from "~/shared/.server/utils/commonUtils";
import { deletePostById } from "~/shared/.server/repository/posts";
import { getUserById } from "~/shared/.server/repository/users";
import { errorHandler } from "~/shared/.server/utils/errorHandler";

import { ROLE_ADMIN, SESSION_USER_KEY } from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";
import type { Route } from "../../+types/root";

export async function action({ request, params }: Route.ActionArgs) {
  const postId = getPostIdFromParams(params);

  const session = await getSession(request.headers.get("cookie"));
  const sessionUser = session.get(SESSION_USER_KEY);
  // if(!sessionUser) //TODO

  try {
    const existingUser = await getUserById(sessionUser.id);

    if (!existingUser) {
      throw new Error("User with such id does not exist");
    }

    if (
      existingUser.id !== sessionUser.id &&
      existingUser.role !== ROLE_ADMIN
    ) {
      throw new Error("Access denied"); //TODO
    }

    await deletePostById(Number(postId), sessionUser.id);

    const url = new URL(request.url);
    const isDashboardLayout = url.pathname.includes(NavigationLink.DASHBOARD);

    return redirect(
      isDashboardLayout
        ? NavigationLink.DASHBOARD_ALL_POSTS
        : NavigationLink.MY_POSTS
    );
  } catch (error) {
    errorHandler(error);
  }
}
