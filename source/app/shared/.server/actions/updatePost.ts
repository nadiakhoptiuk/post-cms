import { updatePostById } from "~/shared/.server/repository/posts";
import { getPostDataFromRequest } from "~/shared/.server/utils/postUtils";

export const updatePostAction = async (
  formData: FormData,
  sessionUserId: number,
  postId: number,
  postSlug: string
) => {
  const { title, slug, content } = getPostDataFromRequest(formData);

  const existingSlugId = postSlug.slice(-36);

  return await updatePostById(postId, sessionUserId, {
    title,
    slug: `${slug}-${existingSlugId}`,
    content,
  });
};
