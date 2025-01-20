import { updatePostById } from "~/shared/.server/repository/posts";
import { getPostDataFromRequest } from "~/shared/.server/utils/postUtils";
import { getTagsWithNamesByPostId } from "../repository/postsToTags";
import {
  addNewTagsFromPost,
  deleteExistedTagsFromPost,
} from "../utils/postsToTagsUtils";

export const updatePostAction = async (
  formData: FormData,
  sessionUserId: number,
  postId: number,
  postSlug: string
) => {
  const { title, slug, content, tags } = getPostDataFromRequest(formData);

  const existingSlugId = postSlug.slice(-36);

  const updatedPost = await updatePostById(postId, sessionUserId, {
    title,
    slug: `${slug}-${existingSlugId}`,
    content,
  });

  if (!updatedPost) {
    throw Error("Something went wrong");
  }

  const updatedTagsArr = tags === "" ? [] : tags.split(",");

  const prevPostTags = await getTagsWithNamesByPostId(postId);

  await deleteExistedTagsFromPost(prevPostTags, updatedTagsArr, postId);

  await addNewTagsFromPost(prevPostTags, updatedTagsArr, postId, sessionUserId);

  return updatedPost;
};
