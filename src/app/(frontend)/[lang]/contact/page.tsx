import type { Metadata } from 'next'
import { Icon } from '@/components/Icon'
import { InquiryForm } from '@/components/InquiryForm'
import { MapEmbed } from '@/components/MapEmbed'
import { PageHero } from '@/components/PageHero'
import { CmsImage, JsonLd, SectionHead, plainHeadline } from '@/components/ui'
import { getT } from '@/i18n/server'
import { getGlobal, getSettings } from '@/lib/cms'
import { localBusinessLd } from '@/lib/jsonld'
import { buildMetadata } from '@/lib/seo'
import type { ContactPage as Content } from '@/payload-types'

const getContent = () => getGlobal('contact-page') as Promise<Content>

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getContent(), getSettings()])
  return buildMetadata({
    meta: page.meta,
    name: plainHeadline(page.hero?.title),
    description: page.hero?.intro,
    path: '/contact',
    image: page.hero?.image,
    defaultImage: settings.defaultOgImage,
  })
}

export default async function ContactPage() {
  const [page, settings, t] = await Promise.all([getContent(), getSettings(), getT()])
  const { form, office } = page

  return (
    <>
      <PageHero {...page.hero} crumbs={[{ label: plainHeadline(page.hero?.title) }]} />

      <section className="section section--grey" id="inquiry">
        <div className="container contact">
          <div className="contact__form">
            <SectionHead eyebrow={form?.eyebrow} title={form?.title} />
            {form?.text && <p className="lead">{form.text}</p>}
            <InquiryForm
              inquiryTypes={settings.inquiryTypes?.map((i) => i.label) ?? []}
              turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || undefined}
              thankYouTitle={form?.thankYouTitle}
              thankYouText={form?.thankYouText}
            />
          </div>
          <aside className="contact__side">
            <SectionHead eyebrow={office?.eyebrow} title={office?.title} />
            <ul className="contact__list">
              {settings.address && (
                <li>
                  <span className="icon-circle icon-circle--sm">
                    <Icon name="pin" />
                  </span>
                  <div>
                    <strong>{t.address}</strong>
                    <span className="pre-line">{settings.address}</span>
                  </div>
                </li>
              )}
              {settings.phone && (
                <li>
                  <span className="icon-circle icon-circle--sm">
                    <Icon name="phone" />
                  </span>
                  <div>
                    <strong>{t.phone}</strong>
                    <a href={`tel:${settings.phone.replace(/[^+\d]/g, '')}`} data-track="click_phone">
                      {settings.phone}
                    </a>
                  </div>
                </li>
              )}
              {settings.email && (
                <li>
                  <span className="icon-circle icon-circle--sm">
                    <Icon name="mail" />
                  </span>
                  <div>
                    <strong>{t.email}</strong>
                    <a href={`mailto:${settings.email}`} data-track="click_email">
                      {settings.email}
                    </a>
                  </div>
                </li>
              )}
              {settings.officeHours && (
                <li>
                  <span className="icon-circle icon-circle--sm">
                    <Icon name="check" />
                  </span>
                  <div>
                    <strong>{t.officeHours}</strong>
                    <span className="pre-line">{settings.officeHours}</span>
                  </div>
                </li>
              )}
            </ul>
            {settings.whatsapp && (
              <a
                href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`}
                className="btn btn--outline contact__wa"
                target="_blank"
                rel="noopener noreferrer"
                data-track="click_whatsapp"
              >
                <Icon name="whatsapp" className="btn__arrow" />
                {t.whatsappChat}
              </a>
            )}
            <MapEmbed embedUrl={settings.mapEmbedUrl}>
              <CmsImage media={office?.mapImage} sizes="(max-width: 1023px) 100vw, 35vw" />
            </MapEmbed>
          </aside>
        </div>
      </section>
      <JsonLd data={localBusinessLd(settings)} />
    </>
  )
}
