/**
 * Fills an empty database with the mockup's structure and lorem ipsum, so every section can be edited from the dashboard.
 * Run with `npm run seed`. Refuses to run if users already exist. Delete data/ and media/ to start over.
 */
import path from 'path'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import { ADDRESS, MAP_EMBED_URL } from '../src/migrations/20261104_090000_company_address'

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
const LOREM_SHORT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
const LOREM_LONG = `${LOREM} Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
const LOREM_MORE = `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`

/** Minimal Lexical document: strings become paragraphs, `## x` a heading. */
const rich = (...blocks: string[]) => ({
  root: {
    type: 'root',
    format: '' as const,
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: blocks.map((block) => {
      const heading = block.startsWith('## ')
      return {
        type: heading ? 'heading' : 'paragraph',
        ...(heading ? { tag: 'h2' } : { textFormat: 0, textStyle: '' }),
        format: '' as const,
        indent: 0,
        version: 1,
        direction: 'ltr' as const,
        children: [
          {
            type: 'text',
            text: heading ? block.slice(3) : block,
            format: 0,
            mode: 'normal',
            style: '',
            detail: 0,
            version: 1,
          },
        ],
      }
    }),
  },
})

const seed = async () => {
  const email = process.env.SEED_ADMIN_EMAIL
  const password = process.env.SEED_ADMIN_PASSWORD
  // Vercel runs this on every build; without a seed login there it just moves on.
  if ((!email || !password) && process.env.VERCEL) return console.log('No SEED_ADMIN_* set, so nothing was seeded.')
  if (!email || !password) throw new Error('Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in .env first.')

  const payload = await getPayload({ config })

  const existing = await payload.count({ collection: 'users' })
  if (existing.totalDocs > 0) {
    payload.logger.info('Users already exist, so nothing was seeded.')
    return
  }

  await payload.create({ collection: 'users', data: { name: 'Site Admin', email, password, role: 'admin', active: true } })
  if (process.env.SEED_EDITOR_EMAIL && process.env.SEED_EDITOR_PASSWORD) {
    await payload.create({
      collection: 'users',
      data: { name: 'Marketing Editor', email: process.env.SEED_EDITOR_EMAIL, password: process.env.SEED_EDITOR_PASSWORD, role: 'editor', active: true },
    })
  }

  const image = async (file: string, alt: string) => {
    const doc = await payload.create({
      collection: 'media',
      data: { alt },
      filePath: path.resolve(process.cwd(), 'seed', 'images', file),
    })
    return doc.id
  }

  payload.logger.info('Uploading placeholder images…')
  const hero = await image('hero.jpg', 'Laboratory flasks holding red and blue liquids, with a gloved hand holding a pipette')
  const plant = await image('plant.jpg', 'Stainless steel storage tanks and yellow walkways at a chemical plant')
  const facility = await image('facility.jpg', 'Close view of stainless steel tanks at a chemical plant')
  const ctaImage = await image('cta.jpg', 'Glass laboratory flasks filled with blue liquid')
  const mapImage = await image('map.png', 'Map showing the Chemillion office location')

  const categorySeeds = [
    ['Industrial Chemicals', 'industrial-chemicals', 'Blue liquid in laboratory flasks', 'factory'],
    ['Specialty Chemicals', 'specialty-chemicals', 'Red liquid in glass beakers', 'flask'],
    ['Raw Materials', 'raw-materials', 'White powder in a glass dish', 'diamond'],
    ['Laboratory Reagents', 'laboratory-reagents', 'Teal liquid in rows of test tubes', 'target'],
    ['Other Products', 'other-products', 'Blue chemical drums stacked on warehouse racks', 'truck'],
  ] as const

  const categoryImages: number[] = []
  for (const [name, file, alt, icon] of categorySeeds) {
    const media = (await image(`${file}.jpg`, alt)) as number
    categoryImages.push(media)
    await payload.create({
      collection: 'product-categories',
      data: { name, image: media, icon, showOnHome: true, _status: 'published' },
    })
  }

  const cta = {
    eyebrow: 'Get Started',
    title: 'Let’s Find the Right\nChemical Solution for You',
    text: LOREM,
    buttonLabel: 'Contact Our Team',
    buttonLink: '/contact',
    image: ctaImage,
  }

  payload.logger.info('Filling pages…')
  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      _status: 'published',
      hero: {
        eyebrow: 'Chemicals for a Brighter Tomorrow',
        title: 'Reliable\nChemicals\n*for a Better\nTomorrow*',
        text: LOREM,
        primaryLabel: 'Explore Products',
        primaryLink: '/#products',
        secondaryLabel: 'About Chemillion',
        secondaryLink: '/about',
        image: hero,
        badgeLines: [{ text: 'Quality' }, { text: 'Safety' }, { text: 'Sustainability' }],
        badgeIcon: 'flask',
      },
      valueProps: {
        items: [
          { icon: 'diamond', title: 'High Quality', text: LOREM_SHORT },
          { icon: 'shield', title: 'Trusted Supply', text: LOREM_SHORT },
          { icon: 'leaf', title: 'Sustainable Solutions', text: LOREM_SHORT },
        ],
      },
      categories: {
        eyebrow: 'Our Products',
        title: 'Product *Categories*',
        intro: LOREM,
        linkLabel: 'Request a Quote',
        linkLink: '/contact?origin=quote#inquiry',
      },
      why: {
        eyebrow: 'Why Chemillion',
        title: 'Your Partner\nin *Chemical Solutions*',
        text: LOREM_LONG,
        buttonLabel: 'Learn More',
        buttonLink: '/about',
        image: plant,
        stats: [
          { number: 10, suffix: '+', label: 'Years Experience' },
          { number: 500, suffix: '+', label: 'Products' },
          { number: 100, suffix: '+', label: 'Trusted Clients' },
        ],
      },
      cta,
    },
  })

  const certs = await Promise.all([1, 2, 3].map((i) => image(`certification-${i}.png`, `Certification ${i} placeholder`)))
  await payload.updateGlobal({
    slug: 'about-page',
    data: {
      _status: 'published',
      hero: { eyebrow: 'About Chemillion', title: 'Your Partner in *Chemical Solutions*', intro: LOREM, image: facility },
      story: { eyebrow: 'Our Story', title: 'Lorem Ipsum *Dolor Sit*', body: rich(LOREM_LONG, LOREM_MORE), image: categoryImages[1] },
      visionMission: {
        eyebrow: 'Vision & Mission',
        title: 'What *Drives* Us',
        cards: [
          { icon: 'eye', title: 'Vision', text: LOREM_LONG },
          { icon: 'target', title: 'Mission', text: LOREM_LONG },
        ],
      },
      values: {
        eyebrow: 'Our Values',
        title: 'What We *Stand For*',
        items: [
          { icon: 'diamond', title: 'Quality', text: LOREM },
          { icon: 'shield', title: 'Safety', text: LOREM },
          { icon: 'leaf', title: 'Sustainability', text: LOREM },
        ],
      },
      certifications: {
        eyebrow: 'Certifications',
        title: 'Compliance & *Certifications*',
        items: certs.map((logo, i) => ({ logo, name: `Certification ${i + 1}`, text: LOREM_SHORT })),
      },
      facilities: {
        eyebrow: 'Facilities',
        title: 'Our *Facilities*',
        images: [
          { image: facility, caption: 'Lorem ipsum dolor' },
          { image: categoryImages[4], caption: 'Sit amet consectetur' },
          { image: categoryImages[3], caption: 'Adipiscing elit' },
        ],
      },
      statsBlock: {
        stats: [
          { number: 10, suffix: '+', label: 'Years Experience' },
          { number: 500, suffix: '+', label: 'Products' },
          { number: 100, suffix: '+', label: 'Trusted Clients' },
        ],
      },
      cta,
    },
  })

  await payload.updateGlobal({
    slug: 'contact-page',
    data: {
      _status: 'published',
      hero: { eyebrow: 'Get in Touch', title: 'Contact *Our Team*', intro: LOREM, image: categoryImages[1] },
      form: {
        eyebrow: 'Send an Inquiry',
        title: 'How Can We *Help?*',
        text: LOREM_SHORT,
        thankYouTitle: 'Thank you for your inquiry',
        thankYouText: 'Our team will get back to you shortly.',
      },
      office: { eyebrow: 'Our Office', title: 'Visit *Us*', mapImage },
    },
  })

  await payload.updateGlobal({
    slug: 'privacy-page',
    data: {
      _status: 'published',
      title: 'Privacy Policy',
      body: rich(LOREM_LONG, '## Lorem ipsum', LOREM_MORE, '## Dolor sit amet', LOREM_LONG),
    },
  })

  await payload.updateGlobal({
    slug: 'navigation',
    data: {
      items: [
        { label: 'About Us', link: '/about', visible: true },
        { label: 'Contact', link: '/contact', visible: true },
      ],
      ctaLabel: 'Get a Quote',
      ctaLink: '/contact?origin=quote#inquiry',
      quickLinksTitle: 'Quick Links',
      productsTitle: 'Products',
      contactTitle: 'Contact Us',
    },
  })

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      companyName: 'Chemillion',
      address: ADDRESS,
      mapEmbedUrl: MAP_EMBED_URL,
      phone: '+62 21 1234 5678',
      email: 'info@chemillion.com',
      officeHours: 'Monday to Friday, 08:00 to 17:00',
      socialLinks: [
        { platform: 'linkedin', url: 'https://www.linkedin.com/' },
        { platform: 'instagram', url: 'https://www.instagram.com/' },
        { platform: 'youtube', url: 'https://www.youtube.com/' },
      ],
      copyright: '© {year} Chemillion. All rights reserved.',
      followLabel: 'Follow Us',
      inquiryTypes: [{ label: 'Product quote' }, { label: 'General' }, { label: 'Other' }],
      autoReplySubject: 'We received your inquiry',
      autoReplyBody: 'Hello {name},\n\nThank you for contacting Chemillion. Our team will reply shortly.\n\nChemillion',
      retentionMonths: 24,
    },
  })

  payload.logger.info('Seed complete.')
}

await seed()
process.exit(0)
