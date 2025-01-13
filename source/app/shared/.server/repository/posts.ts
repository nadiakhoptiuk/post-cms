import { db } from "server/app";
import {
  and,
  asc,
  desc,
  eq,
  exists,
  ilike,
  isNotNull,
  not,
  or,
  sql,
} from "drizzle-orm";
import { posts, users } from "~/database/schema";

import type { TDBPostRecord, TPost } from "~/shared/types/react";
import { generateUniqueIdForSlug } from "../utils/postUtils";
import {
  PAGINATION_LIMIT,
  POST_STATUS,
  ROLE_ADMIN,
} from "~/shared/constants/common";
import { getCountForPagination } from "../utils/commonUtils";

const concattedUserName = sql`CONCAT(${users.firstName}, ' ', ${users.lastName})`;

const crt = db
  .select({
    author: concattedUserName.as("author"),
    id: users.id,
  })
  .from(users)
  .as("crt");

const cmpl = db
  .select({
    complaintAuthor: concattedUserName.as("complaintAuthor"),
    id: users.id,
  })
  .from(users)
  .as("cmpl");

const upd = db
  .select({
    updatedBy: concattedUserName.as("updatedBy"),
    id: users.id,
  })
  .from(users)
  .as("upd");

export async function createNewPost(userId: number, postData: TPost) {
  const idForSlug = await generateUniqueIdForSlug();

  const createdPost = await db
    .insert(posts)
    .values({
      ...postData,
      slug: `${postData.slug}-${idForSlug}`,
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
    .orderBy(desc(posts.updatedAt));

  return { allPosts, actualPage, pagesCount };
}

export async function getCountOfPostsForModeration() {
  return await db.$count(
    posts,
    eq(posts.postStatus, POST_STATUS.ON_MODERATION)
  );
}

export async function getCountOfPostsWithComplaints() {
  return await db.$count(posts, isNotNull(posts.complainedAt));
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

export async function getAllPostsWithComplaints(query: string, page: number) {
  const totalCount = await db.$count(
    posts,
    and(
      eq(posts.postStatus, POST_STATUS.PUBLISHED),
      isNotNull(posts.complainedAt),
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
      complaintReason: posts.complaintReason,
      complaintById: posts.complainedById,
      complaintBy: cmpl.complaintAuthor,
      createdAt: posts.createdAt,
      complainedAt: posts.complainedAt,
      ownerId: posts.ownerId,
      author: crt.author,
    })
    .from(posts)
    .leftJoin(crt, eq(posts.ownerId, crt.id))
    .leftJoin(cmpl, eq(posts.complainedById, cmpl.id))
    .where(and(isNotNull(posts.publishedAt), isNotNull(posts.complainedAt)))
    .limit(PAGINATION_LIMIT)
    .offset(offset)
    .orderBy(desc(posts.complainedAt));

  return { allPosts, actualPage, pagesCount };
}

export async function getPostById(postId: number) {
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
  // const existedUser = await db
  //   .select({ role: users.role })
  //   .from(users)
  //   .where(eq(users.id, userId));

  // if (!existedUser[0]) {
  //   throw new Error("User with such id does not exist");
  // }

  // let existedPost;

  // if (existedUser[0].role !== ROLE_ADMIN) {
  //   existedPost = await db
  //     .select({ slug: posts.slug })
  //     .from(posts)
  //     .where(and(eq(posts.id, postId), eq(posts.ownerId, userId)));
  // } else {
  //   existedPost = await db
  //     .select({ slug: posts.slug })
  //     .from(posts)
  //     .where(and(eq(posts.id, postId)));
  // }

  // if (!existedPost[0]) {
  //   throw new Error("Post with such id does not exist");
  // }

  const existingPost = await db
    .select({ slug: posts.slug })
    .from(posts)
    .where(eq(posts.id, postId));

  if (!existingPost[0] || !existingPost[0].slug) {
    throw new Error("Post with such id does not exist");
  }

  const existingSlugId = existingPost[0].slug.slice(-36);

  const updatedPost = await db
    .update(posts)
    .set({
      ...postData,
      slug: `${postData.slug}-${existingSlugId}`,
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
  const existedPost = await db.select().from(posts).where(eq(posts.id, postId));

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

  return updatedPost[0];
}

export async function deletePostById(postId: number, userId: number) {
  const deletedPost = await db
    .delete(posts)
    .where(
      and(
        eq(posts.id, postId),
        or(
          eq(posts.ownerId, userId),
          exists(
            db
              .select()
              .from(users)
              .where(and(eq(users.id, userId), eq(users.role, "admin")))
          )
        )
      )
    )
    .returning({ deletedId: posts.id });

  return deletedPost[0];
}

export async function complaintAboutPost(
  postId: number,
  postData: Partial<TPost & TDBPostRecord>,
  userId: number
) {
  const updatedPost = await db
    .update(posts)
    .set({
      ...postData,
      complainedAt: sql`NOW()`,
      complainedById: userId,
    })
    .where(and(eq(posts.id, postId), not(eq(posts.ownerId, userId))))
    .returning();

  return updatedPost[0];
}
