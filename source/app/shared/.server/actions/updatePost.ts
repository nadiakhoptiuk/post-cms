import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";

import { updatePostById } from "~/shared/.server/repository/posts";
import { getPostDataFromRequest } from "~/shared/.server/utils/postUtils";
import { getTagsWithNamesByPostId } from "../repository/postsToTags";
import {
  addNewTagsFromPost,
  deleteExistedTagsFromPost,
} from "../utils/postsToTagsUtils";
import { HTTP_STATUS_CODES, InternalError } from "../utils/InternalError";
import type { TFunction } from "i18next";

export const updatePostAction = async (
  formData: FormData,
  sessionUserId: number,
  postId: number,
  postSlug: string,
  t: TFunction
) => {
  const { title, slug, content, tags } = getPostDataFromRequest(formData);

  const existingSlugId = postSlug.slice(-36);

  const { window: serverWindow } = new JSDOM("");
  const purify = DOMPurify(serverWindow);
  const sanitizedHTML = purify.sanitize(content);

  const updatedPost = await updatePostById(postId, sessionUserId, {
    title,
    slug: `${slug}-${existingSlugId}`,
    content: sanitizedHTML,
  });

  if (!updatedPost) {
    throw new InternalError(
      t("responseErrors.failed"),
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR_500
    );
  }

  const updatedTagsArr = tags === "" ? [] : tags.split(",");

  const prevPostTags = await getTagsWithNamesByPostId(postId);

  await deleteExistedTagsFromPost(prevPostTags, updatedTagsArr, postId);

  await addNewTagsFromPost(prevPostTags, updatedTagsArr, postId, sessionUserId);

  return updatedPost;
};
