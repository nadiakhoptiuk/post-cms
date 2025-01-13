import { redirect } from "react-router";

import { createNewPost } from "~/shared/.server/repository/posts";
import { getSession } from "~/shared/.server/services/session";

import { NavigationLink } from "~/shared/constants/navigation";
import { SESSION_USER_KEY } from "~/shared/constants/common";
import type { Route } from "../../+types/root";
import { getUserById } from "~/shared/.server/repository/users";
import { errorHandler } from "~/shared/.server/utils/errorHandler";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const content = formData.get("content");

  if (
    typeof title !== "string" ||
    typeof slug !== "string" ||
    typeof content !== "string"
  ) {
    return Response.json({
      error: "Some field is not a string",
    });
  }

  const session = await getSession(request.headers.get("cookie"));
  const sessionUser = session.get(SESSION_USER_KEY);

  if (!sessionUser || !sessionUser.id) {
    throw redirect(NavigationLink.LOGIN);
  }

  try {
    const existedUser = await getUserById(sessionUser.id);

    if (!existedUser) {
      throw new Error("User with such id does not exist");
    }

    // TODO add a functionality for generate unique id

    await createNewPost(sessionUser.id, {
      title,
      slug,
      content,
    });

    return redirect(NavigationLink.MY_POSTS);
  } catch (error: any) {
    errorHandler(error);
  }
}
