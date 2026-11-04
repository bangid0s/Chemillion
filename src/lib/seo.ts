import type { Metadata } from 'next'
import { asMedia } from './cms'
import { absoluteUrl } from './url'

type SeoFields = {
  title?: string | null
  description?: string | null
  image?: unknown
  canonical?: string | null
  noindex?: boolean | null
}

type Args = {
  meta?: SeoFields | null
  /** Used when the SEO fields are empty: `{Name} | Chemillion`. */
  name: string
  description?: string | null
  path: string
  image?: unknown
  defaultImage?: unknown
  type?: 'website' | 'article'
  noindex?: boolean
}

const clip = (text: string, max = 155) => (text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text)

export const buildMetadata = ({ meta, name, description, path, image, defaultImage, type = 'website', noindex }: Args): Metadata => {
  const title = meta?.title || `${name} | Chemillion`
  const desc = meta?.description || clip((description || '').replace(/\*/g, ''))
  const media = asMedia(meta?.image) || asMedia(image) || asMedia(defaultImage)
  const images = media?.url ? [{ url: absoluteUrl(media.url), alt: media.alt }] : undefined
  const url = absoluteUrl(path)

  return {
    title: { absolute: title },
    description: desc || undefined,
    alternates: { canonical: meta?.canonical || url },
    robots: noindex || meta?.noindex ? { index: false, follow: true } : undefined,
    openGraph: { title, description: desc || undefined, url, siteName: 'Chemillion', type, images },
    twitter: { card: 'summary_large_image', title, description: desc || undefined, images },
  }
}
