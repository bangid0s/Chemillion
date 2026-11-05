import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import type { Payload, PayloadRequest } from 'payload'

/**
 * Fills in the Indonesian and Chinese menu, button and footer titles, so the header and footer read in the visitor's
 * language from day one. Only the standard English labels are translated, and only where that language is still
 * empty, so nothing an editor has written is overwritten. Page content is left for the team to translate.
 */
export const NAV_TRANSLATIONS: Record<string, { id: string; zh: string }> = {
  Home: { id: 'Beranda', zh: '首页' },
  'About Us': { id: 'Tentang Kami', zh: '关于我们' },
  About: { id: 'Tentang Kami', zh: '关于我们' },
  Contact: { id: 'Kontak', zh: '联系我们' },
  'Contact Us': { id: 'Hubungi Kami', zh: '联系我们' },
  'Get a Quote': { id: 'Minta Penawaran', zh: '获取报价' },
  'Request a Quote': { id: 'Minta Penawaran', zh: '索取报价' },
  'Quick Links': { id: 'Tautan Cepat', zh: '快速链接' },
  Products: { id: 'Produk', zh: '产品' },
  'Follow Us': { id: 'Ikuti Kami', zh: '关注我们' },
}

const LOCALES = ['id', 'zh'] as const

/** Also used by the seed script, which fills the menu after the migrations have run. */
export const translateNavigation = async (payload: Payload, req?: Partial<PayloadRequest>) => {
  const en = await payload.findGlobal({ slug: 'navigation', locale: 'en', depth: 0, req })
  for (const locale of LOCALES) {
    const current = await payload.findGlobal({ slug: 'navigation', locale, fallbackLocale: false, depth: 0, req })
    // A field still showing the English text (or a default value) counts as not translated yet.
    const translate = (english?: string | null, existing?: string | null) =>
      (existing && existing !== english ? existing : english && NAV_TRANSLATIONS[english]?.[locale]) || existing || undefined

    const items = (en.items ?? []).map((item) => {
      const mine = current.items?.find((i) => i.id === item.id)
      return { id: item.id, link: item.link, visible: item.visible, label: translate(item.label, mine?.label) ?? item.label }
    })
    await payload.updateGlobal({
      slug: 'navigation',
      locale,
      req,
      data: {
        items,
        ctaLabel: translate(en.ctaLabel, current.ctaLabel),
        quickLinksTitle: translate(en.quickLinksTitle, current.quickLinksTitle),
        productsTitle: translate(en.productsTitle, current.productsTitle),
        contactTitle: translate(en.contactTitle, current.contactTitle),
      },
    })

    const settings = await payload.findGlobal({ slug: 'site-settings', locale: 'en', depth: 0, req })
    const mySettings = await payload.findGlobal({ slug: 'site-settings', locale, fallbackLocale: false, depth: 0, req })
    const followLabel = translate(settings.followLabel, mySettings.followLabel)
    if (followLabel && followLabel !== mySettings.followLabel) {
      await payload.updateGlobal({ slug: 'site-settings', locale, req, data: { followLabel } })
    }
  }
  payload.logger.info('Navigation: filled in Indonesian and Chinese labels.')
}

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await translateNavigation(payload, req)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Translations are content; removing the Chinese language (previous migration's down) removes its text.
}
