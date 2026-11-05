'use client'

import { useEffect, useRef, useState } from 'react'
import { countries, dialCodes } from '@/i18n/countries'
import { localizeHref } from '@/i18n/config'
import { LocalLink as Link, useLocale, useT } from './LocaleProvider'
import type { Dictionary } from '@/i18n/dictionaries'
import { Icon } from './Icon'
import { track } from './Analytics'

type Props = {
  inquiryTypes: string[]
  turnstileSiteKey?: string
  thankYouTitle?: string | null
  thankYouText?: string | null
}

type Errors = Record<string, string>

const validate = (data: FormData, f: Dictionary['form']): Errors => {
  const errors: Errors = {}
  const str = (key: string) => String(data.get(key) ?? '').trim()
  for (const key of ['name', 'company', 'phone', 'type']) if (!str(key)) errors[key] = f.required
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str('email'))) errors.email = f.invalidEmail
  const message = str('message')
  if (message.length < 20 || message.length > 2000) errors.message = f.messageLength
  if (!data.get('consent')) errors.consent = f.consentRequired
  return errors
}

const Field = ({
  name,
  label,
  required,
  error,
  children,
}: {
  name: string
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) => (
  <div className={`field${error ? ' has-error' : ''}`}>
    <label htmlFor={name}>
      {label}
      {required && <span aria-hidden="true"> *</span>}
    </label>
    {children}
    {error && (
      <p className="field__error" id={`${name}-error`} role="alert">
        {error}
      </p>
    )}
  </div>
)

export const InquiryForm = ({ inquiryTypes, turnstileSiteKey, thankYouTitle, thankYouText }: Props) => {
  const t = useT()
  const f = t.form
  const locale = useLocale()
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')
  const [serverError, setServerError] = useState('')
  const [interest, setInterest] = useState('')
  const [origin, setOrigin] = useState('contact')
  const [utm, setUtm] = useState<Record<string, string>>({})
  const startedAt = useRef(Date.now())
  const started = useRef(false)

  // Quote buttons across the site arrive here with ?origin=&interest=, which fills in the form.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const fromOrigin = params.get('origin')
    if (fromOrigin && ['contact', 'quote', 'product', 'partner'].includes(fromOrigin)) setOrigin(fromOrigin)
    const fromInterest = params.get('interest')?.trim().slice(0, 300)
    if (fromInterest) setInterest(fromInterest)
    setUtm({
      source: params.get('utm_source') ?? '',
      medium: params.get('utm_medium') ?? '',
      campaign: params.get('utm_campaign') ?? '',
    })
  }, [])

  // The form only takes quote requests for now, so every inquiry is filed under the quote type.
  const type = inquiryTypes.find((o) => /quote/i.test(o)) ?? inquiryTypes[0] ?? 'Product quote'

  useEffect(() => {
    if (!turnstileSiteKey) return
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    script.async = true
    document.body.appendChild(script)
    return () => script.remove()
  }, [turnstileSiteKey])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const found = validate(data, f)
    setErrors(found)
    setServerError('')
    if (Object.keys(found).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)?.focus()
      return
    }
    setStatus('sending')
    data.set('elapsed', String(Date.now() - startedAt.current))
    data.set('sourceUrl', window.location.href)
    data.set('formOrigin', origin)
    data.set('language', locale)
    Object.entries(utm).forEach(([k, v]) => data.set(`utm_${k}`, v))
    try {
      const res = await fetch('/inquiry/submit', { method: 'POST', body: data })
      if (res.ok) {
        setStatus('done')
        track('form_submit', { form_origin: origin })
        window.history.pushState({}, '', localizeHref('/thank-you', locale))
        window.scrollTo({ top: form.getBoundingClientRect().top + window.scrollY - 120 })
        return
      }
      const body = await res.json().catch(() => ({}))
      if (body.errors) setErrors(body.errors)
      setServerError(res.status === 429 ? f.rateLimited : res.status === 422 ? f.tooFast : body.errors ? '' : f.serverError)
    } catch {
      setServerError(f.serverError)
    }
    setStatus('idle')
  }

  if (status === 'done') {
    return (
      <div className="form-done" role="status">
        <span className="icon-circle">
          <Icon name="check" />
        </span>
        <h3>{thankYouTitle || t.thankYouTitle}</h3>
        <p>{thankYouText || t.thankYouText}</p>
      </div>
    )
  }

  const describe = (name: string) => ({
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })

  return (
    <form
      className="inquiry-form"
      onSubmit={onSubmit}
      noValidate
      onFocusCapture={() => {
        if (!started.current) {
          started.current = true
          track('form_start', { form_origin: origin })
        }
      }}
    >
      <div className="form-grid">
        <Field name="name" label={f.fullName} required error={errors.name}>
          <input id="name" name="name" type="text" autoComplete="name" required {...describe('name')} />
        </Field>
        <Field name="company" label={f.company} required error={errors.company}>
          <input id="company" name="company" type="text" autoComplete="organization" required {...describe('company')} />
        </Field>
        <Field name="email" label={f.email} required error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" required {...describe('email')} />
        </Field>
        <Field name="phone" label={f.phone} required error={errors.phone}>
          <div className="phone-input">
            <select name="dialCode" defaultValue="+62" aria-label={f.countryCode}>
              {dialCodes.map((code) => (
                <option key={code}>{code}</option>
              ))}
            </select>
            <input id="phone" name="phone" type="tel" autoComplete="tel-national" required {...describe('phone')} />
          </div>
        </Field>
        <div className="form-grid__full">
          <Field name="interest" label={f.products}>
            <input
              id="interest"
              name="interest"
              type="text"
              maxLength={300}
              placeholder={f.productsPlaceholder}
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
            />
          </Field>
        </div>
        <Field name="quantity" label={f.quantity}>
          <input id="quantity" name="quantity" type="text" placeholder={f.quantityPlaceholder} />
        </Field>
        <Field name="country" label={f.country}>
          <select id="country" name="country" defaultValue="Indonesia">
            {countries.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
        <div className="form-grid__full">
          <Field name="message" label={f.message} required error={errors.message}>
            <textarea id="message" name="message" rows={5} maxLength={2000} required {...describe('message')} />
          </Field>
        </div>
      </div>
      <input type="hidden" name="type" value={type} />

      {/* Hidden from people; bots that fill it in are rejected. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">{f.honeypot}</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {turnstileSiteKey && <div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-size="flexible" />}

      <div className={`consent${errors.consent ? ' has-error' : ''}`}>
        <label>
          <input type="checkbox" name="consent" required {...describe('consent')} />
          <span>
            {f.consent} <Link href="/privacy">{f.privacyPolicy}</Link> *
          </span>
        </label>
        {errors.consent && (
          <p className="field__error" id="consent-error" role="alert">
            {errors.consent}
          </p>
        )}
      </div>

      {serverError && (
        <p className="form-error" role="alert">
          {serverError}
        </p>
      )}

      <button type="submit" className="btn btn--primary inquiry-form__submit" disabled={status === 'sending'}>
        {status === 'sending' ? f.sending : f.submit}
        <Icon name="arrow" className="btn__arrow" />
      </button>
    </form>
  )
}
