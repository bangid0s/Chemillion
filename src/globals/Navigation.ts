import type { GlobalConfig } from 'payload'
import { isStaff } from '../access'
import { revalidateGlobal } from '../hooks/revalidate'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  admin: { group: 'Settings' },
  access: { read: () => true, update: isStaff },
  hooks: { afterChange: [revalidateGlobal] },
  versions: { max: 20 },
  fields: [
    {
      name: 'items',
      type: 'array',
      labels: { singular: 'Menu item', plural: 'Menu items' },
      admin: { description: 'Drag to reorder.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text', required: true, localized: true, admin: { width: '40%' } },
            { name: 'link', type: 'text', required: true, admin: { width: '40%' } },
            { name: 'visible', type: 'checkbox', defaultValue: true, admin: { width: '20%' } },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'ctaLabel', type: 'text', localized: true, label: 'Button label', admin: { width: '50%' } },
        { name: 'ctaLink', type: 'text', label: 'Button link', admin: { width: '50%' } },
      ],
    },
    { name: 'quickLinksTitle', type: 'text', localized: true, label: 'Footer: Quick Links title' },
    { name: 'productsTitle', type: 'text', localized: true, label: 'Footer: Solutions title' },
    { name: 'contactTitle', type: 'text', localized: true, label: 'Footer: Contact title' },
  ],
}
