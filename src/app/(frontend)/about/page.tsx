import type { Metadata } from 'next'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { CtaBanner } from '@/components/CtaBanner'
import { Icon } from '@/components/Icon'
import { PageHero } from '@/components/PageHero'
import { Stats } from '@/components/Stats'
import { CmsImage, SectionHead, plainHeadline } from '@/components/ui'
import { asMedia, getGlobal, getSettings } from '@/lib/cms'
import { buildMetadata } from '@/lib/seo'
import type { AboutPage as About } from '@/payload-types'

const getAbout = () => getGlobal('about-page') as Promise<About>

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getAbout(), getSettings()])
  return buildMetadata({
    meta: page.meta,
    name: plainHeadline(page.hero?.title),
    description: page.hero?.intro,
    path: '/about',
    image: page.hero?.image,
    defaultImage: settings.defaultOgImage,
  })
}

export default async function AboutPage() {
  const page = await getAbout()
  const { hero, story, visionMission, values, certifications, facilities, statsBlock, cta } = page

  return (
    <>
      <PageHero {...hero} crumbs={[{ label: plainHeadline(hero?.title) }]} />

      <section className="section">
        <div className="container split">
          <div className="split__media">
            <CmsImage media={story?.image} sizes="(max-width: 1023px) 100vw, 45vw" />
          </div>
          <div>
            <SectionHead eyebrow={story?.eyebrow} title={story?.title} />
            {story?.body && <RichText data={story.body} className="prose" />}
          </div>
        </div>
      </section>

      <section className="section section--grey">
        <div className="container">
          <SectionHead eyebrow={visionMission?.eyebrow} title={visionMission?.title} />
          <div className="grid grid--2">
            {visionMission?.cards?.map((card) => (
              <div key={card.id} className="card">
                <span className="icon-circle">
                  <Icon name={card.icon} />
                </span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow={values?.eyebrow} title={values?.title} />
          <div className="grid grid--3">
            {values?.items?.map((item) => (
              <div key={item.id} className="card card--plain">
                <span className="icon-circle">
                  <Icon name={item.icon} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {!!certifications?.items?.length && (
        <section className="section section--grey">
          <div className="container">
            <SectionHead eyebrow={certifications.eyebrow} title={certifications.title} />
            <div className="grid grid--3">
              {certifications.items.map((item) => {
                const pdf = asMedia(item.pdf)
                return (
                  <div key={item.id} className="card cert">
                    <div className="cert__logo">
                      <CmsImage media={item.logo} sizes="128px" fill={false} />
                    </div>
                    <h3>{item.name}</h3>
                    <p>{item.text}</p>
                    {pdf?.url && (
                      <a href={pdf.url} className="link-arrow" data-track="file_download">
                        {pdf.alt}
                        <Icon name="download" />
                      </a>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {!!facilities?.images?.length && (
        <section className="section">
          <div className="container">
            <SectionHead eyebrow={facilities.eyebrow} title={facilities.title} />
            <div className="grid grid--3">
              {facilities.images.map((item) => (
                <figure key={item.id} className="gallery-item">
                  <div className="gallery-item__img">
                    <CmsImage media={item.image} sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 30vw" />
                  </div>
                  {item.caption && <figcaption>{item.caption}</figcaption>}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {!!statsBlock?.stats?.length && (
        <section className="section section--tight">
          <div className="container">
            <Stats stats={statsBlock.stats} className="stats--wide" />
          </div>
        </section>
      )}

      <CtaBanner cta={cta} />
    </>
  )
}
