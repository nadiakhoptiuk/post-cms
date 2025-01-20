import { addTagToPost, deleteTagFromPost } from "../repository/postsToTags";
import { createNewTag, getTagByName } from "../repository/tags";

export const deleteExistedTagsFromPost = async (
  prevPostTags: Array<{
    tagName: string | null;
    postId: number;
    tagId: number;
  }>,
  updatedTagsArr: string[],
  postId: number
) => {
  const prevPostTagsNames = prevPostTags.map(({ tagName }) => tagName ?? "");

  const deletedTags = prevPostTagsNames.filter(
    (tagName) => !updatedTagsArr.includes(tagName)
  );

  if (deletedTags?.length === 0) {
    return;
  }

  const prevPostTagsIds = prevPostTags.filter(({ tagName }) =>
    deletedTags.includes(tagName as string)
  );

  for (const tag of prevPostTagsIds) {
    await deleteTagFromPost(tag.tagId, postId);
  }
  return;
};

export const addNewTagsFromPost = async (
  prevPostTags: Array<{
    tagName: string | null;
    postId: number;
    tagId: number;
  }>,
  updatedTagsArr: string[] | [],
  postId: number,
  sessionUserId: number
) => {
  const prevPostTagsNames = prevPostTags.map(({ tagName }) => tagName ?? "");

  const addedTags = updatedTagsArr.filter(
    (name) => !prevPostTagsNames.includes(name)
  );

  if (addedTags?.length === 0) {
    return;
  }

  for (const tag of addedTags) {
    const tagData = await getTagByName(tag);

    if (!tagData) {
      await createNewTag({ name: tag }, sessionUserId);
    } else {
      await addTagToPost(tagData.id, postId);
    }
  }

  return;
};
