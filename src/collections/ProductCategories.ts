import type { CollectionConfig } from 'payload'
import { isStaff, publishedOrStaff } from '../access'
import { iconField, imageField, slugField } from '../fields/common'
import { revalidateAfterDelete, revalidateCollection } from '../hooks/revalidate'
import { slugRedirect } from '../hooks/slugRedirect'
import { previewUrl } from '../lib/preview'

export const ProductCategories: CollectionConfig = {
  slug: 'product-categories',
  labels: { singular: 'Product Category', plural: 'Product Categories' },
  orderable: true,
  admin: {
    group: 'Catalogue',
    useAsTitle: 'name',
    defaultColumns: ['name', 'showOnHome', 'hidden', '_status'],
    description: 'Drag rows to reorder. The order is used on Home and on the Products page.',
    livePreview: { url: ({ data }) => previewUrl(`/products/${data?.slug}`) },
    preview: (data) => previewUrl(`/products/${data?.slug}`),
  },
  access: { read: publishedOrStaff, create: isStaff, update: isStaff, delete: isStaff },
  versions: { maxPerDoc: 20, drafts: { autosave: { interval: 1500 } } },
  hooks: {
    afterChange: [slugRedirect((doc) => `/products/${doc.slug}`), revalidateCollection],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            { name: 'name', type: 'text', required: true, localized: true, admin: { description: '1–3 words.' } },
            {
              name: 'description',
              type: 'textarea',
              localized: true,
              admin: { description: 'Shown at the top of the category page. 2–3 sentences.' },
            },
            imageField('image', 'Card and category hero image. Recommended 1200 px wide or more.', true),
            iconField(),
          ],
        },
      ],
    },
    slugField('name'),
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
