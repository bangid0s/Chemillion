'use client'

import { useEffect, useRef, useState } from 'react'
import { t } from '@/i18n/en'
import { Icon } from './Icon'

/**
 * The site is written in English. Every other language is a live machine translation by Google Translate,
 * so nothing has to be translated by hand in the dashboard.
 *
 * Google's script only loads after a visitor picks another language, so English visitors never download it
 * and no page text is sent to Google unless someone asks for a translation.
 */
export const LANGUAGES = [
  { code: 'en', short: 'EN', label: 'English' },
  { code: 'id', short: 'ID', label: 'Bahasa Indonesia' },
  { code: 'zh-CN', short: '中文', label: '中文 (简体)' },
  { code: 'ja', short: 'JA', label: '日本語' },
  { code: 'ko', short: 'KO', label: '한국어' },
  { code: 'ms', short: 'MS', label: 'Bahasa Melayu' },
  { code: 'th', short: 'TH', label: 'ไทย' },
  { code: 'vi', short: 'VI', label: 'Tiếng Việt' },
] as const

const DEFAULT = 'en'
const COOKIE = 'googtrans'
const SCRIPT_ID = 'google-translate-script'

const readLanguage = () => {
  const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]*)/)
  const code = match ? decodeURIComponent(match[1]).split('/').pop() : ''
  return LANGUAGES.some((l) => l.code === code) ? (code as string) : DEFAULT
}

/** Google reads the cookie on the host and on the parent domain, so both have to be written or cleared. */
const writeLanguage = (code: string) => {
  const host = window.location.hostname
  const domains = ['', host, `.${host.split('.').slice(-2).join('.')}`]
  const value = code === DEFAULT ? '' : `/${DEFAULT}/${code}`
  const expires = code === DEFAULT ? '; expires=Thu, 01 Jan 1970 00:00:00 GMT' : '; max-age=31536000'
  for (const domain of new Set(domains)) {
    document.cookie = `${COOKIE}=${value}; path=/${domain ? `; domain=${domain}` : ''}${expires}; SameSite=Lax`
  }
}

/**
 * Google Translate swaps React's text nodes for its own, and React then fails to remove or move them.
 * This is the widely used fix from facebook/react#11538: skip the call instead of crashing the page.
 */
const guardDomAgainstTranslation = () => {
  const proto = Node.prototype as Node & { __chGuarded?: boolean }
  if (proto.__chGuarded) return
  proto.__chGuarded = true
  const removeChild = proto.removeChild
  proto.removeChild = function <T extends Node>(this: Node, child: T): T {
    if (child.parentNode !== this) return child
    return removeChild.call(this, child) as T
  }
  const insertBefore = proto.insertBefore
  proto.insertBefore = function <T extends Node>(this: Node, node: T, ref: Node | null): T {
    if (ref && ref.parentNode !== this) return node
    return insertBefore.call(this, node, ref) as T
  }
}

const loadTranslator = () => {
  if (document.getElementById(SCRIPT_ID)) return
  guardDomAgainstTranslation()
  const w = window as unknown as {
    googleTranslateElementInit?: () => void
    google?: { translate?: { TranslateElement: new (opts: object, id: string) => unknown } }
  }
  w.googleTranslateElementInit = () => {
    if (!w.google?.translate) return
    new w.google.translate.TranslateElement(
      {
        pageLanguage: DEFAULT,
        includedLanguages: LANGUAGES.map((l) => l.code).join(','),
        autoDisplay: false,
      },
      'google_translate_element',
    )
  }
  const script = document.createElement('script')
  script.id = SCRIPT_ID
  script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
  script.async = true
  document.body.appendChild(script)
}

export const LanguageSwitcher = ({ className = '' }: { className?: string }) => {
  const [current, setCurrent] = useState<string>(DEFAULT)
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)

  // A language chosen on an earlier visit stays on, page after page.
  useEffect(() => {
    const code = readLanguage()
    setCurrent(code)
    if (code !== DEFAULT) loadTranslator()
  }, [])

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

  const choose = (code: string) => {
    setOpen(false)
    if (code === current) return
    writeLanguage(code)
    // A fresh load is the only reliable way to switch: Google translates the page once, as it loads.
    window.location.reload()
  }

  const active = LANGUAGES.find((l) => l.code === current) ?? LANGUAGES[0]

  return (
    <div ref={root} className={`lang notranslate ${className}`.trim()} translate="no">
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
            {LANGUAGES.map((l) => (
              <li key={l.code}>
                <button
                  type="button"
                  lang={l.code}
                  aria-current={l.code === current ? 'true' : undefined}
                  onClick={() => choose(l.code)}
                >
                  {l.label}
                  {l.code === current && <Icon name="check" />}
                </button>
              </li>
            ))}
          </ul>
          <p className="lang__note">{t.translationNote}</p>
        </div>
      )}
      <div id="google_translate_element" hidden />
    </div>
  )
}
