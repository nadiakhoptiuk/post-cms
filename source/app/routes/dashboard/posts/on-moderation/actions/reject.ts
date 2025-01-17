import { moderatePostById } from "~/shared/.server/repository/posts";

export async function rejectPublishPostAction(
  formData: FormData,
  postId: number,
  sessionUserId: number
) {
  const reason = formData.get("reason");

  if (typeof reason !== "string") {
    throw new Error("Reason is not a string");
  }

  return await moderatePostById(
    postId,
    {
      rejectReason: reason,
      moderatedById: sessionUserId,
    },
    { confirmed: false }
  );
}
