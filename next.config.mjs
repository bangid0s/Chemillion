import { withPayload } from '@payloadcms/next/withPayload'

const isDev = process.env.NODE_ENV !== 'production'

const translate = 'https://translate.google.com https://translate.googleapis.com https://translate-pa.googleapis.com https://www.gstatic.com'

const csp = [
  "default-src 'self'",
  // Google Translate's hosts only come into play once a visitor picks a language other than English.
  `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval' " : ''}https://challenges.cloudflare.com https://www.googletagmanager.com ${translate}`,
  `style-src 'self' 'unsafe-inline' ${translate}`,
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  `connect-src 'self' https://www.google-analytics.com https://challenges.cloudflare.com ${translate}`,
  `frame-src 'self' https://www.google.com https://maps.google.com https://challenges.cloudflare.com ${translate}`,
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [480, 768, 1024, 1440, 1920, 2560],
    imageSizes: [64, 128, 256, 384],
    qualities: [75, 85],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    localPatterns: [{ pathname: '/api/media/file/**' }, { pathname: '/_next/static/**' }],
  },
  // Products, Partners, News and Search were removed. Old links and search results land on the closest page instead of a 404.
  async redirects() {
    return [
      { source: '/products', destination: '/#products', permanent: true },
      { source: '/products/:path*', destination: '/contact?origin=quote#inquiry', permanent: true },
      { source: '/partners', destination: '/about', permanent: true },
      { source: '/news', destination: '/', permanent: true },
      { source: '/news/:path*', destination: '/', permanent: true },
      { source: '/search', destination: '/', permanent: true },
    ]
  },
  async headers() {
    const shared = [
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
    ]
    return [
      { source: '/:path*', headers: shared },
      // The Payload admin needs its own script/style handling, so the CSP only covers the public site.
      { source: '/((?!admin|api).*)', headers: [{ key: 'Content-Security-Policy', value: csp }] },
      { source: '/admin/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
