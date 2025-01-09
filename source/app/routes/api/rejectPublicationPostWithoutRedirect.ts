import { getSession } from "~/shared/.server/services/session";
import { rejectPublishPost } from "~/shared/.server/utils/postUtils";

import type { Route } from "../../+types/root";
import { SESSION_USER_KEY } from "~/shared/constants/common";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const postId = formData.get("postId");
  const reason = formData.get("reason");

  if (typeof postId !== "string" || typeof reason !== "string") {
    return Response.json({
      error: "Reason or Post Id is not a string",
    });
  }

  const session = await getSession(request.headers.get("cookie"));
  const sessionUser = session.get(SESSION_USER_KEY);

  await rejectPublishPost(reason, Number(postId), sessionUser.id);
}
