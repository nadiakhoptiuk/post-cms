import { deletePostById } from "~/shared/.server/repository/posts";

export const deletePostAction = async (
  postId: number,
  sessionUserId: number
) => {
  return await deletePostById(postId, sessionUserId);
};
