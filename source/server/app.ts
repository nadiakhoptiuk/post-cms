import { createRequestHandler } from "@react-router/express";
import { drizzle } from "drizzle-orm/postgres-js";
import express from "express";
import postgres from "postgres";
import "react-router";

import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

import { DatabaseContext } from "~/database/context";
import * as posts from "~/database/schema/posts";
import * as tags from "~/database/schema/tags";
import * as complaints from "~/database/schema/complaints";
import * as postsToTags from "~/database/schema/postsToTags";
import * as users from "~/database/schema/users";

declare module "react-router" {
  interface AppLoadContext {
    VALUE_FROM_EXPRESS: string;
  }
}

export const app = express();

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");

const client = postgres(process.env.DATABASE_URL, {
  max: 10,
  idle_timeout: 30,
});
export const db = drizzle(client, {
  schema: {
    ...posts,
    ...tags,
    ...complaints,
    ...postsToTags,
    ...users,
  },
});

app.use((_, __, next) => DatabaseContext.run(db, next));

app.use(
  createRequestHandler({
    // @ts-expect-error - virtual module provided by React Router at build time
    build: () => import("virtual:react-router/server-build"),
    getLoadContext() {
      return {
        VALUE_FROM_EXPRESS: "Hello from Express",
      };
    },
  })
);
