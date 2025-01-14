import { getSession } from "~/shared/.server/services/session";

import type { Route } from "../../+types/root";
import { SESSION_USER_KEY } from "~/shared/constants/common";

import { deleteUserById } from "~/shared/.server/repository/users";
import { errorHandler } from "~/shared/.server/utils/errorHandler";
import { deleteUserAccount } from "~/shared/.server/services/auth";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const userId = formData.get("id");

  if (typeof userId !== "string") {
    return Response.json({
      error: "PostId is not a string",
    });
  }

  const session = await getSession(request.headers.get("cookie"));
  const sessionUser = session.get(SESSION_USER_KEY);

  try {
    if (Number(userId) === sessionUser.id) {
      await deleteUserAccount(request, sessionUser);
    } else {
      await deleteUserById(Number(userId), sessionUser.id);
    }
  } catch (error) {
    errorHandler(error);
  }
}
