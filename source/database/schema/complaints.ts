import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { users } from "./users";
import { posts } from "./posts";

export const postStatusEnum = t.pgEnum("complaintStatus", [
  "rejected",
  "accepted",
]);

export const complaints = pgTable("Complaints", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: t.timestamp().defaultNow().notNull(),
  createdById: t
    .integer()
    .references((): t.AnyPgColumn => users.id)
    .notNull(),
  reason: t.varchar({ length: 50 }).notNull(),
  complainedAboutPostId: t
    .integer()
    .references((): t.AnyPgColumn => posts.id)
    .notNull(),
  consideredAt: t.timestamp(),
  consideredById: t.integer().references((): t.AnyPgColumn => users.id),
  status: postStatusEnum(),
});
