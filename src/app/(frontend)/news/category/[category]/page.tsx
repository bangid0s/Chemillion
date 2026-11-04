import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NewsList } from '@/components/NewsList'
import { plainHeadline } from '@/components/ui'
import { getGlobal, getNewsCategories } from '@/lib/cms'
import { buildMetadata } from '@/lib/seo'
import type { NewsPage } from '@/payload-types'

type Props = { params: Promise<{ category: string }> }

// Filter result URLs stay out of the index, as the PRD specifies.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const name = decodeURIComponent(category)
  return buildMetadata({ name, path: `/news/category/${category}`, noindex: true })
}

export default async function NewsCategoryPage({ params }: Props) {
  const { category } = await params
  const name = decodeURIComponent(category)
  const [page, categories] = await Promise.all([getGlobal('news-page') as Promise<NewsPage>, getNewsCategories()])
  if (!categories.includes(name)) notFound()
  return <NewsList page={1} category={name} crumbs={[{ label: plainHeadline(page.hero?.title), href: '/news' }, { label: name }]} />
}
