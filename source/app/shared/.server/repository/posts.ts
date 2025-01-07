import { db } from "server/app";
import { and, desc, eq, sql } from "drizzle-orm";
import { posts, users } from "~/database/schema";

import type { TPost } from "~/shared/types/react";

export async function createNewPost(userId: number, postData: TPost) {
  const existedUser = await db.select().from(users).where(eq(users.id, userId));

  if (!existedUser) {
    throw new Error("User with such id does not exist");
  }

  const createdPost = await db
    .insert(posts)
    .values({ ...postData, ownerId: userId })
    .returning({
      ownerId: posts.ownerId,
      title: posts.title,
      slug: posts.slug,
      content: posts.content,
    });

  console.log(createdPost);
  return createdPost;
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
    // .where(not(eq(users.deletedAt, null)))
    .orderBy(desc(posts.createdAt));

  return allPosts;
}

export async function getUserPostById(userId: number, postId: number) {
  const existedUser = await db.select().from(users).where(eq(users.id, userId));

  if (!existedUser) {
    throw new Error("User with such id does not exist");
  }

  console.log("EX US", existedUser);

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

  console.log("existedPost >>>>>>>", existedPost);

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
  userId: number,
  postId: number,
  postData: TPost
) {
  const existedUser = await db.select().from(users).where(eq(users.id, userId));

  if (!existedUser) {
    throw new Error("User with such id does not exist");
  }

  const existedPost = await db
    .select()
    .from(posts)
    .where(and(eq(posts.id, postId), eq(posts.ownerId, userId)));

  if (!existedPost) {
    throw new Error("Post with such id does not exist");
  }

  const updatedPost = await db
    .update(posts)
    .set({ ...postData, updatedAt: sql`NOW()`, updatedById: userId })
    .returning({
      id: posts.id,
      ownerId: posts.ownerId,
      title: posts.title,
      slug: posts.slug,
      content: posts.content,
      updatedAt: posts.updatedAt,
    });

  console.log(updatedPost);
  return updatedPost;
}
