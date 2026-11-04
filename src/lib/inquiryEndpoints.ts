import type { PayloadHandler, Where } from 'payload'
import * as qs from 'qs-esm'
import { isAdmin, isStaff } from '../access'

/** Stops spreadsheet apps from running a submitted value such as =HYPERLINK(...) as a formula. */
const csvCell = (value: unknown) => {
  let text = value === null || value === undefined ? '' : String(value)
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`
  return `"${text.replace(/"/g, '""')}"`
}

export const exportInquiriesCsv: PayloadHandler = async (req) => {
  if (!isStaff({ req })) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const query = qs.parse((req.url ?? '').split('?')[1] ?? '') as { where?: Where; search?: string }
  const where: Where = query.where ?? {}
  if (query.search) {
    const like = { like: query.search }
    where.or = [{ name: like }, { company: like }, { email: like }]
  }

  const { docs } = await req.payload.find({
    collection: 'inquiries',
    where,
    limit: 10000,
    sort: '-createdAt',
    depth: 1,
    req,
    overrideAccess: false,
  })

  const header = ['Date', 'Status', 'Origin', 'Type', 'Name', 'Company', 'Email', 'Phone', 'Country', 'Products', 'Quantity', 'Message', 'Assigned to', 'Source page', 'UTM source', 'UTM medium', 'UTM campaign']
  const rows = docs.map((d) => [
    d.createdAt,
    d.status,
    d.formOrigin,
    d.type,
    d.name,
    d.company,
    d.email,
    d.phone,
    d.country,
    (d.products ?? []).map((p) => (typeof p === 'object' ? p.name : p)).join('; '),
    d.quantity,
    d.message,
    typeof d.assignedTo === 'object' ? d.assignedTo?.name : d.assignedTo,
    d.sourceUrl,
    d.utm?.source,
    d.utm?.medium,
    d.utm?.campaign,
  ])
  const csv = [header, ...rows].map((r) => r.map(csvCell).join(',')).join('\r\n')

  return new Response(`﻿${csv}`, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="chemillion-inquiries-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  })
}

/** Data retention under the privacy policy: permanently removes inquiries older than the period in Site Settings. */
export const purgeOldInquiries: PayloadHandler = async (req) => {
  if (!isAdmin({ req })) {
    return Response.json({ error: 'Admins only' }, { status: 403 })
  }
  const settings = await req.payload.findGlobal({ slug: 'site-settings', depth: 0 })
  const months = settings.retentionMonths ?? 24
  const cutoff = new Date()
  cutoff.setMonth(cutoff.getMonth() - months)

  const { docs } = await req.payload.delete({
    collection: 'inquiries',
    where: { createdAt: { less_than: cutoff.toISOString() } },
    req,
  })
  return Response.json({ deleted: docs.length, months })
}
