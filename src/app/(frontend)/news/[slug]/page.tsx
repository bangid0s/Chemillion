import type { Metadata } from 'next'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { NewsCard } from '@/components/Cards'
import { CtaBanner } from '@/components/CtaBanner'
import { Icon } from '@/components/Icon'
import { Breadcrumbs } from '@/components/PageHero'
import { CmsImage, JsonLd, formatDate, plainHeadline } from '@/components/ui'
import { t } from '@/i18n/en'
import { getArticle, getClient, getGlobal, getRelatedArticles, getSettings } from '@/lib/cms'
import { articleLd } from '@/lib/jsonld'
import { redirectOrNotFound } from '@/lib/redirect'
import { buildMetadata } from '@/lib/seo'
import { absoluteUrl } from '@/lib/url'
import type { NewsPage } from '@/payload-types'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const payload = await getClient()
  const { docs } = await payload.find({
    collection: 'news',
    where: { _status: { equals: 'published' } },
    limit: 1000,
    depth: 0,
    select: { slug: true },
  })
  return docs.map((d) => ({ slug: d.slug as string }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const [article, settings] = await Promise.all([getArticle(slug), getSettings()])
  if (!article) return {}
  return buildMetadata({
    meta: article.meta,
    name: article.title,
    description: article.excerpt,
    path: `/news/${slug}`,
    image: article.cover,
    defaultImage: settings.defaultOgImage,
    type: 'article',
  })
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) return redirectOrNotFound(`/news/${slug}`)

  const [page, settings, related] = await Promise.all([
    getGlobal('news-page') as Promise<NewsPage>,
    getSettings(),
    getRelatedArticles(article),
  ])
  const url = encodeURIComponent(absoluteUrl(`/news/${slug}`))
  const shareTitle = encodeURIComponent(article.title)

  return (
    <>
      <article className="article">
        <div className="container container--narrow">
          <Breadcrumbs items={[{ label: plainHeadline(page.hero?.title), href: '/news' }, { label: article.title }]} />
          {article.category && <p className="eyebrow">{article.category}</p>}
          <h1 className="title">{article.title}</h1>
          <p className="article__meta">
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            {article.author && (
              <span>
                {t.by} {article.author}
              </span>
            )}
          </p>
          <div className="article__cover">
            <CmsImage media={article.cover} priority sizes="(max-width: 900px) 100vw, 800px" />
          </div>
          {article.body && <RichText data={article.body} className="prose" />}
          <div className="share">
            <span>{t.share}</span>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Icon name="linkedin" />
            </a>
            <a href={`https://wa.me/?text=${shareTitle}%20${url}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <Icon name="whatsapp" />
            </a>
            <a href={`mailto:?subject=${shareTitle}&body=${url}`} aria-label={t.email}>
              <Icon name="mail" />
            </a>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section section--grey">
          <div className="container">
            <h2 className="title title--sm">{t.relatedArticles}</h2>
            <div className="grid grid--3">
              {related.map((item) => (
                <NewsCard key={item.id} article={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner cta={page.cta} />
      <JsonLd data={articleLd(article, settings)} />
    </>
  )
}
