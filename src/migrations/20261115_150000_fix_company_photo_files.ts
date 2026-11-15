import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { applyCompanyPhotos, reuploadCompanyPhotos } from '../content/companyPhotos'

/**
 * The company_photos migration stored the building photo in all 16 photo records on Vercel Blob (the uploads shared
 * one request, and the storage plugin kept its first file). This puts things right whatever state the library is in:
 * photo records that still exist get their own file again, and any photo missing from the library (for example
 * after the records were deleted in the dashboard) is uploaded once and placed back on the pages. Each photo is
 * matched by its file name, so running this never creates a second copy.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await reuploadCompanyPhotos(payload)
  await applyCompanyPhotos(payload, req)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Nothing to undo: the files are the right ones now.
}
