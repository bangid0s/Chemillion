import type { Metadata } from 'next'
import { NewsList } from '@/components/NewsList'
import { plainHeadline } from '@/components/ui'
import { getGlobal, getSettings } from '@/lib/cms'
import { buildMetadata } from '@/lib/seo'
import type { NewsPage } from '@/payload-types'

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getGlobal('news-page') as Promise<NewsPage>, getSettings()])
  return buildMetadata({
    meta: page.meta,
    name: plainHeadline(page.hero?.title),
    description: page.hero?.intro,
    path: '/news',
    image: page.hero?.image,
    defaultImage: settings.defaultOgImage,
  })
}

export default async function NewsIndexPage() {
  const page = (await getGlobal('news-page')) as NewsPage
  return <NewsList page={1} crumbs={[{ label: plainHeadline(page.hero?.title) }]} />
}
