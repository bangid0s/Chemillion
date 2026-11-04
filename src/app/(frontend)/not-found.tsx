import type { Metadata } from 'next'
import { Button } from '@/components/ui'
import { t } from '@/i18n/en'

export const metadata: Metadata = {
  title: t.notFoundTitle,
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <section className="section message-page">
      <div className="container container--narrow">
        <p className="eyebrow">{t.notFoundEyebrow}</p>
        <h1 className="title">{t.notFoundTitle}</h1>
        <p className="lead">{t.notFoundText}</p>
        <div className="message-page__actions">
          <Button href="/products">{t.browseProducts}</Button>
          <Button href="/contact" variant="outline">
            {t.contactUs}
          </Button>
        </div>
      </div>
    </section>
  )
}
