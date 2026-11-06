import type { MetadataRoute } from 'next'
import { localizeHref, locales } from '@/i18n/config'
import { languageAlternates } from '@/lib/seo'
import { absoluteUrl } from '@/lib/url'

export const revalidate = 300

/** Every page in every language, each listing its other-language versions. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString()
  return ['/', '/about', '/solutions', '/contact', '/privacy'].flatMap((path) =>
    locales.map((locale) => ({
      url: absoluteUrl(localizeHref(path, locale)),
      lastModified: now,
      alternates: { languages: languageAlternates(path) },
    })),
  )
}
