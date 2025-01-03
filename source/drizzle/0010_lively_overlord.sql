ALTER TABLE "Posts" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
ALTER TABLE "Posts" ADD COLUMN "updatedById" integer;--> statement-breakpoint
ALTER TABLE "Posts" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "Posts" ADD COLUMN "deletedAt" timestamp;--> statement-breakpoint
ALTER TABLE "Posts" ADD COLUMN "deletedById" integer;--> statement-breakpoint
ALTER TABLE "Posts" ADD COLUMN "publishedAt" timestamp;--> statement-breakpoint
ALTER TABLE "Posts" ADD COLUMN "moderatedBy" integer;--> statement-breakpoint
ALTER TABLE "Posts" ADD COLUMN "complainedAt" timestamp;--> statement-breakpoint
ALTER TABLE "Posts" ADD COLUMN "complainedBy" integer;--> statement-breakpoint
ALTER TABLE "Posts" ADD COLUMN "blockedAt" timestamp;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Posts" ADD CONSTRAINT "Posts_updatedById_Users_id_fk" FOREIGN KEY ("updatedById") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Posts" ADD CONSTRAINT "Posts_deletedById_Users_id_fk" FOREIGN KEY ("deletedById") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Posts" ADD CONSTRAINT "Posts_moderatedBy_Users_id_fk" FOREIGN KEY ("moderatedBy") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Posts" ADD CONSTRAINT "Posts_complainedBy_Users_id_fk" FOREIGN KEY ("complainedBy") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
