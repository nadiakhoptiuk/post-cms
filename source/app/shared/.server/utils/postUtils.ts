import { v4 as uuidv4 } from "uuid";

import { getAllPostsSlugs } from "../repository/posts";
import type {
  TPostQuery,
  TPostsToTagQuery,
  TPostToTag,
} from "~/shared/types/react";

export const getPostDataFromRequest = (formData: FormData) => {
  const title = formData.get("title");
  const slug = formData.get("slug");
  const content = formData.get("content");
  const tags = formData.get("tags");

  if (
    typeof title !== "string" ||
    typeof slug !== "string" ||
    typeof content !== "string" ||
    typeof tags !== "string"
  ) {
    throw new Error("Some field is not a string"); //TODO
  }

  return { title, slug, content, tags };
};

export const checkIfIdExists = async (id: string) => {
  const allPostsSlugs = await getAllPostsSlugs();

  return allPostsSlugs.some(({ slug }) => slug.includes(id));
};

export const generateUniqueIdForSlug = async () => {
  let id = uuidv4();

  while (await checkIfIdExists(id)) {
    id = uuidv4();
  }

  return id;
};

export const transformPostData = (post: TPostQuery) => {
  const { postsToTags, author, ...rest } = post;

  const tagsData: TPostToTag[] =
    postsToTags.length > 0
      ? postsToTags.map(({ tag, postId }: TPostsToTagQuery) => ({
          tagName: tag.name,
          tagId: tag.id,
          postId,
        }))
      : [];

  return { ...rest, tags: tagsData, author: author.fullName };
};
