import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { applyWebsiteCopy } from '../content/websiteCopy'

/**
 * Replaces the placeholder text with the approved website copy in English, Indonesian and Chinese
 * (see src/content/websiteCopy.ts): Home, About, the new Solutions page, Contact, the three solutions,
 * the menu and footer, office hours, email and the auto-reply. Every change is saved as a new version,
 * so an earlier text can still be restored from Versions in the dashboard.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await applyWebsiteCopy(payload, req)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content only. Earlier texts stay available under Versions in the dashboard.
}
