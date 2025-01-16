import { defineConfig } from "drizzle-kit";

import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

export default defineConfig({
  out: "./drizzle",
  schema: "./database/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
