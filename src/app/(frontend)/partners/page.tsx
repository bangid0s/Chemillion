import type { Metadata } from 'next'
import { CtaBanner } from '@/components/CtaBanner'
import { PageHero } from '@/components/PageHero'
import { CmsImage, plainHeadline } from '@/components/ui'
import { getGlobal, getPartners, getSettings } from '@/lib/cms'
import { buildMetadata } from '@/lib/seo'
import type { PartnersPage as Content } from '@/payload-types'

const getContent = () => getGlobal('partners-page') as Promise<Content>

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getContent(), getSettings()])
  return buildMetadata({
    meta: page.meta,
    name: plainHeadline(page.hero?.title),
    description: page.hero?.intro,
    path: '/partners',
    image: page.hero?.image,
    defaultImage: settings.defaultOgImage,
  })
}

export default async function PartnersPage() {
  const [page, groups] = await Promise.all([getContent(), getPartners()])
  return (
    <>
      <PageHero {...page.hero} crumbs={[{ label: plainHeadline(page.hero?.title) }]} />
      <section className="section section--grey">
        <div className="container partner-groups">
          {groups.map(({ type, partners }) => (
            <div key={type.id}>
              <h2 className="subtitle">{type.name}</h2>
              <ul className="partner-grid">
                {partners.map((partner) => {
                  const inner = (
                    <>
                      <span className="partner-logo">
                        <CmsImage media={partner.logo} sizes="180px" fill={false} />
                      </span>
                      <span className="partner-name">{partner.name}</span>
                      {partner.description && <span className="partner-text">{partner.description}</span>}
                    </>
                  )
                  return (
                    <li key={partner.id}>
                      {partner.url ? (
                        <a href={partner.url} target="_blank" rel="noopener noreferrer" className="partner-card">
                          {inner}
                        </a>
                      ) : (
                        <div className="partner-card">{inner}</div>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <CtaBanner cta={page.become ? { ...page.become, buttonLink: '/contact?origin=partner#inquiry' } : null} />
    </>
  )
}
