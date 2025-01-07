import { redirect } from "react-router";

import { getSession } from "~/shared/.server/services/session";
import { updatePostById } from "~/shared/.server/repository/posts";

import { NavigationLink } from "~/shared/constants/navigation";
import { SESSION_USER_KEY } from "~/shared/constants/common";
import type { Route } from "../../+types/root";

export async function action({ request, params }: Route.ActionArgs) {
  const postId = params.postId;

  if (!postId) {
    throw new Response("Not Found", { status: 404 });
  }

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
    await updatePostById(sessionUser.id, Number(postId), {
      title,
      slug,
      content,
    });

    return redirect(NavigationLink.DASHBOARD_MY_POSTS);
  } catch (error) {
    return Response.json(
      {
        error: "An unexpected error occurred",
      },
      { status: 400 }
    );
  }
}
