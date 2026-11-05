import { getGlobal, getSettings } from '@/lib/cms'
import type { Navigation } from '@/payload-types'
import { t } from '@/i18n/en'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Logo } from './Logo'
import { MobileMenu, NavLinks } from './HeaderClient'
import { Button } from './ui'

export const getNavItems = async () => {
  const nav = (await getGlobal('navigation')) as Navigation
  const items = (nav.items ?? [])
    .filter((item) => item.visible !== false)
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
          <LanguageSwitcher />
          <Button href={ctaLink} className="header__cta">
            {ctaLabel}
          </Button>
          <MobileMenu items={items} ctaLabel={ctaLabel} ctaLink={ctaLink} />
        </div>
      </div>
    </header>
  )
}
