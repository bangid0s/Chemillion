import Link from 'next/link'
import { getGlobal, getNewsCategories, getNewsPage } from '@/lib/cms'
import type { NewsPage } from '@/payload-types'
import { t } from '@/i18n/en'
import { NewsCard } from './Cards'
import { CtaBanner } from './CtaBanner'
import { PageHero, type Crumb } from './PageHero'
import { Pagination } from './Pagination'

export const NewsList = async ({ page, category, crumbs }: { page: number; category?: string; crumbs: Crumb[] }) => {
  const [content, result, categories] = await Promise.all([
    getGlobal('news-page') as Promise<NewsPage>,
    getNewsPage(page, category),
    getNewsCategories(),
  ])
  const hero = content.hero
  return (
    <>
      <PageHero {...hero} crumbs={crumbs} />
      <section className="section section--grey">
        <div className="container">
          {categories.length > 1 && (
            <div className="chips">
              <Link className="chip" href="/news" aria-current={!category ? 'page' : undefined}>
                {t.all}
              </Link>
              {categories.map((c) => (
                <Link key={c} className="chip" href={`/news/category/${encodeURIComponent(c)}`} aria-current={c === category ? 'page' : undefined}>
                  {c}
                </Link>
              ))}
            </div>
          )}
          <div className="grid grid--3">
            {result.docs.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
          {!category && <Pagination page={page} totalPages={result.totalPages} />}
        </div>
      </section>
      <CtaBanner cta={content.cta} />
    </>
  )
}
