import type { CollectionConfig } from 'payload'
import { isStaff } from '../access'
import { revalidateAfterDelete, revalidateCollection } from '../hooks/revalidate'

export const Partners: CollectionConfig = {
  slug: 'partners',
  labels: { singular: 'Partner', plural: 'Partners' },
  orderable: true,
  admin: { group: 'Partners', useAsTitle: 'name', defaultColumns: ['name', 'type', 'visible'] },
  access: {
    read: ({ req: { user } }) => (user ? true : { visible: { equals: true } }),
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  hooks: { afterChange: [revalidateCollection], afterDelete: [revalidateAfterDelete] },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { description: 'SVG or PNG. Shown in grayscale until hovered.' },
    },
    { name: 'type', type: 'relationship', relationTo: 'partner-types', required: true },
    { name: 'url', type: 'text', label: 'Website link' },
    { name: 'description', type: 'text', localized: true, admin: { description: 'Optional, one line.' } },
    { name: 'visible', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
  ],
}
