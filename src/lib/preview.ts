import { siteUrl } from './url'

/** Admin preview links go through /preview, which switches on draft mode for logged-in staff. */
export const previewUrl = (path: string) => `${siteUrl}/preview?path=${encodeURIComponent(path)}`
