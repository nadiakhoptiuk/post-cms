import { redirect } from "react-router";

import { createNewPost } from "~/shared/.server/repository/posts";
import { getSession } from "~/shared/.server/services/session";

import { NavigationLink } from "~/shared/constants/navigation";
import { SESSION_USER_KEY } from "~/shared/constants/common";
import type { Route } from "../../+types/root";

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
    const newPost = await createNewPost(sessionUser.id, {
      title,
      slug,
      content,
    });

    console.log(newPost);

    return redirect(
      sessionUser.role === "admin"
        ? NavigationLink.DASHBOARD_MY_POSTS
        : NavigationLink.HOME
    );
  } catch (error) {
    return Response.json(
      {
        error: "An unexpected error occurred",
      },
      { status: 400 }
    );
  }
}
