import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { reuploadCompanyPhotos } from '../content/companyPhotos'

/**
 * Puts the compressed company photos (each at most 125 KB, src/content/photos) into the existing Media Library records,
 * replacing the larger originals. The records, their alt text and where they appear on the pages stay as they are.
 */
export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await reuploadCompanyPhotos(payload)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content only: the earlier, larger files are not kept.
}
