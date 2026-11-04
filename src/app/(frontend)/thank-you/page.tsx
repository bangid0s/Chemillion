import type { Metadata } from 'next'
import { Icon } from '@/components/Icon'
import { Button } from '@/components/ui'
import { t } from '@/i18n/en'
import { getGlobal } from '@/lib/cms'
import type { ContactPage } from '@/payload-types'

export const metadata: Metadata = {
  title: t.thankYouTitle,
  robots: { index: false, follow: false },
}

export default async function ThankYouPage() {
  const page = (await getGlobal('contact-page')) as ContactPage
  return (
    <section className="section message-page">
      <div className="container container--narrow">
        <span className="icon-circle">
          <Icon name="check" />
        </span>
        <h1 className="title">{page.form?.thankYouTitle || t.thankYouTitle}</h1>
        <p className="lead">{page.form?.thankYouText || t.thankYouText}</p>
        <Button href="/">{t.backHome}</Button>
      </div>
    </section>
  )
}
