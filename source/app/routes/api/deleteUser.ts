import { redirect } from "react-router";
import { commitSession, getSession } from "~/shared/.server/services/session";

import { deleteUserById } from "~/shared/.server/repository/users";

import { NavigationLink } from "~/shared/constants/navigation";
import { SESSION_USER_KEY } from "~/shared/constants/common";
import type { Route } from "../../+types/root";

export async function action({ request, params }: Route.ActionArgs) {
  const userId = params.userId;

  const session = await getSession(request.headers.get("cookie"));
  const sessionUser = session.get(SESSION_USER_KEY);

  const deletedUser = await deleteUserById(Number(userId), sessionUser.id);

  if (!deletedUser) {
    throw new Error("something went wrong");
  }

  if (Number(userId) === sessionUser.id) {
    session.unset(SESSION_USER_KEY);

    redirect(NavigationLink.HOME, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  // return redirect(NavigationLink.DASHBOARD_USERS);
  return new Response(null, {
    status: 302,
    headers: {
      Location: NavigationLink.DASHBOARD_USERS,
    },
  });
}
