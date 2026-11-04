import { notFound, permanentRedirect, redirect } from 'next/navigation'
import { findRedirect } from './cms'

/** Real 404 for unknown URLs, unless the Redirects collection knows where the page moved. */
export const redirectOrNotFound = async (path: string): Promise<never> => {
  const match = await findRedirect(path.replace(/\/$/, '') || '/')
  if (match) {
    if (match.type === '302') redirect(match.to)
    permanentRedirect(match.to)
  }
  notFound()
}
