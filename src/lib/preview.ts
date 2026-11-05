import { isLocale, localizeHref } from '../i18n/config'
import { siteUrl } from './url'

/**
 * Admin preview links go through /preview, which switches on draft mode for logged-in staff.
 * They open the page in the language the editor has selected in the dashboard's Locale menu.
 */
export const previewUrl = (path: string, locale?: unknown) => {
  const code = typeof locale === 'object' && locale ? (locale as { code?: string }).code : locale
  const localized = isLocale(code) ? localizeHref(path, code) : path
  return `${siteUrl}/preview?path=${encodeURIComponent(localized)}`
}
