import { pgEnum, pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { postTimestamps, userTimestamps } from "./columns.helpers";

export const rolesEnum = pgEnum("roles", ["admin", "user"]);
export const postStatusEnum = pgEnum("postStatus", ["admin", "user"]);

export const users = pgTable("Users", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: t.varchar({ length: 40 }).notNull(),
  lastName: t.varchar({ length: 40 }).notNull(),
  email: t.varchar({ length: 255 }).notNull().unique(),
  password: t.varchar({ length: 255 }).notNull(),
  role: rolesEnum().notNull().default("user"),
  ...userTimestamps,
});

export const posts = pgTable("Posts", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  slug: t.varchar({ length: 1000 }).notNull().unique(),
  title: t.varchar({ length: 150 }).notNull(),
  content: t.varchar({ length: 3000 }).notNull(),
  ownerId: t
    .integer()
    .references(() => users.id)
    .notNull(),
  reason: t.varchar({ length: 50 }),
  ...postTimestamps,
});
