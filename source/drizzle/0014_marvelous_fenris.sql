ALTER TABLE "Posts" DROP CONSTRAINT "Posts_deletedById_Users_id_fk";
--> statement-breakpoint
ALTER TABLE "Posts" DROP COLUMN IF EXISTS "deletedAt";--> statement-breakpoint
ALTER TABLE "Posts" DROP COLUMN IF EXISTS "deletedById";