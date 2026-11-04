'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { t } from '@/i18n/en'
import { Icon } from './Icon'

type Item = { label: string; link: string }

const isActive = (pathname: string, link: string) => pathname === link || pathname.startsWith(`${link}/`)

export const NavLinks = ({ items }: { items: Item[] }) => {
  const pathname = usePathname()
  return (
    <ul className="nav-links">
      {items.map((item) => (
        <li key={item.link}>
          <Link href={item.link} aria-current={isActive(pathname, item.link) ? 'page' : undefined}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export const MobileMenu = ({ items, ctaLabel, ctaLink }: { items: Item[]; ctaLabel: string; ctaLink: string }) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const toggle = useRef<HTMLButtonElement>(null)

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <button
        ref={toggle}
        type="button"
        className="header__burger"
        aria-label={open ? t.closeMenu : t.menu}
        aria-expanded={open}
        aria-controls="mobile-panel"
        onClick={() => setOpen((v) => !v)}
      >
        <Icon name={open ? 'close' : 'menu'} />
      </button>
      <div id="mobile-panel" className={`mobile-panel${open ? ' is-open' : ''}`} hidden={!open}>
        <nav aria-label={t.mainNav}>
          <ul>
            {items.map((item) => (
              <li key={item.link}>
                <Link href={item.link} aria-current={isActive(pathname, item.link) ? 'page' : undefined}>
                  {item.label}
                  <Icon name="chevron" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href={ctaLink} className="btn btn--primary mobile-panel__cta">
          {ctaLabel}
          <Icon name="arrow" className="btn__arrow" />
        </Link>
      </div>
    </>
  )
}
