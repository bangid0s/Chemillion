'use client'

import Link from 'next/link'
import { createContext, useContext } from 'react'
import { defaultLocale, localizeHref, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

const LocaleContext = createContext<Locale>(defaultLocale)

/** Tells client components which language the page is in. Set once in the root layout. */
export const LocaleProvider = ({ locale, children }: { locale: Locale; children: React.ReactNode }) => (
  <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
)

export const useLocale = () => useContext(LocaleContext)
export const useT = () => getDictionary(useContext(LocaleContext))

/** A Next link that keeps the visitor in their language: /about becomes /id/about on Indonesian pages. */
export const LocalLink = ({ href, ...props }: React.ComponentProps<typeof Link>) => {
  const locale = useLocale()
  return <Link href={typeof href === 'string' ? localizeHref(href, locale) : href} {...props} />
}
