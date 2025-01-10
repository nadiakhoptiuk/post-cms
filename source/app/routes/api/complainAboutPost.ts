import { getSession } from "~/shared/.server/services/session";

import type { Route } from "../../+types/root";
import { SESSION_USER_KEY } from "~/shared/constants/common";

import { complaintAboutPost } from "~/shared/.server/repository/posts";
import { errorHandler } from "~/shared/.server/utils/errorHandler";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const postId = formData.get("postId");
  const complaintReason = formData.get("complaintReason");

  if (typeof postId !== "string" || typeof complaintReason !== "string") {
    return Response.json({
      error: "Reason or postId is not a string",
    });
  }

  const session = await getSession(request.headers.get("cookie"));
  const sessionUser = session.get(SESSION_USER_KEY);

  try {
    await complaintAboutPost(
      Number(postId),
      { complaintReason: complaintReason },
      sessionUser.id
    );
  } catch (error) {
    errorHandler(error);
  }
}
