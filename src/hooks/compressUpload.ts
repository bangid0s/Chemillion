import fs from 'fs/promises'
import type { CollectionBeforeOperationHook } from 'payload'
import sharp from 'sharp'

/** Every photo in the Media Library is kept at or under this size, so the library and the site stay light. */
export const MAX_IMAGE_BYTES = 125 * 1024

const COMPRESSIBLE = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
const MAX_WIDTH = 2400
const MIN_WIDTH = 1200
const QUALITIES = [82, 76, 70, 64, 58]

/**
 * Re-encodes an image as a progressive JPEG at the highest quality that fits within `maxBytes`. It first lowers the
 * quality a little, then the width, so detail is kept where it shows. Returns null when the image already fits and
 * `force` is not set.
 *
 * Why JPEG: Payload stores JPEGs exactly as given (it re-saves every WebP at its own quality, which can push a file back
 * over the limit), and the original is what link previews on WhatsApp, Facebook and LinkedIn show, which all read
 * JPEG. Visitors still get AVIF/WebP copies sized for their screen from Next.js.
 */
export const compressImage = async (input: Buffer, maxBytes = MAX_IMAGE_BYTES, force = false): Promise<Buffer | null> => {
  if (input.length <= maxBytes && !force) return null
  const { width: original = MAX_WIDTH } = await sharp(input).metadata()
  let width = Math.min(original, MAX_WIDTH)
  let best: Buffer | null = null
  while (true) {
    for (const quality of QUALITIES) {
      // `rotate()` applies the camera's orientation before the metadata is dropped.
      const out = await sharp(input)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .flatten({ background: '#ffffff' })
        .jpeg({ quality, mozjpeg: true, progressive: true })
        .toBuffer()
      if (!best || out.length < best.length) best = out
      if (out.length <= maxBytes) return out
    }
    if (width <= MIN_WIDTH) return best
    width = Math.max(MIN_WIDTH, Math.round(width * 0.85))
  }
}

/**
 * Uploaded photos (JPEG, PNG, AVIF) larger than 125 KB, and every WebP, are stored as JPEGs of at most 125 KB. Smaller
 * JPEG, PNG and AVIF files, and SVG, GIF and PDF files, are stored as they are.
 */
export const compressUpload: CollectionBeforeOperationHook = async ({ args, operation, req }) => {
  if (operation !== 'create' && operation !== 'update') return args
  const file = req.file
  if (!file || !COMPRESSIBLE.has(file.mimetype)) return args
  const input = file.data?.length ? file.data : file.tempFilePath ? await fs.readFile(file.tempFilePath) : null
  if (!input) return args
  try {
    const out = await compressImage(input, MAX_IMAGE_BYTES, file.mimetype === 'image/webp')
    if (!out) return args
    req.file = {
      ...file,
      data: out,
      size: out.length,
      mimetype: 'image/jpeg',
      name: file.name.replace(/\.[^.]+$/, '') + '.jpg',
      tempFilePath: undefined,
    }
  } catch (err) {
    // An image sharp cannot read is stored as uploaded rather than rejected.
    req.payload.logger.warn({ err, msg: `Could not compress ${file.name}; stored it as uploaded.` })
  }
  return args
}
