import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { applyCompanyPhotos } from '../content/companyPhotos'

/**
 * Uploads the real warehouse and office photos (src/content/photos) to the Media Library with alt text in English,
 * Indonesian and Chinese, and puts them on Home, About, Solutions, Contact and the solution cards in place of the
 * mockup placeholders. Each page change is saved as a new version, so the earlier images can be restored.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await applyCompanyPhotos(payload, req)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content only. Earlier images stay in the Media Library and under Versions in the dashboard.
}
