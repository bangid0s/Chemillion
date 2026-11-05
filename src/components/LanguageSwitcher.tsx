'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { localeInfo, localizeHref, locales } from '@/i18n/config'
import { Icon } from './Icon'
import { useLocale, useT } from './LocaleProvider'

/**
 * Switches to the same page in another language: /about ↔ /id/about ↔ /zh/about.
 * Each language's text is written in the dashboard, so nothing is machine-translated.
 */
export const LanguageSwitcher = () => {
  const current = useLocale()
  const t = useT()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const active = localeInfo[current]

  return (
    <div ref={root} className="lang">
      <button
        ref={toggle}
        type="button"
        className="lang__toggle"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`${t.language}: ${active.label}. ${t.chooseLanguage}`}
        onClick={() => setOpen((v) => !v)}
      >
        <Icon name="globe" />
        <span className="lang__code">{active.short}</span>
      </button>
      {open && (
        <div className="lang__menu">
          <p className="lang__title">{t.chooseLanguage}</p>
          <ul>
            {locales.map((code) => (
              <li key={code}>
                {/* A full page load, so the whole page (header, footer, metadata) switches language at once. */}
                <a
                  href={localizeHref(pathname || '/', code)}
                  hrefLang={localeInfo[code].htmlLang}
                  lang={localeInfo[code].htmlLang}
                  aria-current={code === current ? 'true' : undefined}
                >
                  {localeInfo[code].label}
                  {code === current && <Icon name="check" />}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
