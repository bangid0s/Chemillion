import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook, PayloadRequest } from 'payload'

/** Publishing re-renders the static site on demand. Outside Next (seed script) there is nothing to refresh. */
const revalidateSite = async (req: PayloadRequest) => {
  if (req.context?.disableRevalidate) return
  try {
    const { revalidatePath } = await import('next/cache')
    revalidatePath('/', 'layout')
  } catch (err) {
    req.payload.logger.debug({ err, msg: 'Skipped revalidation' })
  }
}

const isVisibleChange = (doc: { _status?: string }, previous?: { _status?: string }) =>
  doc?._status === undefined || doc._status === 'published' || previous?._status === 'published'

export const revalidateCollection: CollectionAfterChangeHook = async ({ doc, previousDoc, req }) => {
  if (isVisibleChange(doc, previousDoc)) await revalidateSite(req)
  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  await revalidateSite(req)
  return doc
}

export const revalidateGlobal: GlobalAfterChangeHook = async ({ doc, previousDoc, req }) => {
  if (isVisibleChange(doc, previousDoc)) await revalidateSite(req)
  return doc
}
