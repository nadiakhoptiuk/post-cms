import { and, eq } from "drizzle-orm";
import { db } from "server/app";
import { postsToTags } from "~/database/schema/postsToTags";
import { tgnm } from "./repositoryUtils";

export const getTagsWithNamesByPostId = async (postId: number) => {
  const tagsArr = await db
    .select({
      postId: postsToTags.postId,
      tagId: postsToTags.tagId,
      tagName: tgnm.name,
    })
    .from(postsToTags)
    .leftJoin(tgnm, eq(postsToTags.tagId, tgnm.tagId))
    .where(eq(postsToTags.postId, postId));

  return tagsArr;
};

export const addTagToPost = async (tagId: number, postId: number) => {
  const createdRecord = await db
    .insert(postsToTags)
    .values({ postId: postId, tagId })
    .returning({
      postId: postsToTags.postId,
      tagId: postsToTags.tagId,
    });

  return createdRecord[0];
};

export const deleteTagFromPost = async (tagId: number, postId: number) => {
  const deletedRecord = await db
    .delete(postsToTags)
    .where(and(eq(postsToTags.postId, postId), eq(postsToTags.tagId, tagId)))
    .returning({
      postId: postsToTags.postId,
      tagId: postsToTags.tagId,
    });

  return deletedRecord[0];
};
