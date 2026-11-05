import { defaultLocale, isLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getClient, getSettings } from '@/lib/cms'
import { allowSubmission } from '@/lib/rateLimit'
import { sniffFileType } from '@/lib/sniffFileType'

const MIN_ELAPSED_MS = 3000
const MAX_FILE = 5 * 1024 * 1024
const ORIGINS = ['contact', 'quote', 'product', 'partner'] as const
type Origin = (typeof ORIGINS)[number]

const verifyTurnstile = async (token: string, ip: string) => {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
      signal: AbortSignal.timeout(5000),
    })
    return Boolean((await res.json()).success)
  } catch {
    // Cloudflare unreachable: let the inquiry through rather than lose it; honeypot, timer and rate limit still apply.
    return true
  }
}

/** The one form behind Contact, Get a Quote and the Home page's category cards. Saved first, emailed second. */
export async function POST(request: Request) {
  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return Response.json({ error: 'Invalid form' }, { status: 400 })
  }

  const str = (key: string, max = 300) => String(form.get(key) ?? '').trim().slice(0, max)
  // The visitor's language: their error messages and auto-reply are in it, and the team sees it on the inquiry.
  const language: Locale = isLocale(str('language', 5)) ? (str('language', 5) as Locale) : defaultLocale
  const f = getDictionary(language).form
  // Only a header our own proxy overwrites can be trusted; the left of x-forwarded-for is whatever the client sent.
  const trusted = process.env.CLIENT_IP_HEADER
  const ip = (trusted ? request.headers.get(trusted) : request.headers.get('x-forwarded-for')?.split(',').at(-1))?.trim() || 'unknown'

  // A filled honeypot is a bot. It gets a normal-looking reply and nothing is stored.
  if (str('website')) return Response.json({ ok: true })
  if (Number(form.get('elapsed') ?? 0) < MIN_ELAPSED_MS) return Response.json({ error: 'too fast' }, { status: 422 })
  if (!allowSubmission(ip)) return Response.json({ error: 'rate limited' }, { status: 429 })
  if (!(await verifyTurnstile(str('cf-turnstile-response', 4000), ip))) return Response.json({ error: 'captcha' }, { status: 400 })

  const message = String(form.get('message') ?? '').trim()
  const errors: Record<string, string> = {}
  for (const key of ['name', 'company', 'phone', 'type']) if (!str(key)) errors[key] = f.required
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str('email'))) errors.email = f.invalidEmail
  if (message.length < 20 || message.length > 2000) errors.message = f.messageLength
  if (!form.get('consent')) errors.consent = f.consentRequired

  const file = form.get('attachment')
  let upload: { data: Buffer; mimetype: string; name: string; size: number } | null = null
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_FILE) {
      errors.attachment = f.fileSize
    } else {
      const data = Buffer.from(await file.arrayBuffer())
      // Trust the file's real bytes rather than the browser's claim about them.
      const mimetype = sniffFileType(data)
      if (!mimetype) errors.attachment = f.fileType
      else upload = { data, mimetype, name: file.name.replace(/[^\w.-]+/g, '_').slice(-100), size: file.size }
    }
  }
  if (Object.keys(errors).length) return Response.json({ errors }, { status: 400 })

  const payload = await getClient()
  const originValue = str('formOrigin')
  const formOrigin: Origin = (ORIGINS as readonly string[]).includes(originValue) ? (originValue as Origin) : 'contact'
  // A rejected file must never cost us the inquiry itself, so it only leaves a note for the team.
  let attachmentId: number | undefined
  let attachmentProblem = false
  if (upload) {
    try {
      attachmentId = (await payload.create({ collection: 'inquiry-attachments', data: {}, file: upload })).id
    } catch (err) {
      attachmentProblem = true
      payload.logger.error({ err, msg: 'Inquiry attachment could not be stored' })
    }
  }

  const inquiry = await payload.create({
    collection: 'inquiries',
    data: {
      name: str('name'),
      company: str('company'),
      email: str('email'),
      phone: `${str('dialCode', 6)} ${str('phone')}`.trim(),
      country: str('country'),
      type: str('type'),
      productInterest: str('interest'),
      quantity: str('quantity'),
      message,
      attachment: attachmentId,
      notes: attachmentProblem ? [{ text: 'The visitor attached a file, but it could not be stored. Please ask them to resend it.' }] : undefined,
      consent: true,
      status: 'new',
      formOrigin,
      sourceUrl: str('sourceUrl', 1000),
      language,
      ip,
      utm: { source: str('utm_source'), medium: str('utm_medium'), campaign: str('utm_campaign') },
    },
  })

  // The inquiry is safely stored, so an email failure must not lose it or fail the visitor.
  try {
    const settings = await getSettings(language)
    const to = settings.notificationEmails?.map((n) => n.email) ?? []
    if (to.length) {
      await payload.sendEmail({
        to,
        replyTo: inquiry.email,
        subject: `New inquiry (${inquiry.type}) from ${inquiry.name}, ${inquiry.company}`,
        text: [
          `Name: ${inquiry.name}`,
          `Company: ${inquiry.company}`,
          `Email: ${inquiry.email}`,
          `Phone: ${inquiry.phone}`,
          `Country: ${inquiry.country}`,
          `Type: ${inquiry.type}`,
          `Origin: ${inquiry.formOrigin}`,
          `Product(s) of interest: ${inquiry.productInterest ?? ''}`,
          `Quantity: ${inquiry.quantity}`,
          '',
          inquiry.message,
          '',
          `Open in dashboard: ${new URL(request.url).origin}/admin/collections/inquiries/${inquiry.id}`,
        ].join('\n'),
      })
    }
    if (settings.autoReplyBody) {
      await payload.sendEmail({
        to: inquiry.email,
        subject: settings.autoReplySubject || `Thank you for contacting ${settings.companyName}`,
        text: settings.autoReplyBody.replace(/\{name\}/g, inquiry.name),
      })
    }
  } catch (err) {
    payload.logger.error({ err, msg: `Inquiry ${inquiry.id} saved, but sending email failed` })
  }

  return Response.json({ ok: true })
}
