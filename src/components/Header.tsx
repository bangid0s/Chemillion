import Link from 'next/link'
import { getGlobal, getNewsCount, getSettings } from '@/lib/cms'
import type { Navigation } from '@/payload-types'
import { t } from '@/i18n/en'
import { Icon } from './Icon'
import { Logo } from './Logo'
import { MobileMenu, NavLinks } from './HeaderClient'
import { Button } from './ui'

const MIN_NEWS_FOR_NAV = 3

export const getNavItems = async () => {
  const [nav, newsCount] = await Promise.all([getGlobal('navigation') as Promise<Navigation>, getNewsCount()])
  const items = (nav.items ?? [])
    .filter((item) => item.visible !== false)
    .filter((item) => item.link !== '/news' || newsCount >= MIN_NEWS_FOR_NAV)
    .map((item) => ({ label: item.label, link: item.link }))
  return { nav, items }
}

export const Header = async () => {
  const [{ nav, items }, settings] = await Promise.all([getNavItems(), getSettings()])
  const ctaLabel = nav.ctaLabel ?? ''
  const ctaLink = nav.ctaLink ?? '/contact'

  return (
    <header className="header">
      <div className="header__inner">
        <Logo logo={settings.logo} className="header__logo" />
        <nav className="header__nav" aria-label={t.mainNav}>
          <NavLinks items={items} />
        </nav>
        <div className="header__actions">
          <Link href="/search" className="header__search" aria-label={t.search}>
            <Icon name="search" />
          </Link>
          <Button href={ctaLink} className="header__cta">
            {ctaLabel}
          </Button>
          <MobileMenu items={items} ctaLabel={ctaLabel} ctaLink={ctaLink} />
        </div>
      </div>
    </header>
  )
}
