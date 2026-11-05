import type { SiteSetting } from '@/payload-types'
import { asMedia } from './cms'
import { absoluteUrl, siteUrl } from './url'

const logoUrl = (settings: SiteSetting) => {
  const logo = asMedia(settings.logo)
  return logo?.url ? absoluteUrl(logo.url) : `${siteUrl}/icon.svg`
}

export const organizationLd = (settings: SiteSetting) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: settings.companyName,
  url: siteUrl,
  logo: logoUrl(settings),
  email: settings.email ?? undefined,
  telephone: settings.phone ?? undefined,
  address: settings.address ?? undefined,
  sameAs: settings.socialLinks?.map((s) => s.url) ?? [],
})

export const websiteLd = (settings: SiteSetting) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: settings.companyName,
  url: siteUrl,
})

export const localBusinessLd = (settings: SiteSetting) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: settings.companyName,
  url: `${siteUrl}/contact`,
  image: logoUrl(settings),
  telephone: settings.phone ?? undefined,
  email: settings.email ?? undefined,
  address: settings.address ?? undefined,
  openingHours: settings.officeHours ?? undefined,
  geo:
    settings.latitude && settings.longitude
      ? { '@type': 'GeoCoordinates', latitude: settings.latitude, longitude: settings.longitude }
      : undefined,
})

export const breadcrumbLd = (items: { label: string; href?: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.label,
    item: item.href ? absoluteUrl(item.href) : undefined,
  })),
})
