import type { CollectionConfig } from 'payload'
import { isStaff } from '../access'
import { compressUpload } from '../hooks/compressUpload'
import { revalidateAfterDelete, revalidateCollection } from '../hooks/revalidate'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Media file', plural: 'Media Library' },
  admin: {
    group: 'Content',
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'alt', 'mimeType', 'updatedAt'],
    description: 'Max 10 MB. Photos are stored as JPEGs of at most 125 KB, and pages get AVIF/WebP copies sized for each screen.',
    listSearchableFields: ['filename', 'alt'],
  },
  access: {
    read: () => true,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  hooks: {
    beforeOperation: [compressUpload],
    afterChange: [revalidateCollection],
    afterDelete: [revalidateAfterDelete],
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml', 'application/pdf'],
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    crop: true,
    imageSizes: [{ name: 'thumbnail', width: 400, height: 300, formatOptions: { format: 'webp', options: { quality: 75 } } }],
    formatOptions: undefined,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
      label: 'Alt text',
      admin: { description: 'Describe the image for search engines and screen readers. Required.' },
    },
    { name: 'caption', type: 'text', localized: true },
    {
      name: 'sizeHint',
      type: 'ui',
      admin: { components: { Field: '/components/admin/MediaSizeWarning#MediaSizeWarning' } },
    },
    {
      name: 'usage',
      type: 'ui',
      admin: { components: { Field: '/components/admin/MediaUsage#MediaUsage' } },
    },
  ],
}
