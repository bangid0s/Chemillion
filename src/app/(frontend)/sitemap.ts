import type { MetadataRoute } from 'next'
import { getClient, productPath } from '@/lib/cms'
import { absoluteUrl } from '@/lib/url'
import type { ProductCategory } from '@/payload-types'

export const revalidate = 300

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getClient()
  const now = new Date().toISOString()
  const [categories, products, news] = await Promise.all([
    payload.find({ collection: 'product-categories', where: { _status: { equals: 'published' }, hidden: { not_equals: true }, 'meta.noindex': { not_equals: true } }, limit: 1000, depth: 0 }),
    payload.find({ collection: 'products', where: { _status: { equals: 'published' }, hidden: { not_equals: true }, 'meta.noindex': { not_equals: true } }, limit: 5000, depth: 1 }),
    payload.find({
      collection: 'news',
      where: { _status: { equals: 'published' }, publishedAt: { less_than_equal: now }, 'meta.noindex': { not_equals: true } },
      limit: 5000,
      depth: 0,
    }),
  ])

  const staticPaths = ['/', '/about', '/products', '/partners', '/contact', '/privacy']
  if (news.totalDocs >= 3) staticPaths.push('/news')

  return [
    ...staticPaths.map((path) => ({ url: absoluteUrl(path), lastModified: now })),
    ...categories.docs.map((c) => ({ url: absoluteUrl(`/products/${c.slug}`), lastModified: c.updatedAt })),
    ...products.docs
      .filter((p) => (p.category as ProductCategory)?.slug)
      .map((p) => ({ url: absoluteUrl(productPath(p)), lastModified: p.updatedAt })),
    ...news.docs.map((a) => ({ url: absoluteUrl(`/news/${a.slug}`), lastModified: a.updatedAt })),
  ]
}
