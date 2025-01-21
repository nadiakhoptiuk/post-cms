import { db } from "server/app";
import { and, asc, desc, eq, ilike, not, or, sql } from "drizzle-orm";
import { posts } from "~/database/schema/posts";

import type { TDBPostRecord, TPost } from "~/shared/types/react";
import { PAGINATION_LIMIT, POST_STATUS } from "~/shared/constants/common";
import { getCountForPagination } from "../utils/commonUtils";
import { crt, pbl, upd } from "./repositoryUtils";

export async function createNewPost(userId: number, postData: TPost) {
  const createdPost = await db
    .insert(posts)
    .values({
      ...postData,
      ownerId: userId,
    })
    .returning({
      id: posts.id,
      ownerId: posts.ownerId,
      title: posts.title,
      slug: posts.slug,
      content: posts.content,
    });

  return createdPost[0];
}

export async function getAllPostsSlugs() {
  return await db
    .select({
      slug: posts.slug,
    })
    .from(posts);
}

export async function getAllPublishedPosts(query: string, page: number) {
  const totalCount = await db.$count(
    posts,
    and(
      or(ilike(posts.title, `%${query}%`), ilike(posts.content, `%${query}%`)),
      eq(posts.postStatus, POST_STATUS.PUBLISHED)
    )
  );

  if (totalCount === 0) {
    return { allPosts: [], actualPage: 1, pagesCount: 1 };
  }

  const { offset, actualPage, pagesCount } = getCountForPagination(
    totalCount,
    page
  );

  const allPosts = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      status: posts.postStatus,
      content: posts.content,
      publishedAt: posts.publishedAt,
      ownerId: posts.ownerId,
      author: crt.author,
    })
    .from(posts)
    .leftJoin(crt, eq(posts.ownerId, crt.id))
    .where(
      and(
        or(
          ilike(posts.title, `%${query}%`),
          ilike(posts.content, `%${query}%`)
        ),
        eq(posts.postStatus, POST_STATUS.PUBLISHED)
      )
    )
    .limit(PAGINATION_LIMIT)
    .offset(offset)
    .orderBy(desc(posts.publishedAt));

  return { allPosts, actualPage, pagesCount };
}

export async function getAllPostsForAdmin(query: string, page: number) {
  const totalCount = await db.$count(
    posts,
    or(ilike(posts.title, `%${query}%`), ilike(posts.content, `%${query}%`))
  );

  if (totalCount === 0) {
    return { allPosts: [], actualPage: 1, pagesCount: 1 };
  }

  const { offset, actualPage, pagesCount } = getCountForPagination(
    totalCount,
    page
  );

  const allPosts = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      status: posts.postStatus,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
      ownerId: posts.ownerId,
      author: crt.author,
    })
    .from(posts)
    .where(
      or(ilike(posts.title, `%${query}%`), ilike(posts.content, `%${query}%`))
    )
    .limit(PAGINATION_LIMIT)
    .offset(offset)
    .leftJoin(crt, eq(posts.ownerId, crt.id))
    .orderBy(desc(posts.updatedAt), desc(posts.createdAt));

  return { allPosts, actualPage, pagesCount };
}

export async function getCountOfPostsForModeration() {
  return await db.$count(
    posts,
    eq(posts.postStatus, POST_STATUS.ON_MODERATION)
  );
}

export async function getAllPostsForModeration(query: string, page: number) {
  const totalCount = await db.$count(
    posts,
    and(
      eq(posts.postStatus, POST_STATUS.ON_MODERATION),
      or(ilike(posts.title, `%${query}%`), ilike(posts.content, `%${query}%`))
    )
  );

  if (totalCount === 0) {
    return { allPosts: [], actualPage: 1, pagesCount: 1 };
  }

  const { offset, actualPage, pagesCount } = getCountForPagination(
    totalCount,
    page
  );

  const allPosts = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      content: posts.content,
      status: posts.postStatus,
      createdAt: posts.createdAt,
      ownerId: posts.ownerId,
      author: crt.author,
    })
    .from(posts)
    .leftJoin(crt, eq(posts.ownerId, crt.id))
    .where(eq(posts.postStatus, POST_STATUS.ON_MODERATION))
    .limit(PAGINATION_LIMIT)
    .offset(offset)
    .orderBy(asc(posts.createdAt));

  return { allPosts, actualPage, pagesCount };
}

export async function getPostById(postId: number) {
  const existedPost = await db
    .select({
      id: posts.id,
      ownerId: posts.ownerId,
      title: posts.title,
      slug: posts.slug,
      content: posts.content,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
      updatedById: posts.updatedById,
      updatedBy: upd.updatedBy,
      publishedAt: posts.publishedAt,
      moderatedBy: pbl.moderatedBy,
      rejectedAt: posts.rejectedAt,
      author: crt.author,
      postStatus: posts.postStatus,
    })
    .from(posts)
    .leftJoin(crt, eq(posts.ownerId, crt.id))
    .leftJoin(upd, eq(posts.ownerId, upd.id))
    .leftJoin(pbl, eq(posts.moderatedById, pbl.id))
    .where(eq(posts.id, postId));

  return existedPost[0];
}

export async function getUserPostById(userId: number, postId: number) {
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

  return existedPost[0];
}

export async function getOnlyAnotherUserPostById(
  userId: number,
  postId: number
) {
  const existingAnotherUserPost = await db
    .select({
      title: posts.title,
      slug: posts.slug,
      content: posts.content,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
    })
    .from(posts)
    .where(and(eq(posts.id, postId), not(eq(posts.ownerId, userId))));

  return existingAnotherUserPost[0];
}

export async function getPostBySlug(slug: string) {
  const existedPost = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      content: posts.content,
      createdAt: posts.createdAt,
      publishedAt: posts.publishedAt,
      updatedAt: posts.updatedAt,
      updatedById: posts.updatedById,
      updatedBy: upd.updatedBy,
      ownerId: posts.ownerId,
      author: crt.author,
    })
    .from(posts)
    .where(
      and(eq(posts.slug, slug), eq(posts.postStatus, POST_STATUS.PUBLISHED))
    )
    .leftJoin(crt, eq(posts.ownerId, crt.id))
    .leftJoin(upd, eq(posts.updatedById, upd.id));

  return existedPost[0];
}

export async function getAllUserPostsById(userId: number) {
  const allUserPosts = await db
    .select({
      id: posts.id,
      ownerId: posts.ownerId,
      title: posts.title,
      slug: posts.slug,
      status: posts.postStatus,
      content: posts.content,
      createdAt: posts.createdAt,
      publishedAt: posts.publishedAt,
      updatedAt: posts.updatedAt,
    })
    .from(posts)
    .where(eq(posts.ownerId, userId))
    .orderBy(desc(posts.publishedAt), desc(posts.createdAt));

  return allUserPosts;
}

export async function updatePostById(
  postId: number,
  userId: number,
  postData: TPost
) {
  const updatedPost = await db
    .update(posts)
    .set({
      ...postData,
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
  const updatedPost = await db
    .update(posts)
    .set({
      ...postData,
      postStatus: confirmed ? "published" : "rejected",
      publishedAt: confirmed ? sql`NOW()` : null,
      rejectedAt: confirmed ? null : sql`NOW()`,
    })
    .where(eq(posts.id, postId))
    .returning({ id: posts.id, postStatus: posts.postStatus });

  return updatedPost[0];
}

export async function deletePostById(postId: number) {
  const deletedPost = await db
    .delete(posts)
    .where(eq(posts.id, postId))
    .returning({ id: posts.id });

  return deletedPost[0];
}

export async function blockPostById(postId: number, userId: number) {
  const blockedPost = await db
    .update(posts)
    .set({
      blockedAt: sql`NOW()`,
      blockedById: userId,
      postStatus: POST_STATUS.BLOCKED,
    })
    .where(eq(posts.id, postId));

  return blockedPost[0];
}
