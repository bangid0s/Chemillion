import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { reuploadCompanyPhotos } from '../content/companyPhotos'

/**
 * Puts four new company photos (src/content/photos) into their existing Media Library records: the indoor storage
 * room, the office reception, the forklift and the main warehouse aisle. The records keep their place on every page;
 * only the files change, plus the forklift's alt text and focal point, which now describe the new shot.
 */
export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await reuploadCompanyPhotos(payload, ['indoorStorage', 'reception', 'forklift', 'warehouseForklift'])
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content only: the earlier files are not kept.
}
