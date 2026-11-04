import { ValidationError, type CollectionConfig } from 'payload'
import { adminOrSelf, isAdmin, isAdminField } from '../access'

const MIN_PASSWORD = 10

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'User', plural: 'Users' },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    tokenExpiration: 60 * 60 * 8,
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role', 'active'],
    group: 'Settings',
    hidden: ({ user }) => (user as { role?: string } | null)?.role !== 'admin',
  },
  access: {
    read: adminOrSelf,
    create: isAdmin,
    update: adminOrSelf,
    delete: isAdmin,
    admin: ({ req: { user } }) => (user as { active?: boolean } | null)?.active !== false,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        const password = (data as { password?: string } | undefined)?.password
        if (password && (password.length < MIN_PASSWORD || !/[a-zA-Z]/.test(password) || !/\d/.test(password))) {
          throw new ValidationError({
            errors: [
              {
                path: 'password',
                message: `Password must be at least ${MIN_PASSWORD} characters and include letters and numbers.`,
              },
            ],
          })
        }
        return data
      },
    ],
    beforeLogin: [
      ({ user }) => {
        if ((user as { active?: boolean }).active === false) {
          throw new Error('This account has been deactivated.')
        }
        return user
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      saveToJWT: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: { create: isAdminField, update: isAdminField },
      admin: { description: 'Editors cannot open Site Settings or Users.' },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      saveToJWT: true,
      access: { create: isAdminField, update: isAdminField },
      admin: { description: 'Untick to deactivate this account without deleting it.' },
    },
  ],
}
