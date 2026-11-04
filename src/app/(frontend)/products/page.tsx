import type { Metadata } from 'next'
import { CategoryCard } from '@/components/Cards'
import { CtaBanner } from '@/components/CtaBanner'
import { PageHero } from '@/components/PageHero'
import { plainHeadline } from '@/components/ui'
import { getCategories, getGlobal, getProductCounts, getSettings } from '@/lib/cms'
import { buildMetadata } from '@/lib/seo'
import type { ProductsPage as Content } from '@/payload-types'

const getContent = () => getGlobal('products-page') as Promise<Content>

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getContent(), getSettings()])
  return buildMetadata({
    meta: page.meta,
    name: plainHeadline(page.hero?.title),
    description: page.hero?.intro,
    path: '/products',
    image: page.hero?.image,
    defaultImage: settings.defaultOgImage,
  })
}

export default async function ProductsPage() {
  const [page, categories, counts] = await Promise.all([getContent(), getCategories(), getProductCounts()])
  const labels = page.labels
  return (
    <>
      <PageHero {...page.hero} crumbs={[{ label: plainHeadline(page.hero?.title) }]} />
      <section className="section section--grey">
        <div className="container">
          <div className="grid grid--3">
            {categories.map((category) => {
              const n = counts.get(category.id) ?? 0
              return (
                <CategoryCard
                  key={category.id}
                  category={category}
                  count={String(n)}
                  countLabel={(n === 1 ? labels?.productCountSingular : labels?.productCountPlural) ?? ''}
                />
              )
            })}
          </div>
        </div>
      </section>
      <CtaBanner cta={page.cta} />
    </>
  )
}
