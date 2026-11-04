# Chemillion Company Profile Website — PRD

Oct 29, 2026 · @M.J. Fird

Chemillion needs a fast, SEO-strong company profile site in English (Indonesian later) where every headline, paragraph and image is editable from an admin dashboard, and every contact form submission lands in an Inquiries inbox inside that same dashboard.

## Goals & success metrics

The site exists to turn B2B buyers searching for chemicals into qualified inquiries, while letting Chemillion's team run it without a developer.

| Goal | Metric | Target |
| --- | --- | --- |
| Generate qualified leads | Contact form submissions captured in the dashboard | 100% of submissions stored; 0 lost |
| Be found on Google | Pages indexed in Google Search Console | All public pages indexed within 4 weeks of launch |
| Load fast on mobile | Lighthouse Performance (mobile) on Home, Products, Product detail | 90 or higher |
| Pass Core Web Vitals | LCP / INP / CLS at the 75th percentile | under 2.5 s / under 200 ms / under 0.1 |
| Self-service content | Copy or image change made by admin without code | Under 5 minutes, live on the site within 60 seconds |
| Credibility | Bounce rate on Home | Under 55% after 3 months (baseline TBD) |

Primary audience: procurement managers, plant engineers and lab heads looking for industrial chemicals, specialty chemicals, raw materials and lab reagents. They scan for product range, certifications, reliability and a fast way to request a quote.

## Scope

Version 1 ships the public site in English plus the full admin dashboard; Indonesian is built for from day one but switched on in phase 2.

**In scope (v1)**

- Public pages: Home, About Us, Products (category + detail), Partners, News (list + article), Contact, Privacy Policy, 404
- Admin dashboard: edit all page copy and images, manage products, categories, partners, news, site settings, SEO fields
- Inquiries inbox: every contact/quote form submission stored and managed in the dashboard, with email notification
- "Get a Quote" button wired to the same inquiry system, pre-filled with product when clicked from a product page
- Technical SEO, sitemap, structured data, analytics
- Responsive design matching the attached mockup (desktop, tablet, mobile)

**Phase 2**

- Indonesian language (`/id/` routes), translated content entry in the dashboard, language switcher
- Downloadable product documents (TDS / SDS / COA PDFs) per product, if not ready for v1

**Out of scope**

- E-commerce, cart, online payment or live pricing
- Customer login / client portal
- Live chat (a WhatsApp click-to-chat button is optional, see Open questions)

## Users & roles

Three roles are enough for v1; keep permissions simple so the client can actually manage them.

| Role | Who | Can do |
| --- | --- | --- |
| Visitor | Buyers, partners, job seekers, press | Browse pages, read news, submit inquiry |
| Admin | Chemillion owner / marketing lead | Everything: content, products, news, partners, inquiries, settings, user management |
| Editor | Marketing staff | Edit content, products, news, partners; view and reply to inquiries; no settings or user management |

Optional later: a Sales role that sees only the Inquiries inbox.

## Sitemap & navigation

The nav bar is five items plus one CTA: **About Us · Products · Partners · News · Contact**, then a red **Get a Quote** button. The logo links Home, so "Home" is dropped from the nav (the mockup's Industries and Resources items are removed).

Why this order: visitors expect Contact last; News sits before it so the two conversion points (Contact, Get a Quote) stay together on the right. News is hidden from the nav automatically until at least 3 articles are published, so the site never shows an empty section.

| Page | URL (English) | Purpose | Key content |
| --- | --- | --- | --- |
| Home | `/` | First impression, route to products and inquiry | Hero, value props, product categories, why Chemillion + stats, CTA banner |
| About Us | `/about` | Trust and credibility | Story, vision/mission, values, certifications, facilities, stats |
| Products | `/products` | Browse the range | All categories, intro, CTA |
| Product category | `/products/{category}` | List products in one category | Category hero, description, product cards |
| Product detail | `/products/{category}/{product}` | Convert interest into a quote request | Images, specs table, applications, packaging, documents, Request a Quote |
| Partners | `/partners` | Show principals, suppliers, key clients | Logo grid by type, optional short description |
| News | `/news` | Freshness and SEO | Article list, pagination, category filter |
| News article | `/news/{slug}` | Long-tail SEO, announcements | Title, cover, body, date, related articles |
| Contact | `/contact` | Inquiry capture | Form, address, phone, email, map, office hours |
| Privacy Policy | `/privacy` | Legal, required because the form collects personal data | Editable rich text |
| 404 | any unknown URL | Recover lost visitors | Message, search-free links to Products and Contact |

Footer mirrors the mockup: logo, Quick Links, Products (top categories, auto-generated), Contact details, social icons (LinkedIn, Instagram, YouTube), copyright. Mobile nav: hamburger opening a full-height panel with the same five items and the Get a Quote button pinned at the bottom.

## Page requirements

Every text and image on every page comes from the dashboard; nothing visible to visitors is hard-coded except layout and icons.

### Design system (from the mockup)

- Colours: crimson red for CTAs and accents (approx. #E1223B), deep teal for highlighted headline words and dark bands (approx. #0F6B70), near-black headings, white and light grey (#F5F6F7) backgrounds. Exact hex values to confirm against Chemillion's brand guide.
- Shape language: diagonal cuts and the red/teal folded-arrow mark from the logo, used as image masks and section dividers. Built in CSS/SVG, not baked into photos, so admins can swap images without breaking the shape.
- Type: geometric sans for headings (similar to the mockup), clean sans for body; self-hosted, max 2 families, 4 weights, `font-display: swap`.
- Small spaced-caps eyebrow labels above every section title ("OUR PRODUCTS", "WHY CHEMILLION").
- Buttons: red pill primary with arrow icon, white outlined pill secondary.

### Home

| # | Section | Editable in dashboard |
| --- | --- | --- |
| 1 | Header: logo, nav, Get a Quote | Logo (light/dark), CTA label |
| 2 | Hero: eyebrow, 2-tone headline, paragraph, 2 buttons, masked image, floating badge (Quality / Safety / Sustainability) | All text, which headline words are teal, button labels + links, hero image + alt text, badge lines |
| 3 | Value props: 3 icon cards (High Quality, Trusted Supply, Sustainable Solutions) | Title, text, icon picked from a set, order |
| 4 | Product Categories: eyebrow, title, intro, View All link, 5 image cards | Section text; cards pull from Product Categories automatically (image, name, order, show on Home toggle) |
| 5 | Why Chemillion: masked plant image, title, paragraph, Learn More, 3 stats | All text, image, button link, stats (number, suffix like "+", label), count-up animation on scroll |
| 6 | CTA banner: teal band, image, title, text, Contact Our Team button | All text, image, button link |
| 7 | Footer | Address, phone, email, social URLs, copyright from Site Settings |

Optional Home sections the admin can toggle on later: Partners logo strip, Latest News (3 cards).

### About Us

- Hero with title, intro and image
- Company story (rich text + image)
- Vision and mission (2 cards)
- Values (repeatable icon cards)
- Certifications and compliance (repeatable: logo, name, short text, optional PDF), e.g. ISO, halal, K3
- Facilities / warehouse gallery (repeatable images with captions)
- Stats block (reuses the Home stats or its own)
- CTA banner

### Products

- **Products index**: hero, intro, grid of all categories with product counts.
- **Category page**: hero image and description, product cards (image, name, CAS number, short description), filter by application if more than 12 products.
- **Product detail**: image gallery, name, CAS number, grade, short and long description, specifications table (admin adds rows: property, value, unit), applications/industries tags, packaging options, downloadable TDS/SDS (phase 2 if documents not ready), related products, sticky **Request a Quote** button that opens the inquiry form with the product pre-filled.
- No prices shown anywhere.

### Partners

- Intro text
- Logo grid grouped by type (Principals, Suppliers, Clients, Distributors — types editable), each logo grayscale and colour on hover, optional link and one-line description
- CTA: "Become a Partner" opening the inquiry form with subject set to Partnership

### News

- List: cover image, title, date, excerpt, category; 9 per page with numbered pagination (crawlable links, not infinite scroll)
- Article: title, date, author, cover, rich-text body with images, share links, 3 related articles, CTA banner
- Draft / scheduled / published states

### Contact

- Inquiry form (see Contact form & inquiries)
- Office address, phone, email, office hours, all from Site Settings
- Map: a static map image that loads Google Maps only on click, to protect page speed
- Optional WhatsApp button

## Admin dashboard

The dashboard lives at `/admin`, is login-protected, and lets a non-technical person change any copy or image and see it live within 60 seconds.

### Modules

| Module | What admins do | Notes |
| --- | --- | --- |
| Dashboard home | See new inquiries count, latest 5 inquiries, recently edited content | Quick links to most-used modules |
| Pages | Edit each page's sections (Home, About, Products index, Partners, News index, Contact, Privacy) | Structured fields per section, not a free page builder, so the design cannot be broken |
| Product Categories | Create, edit, reorder, hide; image, description, show on Home | Drag to reorder |
| Products | Create, edit, duplicate, hide; gallery, specs rows, applications, packaging, documents | Duplicate speeds up similar products |
| Partners | Add logo, name, type, link, order | SVG or PNG; auto-resized |
| News | Write with rich text editor, cover, category, tags, author, schedule publish | Draft / scheduled / published |
| Inquiries | Inbox of form submissions (see next section) | Unread badge in sidebar |
| Media Library | Upload, search, replace, delete images and PDFs; edit alt text | Shows where each file is used before deleting |
| SEO | Per page/product/article: meta title, description, OG image, canonical, noindex toggle | Character counters and a Google preview snippet |
| Site Settings | Logo, contact details, social links, footer text, notification email(s), analytics IDs, redirects | Admin only |
| Users | Invite, set role, deactivate, reset password | Admin only |

### Editing experience requirements

- **Live preview** of the page before publishing; changes save as draft until "Publish".
- **Version history** per page/item with one-click restore (keep at least the last 20 versions).
- **Image handling**: on upload, the system auto-generates WebP/AVIF in several widths; admin sets a focal point so masks and crops keep the subject in frame. Max upload 10 MB; warn if under recommended size (e.g. hero under 1920 px wide).
- **Alt text** field required on every image upload (SEO and accessibility).
- **Rich text** limited to headings H2–H4, bold, italic, links, lists, images, tables, so content stays on-brand.
- **Highlighted headline words**: admin marks which words render in teal (e.g. wrap in a highlight mark) rather than typing colour codes.
- **Field hints** under each field with recommended length, e.g. "Hero headline: 4–8 words".
- **Publish speed**: publishing triggers on-demand revalidation so the live page updates within 60 seconds while the site stays static and fast.
- Dashboard works on tablet; mobile is read-only friendly for checking inquiries on the go.

## Contact form & inquiries

One form powers Contact, Get a Quote, Request a Quote (product) and Become a Partner; every submission is saved to the database first, then emailed, so nothing is lost if email fails.

### Form fields

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| Full name | Text | Yes |  |
| Company | Text | Yes | B2B qualifier |
| Email | Email | Yes | Format validated |
| Phone / WhatsApp | Tel | Yes | Country code selector, default +62 |
| Country | Dropdown | No | Default Indonesia |
| Inquiry type | Dropdown | Yes | Product quote, General, Partnership, Other (options editable) |
| Product(s) of interest | Multi-select | No | Pre-filled when coming from a product page |
| Estimated quantity | Text | No | e.g. "5 tons / month" |
| Message | Textarea | Yes | 20–2,000 characters |
| Attachment | File | No | PDF/JPG/PNG, max 5 MB (spec sheets, RFQs) |
| Consent | Checkbox | Yes | Agree to Privacy Policy (required under Indonesia's PDP Law, UU 27/2022) |

Hidden fields captured automatically: source page URL, form origin (Contact / Quote / Partner), UTM parameters, submitted timestamp, language.

### Submission flow

1. Client-side validation shows inline errors without reloading.
2. Server validates again, checks anti-spam, then saves the inquiry with status **New**.
3. Visitor sees a thank-you state on the page (and a `/thank-you` URL for conversion tracking).
4. Notification email goes to the addresses set in Site Settings; the visitor gets an auto-reply confirmation (template editable in the dashboard).
5. Inquiry appears in the dashboard inbox with an unread badge.

### Inquiries inbox

- List with filters: status, inquiry type, date range, product; search by name, company, email.
- Detail view: all fields, attachment download, source page, UTM, internal notes, activity log.
- Status workflow: **New → In progress → Quoted → Won / Lost**, plus **Spam**.
- Assign to a team member.
- "Reply by email" button opens the admin's mail client pre-filled; "WhatsApp" button opens wa.me with the number.
- Export to CSV (date range + filters) for sales reporting.
- Data retention: inquiries older than a set period (default 24 months) can be archived or deleted, in line with the privacy policy.

### Anti-spam

- Invisible CAPTCHA (Cloudflare Turnstile recommended: free, privacy-friendly, no puzzles for real users)
- Honeypot field + minimum time-to-submit check
- Rate limit: max 5 submissions per IP per hour
- Server-side file type and size checks; attachments stored privately, never publicly linkable

## Performance

Public pages are pre-rendered as static HTML and served from a CDN, so a visitor never waits for the database; the dashboard is the only dynamic part.

### Budgets (per page, mobile, 4G)

| Metric | Budget |
| --- | --- |
| Lighthouse Performance | 90 or higher |
| Largest Contentful Paint | under 2.5 s (aim under 1.8 s) |
| Interaction to Next Paint | under 200 ms |
| Cumulative Layout Shift | under 0.1 |
| Time to First Byte | under 600 ms |
| JavaScript shipped to browser | under 100 KB gzipped on Home |
| Total page weight (first load) | under 1.5 MB on Home |
| Web fonts | max 4 files, under 150 KB total |

### How we hit them

- Static generation + on-demand revalidation when admins publish (no rebuild of the whole site).
- CDN in front of everything (Cloudflare free plan is enough), with an Indonesian/Singapore edge for local visitors.
- Images: automatic AVIF/WebP, responsive `srcset`, explicit width/height to prevent layout shift, lazy-load everything below the fold, hero image preloaded with high priority.
- Mostly server-rendered HTML; JavaScript only for nav menu, form, stat count-up and gallery.
- Self-hosted, subset fonts; no Google Fonts request chain.
- Third-party scripts (analytics, maps, WhatsApp) loaded after interaction or idle; Google Maps only on click.
- Decorative diagonal shapes in CSS/SVG, not extra images.
- Animations CSS-only and respecting `prefers-reduced-motion`.
- Performance budget checked in CI (Lighthouse CI) so a heavy change fails before it goes live.

## SEO

SEO is built into the data model, not added afterwards: every page, category, product and article has its own SEO fields with sensible auto-fallbacks.

### Technical

- Clean, lowercase, hyphenated URLs; slugs editable with an automatic 301 redirect when changed.
- Auto-generated `sitemap.xml` (split by pages, products, news) and `robots.txt`; sitemap pinged on publish.
- Canonical tag on every page; pagination pages self-canonical.
- Redirect manager in Site Settings (301/302) for old URLs.
- Proper 404 status for missing pages; no soft 404s.
- HTTPS only, `www` vs non-`www` decided once and enforced.
- Server-rendered HTML for all public content (no content hidden behind JavaScript).
- `noindex` on `/admin`, `/thank-you`, search/filter result URLs.

### On-page

- Exactly one H1 per page; logical H2/H3 order.
- Meta title (50–60 characters) and description (140–160) per item; fallback: `{Name} | Chemillion` and the first 155 characters of the description.
- Open Graph and Twitter card image per item; fallback to a branded default.
- Required alt text on images; descriptive file names kept on upload.
- Internal linking: product pages link to their category and related products; news articles can link products; breadcrumbs on all inner pages.
- Product pages carry the searchable details buyers type: product name, synonyms, CAS number, grade, application, packaging.

### Structured data (JSON-LD)

| Page | Schema |
| --- | --- |
| All pages | `Organization` (name, logo, contact, social profiles), `WebSite` |
| Contact | `LocalBusiness` with address, geo, phone, opening hours |
| Inner pages | `BreadcrumbList` |
| Product detail | `Product` (name, image, description, brand, identifiers such as CAS via `additionalProperty`); no price/offer |
| News article | `NewsArticle` (headline, image, datePublished, dateModified, author) |

### Launch tasks

- Verify Google Search Console and Bing Webmaster Tools; submit sitemap.
- Create/claim Google Business Profile with the same name, address and phone as the site.
- Keyword map per page before copywriting (e.g. "chemical supplier Indonesia", "distributor bahan kimia", product names + "supplier").

## Multilingual readiness

v1 launches English-only, but every content field is stored as localizable from day one, so adding Indonesian later is a content task, not a rebuild.

- **URL strategy**: English at the root (`/products`), Indonesian under `/id/` (`/id/produk` with translated slugs). Subfolders keep all SEO authority on one domain.
- **Data**: text fields localized (EN, ID); images, numbers, CAS codes shared across languages unless overridden.
- **UI strings** (button labels, form errors, footer labels) stored in translation files, not hard-coded in components.
- **Fallback**: if an Indonesian field is empty, show English rather than a blank, and flag it in the dashboard as "missing translation".
- **SEO**: `hreflang` tags (`en`, `id`, `x-default`) and per-language sitemaps generated automatically once ID is switched on; `<html lang>` set per page.
- **Dashboard**: language toggle on every edit screen; a "Translation status" view listing items missing ID.
- **Switcher**: EN / ID toggle in the header, keeps the visitor on the equivalent page; no automatic redirect by IP (bad for SEO and for foreign buyers in Indonesia).
- Inquiries record the language the form was submitted in.

## Tech stack & hosting

Recommended: **Next.js + Payload CMS + PostgreSQL**, in one codebase on one VPS behind Cloudflare. Payload gives the admin dashboard, roles, media handling, versions, drafts, live preview and field-level localization out of the box, so the budget goes into the site, not into rebuilding a CMS.

### Recommended stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | Next.js (App Router), static generation + on-demand revalidation | Static-fast pages that still update within seconds of publishing; strong SEO tooling |
| CMS / dashboard | Payload CMS (runs inside the Next.js app) | Open source, self-hosted, no per-seat fees; built-in auth, roles, drafts, versions, localization, live preview |
| Database | PostgreSQL | Reliable, free, Payload has a first-class adapter |
| Styling | Tailwind CSS | Small CSS output, fast to match the mockup |
| Media storage | Local disk on the VPS to start; Cloudflare R2 (S3-compatible) when media grows | R2 has no egress fees |
| Image optimization | Sharp (via Payload/Next) to AVIF/WebP | Automatic sizes and formats |
| Email | Transactional service via SMTP/API (e.g. Resend, Brevo, or Amazon SES) | Notifications and auto-replies land in inboxes, not spam; set SPF/DKIM/DMARC |
| Anti-spam | Cloudflare Turnstile | Free, invisible |
| Hosting | Single cloud VPS (2 vCPU / 4 GB RAM is enough), Node + Postgres + Nginx/Caddy, PM2 or Docker | Predictable yearly cost; full control |
| CDN / DNS / SSL | Cloudflare (free) | Caching, DDoS protection, edge close to Indonesian visitors |
| Analytics | Google Analytics 4 + Search Console (or Plausible/Umami for a lighter, cookie-free option) | Lead and traffic tracking |
| Code & CI | GitHub + GitHub Actions (build, Lighthouse CI, deploy) | Repeatable deploys |

### Alternatives considered

| Option | Pros | Cons | Verdict |
| --- | --- | --- | --- |
| Next.js + Payload on VPS (recommended) | One codebase, fast, flexible, no licence fees, i18n built in | Needs someone comfortable with a Linux VPS | Best balance |
| Next.js on Vercel + Payload + managed Postgres (Supabase/Neon) | Zero server maintenance, preview deploys | Monthly fees per service, costs grow with traffic; data split across vendors | Good for prototyping, then move to VPS |
| Astro + headless CMS | Smallest JS, top speed | Separate CMS to host or pay for; more glue code for inquiries | Fine, but more moving parts |
| WordPress + custom theme | Familiar to many clients, huge plugin ecosystem | Slower without heavy caching, plugin security updates, harder to hit 90+ Lighthouse | Only if the client insists on WordPress |
| Custom-built dashboard | Exactly what's needed | Rebuilding auth, media, versions, i18n by hand; months of extra work | Not worth it |

Prototype on GitHub + Vercel for fast client review, then go live on the VPS for predictable annual cost.

## Data model

Eleven collections and globals cover the whole site; fields marked (L) are localizable for Indonesian later.

| Collection / global | Key fields |
| --- | --- |
| Global: Site Settings | logo, logo\_dark, company\_name, address (L), phone, whatsapp, email, office\_hours (L), social\_links\[\], footer\_text (L), notification\_emails\[\], auto\_reply\_template (L), analytics\_ids, default\_og\_image |
| Global: Navigation | items\[\] (label (L), link, order, visible), cta\_label (L), cta\_link |
| Pages (Home, About, Products index, Partners, News index, Contact, Privacy) | slug, sections\[\] as typed blocks (hero, value\_props, category\_grid, why\_us, stats, cta\_banner, rich\_text, gallery, certifications, partners\_strip, latest\_news), each with its own text (L) and images, seo{} |
| Product Categories | name (L), slug (L), description (L), image, icon, order, show\_on\_home, seo{} |
| Products | name (L), slug (L), category, cas\_number, grade, short\_description (L), description (L), gallery\[\], specs\[\] (property (L), value, unit), applications\[\] (L), packaging\[\] (L), documents\[\] (title (L), file), related\_products\[\], status, seo{} |
| Partners | name, logo, type, url, description (L), order, visible |
| News | title (L), slug (L), excerpt (L), body (L), cover, category, tags\[\], author, published\_at, status (draft/scheduled/published), related\_products\[\], seo{} |
| Inquiries | name, company, email, phone, country, type, products\[\], quantity, message, attachment, consent, source\_url, form\_origin, utm{}, language, status, assigned\_to, notes\[\], created\_at |
| Media | file, alt (L), caption (L), focal\_point, sizes (auto) |
| Users | name, email, role (admin/editor), active |
| Redirects | from, to, type (301/302) |

`seo{}` = meta\_title (L), meta\_description (L), og\_image, canonical, noindex.

## Non-functional requirements

### Security

- Admin login with strong password rules, rate-limited login, optional 2FA for admins.
- Role-based access enforced on the server, not only hidden in the UI.
- HTTPS everywhere, security headers (CSP, HSTS, X-Frame-Options), Cloudflare WAF basic rules.
- Form uploads stored outside the public folder and scanned for type; no executable files.
- Secrets in environment variables, never in the repository.
- Dependencies updated monthly; OS security updates automatic on the VPS.

### Accessibility

- WCAG 2.1 AA: colour contrast checked (white text on the red CTA and teal band must pass 4.5:1), visible focus states, keyboard-navigable menu and form, labelled form fields, error messages announced to screen readers.

### Analytics & tracking

- GA4 events: form\_start, form\_submit (by origin), click\_quote, click\_whatsapp, click\_phone, click\_email, file\_download.
- Cookie/consent banner only if non-essential cookies are used; a cookie-free analytics tool avoids it.

### Backups & reliability

- Daily automated Postgres backup + media backup, kept 30 days, stored off the VPS (e.g. R2 or another provider); restore tested before launch.
- Uptime monitoring with alert to email/WhatsApp (e.g. UptimeRobot free).
- Target uptime 99.5%.

### Browser & device support

- Last 2 versions of Chrome, Safari, Edge, Firefox; iOS Safari and Android Chrome.
- Breakpoints: 360, 768, 1024, 1440 px.

### Legal

- Privacy Policy page and consent checkbox, aligned with Indonesia's Personal Data Protection Law (UU PDP No. 27/2022).
- Only licensed or owned photography; stock images credited where required.

## Delivery phases & acceptance criteria

Estimated 7–9 weeks to v1 launch for one developer, assuming content and photos arrive by week 4; Indonesian adds roughly 1–2 weeks of dev plus translation time.

| Phase | Est. duration | Deliverables | Done when |
| --- | --- | --- | --- |
| 1. Discovery & content plan | 1 week | Confirmed sitemap, keyword map, content checklist, brand assets | Client signs off sitemap and content list |
| 2. Design finalization | 1–2 weeks | Hi-fi desktop + mobile for all page templates, dashboard field list | Client approves designs |
| 3. Build: frontend | 2–3 weeks | All templates responsive, components, animations | Matches approved design at 360/768/1440 px |
| 4. Build: dashboard & inquiries | 1–2 weeks (parallel) | Collections, roles, inquiry flow, emails, media | Admin can edit every section; test inquiry arrives in inbox and email |
| 5. Content entry & SEO | 1 week | Real copy, images, products, meta, schema | No lorem ipsum left; all SEO fields filled |
| 6. QA & launch | 1 week | Testing, performance tuning, backups, DNS, Search Console | All acceptance criteria below pass |
| 7. Phase 2: Indonesian | 1–2 weeks + translation | `/id/` routes, switcher, hreflang, translated content | ID pages indexed, no missing translations |

### Acceptance criteria (v1 launch)

- [ ] Nav shows About Us, Products, Partners, News (when 3+ articles), Contact and Get a Quote on desktop and mobile
- [ ] Every text and image visible on public pages can be changed from the dashboard, and the change appears live within 60 seconds of publishing
- [ ] Editor role cannot reach Site Settings or Users
- [ ] A form submission from Contact, Get a Quote, a product page and Partners each appears in Inquiries with the correct origin and pre-filled product
- [ ] Notification email and visitor auto-reply arrive and are not marked as spam
- [ ] Inquiries can be filtered, given a status, assigned, noted and exported to CSV
- [ ] Spam test (bot submission, honeypot filled) is blocked
- [ ] Lighthouse mobile: Performance 90+, SEO 100, Accessibility 95+, Best Practices 95+ on Home, a category, a product and an article
- [ ] sitemap.xml, robots.txt, canonical tags and JSON-LD validate (Google Rich Results Test passes)
- [ ] Changing a product slug creates a working 301 redirect
- [ ] Daily backup runs and a restore has been tested
- [ ] No lorem ipsum, broken links or missing alt text (crawl report clean)
- [ ] Content fields are stored as localizable, ready for Indonesian

## Open questions for Chemillion

- [ ] Exact brand colours, fonts and logo files (SVG) — or should we derive them from the mockup?
- [ ] Domain name and where DNS is managed today?
- [ ] Who receives inquiry notifications (one shared inbox, or per inquiry type)?
- [ ] How many products and categories at launch, and are TDS/SDS documents ready to publish?
- [ ] Partners page: are partner/principal logos cleared for public use?
- [ ] Will there be news content regularly (at least 1–2 articles/month)? If not, launch without News in the nav.
- [ ] WhatsApp click-to-chat button wanted? Which number?
- [ ] Certifications to show on About Us (ISO, halal, K3, others)?
- [ ] Photography: real facility/product photos available, or stock for v1?
- [ ] Hosting preference and who maintains the server after launch (maintenance retainer)?
- [ ] Analytics: Google Analytics 4, or a cookie-free tool to avoid a consent banner?
- [ ] Target date for Indonesian version?
