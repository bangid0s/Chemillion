import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/url'

export const revalidate = 300

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString()
  return ['/', '/about', '/contact', '/privacy'].map((path) => ({ url: absoluteUrl(path), lastModified: now }))
}
