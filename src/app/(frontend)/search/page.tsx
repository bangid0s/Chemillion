import type { Metadata } from 'next'
import { NewsCard, ProductCard } from '@/components/Cards'
import { Icon } from '@/components/Icon'
import { t } from '@/i18n/en'
import { getClient } from '@/lib/cms'

export const metadata: Metadata = {
  title: t.searchTitle,
  robots: { index: false, follow: true },
}

type Props = { searchParams: Promise<{ q?: string }> }

export default async function SearchPage({ searchParams }: Props) {
  const q = (await searchParams).q?.trim().slice(0, 100) ?? ''
  const payload = await getClient()
  const like = { like: q }
  const [products, news] = q
    ? await Promise.all([
        payload.find({
          collection: 'products',
          where: {
            and: [
              { _status: { equals: 'published' } },
              { hidden: { not_equals: true } },
              { or: [{ name: like }, { casNumber: like }, { synonyms: like }, { shortDescription: like }] },
            ],
          },
          limit: 12,
          depth: 1,
        }),
        payload.find({
          collection: 'news',
          where: {
            and: [
              { _status: { equals: 'published' } },
              { publishedAt: { less_than_equal: new Date().toISOString() } },
              { or: [{ title: like }, { excerpt: like }] },
            ],
          },
          limit: 6,
          depth: 1,
        }),
      ])
    : [null, null]
  const empty = q && !products?.docs.length && !news?.docs.length

  return (
    <section className="section message-page--left">
      <div className="container">
        <h1 className="title">{q ? `${t.searchResultsFor} “${q}”` : t.searchTitle}</h1>
        <form className="search-form" role="search" action="/search">
          <input type="search" name="q" defaultValue={q} placeholder={t.searchPlaceholder} aria-label={t.searchPlaceholder} />
          <button type="submit" className="btn btn--primary">
            {t.search}
            <Icon name="search" className="btn__arrow" />
          </button>
        </form>
        {empty && <p className="empty">{t.searchNoResults}</p>}
        {!!products?.docs.length && (
          <>
            <h2 className="subtitle">{t.products}</h2>
            <div className="grid grid--3">
              {products.docs.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </>
        )}
        {!!news?.docs.length && (
          <>
            <h2 className="subtitle">News</h2>
            <div className="grid grid--3">
              {news.docs.map((a) => (
                <NewsCard key={a.id} article={a} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
