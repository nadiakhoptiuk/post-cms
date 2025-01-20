import { eq, ilike, sql } from "drizzle-orm";

import { db } from "server/app";
import { tags } from "~/database/schema/tags";
import { crt, upd } from "./repositoryUtils";
import { getCountForPagination } from "../utils/commonUtils";

import { PAGINATION_LIMIT } from "~/shared/constants/common";
import type { TTagForm } from "~/shared/types/react";

export const getAllTags = async () => {
  return await db
    .select({
      name: tags.name,
      id: tags.id,
      createdAt: tags.createdAt,
      author: crt.author,
    })
    .from(tags)
    .leftJoin(crt, eq(tags.createdById, crt.id));
};

export const getAllTagsForAdmin = async (query: string, page: number) => {
  const totalCount = await db.$count(tags, ilike(tags.name, `%${query}%`));

  if (totalCount === 0) {
    return { allTags: [], actualPage: 1, pagesCount: 1 };
  }

  const { offset, actualPage, pagesCount } = getCountForPagination(
    totalCount,
    page
  );

  const allTags = await db
    .select({
      name: tags.name,
      id: tags.id,
      createdAt: tags.createdAt,
      author: crt.author,
    })
    .from(tags)
    .leftJoin(crt, eq(tags.createdById, crt.id))
    .where(ilike(tags.name, `%${query}%`))
    .limit(PAGINATION_LIMIT)
    .offset(offset);

  return { allTags, actualPage, pagesCount };
};

export const getTagByName = async (name: string) => {
  const existingTags = await db
    .select({ name: tags.name, id: tags.id })
    .from(tags)
    .where(eq(tags.name, name));

  return existingTags[0];
};

export const getTagById = async (tagId: number) => {
  const existingTags = await db
    .select({
      name: tags.name,
      id: tags.id,
      createdAt: tags.createdAt,
      author: crt.author,
      updatedAt: tags.updatedAt,
      updatedBy: upd.updatedBy,
    })
    .from(tags)
    .leftJoin(crt, eq(tags.createdById, crt.id))
    .leftJoin(upd, eq(tags.updatedById, upd.id))
    .where(eq(tags.id, tagId));

  return existingTags[0];
};

export const createNewTag = async (tagData: TTagForm, userId: number) => {
  const createdTag = await db
    .insert(tags)
    .values({ ...tagData, createdById: userId })
    .returning({
      name: tags.name,
      id: tags.id,
      createdAt: tags.createdAt,
      createdById: tags.createdById,
    });

  return createdTag[0];
};

export const createMultipleTagsOrSkip = async (
  tagData: TTagForm[],
  userId: number
) => {
  const createdTags = await db
    .insert(tags)
    .values(tagData.map((tag) => ({ ...tag, createdById: userId })))
    .onConflictDoNothing({ target: tags.name })
    .returning({
      name: tags.name,
      id: tags.id,
      createdAt: tags.createdAt,
      createdById: tags.createdById,
    });

  return createdTags;
};

export const updateTagById = async (
  tagId: number,
  tagData: TTagForm,
  userId: number
) => {
  const updatedTag = await db
    .update(tags)
    .set({ ...tagData, updatedAt: sql`NOW()`, updatedById: userId })
    .where(eq(tags.id, tagId))
    .returning({
      id: tags.id,
      name: tags.name,
      updatedAt: tags.updatedAt,
      updatedBy: tags.updatedById,
    });

  return updatedTag[0];
};

export const deleteTagById = async (tagId: number) => {
  const deletedTag = await db
    .delete(tags)
    .where(eq(tags.id, tagId))
    .returning({ id: tags.id });

  return deletedTag[0];
};
