import { getSession } from "~/shared/.server/services/session";
import { confirmPublishPost } from "~/shared/.server/utils/postUtils";
import { errorHandler } from "~/shared/.server/utils/errorHandler";

import { SESSION_USER_KEY } from "~/shared/constants/common";
import type { Route } from "./+types/route";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const postId = formData.get("postId");

  if (!postId) {
    throw new Response("Not Found", { status: 404 });
  }

  try {
    const session = await getSession(request.headers.get("cookie"));
    const sessionUser = session.get(SESSION_USER_KEY);

    await confirmPublishPost(Number(postId), sessionUser.id);
  } catch (error) {
    console.log(error);
    errorHandler(error);
  }
}
