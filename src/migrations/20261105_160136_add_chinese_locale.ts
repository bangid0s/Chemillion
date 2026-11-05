import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/** Adds Chinese (Simplified) as a content language next to English and Indonesian. */
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."_locales" ADD VALUE 'zh';
  ALTER TYPE "public"."enum__product_categories_v_published_locale" ADD VALUE 'zh';
  ALTER TYPE "public"."enum__home_page_v_published_locale" ADD VALUE 'zh';
  ALTER TYPE "public"."enum__about_page_v_published_locale" ADD VALUE 'zh';
  ALTER TYPE "public"."enum__contact_page_v_published_locale" ADD VALUE 'zh';
  ALTER TYPE "public"."enum__privacy_page_v_published_locale" ADD VALUE 'zh';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Chinese text has to go before the language can be removed from the list.
  await db.execute(sql`
  DO $$ DECLARE r record; BEGIN
    FOR r IN SELECT table_name, column_name FROM information_schema.columns
      WHERE table_schema = 'public' AND udt_name = '_locales' LOOP
      EXECUTE format('DELETE FROM %I WHERE %I = %L', r.table_name, r.column_name, 'zh');
    END LOOP;
    FOR r IN SELECT table_name, column_name FROM information_schema.columns
      WHERE table_schema = 'public' AND udt_name LIKE 'enum%published_locale' LOOP
      EXECUTE format('UPDATE %I SET %I = NULL WHERE %I = %L', r.table_name, r.column_name, r.column_name, 'zh');
    END LOOP;
  END $$;`)

  await db.execute(sql`
   ALTER TABLE "product_categories_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_product_categories_v_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "media_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "home_page_hero_badge_lines_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "home_page_value_props_items_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "home_page_why_stats_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "home_page_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_home_page_v_version_hero_badge_lines_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_home_page_v_version_value_props_items_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_home_page_v_version_why_stats_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_home_page_v_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "about_page_vision_mission_cards_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "about_page_values_items_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "about_page_certifications_items_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "about_page_facilities_images_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "about_page_stats_block_stats_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "about_page_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_about_page_v_version_vision_mission_cards_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_about_page_v_version_values_items_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_about_page_v_version_certifications_items_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_about_page_v_version_facilities_images_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_about_page_v_version_stats_block_stats_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_about_page_v_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "contact_page_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_contact_page_v_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "privacy_page_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_privacy_page_v_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "navigation_items_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "navigation_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_navigation_v_version_items_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_navigation_v_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "site_settings_inquiry_types_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "site_settings_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_site_settings_v_version_inquiry_types_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_site_settings_v_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  DROP TYPE "public"."_locales";
  CREATE TYPE "public"."_locales" AS ENUM('en', 'id');
  ALTER TABLE "product_categories_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_product_categories_v_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "media_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "home_page_hero_badge_lines_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "home_page_value_props_items_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "home_page_why_stats_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "home_page_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_home_page_v_version_hero_badge_lines_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_home_page_v_version_value_props_items_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_home_page_v_version_why_stats_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_home_page_v_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "about_page_vision_mission_cards_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "about_page_values_items_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "about_page_certifications_items_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "about_page_facilities_images_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "about_page_stats_block_stats_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "about_page_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_about_page_v_version_vision_mission_cards_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_about_page_v_version_values_items_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_about_page_v_version_certifications_items_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_about_page_v_version_facilities_images_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_about_page_v_version_stats_block_stats_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_about_page_v_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "contact_page_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_contact_page_v_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "privacy_page_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_privacy_page_v_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "navigation_items_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "navigation_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_navigation_v_version_items_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_navigation_v_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "site_settings_inquiry_types_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "site_settings_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_site_settings_v_version_inquiry_types_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_site_settings_v_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_product_categories_v" ALTER COLUMN "published_locale" SET DATA TYPE text;
  DROP TYPE "public"."enum__product_categories_v_published_locale";
  CREATE TYPE "public"."enum__product_categories_v_published_locale" AS ENUM('en', 'id');
  ALTER TABLE "_product_categories_v" ALTER COLUMN "published_locale" SET DATA TYPE "public"."enum__product_categories_v_published_locale" USING "published_locale"::"public"."enum__product_categories_v_published_locale";
  ALTER TABLE "_home_page_v" ALTER COLUMN "published_locale" SET DATA TYPE text;
  DROP TYPE "public"."enum__home_page_v_published_locale";
  CREATE TYPE "public"."enum__home_page_v_published_locale" AS ENUM('en', 'id');
  ALTER TABLE "_home_page_v" ALTER COLUMN "published_locale" SET DATA TYPE "public"."enum__home_page_v_published_locale" USING "published_locale"::"public"."enum__home_page_v_published_locale";
  ALTER TABLE "_about_page_v" ALTER COLUMN "published_locale" SET DATA TYPE text;
  DROP TYPE "public"."enum__about_page_v_published_locale";
  CREATE TYPE "public"."enum__about_page_v_published_locale" AS ENUM('en', 'id');
  ALTER TABLE "_about_page_v" ALTER COLUMN "published_locale" SET DATA TYPE "public"."enum__about_page_v_published_locale" USING "published_locale"::"public"."enum__about_page_v_published_locale";
  ALTER TABLE "_contact_page_v" ALTER COLUMN "published_locale" SET DATA TYPE text;
  DROP TYPE "public"."enum__contact_page_v_published_locale";
  CREATE TYPE "public"."enum__contact_page_v_published_locale" AS ENUM('en', 'id');
  ALTER TABLE "_contact_page_v" ALTER COLUMN "published_locale" SET DATA TYPE "public"."enum__contact_page_v_published_locale" USING "published_locale"::"public"."enum__contact_page_v_published_locale";
  ALTER TABLE "_privacy_page_v" ALTER COLUMN "published_locale" SET DATA TYPE text;
  DROP TYPE "public"."enum__privacy_page_v_published_locale";
  CREATE TYPE "public"."enum__privacy_page_v_published_locale" AS ENUM('en', 'id');
  ALTER TABLE "_privacy_page_v" ALTER COLUMN "published_locale" SET DATA TYPE "public"."enum__privacy_page_v_published_locale" USING "published_locale"::"public"."enum__privacy_page_v_published_locale";`)
}
