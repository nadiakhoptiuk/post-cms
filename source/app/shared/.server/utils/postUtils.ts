import { v4 as uuidv4 } from "uuid";

import { getAllPostsSlugs } from "../repository/posts";

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
    throw new Error("Some field is not a string");
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
