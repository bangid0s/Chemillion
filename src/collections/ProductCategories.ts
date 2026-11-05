import type { CollectionConfig } from 'payload'
import { isStaff, publishedOrStaff } from '../access'
import { iconField, imageField } from '../fields/common'
import { revalidateAfterDelete, revalidateCollection } from '../hooks/revalidate'
import { previewUrl } from '../lib/preview'

/** The cards in the Home page's product section and the footer's product list. There are no product pages. */
export const ProductCategories: CollectionConfig = {
  slug: 'product-categories',
  labels: { singular: 'Product Category', plural: 'Product Categories' },
  orderable: true,
  admin: {
    group: 'Content',
    useAsTitle: 'name',
    defaultColumns: ['name', 'showOnHome', 'hidden', '_status'],
    description:
      'Drag rows to reorder. These are the cards on the Home page and the list in the footer. A card opens the quote form with the category filled in.',
    livePreview: { url: ({ locale }) => previewUrl('/', locale) },
    preview: (_doc, { locale }) => previewUrl('/', locale),
  },
  access: { read: publishedOrStaff, create: isStaff, update: isStaff, delete: isStaff },
  versions: { maxPerDoc: 20, drafts: { autosave: { interval: 1500 } } },
  hooks: {
    afterChange: [revalidateCollection],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true, admin: { description: '1–3 words.' } },
    imageField('image', 'Card image. Recommended 1200 px wide or more.', true),
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
