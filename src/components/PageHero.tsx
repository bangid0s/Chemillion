import { breadcrumbLd } from '@/lib/jsonld'
import { getT } from '@/i18n/server'
import { LocalLink as Link } from '@/components/LocaleProvider'
import { Icon } from './Icon'
import { CmsImage, Headline, JsonLd } from './ui'

export type Crumb = { label: string; href?: string }

export const Breadcrumbs = async ({ items }: { items: Crumb[] }) => {
  const t = await getT()
  const all: Crumb[] = [{ label: t.home, href: '/' }, ...items]
  return (
    <>
      <nav className="crumbs" aria-label="Breadcrumb">
        <ol>
          {all.map((item, i) => (
            <li key={item.label}>
              {i > 0 && <Icon name="chevron" />}
              {item.href && i < all.length - 1 ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(all)} />
    </>
  )
}

type Props = {
  eyebrow?: string | null
  title?: string | null
  intro?: string | null
  image?: unknown
  crumbs: Crumb[]
}

export const PageHero = ({ eyebrow, title, intro, image, crumbs }: Props) => (
  <section className="page-hero">
    <div className="page-hero__visual">
      <CmsImage media={image} priority sizes="(max-width: 1023px) 100vw, 60vw" className="page-hero__img" />
    </div>
    <div className="container page-hero__body">
      <Breadcrumbs items={crumbs} />
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 className="title page-hero__title">
        <Headline text={title} />
      </h1>
      {intro && <p className="page-hero__intro">{intro}</p>}
    </div>
  </section>
)
