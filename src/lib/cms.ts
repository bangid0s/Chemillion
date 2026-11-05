import config from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload, type GlobalSlug, type Where } from 'payload'
import { cache } from 'react'
import type { HomePage, SiteSetting } from '@/payload-types'

export const getClient = cache(() => getPayload({ config }))

const isDraft = async () => (await draftMode()).isEnabled

export const getGlobal = cache(async (slug: GlobalSlug) => {
  const payload = await getClient()
  return payload.findGlobal({ slug, depth: 2, draft: await isDraft() })
})

export const getHome = async () => (await getGlobal('home-page')) as HomePage
export const getSettings = async () => (await getGlobal('site-settings')) as SiteSetting

/** Hidden items never show; drafts only show in the dashboard's preview. */
const visible = async (extra?: Where): Promise<Where> => {
  const and: Where[] = [{ hidden: { not_equals: true } }]
  if (!(await isDraft())) and.push({ _status: { equals: 'published' } })
  if (extra) and.push(extra)
  return { and }
}

export const getCategories = cache(async () => {
  const payload = await getClient()
  const { docs } = await payload.find({
    collection: 'product-categories',
    where: await visible(),
    sort: '_order',
    limit: 100,
    depth: 1,
    draft: await isDraft(),
  })
  return docs
})

/** Category cards open the quote form with the category already filled in. */
export const quoteHref = (interest?: string | null) =>
  `/contact?origin=quote${interest ? `&interest=${encodeURIComponent(interest)}` : ''}#inquiry`

export { asMedia } from './media'

export const findRedirect = async (path: string) => {
  const payload = await getClient()
  const { docs } = await payload.find({
    collection: 'redirects',
    where: { from: { equals: path } },
    limit: 1,
    depth: 0,
  })
  return docs[0] ?? null
}
