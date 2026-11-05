import type { Metadata } from 'next'
import { Icon } from '@/components/Icon'
import { Button } from '@/components/ui'
import { getT } from '@/i18n/server'
import { getGlobal } from '@/lib/cms'
import type { ContactPage } from '@/payload-types'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT()
  return { title: t.thankYouTitle, robots: { index: false, follow: false } }
}

export default async function ThankYouPage() {
  const [page, t] = await Promise.all([getGlobal('contact-page') as Promise<ContactPage>, getT()])
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
