'use client'

import { useFormFields } from '@payloadcms/ui'

export const InquiryContactActions = () => {
  const email = useFormFields(([fields]) => fields.email?.value as string | undefined)
  const phone = useFormFields(([fields]) => fields.phone?.value as string | undefined)
  const name = useFormFields(([fields]) => fields.name?.value as string | undefined)
  const digits = (phone ?? '').replace(/\D/g, '')

  return (
    <div className="ch-actions">
      {email && (
        <a className="ch-btn ch-btn--primary" href={`mailto:${email}?subject=${encodeURIComponent('Your inquiry to Chemillion')}&body=${encodeURIComponent(`Hello ${name ?? ''},\n\n`)}`}>
          Reply by email
        </a>
      )}
      {digits && (
        <a className="ch-btn" href={`https://wa.me/${digits}`} target="_blank" rel="noreferrer">
          WhatsApp
        </a>
      )}
    </div>
  )
}
