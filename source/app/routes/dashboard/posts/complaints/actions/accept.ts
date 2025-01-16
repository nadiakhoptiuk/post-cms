import { considerComplaint } from "~/shared/.server/repository/complaints";
import { blockPostById } from "~/shared/.server/repository/posts";

export async function acceptComplaintAction(
  complaintId: number,
  sessionUserId: number,
  postId: number
) {
  const updatedComplaint = await considerComplaint(complaintId, sessionUserId, {
    accept: true,
  });

  if (!updatedComplaint) {
    throw Error("Something went wrong");
  }

  const blockedPost = await blockPostById(postId, sessionUserId);

  if (!blockedPost) {
    throw Error("Something went wrong");
  }

  return updatedComplaint;
}
