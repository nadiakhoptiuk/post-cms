ALTER TABLE "Posts" RENAME COLUMN "moderatedBy" TO "moderatedById";--> statement-breakpoint
ALTER TABLE "Posts" RENAME COLUMN "complainedBy" TO "complainedById";--> statement-breakpoint
ALTER TABLE "Posts" RENAME COLUMN "blockedBy" TO "blockedById";--> statement-breakpoint
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_moderatedBy_Users_id_fk";
--> statement-breakpoint
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_complainedBy_Users_id_fk";
--> statement-breakpoint
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_blockedBy_Users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Posts" ADD CONSTRAINT "Posts_moderatedById_Users_id_fk" FOREIGN KEY ("moderatedById") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Posts" ADD CONSTRAINT "Posts_complainedById_Users_id_fk" FOREIGN KEY ("complainedById") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Posts" ADD CONSTRAINT "Posts_blockedById_Users_id_fk" FOREIGN KEY ("blockedById") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
