import type { CollectionConfig } from 'payload'
import { isStaff } from '../access'
import { revalidateAfterDelete, revalidateCollection } from '../hooks/revalidate'

export const PartnerTypes: CollectionConfig = {
  slug: 'partner-types',
  labels: { singular: 'Partner Type', plural: 'Partner Types' },
  orderable: true,
  admin: { group: 'Partners', useAsTitle: 'name', description: 'Groups on the Partners page. Drag to reorder.' },
  access: { read: () => true, create: isStaff, update: isStaff, delete: isStaff },
  hooks: { afterChange: [revalidateCollection], afterDelete: [revalidateAfterDelete] },
  fields: [{ name: 'name', type: 'text', required: true, localized: true }],
}
