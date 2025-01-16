import { data } from "react-router";
import { complainAboutPost } from "~/shared/.server/repository/complaints";
import {
  getOnlyAnotherUserPostById,
  getPostById,
} from "~/shared/.server/repository/posts";

export const complainAction = async (
  formData: FormData,
  sessionUserId: number
) => {
  const postId = formData.get("postId");
  const complaintReason = formData.get("complaintReason");

  if (typeof postId !== "string" || typeof complaintReason !== "string") {
    throw new Error("Reason or postId is not a string");
  }

  const existingPost = await getPostById(Number(postId));
  if (!existingPost) {
    throw data("Post with such id does not exist", { status: 404 });
  }

  const existingAnotherUserPost = await getOnlyAnotherUserPostById(
    sessionUserId,
    Number(postId)
  );
  if (!existingAnotherUserPost) {
    throw data("Permitted operation for your own post", { status: 403 });
  }

  return await complainAboutPost(
    Number(postId),
    complaintReason,
    sessionUserId
  );
};
