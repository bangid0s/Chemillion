import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { reuploadCompanyPhotos } from '../content/companyPhotos'

/**
 * The company_photos migration stored the building photo in all 16 photo records on Vercel Blob (the uploads shared
 * one request, and the storage plugin kept its first file). This uploads each record's own file again. The records,
 * their alt text and where they appear on the pages stay as they are.
 */
export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await reuploadCompanyPhotos(payload)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Nothing to undo: the files are the right ones now.
}
