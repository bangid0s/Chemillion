import type { Metadata } from 'next'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { ProductCard } from '@/components/Cards'
import { Icon } from '@/components/Icon'
import { Breadcrumbs } from '@/components/PageHero'
import { ProductGallery } from '@/components/ProductGallery'
import { Button, JsonLd, plainHeadline } from '@/components/ui'
import { t } from '@/i18n/en'
import { asMedia, getAllProducts, getCategory, getGlobal, getProduct, getProductsByCategory, getSettings } from '@/lib/cms'
import { productLd } from '@/lib/jsonld'
import { redirectOrNotFound } from '@/lib/redirect'
import { buildMetadata } from '@/lib/seo'
import type { Product, ProductCategory, ProductsPage } from '@/payload-types'

type Props = { params: Promise<{ category: string; product: string }> }

export async function generateStaticParams() {
  const products = await getAllProducts()
  return products.map((p) => ({
    category: (p.category as ProductCategory).slug as string,
    product: p.slug as string,
  }))
}

const load = async (categorySlug: string, productSlug: string) => {
  const product = await getProduct(productSlug)
  const category = product?.category as ProductCategory | undefined
  return product && category?.slug === categorySlug ? { product, category } : null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, product: slug } = await params
  const [found, settings] = await Promise.all([load(category, slug), getSettings()])
  if (!found) return {}
  const { product } = found
  return buildMetadata({
    meta: product.meta,
    name: product.name,
    description: product.shortDescription,
    path: `/products/${category}/${slug}`,
    image: product.gallery?.[0]?.image,
    defaultImage: settings.defaultOgImage,
  })
}

export default async function ProductPage({ params }: Props) {
  const { category: categorySlug, product: slug } = await params
  const found = await load(categorySlug, slug)
  if (!found) return redirectOrNotFound(`/products/${categorySlug}/${slug}`)
  const { product, category } = found

  const [page, settings, siblings, cat] = await Promise.all([
    getGlobal('products-page') as Promise<ProductsPage>,
    getSettings(),
    getProductsByCategory(category.id),
    getCategory(categorySlug),
  ])

  const chosen = (product.relatedProducts ?? []).filter((p): p is Product => typeof p === 'object')
  const related = (chosen.length ? chosen : siblings.filter((p) => p.id !== product.id)).slice(0, 3)
  const quoteHref = `/contact?origin=product&product=${product.slug}#inquiry`
  const quoteLabel = page.labels?.requestQuote ?? ''
  const images = product.gallery?.map((g) => asMedia(g.image)).filter((m) => m !== null) ?? []

  return (
    <>
      <div className="container product-top">
        <Breadcrumbs
          items={[
            { label: plainHeadline(page.hero?.title), href: '/products' },
            { label: cat?.name ?? '', href: `/products/${categorySlug}` },
            { label: product.name },
          ]}
        />
      </div>

      <section className="section section--tight">
        <div className="container product">
          <ProductGallery images={images} />
          <div className="product__info">
            <p className="eyebrow">{category.name}</p>
            <h1 className="title">{product.name}</h1>
            <dl className="product__ids">
              {product.casNumber && (
                <div>
                  <dt>{t.casNumber}</dt>
                  <dd>{product.casNumber}</dd>
                </div>
              )}
              {product.grade && (
                <div>
                  <dt>{t.grade}</dt>
                  <dd>{product.grade}</dd>
                </div>
              )}
              {product.synonyms && (
                <div>
                  <dt>{t.synonyms}</dt>
                  <dd>{product.synonyms}</dd>
                </div>
              )}
            </dl>
            {product.shortDescription && <p className="product__short">{product.shortDescription}</p>}
            <Button href={quoteHref} className="product__quote">
              {quoteLabel}
            </Button>
          </div>
        </div>
      </section>

      <section className="section section--grey">
        <div className="container product-detail">
          <div>
            {product.description && <RichText data={product.description} className="prose" />}
            {!!product.specs?.length && (
              <>
                <h2 className="subtitle">{t.specifications}</h2>
                <div className="table-wrap">
                  <table className="spec-table">
                    <thead>
                      <tr>
                        <th scope="col">{t.property}</th>
                        <th scope="col">{t.value}</th>
                        <th scope="col">{t.unit}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.specs.map((row) => (
                        <tr key={row.id}>
                          <th scope="row">{row.property}</th>
                          <td>{row.value}</td>
                          <td>{row.unit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
          <aside className="product-side">
            {!!product.applications?.length && (
              <>
                <h2 className="subtitle">{t.applications}</h2>
                <ul className="tags">
                  {product.applications.map((a) => (
                    <li key={a.id}>{a.label}</li>
                  ))}
                </ul>
              </>
            )}
            {!!product.packaging?.length && (
              <>
                <h2 className="subtitle">{t.packaging}</h2>
                <ul className="tags">
                  {product.packaging.map((a) => (
                    <li key={a.id}>{a.label}</li>
                  ))}
                </ul>
              </>
            )}
            {!!product.documents?.length && (
              <>
                <h2 className="subtitle">{t.documents}</h2>
                <ul className="docs">
                  {product.documents.map((doc) => {
                    const file = asMedia(doc.file)
                    return file?.url ? (
                      <li key={doc.id}>
                        <a href={file.url} data-track="file_download">
                          <Icon name="download" />
                          {doc.title}
                        </a>
                      </li>
                    ) : null
                  })}
                </ul>
              </>
            )}
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="title title--sm">{t.relatedProducts}</h2>
            <div className="grid grid--3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="sticky-quote">
        <span>{product.name}</span>
        <Button href={quoteHref}>{quoteLabel}</Button>
      </div>

      <JsonLd data={productLd(product, settings)} />
    </>
  )
}
