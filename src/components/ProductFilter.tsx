'use client'

import { useState } from 'react'
import { t } from '@/i18n/en'

type Entry = { id: string | number; applications: string[]; card: React.ReactNode }

export const FILTER_THRESHOLD = 12

/** Application filter for long categories. Every card stays in the HTML, so search engines still see them all. */
export const ProductFilter = ({ entries }: { entries: Entry[] }) => {
  const [active, setActive] = useState<string | null>(null)
  const options = [...new Set(entries.flatMap((e) => e.applications))].sort()

  return (
    <>
      <div className="chips" role="group" aria-label={t.filterByApplication}>
        <button type="button" className="chip" aria-pressed={active === null} onClick={() => setActive(null)}>
          {t.all}
        </button>
        {options.map((option) => (
          <button key={option} type="button" className="chip" aria-pressed={active === option} onClick={() => setActive(option)}>
            {option}
          </button>
        ))}
      </div>
      <div className="grid grid--3">
        {entries.map((entry) => (
          <div key={entry.id} hidden={active !== null && !entry.applications.includes(active)}>
            {entry.card}
          </div>
        ))}
      </div>
    </>
  )
}
