import Link from 'next/link'
import type { CollectionSlug, GlobalSlug, Payload } from 'payload'

const MEDIA_KEYS = new Set(['image', 'cover', 'logo', 'logoDark', 'mapImage', 'defaultOgImage', 'pdf', 'file', 'value'])

const refersTo = (node: unknown, id: unknown, key?: string): boolean => {
  if (Array.isArray(node)) return node.some((item) => refersTo(item, id))
  if (node && typeof node === 'object') {
    return Object.entries(node).some(([k, v]) => refersTo(v, id, k))
  }
  return key !== undefined && MEDIA_KEYS.has(key) && node === id
}

const COLLECTIONS: { slug: CollectionSlug; label: string; title: string }[] = [
  { slug: 'product-categories', label: 'Solution', title: 'name' },
]

const GLOBALS: { slug: GlobalSlug; label: string }[] = [
  { slug: 'home-page', label: 'Home' },
  { slug: 'about-page', label: 'About Us' },
  { slug: 'solutions-page', label: 'Solutions page' },
  { slug: 'privacy-page', label: 'Privacy Policy' },
  { slug: 'contact-page', label: 'Contact page' },
  { slug: 'site-settings', label: 'Site Settings' },
]

/** Lists where a file is used, so nobody deletes an image a live page still needs. */
export const MediaUsage = async ({ payload, data }: { payload: Payload; data?: { id?: number | string } }) => {
  const id = data?.id
  if (!id) return null

  const uses: { label: string; href: string }[] = []
  for (const c of COLLECTIONS) {
    const { docs } = await payload.find({ collection: c.slug, depth: 0, limit: 1000, pagination: false, draft: true })
    for (const doc of docs) {
      if (refersTo(doc, id)) {
        uses.push({
          label: `${c.label}: ${(doc as unknown as Record<string, string>)[c.title]}`,
          href: `/admin/collections/${c.slug}/${doc.id}`,
        })
      }
    }
  }
  for (const g of GLOBALS) {
    const doc = await payload.findGlobal({ slug: g.slug, depth: 0, draft: true })
    if (refersTo(doc, id)) uses.push({ label: g.label, href: `/admin/globals/${g.slug}` })
  }

  return (
    <div className="ch-note">
      <strong>Where this file is used</strong>
      {uses.length === 0 ? (
        <p>Not used on any page. It is safe to delete.</p>
      ) : (
        <ul>
          {uses.map((use) => (
            <li key={use.href}>
              <Link href={use.href}>{use.label}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
