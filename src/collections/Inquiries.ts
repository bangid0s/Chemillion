import type { CollectionConfig } from 'payload'
import { isAdmin, isStaff } from '../access'
import { exportInquiriesCsv, purgeOldInquiries } from '../lib/inquiryEndpoints'

const STATUS_LABELS: Record<string, string> = {
  new: 'New',
  in_progress: 'In progress',
  quoted: 'Quoted',
  won: 'Won',
  lost: 'Lost',
  spam: 'Spam',
}

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  labels: { singular: 'Inquiry', plural: 'Inquiries' },
  admin: {
    group: 'Sales',
    useAsTitle: 'name',
    defaultColumns: ['name', 'company', 'type', 'status', 'formOrigin', 'assignedTo', 'createdAt'],
    listSearchableFields: ['name', 'company', 'email'],
    pagination: { defaultLimit: 25 },
    components: { beforeListTable: ['/components/admin/InquiryListActions#InquiryListActions'] },
  },
  defaultSort: '-createdAt',
  // Public submissions go through /inquiry/submit, which validates and blocks spam before saving.
  access: { read: isStaff, create: () => false, update: isStaff, delete: isAdmin },
  endpoints: [
    { path: '/export', method: 'get', handler: exportInquiriesCsv },
    { path: '/purge', method: 'post', handler: purgeOldInquiries },
  ],
  hooks: {
    // Retention purges and manual deletes must take the private file with them.
    afterDelete: [
      async ({ doc, req }) => {
        const id = (doc.attachment as { id?: number } | null)?.id ?? doc.attachment
        if (id) await req.payload.delete({ collection: 'inquiry-attachments', where: { id: { equals: id } }, req })
      },
    ],
    beforeChange: [
      async ({ data, originalDoc, operation, req }) => {
        if (operation !== 'update' || !originalDoc) return data
        const who = (req.user as { name?: string; email?: string } | null)?.name || req.user?.email || 'System'
        const log: { at: string; message: string }[] = [...(originalDoc.activity || [])]
        if (data.status && data.status !== originalDoc.status) {
          log.push({
            at: new Date().toISOString(),
            message: `${who} changed status to ${STATUS_LABELS[data.status] ?? data.status}`,
          })
        }
        const prevAssigned = (originalDoc.assignedTo as { id?: unknown } | null)?.id ?? originalDoc.assignedTo
        const nextAssigned = (data.assignedTo as { id?: unknown } | null)?.id ?? data.assignedTo
        if (data.assignedTo !== undefined && nextAssigned !== prevAssigned) {
          log.push({ at: new Date().toISOString(), message: `${who} changed the assignee` })
        }
        const prevNotes = originalDoc.notes?.length ?? 0
        if ((data.notes?.length ?? 0) > prevNotes) {
          log.push({ at: new Date().toISOString(), message: `${who} added a note` })
        }
        return { ...data, activity: log }
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Inquiry',
          fields: [
            {
              name: 'contactActions',
              type: 'ui',
              admin: { components: { Field: '/components/admin/InquiryContactActions#InquiryContactActions' } },
            },
            {
              type: 'row',
              fields: [
                { name: 'name', type: 'text', required: true, label: 'Full name', admin: { readOnly: true, width: '50%' } },
                { name: 'company', type: 'text', required: true, admin: { readOnly: true, width: '50%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'email', type: 'email', required: true, admin: { readOnly: true, width: '50%' } },
                { name: 'phone', type: 'text', required: true, label: 'Phone / WhatsApp', admin: { readOnly: true, width: '50%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'country', type: 'text', admin: { readOnly: true, width: '50%' } },
                { name: 'type', type: 'text', required: true, label: 'Inquiry type', index: true, admin: { readOnly: true, width: '50%' } },
              ],
            },
            { name: 'productInterest', type: 'text', label: 'Product(s) of interest', admin: { readOnly: true } },
            { name: 'quantity', type: 'text', label: 'Estimated quantity', admin: { readOnly: true } },
            { name: 'message', type: 'textarea', required: true, admin: { readOnly: true, rows: 6 } },
            { name: 'attachment', type: 'upload', relationTo: 'inquiry-attachments', admin: { readOnly: true } },
            {
              name: 'consent',
              type: 'checkbox',
              label: 'Agreed to the Privacy Policy',
              admin: { readOnly: true },
            },
          ],
        },
        {
          label: 'Notes & activity',
          fields: [
            {
              name: 'notes',
              type: 'array',
              labels: { singular: 'Note', plural: 'Internal notes' },
              admin: { description: 'Only visible to your team.' },
              fields: [{ name: 'text', type: 'textarea', required: true }],
            },
            {
              name: 'activity',
              type: 'array',
              labels: { singular: 'Entry', plural: 'Activity log' },
              admin: { readOnly: true, initCollapsed: false },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'at', type: 'date', admin: { readOnly: true, date: { pickerAppearance: 'dayAndTime' }, width: '40%' } },
                    { name: 'message', type: 'text', admin: { readOnly: true, width: '60%' } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Source',
          fields: [
            { name: 'sourceUrl', type: 'text', label: 'Source page', admin: { readOnly: true } },
            {
              type: 'row',
              fields: [
                { name: 'language', type: 'text', admin: { readOnly: true, width: '50%' } },
                { name: 'ip', type: 'text', label: 'IP address', admin: { readOnly: true, width: '50%' } },
              ],
            },
            {
              name: 'utm',
              type: 'group',
              label: 'UTM parameters',
              admin: { readOnly: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'source', type: 'text', admin: { readOnly: true } },
                    { name: 'medium', type: 'text', admin: { readOnly: true } },
                    { name: 'campaign', type: 'text', admin: { readOnly: true } },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      index: true,
      options: Object.entries(STATUS_LABELS).map(([value, label]) => ({ value, label })),
      admin: { position: 'sidebar' },
    },
    {
      name: 'formOrigin',
      type: 'select',
      required: true,
      defaultValue: 'contact',
      label: 'Form origin',
      index: true,
      options: [
        { label: 'Contact', value: 'contact' },
        { label: 'Get a Quote', value: 'quote' },
        { label: 'Product page', value: 'product' },
        { label: 'Partner', value: 'partner' },
      ],
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'assignedTo',
      type: 'relationship',
      relationTo: 'users',
      label: 'Assigned to',
      admin: { position: 'sidebar' },
    },
  ],
}
