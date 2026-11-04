import type { CollectionAfterChangeHook } from 'payload'

/** Creates a 301 from the old URL whenever a published slug changes. */
export const slugRedirect =
  (buildPath: (doc: Record<string, unknown>, payload: unknown) => Promise<string | null> | string | null): CollectionAfterChangeHook =>
  async ({ doc, previousDoc, operation, req }) => {
    if (operation !== 'update' || !previousDoc?.slug || previousDoc.slug === doc.slug) return doc
    if (doc._status === 'draft') return doc

    const from = await buildPath(previousDoc, req.payload)
    const to = await buildPath(doc, req.payload)
    if (!from || !to || from === to) return doc

    // The URL is back in use (or would point at itself), so any redirect away from it must go.
    await req.payload.delete({ collection: 'redirects', where: { from: { equals: to } }, req })
    // Point earlier redirects at the new URL so visitors never hop twice.
    await req.payload.update({
      collection: 'redirects',
      where: { to: { equals: from } },
      data: { to },
      req,
    })
    const existing = await req.payload.find({
      collection: 'redirects',
      where: { from: { equals: from } },
      limit: 1,
      req,
    })
    if (existing.docs[0]) {
      await req.payload.update({ collection: 'redirects', id: existing.docs[0].id, data: { to, type: '301' }, req })
    } else {
      await req.payload.create({ collection: 'redirects', data: { from, to, type: '301' }, req })
    }
    return doc
  }
