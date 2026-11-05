import type { Metadata } from 'next'
import { localeInfo, localizeHref, locales } from '@/i18n/config'
import { currentLocale } from '@/i18n/server'
import { asMedia } from './cms'
import { absoluteUrl } from './url'

type SeoFields = {
  title?: string | null
  description?: string | null
  image?: unknown
  canonical?: string | null
  noindex?: boolean | null
}

type Args = {
  meta?: SeoFields | null
  /** Used when the SEO fields are empty: `{Name} | Chemillion`. */
  name: string
  description?: string | null
  path: string
  image?: unknown
  defaultImage?: unknown
  type?: 'website' | 'article'
  noindex?: boolean
}

const clip = (text: string, max = 155) => (text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text)

/** Each page's address in every language, for `hreflang` links and the sitemap. English is also the default. */
export const languageAlternates = (path: string) => ({
  ...Object.fromEntries(locales.map((l) => [localeInfo[l].htmlLang, absoluteUrl(localizeHref(path, l))])),
  'x-default': absoluteUrl(path),
})

export const buildMetadata = async ({ meta, name, description, path, image, defaultImage, type = 'website', noindex }: Args): Promise<Metadata> => {
  const locale = await currentLocale()
  const title = meta?.title || `${name} | Chemillion`
  const desc = meta?.description || clip((description || '').replace(/\*/g, ''))
  const media = asMedia(meta?.image) || asMedia(image) || asMedia(defaultImage)
  const images = media?.url ? [{ url: absoluteUrl(media.url), alt: media.alt }] : undefined
  const url = absoluteUrl(localizeHref(path, locale))

  return {
    title: { absolute: title },
    description: desc || undefined,
    alternates: { canonical: meta?.canonical || url, languages: languageAlternates(path) },
    robots: noindex || meta?.noindex ? { index: false, follow: true } : undefined,
    openGraph: { title, description: desc || undefined, url, siteName: 'Chemillion', type, images, locale: localeInfo[locale].ogLocale },
    twitter: { card: 'summary_large_image', title, description: desc || undefined, images },
  }
}
