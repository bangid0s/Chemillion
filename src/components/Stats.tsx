import { StatCounter } from './StatCounter'

type Stat = { id?: string | null; number: number; suffix?: string | null; label: string }

export const Stats = ({ stats, className = '' }: { stats?: Stat[] | null; className?: string }) => {
  if (!stats?.length) return null
  return (
    <dl className={`stats ${className}`}>
      {stats.map((stat, i) => (
        <div key={stat.id ?? i} className="stats__item">
          <dt>{stat.label}</dt>
          <dd>
            <StatCounter value={stat.number} suffix={stat.suffix} />
          </dd>
        </div>
      ))}
    </dl>
  )
}
