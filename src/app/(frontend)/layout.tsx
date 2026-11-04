import type { Metadata, Viewport } from 'next'
import { Montserrat, Red_Hat_Display } from 'next/font/google'
import { draftMode } from 'next/headers'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Analytics } from '@/components/Analytics'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { ShapeDefs } from '@/components/Shapes'
import { JsonLd } from '@/components/ui'
import { t } from '@/i18n/en'
import { getSettings } from '@/lib/cms'
import { organizationLd, websiteLd } from '@/lib/jsonld'
import { siteUrl } from '@/lib/url'
import './globals.css'

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

export const viewport: Viewport = {
  themeColor: '#0f6b70',
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const [settings, draft] = await Promise.all([getSettings(), draftMode()])
  return (
    <html lang="en" className={`${body.variable} ${heading.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          {t.skipToContent}
        </a>
        <ShapeDefs />
        <Header />
        {draft.isEnabled && (
          <div className="preview-bar" role="status">
            {t.previewBanner} <Link href="/preview/exit" prefetch={false}>{t.exitPreview}</Link>
            <RefreshRouteOnSave />
          </div>
        )}
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={organizationLd(settings)} />
        <JsonLd data={websiteLd(settings)} />
        {settings.gaId && <Analytics gaId={settings.gaId} />}
      </body>
    </html>
  )
}
