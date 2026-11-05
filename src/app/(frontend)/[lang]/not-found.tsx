import type { Metadata } from 'next'
import { Button } from '@/components/ui'
import { getT } from '@/i18n/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT()
  return { title: t.notFoundTitle, robots: { index: false, follow: true } }
}

export default async function NotFound() {
  const t = await getT()
  return (
    <section className="section message-page">
      <div className="container container--narrow">
        <p className="eyebrow">{t.notFoundEyebrow}</p>
        <h1 className="title">{t.notFoundTitle}</h1>
        <p className="lead">{t.notFoundText}</p>
        <div className="message-page__actions">
          <Button href="/">{t.backHome}</Button>
          <Button href="/contact" variant="outline">
            {t.contactUs}
          </Button>
        </div>
      </div>
    </section>
  )
}
