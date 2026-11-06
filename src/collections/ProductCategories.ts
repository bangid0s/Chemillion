import type { CollectionConfig } from 'payload'
import { isStaff, publishedOrStaff } from '../access'
import { iconField, imageField } from '../fields/common'
import { revalidateAfterDelete, revalidateCollection } from '../hooks/revalidate'
import { previewUrl } from '../lib/preview'

/**
 * The solutions: the cards in the Home page's solutions section, the Solutions page and the footer's list.
 * The slug stays `product-categories` so existing data keeps its tables.
 */
export const ProductCategories: CollectionConfig = {
  slug: 'product-categories',
  labels: { singular: 'Solution', plural: 'Solutions' },
  orderable: true,
  admin: {
    group: 'Content',
    useAsTitle: 'name',
    defaultColumns: ['name', 'showOnHome', 'hidden', '_status'],
    description:
      'Drag rows to reorder. Each solution is a card on the Home page, a section on the Solutions page and a link in the footer.',
    livePreview: { url: ({ locale }) => previewUrl('/solutions', locale) },
    preview: (_doc, { locale }) => previewUrl('/solutions', locale),
  },
  access: { read: publishedOrStaff, create: isStaff, update: isStaff, delete: isStaff },
  versions: { maxPerDoc: 20, drafts: { autosave: { interval: 1500 } } },
  hooks: {
    afterChange: [revalidateCollection],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true, admin: { description: '2–4 words.' } },
    {
      name: 'summary',
      type: 'textarea',
      localized: true,
      admin: { description: 'One sentence under the name on the Home page card.' },
    },
    {
      name: 'applications',
      type: 'textarea',
      localized: true,
      admin: { description: 'Solutions page: where it is used. One or two sentences.' },
    },
    {
      name: 'benefits',
      type: 'textarea',
      localized: true,
      admin: { description: 'Solutions page: what it does for the customer. One or two sentences.' },
    },
    imageField('image', 'Card and Solutions page image. Recommended 1200 px wide or more.', true),
    iconField(),
    {
      name: 'showOnHome',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show on Home',
      admin: { position: 'sidebar', description: 'The Home grid shows up to 5 categories.' },
    },
    { name: 'hidden', type: 'checkbox', label: 'Hide from site', admin: { position: 'sidebar' } },
  ],
}
