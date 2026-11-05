import { lang } from 'next/root-params'
import { defaultLocale, isLocale, type Locale } from './config'
import { getDictionary } from './dictionaries'

/**
 * The language of the page being rendered, read from the URL's /[lang] segment in any Server Component.
 * Outside the public site (dashboard, route handlers, scripts) it is English.
 */
export const currentLocale = async (): Promise<Locale> => {
  try {
    const value = await lang()
    return isLocale(value) ? value : defaultLocale
  } catch {
    return defaultLocale
  }
}

/** Interface strings for the page being rendered. */
export const getT = async () => getDictionary(await currentLocale())
