ALTER TABLE "Posts" ALTER COLUMN "slug" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "Posts" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "Posts" ALTER COLUMN "content" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "Posts" ALTER COLUMN "ownerId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_slug_unique" UNIQUE("slug");