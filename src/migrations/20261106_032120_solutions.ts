import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_solutions_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__solutions_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__solutions_page_v_published_locale" AS ENUM('en', 'id', 'zh');
  CREATE TABLE "solutions_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"cta_button_link" varchar,
  	"cta_image_id" integer,
  	"meta_canonical" varchar,
  	"meta_noindex" boolean,
  	"_status" "enum_solutions_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "solutions_page_locales" (
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_intro" varchar,
  	"list_button_label" varchar DEFAULT 'Request a Quote',
  	"cta_eyebrow" varchar,
  	"cta_title" varchar,
  	"cta_text" varchar,
  	"cta_button_label" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_solutions_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_id" integer,
  	"version_cta_button_link" varchar,
  	"version_cta_image_id" integer,
  	"version_meta_canonical" varchar,
  	"version_meta_noindex" boolean,
  	"version__status" "enum__solutions_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__solutions_page_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_solutions_page_v_locales" (
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_hero_intro" varchar,
  	"version_list_button_label" varchar DEFAULT 'Request a Quote',
  	"version_cta_eyebrow" varchar,
  	"version_cta_title" varchar,
  	"version_cta_text" varchar,
  	"version_cta_button_label" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "product_categories_locales" ADD COLUMN "summary" varchar;
  ALTER TABLE "product_categories_locales" ADD COLUMN "applications" varchar;
  ALTER TABLE "product_categories_locales" ADD COLUMN "benefits" varchar;
  ALTER TABLE "_product_categories_v_locales" ADD COLUMN "version_summary" varchar;
  ALTER TABLE "_product_categories_v_locales" ADD COLUMN "version_applications" varchar;
  ALTER TABLE "_product_categories_v_locales" ADD COLUMN "version_benefits" varchar;
  ALTER TABLE "solutions_page" ADD CONSTRAINT "solutions_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "solutions_page" ADD CONSTRAINT "solutions_page_cta_image_id_media_id_fk" FOREIGN KEY ("cta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "solutions_page_locales" ADD CONSTRAINT "solutions_page_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "solutions_page_locales" ADD CONSTRAINT "solutions_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_solutions_page_v" ADD CONSTRAINT "_solutions_page_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_solutions_page_v" ADD CONSTRAINT "_solutions_page_v_version_cta_image_id_media_id_fk" FOREIGN KEY ("version_cta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_solutions_page_v_locales" ADD CONSTRAINT "_solutions_page_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_solutions_page_v_locales" ADD CONSTRAINT "_solutions_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_solutions_page_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "solutions_page_hero_hero_image_idx" ON "solutions_page" USING btree ("hero_image_id");
  CREATE INDEX "solutions_page_cta_cta_image_idx" ON "solutions_page" USING btree ("cta_image_id");
  CREATE INDEX "solutions_page__status_idx" ON "solutions_page" USING btree ("_status");
  CREATE INDEX "solutions_page_meta_meta_image_idx" ON "solutions_page_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "solutions_page_locales_locale_parent_id_unique" ON "solutions_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "solutions_page_locales_parent_id_idx" ON "solutions_page_locales" USING btree ("_parent_id");
  CREATE INDEX "_solutions_page_v_version_hero_version_hero_image_idx" ON "_solutions_page_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_solutions_page_v_version_cta_version_cta_image_idx" ON "_solutions_page_v" USING btree ("version_cta_image_id");
  CREATE INDEX "_solutions_page_v_version_version__status_idx" ON "_solutions_page_v" USING btree ("version__status");
  CREATE INDEX "_solutions_page_v_created_at_idx" ON "_solutions_page_v" USING btree ("created_at");
  CREATE INDEX "_solutions_page_v_updated_at_idx" ON "_solutions_page_v" USING btree ("updated_at");
  CREATE INDEX "_solutions_page_v_snapshot_idx" ON "_solutions_page_v" USING btree ("snapshot");
  CREATE INDEX "_solutions_page_v_published_locale_idx" ON "_solutions_page_v" USING btree ("published_locale");
  CREATE INDEX "_solutions_page_v_latest_idx" ON "_solutions_page_v" USING btree ("latest");
  CREATE INDEX "_solutions_page_v_autosave_idx" ON "_solutions_page_v" USING btree ("autosave");
  CREATE INDEX "_solutions_page_v_version_meta_version_meta_image_idx" ON "_solutions_page_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_solutions_page_v_locales_locale_parent_id_unique" ON "_solutions_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_solutions_page_v_locales_parent_id_idx" ON "_solutions_page_v_locales" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "solutions_page" CASCADE;
  DROP TABLE "solutions_page_locales" CASCADE;
  DROP TABLE "_solutions_page_v" CASCADE;
  DROP TABLE "_solutions_page_v_locales" CASCADE;
  ALTER TABLE "product_categories_locales" DROP COLUMN "summary";
  ALTER TABLE "product_categories_locales" DROP COLUMN "applications";
  ALTER TABLE "product_categories_locales" DROP COLUMN "benefits";
  ALTER TABLE "_product_categories_v_locales" DROP COLUMN "version_summary";
  ALTER TABLE "_product_categories_v_locales" DROP COLUMN "version_applications";
  ALTER TABLE "_product_categories_v_locales" DROP COLUMN "version_benefits";
  DROP TYPE "public"."enum_solutions_page_status";
  DROP TYPE "public"."enum__solutions_page_v_version_status";
  DROP TYPE "public"."enum__solutions_page_v_published_locale";`)
}
