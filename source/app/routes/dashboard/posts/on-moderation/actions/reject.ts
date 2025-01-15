import { rejectPublishPost } from "~/shared/.server/utils/postUtils";

export async function rejectPublishPostAction(
  formData: FormData,
  postId: number,
  sessionUserId: number
) {
  const reason = formData.get("reason");

  if (typeof reason !== "string") {
    throw new Error("Reason is not a string");
  }

  return await rejectPublishPost(reason, postId, sessionUserId);
}
