import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'id');
  CREATE TYPE "public"."enum_inquiries_status" AS ENUM('new', 'in_progress', 'quoted', 'won', 'lost', 'spam');
  CREATE TYPE "public"."enum_inquiries_form_origin" AS ENUM('contact', 'quote', 'product', 'partner');
  CREATE TYPE "public"."enum_product_categories_icon" AS ENUM('diamond', 'shield', 'leaf', 'flask', 'award', 'users', 'globe', 'factory', 'target', 'eye', 'check', 'truck');
  CREATE TYPE "public"."enum_product_categories_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__product_categories_v_version_icon" AS ENUM('diamond', 'shield', 'leaf', 'flask', 'award', 'users', 'globe', 'factory', 'target', 'eye', 'check', 'truck');
  CREATE TYPE "public"."enum__product_categories_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__product_categories_v_published_locale" AS ENUM('en', 'id');
  CREATE TYPE "public"."enum_products_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__products_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__products_v_published_locale" AS ENUM('en', 'id');
  CREATE TYPE "public"."enum_news_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_v_published_locale" AS ENUM('en', 'id');
  CREATE TYPE "public"."enum_redirects_type" AS ENUM('301', '302');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_home_page_value_props_items_icon" AS ENUM('diamond', 'shield', 'leaf', 'flask', 'award', 'users', 'globe', 'factory', 'target', 'eye', 'check', 'truck');
  CREATE TYPE "public"."enum_home_page_hero_badge_icon" AS ENUM('diamond', 'shield', 'leaf', 'flask', 'award', 'users', 'globe', 'factory', 'target', 'eye', 'check', 'truck');
  CREATE TYPE "public"."enum_home_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_page_v_version_value_props_items_icon" AS ENUM('diamond', 'shield', 'leaf', 'flask', 'award', 'users', 'globe', 'factory', 'target', 'eye', 'check', 'truck');
  CREATE TYPE "public"."enum__home_page_v_version_hero_badge_icon" AS ENUM('diamond', 'shield', 'leaf', 'flask', 'award', 'users', 'globe', 'factory', 'target', 'eye', 'check', 'truck');
  CREATE TYPE "public"."enum__home_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_page_v_published_locale" AS ENUM('en', 'id');
  CREATE TYPE "public"."enum_about_page_vision_mission_cards_icon" AS ENUM('diamond', 'shield', 'leaf', 'flask', 'award', 'users', 'globe', 'factory', 'target', 'eye', 'check', 'truck');
  CREATE TYPE "public"."enum_about_page_values_items_icon" AS ENUM('diamond', 'shield', 'leaf', 'flask', 'award', 'users', 'globe', 'factory', 'target', 'eye', 'check', 'truck');
  CREATE TYPE "public"."enum_about_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__about_page_v_version_vision_mission_cards_icon" AS ENUM('diamond', 'shield', 'leaf', 'flask', 'award', 'users', 'globe', 'factory', 'target', 'eye', 'check', 'truck');
  CREATE TYPE "public"."enum__about_page_v_version_values_items_icon" AS ENUM('diamond', 'shield', 'leaf', 'flask', 'award', 'users', 'globe', 'factory', 'target', 'eye', 'check', 'truck');
  CREATE TYPE "public"."enum__about_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__about_page_v_published_locale" AS ENUM('en', 'id');
  CREATE TYPE "public"."enum_products_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__products_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__products_page_v_published_locale" AS ENUM('en', 'id');
  CREATE TYPE "public"."enum_partners_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__partners_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__partners_page_v_published_locale" AS ENUM('en', 'id');
  CREATE TYPE "public"."enum_news_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_page_v_published_locale" AS ENUM('en', 'id');
  CREATE TYPE "public"."enum_contact_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__contact_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__contact_page_v_published_locale" AS ENUM('en', 'id');
  CREATE TYPE "public"."enum_privacy_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__privacy_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__privacy_page_v_published_locale" AS ENUM('en', 'id');
  CREATE TYPE "public"."enum_site_settings_social_links_platform" AS ENUM('linkedin', 'instagram', 'youtube', 'facebook', 'x');
  CREATE TYPE "public"."enum__site_settings_v_version_social_links_platform" AS ENUM('linkedin', 'instagram', 'youtube', 'facebook', 'x');
  CREATE TABLE "inquiries_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "inquiries_activity" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"at" timestamp(3) with time zone,
  	"message" varchar
  );
  
  CREATE TABLE "inquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"company" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"country" varchar,
  	"type" varchar NOT NULL,
  	"quantity" varchar,
  	"message" varchar NOT NULL,
  	"attachment_id" integer,
  	"consent" boolean,
  	"source_url" varchar,
  	"language" varchar,
  	"ip" varchar,
  	"utm_source" varchar,
  	"utm_medium" varchar,
  	"utm_campaign" varchar,
  	"status" "enum_inquiries_status" DEFAULT 'new' NOT NULL,
  	"form_origin" "enum_inquiries_form_origin" DEFAULT 'contact' NOT NULL,
  	"assigned_to_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "inquiries_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "product_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"image_id" integer,
  	"icon" "enum_product_categories_icon" DEFAULT 'diamond',
  	"meta_canonical" varchar,
  	"meta_noindex" boolean,
  	"show_on_home" boolean DEFAULT true,
  	"hidden" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_product_categories_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "product_categories_locales" (
  	"name" varchar,
  	"description" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"slug" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_product_categories_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version__order" varchar,
  	"version_image_id" integer,
  	"version_icon" "enum__product_categories_v_version_icon" DEFAULT 'diamond',
  	"version_meta_canonical" varchar,
  	"version_meta_noindex" boolean,
  	"version_show_on_home" boolean DEFAULT true,
  	"version_hidden" boolean,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__product_categories_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__product_categories_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_product_categories_v_locales" (
  	"version_name" varchar,
  	"version_description" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_slug" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
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
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"prefix" varchar DEFAULT '',
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "inquiry_attachments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"prefix" varchar DEFAULT '',
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to" varchar NOT NULL,
  	"type" "enum_redirects_type" DEFAULT '301' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"inquiries_id" integer,
  	"product_categories_id" integer,
  	"products_id" integer,
  	"partners_id" integer,
  	"partner_types_id" integer,
  	"news_id" integer,
  	"media_id" integer,
  	"inquiry_attachments_id" integer,
  	"redirects_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "home_page_hero_badge_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_page_hero_badge_lines_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_value_props_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_home_page_value_props_items_icon" DEFAULT 'diamond'
  );
  
  CREATE TABLE "home_page_value_props_items_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_why_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" numeric,
  	"suffix" varchar
  );
  
  CREATE TABLE "home_page_why_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_primary_link" varchar,
  	"hero_secondary_link" varchar,
  	"hero_image_id" integer,
  	"hero_badge_icon" "enum_home_page_hero_badge_icon" DEFAULT 'diamond',
  	"categories_link_link" varchar,
  	"why_button_link" varchar,
  	"why_image_id" integer,
  	"cta_button_link" varchar,
  	"cta_image_id" integer,
  	"show_partners_strip" boolean,
  	"show_latest_news" boolean,
  	"meta_canonical" varchar,
  	"meta_noindex" boolean,
  	"_status" "enum_home_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_locales" (
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_text" varchar,
  	"hero_primary_label" varchar,
  	"hero_secondary_label" varchar,
  	"categories_eyebrow" varchar,
  	"categories_title" varchar,
  	"categories_intro" varchar,
  	"categories_link_label" varchar,
  	"why_eyebrow" varchar,
  	"why_title" varchar,
  	"why_text" varchar,
  	"why_button_label" varchar,
  	"cta_eyebrow" varchar,
  	"cta_title" varchar,
  	"cta_text" varchar,
  	"cta_button_label" varchar,
  	"partners_strip_title" varchar,
  	"latest_news_title" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_page_v_version_hero_badge_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_hero_badge_lines_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_page_v_version_value_props_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__home_page_v_version_value_props_items_icon" DEFAULT 'diamond',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_value_props_items_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_page_v_version_why_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" numeric,
  	"suffix" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_why_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_primary_link" varchar,
  	"version_hero_secondary_link" varchar,
  	"version_hero_image_id" integer,
  	"version_hero_badge_icon" "enum__home_page_v_version_hero_badge_icon" DEFAULT 'diamond',
  	"version_categories_link_link" varchar,
  	"version_why_button_link" varchar,
  	"version_why_image_id" integer,
  	"version_cta_button_link" varchar,
  	"version_cta_image_id" integer,
  	"version_show_partners_strip" boolean,
  	"version_show_latest_news" boolean,
  	"version_meta_canonical" varchar,
  	"version_meta_noindex" boolean,
  	"version__status" "enum__home_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__home_page_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_home_page_v_locales" (
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_hero_text" varchar,
  	"version_hero_primary_label" varchar,
  	"version_hero_secondary_label" varchar,
  	"version_categories_eyebrow" varchar,
  	"version_categories_title" varchar,
  	"version_categories_intro" varchar,
  	"version_categories_link_label" varchar,
  	"version_why_eyebrow" varchar,
  	"version_why_title" varchar,
  	"version_why_text" varchar,
  	"version_why_button_label" varchar,
  	"version_cta_eyebrow" varchar,
  	"version_cta_title" varchar,
  	"version_cta_text" varchar,
  	"version_cta_button_label" varchar,
  	"version_partners_strip_title" varchar,
  	"version_latest_news_title" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "about_page_vision_mission_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_about_page_vision_mission_cards_icon" DEFAULT 'diamond'
  );
  
  CREATE TABLE "about_page_vision_mission_cards_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_values_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_about_page_values_items_icon" DEFAULT 'diamond'
  );
  
  CREATE TABLE "about_page_values_items_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_certifications_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"pdf_id" integer
  );
  
  CREATE TABLE "about_page_certifications_items_locales" (
  	"name" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_facilities_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "about_page_facilities_images_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_stats_block_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" numeric,
  	"suffix" varchar
  );
  
  CREATE TABLE "about_page_stats_block_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"story_image_id" integer,
  	"cta_button_link" varchar,
  	"cta_image_id" integer,
  	"meta_canonical" varchar,
  	"meta_noindex" boolean,
  	"_status" "enum_about_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_page_locales" (
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_intro" varchar,
  	"story_eyebrow" varchar,
  	"story_title" varchar,
  	"story_body" jsonb,
  	"vision_mission_eyebrow" varchar,
  	"vision_mission_title" varchar,
  	"values_eyebrow" varchar,
  	"values_title" varchar,
  	"certifications_eyebrow" varchar,
  	"certifications_title" varchar,
  	"facilities_eyebrow" varchar,
  	"facilities_title" varchar,
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
  
  CREATE TABLE "_about_page_v_version_vision_mission_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__about_page_v_version_vision_mission_cards_icon" DEFAULT 'diamond',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_vision_mission_cards_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_about_page_v_version_values_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__about_page_v_version_values_items_icon" DEFAULT 'diamond',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_values_items_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_about_page_v_version_certifications_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"pdf_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_certifications_items_locales" (
  	"name" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_about_page_v_version_facilities_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_facilities_images_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_about_page_v_version_stats_block_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" numeric,
  	"suffix" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_stats_block_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_about_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_id" integer,
  	"version_story_image_id" integer,
  	"version_cta_button_link" varchar,
  	"version_cta_image_id" integer,
  	"version_meta_canonical" varchar,
  	"version_meta_noindex" boolean,
  	"version__status" "enum__about_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__about_page_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_about_page_v_locales" (
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_hero_intro" varchar,
  	"version_story_eyebrow" varchar,
  	"version_story_title" varchar,
  	"version_story_body" jsonb,
  	"version_vision_mission_eyebrow" varchar,
  	"version_vision_mission_title" varchar,
  	"version_values_eyebrow" varchar,
  	"version_values_title" varchar,
  	"version_certifications_eyebrow" varchar,
  	"version_certifications_title" varchar,
  	"version_facilities_eyebrow" varchar,
  	"version_facilities_title" varchar,
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
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"office_map_image_id" integer,
  	"meta_canonical" varchar,
  	"meta_noindex" boolean,
  	"_status" "enum_contact_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_page_locales" (
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_intro" varchar,
  	"form_eyebrow" varchar,
  	"form_title" varchar,
  	"form_text" varchar,
  	"form_thank_you_title" varchar,
  	"form_thank_you_text" varchar,
  	"office_eyebrow" varchar,
  	"office_title" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_contact_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_id" integer,
  	"version_office_map_image_id" integer,
  	"version_meta_canonical" varchar,
  	"version_meta_noindex" boolean,
  	"version__status" "enum__contact_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__contact_page_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_contact_page_v_locales" (
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_hero_intro" varchar,
  	"version_form_eyebrow" varchar,
  	"version_form_title" varchar,
  	"version_form_text" varchar,
  	"version_form_thank_you_title" varchar,
  	"version_form_thank_you_text" varchar,
  	"version_office_eyebrow" varchar,
  	"version_office_title" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "privacy_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_canonical" varchar,
  	"meta_noindex" boolean,
  	"_status" "enum_privacy_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "privacy_page_locales" (
  	"title" varchar,
  	"body" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_privacy_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_meta_canonical" varchar,
  	"version_meta_noindex" boolean,
  	"version__status" "enum__privacy_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__privacy_page_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_privacy_page_v_locales" (
  	"version_title" varchar,
  	"version_body" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "navigation_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar NOT NULL,
  	"visible" boolean DEFAULT true
  );
  
  CREATE TABLE "navigation_items_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_link" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "navigation_locales" (
  	"cta_label" varchar,
  	"quick_links_title" varchar,
  	"products_title" varchar,
  	"contact_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_navigation_v_version_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link" varchar NOT NULL,
  	"visible" boolean DEFAULT true,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_navigation_v_version_items_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_navigation_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_cta_link" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_navigation_v_locales" (
  	"version_cta_label" varchar,
  	"version_quick_links_title" varchar,
  	"version_products_title" varchar,
  	"version_contact_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_settings_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_settings_social_links_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_notification_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_inquiry_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "site_settings_inquiry_types_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"company_name" varchar DEFAULT 'Chemillion' NOT NULL,
  	"logo_id" integer,
  	"logo_dark_id" integer,
  	"default_og_image_id" integer,
  	"phone" varchar,
  	"whatsapp" varchar,
  	"email" varchar,
  	"latitude" numeric,
  	"longitude" numeric,
  	"retention_months" numeric DEFAULT 24,
  	"ga_id" varchar,
  	"search_console_token" varchar,
  	"map_embed_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"address" varchar,
  	"office_hours" varchar,
  	"copyright" varchar,
  	"follow_label" varchar DEFAULT 'Follow Us',
  	"auto_reply_subject" varchar,
  	"auto_reply_body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_site_settings_v_version_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"platform" "enum__site_settings_v_version_social_links_platform" NOT NULL,
  	"url" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_settings_v_version_notification_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_settings_v_version_inquiry_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_settings_v_version_inquiry_types_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_site_settings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_company_name" varchar DEFAULT 'Chemillion' NOT NULL,
  	"version_logo_id" integer,
  	"version_logo_dark_id" integer,
  	"version_default_og_image_id" integer,
  	"version_phone" varchar,
  	"version_whatsapp" varchar,
  	"version_email" varchar,
  	"version_latitude" numeric,
  	"version_longitude" numeric,
  	"version_retention_months" numeric DEFAULT 24,
  	"version_ga_id" varchar,
  	"version_search_console_token" varchar,
  	"version_map_embed_url" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_site_settings_v_locales" (
  	"version_address" varchar,
  	"version_office_hours" varchar,
  	"version_copyright" varchar,
  	"version_follow_label" varchar DEFAULT 'Follow Us',
  	"version_auto_reply_subject" varchar,
  	"version_auto_reply_body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "inquiries_notes" ADD CONSTRAINT "inquiries_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."inquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "inquiries_activity" ADD CONSTRAINT "inquiries_activity_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."inquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "inquiries" ADD CONSTRAINT "inquiries_attachment_id_inquiry_attachments_id_fk" FOREIGN KEY ("attachment_id") REFERENCES "public"."inquiry_attachments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "inquiries" ADD CONSTRAINT "inquiries_assigned_to_id_users_id_fk" FOREIGN KEY ("assigned_to_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "inquiries_rels" ADD CONSTRAINT "inquiries_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."inquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "inquiries_rels" ADD CONSTRAINT "inquiries_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "product_categories_locales" ADD CONSTRAINT "product_categories_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "product_categories_locales" ADD CONSTRAINT "product_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_product_categories_v" ADD CONSTRAINT "_product_categories_v_parent_id_product_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_product_categories_v" ADD CONSTRAINT "_product_categories_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_product_categories_v_locales" ADD CONSTRAINT "_product_categories_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_product_categories_v_locales" ADD CONSTRAINT "_product_categories_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_product_categories_v"("id") ON DELETE cascade ON UPDATE no action;
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
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_inquiries_fk" FOREIGN KEY ("inquiries_id") REFERENCES "public"."inquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partner_types_fk" FOREIGN KEY ("partner_types_id") REFERENCES "public"."partner_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_inquiry_attachments_fk" FOREIGN KEY ("inquiry_attachments_id") REFERENCES "public"."inquiry_attachments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_hero_badge_lines" ADD CONSTRAINT "home_page_hero_badge_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_hero_badge_lines_locales" ADD CONSTRAINT "home_page_hero_badge_lines_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_hero_badge_lines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_value_props_items" ADD CONSTRAINT "home_page_value_props_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_value_props_items_locales" ADD CONSTRAINT "home_page_value_props_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_value_props_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_why_stats" ADD CONSTRAINT "home_page_why_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_why_stats_locales" ADD CONSTRAINT "home_page_why_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_why_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_why_image_id_media_id_fk" FOREIGN KEY ("why_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_cta_image_id_media_id_fk" FOREIGN KEY ("cta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_locales" ADD CONSTRAINT "home_page_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_locales" ADD CONSTRAINT "home_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_hero_badge_lines" ADD CONSTRAINT "_home_page_v_version_hero_badge_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_hero_badge_lines_locales" ADD CONSTRAINT "_home_page_v_version_hero_badge_lines_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_version_hero_badge_lines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_value_props_items" ADD CONSTRAINT "_home_page_v_version_value_props_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_value_props_items_locales" ADD CONSTRAINT "_home_page_v_version_value_props_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_version_value_props_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_why_stats" ADD CONSTRAINT "_home_page_v_version_why_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_why_stats_locales" ADD CONSTRAINT "_home_page_v_version_why_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_version_why_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v" ADD CONSTRAINT "_home_page_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v" ADD CONSTRAINT "_home_page_v_version_why_image_id_media_id_fk" FOREIGN KEY ("version_why_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v" ADD CONSTRAINT "_home_page_v_version_cta_image_id_media_id_fk" FOREIGN KEY ("version_cta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v_locales" ADD CONSTRAINT "_home_page_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v_locales" ADD CONSTRAINT "_home_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_vision_mission_cards" ADD CONSTRAINT "about_page_vision_mission_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_vision_mission_cards_locales" ADD CONSTRAINT "about_page_vision_mission_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_vision_mission_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_values_items" ADD CONSTRAINT "about_page_values_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_values_items_locales" ADD CONSTRAINT "about_page_values_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_values_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_certifications_items" ADD CONSTRAINT "about_page_certifications_items_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_certifications_items" ADD CONSTRAINT "about_page_certifications_items_pdf_id_media_id_fk" FOREIGN KEY ("pdf_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_certifications_items" ADD CONSTRAINT "about_page_certifications_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_certifications_items_locales" ADD CONSTRAINT "about_page_certifications_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_certifications_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_facilities_images" ADD CONSTRAINT "about_page_facilities_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_facilities_images" ADD CONSTRAINT "about_page_facilities_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_facilities_images_locales" ADD CONSTRAINT "about_page_facilities_images_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_facilities_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_stats_block_stats" ADD CONSTRAINT "about_page_stats_block_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_stats_block_stats_locales" ADD CONSTRAINT "about_page_stats_block_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_stats_block_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_story_image_id_media_id_fk" FOREIGN KEY ("story_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_cta_image_id_media_id_fk" FOREIGN KEY ("cta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_locales" ADD CONSTRAINT "about_page_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_locales" ADD CONSTRAINT "about_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_vision_mission_cards" ADD CONSTRAINT "_about_page_v_version_vision_mission_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_vision_mission_cards_locales" ADD CONSTRAINT "_about_page_v_version_vision_mission_cards_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v_version_vision_mission_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_values_items" ADD CONSTRAINT "_about_page_v_version_values_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_values_items_locales" ADD CONSTRAINT "_about_page_v_version_values_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v_version_values_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_certifications_items" ADD CONSTRAINT "_about_page_v_version_certifications_items_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_certifications_items" ADD CONSTRAINT "_about_page_v_version_certifications_items_pdf_id_media_id_fk" FOREIGN KEY ("pdf_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_certifications_items" ADD CONSTRAINT "_about_page_v_version_certifications_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_certifications_items_locales" ADD CONSTRAINT "_about_page_v_version_certifications_items_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v_version_certifications_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_facilities_images" ADD CONSTRAINT "_about_page_v_version_facilities_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_facilities_images" ADD CONSTRAINT "_about_page_v_version_facilities_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_facilities_images_locales" ADD CONSTRAINT "_about_page_v_version_facilities_images_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v_version_facilities_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_stats_block_stats" ADD CONSTRAINT "_about_page_v_version_stats_block_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_stats_block_stats_locales" ADD CONSTRAINT "_about_page_v_version_stats_block_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v_version_stats_block_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v" ADD CONSTRAINT "_about_page_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v" ADD CONSTRAINT "_about_page_v_version_story_image_id_media_id_fk" FOREIGN KEY ("version_story_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v" ADD CONSTRAINT "_about_page_v_version_cta_image_id_media_id_fk" FOREIGN KEY ("version_cta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v_locales" ADD CONSTRAINT "_about_page_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v_locales" ADD CONSTRAINT "_about_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
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
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_office_map_image_id_media_id_fk" FOREIGN KEY ("office_map_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_locales" ADD CONSTRAINT "contact_page_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_locales" ADD CONSTRAINT "contact_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contact_page_v" ADD CONSTRAINT "_contact_page_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_contact_page_v" ADD CONSTRAINT "_contact_page_v_version_office_map_image_id_media_id_fk" FOREIGN KEY ("version_office_map_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_contact_page_v_locales" ADD CONSTRAINT "_contact_page_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_contact_page_v_locales" ADD CONSTRAINT "_contact_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contact_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_page_locales" ADD CONSTRAINT "privacy_page_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "privacy_page_locales" ADD CONSTRAINT "privacy_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_privacy_page_v_locales" ADD CONSTRAINT "_privacy_page_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_privacy_page_v_locales" ADD CONSTRAINT "_privacy_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_privacy_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_items" ADD CONSTRAINT "navigation_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_items_locales" ADD CONSTRAINT "navigation_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_locales" ADD CONSTRAINT "navigation_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_navigation_v_version_items" ADD CONSTRAINT "_navigation_v_version_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_navigation_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_navigation_v_version_items_locales" ADD CONSTRAINT "_navigation_v_version_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_navigation_v_version_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_navigation_v_locales" ADD CONSTRAINT "_navigation_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_navigation_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_links" ADD CONSTRAINT "site_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_notification_emails" ADD CONSTRAINT "site_settings_notification_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_inquiry_types" ADD CONSTRAINT "site_settings_inquiry_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_inquiry_types_locales" ADD CONSTRAINT "site_settings_inquiry_types_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_inquiry_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_dark_id_media_id_fk" FOREIGN KEY ("logo_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_og_image_id_media_id_fk" FOREIGN KEY ("default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_social_links" ADD CONSTRAINT "_site_settings_v_version_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_notification_emails" ADD CONSTRAINT "_site_settings_v_version_notification_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_inquiry_types" ADD CONSTRAINT "_site_settings_v_version_inquiry_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_inquiry_types_locales" ADD CONSTRAINT "_site_settings_v_version_inquiry_types_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v_version_inquiry_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_logo_dark_id_media_id_fk" FOREIGN KEY ("version_logo_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_default_og_image_id_media_id_fk" FOREIGN KEY ("version_default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v_locales" ADD CONSTRAINT "_site_settings_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "inquiries_notes_order_idx" ON "inquiries_notes" USING btree ("_order");
  CREATE INDEX "inquiries_notes_parent_id_idx" ON "inquiries_notes" USING btree ("_parent_id");
  CREATE INDEX "inquiries_activity_order_idx" ON "inquiries_activity" USING btree ("_order");
  CREATE INDEX "inquiries_activity_parent_id_idx" ON "inquiries_activity" USING btree ("_parent_id");
  CREATE INDEX "inquiries_type_idx" ON "inquiries" USING btree ("type");
  CREATE INDEX "inquiries_attachment_idx" ON "inquiries" USING btree ("attachment_id");
  CREATE INDEX "inquiries_status_idx" ON "inquiries" USING btree ("status");
  CREATE INDEX "inquiries_form_origin_idx" ON "inquiries" USING btree ("form_origin");
  CREATE INDEX "inquiries_assigned_to_idx" ON "inquiries" USING btree ("assigned_to_id");
  CREATE INDEX "inquiries_updated_at_idx" ON "inquiries" USING btree ("updated_at");
  CREATE INDEX "inquiries_created_at_idx" ON "inquiries" USING btree ("created_at");
  CREATE INDEX "inquiries_rels_order_idx" ON "inquiries_rels" USING btree ("order");
  CREATE INDEX "inquiries_rels_parent_idx" ON "inquiries_rels" USING btree ("parent_id");
  CREATE INDEX "inquiries_rels_path_idx" ON "inquiries_rels" USING btree ("path");
  CREATE INDEX "inquiries_rels_products_id_idx" ON "inquiries_rels" USING btree ("products_id");
  CREATE INDEX "product_categories__order_idx" ON "product_categories" USING btree ("_order");
  CREATE INDEX "product_categories_image_idx" ON "product_categories" USING btree ("image_id");
  CREATE INDEX "product_categories_updated_at_idx" ON "product_categories" USING btree ("updated_at");
  CREATE INDEX "product_categories_created_at_idx" ON "product_categories" USING btree ("created_at");
  CREATE INDEX "product_categories__status_idx" ON "product_categories" USING btree ("_status");
  CREATE INDEX "product_categories_meta_meta_image_idx" ON "product_categories_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "product_categories_slug_idx" ON "product_categories_locales" USING btree ("slug","_locale");
  CREATE UNIQUE INDEX "product_categories_locales_locale_parent_id_unique" ON "product_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "product_categories_locales_parent_id_idx" ON "product_categories_locales" USING btree ("_parent_id");
  CREATE INDEX "_product_categories_v_parent_idx" ON "_product_categories_v" USING btree ("parent_id");
  CREATE INDEX "_product_categories_v_version_version__order_idx" ON "_product_categories_v" USING btree ("version__order");
  CREATE INDEX "_product_categories_v_version_version_image_idx" ON "_product_categories_v" USING btree ("version_image_id");
  CREATE INDEX "_product_categories_v_version_version_updated_at_idx" ON "_product_categories_v" USING btree ("version_updated_at");
  CREATE INDEX "_product_categories_v_version_version_created_at_idx" ON "_product_categories_v" USING btree ("version_created_at");
  CREATE INDEX "_product_categories_v_version_version__status_idx" ON "_product_categories_v" USING btree ("version__status");
  CREATE INDEX "_product_categories_v_created_at_idx" ON "_product_categories_v" USING btree ("created_at");
  CREATE INDEX "_product_categories_v_updated_at_idx" ON "_product_categories_v" USING btree ("updated_at");
  CREATE INDEX "_product_categories_v_snapshot_idx" ON "_product_categories_v" USING btree ("snapshot");
  CREATE INDEX "_product_categories_v_published_locale_idx" ON "_product_categories_v" USING btree ("published_locale");
  CREATE INDEX "_product_categories_v_latest_idx" ON "_product_categories_v" USING btree ("latest");
  CREATE INDEX "_product_categories_v_autosave_idx" ON "_product_categories_v" USING btree ("autosave");
  CREATE INDEX "_product_categories_v_version_meta_version_meta_image_idx" ON "_product_categories_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE INDEX "_product_categories_v_version_version_slug_idx" ON "_product_categories_v_locales" USING btree ("version_slug","_locale");
  CREATE UNIQUE INDEX "_product_categories_v_locales_locale_parent_id_unique" ON "_product_categories_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_product_categories_v_locales_parent_id_idx" ON "_product_categories_v_locales" USING btree ("_parent_id");
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
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_locales_parent_id_idx" ON "media_locales" USING btree ("_parent_id");
  CREATE INDEX "inquiry_attachments_updated_at_idx" ON "inquiry_attachments" USING btree ("updated_at");
  CREATE INDEX "inquiry_attachments_created_at_idx" ON "inquiry_attachments" USING btree ("created_at");
  CREATE UNIQUE INDEX "inquiry_attachments_filename_idx" ON "inquiry_attachments" USING btree ("filename");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_inquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("inquiries_id");
  CREATE INDEX "payload_locked_documents_rels_product_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("product_categories_id");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_partners_id_idx" ON "payload_locked_documents_rels" USING btree ("partners_id");
  CREATE INDEX "payload_locked_documents_rels_partner_types_id_idx" ON "payload_locked_documents_rels" USING btree ("partner_types_id");
  CREATE INDEX "payload_locked_documents_rels_news_id_idx" ON "payload_locked_documents_rels" USING btree ("news_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_inquiry_attachments_id_idx" ON "payload_locked_documents_rels" USING btree ("inquiry_attachments_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "home_page_hero_badge_lines_order_idx" ON "home_page_hero_badge_lines" USING btree ("_order");
  CREATE INDEX "home_page_hero_badge_lines_parent_id_idx" ON "home_page_hero_badge_lines" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_hero_badge_lines_locales_locale_parent_id_unique" ON "home_page_hero_badge_lines_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_hero_badge_lines_locales_parent_id_idx" ON "home_page_hero_badge_lines_locales" USING btree ("_parent_id");
  CREATE INDEX "home_page_value_props_items_order_idx" ON "home_page_value_props_items" USING btree ("_order");
  CREATE INDEX "home_page_value_props_items_parent_id_idx" ON "home_page_value_props_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_value_props_items_locales_locale_parent_id_unique" ON "home_page_value_props_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_value_props_items_locales_parent_id_idx" ON "home_page_value_props_items_locales" USING btree ("_parent_id");
  CREATE INDEX "home_page_why_stats_order_idx" ON "home_page_why_stats" USING btree ("_order");
  CREATE INDEX "home_page_why_stats_parent_id_idx" ON "home_page_why_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_why_stats_locales_locale_parent_id_unique" ON "home_page_why_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_why_stats_locales_parent_id_idx" ON "home_page_why_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "home_page_hero_hero_image_idx" ON "home_page" USING btree ("hero_image_id");
  CREATE INDEX "home_page_why_why_image_idx" ON "home_page" USING btree ("why_image_id");
  CREATE INDEX "home_page_cta_cta_image_idx" ON "home_page" USING btree ("cta_image_id");
  CREATE INDEX "home_page__status_idx" ON "home_page" USING btree ("_status");
  CREATE INDEX "home_page_meta_meta_image_idx" ON "home_page_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "home_page_locales_locale_parent_id_unique" ON "home_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_locales_parent_id_idx" ON "home_page_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_hero_badge_lines_order_idx" ON "_home_page_v_version_hero_badge_lines" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_hero_badge_lines_parent_id_idx" ON "_home_page_v_version_hero_badge_lines" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_page_v_version_hero_badge_lines_locales_locale_parent_" ON "_home_page_v_version_hero_badge_lines_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_page_v_version_hero_badge_lines_locales_parent_id_idx" ON "_home_page_v_version_hero_badge_lines_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_value_props_items_order_idx" ON "_home_page_v_version_value_props_items" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_value_props_items_parent_id_idx" ON "_home_page_v_version_value_props_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_page_v_version_value_props_items_locales_locale_parent" ON "_home_page_v_version_value_props_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_page_v_version_value_props_items_locales_parent_id_idx" ON "_home_page_v_version_value_props_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_why_stats_order_idx" ON "_home_page_v_version_why_stats" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_why_stats_parent_id_idx" ON "_home_page_v_version_why_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_page_v_version_why_stats_locales_locale_parent_id_uniq" ON "_home_page_v_version_why_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_page_v_version_why_stats_locales_parent_id_idx" ON "_home_page_v_version_why_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_hero_version_hero_image_idx" ON "_home_page_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_home_page_v_version_why_version_why_image_idx" ON "_home_page_v" USING btree ("version_why_image_id");
  CREATE INDEX "_home_page_v_version_cta_version_cta_image_idx" ON "_home_page_v" USING btree ("version_cta_image_id");
  CREATE INDEX "_home_page_v_version_version__status_idx" ON "_home_page_v" USING btree ("version__status");
  CREATE INDEX "_home_page_v_created_at_idx" ON "_home_page_v" USING btree ("created_at");
  CREATE INDEX "_home_page_v_updated_at_idx" ON "_home_page_v" USING btree ("updated_at");
  CREATE INDEX "_home_page_v_snapshot_idx" ON "_home_page_v" USING btree ("snapshot");
  CREATE INDEX "_home_page_v_published_locale_idx" ON "_home_page_v" USING btree ("published_locale");
  CREATE INDEX "_home_page_v_latest_idx" ON "_home_page_v" USING btree ("latest");
  CREATE INDEX "_home_page_v_autosave_idx" ON "_home_page_v" USING btree ("autosave");
  CREATE INDEX "_home_page_v_version_meta_version_meta_image_idx" ON "_home_page_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_home_page_v_locales_locale_parent_id_unique" ON "_home_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_page_v_locales_parent_id_idx" ON "_home_page_v_locales" USING btree ("_parent_id");
  CREATE INDEX "about_page_vision_mission_cards_order_idx" ON "about_page_vision_mission_cards" USING btree ("_order");
  CREATE INDEX "about_page_vision_mission_cards_parent_id_idx" ON "about_page_vision_mission_cards" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "about_page_vision_mission_cards_locales_locale_parent_id_uni" ON "about_page_vision_mission_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page_vision_mission_cards_locales_parent_id_idx" ON "about_page_vision_mission_cards_locales" USING btree ("_parent_id");
  CREATE INDEX "about_page_values_items_order_idx" ON "about_page_values_items" USING btree ("_order");
  CREATE INDEX "about_page_values_items_parent_id_idx" ON "about_page_values_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "about_page_values_items_locales_locale_parent_id_unique" ON "about_page_values_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page_values_items_locales_parent_id_idx" ON "about_page_values_items_locales" USING btree ("_parent_id");
  CREATE INDEX "about_page_certifications_items_order_idx" ON "about_page_certifications_items" USING btree ("_order");
  CREATE INDEX "about_page_certifications_items_parent_id_idx" ON "about_page_certifications_items" USING btree ("_parent_id");
  CREATE INDEX "about_page_certifications_items_logo_idx" ON "about_page_certifications_items" USING btree ("logo_id");
  CREATE INDEX "about_page_certifications_items_pdf_idx" ON "about_page_certifications_items" USING btree ("pdf_id");
  CREATE UNIQUE INDEX "about_page_certifications_items_locales_locale_parent_id_uni" ON "about_page_certifications_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page_certifications_items_locales_parent_id_idx" ON "about_page_certifications_items_locales" USING btree ("_parent_id");
  CREATE INDEX "about_page_facilities_images_order_idx" ON "about_page_facilities_images" USING btree ("_order");
  CREATE INDEX "about_page_facilities_images_parent_id_idx" ON "about_page_facilities_images" USING btree ("_parent_id");
  CREATE INDEX "about_page_facilities_images_image_idx" ON "about_page_facilities_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "about_page_facilities_images_locales_locale_parent_id_unique" ON "about_page_facilities_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page_facilities_images_locales_parent_id_idx" ON "about_page_facilities_images_locales" USING btree ("_parent_id");
  CREATE INDEX "about_page_stats_block_stats_order_idx" ON "about_page_stats_block_stats" USING btree ("_order");
  CREATE INDEX "about_page_stats_block_stats_parent_id_idx" ON "about_page_stats_block_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "about_page_stats_block_stats_locales_locale_parent_id_unique" ON "about_page_stats_block_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page_stats_block_stats_locales_parent_id_idx" ON "about_page_stats_block_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "about_page_hero_hero_image_idx" ON "about_page" USING btree ("hero_image_id");
  CREATE INDEX "about_page_story_story_image_idx" ON "about_page" USING btree ("story_image_id");
  CREATE INDEX "about_page_cta_cta_image_idx" ON "about_page" USING btree ("cta_image_id");
  CREATE INDEX "about_page__status_idx" ON "about_page" USING btree ("_status");
  CREATE INDEX "about_page_meta_meta_image_idx" ON "about_page_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "about_page_locales_locale_parent_id_unique" ON "about_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page_locales_parent_id_idx" ON "about_page_locales" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_vision_mission_cards_order_idx" ON "_about_page_v_version_vision_mission_cards" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_vision_mission_cards_parent_id_idx" ON "_about_page_v_version_vision_mission_cards" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_about_page_v_version_vision_mission_cards_locales_locale_pa" ON "_about_page_v_version_vision_mission_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_about_page_v_version_vision_mission_cards_locales_paren_idx" ON "_about_page_v_version_vision_mission_cards_locales" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_values_items_order_idx" ON "_about_page_v_version_values_items" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_values_items_parent_id_idx" ON "_about_page_v_version_values_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_about_page_v_version_values_items_locales_locale_parent_id_" ON "_about_page_v_version_values_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_about_page_v_version_values_items_locales_parent_id_idx" ON "_about_page_v_version_values_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_certifications_items_order_idx" ON "_about_page_v_version_certifications_items" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_certifications_items_parent_id_idx" ON "_about_page_v_version_certifications_items" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_certifications_items_logo_idx" ON "_about_page_v_version_certifications_items" USING btree ("logo_id");
  CREATE INDEX "_about_page_v_version_certifications_items_pdf_idx" ON "_about_page_v_version_certifications_items" USING btree ("pdf_id");
  CREATE UNIQUE INDEX "_about_page_v_version_certifications_items_locales_locale_pa" ON "_about_page_v_version_certifications_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_about_page_v_version_certifications_items_locales_paren_idx" ON "_about_page_v_version_certifications_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_facilities_images_order_idx" ON "_about_page_v_version_facilities_images" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_facilities_images_parent_id_idx" ON "_about_page_v_version_facilities_images" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_facilities_images_image_idx" ON "_about_page_v_version_facilities_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "_about_page_v_version_facilities_images_locales_locale_paren" ON "_about_page_v_version_facilities_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_about_page_v_version_facilities_images_locales_parent_i_idx" ON "_about_page_v_version_facilities_images_locales" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_stats_block_stats_order_idx" ON "_about_page_v_version_stats_block_stats" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_stats_block_stats_parent_id_idx" ON "_about_page_v_version_stats_block_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_about_page_v_version_stats_block_stats_locales_locale_paren" ON "_about_page_v_version_stats_block_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_about_page_v_version_stats_block_stats_locales_parent_i_idx" ON "_about_page_v_version_stats_block_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_hero_version_hero_image_idx" ON "_about_page_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_about_page_v_version_story_version_story_image_idx" ON "_about_page_v" USING btree ("version_story_image_id");
  CREATE INDEX "_about_page_v_version_cta_version_cta_image_idx" ON "_about_page_v" USING btree ("version_cta_image_id");
  CREATE INDEX "_about_page_v_version_version__status_idx" ON "_about_page_v" USING btree ("version__status");
  CREATE INDEX "_about_page_v_created_at_idx" ON "_about_page_v" USING btree ("created_at");
  CREATE INDEX "_about_page_v_updated_at_idx" ON "_about_page_v" USING btree ("updated_at");
  CREATE INDEX "_about_page_v_snapshot_idx" ON "_about_page_v" USING btree ("snapshot");
  CREATE INDEX "_about_page_v_published_locale_idx" ON "_about_page_v" USING btree ("published_locale");
  CREATE INDEX "_about_page_v_latest_idx" ON "_about_page_v" USING btree ("latest");
  CREATE INDEX "_about_page_v_autosave_idx" ON "_about_page_v" USING btree ("autosave");
  CREATE INDEX "_about_page_v_version_meta_version_meta_image_idx" ON "_about_page_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_about_page_v_locales_locale_parent_id_unique" ON "_about_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_about_page_v_locales_parent_id_idx" ON "_about_page_v_locales" USING btree ("_parent_id");
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
  CREATE INDEX "contact_page_hero_hero_image_idx" ON "contact_page" USING btree ("hero_image_id");
  CREATE INDEX "contact_page_office_office_map_image_idx" ON "contact_page" USING btree ("office_map_image_id");
  CREATE INDEX "contact_page__status_idx" ON "contact_page" USING btree ("_status");
  CREATE INDEX "contact_page_meta_meta_image_idx" ON "contact_page_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "contact_page_locales_locale_parent_id_unique" ON "contact_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_page_locales_parent_id_idx" ON "contact_page_locales" USING btree ("_parent_id");
  CREATE INDEX "_contact_page_v_version_hero_version_hero_image_idx" ON "_contact_page_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_contact_page_v_version_office_version_office_map_image_idx" ON "_contact_page_v" USING btree ("version_office_map_image_id");
  CREATE INDEX "_contact_page_v_version_version__status_idx" ON "_contact_page_v" USING btree ("version__status");
  CREATE INDEX "_contact_page_v_created_at_idx" ON "_contact_page_v" USING btree ("created_at");
  CREATE INDEX "_contact_page_v_updated_at_idx" ON "_contact_page_v" USING btree ("updated_at");
  CREATE INDEX "_contact_page_v_snapshot_idx" ON "_contact_page_v" USING btree ("snapshot");
  CREATE INDEX "_contact_page_v_published_locale_idx" ON "_contact_page_v" USING btree ("published_locale");
  CREATE INDEX "_contact_page_v_latest_idx" ON "_contact_page_v" USING btree ("latest");
  CREATE INDEX "_contact_page_v_autosave_idx" ON "_contact_page_v" USING btree ("autosave");
  CREATE INDEX "_contact_page_v_version_meta_version_meta_image_idx" ON "_contact_page_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_contact_page_v_locales_locale_parent_id_unique" ON "_contact_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_contact_page_v_locales_parent_id_idx" ON "_contact_page_v_locales" USING btree ("_parent_id");
  CREATE INDEX "privacy_page__status_idx" ON "privacy_page" USING btree ("_status");
  CREATE INDEX "privacy_page_meta_meta_image_idx" ON "privacy_page_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "privacy_page_locales_locale_parent_id_unique" ON "privacy_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "privacy_page_locales_parent_id_idx" ON "privacy_page_locales" USING btree ("_parent_id");
  CREATE INDEX "_privacy_page_v_version_version__status_idx" ON "_privacy_page_v" USING btree ("version__status");
  CREATE INDEX "_privacy_page_v_created_at_idx" ON "_privacy_page_v" USING btree ("created_at");
  CREATE INDEX "_privacy_page_v_updated_at_idx" ON "_privacy_page_v" USING btree ("updated_at");
  CREATE INDEX "_privacy_page_v_snapshot_idx" ON "_privacy_page_v" USING btree ("snapshot");
  CREATE INDEX "_privacy_page_v_published_locale_idx" ON "_privacy_page_v" USING btree ("published_locale");
  CREATE INDEX "_privacy_page_v_latest_idx" ON "_privacy_page_v" USING btree ("latest");
  CREATE INDEX "_privacy_page_v_autosave_idx" ON "_privacy_page_v" USING btree ("autosave");
  CREATE INDEX "_privacy_page_v_version_meta_version_meta_image_idx" ON "_privacy_page_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_privacy_page_v_locales_locale_parent_id_unique" ON "_privacy_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_privacy_page_v_locales_parent_id_idx" ON "_privacy_page_v_locales" USING btree ("_parent_id");
  CREATE INDEX "navigation_items_order_idx" ON "navigation_items" USING btree ("_order");
  CREATE INDEX "navigation_items_parent_id_idx" ON "navigation_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "navigation_items_locales_locale_parent_id_unique" ON "navigation_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_items_locales_parent_id_idx" ON "navigation_items_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "navigation_locales_locale_parent_id_unique" ON "navigation_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_locales_parent_id_idx" ON "navigation_locales" USING btree ("_parent_id");
  CREATE INDEX "_navigation_v_version_items_order_idx" ON "_navigation_v_version_items" USING btree ("_order");
  CREATE INDEX "_navigation_v_version_items_parent_id_idx" ON "_navigation_v_version_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_navigation_v_version_items_locales_locale_parent_id_unique" ON "_navigation_v_version_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_navigation_v_version_items_locales_parent_id_idx" ON "_navigation_v_version_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_navigation_v_created_at_idx" ON "_navigation_v" USING btree ("created_at");
  CREATE INDEX "_navigation_v_updated_at_idx" ON "_navigation_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_navigation_v_locales_locale_parent_id_unique" ON "_navigation_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_navigation_v_locales_parent_id_idx" ON "_navigation_v_locales" USING btree ("_parent_id");
  CREATE INDEX "site_settings_social_links_order_idx" ON "site_settings_social_links" USING btree ("_order");
  CREATE INDEX "site_settings_social_links_parent_id_idx" ON "site_settings_social_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_notification_emails_order_idx" ON "site_settings_notification_emails" USING btree ("_order");
  CREATE INDEX "site_settings_notification_emails_parent_id_idx" ON "site_settings_notification_emails" USING btree ("_parent_id");
  CREATE INDEX "site_settings_inquiry_types_order_idx" ON "site_settings_inquiry_types" USING btree ("_order");
  CREATE INDEX "site_settings_inquiry_types_parent_id_idx" ON "site_settings_inquiry_types" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_inquiry_types_locales_locale_parent_id_unique" ON "site_settings_inquiry_types_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_inquiry_types_locales_parent_id_idx" ON "site_settings_inquiry_types_locales" USING btree ("_parent_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_logo_dark_idx" ON "site_settings" USING btree ("logo_dark_id");
  CREATE INDEX "site_settings_default_og_image_idx" ON "site_settings" USING btree ("default_og_image_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_locales_parent_id_idx" ON "site_settings_locales" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_social_links_order_idx" ON "_site_settings_v_version_social_links" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_social_links_parent_id_idx" ON "_site_settings_v_version_social_links" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_notification_emails_order_idx" ON "_site_settings_v_version_notification_emails" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_notification_emails_parent_id_idx" ON "_site_settings_v_version_notification_emails" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_inquiry_types_order_idx" ON "_site_settings_v_version_inquiry_types" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_inquiry_types_parent_id_idx" ON "_site_settings_v_version_inquiry_types" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_site_settings_v_version_inquiry_types_locales_locale_parent" ON "_site_settings_v_version_inquiry_types_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_settings_v_version_inquiry_types_locales_parent_id_idx" ON "_site_settings_v_version_inquiry_types_locales" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_version_logo_idx" ON "_site_settings_v" USING btree ("version_logo_id");
  CREATE INDEX "_site_settings_v_version_version_logo_dark_idx" ON "_site_settings_v" USING btree ("version_logo_dark_id");
  CREATE INDEX "_site_settings_v_version_version_default_og_image_idx" ON "_site_settings_v" USING btree ("version_default_og_image_id");
  CREATE INDEX "_site_settings_v_created_at_idx" ON "_site_settings_v" USING btree ("created_at");
  CREATE INDEX "_site_settings_v_updated_at_idx" ON "_site_settings_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_site_settings_v_locales_locale_parent_id_unique" ON "_site_settings_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_settings_v_locales_parent_id_idx" ON "_site_settings_v_locales" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "inquiries_notes" CASCADE;
  DROP TABLE "inquiries_activity" CASCADE;
  DROP TABLE "inquiries" CASCADE;
  DROP TABLE "inquiries_rels" CASCADE;
  DROP TABLE "product_categories" CASCADE;
  DROP TABLE "product_categories_locales" CASCADE;
  DROP TABLE "_product_categories_v" CASCADE;
  DROP TABLE "_product_categories_v_locales" CASCADE;
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
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "inquiry_attachments" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "home_page_hero_badge_lines" CASCADE;
  DROP TABLE "home_page_hero_badge_lines_locales" CASCADE;
  DROP TABLE "home_page_value_props_items" CASCADE;
  DROP TABLE "home_page_value_props_items_locales" CASCADE;
  DROP TABLE "home_page_why_stats" CASCADE;
  DROP TABLE "home_page_why_stats_locales" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "home_page_locales" CASCADE;
  DROP TABLE "_home_page_v_version_hero_badge_lines" CASCADE;
  DROP TABLE "_home_page_v_version_hero_badge_lines_locales" CASCADE;
  DROP TABLE "_home_page_v_version_value_props_items" CASCADE;
  DROP TABLE "_home_page_v_version_value_props_items_locales" CASCADE;
  DROP TABLE "_home_page_v_version_why_stats" CASCADE;
  DROP TABLE "_home_page_v_version_why_stats_locales" CASCADE;
  DROP TABLE "_home_page_v" CASCADE;
  DROP TABLE "_home_page_v_locales" CASCADE;
  DROP TABLE "about_page_vision_mission_cards" CASCADE;
  DROP TABLE "about_page_vision_mission_cards_locales" CASCADE;
  DROP TABLE "about_page_values_items" CASCADE;
  DROP TABLE "about_page_values_items_locales" CASCADE;
  DROP TABLE "about_page_certifications_items" CASCADE;
  DROP TABLE "about_page_certifications_items_locales" CASCADE;
  DROP TABLE "about_page_facilities_images" CASCADE;
  DROP TABLE "about_page_facilities_images_locales" CASCADE;
  DROP TABLE "about_page_stats_block_stats" CASCADE;
  DROP TABLE "about_page_stats_block_stats_locales" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "about_page_locales" CASCADE;
  DROP TABLE "_about_page_v_version_vision_mission_cards" CASCADE;
  DROP TABLE "_about_page_v_version_vision_mission_cards_locales" CASCADE;
  DROP TABLE "_about_page_v_version_values_items" CASCADE;
  DROP TABLE "_about_page_v_version_values_items_locales" CASCADE;
  DROP TABLE "_about_page_v_version_certifications_items" CASCADE;
  DROP TABLE "_about_page_v_version_certifications_items_locales" CASCADE;
  DROP TABLE "_about_page_v_version_facilities_images" CASCADE;
  DROP TABLE "_about_page_v_version_facilities_images_locales" CASCADE;
  DROP TABLE "_about_page_v_version_stats_block_stats" CASCADE;
  DROP TABLE "_about_page_v_version_stats_block_stats_locales" CASCADE;
  DROP TABLE "_about_page_v" CASCADE;
  DROP TABLE "_about_page_v_locales" CASCADE;
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
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "contact_page_locales" CASCADE;
  DROP TABLE "_contact_page_v" CASCADE;
  DROP TABLE "_contact_page_v_locales" CASCADE;
  DROP TABLE "privacy_page" CASCADE;
  DROP TABLE "privacy_page_locales" CASCADE;
  DROP TABLE "_privacy_page_v" CASCADE;
  DROP TABLE "_privacy_page_v_locales" CASCADE;
  DROP TABLE "navigation_items" CASCADE;
  DROP TABLE "navigation_items_locales" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "navigation_locales" CASCADE;
  DROP TABLE "_navigation_v_version_items" CASCADE;
  DROP TABLE "_navigation_v_version_items_locales" CASCADE;
  DROP TABLE "_navigation_v" CASCADE;
  DROP TABLE "_navigation_v_locales" CASCADE;
  DROP TABLE "site_settings_social_links" CASCADE;
  DROP TABLE "site_settings_notification_emails" CASCADE;
  DROP TABLE "site_settings_inquiry_types" CASCADE;
  DROP TABLE "site_settings_inquiry_types_locales" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "_site_settings_v_version_social_links" CASCADE;
  DROP TABLE "_site_settings_v_version_notification_emails" CASCADE;
  DROP TABLE "_site_settings_v_version_inquiry_types" CASCADE;
  DROP TABLE "_site_settings_v_version_inquiry_types_locales" CASCADE;
  DROP TABLE "_site_settings_v" CASCADE;
  DROP TABLE "_site_settings_v_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_inquiries_status";
  DROP TYPE "public"."enum_inquiries_form_origin";
  DROP TYPE "public"."enum_product_categories_icon";
  DROP TYPE "public"."enum_product_categories_status";
  DROP TYPE "public"."enum__product_categories_v_version_icon";
  DROP TYPE "public"."enum__product_categories_v_version_status";
  DROP TYPE "public"."enum__product_categories_v_published_locale";
  DROP TYPE "public"."enum_products_status";
  DROP TYPE "public"."enum__products_v_version_status";
  DROP TYPE "public"."enum__products_v_published_locale";
  DROP TYPE "public"."enum_news_status";
  DROP TYPE "public"."enum__news_v_version_status";
  DROP TYPE "public"."enum__news_v_published_locale";
  DROP TYPE "public"."enum_redirects_type";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_home_page_value_props_items_icon";
  DROP TYPE "public"."enum_home_page_hero_badge_icon";
  DROP TYPE "public"."enum_home_page_status";
  DROP TYPE "public"."enum__home_page_v_version_value_props_items_icon";
  DROP TYPE "public"."enum__home_page_v_version_hero_badge_icon";
  DROP TYPE "public"."enum__home_page_v_version_status";
  DROP TYPE "public"."enum__home_page_v_published_locale";
  DROP TYPE "public"."enum_about_page_vision_mission_cards_icon";
  DROP TYPE "public"."enum_about_page_values_items_icon";
  DROP TYPE "public"."enum_about_page_status";
  DROP TYPE "public"."enum__about_page_v_version_vision_mission_cards_icon";
  DROP TYPE "public"."enum__about_page_v_version_values_items_icon";
  DROP TYPE "public"."enum__about_page_v_version_status";
  DROP TYPE "public"."enum__about_page_v_published_locale";
  DROP TYPE "public"."enum_products_page_status";
  DROP TYPE "public"."enum__products_page_v_version_status";
  DROP TYPE "public"."enum__products_page_v_published_locale";
  DROP TYPE "public"."enum_partners_page_status";
  DROP TYPE "public"."enum__partners_page_v_version_status";
  DROP TYPE "public"."enum__partners_page_v_published_locale";
  DROP TYPE "public"."enum_news_page_status";
  DROP TYPE "public"."enum__news_page_v_version_status";
  DROP TYPE "public"."enum__news_page_v_published_locale";
  DROP TYPE "public"."enum_contact_page_status";
  DROP TYPE "public"."enum__contact_page_v_version_status";
  DROP TYPE "public"."enum__contact_page_v_published_locale";
  DROP TYPE "public"."enum_privacy_page_status";
  DROP TYPE "public"."enum__privacy_page_v_version_status";
  DROP TYPE "public"."enum__privacy_page_v_published_locale";
  DROP TYPE "public"."enum_site_settings_social_links_platform";
  DROP TYPE "public"."enum__site_settings_v_version_social_links_platform";`)
}
