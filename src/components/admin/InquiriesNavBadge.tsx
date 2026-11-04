import Link from 'next/link'
import type { Payload } from 'payload'
import { Icon } from '../Icon'

export const InquiriesNavBadge = async ({ payload }: { payload: Payload }) => {
  const { totalDocs } = await payload.count({ collection: 'inquiries', where: { status: { equals: 'new' } } })
  return (
    <div className="ch-nav-top">
      <Link className="ch-nav-link" href="/admin">
        <Icon name="home" />
        Dashboard
      </Link>
      <Link className={`ch-nav-link${totalDocs > 0 ? ' has-new' : ''}`} href="/admin/collections/inquiries">
        <Icon name="inbox" />
        Inquiries inbox
        {totalDocs > 0 && <b aria-label={`${totalDocs} new inquiries`}>{totalDocs}</b>}
      </Link>
    </div>
  )
}
