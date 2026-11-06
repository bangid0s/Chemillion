import type { Metadata } from 'next'
import { CtaBanner } from '@/components/CtaBanner'
import { Icon } from '@/components/Icon'
import { PageHero } from '@/components/PageHero'
import { Button, CmsImage, plainHeadline } from '@/components/ui'
import { getT } from '@/i18n/server'
import { getCategories, getGlobal, getSettings, quoteHref, solutionAnchor } from '@/lib/cms'
import { buildMetadata } from '@/lib/seo'
import type { SolutionsPage as Content } from '@/payload-types'

const getContent = () => getGlobal('solutions-page') as Promise<Content>

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getContent(), getSettings()])
  return buildMetadata({
    meta: page.meta,
    name: plainHeadline(page.hero?.title),
    description: page.hero?.intro,
    path: '/solutions',
    image: page.hero?.image,
    defaultImage: settings.defaultOgImage,
  })
}

/** Every solution with its applications and benefits, each with its own quote button. */
export default async function SolutionsPage() {
  const [page, solutions, t] = await Promise.all([getContent(), getCategories(), getT()])

  return (
    <>
      <PageHero {...page.hero} crumbs={[{ label: plainHeadline(page.hero?.title) }]} />

      {solutions.map((solution, i) => (
        <section key={solution.id} id={solutionAnchor(solution)} className={`section solution${i % 2 ? ' section--grey' : ''}`}>
          <div className={`container split${i % 2 ? ' split--flip' : ''}`}>
            <div className="split__media">
              <CmsImage media={solution.image} sizes="(max-width: 1023px) 100vw, 45vw" />
            </div>
            <div>
              <p className="eyebrow">{String(i + 1).padStart(2, '0')}</p>
              <h2 className="title">{solution.name}</h2>
              <dl className="solution__facts">
                {solution.applications && (
                  <div>
                    <dt>
                      <span className="icon-circle icon-circle--sm">
                        <Icon name="factory" />
                      </span>
                      {t.applications}
                    </dt>
                    <dd>{solution.applications}</dd>
                  </div>
                )}
                {solution.benefits && (
                  <div>
                    <dt>
                      <span className="icon-circle icon-circle--sm">
                        <Icon name="check" />
                      </span>
                      {t.benefits}
                    </dt>
                    <dd>{solution.benefits}</dd>
                  </div>
                )}
              </dl>
              <Button href={quoteHref(solution.name)} className="solution__btn">
                {page.list?.buttonLabel || t.requestQuote}
              </Button>
            </div>
          </div>
        </section>
      ))}

      <CtaBanner cta={page.cta} />
    </>
  )
}
