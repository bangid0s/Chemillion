import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

/**
 * Puts the registered office of PT. Kencana Chemillion Indonesia into Site Settings.
 * It only replaces the seeded placeholder, so an address an admin has already entered is never overwritten.
 */
const PLACEHOLDER = '123 Industrial Road\nJakarta, Indonesia'
export const ADDRESS = 'Kawasan Industri Candi\nJl. Gatot Subroto Blok 19 No. 33\nSemarang, Indonesia'
export const MAP_EMBED_URL =
  'https://www.google.com/maps?q=' +
  encodeURIComponent('Kawasan Industri Candi, Jl. Gatot Subroto Blok 19 No. 33, Semarang, Indonesia') +
  '&output=embed'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const settings = await payload.findGlobal({ slug: 'site-settings', locale: 'en', depth: 0, req })
  const data: Record<string, string> = {}
  if (!settings.address || settings.address.trim() === PLACEHOLDER) data.address = ADDRESS
  if (!settings.mapEmbedUrl) data.mapEmbedUrl = MAP_EMBED_URL
  if (Object.keys(data).length === 0) return
  await payload.updateGlobal({ slug: 'site-settings', locale: 'en', data, req })
  payload.logger.info(`Site Settings: set ${Object.keys(data).join(' and ')} to the registered office.`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  const settings = await payload.findGlobal({ slug: 'site-settings', locale: 'en', depth: 0, req })
  const data: Record<string, string> = {}
  if (settings.address === ADDRESS) data.address = PLACEHOLDER
  if (settings.mapEmbedUrl === MAP_EMBED_URL) data.mapEmbedUrl = ''
  if (Object.keys(data).length) await payload.updateGlobal({ slug: 'site-settings', locale: 'en', data, req })
}
