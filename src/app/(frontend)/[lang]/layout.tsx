import type { Metadata, Viewport } from 'next'
import { Montserrat, Red_Hat_Display } from 'next/font/google'
import { draftMode } from 'next/headers'
import dynamic from 'next/dynamic'
import { Analytics } from '@/components/Analytics'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { LocaleProvider } from '@/components/LocaleProvider'
import { ShapeDefs } from '@/components/Shapes'
import { JsonLd } from '@/components/ui'
import { localeInfo, locales } from '@/i18n/config'
import { currentLocale, getT } from '@/i18n/server'
import { getSettings } from '@/lib/cms'
import { organizationLd, websiteLd } from '@/lib/jsonld'
import { siteUrl } from '@/lib/url'
import '../globals.css'

// Only the dashboard's live preview needs this, so visitors never download it.
const RefreshRouteOnSave = dynamic(() => import('@/components/RefreshRouteOnSave').then((m) => m.RefreshRouteOnSave))

const body = Montserrat({ subsets: ['latin'], variable: '--font-body', display: 'swap', weight: 'variable' })
const heading = Red_Hat_Display({ subsets: ['latin'], variable: '--font-heading', display: 'swap', weight: 'variable' })

// Pages are static and refreshed when an admin publishes. This also releases scheduled news on time.
export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  return {
    metadataBase: new URL(siteUrl),
    title: { default: settings.companyName, template: `%s | ${settings.companyName}` },
    verification: settings.searchConsoleToken ? { google: settings.searchConsoleToken } : undefined,
  }
}

// Every language is built ahead of time. The proxy sends unprefixed (English) paths here as /en.
export const dynamicParams = false
export const generateStaticParams = () => locales.map((lang) => ({ lang }))

export const viewport: Viewport = {
  themeColor: '#0f6b70',
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const [settings, draft, locale, t] = await Promise.all([getSettings(), draftMode(), currentLocale(), getT()])
  return (
    <html lang={localeInfo[locale].htmlLang} className={`${body.variable} ${heading.variable}`}>
      <body>
        <LocaleProvider locale={locale}>
          <a href="#main" className="skip-link">
            {t.skipToContent}
          </a>
          <ShapeDefs />
          <Header />
          {draft.isEnabled && (
            <div className="preview-bar" role="status">
              {t.previewBanner}{' '}
              <a href="/preview/exit">{t.exitPreview}</a>
              <RefreshRouteOnSave />
            </div>
          )}
          <main id="main">{children}</main>
          <Footer />
          <JsonLd data={organizationLd(settings)} />
          <JsonLd data={websiteLd(settings)} />
          {settings.gaId && <Analytics gaId={settings.gaId} />}
        </LocaleProvider>
      </body>
    </html>
  )
}
