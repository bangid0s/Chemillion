import type { GlobalSlug, Payload, PayloadRequest } from 'payload'
import { richText } from '../lib/lexical'
import type { ProductCategory } from '../payload-types'

/**
 * The approved website copy ("Draft Copywriting Website PT Kencana Chemillion Indonesia") in English, Bahasa Indonesia
 * and Chinese (Simplified). `applyWebsiteCopy` writes it into the dashboard, where the team keeps editing it.
 *
 * Section titles, eyebrows and short intros the draft does not spell out are written from its own wording.
 * Images, links that point elsewhere, statistics, certifications and facility photos are left as they are.
 */

type Locale = 'en' | 'id' | 'zh'
type Copy = Record<string, unknown>
type PerLocale = Record<Locale, Copy>

const QUOTE_LINK = '/contact?origin=quote#inquiry'

const PROFILE = {
  en: 'PT Kencana Chemillion Indonesia is a trusted partner in supplying industrial solvents and technical-grade chemicals. We are committed to supporting national manufacturing operations by delivering consistent quality products, timely delivery, and flexible service.',
  id: 'PT Kencana Chemillion Indonesia adalah mitra terpercaya dalam penyediaan pelarut industri (solvents) dan bahan kimia technical grade. Kami berkomitmen untuk mendukung keberlanjutan operasional manufaktur nasional dengan menghadirkan produk berkualitas konsisten, pasokan tepat waktu, dan layanan yang fleksibel.',
  zh: 'PT Kencana Chemillion Indonesia 是工业溶剂和工业级化学品领域值得信赖的合作伙伴。我们致力于通过提供质量稳定、交货及时且灵活周到的服务，支持印尼本土制造业的持续发展。',
}

const VALUES = {
  en: [
    { icon: 'truck', title: 'Supply Reliability', text: 'Guaranteed supply continuity for plants.' },
    { icon: 'award', title: 'Consistent Quality', text: 'Stable & verified technical standards.' },
    { icon: 'users', title: 'Responsive Service', text: 'Prompt communication & flexible terms.' },
  ],
  id: [
    { icon: 'truck', title: 'Keandalan Pasokan', text: 'Jaminan kontinuitas suplai untuk pabrik.' },
    { icon: 'award', title: 'Mutu Terjaga', text: 'Spesifikasi teknis stabil & teruji.' },
    { icon: 'users', title: 'Pelayanan Responsif', text: 'Komunikasi cepat & solusi fleksibel.' },
  ],
  zh: [
    { icon: 'truck', title: '稳定供应', text: '保障工厂生产线的连续供应。' },
    { icon: 'award', title: '卓越品质', text: '严格把控，技术指标稳定。' },
    { icon: 'users', title: '快速响应', text: '高效沟通，灵活满足需求。' },
  ],
}

/** The hero's small floating badge has room for one word per line: the three core values in short. */
const BADGE = {
  en: ['Reliability', 'Quality', 'Service'],
  id: ['Keandalan', 'Mutu', 'Pelayanan'],
  zh: ['稳定供应', '卓越品质', '快速响应'],
}

const CTA = {
  en: {
    eyebrow: 'Contact Us',
    title: 'Ready to Discuss Your\n*Chemical Requirements?*',
    text: 'Our team is here to assist with inquiries and tailored quotations.',
    buttonLabel: 'Request a Quote',
    buttonLink: QUOTE_LINK,
  },
  id: {
    eyebrow: 'Hubungi Kami',
    title: 'Siap Mendiskusikan\n*Kebutuhan Anda?*',
    text: 'Tim kami siap membantu memberikan penawaran dan solusi terbaik.',
    buttonLabel: 'Minta Penawaran',
    buttonLink: QUOTE_LINK,
  },
  zh: {
    eyebrow: '联系我们',
    title: '随时探讨\n*您的化学品需求*',
    text: '我们的团队竭诚为您提供优质的产品报价与服务方案。',
    buttonLabel: '索取报价',
    buttonLink: QUOTE_LINK,
  },
}

const SOLUTIONS_INTRO = {
  en: 'Solvents and technical grade chemicals for printing inks, paints & coatings, and manufacturing processes.',
  id: 'Pelarut dan bahan kimia technical grade untuk tinta cetak, cat & coating, serta proses manufaktur.',
  zh: '为印刷油墨、涂料漆业及制造业提供溶剂与工业级化学品。',
}

const HOME: PerLocale = {
  en: {
    hero: {
      eyebrow: 'Solvents & Technical Grade Chemicals',
      title: 'Reliable Industrial\nSolvents & *Technical\nGrade Chemical\nSolutions*',
      text: 'Providing high-quality solvents for printing inks, paints & coatings, and essential technical-grade chemicals with consistent supply reliability.',
      primaryLabel: 'Contact Us',
      primaryLink: '/contact',
      secondaryLabel: 'Explore Solutions',
      secondaryLink: '/solutions',
      badgeLines: BADGE.en.map((text) => ({ text })),
    },
    valueProps: { items: VALUES.en },
    categories: {
      eyebrow: 'Core Solutions',
      title: 'Our *Solutions*',
      intro: SOLUTIONS_INTRO.en,
      linkLabel: 'Explore Solutions',
      linkLink: '/solutions',
    },
    why: {
      eyebrow: 'Why Chemillion',
      title: 'A Trusted Partner for\n*National Manufacturing*',
      text: PROFILE.en,
      buttonLabel: 'About Us',
      buttonLink: '/about',
    },
    cta: CTA.en,
  },
  id: {
    hero: {
      eyebrow: 'Pelarut & Bahan Kimia Technical Grade',
      title: 'Solusi Pelarut\nIndustri & Bahan Kimia\n*Technical Grade\nTerpercaya*',
      text: 'Menyediakan pasokan pelarut berkualitas tinggi untuk industri tinta cetak, cat & coating, serta bahan kimia industri dengan keandalan pasokan yang konsisten.',
      primaryLabel: 'Hubungi Kami',
      secondaryLabel: 'Lihat Solusi',
      badgeLines: BADGE.id.map((text) => ({ text })),
    },
    valueProps: { items: VALUES.id },
    categories: {
      eyebrow: 'Ringkasan Solusi',
      title: 'Solusi *Kami*',
      intro: SOLUTIONS_INTRO.id,
      linkLabel: 'Lihat Solusi',
    },
    why: {
      eyebrow: 'Mengapa Chemillion',
      title: 'Mitra Terpercaya\n*Manufaktur Nasional*',
      text: PROFILE.id,
      buttonLabel: 'Tentang Kami',
    },
    cta: CTA.id,
  },
  zh: {
    hero: {
      eyebrow: '溶剂与工业级化学品',
      title: '值得信赖的\n*工业溶剂与工业级\n化学品解决方案*',
      text: '为印刷油墨、涂料漆业及基础工业提供高质量溶剂与化学原料，确保稳定可靠的供应。',
      primaryLabel: '联系我们',
      secondaryLabel: '了解解决方案',
      badgeLines: BADGE.zh.map((text) => ({ text })),
    },
    valueProps: { items: VALUES.zh },
    categories: {
      eyebrow: '核心解决方案',
      title: '我们的*解决方案*',
      intro: SOLUTIONS_INTRO.zh,
      linkLabel: '了解解决方案',
    },
    why: {
      eyebrow: '为什么选择 Chemillion',
      title: '值得信赖的\n*制造业合作伙伴*',
      text: PROFILE.zh,
      buttonLabel: '关于我们',
    },
    cta: CTA.zh,
  },
}

const MISSION = {
  en: [
    'Provide industrial solvents and chemical raw materials with stable quality standards.',
    'Ensure timely deliveries to support the continuous production of our partners.',
    'Deliver responsive and tailored service to meet the specific requirements of every client.',
  ],
  id: [
    'Menyediakan bahan baku kimia dan pelarut industri dengan standar mutu yang stabil.',
    'Menjaga ketepatan waktu pengiriman guna mendukung kontinuitas produksi mitra kami.',
    'Memberikan pelayanan yang responsif dan solutif sesuai dengan kebutuhan spesifik setiap klien.',
  ],
  zh: ['提供质量标准稳定的工业溶剂与化学原料。', '确保按时交货，保障合作伙伴生产线的连续运转。', '提供快速响应的定制化服务，满足每位客户的具体需求。'],
}
const bullets = (lines: string[]) => lines.map((line) => `• ${line}`).join('\n')

const ABOUT: PerLocale = {
  en: {
    hero: {
      eyebrow: 'About Us',
      title: 'A Trusted Partner in\n*Industrial Solvents*',
      intro:
        'We are committed to supporting national manufacturing operations by delivering consistent quality products, timely delivery, and flexible service.',
    },
    story: { eyebrow: 'Company Profile', title: 'PT Kencana\n*Chemillion Indonesia*', body: richText(PROFILE.en) },
    visionMission: {
      eyebrow: 'Vision & Mission',
      title: 'What *Drives* Us',
      cards: [
        { icon: 'eye', title: 'Vision', text: 'To become a reliable, efficient, and quality-driven provider of industrial chemical solutions in Indonesia.' },
        { icon: 'target', title: 'Mission', text: bullets(MISSION.en) },
      ],
    },
    values: { eyebrow: 'Core Values', title: 'What We *Stand For*', items: VALUES.en },
    certifications: { eyebrow: 'Certifications', title: 'Compliance & *Certifications*' },
    facilities: { eyebrow: 'Facilities', title: 'Our *Facilities*' },
    cta: CTA.en,
  },
  id: {
    hero: {
      eyebrow: 'Tentang Kami',
      title: 'Mitra Terpercaya\n*Pelarut Industri*',
      intro:
        'Kami berkomitmen untuk mendukung keberlanjutan operasional manufaktur nasional dengan menghadirkan produk berkualitas konsisten, pasokan tepat waktu, dan layanan yang fleksibel.',
    },
    story: { eyebrow: 'Profil Perusahaan', title: 'PT Kencana\n*Chemillion Indonesia*', body: richText(PROFILE.id) },
    visionMission: {
      eyebrow: 'Visi & Misi',
      title: 'Yang *Menggerakkan* Kami',
      cards: [
        {
          icon: 'eye',
          title: 'Visi',
          text: 'Menjadi penyedia solusi bahan kimia industri yang andal, efisien, dan mengutamakan mutu serta kepuasan pelanggan di Indonesia.',
        },
        { icon: 'target', title: 'Misi', text: bullets(MISSION.id) },
      ],
    },
    values: { eyebrow: 'Nilai Utama', title: 'Nilai yang Kami *Pegang*', items: VALUES.id },
    certifications: { eyebrow: 'Sertifikasi', title: 'Kepatuhan & *Sertifikasi*' },
    facilities: { eyebrow: 'Fasilitas', title: 'Fasilitas *Kami*' },
    cta: CTA.id,
  },
  zh: {
    hero: {
      eyebrow: '关于我们',
      title: '值得信赖的\n*工业溶剂合作伙伴*',
      intro: '我们致力于通过提供质量稳定、交货及时且灵活周到的服务，支持印尼本土制造业的持续发展。',
    },
    story: { eyebrow: '公司简介', title: 'PT Kencana\n*Chemillion Indonesia*', body: richText(PROFILE.zh) },
    visionMission: {
      eyebrow: '愿景与使命',
      title: '我们的*方向*',
      cards: [
        { icon: 'eye', title: '愿景', text: '成为印尼国内可靠、高效且注重品质的工业化学品解决方案提供商。' },
        { icon: 'target', title: '使命', text: bullets(MISSION.zh) },
      ],
    },
    values: { eyebrow: '核心价值', title: '我们的*核心价值*', items: VALUES.zh },
    certifications: { eyebrow: '认证', title: '合规与*认证*' },
    facilities: { eyebrow: '设施', title: '我们的*设施*' },
    cta: CTA.zh,
  },
}

const SOLUTIONS_PAGE: PerLocale = {
  en: {
    hero: { eyebrow: 'Solutions & Applications', title: 'Our *Solutions*', intro: SOLUTIONS_INTRO.en },
    list: { buttonLabel: 'Request a Quote' },
    cta: CTA.en,
  },
  id: {
    hero: { eyebrow: 'Solusi & Aplikasi', title: 'Solusi *Kami*', intro: SOLUTIONS_INTRO.id },
    list: { buttonLabel: 'Minta Penawaran' },
    cta: CTA.id,
  },
  zh: {
    hero: { eyebrow: '解决方案与应用', title: '我们的*解决方案*', intro: SOLUTIONS_INTRO.zh },
    list: { buttonLabel: '索取报价' },
    cta: CTA.zh,
  },
}

const CONTACT: PerLocale = {
  en: {
    hero: {
      eyebrow: 'Get in Touch',
      title: 'Contact *Us*',
      intro: 'Ready to discuss your industrial solvent and chemical requirements. Our team is here to assist with inquiries and tailored quotations.',
    },
    form: {
      eyebrow: 'Send an Inquiry',
      title: 'Request a *Quotation*',
      text: 'Fill in the form and our team will reply with a tailored quotation.',
      thankYouTitle: 'Thank you for your inquiry',
      thankYouText: 'Our team will get back to you shortly.',
    },
    office: { eyebrow: 'Our Office', title: 'Visit *Us*' },
  },
  id: {
    hero: {
      eyebrow: 'Mari Terhubung',
      title: 'Hubungi *Kami*',
      intro: 'Siap mendiskusikan kebutuhan bahan kimia dan pelarut industri Anda. Tim kami siap membantu memberikan penawaran dan solusi terbaik.',
    },
    form: {
      eyebrow: 'Kirim Permintaan',
      title: 'Minta *Penawaran*',
      text: 'Isi formulir berikut dan tim kami akan membalas dengan penawaran yang sesuai.',
      thankYouTitle: 'Terima kasih atas permintaan Anda',
      thankYouText: 'Tim kami akan segera menghubungi Anda.',
    },
    office: { eyebrow: 'Kantor Kami', title: 'Kunjungi *Kami*' },
  },
  zh: {
    hero: {
      eyebrow: '与我们联系',
      title: '联系*我们*',
      intro: '随时准备探讨您的工业溶剂及化学品需求。我们的团队竭诚为您提供优质的产品报价与服务方案。',
    },
    form: {
      eyebrow: '发送询价',
      title: '索取*报价*',
      text: '请填写以下表格，我们的团队将为您提供专属报价。',
      thankYouTitle: '感谢您的询价',
      thankYouText: '我们的团队将尽快与您联系。',
    },
    office: { eyebrow: '我们的办公室', title: '欢迎*来访*' },
  },
}

const PRIVACY: PerLocale = { en: { title: 'Privacy Policy' }, id: { title: 'Kebijakan Privasi' }, zh: { title: '隐私政策' } }

const NAVIGATION: PerLocale = {
  en: {
    items: [
      { label: 'Home', link: '/', visible: true },
      { label: 'About Us', link: '/about', visible: true },
      { label: 'Solutions', link: '/solutions', visible: true },
      { label: 'Contact Us', link: '/contact', visible: true },
    ],
    ctaLabel: 'Get a Quote',
    ctaLink: QUOTE_LINK,
    quickLinksTitle: 'Quick Links',
    productsTitle: 'Solutions',
    contactTitle: 'Contact Us',
  },
  id: {
    items: [{ label: 'Beranda' }, { label: 'Tentang Kami' }, { label: 'Solusi & Aplikasi' }, { label: 'Hubungi Kami' }],
    ctaLabel: 'Minta Penawaran',
    quickLinksTitle: 'Tautan Cepat',
    productsTitle: 'Solusi',
    contactTitle: 'Hubungi Kami',
  },
  zh: {
    items: [{ label: '首页' }, { label: '关于我们' }, { label: '解决方案' }, { label: '联系我们' }],
    ctaLabel: '获取报价',
    quickLinksTitle: '快速链接',
    productsTitle: '解决方案',
    contactTitle: '联系我们',
  },
}

const SETTINGS: PerLocale = {
  en: {
    email: 'info@kencanachemillion.co.id',
    officeHours: 'Monday – Friday: 08:00 – 17:00 WIB',
    copyright: '© {year} PT Kencana Chemillion Indonesia. All rights reserved.',
    followLabel: 'Follow Us',
    autoReplySubject: 'We received your inquiry',
    autoReplyBody:
      'Hello {name},\n\nThank you for contacting PT Kencana Chemillion Indonesia. Our team will reply shortly with the information or quotation you asked for.\n\nPT Kencana Chemillion Indonesia',
  },
  id: {
    officeHours: 'Senin – Jumat: 08:00 – 17:00 WIB',
    copyright: '© {year} PT Kencana Chemillion Indonesia. Hak cipta dilindungi.',
    followLabel: 'Ikuti Kami',
    autoReplySubject: 'Permintaan Anda telah kami terima',
    autoReplyBody:
      'Halo {name},\n\nTerima kasih telah menghubungi PT Kencana Chemillion Indonesia. Tim kami akan segera membalas dengan informasi atau penawaran yang Anda minta.\n\nPT Kencana Chemillion Indonesia',
  },
  zh: {
    officeHours: '周一至周五：08:00 – 17:00（印尼西部时间）',
    copyright: '© {year} PT Kencana Chemillion Indonesia 版权所有。',
    followLabel: '关注我们',
    autoReplySubject: '我们已收到您的询价',
    autoReplyBody:
      '{name} 您好，\n\n感谢您联系 PT Kencana Chemillion Indonesia。我们的团队将尽快回复您所需的信息或报价。\n\nPT Kencana Chemillion Indonesia',
  },
}

/** The three solutions, in display order. */
const SOLUTIONS: { icon: ProductCategory['icon']; copy: PerLocale }[] = [
  {
    icon: 'flask',
    copy: {
      en: {
        name: 'Printing Ink Solvents',
        summary: 'Specially formulated solvents for paper printing, packaging plastics, and industrial bags.',
        applications: 'Paper printing, flexible plastic packaging, and industrial woven bags.',
        benefits: 'Optimizes ink drying time, maintains color stability, and ensures sharp print results across substrates.',
      },
      id: {
        name: 'Pelarut Tinta Cetak',
        summary: 'Pelarut formulasi khusus untuk media cetak kertas, plastik kemasan, hingga karung industri.',
        applications: 'Cetak kertas, kemasan fleksibel (flexible packaging plastik), dan karung industri.',
        benefits: 'Mengoptimalkan daya kering tinta, menjaga stabilitas warna, dan menghasilkan cetakan yang tajam pada berbagai media.',
      },
      zh: {
        name: '印刷油墨溶剂',
        summary: '专为纸张印刷、塑料包装及工业编织袋设计的专用溶剂。',
        applications: '纸张印刷、塑料软包装 (Flexible Packaging) 及工业编织袋。',
        benefits: '优化油墨干燥速度，保持色彩稳定性，确保在各种材质上均能清晰印刷。',
      },
    },
  },
  {
    icon: 'diamond',
    copy: {
      en: {
        name: 'Paint & Coating Solvents',
        summary: 'Optimal diluent and solvent solutions for furniture, automotive, and general coating applications.',
        applications: 'Wood and rattan furniture finishing, automotive paints, and general industrial coatings.',
        benefits: 'Delivers ideal evaporation rates, high solvency power, and maximum gloss output.',
      },
      id: {
        name: 'Pelarut Cat & Coating',
        summary: 'Solusi pengencer & pelarut optimal untuk industri furniture, otomotif, dan coating umum.',
        applications: 'Industri finishing furniture (kayu/rotan), pengecatan otomotif, serta coating industri umum.',
        benefits: 'Memberikan tingkat penguapan yang pas, daya kelarutan tinggi, dan hasil akhir kilap (gloss) yang maksimal.',
      },
      zh: {
        name: '涂料与漆业溶剂',
        summary: '适用于家具、汽车及通用涂料的高效稀释与溶剂方案。',
        applications: '木器与藤制家具涂装、汽车喷漆及通用工业涂料。',
        benefits: '具有理想的蒸发速率、高溶解能力以及出色的光泽度表现。',
      },
    },
  },
  {
    icon: 'factory',
    copy: {
      en: {
        name: 'Technical Grade Chemicals',
        summary: 'High-standard technical grade chemical raw materials for manufacturing processes.',
        applications: 'Essential chemical raw materials for general manufacturing processing.',
        benefits: 'Verified technical specifications to maintain operating efficiency and production continuity.',
      },
      id: {
        name: 'Bahan Kimia Technical Grade',
        summary: 'Pasokan bahan baku kimia berstandar tinggi untuk kebutuhan operasional manufaktur.',
        applications: 'Bahan baku dan bahan pembantu proses produksi untuk berbagai sektor manufaktur umum.',
        benefits: 'Spesifikasi teknis yang teruji untuk menjaga efisiensi dan kontinuitas proses produksi pabrik Anda.',
      },
      zh: {
        name: '工业级化学原料',
        summary: '为制造业提供符合高标准的工业级化学原料。',
        applications: '通用制造业生产过程中的基础化学原料与助剂。',
        benefits: '经过严格测试的技术指标，保障工厂生产的效率与连续性。',
      },
    },
  },
]

const LOCALES: Locale[] = ['en', 'id', 'zh']
const SYSTEM_KEYS = new Set(['id', 'createdAt', 'updatedAt', 'globalType', '_status'])

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

/**
 * Lays the copy over what is stored: arrays are matched row by row and keep their row ids (rows are shared across
 * languages, only their text is per language), rich text is replaced whole, and every field the copy leaves out
 * keeps its stored value.
 */
const overlay = (stored: unknown, copy: unknown): unknown => {
  if (Array.isArray(copy)) {
    const rows = Array.isArray(stored) ? stored : []
    return copy.map((row, i) => overlay(rows[i], row))
  }
  if (isPlainObject(copy) && !('root' in copy)) {
    const out: Record<string, unknown> = isPlainObject(stored) ? { ...stored } : {}
    for (const [key, value] of Object.entries(copy)) out[key] = overlay(out[key], value)
    return out
  }
  return copy
}

/** Labels the draft does not cover but the site shows, translated so list rows are not left half English. */
const TERMS: Record<Exclude<Locale, 'en'>, Record<string, string>> = {
  id: { 'Years Experience': 'Tahun Pengalaman', Products: 'Produk', 'Trusted Clients': 'Klien Terpercaya' },
  zh: { 'Years Experience': '年行业经验', Products: '产品', 'Trusted Clients': '信赖客户' },
}

/**
 * Rows in a list are shared by all languages, and the dashboard requires some of their text (a stat's label,
 * a certification's name) in every language. Where a row has no text yet in this language it gets the English
 * text, translated when it is a known label. Fields outside lists stay empty and keep showing English.
 */
const fillRowsFromEnglish = (mine: unknown, en: unknown, locale: Exclude<Locale, 'en'>, inRow = false): unknown => {
  if (Array.isArray(en)) {
    const rows = Array.isArray(mine) ? mine : []
    return en.map((row, i) => fillRowsFromEnglish(rows[i], row, locale, true))
  }
  if (isPlainObject(en) && !('root' in en)) {
    const out: Record<string, unknown> = isPlainObject(mine) ? { ...mine } : {}
    for (const [key, value] of Object.entries(en)) out[key] = fillRowsFromEnglish(out[key], value, locale, inRow)
    return out
  }
  if (inRow && (mine === null || mine === undefined) && en !== null && en !== undefined) {
    return typeof en === 'string' ? (TERMS[locale][en] ?? en) : en
  }
  return mine
}

const withoutSystemKeys = (doc: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(doc).filter(([key]) => !SYSTEM_KEYS.has(key)))

type Req = Partial<PayloadRequest> | undefined

/** English first, so new array rows exist before their Indonesian and Chinese text is added. */
const writeGlobal = async (payload: Payload, req: Req, slug: GlobalSlug, copy: PerLocale, extra?: Copy) => {
  for (const locale of LOCALES) {
    const read = async (l: Locale) =>
      withoutSystemKeys((await payload.findGlobal({ slug, locale: l, fallbackLocale: false, depth: 0, req })) as unknown as Record<string, unknown>)
    const stored = await read(locale)
    const base = locale === 'en' ? stored : fillRowsFromEnglish(stored, await read('en'), locale)
    const data = overlay(base, { ...(locale === 'en' ? extra : {}), ...copy[locale] }) as Record<string, unknown>
    const hasDrafts = Boolean(payload.globals.config.find((g) => g.slug === slug)?.versions?.drafts)
    // No fallback on write either, or Payload would copy the English text into every field the copy leaves empty.
    await payload.updateGlobal({ slug, locale, fallbackLocale: false, req, data: hasDrafts ? { ...data, _status: 'published' } : data, context: { disableRevalidate: true } })
  }
}

/** The first three solutions get the copy; any further ones are hidden (not deleted) so nothing is lost. */
const writeSolutions = async (payload: Payload, req: Req) => {
  const { docs } = await payload.find({ collection: 'product-categories', sort: '_order', limit: 100, depth: 0, locale: 'en', req })
  for (const [i, solution] of SOLUTIONS.entries()) {
    let doc = docs[i]
    if (!doc) {
      const image = docs[0]?.image ?? (await payload.find({ collection: 'media', limit: 1, depth: 0, locale: 'en', req })).docs[0]?.id
      if (!image) {
        payload.logger.warn(`Solutions: no image to use, so "${solution.copy.en.name}" was not created. Add it in the dashboard.`)
        continue
      }
      doc = await payload.create({
        collection: 'product-categories',
        locale: 'en',
        req,
        data: { ...(solution.copy.en as { name: string }), image: typeof image === 'object' ? image.id : image, icon: 'flask', _status: 'published' },
      })
    }
    for (const locale of LOCALES) {
      await payload.update({
        collection: 'product-categories',
        id: doc.id,
        locale,
        fallbackLocale: false,
        req,
        data: { ...solution.copy[locale], ...(locale === 'en' ? { icon: solution.icon, hidden: false, showOnHome: true } : {}), _status: 'published' },
        context: { disableRevalidate: true },
      })
    }
  }
  for (const extra of docs.slice(SOLUTIONS.length)) {
    if (!extra.hidden) {
      await payload.update({ collection: 'product-categories', id: extra.id, locale: 'en', req, data: { hidden: true }, context: { disableRevalidate: true } })
    }
  }
}

export const applyWebsiteCopy = async (payload: Payload, req?: Req) => {
  await writeSolutions(payload, req)

  const home = (await payload.findGlobal({ slug: 'home-page', depth: 0, locale: 'en', req })) as unknown as { why?: { image?: unknown } }
  const solutionsPage = (await payload.findGlobal({ slug: 'solutions-page', depth: 0, locale: 'en', req })) as unknown as { hero?: { image?: unknown } }
  // The new Solutions page borrows the Home page's plant photo until the team picks its own.
  const solutionsHeroImage = solutionsPage.hero?.image ? undefined : home.why?.image

  await writeGlobal(payload, req, 'home-page', HOME)
  await writeGlobal(payload, req, 'about-page', ABOUT)
  await writeGlobal(payload, req, 'solutions-page', SOLUTIONS_PAGE, solutionsHeroImage ? { hero: { image: solutionsHeroImage } } : undefined)
  await writeGlobal(payload, req, 'contact-page', CONTACT)
  await writeGlobal(payload, req, 'privacy-page', PRIVACY)
  await writeGlobal(payload, req, 'navigation', NAVIGATION)
  await writeGlobal(payload, req, 'site-settings', SETTINGS)
  payload.logger.info('Website copy: wrote English, Indonesian and Chinese text for every page.')
}
