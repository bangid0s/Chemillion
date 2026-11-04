import Link from 'next/link'
import { t } from '@/i18n/en'

/** Numbered, crawlable links rather than infinite scroll. */
export const Pagination = ({ page, totalPages }: { page: number; totalPages: number }) => {
  if (totalPages < 2) return null
  const href = (n: number) => (n === 1 ? '/news' : `/news/page/${n}`)
  return (
    <nav className="pagination" aria-label={t.page}>
      {page > 1 && (
        <Link href={href(page - 1)} rel="prev">
          {t.previous}
        </Link>
      )}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <Link key={n} href={href(n)} aria-current={n === page ? 'page' : undefined}>
          {n}
        </Link>
      ))}
      {page < totalPages && (
        <Link href={href(page + 1)} rel="next">
          {t.next}
        </Link>
      )}
    </nav>
  )
}
