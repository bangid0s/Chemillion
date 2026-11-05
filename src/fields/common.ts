import type { Field, GroupField, SelectField } from 'payload'

export const iconOptions = [
  'diamond',
  'shield',
  'leaf',
  'flask',
  'award',
  'users',
  'globe',
  'factory',
  'target',
  'eye',
  'check',
  'truck',
] as const

export const iconField = (name = 'icon'): SelectField => ({
  name,
  type: 'select',
  required: true,
  defaultValue: 'diamond',
  options: iconOptions.map((value) => ({ value, label: value[0].toUpperCase() + value.slice(1) })),
  admin: { description: 'Picked from the site’s icon set.' },
})

export const HIGHLIGHT_HINT = 'Wrap words in *asterisks* to show them in teal. Press Enter for a new line.'

export const headlineField = (name: string, hint: string, required = true): Field => ({
  name,
  type: 'textarea',
  required,
  localized: true,
  admin: { rows: 2, description: `${hint} ${HIGHLIGHT_HINT}` },
})

export const eyebrowField = (hint = 'Small spaced-caps label above the title, 2–5 words.'): Field => ({
  name: 'eyebrow',
  type: 'text',
  localized: true,
  admin: { description: hint },
})

export const imageField = (name: string, description: string, required = false): Field => ({
  name,
  type: 'upload',
  relationTo: 'media',
  required,
  admin: { description },
})

export const buttonFields = (prefix: string, label: string): Field[] => [
  {
    type: 'row',
    fields: [
      { name: `${prefix}Label`, type: 'text', label: `${label} label`, localized: true, admin: { width: '50%' } },
      {
        name: `${prefix}Link`,
        type: 'text',
        label: `${label} link`,
        admin: { width: '50%', description: 'A page path such as /about or /contact?origin=quote#inquiry, or a full URL.' },
      },
    ],
  },
]

export const ctaBannerGroup = (name = 'cta'): GroupField => ({
  name,
  type: 'group',
  label: 'CTA banner',
  fields: [
    eyebrowField(),
    headlineField('title', 'Banner title: 6–10 words.'),
    { name: 'text', type: 'textarea', localized: true, admin: { description: 'One or two short sentences.' } },
    ...buttonFields('button', 'Button'),
    imageField('image', 'Shown on the left, cut by the diagonal. Recommended 800 px wide or more.'),
  ],
})

export const statsField = (name = 'stats'): Field => ({
  name,
  type: 'array',
  labels: { singular: 'Stat', plural: 'Stats' },
  maxRows: 4,
  admin: { description: 'Numbers count up when scrolled into view.' },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'number', type: 'number', required: true, admin: { width: '33%' } },
        { name: 'suffix', type: 'text', admin: { width: '33%', description: 'For example +' } },
        { name: 'label', type: 'text', required: true, localized: true, admin: { width: '34%' } },
      ],
    },
  ],
})
