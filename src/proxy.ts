import { NextResponse, type NextRequest } from 'next/server'

/**
 * Language routing. English has no prefix: /about is served by the /[lang]=en pages behind the scenes.
 * /id/... and /zh/... go straight to their pages, and /en/... redirects to the unprefixed address,
 * so every page has exactly one URL per language.
 */
const PREFIXED = ['id', 'zh']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const first = pathname.split('/')[1]

  if (PREFIXED.includes(first)) return NextResponse.next()

  const url = request.nextUrl.clone()
  if (first === 'en') {
    url.pathname = pathname.slice(3) || '/'
    return NextResponse.redirect(url, 308)
  }
  url.pathname = `/en${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  // The dashboard, API, form endpoint, preview links, Next's own files and root files are not translated.
  matcher: ['/((?!admin|api|_next|inquiry|preview|sitemap\\.xml|robots\\.txt|icon\\.svg|favicon\\.ico).*)'],
}
