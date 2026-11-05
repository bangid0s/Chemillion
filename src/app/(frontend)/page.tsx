import type { Metadata } from 'next'
import { BrandMark } from '@/components/BrandMark'
import { CategoryCard } from '@/components/Cards'
import { CtaBanner } from '@/components/CtaBanner'
import { Icon } from '@/components/Icon'
import { HeroOverlay, WhyOverlay } from '@/components/Shapes'
import { Stats } from '@/components/Stats'
import { Button, CmsImage, Headline, SectionHead } from '@/components/ui'
import { getCategories, getHome, getSettings } from '@/lib/cms'
import { buildMetadata } from '@/lib/seo'
import Link from 'next/link'
import { plainHeadline } from '@/components/ui'

const MAX_HOME_CATEGORIES = 5

export async function generateMetadata(): Promise<Metadata> {
  const [home, settings] = await Promise.all([getHome(), getSettings()])
  return buildMetadata({
    meta: home.meta,
    name: plainHeadline(home.hero?.title) || settings.companyName,
    description: home.hero?.text,
    path: '/',
    image: home.hero?.image,
    defaultImage: settings.defaultOgImage,
  })
}

export default async function HomePage() {
  const [home, categories] = await Promise.all([getHome(), getCategories()])
  const { hero, valueProps, categories: catSection, why, cta } = home
  const homeCategories = categories.filter((c) => c.showOnHome).slice(0, MAX_HOME_CATEGORIES)

  return (
    <>
      <section className="hero">
        <div className="hero__visual">
          <CmsImage media={hero?.image} priority quality={85} sizes="(max-width: 1023px) 100vw, 62vw" className="hero__img" />
          <HeroOverlay />
          <BrandMark className="hero__mark" />
          {!!hero?.badgeLines?.length && (
            <div className="hero__badge">
              <div className="hero__badge-row">
                <Icon name={hero.badgeIcon ?? 'flask'} className="hero__badge-icon" />
                <ul>
                  {hero.badgeLines.map((line) => (
                    <li key={line.id}>{line.text}</li>
                  ))}
                </ul>
              </div>
              <span className="hero__badge-rule" />
            </div>
          )}
        </div>
        <div className="hero__copy">
          {hero?.eyebrow && <p className="eyebrow">{hero.eyebrow}</p>}
          <h1 className="hero__title">
            <Headline text={hero?.title} />
          </h1>
          {hero?.text && <p className="hero__text">{hero.text}</p>}
          <div className="hero__buttons">
            {hero?.primaryLabel && <Button href={hero.primaryLink || '/#products'}>{hero.primaryLabel}</Button>}
            {hero?.secondaryLabel && (
              <Button href={hero.secondaryLink || '/about'} variant="outline">
                {hero.secondaryLabel}
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className="props" aria-label={valueProps?.items?.map((i) => i.title).join(', ')}>
        <div className="props__inner">
          {valueProps?.items?.map((item) => (
            <div key={item.id} className="prop">
              <span className="icon-circle">
                <Icon name={item.icon} />
              </span>
              <div>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cats" id="products">
        <div className="cats__inner">
          <div className="cats__head">
            <div className="cats__title">
              <SectionHead eyebrow={catSection?.eyebrow} title={catSection?.title} />
            </div>
            {catSection?.intro && <p className="cats__intro">{catSection.intro}</p>}
            {catSection?.linkLabel && (
              <Link href={catSection.linkLink || '/contact?origin=quote#inquiry'} className="link-arrow cats__link">
                {catSection.linkLabel}
                <Icon name="arrow" />
              </Link>
            )}
          </div>
          <div className="cats__grid">
            {homeCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section className="why">
        <div className="why__visual">
          <CmsImage media={why?.image} sizes="(max-width: 1023px) 100vw, 50vw" className="why__img" />
          <WhyOverlay />
        </div>
        <div className="why__copy">
          <SectionHead eyebrow={why?.eyebrow} title={why?.title} />
          {why?.text && <p className="why__text">{why.text}</p>}
          {why?.buttonLabel && (
            <Button href={why.buttonLink || '/about'} className="why__btn">
              {why.buttonLabel}
              {/* Gives search engines and screen readers a descriptive link, not just "Learn More". */}
              <span className="sr-only"> {plainHeadline(why.title)}</span>
            </Button>
          )}
          <Stats stats={why?.stats} className="why__stats" />
        </div>
      </section>

      <CtaBanner cta={cta} />
    </>
  )
}
