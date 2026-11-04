import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access'
import { revalidateAfterDelete, revalidateCollection } from '../hooks/revalidate'

export const Redirects: CollectionConfig = {
  slug: 'redirects',
  labels: { singular: 'Redirect', plural: 'Redirects' },
  admin: {
    group: 'Settings',
    useAsTitle: 'from',
    defaultColumns: ['from', 'to', 'type'],
    description: 'Send old URLs to new ones. Changing a slug adds a row here automatically.',
    hidden: ({ user }) => (user as { role?: string } | null)?.role !== 'admin',
  },
  access: { read: isAdmin, create: isAdmin, update: isAdmin, delete: isAdmin },
  hooks: { afterChange: [revalidateCollection], afterDelete: [revalidateAfterDelete] },
  fields: [
    {
      name: 'from',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Old path, for example /old-page.' },
    },
    { name: 'to', type: 'text', required: true, admin: { description: 'New path or full URL.' } },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: '301',
      options: [
        { label: '301 (permanent)', value: '301' },
        { label: '302 (temporary)', value: '302' },
      ],
    },
  ],
}
