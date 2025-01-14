import { redirect } from "react-router";

import { getSession } from "~/shared/.server/services/session";
import { rejectPublishPost } from "~/shared/.server/utils/postUtils";
import { getPostIdFromParams } from "~/shared/.server/utils/commonUtils";

import type { Route } from "../../+types/root";
import { SESSION_USER_KEY } from "~/shared/constants/common";
import { NavigationLink } from "~/shared/constants/navigation";

export async function action({ request, params }: Route.ActionArgs) {
  const postId = getPostIdFromParams(params);

  const formData = await request.formData();
  const reason = formData.get("reason");

  if (typeof reason !== "string") {
    return Response.json({
      error: "Reason is not a string",
    });
  }

  const session = await getSession(request.headers.get("cookie"));
  const sessionUser = session.get(SESSION_USER_KEY);

  await rejectPublishPost(reason, Number(postId), sessionUser.id);

  return redirect(NavigationLink.DASHBOARD_POSTS_ON_MODERATION);
}
