import { LocalLink as Link } from '@/components/LocaleProvider'
import { getCategories, getSettings, quoteHref } from '@/lib/cms'
import { getT } from '@/i18n/server'
import { getNavItems } from './Header'
import { Icon } from './Icon'
import { Logo } from './Logo'

export const Footer = async () => {
  const [{ nav, items }, settings, categories, t] = await Promise.all([getNavItems(), getSettings(), getCategories(), getT()])
  const copyright = (settings.copyright ?? '').replace('{year}', String(new Date().getFullYear()))

  return (
    <footer className="footer">
      <div className="footer__inner">
        <Logo logo={settings.logo} className="footer__logo" />

        <div className="footer__col footer__col--links">
          <h2>{nav.quickLinksTitle}</h2>
          <ul>
            <li>
              <Link href="/">{t.home}</Link>
            </li>
            {items.map((item) => (
              <li key={item.link}>
                <Link href={item.link}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col footer__col--products">
          <h2>{nav.productsTitle}</h2>
          <ul>
            {categories.slice(0, 5).map((c) => (
              <li key={c.id}>
                <Link href={quoteHref(c.name)}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col footer__col--contact">
          <h2>{nav.contactTitle}</h2>
          <ul>
            {settings.address && (
              <li>
                <Icon name="pin" />
                <span className="pre-line">{settings.address}</span>
              </li>
            )}
            {settings.phone && (
              <li>
                <Icon name="phone" />
                <a href={`tel:${settings.phone.replace(/[^+\d]/g, '')}`} data-track="click_phone">
                  {settings.phone}
                </a>
              </li>
            )}
            {settings.email && (
              <li>
                <Icon name="mail" />
                <a href={`mailto:${settings.email}`} data-track="click_email">
                  {settings.email}
                </a>
              </li>
            )}
          </ul>
        </div>

        <div className="footer__col footer__col--social">
          <h2>{settings.followLabel}</h2>
          <ul className="footer__social">
            {settings.socialLinks?.map((s) => (
              <li key={s.id ?? s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.platform}>
                  <Icon name={s.platform} />
                </a>
              </li>
            ))}
          </ul>
          <p className="footer__copy">{copyright}</p>
        </div>
      </div>
    </footer>
  )
}
