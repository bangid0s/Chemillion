import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig, type EmailAdapter } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { InquiryAttachments } from './collections/InquiryAttachments'
import { ProductCategories } from './collections/ProductCategories'
import { Inquiries } from './collections/Inquiries'
import { Redirects } from './collections/Redirects'
import { SiteSettings } from './globals/SiteSettings'
import { Navigation } from './globals/Navigation'
import { pageGlobals } from './globals/pages'
import { richText } from './fields/richText'
import { siteUrl } from './lib/url'

const dirname = path.dirname(fileURLToPath(import.meta.url))
// DATABASE_URL is what Vercel's Neon integration sets.
const databaseUri = process.env.DATABASE_URI || process.env.DATABASE_URL || 'file:./data/chemillion.db'

// SQLite won't create its own folder on a fresh checkout.
if (databaseUri.startsWith('file:')) fs.mkdirSync(path.dirname(path.resolve(databaseUri.slice('file:'.length))), { recursive: true })

const email: EmailAdapter | undefined = process.env.SMTP_HOST
  ? (nodemailerAdapter({
      defaultFromAddress: process.env.EMAIL_FROM_ADDRESS || 'no-reply@chemillion.com',
      defaultFromName: process.env.EMAIL_FROM_NAME || 'Chemillion',
      transportOptions: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      },
    }) as unknown as EmailAdapter)
  : undefined

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || '',
  serverURL: siteUrl,
  telemetry: false,
  graphQL: { disable: true },
  sharp,
  email,
  db: databaseUri.startsWith('postgres')
    ? postgresAdapter({ pool: { connectionString: databaseUri } })
    : sqliteAdapter({ client: { url: databaseUri } }),
  editor: richText(),
  // Every field marked `localized` is written per language with the Locale menu at the top of the editor.
  // A field left empty in Indonesian or Chinese shows its English text on the site until it is translated.
  localization: {
    locales: [
      { code: 'en', label: 'English' },
      { code: 'id', label: 'Bahasa Indonesia' },
      { code: 'zh', label: 'Chinese (Simplified) 中文' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  admin: {
    user: Users.slug,
    // Built-in initials avatar: no broken image offline, and staff emails are not sent to Gravatar.
    avatar: 'default',
    importMap: { baseDir: dirname },
    meta: {
      titleSuffix: ' · Chemillion Admin',
      robots: 'noindex, nofollow',
    },
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 812 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
    components: {
      graphics: {
        Logo: '/components/admin/AdminBrand#AdminLogo',
        Icon: '/components/admin/AdminBrand#AdminIcon',
      },
      beforeLogin: ['/components/admin/AdminBrand#LoginIntro'],
      beforeDashboard: ['/components/admin/DashboardHome#DashboardHome'],
      beforeNavLinks: ['/components/admin/InquiriesNavBadge#InquiriesNavBadge'],
    },
  },
  collections: [
    Inquiries,
    ProductCategories,
    Media,
    InquiryAttachments,
    Redirects,
    Users,
  ],
  globals: [...pageGlobals, Navigation, SiteSettings],
  plugins: [
    // Vercel's disk is read-only, so uploads go to Vercel Blob there. Without the token, files stay on local disk.
    vercelBlobStorage({
      token: process.env.BLOB_READ_WRITE_TOKEN,
      collections: { [Media.slug]: true, [InquiryAttachments.slug]: true },
      // Blobs are public; the random suffix keeps direct URLs to private attachments unguessable. Payload still serves both through its access control.
      addRandomSuffix: true,
      alwaysInsertFields: true,
    }),
    seoPlugin({
      collections: [],
      globals: pageGlobals.map((g) => g.slug),
      uploadsCollection: Media.slug,
      tabbedUI: true,
      generateTitle: () => 'Chemillion',
      fields: ({ defaultFields }) => [
        ...defaultFields,
        {
          name: 'canonical',
          type: 'text',
          label: 'Canonical URL',
          admin: { description: 'Leave empty to use this page’s own URL.' },
        },
        {
          name: 'noindex',
          type: 'checkbox',
          label: 'Hide from search engines (noindex)',
        },
      ],
    }),
  ],
  upload: {
    limits: { fileSize: 10_000_000 },
  },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
