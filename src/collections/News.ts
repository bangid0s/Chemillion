import type { CollectionConfig } from 'payload'
import { isStaff } from '../access'
import { slugField } from '../fields/common'
import { richText } from '../fields/richText'
import { revalidateAfterDelete, revalidateCollection } from '../hooks/revalidate'
import { slugRedirect } from '../hooks/slugRedirect'
import { previewUrl } from '../lib/preview'

export const News: CollectionConfig = {
  slug: 'news',
  labels: { singular: 'News article', plural: 'News' },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'state', 'category', 'publishedAt', 'author'],
    listSearchableFields: ['title', 'excerpt', 'category'],
    livePreview: { url: ({ data }) => previewUrl(`/news/${data?.slug}`) },
    preview: (data) => previewUrl(`/news/${data?.slug}`),
  },
  access: {
    read: ({ req: { user } }) =>
      user ? true : { _status: { equals: 'published' }, publishedAt: { less_than_equal: new Date().toISOString() } },
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  versions: { maxPerDoc: 20, drafts: { autosave: { interval: 1500 } } },
  hooks: {
    afterChange: [slugRedirect((doc) => `/news/${doc.slug}`), revalidateCollection],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Article',
          fields: [
            { name: 'title', type: 'text', required: true, localized: true, admin: { description: '6–12 words.' } },
            {
              name: 'excerpt',
              type: 'textarea',
              localized: true,
              admin: { description: 'Shown on the news list. Up to 160 characters.' },
            },
            { name: 'cover', type: 'upload', relationTo: 'media', required: true },
            { name: 'body', type: 'richText', localized: true, editor: richText() },
          ],
        },
      ],
    },
    slugField('title'),
    {
      name: 'state',
      type: 'text',
      virtual: true,
      admin: { position: 'sidebar', readOnly: true, description: 'Draft, Scheduled or Published.' },
      hooks: {
        afterRead: [
          ({ data }) => {
            if (data?._status !== 'published') return 'Draft'
            return data.publishedAt && new Date(data.publishedAt) > new Date() ? 'Scheduled' : 'Published'
          },
        ],
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
        description: 'Pick a future date and press Publish to schedule this article.',
      },
    },
    { name: 'author', type: 'text', admin: { position: 'sidebar' } },
    { name: 'category', type: 'text', localized: true, index: true, admin: { position: 'sidebar' } },
    {
      name: 'tags',
      type: 'text',
      hasMany: true,
      localized: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'relatedProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      admin: { position: 'sidebar' },
    },
  ],
}
