import { pgEnum, pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

export const rolesEnum = pgEnum("roles", ["admin", "user"]);

export const users = pgTable("Users", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: t.varchar({ length: 40 }).notNull(),
  lastName: t.varchar({ length: 40 }).notNull(),
  email: t.varchar({ length: 255 }).notNull().unique(),
  password: t.varchar({ length: 255 }).notNull(),
  role: rolesEnum().notNull().default("user"),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t.timestamp(),
  updatedById: t.integer().references((): t.AnyPgColumn => users.id),
  deletedAt: t.timestamp(),
  deletedById: t.integer().references((): t.AnyPgColumn => users.id),
  restoredAt: t.timestamp(),
  restoredById: t.integer().references((): t.AnyPgColumn => users.id),
});
