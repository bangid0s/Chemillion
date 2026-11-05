import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Removes the Products, Partners and News sections (collections, page editors and the Home page's optional strips).
 * Product categories stay: they are the Home page cards that open the quote form.
 *
 * Before any table goes, the products each inquiry asked about are copied as plain names into its new
 * "Product(s) of interest" text field, so no sales history is lost. Menu items and buttons that pointed at the
 * removed pages are cleaned up afterwards. Removed content cannot be brought back by `down`, only the structure.
 */
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "inquiries" ADD COLUMN IF NOT EXISTS "product_interest" varchar;
  UPDATE "inquiries" AS i
  SET "product_interest" = picked.names
  FROM (
    SELECT r."parent_id", string_agg(COALESCE(l."name", 'Product #' || r."products_id"), ', ' ORDER BY r."order") AS names
    FROM "inquiries_rels" r
    LEFT JOIN "products_locales" l ON l."_parent_id" = r."products_id" AND l."_locale" = 'en'
    WHERE r."path" = 'products' AND r."products_id" IS NOT NULL
    GROUP BY r."parent_id"
  ) AS picked
  WHERE picked."parent_id" = i."id" AND COALESCE(i."product_interest", '') = '';`)

  await db.execute(sql`
   ALTER TABLE "inquiries_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_specs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_specs_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_applications" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_applications_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_packaging" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_packaging_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_documents" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_documents_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_specs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_specs_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_applications" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_applications_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_packaging" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_packaging_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_documents" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_documents_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "partners" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "partners_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "partner_types" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "partner_types_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "news" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "news_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "news_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "news_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_page_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_page_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "partners_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "partners_page_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_partners_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_partners_page_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "news_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "news_page_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_page_v_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "inquiries_rels" CASCADE;
  DROP TABLE "products_gallery" CASCADE;
  DROP TABLE "products_specs" CASCADE;
  DROP TABLE "products_specs_locales" CASCADE;
  DROP TABLE "products_applications" CASCADE;
  DROP TABLE "products_applications_locales" CASCADE;
  DROP TABLE "products_packaging" CASCADE;
  DROP TABLE "products_packaging_locales" CASCADE;
  DROP TABLE "products_documents" CASCADE;
  DROP TABLE "products_documents_locales" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "products_locales" CASCADE;
  DROP TABLE "products_rels" CASCADE;
  DROP TABLE "_products_v_version_gallery" CASCADE;
  DROP TABLE "_products_v_version_specs" CASCADE;
  DROP TABLE "_products_v_version_specs_locales" CASCADE;
  DROP TABLE "_products_v_version_applications" CASCADE;
  DROP TABLE "_products_v_version_applications_locales" CASCADE;
  DROP TABLE "_products_v_version_packaging" CASCADE;
  DROP TABLE "_products_v_version_packaging_locales" CASCADE;
  DROP TABLE "_products_v_version_documents" CASCADE;
  DROP TABLE "_products_v_version_documents_locales" CASCADE;
  DROP TABLE "_products_v" CASCADE;
  DROP TABLE "_products_v_locales" CASCADE;
  DROP TABLE "_products_v_rels" CASCADE;
  DROP TABLE "partners" CASCADE;
  DROP TABLE "partners_locales" CASCADE;
  DROP TABLE "partner_types" CASCADE;
  DROP TABLE "partner_types_locales" CASCADE;
  DROP TABLE "news" CASCADE;
  DROP TABLE "news_locales" CASCADE;
  DROP TABLE "news_texts" CASCADE;
  DROP TABLE "news_rels" CASCADE;
  DROP TABLE "_news_v" CASCADE;
  DROP TABLE "_news_v_locales" CASCADE;
  DROP TABLE "_news_v_texts" CASCADE;
  DROP TABLE "_news_v_rels" CASCADE;
  DROP TABLE "products_page" CASCADE;
  DROP TABLE "products_page_locales" CASCADE;
  DROP TABLE "_products_page_v" CASCADE;
  DROP TABLE "_products_page_v_locales" CASCADE;
  DROP TABLE "partners_page" CASCADE;
  DROP TABLE "partners_page_locales" CASCADE;
  DROP TABLE "_partners_page_v" CASCADE;
  DROP TABLE "_partners_page_v_locales" CASCADE;
  DROP TABLE "news_page" CASCADE;
  DROP TABLE "news_page_locales" CASCADE;
  DROP TABLE "_news_page_v" CASCADE;
  DROP TABLE "_news_page_v_locales" CASCADE;
  ALTER TABLE "product_categories_locales" DROP CONSTRAINT IF EXISTS "product_categories_locales_meta_image_id_media_id_fk";
  
  ALTER TABLE "_product_categories_v_locales" DROP CONSTRAINT IF EXISTS "_product_categories_v_locales_version_meta_image_id_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_products_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_partners_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_partner_types_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_news_fk";
  
  DROP INDEX IF EXISTS "product_categories_meta_meta_image_idx";
  DROP INDEX IF EXISTS "product_categories_slug_idx";
  DROP INDEX IF EXISTS "_product_categories_v_version_meta_version_meta_image_idx";
  DROP INDEX IF EXISTS "_product_categories_v_version_version_slug_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_products_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_partners_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_partner_types_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_news_id_idx";
  ALTER TABLE "product_categories" DROP COLUMN "meta_canonical";
  ALTER TABLE "product_categories" DROP COLUMN "meta_noindex";
  ALTER TABLE "product_categories_locales" DROP COLUMN "description";
  ALTER TABLE "product_categories_locales" DROP COLUMN "meta_title";
  ALTER TABLE "product_categories_locales" DROP COLUMN "meta_description";
  ALTER TABLE "product_categories_locales" DROP COLUMN "meta_image_id";
  ALTER TABLE "product_categories_locales" DROP COLUMN "slug";
  ALTER TABLE "_product_categories_v" DROP COLUMN "version_meta_canonical";
  ALTER TABLE "_product_categories_v" DROP COLUMN "version_meta_noindex";
  ALTER TABLE "_product_categories_v_locales" DROP COLUMN "version_description";
  ALTER TABLE "_product_categories_v_locales" DROP COLUMN "version_meta_title";
  ALTER TABLE "_product_categories_v_locales" DROP COLUMN "version_meta_description";
  ALTER TABLE "_product_categories_v_locales" DROP COLUMN "version_meta_image_id";
  ALTER TABLE "_product_categories_v_locales" DROP COLUMN "version_slug";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "products_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "partners_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "partner_types_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "news_id";
  ALTER TABLE "home_page" DROP COLUMN "show_partners_strip";
  ALTER TABLE "home_page" DROP COLUMN "show_latest_news";
  ALTER TABLE "home_page_locales" DROP COLUMN "partners_strip_title";
  ALTER TABLE "home_page_locales" DROP COLUMN "latest_news_title";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_show_partners_strip";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_show_latest_news";
  ALTER TABLE "_home_page_v_locales" DROP COLUMN "version_partners_strip_title";
  ALTER TABLE "_home_page_v_locales" DROP COLUMN "version_latest_news_title";
  DROP TYPE "public"."enum_products_status";
  DROP TYPE "public"."enum__products_v_version_status";
  DROP TYPE "public"."enum__products_v_published_locale";
  DROP TYPE "public"."enum_news_status";
  DROP TYPE "public"."enum__news_v_version_status";
  DROP TYPE "public"."enum__news_v_published_locale";
  DROP TYPE "public"."enum_products_page_status";
  DROP TYPE "public"."enum__products_page_v_version_status";
  DROP TYPE "public"."enum__products_page_v_published_locale";
  DROP TYPE "public"."enum_partners_page_status";
  DROP TYPE "public"."enum__partners_page_v_version_status";
  DROP TYPE "public"."enum__partners_page_v_published_locale";
  DROP TYPE "public"."enum_news_page_status";
  DROP TYPE "public"."enum__news_page_v_version_status";
  DROP TYPE "public"."enum__news_page_v_published_locale";`)

  // Links to the removed pages: drop them from the menu, and point Home's buttons at what replaced them.
  await db.execute(sql`
  DELETE FROM "navigation_items" WHERE "link" ~ '^/(products|partners|news|search)([/?#]|$)';
  UPDATE "home_page" SET "hero_primary_link" = '/#products' WHERE "hero_primary_link" = '/products';
  UPDATE "_home_page_v" SET "version_hero_primary_link" = '/#products' WHERE "latest" AND "version_hero_primary_link" = '/products';
  UPDATE "home_page_locales" SET "categories_link_label" = 'Request a Quote' WHERE "categories_link_label" = 'View All Products';
  UPDATE "_home_page_v_locales" SET "version_categories_link_label" = 'Request a Quote'
    WHERE "version_categories_link_label" = 'View All Products' AND "_parent_id" IN (SELECT "id" FROM "_home_page_v" WHERE "latest");
  UPDATE "home_page" SET "categories_link_link" = '/contact?origin=quote#inquiry' WHERE "categories_link_link" ~ '^/products';
  UPDATE "_home_page_v" SET "version_categories_link_link" = '/contact?origin=quote#inquiry'
    WHERE "latest" AND "version_categories_link_link" ~ '^/products';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_products_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__products_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__products_v_published_locale" AS ENUM('en', 'id');
  CREATE TYPE "public"."enum_news_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_v_published_locale" AS ENUM('en', 'id');
  CREATE TYPE "public"."enum_products_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__products_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__products_page_v_published_locale" AS ENUM('en', 'id');
  CREATE TYPE "public"."enum_partners_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__partners_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__partners_page_v_published_locale" AS ENUM('en', 'id');
  CREATE TYPE "public"."enum_news_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_page_v_published_locale" AS ENUM('en', 'id');
  CREATE TABLE "inquiries_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "products_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "products_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"unit" varchar
  );
  
  CREATE TABLE "products_specs_locales" (
  	"property" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "products_applications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "products_applications_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "products_packaging" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "products_packaging_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "products_documents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"file_id" integer
  );
  
  CREATE TABLE "products_documents_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cas_number" varchar,
  	"grade" varchar,
  	"meta_canonical" varchar,
  	"meta_noindex" boolean,
  	"category_id" integer,
  	"hidden" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_products_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "products_locales" (
  	"name" varchar,
  	"synonyms" varchar,
  	"short_description" varchar,
  	"description" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"slug" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "products_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "_products_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"unit" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_specs_locales" (
  	"property" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_products_v_version_applications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_applications_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_products_v_version_packaging" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_packaging_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_products_v_version_documents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"file_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_documents_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_products_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_cas_number" varchar,
  	"version_grade" varchar,
  	"version_meta_canonical" varchar,
  	"version_meta_noindex" boolean,
  	"version_category_id" integer,
  	"version_hidden" boolean,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__products_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__products_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_products_v_locales" (
  	"version_name" varchar,
  	"version_synonyms" varchar,
  	"version_short_description" varchar,
  	"version_description" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_slug" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_products_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "partners" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"name" varchar NOT NULL,
  	"logo_id" integer NOT NULL,
  	"type_id" integer NOT NULL,
  	"url" varchar,
  	"visible" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "partners_locales" (
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "partner_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "partner_types_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "news" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cover_id" integer,
  	"meta_canonical" varchar,
  	"meta_noindex" boolean,
  	"published_at" timestamp(3) with time zone,
  	"author" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_news_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "news_locales" (
  	"title" varchar,
  	"excerpt" varchar,
  	"body" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"slug" varchar,
  	"category" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "news_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar,
  	"locale" "_locales"
  );
  
  CREATE TABLE "news_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "_news_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_cover_id" integer,
  	"version_meta_canonical" varchar,
  	"version_meta_noindex" boolean,
  	"version_published_at" timestamp(3) with time zone,
  	"version_author" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__news_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__news_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_news_v_locales" (
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_body" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_slug" varchar,
  	"version_category" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_news_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar,
  	"locale" "_locales"
  );
  
  CREATE TABLE "_news_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "products_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"cta_button_link" varchar,
  	"cta_image_id" integer,
  	"meta_canonical" varchar,
  	"meta_noindex" boolean,
  	"_status" "enum_products_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "products_page_locales" (
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_intro" varchar,
  	"labels_product_count_singular" varchar DEFAULT 'product',
  	"labels_product_count_plural" varchar DEFAULT 'products',
  	"labels_request_quote" varchar DEFAULT 'Request a Quote',
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
  
  CREATE TABLE "_products_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_id" integer,
  	"version_cta_button_link" varchar,
  	"version_cta_image_id" integer,
  	"version_meta_canonical" varchar,
  	"version_meta_noindex" boolean,
  	"version__status" "enum__products_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__products_page_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_products_page_v_locales" (
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_hero_intro" varchar,
  	"version_labels_product_count_singular" varchar DEFAULT 'product',
  	"version_labels_product_count_plural" varchar DEFAULT 'products',
  	"version_labels_request_quote" varchar DEFAULT 'Request a Quote',
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
  
  CREATE TABLE "partners_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"become_image_id" integer,
  	"meta_canonical" varchar,
  	"meta_noindex" boolean,
  	"_status" "enum_partners_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "partners_page_locales" (
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_intro" varchar,
  	"become_eyebrow" varchar,
  	"become_title" varchar,
  	"become_text" varchar,
  	"become_button_label" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_partners_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_id" integer,
  	"version_become_image_id" integer,
  	"version_meta_canonical" varchar,
  	"version_meta_noindex" boolean,
  	"version__status" "enum__partners_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__partners_page_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_partners_page_v_locales" (
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_hero_intro" varchar,
  	"version_become_eyebrow" varchar,
  	"version_become_title" varchar,
  	"version_become_text" varchar,
  	"version_become_button_label" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "news_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"cta_button_link" varchar,
  	"cta_image_id" integer,
  	"meta_canonical" varchar,
  	"meta_noindex" boolean,
  	"_status" "enum_news_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "news_page_locales" (
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_intro" varchar,
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
  
  CREATE TABLE "_news_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_id" integer,
  	"version_cta_button_link" varchar,
  	"version_cta_image_id" integer,
  	"version_meta_canonical" varchar,
  	"version_meta_noindex" boolean,
  	"version__status" "enum__news_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__news_page_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_news_page_v_locales" (
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_hero_intro" varchar,
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
  
  ALTER TABLE "product_categories" ADD COLUMN "meta_canonical" varchar;
  ALTER TABLE "product_categories" ADD COLUMN "meta_noindex" boolean;
  ALTER TABLE "product_categories_locales" ADD COLUMN "description" varchar;
  ALTER TABLE "product_categories_locales" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "product_categories_locales" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "product_categories_locales" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "product_categories_locales" ADD COLUMN "slug" varchar;
  ALTER TABLE "_product_categories_v" ADD COLUMN "version_meta_canonical" varchar;
  ALTER TABLE "_product_categories_v" ADD COLUMN "version_meta_noindex" boolean;
  ALTER TABLE "_product_categories_v_locales" ADD COLUMN "version_description" varchar;
  ALTER TABLE "_product_categories_v_locales" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_product_categories_v_locales" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "_product_categories_v_locales" ADD COLUMN "version_meta_image_id" integer;
  ALTER TABLE "_product_categories_v_locales" ADD COLUMN "version_slug" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "products_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "partners_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "partner_types_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "news_id" integer;
  ALTER TABLE "home_page" ADD COLUMN "show_partners_strip" boolean;
  ALTER TABLE "home_page" ADD COLUMN "show_latest_news" boolean;
  ALTER TABLE "home_page_locales" ADD COLUMN "partners_strip_title" varchar;
  ALTER TABLE "home_page_locales" ADD COLUMN "latest_news_title" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_show_partners_strip" boolean;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_show_latest_news" boolean;
  ALTER TABLE "_home_page_v_locales" ADD COLUMN "version_partners_strip_title" varchar;
  ALTER TABLE "_home_page_v_locales" ADD COLUMN "version_latest_news_title" varchar;
  ALTER TABLE "inquiries_rels" ADD CONSTRAINT "inquiries_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."inquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "inquiries_rels" ADD CONSTRAINT "inquiries_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_gallery" ADD CONSTRAINT "products_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_gallery" ADD CONSTRAINT "products_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_specs" ADD CONSTRAINT "products_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_specs_locales" ADD CONSTRAINT "products_specs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_specs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_applications" ADD CONSTRAINT "products_applications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_applications_locales" ADD CONSTRAINT "products_applications_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_packaging" ADD CONSTRAINT "products_packaging_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_packaging_locales" ADD CONSTRAINT "products_packaging_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_packaging"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_documents" ADD CONSTRAINT "products_documents_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_documents" ADD CONSTRAINT "products_documents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_documents_locales" ADD CONSTRAINT "products_documents_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_category_id_product_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_locales" ADD CONSTRAINT "products_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_locales" ADD CONSTRAINT "products_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_gallery" ADD CONSTRAINT "_products_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_version_gallery" ADD CONSTRAINT "_products_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_specs" ADD CONSTRAINT "_products_v_version_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_specs_locales" ADD CONSTRAINT "_products_v_version_specs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_version_specs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_applications" ADD CONSTRAINT "_products_v_version_applications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_applications_locales" ADD CONSTRAINT "_products_v_version_applications_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_version_applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_packaging" ADD CONSTRAINT "_products_v_version_packaging_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_packaging_locales" ADD CONSTRAINT "_products_v_version_packaging_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_version_packaging"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_documents" ADD CONSTRAINT "_products_v_version_documents_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_version_documents" ADD CONSTRAINT "_products_v_version_documents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_documents_locales" ADD CONSTRAINT "_products_v_version_documents_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_version_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_parent_id_products_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_category_id_product_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_locales" ADD CONSTRAINT "_products_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_locales" ADD CONSTRAINT "_products_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partners" ADD CONSTRAINT "partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "partners" ADD CONSTRAINT "partners_type_id_partner_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."partner_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "partners_locales" ADD CONSTRAINT "partners_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partner_types_locales" ADD CONSTRAINT "partner_types_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partner_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_locales" ADD CONSTRAINT "news_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_locales" ADD CONSTRAINT "news_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_texts" ADD CONSTRAINT "news_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_rels" ADD CONSTRAINT "news_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_rels" ADD CONSTRAINT "news_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_parent_id_news_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_cover_id_media_id_fk" FOREIGN KEY ("version_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v_locales" ADD CONSTRAINT "_news_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v_locales" ADD CONSTRAINT "_news_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_texts" ADD CONSTRAINT "_news_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_rels" ADD CONSTRAINT "_news_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_rels" ADD CONSTRAINT "_news_v_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_page" ADD CONSTRAINT "products_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_page" ADD CONSTRAINT "products_page_cta_image_id_media_id_fk" FOREIGN KEY ("cta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_page_locales" ADD CONSTRAINT "products_page_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_page_locales" ADD CONSTRAINT "products_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_page_v" ADD CONSTRAINT "_products_page_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_page_v" ADD CONSTRAINT "_products_page_v_version_cta_image_id_media_id_fk" FOREIGN KEY ("version_cta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_page_v_locales" ADD CONSTRAINT "_products_page_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_page_v_locales" ADD CONSTRAINT "_products_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partners_page" ADD CONSTRAINT "partners_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "partners_page" ADD CONSTRAINT "partners_page_become_image_id_media_id_fk" FOREIGN KEY ("become_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "partners_page_locales" ADD CONSTRAINT "partners_page_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "partners_page_locales" ADD CONSTRAINT "partners_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partners_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_partners_page_v" ADD CONSTRAINT "_partners_page_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_partners_page_v" ADD CONSTRAINT "_partners_page_v_version_become_image_id_media_id_fk" FOREIGN KEY ("version_become_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_partners_page_v_locales" ADD CONSTRAINT "_partners_page_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_partners_page_v_locales" ADD CONSTRAINT "_partners_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_partners_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_page" ADD CONSTRAINT "news_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_page" ADD CONSTRAINT "news_page_cta_image_id_media_id_fk" FOREIGN KEY ("cta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_page_locales" ADD CONSTRAINT "news_page_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_page_locales" ADD CONSTRAINT "news_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_page_v" ADD CONSTRAINT "_news_page_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_page_v" ADD CONSTRAINT "_news_page_v_version_cta_image_id_media_id_fk" FOREIGN KEY ("version_cta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_page_v_locales" ADD CONSTRAINT "_news_page_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_page_v_locales" ADD CONSTRAINT "_news_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_page_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "inquiries_rels_order_idx" ON "inquiries_rels" USING btree ("order");
  CREATE INDEX "inquiries_rels_parent_idx" ON "inquiries_rels" USING btree ("parent_id");
  CREATE INDEX "inquiries_rels_path_idx" ON "inquiries_rels" USING btree ("path");
  CREATE INDEX "inquiries_rels_products_id_idx" ON "inquiries_rels" USING btree ("products_id");
  CREATE INDEX "products_gallery_order_idx" ON "products_gallery" USING btree ("_order");
  CREATE INDEX "products_gallery_parent_id_idx" ON "products_gallery" USING btree ("_parent_id");
  CREATE INDEX "products_gallery_image_idx" ON "products_gallery" USING btree ("image_id");
  CREATE INDEX "products_specs_order_idx" ON "products_specs" USING btree ("_order");
  CREATE INDEX "products_specs_parent_id_idx" ON "products_specs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "products_specs_locales_locale_parent_id_unique" ON "products_specs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_specs_locales_parent_id_idx" ON "products_specs_locales" USING btree ("_parent_id");
  CREATE INDEX "products_applications_order_idx" ON "products_applications" USING btree ("_order");
  CREATE INDEX "products_applications_parent_id_idx" ON "products_applications" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "products_applications_locales_locale_parent_id_unique" ON "products_applications_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_applications_locales_parent_id_idx" ON "products_applications_locales" USING btree ("_parent_id");
  CREATE INDEX "products_packaging_order_idx" ON "products_packaging" USING btree ("_order");
  CREATE INDEX "products_packaging_parent_id_idx" ON "products_packaging" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "products_packaging_locales_locale_parent_id_unique" ON "products_packaging_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_packaging_locales_parent_id_idx" ON "products_packaging_locales" USING btree ("_parent_id");
  CREATE INDEX "products_documents_order_idx" ON "products_documents" USING btree ("_order");
  CREATE INDEX "products_documents_parent_id_idx" ON "products_documents" USING btree ("_parent_id");
  CREATE INDEX "products_documents_file_idx" ON "products_documents" USING btree ("file_id");
  CREATE UNIQUE INDEX "products_documents_locales_locale_parent_id_unique" ON "products_documents_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_documents_locales_parent_id_idx" ON "products_documents_locales" USING btree ("_parent_id");
  CREATE INDEX "products_category_idx" ON "products" USING btree ("category_id");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE INDEX "products__status_idx" ON "products" USING btree ("_status");
  CREATE INDEX "products_meta_meta_image_idx" ON "products_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "products_slug_idx" ON "products_locales" USING btree ("slug","_locale");
  CREATE UNIQUE INDEX "products_locales_locale_parent_id_unique" ON "products_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_locales_parent_id_idx" ON "products_locales" USING btree ("_parent_id");
  CREATE INDEX "products_rels_order_idx" ON "products_rels" USING btree ("order");
  CREATE INDEX "products_rels_parent_idx" ON "products_rels" USING btree ("parent_id");
  CREATE INDEX "products_rels_path_idx" ON "products_rels" USING btree ("path");
  CREATE INDEX "products_rels_products_id_idx" ON "products_rels" USING btree ("products_id");
  CREATE INDEX "_products_v_version_gallery_order_idx" ON "_products_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_products_v_version_gallery_parent_id_idx" ON "_products_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_gallery_image_idx" ON "_products_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_products_v_version_specs_order_idx" ON "_products_v_version_specs" USING btree ("_order");
  CREATE INDEX "_products_v_version_specs_parent_id_idx" ON "_products_v_version_specs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_products_v_version_specs_locales_locale_parent_id_unique" ON "_products_v_version_specs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_version_specs_locales_parent_id_idx" ON "_products_v_version_specs_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_applications_order_idx" ON "_products_v_version_applications" USING btree ("_order");
  CREATE INDEX "_products_v_version_applications_parent_id_idx" ON "_products_v_version_applications" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_products_v_version_applications_locales_locale_parent_id_un" ON "_products_v_version_applications_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_version_applications_locales_parent_id_idx" ON "_products_v_version_applications_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_packaging_order_idx" ON "_products_v_version_packaging" USING btree ("_order");
  CREATE INDEX "_products_v_version_packaging_parent_id_idx" ON "_products_v_version_packaging" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_products_v_version_packaging_locales_locale_parent_id_uniqu" ON "_products_v_version_packaging_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_version_packaging_locales_parent_id_idx" ON "_products_v_version_packaging_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_documents_order_idx" ON "_products_v_version_documents" USING btree ("_order");
  CREATE INDEX "_products_v_version_documents_parent_id_idx" ON "_products_v_version_documents" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_documents_file_idx" ON "_products_v_version_documents" USING btree ("file_id");
  CREATE UNIQUE INDEX "_products_v_version_documents_locales_locale_parent_id_uniqu" ON "_products_v_version_documents_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_version_documents_locales_parent_id_idx" ON "_products_v_version_documents_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_parent_idx" ON "_products_v" USING btree ("parent_id");
  CREATE INDEX "_products_v_version_version_category_idx" ON "_products_v" USING btree ("version_category_id");
  CREATE INDEX "_products_v_version_version_updated_at_idx" ON "_products_v" USING btree ("version_updated_at");
  CREATE INDEX "_products_v_version_version_created_at_idx" ON "_products_v" USING btree ("version_created_at");
  CREATE INDEX "_products_v_version_version__status_idx" ON "_products_v" USING btree ("version__status");
  CREATE INDEX "_products_v_created_at_idx" ON "_products_v" USING btree ("created_at");
  CREATE INDEX "_products_v_updated_at_idx" ON "_products_v" USING btree ("updated_at");
  CREATE INDEX "_products_v_snapshot_idx" ON "_products_v" USING btree ("snapshot");
  CREATE INDEX "_products_v_published_locale_idx" ON "_products_v" USING btree ("published_locale");
  CREATE INDEX "_products_v_latest_idx" ON "_products_v" USING btree ("latest");
  CREATE INDEX "_products_v_autosave_idx" ON "_products_v" USING btree ("autosave");
  CREATE INDEX "_products_v_version_meta_version_meta_image_idx" ON "_products_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE INDEX "_products_v_version_version_slug_idx" ON "_products_v_locales" USING btree ("version_slug","_locale");
  CREATE UNIQUE INDEX "_products_v_locales_locale_parent_id_unique" ON "_products_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_locales_parent_id_idx" ON "_products_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_v_rels_order_idx" ON "_products_v_rels" USING btree ("order");
  CREATE INDEX "_products_v_rels_parent_idx" ON "_products_v_rels" USING btree ("parent_id");
  CREATE INDEX "_products_v_rels_path_idx" ON "_products_v_rels" USING btree ("path");
  CREATE INDEX "_products_v_rels_products_id_idx" ON "_products_v_rels" USING btree ("products_id");
  CREATE INDEX "partners__order_idx" ON "partners" USING btree ("_order");
  CREATE INDEX "partners_logo_idx" ON "partners" USING btree ("logo_id");
  CREATE INDEX "partners_type_idx" ON "partners" USING btree ("type_id");
  CREATE INDEX "partners_updated_at_idx" ON "partners" USING btree ("updated_at");
  CREATE INDEX "partners_created_at_idx" ON "partners" USING btree ("created_at");
  CREATE UNIQUE INDEX "partners_locales_locale_parent_id_unique" ON "partners_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "partners_locales_parent_id_idx" ON "partners_locales" USING btree ("_parent_id");
  CREATE INDEX "partner_types__order_idx" ON "partner_types" USING btree ("_order");
  CREATE INDEX "partner_types_updated_at_idx" ON "partner_types" USING btree ("updated_at");
  CREATE INDEX "partner_types_created_at_idx" ON "partner_types" USING btree ("created_at");
  CREATE UNIQUE INDEX "partner_types_locales_locale_parent_id_unique" ON "partner_types_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "partner_types_locales_parent_id_idx" ON "partner_types_locales" USING btree ("_parent_id");
  CREATE INDEX "news_cover_idx" ON "news" USING btree ("cover_id");
  CREATE INDEX "news_updated_at_idx" ON "news" USING btree ("updated_at");
  CREATE INDEX "news_created_at_idx" ON "news" USING btree ("created_at");
  CREATE INDEX "news__status_idx" ON "news" USING btree ("_status");
  CREATE INDEX "news_meta_meta_image_idx" ON "news_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "news_slug_idx" ON "news_locales" USING btree ("slug","_locale");
  CREATE INDEX "news_category_idx" ON "news_locales" USING btree ("category","_locale");
  CREATE UNIQUE INDEX "news_locales_locale_parent_id_unique" ON "news_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "news_locales_parent_id_idx" ON "news_locales" USING btree ("_parent_id");
  CREATE INDEX "news_texts_order_parent" ON "news_texts" USING btree ("order","parent_id");
  CREATE INDEX "news_texts_locale_parent" ON "news_texts" USING btree ("locale","parent_id");
  CREATE INDEX "news_rels_order_idx" ON "news_rels" USING btree ("order");
  CREATE INDEX "news_rels_parent_idx" ON "news_rels" USING btree ("parent_id");
  CREATE INDEX "news_rels_path_idx" ON "news_rels" USING btree ("path");
  CREATE INDEX "news_rels_products_id_idx" ON "news_rels" USING btree ("products_id");
  CREATE INDEX "_news_v_parent_idx" ON "_news_v" USING btree ("parent_id");
  CREATE INDEX "_news_v_version_version_cover_idx" ON "_news_v" USING btree ("version_cover_id");
  CREATE INDEX "_news_v_version_version_updated_at_idx" ON "_news_v" USING btree ("version_updated_at");
  CREATE INDEX "_news_v_version_version_created_at_idx" ON "_news_v" USING btree ("version_created_at");
  CREATE INDEX "_news_v_version_version__status_idx" ON "_news_v" USING btree ("version__status");
  CREATE INDEX "_news_v_created_at_idx" ON "_news_v" USING btree ("created_at");
  CREATE INDEX "_news_v_updated_at_idx" ON "_news_v" USING btree ("updated_at");
  CREATE INDEX "_news_v_snapshot_idx" ON "_news_v" USING btree ("snapshot");
  CREATE INDEX "_news_v_published_locale_idx" ON "_news_v" USING btree ("published_locale");
  CREATE INDEX "_news_v_latest_idx" ON "_news_v" USING btree ("latest");
  CREATE INDEX "_news_v_autosave_idx" ON "_news_v" USING btree ("autosave");
  CREATE INDEX "_news_v_version_meta_version_meta_image_idx" ON "_news_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE INDEX "_news_v_version_version_slug_idx" ON "_news_v_locales" USING btree ("version_slug","_locale");
  CREATE INDEX "_news_v_version_version_category_idx" ON "_news_v_locales" USING btree ("version_category","_locale");
  CREATE UNIQUE INDEX "_news_v_locales_locale_parent_id_unique" ON "_news_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_news_v_locales_parent_id_idx" ON "_news_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_news_v_texts_order_parent" ON "_news_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "_news_v_texts_locale_parent" ON "_news_v_texts" USING btree ("locale","parent_id");
  CREATE INDEX "_news_v_rels_order_idx" ON "_news_v_rels" USING btree ("order");
  CREATE INDEX "_news_v_rels_parent_idx" ON "_news_v_rels" USING btree ("parent_id");
  CREATE INDEX "_news_v_rels_path_idx" ON "_news_v_rels" USING btree ("path");
  CREATE INDEX "_news_v_rels_products_id_idx" ON "_news_v_rels" USING btree ("products_id");
  CREATE INDEX "products_page_hero_hero_image_idx" ON "products_page" USING btree ("hero_image_id");
  CREATE INDEX "products_page_cta_cta_image_idx" ON "products_page" USING btree ("cta_image_id");
  CREATE INDEX "products_page__status_idx" ON "products_page" USING btree ("_status");
  CREATE INDEX "products_page_meta_meta_image_idx" ON "products_page_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "products_page_locales_locale_parent_id_unique" ON "products_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_page_locales_parent_id_idx" ON "products_page_locales" USING btree ("_parent_id");
  CREATE INDEX "_products_page_v_version_hero_version_hero_image_idx" ON "_products_page_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_products_page_v_version_cta_version_cta_image_idx" ON "_products_page_v" USING btree ("version_cta_image_id");
  CREATE INDEX "_products_page_v_version_version__status_idx" ON "_products_page_v" USING btree ("version__status");
  CREATE INDEX "_products_page_v_created_at_idx" ON "_products_page_v" USING btree ("created_at");
  CREATE INDEX "_products_page_v_updated_at_idx" ON "_products_page_v" USING btree ("updated_at");
  CREATE INDEX "_products_page_v_snapshot_idx" ON "_products_page_v" USING btree ("snapshot");
  CREATE INDEX "_products_page_v_published_locale_idx" ON "_products_page_v" USING btree ("published_locale");
  CREATE INDEX "_products_page_v_latest_idx" ON "_products_page_v" USING btree ("latest");
  CREATE INDEX "_products_page_v_autosave_idx" ON "_products_page_v" USING btree ("autosave");
  CREATE INDEX "_products_page_v_version_meta_version_meta_image_idx" ON "_products_page_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_products_page_v_locales_locale_parent_id_unique" ON "_products_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_page_v_locales_parent_id_idx" ON "_products_page_v_locales" USING btree ("_parent_id");
  CREATE INDEX "partners_page_hero_hero_image_idx" ON "partners_page" USING btree ("hero_image_id");
  CREATE INDEX "partners_page_become_become_image_idx" ON "partners_page" USING btree ("become_image_id");
  CREATE INDEX "partners_page__status_idx" ON "partners_page" USING btree ("_status");
  CREATE INDEX "partners_page_meta_meta_image_idx" ON "partners_page_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "partners_page_locales_locale_parent_id_unique" ON "partners_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "partners_page_locales_parent_id_idx" ON "partners_page_locales" USING btree ("_parent_id");
  CREATE INDEX "_partners_page_v_version_hero_version_hero_image_idx" ON "_partners_page_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_partners_page_v_version_become_version_become_image_idx" ON "_partners_page_v" USING btree ("version_become_image_id");
  CREATE INDEX "_partners_page_v_version_version__status_idx" ON "_partners_page_v" USING btree ("version__status");
  CREATE INDEX "_partners_page_v_created_at_idx" ON "_partners_page_v" USING btree ("created_at");
  CREATE INDEX "_partners_page_v_updated_at_idx" ON "_partners_page_v" USING btree ("updated_at");
  CREATE INDEX "_partners_page_v_snapshot_idx" ON "_partners_page_v" USING btree ("snapshot");
  CREATE INDEX "_partners_page_v_published_locale_idx" ON "_partners_page_v" USING btree ("published_locale");
  CREATE INDEX "_partners_page_v_latest_idx" ON "_partners_page_v" USING btree ("latest");
  CREATE INDEX "_partners_page_v_autosave_idx" ON "_partners_page_v" USING btree ("autosave");
  CREATE INDEX "_partners_page_v_version_meta_version_meta_image_idx" ON "_partners_page_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_partners_page_v_locales_locale_parent_id_unique" ON "_partners_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_partners_page_v_locales_parent_id_idx" ON "_partners_page_v_locales" USING btree ("_parent_id");
  CREATE INDEX "news_page_hero_hero_image_idx" ON "news_page" USING btree ("hero_image_id");
  CREATE INDEX "news_page_cta_cta_image_idx" ON "news_page" USING btree ("cta_image_id");
  CREATE INDEX "news_page__status_idx" ON "news_page" USING btree ("_status");
  CREATE INDEX "news_page_meta_meta_image_idx" ON "news_page_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "news_page_locales_locale_parent_id_unique" ON "news_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "news_page_locales_parent_id_idx" ON "news_page_locales" USING btree ("_parent_id");
  CREATE INDEX "_news_page_v_version_hero_version_hero_image_idx" ON "_news_page_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_news_page_v_version_cta_version_cta_image_idx" ON "_news_page_v" USING btree ("version_cta_image_id");
  CREATE INDEX "_news_page_v_version_version__status_idx" ON "_news_page_v" USING btree ("version__status");
  CREATE INDEX "_news_page_v_created_at_idx" ON "_news_page_v" USING btree ("created_at");
  CREATE INDEX "_news_page_v_updated_at_idx" ON "_news_page_v" USING btree ("updated_at");
  CREATE INDEX "_news_page_v_snapshot_idx" ON "_news_page_v" USING btree ("snapshot");
  CREATE INDEX "_news_page_v_published_locale_idx" ON "_news_page_v" USING btree ("published_locale");
  CREATE INDEX "_news_page_v_latest_idx" ON "_news_page_v" USING btree ("latest");
  CREATE INDEX "_news_page_v_autosave_idx" ON "_news_page_v" USING btree ("autosave");
  CREATE INDEX "_news_page_v_version_meta_version_meta_image_idx" ON "_news_page_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_news_page_v_locales_locale_parent_id_unique" ON "_news_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_news_page_v_locales_parent_id_idx" ON "_news_page_v_locales" USING btree ("_parent_id");
  ALTER TABLE "product_categories_locales" ADD CONSTRAINT "product_categories_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_product_categories_v_locales" ADD CONSTRAINT "_product_categories_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partner_types_fk" FOREIGN KEY ("partner_types_id") REFERENCES "public"."partner_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "product_categories_meta_meta_image_idx" ON "product_categories_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "product_categories_slug_idx" ON "product_categories_locales" USING btree ("slug","_locale");
  CREATE INDEX "_product_categories_v_version_meta_version_meta_image_idx" ON "_product_categories_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE INDEX "_product_categories_v_version_version_slug_idx" ON "_product_categories_v_locales" USING btree ("version_slug","_locale");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_partners_id_idx" ON "payload_locked_documents_rels" USING btree ("partners_id");
  CREATE INDEX "payload_locked_documents_rels_partner_types_id_idx" ON "payload_locked_documents_rels" USING btree ("partner_types_id");
  CREATE INDEX "payload_locked_documents_rels_news_id_idx" ON "payload_locked_documents_rels" USING btree ("news_id");
  ALTER TABLE "inquiries" DROP COLUMN "product_interest";`)
}
