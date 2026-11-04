import type { GlobalConfig } from 'payload'
import { isAdmin } from '../access'
import { revalidateGlobal } from '../hooks/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Settings',
    hidden: ({ user }) => (user as { role?: string } | null)?.role !== 'admin',
  },
  access: { read: isAdmin, update: isAdmin },
  hooks: { afterChange: [revalidateGlobal] },
  versions: { max: 20 },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Brand',
          fields: [
            { name: 'companyName', type: 'text', required: true, defaultValue: 'Chemillion' },
            { name: 'logo', type: 'upload', relationTo: 'media', admin: { description: 'SVG preferred. Empty uses the built-in logo.' } },
            { name: 'logoDark', type: 'upload', relationTo: 'media', label: 'Logo for dark backgrounds' },
            { name: 'defaultOgImage', type: 'upload', relationTo: 'media', label: 'Default social sharing image' },
          ],
        },
        {
          label: 'Contact',
          fields: [
            { name: 'address', type: 'textarea', localized: true, admin: { rows: 2 } },
            {
              type: 'row',
              fields: [
                { name: 'phone', type: 'text', admin: { width: '33%' } },
                { name: 'whatsapp', type: 'text', admin: { width: '33%', description: 'Digits only, with country code. Empty hides the button.' } },
                { name: 'email', type: 'email', admin: { width: '34%' } },
              ],
            },
            { name: 'officeHours', type: 'textarea', localized: true, admin: { rows: 2 } },
            {
              type: 'row',
              fields: [
                { name: 'latitude', type: 'number', admin: { width: '50%' } },
                { name: 'longitude', type: 'number', admin: { width: '50%' } },
              ],
            },
            {
              name: 'socialLinks',
              type: 'array',
              labels: { singular: 'Social link', plural: 'Social links' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'platform',
                      type: 'select',
                      required: true,
                      options: ['linkedin', 'instagram', 'youtube', 'facebook', 'x'].map((value) => ({ value, label: value })),
                      admin: { width: '30%' },
                    },
                    { name: 'url', type: 'text', required: true, admin: { width: '70%' } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            { name: 'copyright', type: 'text', localized: true, admin: { description: 'Use {year} for the current year.' } },
            { name: 'followLabel', type: 'text', localized: true, defaultValue: 'Follow Us' },
          ],
        },
        {
          label: 'Inquiries',
          fields: [
            {
              name: 'notificationEmails',
              type: 'array',
              labels: { singular: 'Email', plural: 'Notification emails' },
              admin: { description: 'New inquiries are emailed to these addresses.' },
              fields: [{ name: 'email', type: 'email', required: true }],
            },
            {
              name: 'inquiryTypes',
              type: 'array',
              labels: { singular: 'Type', plural: 'Inquiry types' },
              admin: { description: 'Options in the form’s Inquiry type dropdown.' },
              fields: [{ name: 'label', type: 'text', required: true, localized: true }],
            },
            { name: 'autoReplySubject', type: 'text', localized: true },
            {
              name: 'autoReplyBody',
              type: 'textarea',
              localized: true,
              admin: { rows: 6, description: 'Sent to the visitor. Use {name} for their name.' },
            },
            {
              name: 'retentionMonths',
              type: 'number',
              defaultValue: 24,
              min: 1,
              label: 'Keep inquiries for (months)',
            },
          ],
        },
        {
          label: 'Analytics',
          fields: [
            { name: 'gaId', type: 'text', label: 'Google Analytics 4 ID', admin: { description: 'For example G-XXXXXXX. Loaded after the page is idle.' } },
            { name: 'searchConsoleToken', type: 'text', label: 'Google Search Console verification token' },
            { name: 'mapEmbedUrl', type: 'text', label: 'Google Maps embed URL', admin: { description: 'Loaded only when a visitor clicks the map.' } },
          ],
        },
      ],
    },
  ],
}
