import type { News, Product, SiteSetting } from '@/payload-types'
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

export const productLd = (product: Product, settings: SiteSetting) => {
  const image = asMedia(product.gallery?.[0]?.image)
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription ?? undefined,
    image: image?.url ? absoluteUrl(image.url) : undefined,
    brand: { '@type': 'Brand', name: settings.companyName },
    additionalProperty: [
      product.casNumber && { '@type': 'PropertyValue', name: 'CAS number', value: product.casNumber },
      product.grade && { '@type': 'PropertyValue', name: 'Grade', value: product.grade },
    ].filter(Boolean),
  }
}

export const articleLd = (article: News, settings: SiteSetting) => {
  const cover = asMedia(article.cover)
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    image: cover?.url ? [absoluteUrl(cover.url)] : undefined,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { '@type': article.author ? 'Person' : 'Organization', name: article.author || settings.companyName },
  }
}
