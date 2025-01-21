import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { posts } from "./posts";
import { tags } from "./tags";
import { relations } from "drizzle-orm";

export const postsToTags = pgTable(
  "PostsToTags",
  {
    postId: t
      .integer()
      .notNull()
      .references((): t.AnyPgColumn => posts.id, { onDelete: "cascade" }),
    tagId: t
      .integer()
      .notNull()
      .references((): t.AnyPgColumn => tags.id, { onDelete: "cascade" }),
  },
  (table) => [
    t.primaryKey({ columns: [table.postId, table.tagId] }),
    t.uniqueIndex("post_tag_unique_idx").on(table.postId, table.tagId),
  ]
);

export const postsToTagsRelations = relations(postsToTags, ({ one }) => ({
  post: one(posts, {
    fields: [postsToTags.postId],
    references: [posts.id],
  }),
  tag: one(tags, {
    fields: [postsToTags.tagId],
    references: [tags.id],
  }),
}));
