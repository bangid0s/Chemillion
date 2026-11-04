import type { CollectionConfig } from 'payload'
import { isStaff, publishedOrStaff } from '../access'
import { slugField } from '../fields/common'
import { richText } from '../fields/richText'
import { revalidateAfterDelete, revalidateCollection } from '../hooks/revalidate'
import { slugRedirect } from '../hooks/slugRedirect'
import { previewUrl } from '../lib/preview'

const categorySlug = async (category: unknown, payload: unknown) => {
  if (category && typeof category === 'object') return (category as { slug?: string }).slug
  const doc = await (payload as import('payload').Payload).findByID({
    collection: 'product-categories',
    id: category as number,
    depth: 0,
  })
  return doc.slug
}

export const Products: CollectionConfig = {
  slug: 'products',
  labels: { singular: 'Product', plural: 'Products' },
  admin: {
    group: 'Catalogue',
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'casNumber', 'grade', '_status'],
    listSearchableFields: ['name', 'casNumber', 'grade'],
    livePreview: {
      url: async ({ data, req }) =>
        previewUrl(`/products/${await categorySlug(data?.category, req.payload)}/${data?.slug}`),
    },
  },
  access: { read: publishedOrStaff, create: isStaff, update: isStaff, delete: isStaff },
  versions: { maxPerDoc: 20, drafts: { autosave: { interval: 1500 } } },
  hooks: {
    afterChange: [
      slugRedirect(async (doc, payload) => `/products/${await categorySlug(doc.category, payload)}/${doc.slug}`),
      revalidateCollection,
    ],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            { name: 'name', type: 'text', required: true, localized: true },
            {
              type: 'row',
              fields: [
                { name: 'casNumber', type: 'text', label: 'CAS number', admin: { width: '50%' } },
                { name: 'grade', type: 'text', admin: { width: '50%' } },
              ],
            },
            {
              name: 'synonyms',
              type: 'text',
              localized: true,
              admin: { description: 'Other names buyers search for, separated by commas.' },
            },
            {
              name: 'shortDescription',
              type: 'textarea',
              localized: true,
              admin: { description: 'Shown on product cards. Up to 160 characters.' },
            },
            { name: 'description', type: 'richText', localized: true, editor: richText() },
          ],
        },
        {
          label: 'Gallery',
          fields: [
            {
              name: 'gallery',
              type: 'array',
              labels: { singular: 'Image', plural: 'Images' },
              fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
            },
          ],
        },
        {
          label: 'Specifications',
          fields: [
            {
              name: 'specs',
              type: 'array',
              labels: { singular: 'Row', plural: 'Rows' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'property', type: 'text', required: true, localized: true, admin: { width: '50%' } },
                    { name: 'value', type: 'text', required: true, admin: { width: '30%' } },
                    { name: 'unit', type: 'text', admin: { width: '20%' } },
                  ],
                },
              ],
            },
            {
              name: 'applications',
              type: 'array',
              labels: { singular: 'Application', plural: 'Applications' },
              fields: [{ name: 'label', type: 'text', required: true, localized: true }],
            },
            {
              name: 'packaging',
              type: 'array',
              labels: { singular: 'Packaging option', plural: 'Packaging options' },
              fields: [{ name: 'label', type: 'text', required: true, localized: true }],
            },
          ],
        },
        {
          label: 'Documents',
          fields: [
            {
              name: 'documents',
              type: 'array',
              labels: { singular: 'Document', plural: 'Documents' },
              admin: { description: 'TDS, SDS or COA PDFs for visitors to download.' },
              fields: [
                { name: 'title', type: 'text', required: true, localized: true },
                { name: 'file', type: 'upload', relationTo: 'media', required: true },
              ],
            },
          ],
        },
      ],
    },
    slugField('name'),
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'product-categories',
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'relatedProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      admin: { position: 'sidebar', description: 'Leave empty to show others from the same category.' },
    },
    { name: 'hidden', type: 'checkbox', label: 'Hide from site', admin: { position: 'sidebar' } },
  ],
}
