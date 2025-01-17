import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { users } from "./users";
import { relations } from "drizzle-orm";
import { postsToTags } from "./postsToTags";

export const tags = pgTable("Tags", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  name: t.varchar({ length: 50 }).notNull().unique(),
  createdAt: t.timestamp().defaultNow().notNull(),
  createdById: t
    .integer()
    .references((): t.AnyPgColumn => users.id, { onDelete: "cascade" })
    .notNull(),
  updatedAt: t.timestamp(),
  updatedById: t
    .integer()
    .references((): t.AnyPgColumn => users.id, { onDelete: "cascade" }),
});

export const tagsRelations = relations(tags, ({ many }) => ({
  postsToTags: many(postsToTags),
}));
