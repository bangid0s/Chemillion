import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { NewsList } from '@/components/NewsList'
import { plainHeadline } from '@/components/ui'
import { t } from '@/i18n/en'
import { getGlobal, getNewsPage } from '@/lib/cms'
import { buildMetadata } from '@/lib/seo'
import type { NewsPage } from '@/payload-types'

type Props = { params: Promise<{ n: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { n } = await params
  const page = (await getGlobal('news-page')) as NewsPage
  // Pagination pages canonicalise to themselves.
  return buildMetadata({
    name: `${plainHeadline(page.hero?.title)} · ${t.page} ${n}`,
    description: page.hero?.intro,
    path: `/news/page/${n}`,
    image: page.hero?.image,
  })
}

export default async function NewsPagedPage({ params }: Props) {
  const { n } = await params
  const number = Number(n)
  if (!Number.isInteger(number) || number < 1) notFound()
  if (number === 1) permanentRedirect('/news')
  const [content, result] = await Promise.all([getGlobal('news-page') as Promise<NewsPage>, getNewsPage(number)])
  if (number > result.totalPages) notFound()
  const title = plainHeadline(content.hero?.title)
  return <NewsList page={number} crumbs={[{ label: title, href: '/news' }, { label: `${t.page} ${number}` }]} />
}
