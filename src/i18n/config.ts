/**
 * The site's languages. English is the default and has no prefix (/about); the others live under
 * their own prefix (/id/about, /zh/about). Page content is entered per language in the dashboard;
 * a field left empty in Indonesian or Chinese shows the English text instead.
 */
export const locales = ['en', 'id', 'zh'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export const localeInfo: Record<Locale, { label: string; short: string; htmlLang: string; ogLocale: string }> = {
  en: { label: 'English', short: 'EN', htmlLang: 'en', ogLocale: 'en_US' },
  id: { label: 'Bahasa Indonesia', short: 'ID', htmlLang: 'id', ogLocale: 'id_ID' },
  zh: { label: '中文 (简体)', short: '中文', htmlLang: 'zh-Hans', ogLocale: 'zh_CN' },
}

export const isLocale = (value: unknown): value is Locale => locales.includes(value as Locale)

/** Paths that are never translated: the dashboard, the API and the form endpoint. */
const UNLOCALIZED = /^\/(admin|api|inquiry|preview)(\/|\?|#|$)/

/** The current path without its language prefix, e.g. /id/about → /about. */
export const stripLocale = (pathname: string) => {
  const match = pathname.match(/^\/([a-z]{2})(?=\/|\?|#|$)/)
  if (match && isLocale(match[1])) return pathname.slice(match[0].length) || '/'
  return pathname
}

/** Adds the language prefix to a site path: ('/about', 'id') → '/id/about', ('/#products', 'zh') → '/zh#products'. */
export const localizeHref = (href: string, locale: Locale) => {
  if (!href.startsWith('/') || href.startsWith('//') || UNLOCALIZED.test(href)) return href
  const path = stripLocale(href)
  if (locale === defaultLocale) return path
  return path === '/' ? `/${locale}` : /^\/[?#]/.test(path) ? `/${locale}${path.slice(1)}` : `/${locale}${path}`
}
