'use client'

import { useAuth } from '@payloadcms/ui'
import { useState } from 'react'

/** CSV export follows the list's current filters and search. */
export const InquiryListActions = () => {
  const { user } = useAuth()
  const [message, setMessage] = useState('')

  const exportCsv = () => {
    window.location.href = `/api/inquiries/export${window.location.search}`
  }

  const purge = async () => {
    if (!window.confirm('Permanently delete inquiries older than the retention period in Site Settings? This cannot be undone.')) return
    const res = await fetch('/api/inquiries/purge', { method: 'POST', credentials: 'include' })
    const body = await res.json()
    setMessage(res.ok ? `Deleted ${body.deleted} inquiries older than ${body.months} months.` : body.error)
  }

  return (
    <div className="ch-actions">
      <button type="button" className="ch-btn ch-btn--primary" onClick={exportCsv}>
        Export to CSV
      </button>
      {(user as { role?: string } | null)?.role === 'admin' && (
        <button type="button" className="ch-btn ch-btn--danger" onClick={purge}>
          Delete expired inquiries
        </button>
      )}
      {message && <span role="status">{message}</span>}
    </div>
  )
}
