import { pgEnum, pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { users } from "./users";
import { relations } from "drizzle-orm";
import { postsToTags } from "./postsToTags";

export const postStatusEnum = pgEnum("postStatus", [
  "published",
  "rejected",
  "on moderation",
  "blocked",
]);

export const posts = pgTable("Posts", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  slug: t.varchar({ length: 1000 }).notNull().unique(),
  title: t.varchar({ length: 150 }).notNull(),
  content: t.varchar({ length: 3000 }).notNull(),
  ownerId: t
    .integer()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  postStatus: postStatusEnum().notNull().default("on moderation"),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t.timestamp(),
  moderatedAt: t.timestamp(),
  updatedById: t.integer().references((): t.AnyPgColumn => users.id),
  publishedAt: t.timestamp(),
  rejectedAt: t.timestamp(),
  rejectReason: t.varchar({ length: 50 }),
  moderatedById: t.integer().references((): t.AnyPgColumn => users.id),
  blockedAt: t.timestamp(),
  blockedById: t.integer().references((): t.AnyPgColumn => users.id),
});

export const postsRelations = relations(posts, ({ many, one }) => ({
  author: one(users, {
    fields: [posts.ownerId],
    references: [users.id],
  }),
  postsToTags: many(postsToTags),
}));
