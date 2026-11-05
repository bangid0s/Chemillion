import type { Metadata } from 'next'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Breadcrumbs } from '@/components/PageHero'
import { getGlobal, getSettings } from '@/lib/cms'
import { buildMetadata } from '@/lib/seo'
import type { PrivacyPage as Content } from '@/payload-types'

const getContent = () => getGlobal('privacy-page') as Promise<Content>

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getContent(), getSettings()])
  return buildMetadata({ meta: page.meta, name: page.title, path: '/privacy', defaultImage: settings.defaultOgImage })
}

export default async function PrivacyPage() {
  const page = await getContent()
  return (
    <article className="article">
      <div className="container container--narrow">
        <Breadcrumbs items={[{ label: page.title }]} />
        <h1 className="title">{page.title}</h1>
        {page.body && <RichText data={page.body} className="prose" />}
      </div>
    </article>
  )
}
