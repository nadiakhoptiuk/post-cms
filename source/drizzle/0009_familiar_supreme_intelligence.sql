ALTER TABLE "User" RENAME TO "Users";--> statement-breakpoint
ALTER TABLE "Users" DROP CONSTRAINT "User_email_unique";--> statement-breakpoint
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_ownerId_User_id_fk";
--> statement-breakpoint
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_blockedBy_User_id_fk";
--> statement-breakpoint
ALTER TABLE "Users" DROP CONSTRAINT "User_updatedById_User_id_fk";
--> statement-breakpoint
ALTER TABLE "Users" DROP CONSTRAINT "User_deletedById_User_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Posts" ADD CONSTRAINT "Posts_ownerId_Users_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Posts" ADD CONSTRAINT "Posts_blockedBy_Users_id_fk" FOREIGN KEY ("blockedBy") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Users" ADD CONSTRAINT "Users_updatedById_Users_id_fk" FOREIGN KEY ("updatedById") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Users" ADD CONSTRAINT "Users_deletedById_Users_id_fk" FOREIGN KEY ("deletedById") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "Users" ADD CONSTRAINT "Users_email_unique" UNIQUE("email");