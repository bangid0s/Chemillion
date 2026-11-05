import { redirectOrNotFound } from '@/lib/redirect'

type Props = { params: Promise<{ catchall: string[] }> }

/** Any unknown URL: follow the Redirects collection, otherwise a real 404. */
export default async function CatchAll({ params }: Props) {
  const { catchall } = await params
  return redirectOrNotFound(`/${catchall.join('/')}`)
}
