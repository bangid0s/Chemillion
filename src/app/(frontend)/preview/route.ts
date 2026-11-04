import config from '@payload-config'
import { draftMode, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

/** Lets logged-in staff see unpublished changes. Everyone else is refused. */
export async function GET(request: Request) {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })
  if (!user) return new Response('Please log in to the dashboard first.', { status: 401 })

  const { origin, searchParams } = new URL(request.url)
  // Resolve like a browser would (it reads `/\evil.com` as `//evil.com`), and only follow same-origin targets.
  const target = new URL(searchParams.get('path') || '/', origin)
  const safePath = target.origin === origin ? `${target.pathname}${target.search}${target.hash}` : '/'
  ;(await draftMode()).enable()
  redirect(safePath)
}
