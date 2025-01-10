import { NavigationLink } from "~/shared/constants/navigation";
import { redirect } from "react-router";

import { getSession } from "../services/session";
import { moderatePostById, updatePostById } from "../repository/posts";

import { SESSION_USER_KEY } from "~/shared/constants/common";

export const isTherePostIdInSlug = (slug: string, postId: number) => {
  const existedPostSlugAr = slug.split("-");
  const postIdInSlug = Number(existedPostSlugAr[existedPostSlugAr.length - 1]);

  const isTherePostIdInSlug = !isNaN(postIdInSlug);

  if (!isTherePostIdInSlug) return false;

  return postIdInSlug === postId;
};

export const updatePostAction = async (
  request: Request,
  postId: number,
  successRedirect: (typeof NavigationLink)[keyof typeof NavigationLink]
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
    return Response.json({
      error: "Some field is not a string",
    });
  }

  const session = await getSession(request.headers.get("cookie"));
  const sessionUser = session.get(SESSION_USER_KEY);

  if (!sessionUser || !sessionUser.id) {
    throw redirect(NavigationLink.LOGIN);
  }

  try {
    await updatePostById(Number(postId), sessionUser.id, {
      title,
      slug,
      content,
    });

    return redirect(successRedirect);
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        error: "An unexpected error occurred",
      },
      { status: 400 }
    );
  }
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
