import { getSession } from "~/shared/.server/services/session";

import type { Route } from "../../+types/root";
import { ROLE_ADMIN, SESSION_USER_KEY } from "~/shared/constants/common";
import { deletePostById } from "~/shared/.server/repository/posts";
import { getUserById } from "~/shared/.server/repository/users";
import { errorHandler } from "~/shared/.server/utils/errorHandler";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const postId = formData.get("id");

  if (typeof postId !== "string") {
    return Response.json({
      error: "PostId is not a string",
    });
  }

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
  } catch (error) {
    errorHandler(error);
  }
}
