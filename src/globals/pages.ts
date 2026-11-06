import type { Field, GlobalConfig } from 'payload'
import { isStaff } from '../access'
import { buttonFields, ctaBannerGroup, eyebrowField, headlineField, iconField, imageField, statsField } from '../fields/common'
import { richText } from '../fields/richText'
import { revalidateGlobal } from '../hooks/revalidate'
import { previewUrl } from '../lib/preview'

/** Structured fields per section, not a free page builder, so the design cannot be broken. */
const page = (slug: string, label: string, path: string, tabs: { label: string; name?: string; fields: Field[] }[]): GlobalConfig => ({
  slug,
  label,
  admin: {
    group: 'Pages',
    livePreview: { url: ({ locale }) => previewUrl(path, locale) },
    preview: (_doc, { locale }) => previewUrl(path, locale),
  },
  // The site reads these server-side with full access; public REST reads would expose `?draft=true` content.
  access: { read: isStaff, update: isStaff },
  versions: { max: 20, drafts: { autosave: { interval: 1500 } } },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [{ type: 'tabs', tabs: tabs as never }],
})

const pageHero = (): Field[] => [
  eyebrowField(),
  headlineField('title', 'Page title: 2–6 words.'),
  { name: 'intro', type: 'textarea', localized: true, admin: { description: '1–2 sentences.' } },
  imageField('image', 'Recommended 1920 px wide or more. Cut by the diagonal mask automatically.'),
]

const HomePage = page('home-page', 'Home', '/', [
  {
    label: 'Hero',
    name: 'hero',
    fields: [
      eyebrowField(),
      headlineField('title', 'Hero headline: 4–8 words.'),
      { name: 'text', type: 'textarea', localized: true, admin: { description: '2–3 lines, about 20–30 words.' } },
      ...buttonFields('primary', 'Red button'),
      ...buttonFields('secondary', 'Outline button'),
      imageField('image', 'Recommended 1920 px wide or more. Set a focal point so the mask keeps the subject in frame.'),
      {
        name: 'badgeLines',
        type: 'array',
        label: 'Floating badge lines',
        maxRows: 4,
        labels: { singular: 'Line', plural: 'Lines' },
        fields: [{ name: 'text', type: 'text', required: true, localized: true }],
      },
      iconField('badgeIcon'),
    ],
  },
  {
    label: 'Value props',
    name: 'valueProps',
    fields: [
      {
        name: 'items',
        type: 'array',
        maxRows: 3,
        labels: { singular: 'Card', plural: 'Cards' },
        admin: { description: 'Drag to reorder.' },
        fields: [
          iconField(),
          { name: 'title', type: 'text', required: true, localized: true, admin: { description: '1–3 words.' } },
          { name: 'text', type: 'textarea', localized: true, admin: { description: 'About 8–12 words.' } },
        ],
      },
    ],
  },
  {
    label: 'Solutions',
    name: 'categories',
    fields: [
      eyebrowField(),
      headlineField('title', 'Section title: 2–4 words.'),
      { name: 'intro', type: 'textarea', localized: true },
      ...buttonFields('link', 'Link'),
      {
        name: 'note',
        type: 'ui',
        admin: { components: { Field: '/components/admin/CategoriesNote#CategoriesNote' } },
      },
    ],
  },
  {
    label: 'Why Chemillion',
    name: 'why',
    fields: [
      eyebrowField(),
      headlineField('title', 'Section title: 4–8 words.'),
      { name: 'text', type: 'textarea', localized: true, admin: { description: '3–4 lines.' } },
      ...buttonFields('button', 'Button'),
      imageField('image', 'Recommended 1600 px wide or more.'),
      statsField(),
    ],
  },
  { label: 'CTA banner', fields: [ctaBannerGroup()] },
])

const AboutPage = page('about-page', 'About Us', '/about', [
  { label: 'Hero', name: 'hero', fields: pageHero() },
  {
    label: 'Story',
    name: 'story',
    fields: [
      eyebrowField(),
      headlineField('title', 'Section title: 2–6 words.'),
      { name: 'body', type: 'richText', localized: true, editor: richText() },
      imageField('image', 'Recommended 1200 px wide or more.'),
    ],
  },
  {
    label: 'Vision & mission',
    name: 'visionMission',
    fields: [
      eyebrowField(),
      headlineField('title', 'Section title: 2–6 words.'),
      {
        name: 'cards',
        type: 'array',
        maxRows: 2,
        labels: { singular: 'Card', plural: 'Cards' },
        fields: [
          iconField(),
          { name: 'title', type: 'text', required: true, localized: true },
          { name: 'text', type: 'textarea', localized: true },
        ],
      },
    ],
  },
  {
    label: 'Values',
    name: 'values',
    fields: [
      eyebrowField(),
      headlineField('title', 'Section title: 2–6 words.'),
      {
        name: 'items',
        type: 'array',
        labels: { singular: 'Value', plural: 'Values' },
        fields: [
          iconField(),
          { name: 'title', type: 'text', required: true, localized: true },
          { name: 'text', type: 'textarea', localized: true },
        ],
      },
    ],
  },
  {
    label: 'Certifications',
    name: 'certifications',
    fields: [
      eyebrowField(),
      headlineField('title', 'Section title: 2–6 words.'),
      {
        name: 'items',
        type: 'array',
        labels: { singular: 'Certification', plural: 'Certifications' },
        fields: [
          { name: 'logo', type: 'upload', relationTo: 'media' },
          { name: 'name', type: 'text', required: true, localized: true },
          { name: 'text', type: 'textarea', localized: true },
          { name: 'pdf', type: 'upload', relationTo: 'media', label: 'Certificate PDF (optional)' },
        ],
      },
    ],
  },
  {
    label: 'Facilities',
    name: 'facilities',
    fields: [
      eyebrowField(),
      headlineField('title', 'Section title: 2–6 words.'),
      {
        name: 'images',
        type: 'array',
        labels: { singular: 'Image', plural: 'Images' },
        fields: [
          { name: 'image', type: 'upload', relationTo: 'media', required: true },
          { name: 'caption', type: 'text', localized: true },
        ],
      },
    ],
  },
  { label: 'Stats', name: 'statsBlock', fields: [statsField()] },
  { label: 'CTA banner', fields: [ctaBannerGroup()] },
])

const SolutionsPage = page('solutions-page', 'Solutions', '/solutions', [
  { label: 'Hero', name: 'hero', fields: pageHero() },
  {
    label: 'Solutions',
    name: 'list',
    fields: [
      {
        name: 'note',
        type: 'ui',
        admin: { components: { Field: '/components/admin/CategoriesNote#CategoriesNote' } },
      },
      { name: 'buttonLabel', type: 'text', localized: true, label: 'Quote button label', defaultValue: 'Request a Quote' },
    ],
  },
  { label: 'CTA banner', fields: [ctaBannerGroup()] },
])

const ContactPage = page('contact-page', 'Contact', '/contact', [
  { label: 'Hero', name: 'hero', fields: pageHero() },
  {
    label: 'Form',
    name: 'form',
    fields: [
      eyebrowField(),
      headlineField('title', 'Form title: 2–6 words.'),
      { name: 'text', type: 'textarea', localized: true },
      { name: 'thankYouTitle', type: 'text', localized: true },
      { name: 'thankYouText', type: 'textarea', localized: true },
    ],
  },
  {
    label: 'Office',
    name: 'office',
    fields: [
      eyebrowField(),
      headlineField('title', 'Section title: 2–6 words.'),
      imageField('mapImage', 'Static map image. Google Maps only loads after a visitor clicks it.'),
    ],
  },
])

const PrivacyPage = page('privacy-page', 'Privacy Policy', '/privacy', [
  {
    label: 'Content',
    fields: [
      { name: 'title', type: 'text', required: true, localized: true },
      { name: 'body', type: 'richText', localized: true, editor: richText() },
    ],
  },
])

export const pageGlobals: GlobalConfig[] = [HomePage, AboutPage, SolutionsPage, ContactPage, PrivacyPage]
