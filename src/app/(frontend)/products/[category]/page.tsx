import type { Metadata } from 'next'
import { ProductCard } from '@/components/Cards'
import { CtaBanner } from '@/components/CtaBanner'
import { PageHero } from '@/components/PageHero'
import { FILTER_THRESHOLD, ProductFilter } from '@/components/ProductFilter'
import { plainHeadline } from '@/components/ui'
import { t } from '@/i18n/en'
import { getCategory, getClient, getGlobal, getProductsByCategory, getSettings } from '@/lib/cms'
import { redirectOrNotFound } from '@/lib/redirect'
import { buildMetadata } from '@/lib/seo'
import type { ProductsPage } from '@/payload-types'

type Props = { params: Promise<{ category: string }> }

export async function generateStaticParams() {
  const payload = await getClient()
  const { docs } = await payload.find({
    collection: 'product-categories',
    where: { _status: { equals: 'published' }, hidden: { not_equals: true } },
    limit: 500,
    depth: 0,
    select: { slug: true },
  })
  return docs.map((c) => ({ category: c.slug as string }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params
  const [category, settings] = await Promise.all([getCategory(slug), getSettings()])
  if (!category) return {}
  return buildMetadata({
    meta: category.meta,
    name: category.name,
    description: category.description,
    path: `/products/${slug}`,
    image: category.image,
    defaultImage: settings.defaultOgImage,
  })
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params
  const category = await getCategory(slug)
  if (!category) return redirectOrNotFound(`/products/${slug}`)

  const [products, page] = await Promise.all([getProductsByCategory(category.id), getGlobal('products-page') as Promise<ProductsPage>])

  return (
    <>
      <PageHero
        eyebrow={page.hero?.eyebrow}
        title={category.name}
        intro={category.description}
        image={category.image}
        crumbs={[{ label: plainHeadline(page.hero?.title), href: '/products' }, { label: category.name }]}
      />
      <section className="section section--grey">
        <div className="container">
          {products.length === 0 && <p className="empty">{t.noProducts}</p>}
          {products.length > FILTER_THRESHOLD ? (
            <ProductFilter
              entries={products.map((product) => ({
                id: product.id,
                applications: product.applications?.map((a) => a.label) ?? [],
                card: <ProductCard product={product} />,
              }))}
            />
          ) : (
            <div className="grid grid--3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
      <CtaBanner cta={page.cta} />
    </>
  )
}
