import { data } from "react-router";
import { v4 as uuidv4 } from "uuid";

import {
  getAllPostsSlugs,
  getPostById,
  moderatePostById,
  updatePostById,
} from "../repository/posts";

import type { TSerializedUser } from "~/shared/types/react";

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

export const updatePostAction = async (
  request: Request,
  sessionUser: TSerializedUser,
  postId: number
) => {
  const formData = await request.formData();

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

  const existingPost = await getPostById(postId);

  if (!existingPost || !existingPost.slug) {
    throw data("Post with such id does not exist", { status: 404 });
  }

  const existingSlugId = existingPost.slug.slice(-36);

  return await updatePostById(Number(postId), sessionUser.id, {
    title,
    slug: `${slug}-${existingSlugId}`,
    content,
  });
};

export const confirmPublishPost = async (postId: number, userId: number) => {
  return await moderatePostById(
    Number(postId),
    {
      moderatedById: userId,
    },
    { confirmed: true }
  );
};

export const rejectPublishPost = async (
  reason: string,
  postId: number,
  userId: number
) => {
  await moderatePostById(
    Number(postId),
    {
      rejectReason: reason,
      moderatedById: userId,
    },
    { confirmed: false }
  );
};
