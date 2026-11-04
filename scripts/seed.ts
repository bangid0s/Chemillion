/**
 * Fills an empty database with the mockup's structure and lorem ipsum, so every section can be edited from the dashboard.
 * Run with `npm run seed`. Refuses to run if users already exist. Delete data/ and media/ to start over.
 */
import path from 'path'
import { getPayload } from 'payload'
import config from '../src/payload.config'

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

  const categories = []
  const categoryImages: number[] = []
  for (const [name, file, alt, icon] of categorySeeds) {
    const media = (await image(`${file}.jpg`, alt)) as number
    categoryImages.push(media)
    categories.push(
      await payload.create({
        collection: 'product-categories',
        data: { name, slug: file, description: LOREM, image: media, icon, showOnHome: true, _status: 'published' },
      }),
    )
  }

  payload.logger.info('Creating products…')
  for (const [c, category] of categories.entries()) {
    for (let i = 1; i <= 4; i++) {
      const name = `${category.name.replace(/s$/, '').split(' ')[0]} Sample Product ${i}`
      await payload.create({
        collection: 'products',
        data: {
          name,
          category: category.id,
          casNumber: `000-0${c}-${i}`,
          grade: 'Lorem grade',
          synonyms: 'Lorem ipsum, dolor sit amet',
          shortDescription: LOREM_SHORT,
          description: rich(LOREM_LONG, LOREM_MORE),
          gallery: [{ image: categoryImages[c] }, { image: categoryImages[(c + 1) % categoryImages.length] }],
          specs: [
            { property: 'Lorem ipsum', value: '00.0', unit: '%' },
            { property: 'Dolor sit', value: '0.00', unit: 'g/cm³' },
            { property: 'Amet consectetur', value: '000', unit: '°C' },
            { property: 'Adipiscing elit', value: 'Lorem', unit: '' },
          ],
          applications: [{ label: 'Lorem' }, { label: 'Ipsum' }, { label: 'Dolor' }],
          packaging: [{ label: '25 kg lorem' }, { label: '200 kg ipsum' }],
          _status: 'published',
        },
      })
    }
  }

  payload.logger.info('Creating partners…')
  const types = await Promise.all(['Principals', 'Suppliers', 'Clients', 'Distributors'].map((name) => payload.create({ collection: 'partner-types', data: { name } })))
  for (let i = 1; i <= 8; i++) {
    const logo = await image(`partner-${i}.png`, `Partner ${i} logo placeholder`)
    await payload.create({
      collection: 'partners',
      data: { name: `Partner ${i}`, logo, type: types[(i - 1) % types.length].id, description: 'Lorem ipsum dolor sit amet.', visible: true },
    })
  }

  payload.logger.info('Creating news…')
  for (let i = 1; i <= 10; i++) {
    const published = new Date()
    published.setDate(published.getDate() - i * 9)
    await payload.create({
      collection: 'news',
      data: {
        title: `Lorem ipsum dolor sit amet consectetur ${i}`,
        excerpt: LOREM_SHORT,
        cover: categoryImages[i % categoryImages.length],
        body: rich(LOREM_LONG, '## Lorem ipsum dolor', LOREM_MORE, LOREM_LONG),
        publishedAt: published.toISOString(),
        author: 'Lorem Ipsum',
        category: i % 2 ? 'Lorem' : 'Ipsum',
        tags: ['lorem', 'ipsum'],
        _status: 'published',
      },
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
        primaryLink: '/products',
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
        linkLabel: 'View All Products',
        linkLink: '/products',
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
      showPartnersStrip: false,
      partnersStripTitle: 'Our Partners',
      showLatestNews: false,
      latestNewsTitle: 'Latest News',
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
    slug: 'products-page',
    data: {
      _status: 'published',
      hero: { eyebrow: 'Our Products', title: 'Product *Categories*', intro: LOREM, image: categoryImages[0] },
      labels: { productCountSingular: 'product', productCountPlural: 'products', requestQuote: 'Request a Quote' },
      cta,
    },
  })

  await payload.updateGlobal({
    slug: 'partners-page',
    data: {
      _status: 'published',
      hero: { eyebrow: 'Our Network', title: 'Our *Partners*', intro: LOREM, image: categoryImages[4] },
      become: {
        eyebrow: 'Work With Us',
        title: 'Become a Partner',
        text: LOREM,
        buttonLabel: 'Become a Partner',
        image: ctaImage,
      },
    },
  })

  await payload.updateGlobal({
    slug: 'news-page',
    data: {
      _status: 'published',
      hero: { eyebrow: 'Latest Updates', title: 'News &\n*Updates*', intro: LOREM, image: categoryImages[3] },
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
        { label: 'Products', link: '/products', visible: true },
        { label: 'Partners', link: '/partners', visible: true },
        { label: 'News', link: '/news', visible: true },
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
      address: '123 Industrial Road\nJakarta, Indonesia',
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
      inquiryTypes: [{ label: 'Product quote' }, { label: 'General' }, { label: 'Partnership' }, { label: 'Other' }],
      autoReplySubject: 'We received your inquiry',
      autoReplyBody: 'Hello {name},\n\nThank you for contacting Chemillion. Our team will reply shortly.\n\nChemillion',
      retentionMonths: 24,
    },
  })

  payload.logger.info('Seed complete.')
}

await seed()
process.exit(0)
