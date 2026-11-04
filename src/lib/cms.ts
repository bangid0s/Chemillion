import config from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload, type GlobalSlug, type Where } from 'payload'
import { cache } from 'react'
import type { HomePage, News, Product, ProductCategory, SiteSetting } from '@/payload-types'

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

export const getCategory = cache(async (slug: string) => {
  const categories = await getCategories()
  return categories.find((c) => c.slug === slug) ?? null
})

export const getProductsByCategory = cache(async (categoryId: ProductCategory['id']) => {
  const payload = await getClient()
  const { docs } = await payload.find({
    collection: 'products',
    where: await visible({ category: { equals: categoryId } }),
    sort: 'name',
    limit: 500,
    depth: 1,
    draft: await isDraft(),
  })
  return docs
})

export const getProductCounts = cache(async () => {
  const payload = await getClient()
  const { docs } = await payload.find({
    collection: 'products',
    where: await visible(),
    limit: 5000,
    depth: 0,
    select: { category: true },
  })
  const counts = new Map<ProductCategory['id'], number>()
  for (const p of docs) {
    const id = p.category as ProductCategory['id']
    counts.set(id, (counts.get(id) ?? 0) + 1)
  }
  return counts
})

export const getProduct = cache(async (slug: string) => {
  const payload = await getClient()
  const { docs } = await payload.find({
    collection: 'products',
    where: await visible({ slug: { equals: slug } }),
    limit: 1,
    depth: 2,
    draft: await isDraft(),
  })
  return docs[0] ?? null
})

export const getAllProducts = cache(async () => {
  const payload = await getClient()
  const { docs } = await payload.find({
    collection: 'products',
    where: { _status: { equals: 'published' }, hidden: { not_equals: true } },
    limit: 5000,
    depth: 1,
    sort: 'name',
  })
  return docs
})

export const productPath = (product: Pick<Product, 'slug' | 'category'>) => {
  const cat = product.category as ProductCategory
  return `/products/${cat?.slug}/${product.slug}`
}

const liveNews = async (): Promise<Where> =>
  (await isDraft())
    ? {}
    : { and: [{ _status: { equals: 'published' } }, { publishedAt: { less_than_equal: new Date().toISOString() } }] }

export const NEWS_PER_PAGE = 9

export const getNewsPage = cache(async (page: number, category?: string) => {
  const payload = await getClient()
  const live = await liveNews()
  return payload.find({
    collection: 'news',
    where: category ? { and: [live, { category: { equals: category } }] } : live,
    sort: '-publishedAt',
    limit: NEWS_PER_PAGE,
    page,
    depth: 1,
    draft: await isDraft(),
  })
})

export const getNewsCategories = cache(async () => {
  const payload = await getClient()
  const { docs } = await payload.find({
    collection: 'news',
    where: await liveNews(),
    limit: 1000,
    depth: 0,
    select: { category: true },
  })
  return [...new Set(docs.map((d) => d.category).filter(Boolean))] as string[]
})

export const getNewsCount = cache(async () => {
  const payload = await getClient()
  const { totalDocs } = await payload.count({ collection: 'news', where: await liveNews() })
  return totalDocs
})

export const getArticle = cache(async (slug: string) => {
  const payload = await getClient()
  const live = await liveNews()
  const { docs } = await payload.find({
    collection: 'news',
    where: { and: [live, { slug: { equals: slug } }] },
    limit: 1,
    depth: 2,
    draft: await isDraft(),
  })
  return docs[0] ?? null
})

export const getRelatedArticles = cache(async (article: News) => {
  const payload = await getClient()
  const live = await liveNews()
  const { docs } = await payload.find({
    collection: 'news',
    where: { and: [live, { id: { not_equals: article.id } }] },
    sort: '-publishedAt',
    limit: 3,
    depth: 1,
  })
  return docs
})

export const getPartners = cache(async () => {
  const payload = await getClient()
  const [types, partners] = await Promise.all([
    payload.find({ collection: 'partner-types', sort: '_order', limit: 100, depth: 0 }),
    payload.find({
      collection: 'partners',
      where: { visible: { equals: true } },
      sort: '_order',
      limit: 500,
      depth: 1,
    }),
  ])
  return types.docs
    .map((type) => ({
      type,
      partners: partners.docs.filter((p) => (typeof p.type === 'object' ? p.type.id : p.type) === type.id),
    }))
    .filter((group) => group.partners.length > 0)
})

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
