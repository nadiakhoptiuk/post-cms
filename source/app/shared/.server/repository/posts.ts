import { db } from "server/app";
import { and, desc, eq, isNotNull, sql } from "drizzle-orm";
import { posts, users } from "~/database/schema";

import type { TDBPostRecord, TPost } from "~/shared/types/react";
import { isTherePostIdInSlug } from "../utils/postUtils";
import { POST_STATUS, ROLE_ADMIN } from "~/shared/constants/common";

export async function createNewPost(userId: number, postData: TPost) {
  const existedUser = await db.select().from(users).where(eq(users.id, userId));

  if (!existedUser) {
    throw new Error("User with such id does not exist");
  }

  const createdPost = await db
    .insert(posts)
    .values({ ...postData, ownerId: userId })
    .returning({
      id: posts.id,
      ownerId: posts.ownerId,
      title: posts.title,
      slug: posts.slug,
      content: posts.content,
    });

  const newPost = await db
    .update(posts)
    .set({ slug: `${createdPost[0].slug}-${createdPost[0].id}` })
    .where(eq(posts.id, createdPost[0].id));

  return newPost;
}

export async function getAllPosts() {
  const crt = db
    .select({
      author: sql`CONCAT(${users.firstName}, ' ', ${users.lastName})`.as(
        "author"
      ),
      id: users.id,
    })
    .from(users)
    .as("crt");

  const allPosts = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      content: posts.content,
      createdAt: posts.createdAt,
      deletedAt: posts.deletedAt,
      ownerId: posts.ownerId,
      author: crt.author,
    })
    .from(posts)
    .leftJoin(crt, eq(posts.ownerId, crt.id))
    // .where(not(eq(users.deletedAt, null))) //TODO
    .orderBy(desc(posts.createdAt));

  return allPosts;
}

export async function getAllPostsForAdmin() {
  const crt = db
    .select({
      author: sql`CONCAT(${users.firstName}, ' ', ${users.lastName})`.as(
        "author"
      ),
      id: users.id,
    })
    .from(users)
    .as("crt");

  const allPosts = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      status: posts.postStatus,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
      deletedAt: posts.deletedAt,
      ownerId: posts.ownerId,
      author: crt.author,
    })
    .from(posts)
    .leftJoin(crt, eq(posts.ownerId, crt.id))
    .orderBy(desc(posts.updatedAt));

  return allPosts;
}

export async function getAllPostsForModeration() {
  const crt = db
    .select({
      author: sql`CONCAT(${users.firstName}, ' ', ${users.lastName})`.as(
        "author"
      ),
      id: users.id,
    })
    .from(users)
    .as("crt");

  const allPosts = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      content: posts.content,
      status: posts.postStatus,
      createdAt: posts.createdAt,
      deletedAt: posts.deletedAt,
      ownerId: posts.ownerId,
      author: crt.author,
    })
    .from(posts)
    .leftJoin(crt, eq(posts.ownerId, crt.id))
    .where(eq(posts.postStatus, POST_STATUS.ON_MODERATION))
    .orderBy(desc(posts.createdAt));

  return allPosts;
}

export async function getAllPostsWithComplaints() {
  const crt = db
    .select({
      author: sql`CONCAT(${users.firstName}, ' ', ${users.lastName})`.as(
        "author"
      ),
      id: users.id,
    })
    .from(users)
    .as("crt");

  const allPosts = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      content: posts.content,
      createdAt: posts.createdAt,
      complainedAt: posts.complainedAt,
      deletedAt: posts.deletedAt,
      ownerId: posts.ownerId,
      author: crt.author,
    })
    .from(posts)
    .leftJoin(crt, eq(posts.ownerId, crt.id))
    .where(and(isNotNull(posts.publishedAt), isNotNull(posts.complainedAt)))
    .orderBy(desc(posts.createdAt));

  return allPosts;
}

export async function getPostById(postId: number) {
  const crt = db
    .select({
      author: sql`CONCAT(${users.firstName}, ' ', ${users.lastName})`.as(
        "author"
      ),
      id: users.id,
    })
    .from(users)
    .as("crt");

  const existedPost = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      content: posts.content,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
      author: crt.author,
    })
    .from(posts)
    .leftJoin(crt, eq(posts.ownerId, crt.id))
    .where(eq(posts.id, postId));

  if (!existedPost) {
    throw new Error("Post with such id does not exist");
  }

  return existedPost[0];
}

export async function getUserPostById(userId: number, postId: number) {
  const existedUser = await db.select().from(users).where(eq(users.id, userId));

  if (!existedUser) {
    throw new Error("User with such id does not exist");
  }

  const existedPost = await db
    .select({
      title: posts.title,
      slug: posts.slug,
      content: posts.content,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
    })
    .from(posts)
    .where(and(eq(posts.id, postId), eq(posts.ownerId, userId)));

  if (!existedPost) {
    throw new Error("Post with such id does not exist or has another owner");
  }

  return existedPost[0];
}

export async function getPostBySlug(slug: string) {
  const crt = db
    .select({
      author: sql`CONCAT(${users.firstName}, ' ', ${users.lastName})`.as(
        "author"
      ),
      id: users.id,
    })
    .from(users)
    .as("crt");

  const upd = db
    .select({
      updatedBy: sql`CONCAT(${users.firstName}, ' ', ${users.lastName})`.as(
        "updatedBy"
      ),
      id: users.id,
    })
    .from(users)
    .as("upd");

  const existedPost = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      content: posts.content,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
      updatedById: posts.updatedById,
      updatedBy: upd.updatedBy,
      ownerId: posts.ownerId,
      author: crt.author,
    })
    .from(posts)
    .where(eq(posts.slug, slug))
    .leftJoin(crt, eq(posts.ownerId, crt.id))
    .leftJoin(upd, eq(posts.updatedById, upd.id));

  if (!existedPost) {
    throw new Error("Post with such id does not exist");
  }

  return existedPost[0];
}

export async function getAllUserPostsById(userId: number) {
  const allUserPosts = await db
    .select({
      id: posts.id,
      ownerId: posts.ownerId,
      title: posts.title,
      slug: posts.slug,
      content: posts.content,
      createdAt: posts.createdAt,
      deletedAt: posts.deletedAt,
    })
    .from(posts)
    .where(eq(posts.ownerId, userId))
    .orderBy(desc(posts.createdAt));

  return allUserPosts;
}

export async function updatePostById(
  postId: number,
  userId: number,
  postData: TPost
) {
  const existedUser = await db
    .select({ role: users.role })
    .from(users)
    .where(eq(users.id, userId));

  if (!existedUser[0]) {
    throw new Error("User with such id does not exist");
  }
  let existedPost;

  if (existedUser[0].role !== ROLE_ADMIN) {
    existedPost = await db
      .select({ slug: posts.slug })
      .from(posts)
      .where(and(eq(posts.id, postId), eq(posts.ownerId, userId)));
  } else {
    existedPost = await db
      .select({ slug: posts.slug })
      .from(posts)
      .where(and(eq(posts.id, postId)));
  }

  if (!existedPost[0]) {
    throw new Error("Post with such id does not exist");
  }

  const hasSlugId = isTherePostIdInSlug(existedPost[0].slug, postId);

  const updatedPost = await db
    .update(posts)
    .set({
      ...postData,
      slug: hasSlugId
        ? existedPost[0].slug
        : `${existedPost[0].slug}-${postId}`,
      updatedAt: sql`NOW()`,
      updatedById: userId,
    })
    .where(eq(posts.id, postId))
    .returning({
      id: posts.id,
      ownerId: posts.ownerId,
      title: posts.title,
      slug: posts.slug,
      content: posts.content,
      updatedAt: posts.updatedAt,
    });

  return updatedPost;
}

export async function moderatePostById(
  postId: number,
  postData: Partial<TPost & TDBPostRecord>,
  { confirmed }: { confirmed: boolean }
) {
  const existedPost = await db
    .select()
    .from(posts)
    .where(and(eq(posts.id, postId)));

  if (!existedPost[0]) {
    throw new Error("Post with such id does not exist");
  }

  const updatedPost = await db
    .update(posts)
    .set({
      ...postData,
      postStatus: confirmed ? "published" : "rejected",
      publishedAt: confirmed ? sql`NOW()` : null,
      rejectedAt: confirmed ? null : sql`NOW()`,
    })
    .where(eq(posts.id, postId))
    .returning();

  return updatedPost;
}

export async function deletePostById(postId: number, userId: number) {
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.id, userId));

  if (!existingUser) {
    throw new Error("User with such id does not exist");
  }
  let deletedPost;

  if (existingUser[0].role !== ROLE_ADMIN) {
    deletedPost = await db
      .delete(posts)
      .where(and(eq(posts.id, postId), eq(posts.ownerId, userId)))
      .returning({ deletedId: posts.id });
  } else {
    deletedPost = await db
      .delete(posts)
      .where(eq(posts.id, postId))
      .returning({ deletedId: posts.id });
  }

  return deletedPost[0];
}
