import type { CollectionConfig } from 'payload'
import { isStaff } from '../access'

/** Files sent through the inquiry form. Stored outside the public media folder and readable only when logged in. */
export const InquiryAttachments: CollectionConfig = {
  slug: 'inquiry-attachments',
  labels: { singular: 'Inquiry attachment', plural: 'Inquiry attachments' },
  admin: { hidden: true },
  access: {
    read: isStaff,
    create: () => false,
    update: () => false,
    delete: isStaff,
  },
  upload: {
    staticDir: 'private/inquiry-attachments',
    mimeTypes: ['application/pdf', 'image/jpeg', 'image/png'],
    disableLocalStorage: false,
  },
  fields: [],
}
