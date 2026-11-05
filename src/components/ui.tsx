import Image from 'next/image'
import Link from 'next/link'
import type { Media } from '@/payload-types'
import { asMedia } from '@/lib/media'
import { Icon } from './Icon'

/** Renders `*teal words*` and line breaks from a dashboard headline. */
export const Headline = ({ text }: { text?: string | null }) => {
  if (!text) return null
  return (
    <>
      {text.split(/(\*[^*]+\*)/g).map((part, i) => {
        const highlighted = part.startsWith('*') && part.endsWith('*') && part.length > 1
        const content = (highlighted ? part.slice(1, -1) : part).split('\n')
        const lines = content.map((line, j) => (
          <span key={j}>
            {j > 0 && <br />}
            {line}
          </span>
        ))
        return highlighted ? (
          <span key={i} className="hl">
            {lines}
          </span>
        ) : (
          <span key={i}>{lines}</span>
        )
      })}
    </>
  )
}

export const plainHeadline = (text?: string | null) => (text ?? '').replace(/\*/g, '').replace(/\s*\n\s*/g, ' ')

type CmsImageProps = {
  media: unknown
  sizes: string
  className?: string
  priority?: boolean
  fill?: boolean
  width?: number
  height?: number
  quality?: 75 | 85
}

/** Next/Image serves AVIF/WebP in several widths; the admin's focal point keeps the subject inside masks and crops. */
export const CmsImage = ({ media, sizes, className, priority, fill = true, width, height, quality }: CmsImageProps) => {
  const file = asMedia(media) as Media | null
  if (!file?.url) return null
  const position =
    typeof file.focalX === 'number' && typeof file.focalY === 'number' ? `${file.focalX}% ${file.focalY}%` : undefined
  const isSvg = file.mimeType === 'image/svg+xml'
  const dimensions = fill ? { fill: true } : { width: width ?? file.width ?? 400, height: height ?? file.height ?? 300 }
  return (
    <Image
      src={file.url.replace(/^https?:\/\/[^/]+/, '')}
      alt={file.alt}
      sizes={sizes}
      className={className}
      priority={priority}
      quality={quality}
      unoptimized={isSvg}
      style={position ? { objectPosition: position } : undefined}
      {...dimensions}
    />
  )
}

export const Button = ({
  href,
  children,
  variant = 'primary',
  className = '',
}: {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'outline' | 'white'
  className?: string
}) => (
  <Link href={href} className={`btn btn--${variant} ${className}`}>
    {children}
    {variant !== 'outline' && <Icon name="arrow" className="btn__arrow" />}
  </Link>
)

export const SectionHead = ({
  eyebrow,
  title,
  as: Tag = 'h2',
}: {
  eyebrow?: string | null
  title?: string | null
  as?: 'h1' | 'h2'
}) => (
  <>
    {eyebrow && <p className="eyebrow">{eyebrow}</p>}
    <Tag className="title">
      <Headline text={title} />
    </Tag>
  </>
)

export const JsonLd = ({ data }: { data: unknown }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
)
