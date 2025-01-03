ALTER TABLE "posts" RENAME TO "Posts";--> statement-breakpoint
ALTER TABLE "Posts" DROP CONSTRAINT "posts_ownerId_User_id_fk";
--> statement-breakpoint
ALTER TABLE "Posts" DROP CONSTRAINT "posts_blockedBy_User_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Posts" ADD CONSTRAINT "Posts_ownerId_User_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Posts" ADD CONSTRAINT "Posts_blockedBy_User_id_fk" FOREIGN KEY ("blockedBy") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
