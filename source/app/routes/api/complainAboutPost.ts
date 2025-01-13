import { getSession } from "~/shared/.server/services/session";

import type { Route } from "../../+types/root";
import { SESSION_USER_KEY } from "~/shared/constants/common";

import {
  complaintAboutPost,
  getOnlyAnotherUserPostById,
  getPostById,
} from "~/shared/.server/repository/posts";
import { errorHandler } from "~/shared/.server/utils/errorHandler";
import { getUserById } from "~/shared/.server/repository/users";

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

  // if (!sessionUser) {
  // TODO
  // }

  try {
    const existingUser = await getUserById(sessionUser.id);
    if (!existingUser) {
      throw new Error("User with such id does not exist");
    }

    const existingPost = await getPostById(Number(postId));
    if (!existingPost) {
      throw new Error("Post with such id does not exist");
    }

    const existingAnotherUserPost = await getOnlyAnotherUserPostById(
      sessionUser.id,
      Number(postId)
    );
    if (!existingAnotherUserPost) {
      throw new Error("Permitted operation for your own post");
    }

    await complaintAboutPost(
      Number(postId),
      { complaintReason: complaintReason },
      sessionUser.id
    );
  } catch (error) {
    errorHandler(error);
  }
}
