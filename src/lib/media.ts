import type { Media } from '@/payload-types'

/** Uploads come back as ids at low depth; pages only render populated ones. */
export const asMedia = (value: unknown): Media | null =>
  value && typeof value === 'object' && 'url' in value ? (value as Media) : null
