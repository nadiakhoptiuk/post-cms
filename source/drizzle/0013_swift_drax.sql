CREATE TYPE "public"."postStatus" AS ENUM('published', 'rejected', 'on moderation', 'blocked');--> statement-breakpoint
ALTER TABLE "Posts" ADD COLUMN "postStatus" "postStatus" DEFAULT 'on moderation' NOT NULL;--> statement-breakpoint
ALTER TABLE "Posts" ADD COLUMN "reason" varchar(50);--> statement-breakpoint
ALTER TABLE "Posts" ADD COLUMN "rejectedAt" timestamp;