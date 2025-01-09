import { getSession } from "~/shared/.server/services/session";

import type { Route } from "../../+types/root";
import { SESSION_USER_KEY } from "~/shared/constants/common";
import { deletePostById } from "~/shared/.server/repository/posts";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const postId = formData.get("postId");

  const session = await getSession(request.headers.get("cookie"));
  const sessionUser = session.get(SESSION_USER_KEY);

  await deletePostById(Number(postId), sessionUser.id);
}
