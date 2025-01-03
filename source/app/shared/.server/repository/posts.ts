import { db } from "server/app";
import { eq } from "drizzle-orm";
import { posts, users } from "~/database/schema";

import type { TPost } from "~/shared/types/react";

export async function createNewPost(userId: number, postData: TPost) {
  const existedUser = await db.select().from(users).where(eq(users.id, userId));

  if (!existedUser) {
    throw new Error("User with such id does not exist");
  }

  const createdPost = await db.insert(posts).values({ ...postData });

  console.log(createdPost);
  return createdPost;
}
