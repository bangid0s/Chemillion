# Chemillion website

Company profile site and admin dashboard, built from the PRD in this folder with Next.js, Payload CMS and SQLite locally (PostgreSQL in production).

## Run it

Node 22 is pinned as a project dependency, so `npm run` scripts use it even if your computer has an older Node.

```bash
npm run dev
```

- Website: http://localhost:3000
- Dashboard: http://localhost:3000/admin
- Local test logins: `SEED_ADMIN_*` and `SEED_EDITOR_*` in `.env`

`npm run seed` fills an empty database with the lorem ipsum content. To start over, stop the server and delete `data/` and `media/` first.

To reinstall dependencies, use Node 22 or newer. If your system Node is older, put `node_modules\node\bin` first on your PATH.

## Editing content

| To change | Go to |
| --- | --- |
| Any page's text and images | **Pages** |
| Teal words in a headline | Wrap them in `*asterisks*` in the headline field |
| Solutions (Home cards, Solutions page, footer list) | **Content → Solutions** |
| Images | **Content → Media Library** |
| Form submissions, CSV export | **Sales → Inquiries** |
| Menu, footer titles | **Settings → Navigation** |
| Logo, contact details, notification emails, analytics, redirects | **Settings** (admins only) |

Edits save as drafts and only go live when you press **Publish changes**. Use the eye icon for a live preview, and **Versions** to restore an earlier version.

## Languages

The site has three languages, each written by hand: English (the default, at `/about`), Bahasa Indonesia (`/id/about`) and Chinese (Simplified) (`/zh/about`). Visitors switch with the globe button in the header and land on the same page in the other language.

- **Page content:** open any page, category or setting in the dashboard, pick the language in the **Locale** menu at the top right, type the translation and publish. A field left empty in Indonesian or Chinese shows the English text, so a page can be translated bit by bit.
- **Buttons, form labels and messages** that are part of the site's code live in `src/i18n/en.ts`, `id.ts` and `zh.ts`.
- Links you enter in the dashboard (such as `/about`) stay in the visitor's language automatically.
- Search engines get one address per language, `hreflang` links between them, and all of them in `sitemap.xml`.
- Inquiries record the visitor's language, and the auto-reply email uses that language's text from Site Settings.

## Website copy

The approved copy (Home, About, Solutions, Contact, menu, footer, office hours, email and auto-reply in all three languages) lives in `src/content/websiteCopy.ts`. The `website_copy` migration writes it into the dashboard once, and `npm run seed` uses it for fresh installs. After that the dashboard is the place to edit it.

## Removed sections

Products, Partners, News and Search were removed in November 2026. Their old URLs redirect (`next.config.mjs`): `/products` to the Home page's category cards, product pages to the quote form, `/partners` to About, and `/news` and `/search` to Home. Inquiries that had picked products keep those product names in **Product(s) of interest**.

## Going live

1. Set real values in `.env` from `.env.example`: `PAYLOAD_SECRET`, `NEXT_PUBLIC_SITE_URL`, SMTP, Turnstile.
2. Set `DATABASE_URI` to a `postgres://` URL. Create the tables with `npx payload migrate:create` then `npx payload migrate` before the first `npm run build`.
3. Replace the placeholders, then delete `seed/` and `scripts/make-placeholders.mjs`. They are crops of the design mockup.
4. Run `npm run build` and `npm start` behind Nginx or Caddy and Cloudflare.
5. Keep `data/` or the Postgres database, `media/` and `private/` in your daily backup.

## Project layout

```
src/app/(frontend)   Public pages (under [lang]), sitemap, inquiry endpoint
src/proxy.ts         Language routing: / is English, /id and /zh the others
src/app/(payload)    Dashboard and REST API
src/collections      Inquiries, Product Categories and other content types
src/globals          One structured editor per page, plus settings and navigation
src/components       Site components; admin/ holds dashboard add-ons
src/i18n             Languages and interface strings (English, Indonesian, Chinese)
scripts              Seed and placeholder scripts
```
