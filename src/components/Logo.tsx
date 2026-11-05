import Link from 'next/link'
import { CmsImage } from './ui'
import { BrandMark } from './BrandMark'
import { asMedia } from '@/lib/media'

/** Shows the logo uploaded in Site Settings, or the built-in vector version until one is uploaded. */
export const Logo = ({ logo, className = '' }: { logo?: unknown; className?: string }) => {
  const file = asMedia(logo)
  return (
    <Link href="/" className={`logo notranslate ${className}`} translate="no">
      {file ? (
        <CmsImage media={file} sizes="240px" fill={false} className="logo__img" />
      ) : (
        <span className="logo__built-in">
          <span className="logo__word">
            Chemillion
            <BrandMark className="logo__mark" />
          </span>
          <span className="logo__tag">
            CHEMICAL<b>COMPANY</b>
          </span>
        </span>
      )}
    </Link>
  )
}
