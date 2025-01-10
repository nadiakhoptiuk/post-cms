import { db } from "server/app";
import { and, desc, eq, ilike, isNotNull, not, or, sql } from "drizzle-orm";
import { posts, users } from "~/database/schema";

import type { TDBPostRecord, TPost } from "~/shared/types/react";
import { isTherePostIdInSlug } from "../utils/postUtils";
import {
  PAGINATION_LIMIT,
  POST_STATUS,
  ROLE_ADMIN,
} from "~/shared/constants/common";
import { getCountForPagination } from "../utils/commonUtils";

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
      content: posts.content,
      publishedAt: posts.publishedAt,
      ownerId: posts.ownerId,
      author: crt.author,
    })
    .from(posts)
    .leftJoin(crt, eq(posts.ownerId, crt.id))
    .where(
      and(
        // or(
        //   ilike(posts.title, `%${query}%`),
        //   ilike(posts.content, `%${query}%`)
        // ),
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
      ownerId: posts.ownerId,
      author: crt.author,
    })
    .from(posts)
    .leftJoin(crt, eq(posts.ownerId, crt.id))
    .where(eq(posts.postStatus, POST_STATUS.ON_MODERATION))
    .limit(PAGINATION_LIMIT)
    .offset(offset)
    .orderBy(desc(posts.createdAt));

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

  const crt = db
    .select({
      author: sql`CONCAT(${users.firstName}, ' ', ${users.lastName})`.as(
        "author"
      ),
      id: users.id,
    })
    .from(users)
    .as("crt");

  const cmpl = db
    .select({
      complaintAuthor:
        sql`CONCAT(${users.firstName}, ' ', ${users.lastName})`.as(
          "complaintAuthor"
        ),
      id: users.id,
    })
    .from(users)
    .as("cmpl");

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

export async function complaintAboutPost(
  postId: number,
  postData: Partial<TPost & TDBPostRecord>,
  userId: number
) {
  const existingPost = await db
    .select()
    .from(posts)
    .where(and(eq(posts.id, postId), not(eq(posts.ownerId, userId))));

  if (!existingPost[0]) {
    throw new Error("Post with such id does not exist");
  }

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
