import Link from 'next/link'
import type { Payload, User } from 'payload'
import { Icon } from '../Icon'

const DAY = 86_400_000
const CHART_DAYS = 14

const STATUSES = [
  { value: 'new', label: 'New' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'quoted', label: 'Quoted' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
] as const
const STATUS_LABEL: Record<string, string> = { ...Object.fromEntries(STATUSES.map((s) => [s.value, s.label])), spam: 'Spam' }

const ORIGIN_LABEL: Record<string, string> = { contact: 'Contact', quote: 'Get a Quote', product: 'Product page', partner: 'Partner' }

const PAGES = [
  { slug: 'home-page', label: 'Home' },
  { slug: 'about-page', label: 'About Us' },
  { slug: 'solutions-page', label: 'Solutions' },
  { slug: 'contact-page', label: 'Contact' },
  { slug: 'privacy-page', label: 'Privacy Policy' },
] as const

const inquiriesWhere = (query: string) => `/admin/collections/inquiries?${query}`
const statusHref = (status: string) => inquiriesWhere(`where[status][equals]=${status}`)

const fmtDate = (date: string | Date) =>
  new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

const ago = (date: string, now: number) => {
  const mins = Math.round((now - new Date(date).getTime()) / 60_000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  if (mins < 60 * 24) return `${Math.round(mins / 60)}h ago`
  if (mins < 60 * 24 * 7) return `${Math.round(mins / 60 / 24)}d ago`
  return fmtDate(date)
}

const dayKey = (d: Date) => d.toISOString().slice(0, 10)

export const DashboardHome = async ({ payload, user }: { payload: Payload; user?: User }) => {
  const now = Date.now()
  const today = new Date(new Date().setHours(0, 0, 0, 0))
  const since30 = new Date(now - 30 * DAY).toISOString()
  const since60 = new Date(now - 60 * DAY).toISOString()
  const chartStart = new Date(today.getTime() - (CHART_DAYS - 1) * DAY)
  const open = { status: { in: ['new', 'in_progress'] } }

  const [statusCounts, last30, prev30, unassigned, recentInquiries, latest, pages] =
    await Promise.all([
      Promise.all(STATUSES.map((s) => payload.count({ collection: 'inquiries', where: { status: { equals: s.value } } }))),
      payload.count({ collection: 'inquiries', where: { createdAt: { greater_than_equal: since30 }, status: { not_equals: 'spam' } } }),
      payload.count({
        collection: 'inquiries',
        where: { createdAt: { greater_than_equal: since60, less_than: since30 }, status: { not_equals: 'spam' } },
      }),
      payload.count({ collection: 'inquiries', where: { ...open, assignedTo: { exists: false } } }),
      payload.find({
        collection: 'inquiries',
        where: { createdAt: { greater_than_equal: chartStart.toISOString() }, status: { not_equals: 'spam' } },
        limit: 1000,
        pagination: false,
        depth: 0,
        select: { createdAt: true },
      }),
      payload.find({ collection: 'inquiries', limit: 6, sort: '-createdAt', depth: 0, where: { status: { not_equals: 'spam' } } }),
      Promise.all(
        PAGES.map(async (p) => ({ ...p, doc: await payload.findGlobal({ slug: p.slug, depth: 0, draft: true }) })),
      ),
    ])

  const counts = Object.fromEntries(STATUSES.map((s, i) => [s.value, statusCounts[i].totalDocs])) as Record<string, number>
  const pipelineTotal = STATUSES.reduce((sum, s) => sum + counts[s.value], 0)
  const decided = counts.won + counts.lost
  const winRate = decided ? Math.round((counts.won / decided) * 100) : null
  const delta = last30.totalDocs - prev30.totalDocs

  const perDay = new Map<string, number>()
  for (const doc of recentInquiries.docs) {
    const key = dayKey(new Date(new Date(doc.createdAt).setHours(0, 0, 0, 0)))
    perDay.set(key, (perDay.get(key) ?? 0) + 1)
  }
  const days = Array.from({ length: CHART_DAYS }, (_, i) => {
    const d = new Date(chartStart.getTime() + i * DAY)
    return { date: d, count: perDay.get(dayKey(d)) ?? 0 }
  })
  // A floor of 4 keeps one or two inquiries from drawing full-height bars.
  const peak = Math.max(4, ...days.map((d) => d.count))
  const chartTotal = days.reduce((sum, d) => sum + d.count, 0)

  const recent = pages
    .filter((p) => p.doc.updatedAt)
    .map((p) => ({
      kind: 'Page',
      label: p.label,
      at: p.doc.updatedAt as string,
      draft: (p.doc as { _status?: string })._status === 'draft',
      href: `/admin/globals/${p.slug}`,
    }))
    .sort((a, b) => b.at.localeCompare(a.at))
    .slice(0, 5)
  const pageDrafts = recent.filter((p) => p.draft).length

  const attention = [
    { count: counts.new, label: 'new inquiries to reply to', href: statusHref('new'), icon: 'inbox', urgent: true },
    { count: unassigned.totalDocs, label: 'open inquiries with no owner', href: inquiriesWhere('where[assignedTo][exists]=false'), icon: 'user' },
    { count: pageDrafts, label: pageDrafts === 1 ? 'page with unpublished changes' : 'pages with unpublished changes', href: recent.find((p) => p.draft)?.href ?? '/admin', icon: 'file' },
  ].filter((item) => item.count > 0)

  const name = (user as { name?: string } | undefined)?.name
  const isAdmin = (user as { role?: string } | undefined)?.role === 'admin'

  return (
    <section className="ch-dash" aria-labelledby="ch-dash-title">
      <header className="ch-dash__head">
        <div>
          <p className="ch-dash__date">
            {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
          <h2 id="ch-dash-title">Welcome back{name ? `, ${name}` : ''}</h2>
          <p className="ch-dash__summary">
            {counts.new > 0 ? (
              <>
                You have <Link href={statusHref('new')}>{counts.new} new {counts.new === 1 ? 'inquiry' : 'inquiries'}</Link> waiting
                for a reply.
              </>
            ) : (
              'Your inbox is clear. Nothing is waiting for a reply.'
            )}
          </p>
        </div>
        <div className="ch-dash__head-actions">
          <a className="ch-btn" href="/" target="_blank" rel="noopener noreferrer">
            <Icon name="external" />
            View website
          </a>
          <Link className="ch-btn ch-btn--primary" href="/admin/collections/inquiries">
            <Icon name="inbox" />
            Open inbox
          </Link>
        </div>
      </header>

      <div className="ch-kpis">
        <Link className={`ch-kpi${counts.new ? ' ch-kpi--alert' : ''}`} href={statusHref('new')}>
          <span className="ch-kpi__icon">
            <Icon name="inbox" />
          </span>
          <span className="ch-kpi__label">New inquiries</span>
          <strong className="ch-kpi__value">{counts.new}</strong>
          <span className="ch-kpi__meta">{counts.new ? 'Waiting for a first reply' : 'All caught up'}</span>
        </Link>
        <Link className="ch-kpi" href={statusHref('in_progress')}>
          <span className="ch-kpi__icon">
            <Icon name="clock" />
          </span>
          <span className="ch-kpi__label">In progress</span>
          <strong className="ch-kpi__value">{counts.in_progress}</strong>
          <span className="ch-kpi__meta">
            {unassigned.totalDocs ? `${unassigned.totalDocs} open without an owner` : 'Every open inquiry has an owner'}
          </span>
        </Link>
        <Link className="ch-kpi" href={inquiriesWhere(`where[createdAt][greater_than_equal]=${since30.slice(0, 10)}`)}>
          <span className="ch-kpi__icon">
            <Icon name="trend" />
          </span>
          <span className="ch-kpi__label">Last 30 days</span>
          <strong className="ch-kpi__value">{last30.totalDocs}</strong>
          <span className={`ch-kpi__meta ch-trend ch-trend--${delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat'}`}>
            {delta === 0 ? 'Same as the 30 days before' : `${delta > 0 ? '▲' : '▼'} ${Math.abs(delta)} vs the 30 days before`}
          </span>
        </Link>
        <Link className="ch-kpi" href={statusHref('quoted')}>
          <span className="ch-kpi__icon">
            <Icon name="file" />
          </span>
          <span className="ch-kpi__label">Quoted</span>
          <strong className="ch-kpi__value">{counts.quoted}</strong>
          <span className="ch-kpi__meta">{counts.quoted ? 'Waiting for the customer to decide' : 'No open quotes'}</span>
        </Link>
      </div>

      <div className="ch-dash__grid">
        <div className="ch-dash__main">
          <div className="ch-panel">
            <div className="ch-panel__head">
              <h3>Inquiries, last {CHART_DAYS} days</h3>
              <span className="ch-panel__aside">{chartTotal} received</span>
            </div>
            <div className="ch-chart-wrap">
            {chartTotal === 0 && <p className="ch-chart__empty">No inquiries in the last {CHART_DAYS} days</p>}
            <ol className="ch-chart" aria-label={`Inquiries per day over the last ${CHART_DAYS} days, ${chartTotal} in total`}>
              {days.map(({ date, count }) => {
                const label = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
                return (
                  <li key={dayKey(date)} title={`${label}: ${count}`}>
                    <span className="ch-chart__bar" style={{ height: `${Math.max(count ? 8 : 2, (count / peak) * 100)}%` }}>
                      {count > 0 && <span className="ch-chart__count">{count}</span>}
                    </span>
                    <span className="ch-chart__day" aria-hidden={date.getDay() !== 1 && date.getTime() !== today.getTime()}>
                      {date.getTime() === today.getTime() ? 'Today' : date.getDay() === 1 ? label : ''}
                    </span>
                    <span className="sr-only">
                      {label}: {count}
                    </span>
                  </li>
                )
              })}
            </ol>
            </div>

            <div className="ch-pipeline">
              <div className="ch-panel__head">
                <h4>Pipeline</h4>
                <span className="ch-panel__aside">{winRate === null ? 'No closed deals yet' : `${winRate}% win rate`}</span>
              </div>
              <div className="ch-pipeline__bar" aria-hidden="true">
                {pipelineTotal > 0 &&
                  STATUSES.map((s) =>
                    counts[s.value] ? (
                      <span key={s.value} className={`ch-status-bg--${s.value}`} style={{ flexGrow: counts[s.value] }} />
                    ) : null,
                  )}
              </div>
              <ul className="ch-pipeline__legend">
                {STATUSES.map((s) => (
                  <li key={s.value}>
                    <Link href={statusHref(s.value)}>
                      <i className={`ch-status-bg--${s.value}`} />
                      {s.label}
                      <b>{counts[s.value]}</b>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="ch-panel ch-panel--flush">
            <div className="ch-panel__head">
              <h3>Latest inquiries</h3>
              <Link className="ch-panel__link" href="/admin/collections/inquiries">
                View all
                <Icon name="arrow" />
              </Link>
            </div>
            {latest.docs.length === 0 ? (
              <div className="ch-empty">
                <span className="ch-empty__icon">
                  <Icon name="inbox" />
                </span>
                <p>
                  <strong>No inquiries yet</strong>
                  Submissions from the contact and quote form land here, ready to assign and follow up.
                </p>
                <a className="ch-btn" href="/contact" target="_blank" rel="noopener noreferrer">
                  <Icon name="external" />
                  Open the contact form
                </a>
              </div>
            ) : (
              <table className="ch-table">
                <thead>
                  <tr>
                    <th scope="col">From</th>
                    <th scope="col">Type</th>
                    <th scope="col">Status</th>
                    <th scope="col" className="ch-table__right">
                      Received
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {latest.docs.map((inq) => (
                    <tr key={inq.id} className={inq.status === 'new' ? 'is-new' : undefined}>
                      <td>
                        <Link className="ch-table__primary" href={`/admin/collections/inquiries/${inq.id}`}>
                          {inq.name}
                        </Link>
                        <span className="ch-table__sub">{inq.company}</span>
                      </td>
                      <td>
                        {inq.type}
                        <span className="ch-table__sub">{ORIGIN_LABEL[inq.formOrigin] ?? inq.formOrigin}</span>
                      </td>
                      <td>
                        <span className={`ch-pill ch-pill--${inq.status}`}>{STATUS_LABEL[inq.status] ?? inq.status}</span>
                      </td>
                      <td className="ch-table__right">
                        <time dateTime={inq.createdAt} title={fmtDate(inq.createdAt)}>
                          {ago(inq.createdAt, now)}
                        </time>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <aside className="ch-dash__side">
          <div className="ch-panel">
            <div className="ch-panel__head">
              <h3>Needs attention</h3>
            </div>
            {attention.length === 0 ? (
              <p className="ch-allclear">
                <Icon name="check" />
                Nothing needs attention right now.
              </p>
            ) : (
              <ul className="ch-attention">
                {attention.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className={item.urgent ? 'is-urgent' : undefined}>
                      <Icon name={item.icon} />
                      <span>
                        <b>{item.count}</b> {item.label}
                      </span>
                      <Icon name="chevron" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="ch-panel">
            <div className="ch-panel__head">
              <h3>Quick actions</h3>
            </div>
            <div className="ch-quick">
              <Link href="/admin/collections/product-categories">
                <Icon name="box" />
                Solutions
              </Link>
              <Link href="/admin/collections/media/create">
                <Icon name="image" />
                Upload media
              </Link>
              <Link href="/admin/globals/home-page">
                <Icon name="home" />
                Edit Home page
              </Link>
              {isAdmin && (
                <Link href="/admin/globals/site-settings">
                  <Icon name="settings" />
                  Site settings
                </Link>
              )}
              <Link href="/admin/globals/about-page">
                <Icon name="file" />
                Edit About page
              </Link>
            </div>
          </div>

          <div className="ch-panel">
            <div className="ch-panel__head">
              <h3>Recently edited</h3>
            </div>
            {recent.length === 0 ? (
              <p className="ch-muted">Nothing edited yet.</p>
            ) : (
              <ul className="ch-recent">
                {recent.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                    <span className="ch-recent__meta">
                      {item.kind}
                      {item.draft && <span className="ch-pill ch-pill--draft">Draft</span>}
                      <time dateTime={item.at} title={fmtDate(item.at)}>
                        {ago(item.at, now)}
                      </time>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>

      <h2 className="ch-dash__all">Everything in the dashboard</h2>
    </section>
  )
}
