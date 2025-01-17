import { type Params } from "react-router";
import { v4 as uuidv4 } from "uuid";

import { getAllPostsSlugs } from "../repository/posts";

export const getPostIdFromParams = (params: Params) => {
  const postId = params?.postId;

  if (!postId) {
    throw new Error("Post Id not Found");
  }

  return Number(postId);
};

export const getPostDataFromRequest = (formData: FormData) => {
  const title = formData.get("title");
  const slug = formData.get("slug");
  const content = formData.get("content");

  if (
    typeof title !== "string" ||
    typeof slug !== "string" ||
    typeof content !== "string"
  ) {
    throw new Error("Some field is not a string");
  }

  return { title, slug, content };
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
