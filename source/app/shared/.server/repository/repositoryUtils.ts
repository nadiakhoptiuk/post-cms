import { sql } from "drizzle-orm";
import { db } from "server/app";
import { posts } from "~/database/schema/posts";
import { users } from "~/database/schema/users";

export const concattedUserName = sql`CONCAT(${users.firstName}, ' ', ${users.lastName})`;

export const upd = db
  .select({
    updatedBy: concattedUserName.as("updatedBy"),
    id: users.id,
  })
  .from(users)
  .as("upd");

export const del = db
  .select({
    deletedBy: concattedUserName.as("deletedBy"),
    id: users.id,
  })
  .from(users)
  .as("del");

export const rstr = db
  .select({
    restoredBy: concattedUserName.as("restoredBy"),
    id: users.id,
  })
  .from(users)
  .as("rstr");

export const crt = db
  .select({
    author: concattedUserName.as("author"),
    id: users.id,
  })
  .from(users)
  .as("crt");

export const cmpl = db
  .select({
    complaintAuthor: concattedUserName.as("complaintAuthor"),
    id: users.id,
  })
  .from(users)
  .as("cmpl");

export const joinPost = db
  .select({
    postSlug: posts.slug,
    postTitle: posts.title,
    postId: posts.id,
  })
  .from(posts)
  .as("joinPost");
