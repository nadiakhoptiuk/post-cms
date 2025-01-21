CREATE TYPE "public"."complaintStatus" AS ENUM('rejected', 'accepted');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Complaints" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "Complaints_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"createdById" integer NOT NULL,
	"reason" varchar(50) NOT NULL,
	"complainedAboutPostId" integer NOT NULL,
	"consideredAt" timestamp,
	"consideredById" integer,
	"status" "complaintStatus"
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "PostsToTags" (
	"postId" integer NOT NULL,
	"tagId" integer NOT NULL,
	CONSTRAINT "PostsToTags_postId_tagId_pk" PRIMARY KEY("postId","tagId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Tags" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "Tags_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(50) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"createdById" integer NOT NULL,
	"updatedAt" timestamp,
	"updatedById" integer,
	CONSTRAINT "Tags_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_complainedById_Users_id_fk";
--> statement-breakpoint
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_ownerId_Users_id_fk";
--> statement-breakpoint
ALTER TABLE "Users" ADD COLUMN "restoredAt" timestamp;--> statement-breakpoint
ALTER TABLE "Users" ADD COLUMN "restoredById" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Complaints" ADD CONSTRAINT "Complaints_createdById_Users_id_fk" FOREIGN KEY ("createdById") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Complaints" ADD CONSTRAINT "Complaints_complainedAboutPostId_Posts_id_fk" FOREIGN KEY ("complainedAboutPostId") REFERENCES "public"."Posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Complaints" ADD CONSTRAINT "Complaints_consideredById_Users_id_fk" FOREIGN KEY ("consideredById") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "PostsToTags" ADD CONSTRAINT "PostsToTags_postId_Posts_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."Posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "PostsToTags" ADD CONSTRAINT "PostsToTags_tagId_Tags_id_fk" FOREIGN KEY ("tagId") REFERENCES "public"."Tags"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Tags" ADD CONSTRAINT "Tags_createdById_Users_id_fk" FOREIGN KEY ("createdById") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Tags" ADD CONSTRAINT "Tags_updatedById_Users_id_fk" FOREIGN KEY ("updatedById") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "post_tag_unique_idx" ON "PostsToTags" USING btree ("postId","tagId");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Posts" ADD CONSTRAINT "Posts_ownerId_Users_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Users" ADD CONSTRAINT "Users_restoredById_Users_id_fk" FOREIGN KEY ("restoredById") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "Posts" DROP COLUMN IF EXISTS "complaintReason";--> statement-breakpoint
ALTER TABLE "Posts" DROP COLUMN IF EXISTS "complainedAt";--> statement-breakpoint
ALTER TABLE "Posts" DROP COLUMN IF EXISTS "complainedById";