/**
 * Builds the temporary placeholder images in seed/images from the design mockup.
 * The mockup's mark, badge and masks are removed from the photos, because the site draws those itself in SVG.
 * Delete this script and seed/images once real photography has been uploaded through the dashboard.
 */
import path from 'path'
import fs from 'fs'
import sharp from 'sharp'

const root = process.cwd()
const src = path.join(root, 'design homepage.PNG')
const out = path.join(root, 'seed', 'images')
fs.mkdirSync(out, { recursive: true })

const crop = async ([left, top, width, height]) => {
  const { data, info } = await sharp(src).extract({ left, top, width, height }).removeAlpha().raw().toBuffer({ resolveWithObject: true })
  return { data: Buffer.from(data), width: info.width, height: info.height }
}

const inPoly = (x, y, poly) => {
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i]
    const [xj, yj] = poly[j]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside
  }
  return inside
}

const distToSegment = (x, y, [ax, ay], [bx, by]) => {
  const t = Math.max(0, Math.min(1, ((x - ax) * (bx - ax) + (y - ay) * (by - ay)) / ((bx - ax) ** 2 + (by - ay) ** 2)))
  return Math.hypot(x - (ax + t * (bx - ax)), y - (ay + t * (by - ay)))
}

/** Fills masked pixels: first interpolated across the gap from all four sides, then smoothed by repeated averaging. */
const diffuse = (img, isMasked, passes = 120) => {
  const { data, width, height } = img
  const masked = []
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) if (isMasked(x, y)) masked.push([x, y])
  const flag = new Uint8Array(width * height)
  for (const [x, y] of masked) flag[y * width + x] = 1
  const original = Buffer.from(data)
  for (const [x, y] of masked) {
    const samples = []
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      let nx = x + dx
      let ny = y + dy
      let dist = 1
      while (nx >= 0 && ny >= 0 && nx < width && ny < height && flag[ny * width + nx]) {
        nx += dx
        ny += dy
        dist++
      }
      if (nx >= 0 && ny >= 0 && nx < width && ny < height) samples.push([(ny * width + nx) * 3, 1 / dist])
    }
    const total = samples.reduce((sum, [, w]) => sum + w, 0)
    for (let c = 0; c < 3; c++) {
      data[(y * width + x) * 3 + c] = samples.reduce((sum, [i, w]) => sum + original[i + c] * w, 0) / total
    }
  }
  for (let pass = 0; pass < passes; pass++) {
    for (const [x, y] of masked) {
      const i = (y * width + x) * 3
      for (let c = 0; c < 3; c++) {
        let sum = 0
        let n = 0
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const nx = x + dx
          const ny = y + dy
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue
          sum += data[(ny * width + nx) * 3 + c]
          n++
        }
        data[i + c] = sum / n
      }
    }
  }
}

const save = async (img, name, targetWidth) =>
  sharp(img.data, { raw: { width: img.width, height: img.height, channels: 3 } })
    .resize(targetWidth, null, { kernel: 'lanczos3' })
    .sharpen({ sigma: 0.8 })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(out, name))

// Hero: mockup box (400, 74, 624, 471)
{
  const img = await crop([400, 74, 624, 471])
  const left = [[0, 0], [100, 0], [208, 133], [135, 133], [117, 151], [117, 348], [242, 471], [0, 471]]
  const { data, width, height } = img
  // Nothing of the photo survives under the mockup's pale glass, so continue the visible photo in a mirror.
  for (let y = 0; y < height; y++) {
    let edge = 0
    while (edge < width - 1 && inPoly(edge, y, left)) edge++
    for (let x = 0; x < edge; x++) {
      const from = Math.min(width - 1, edge + (edge - x) + 2)
      for (let c = 0; c < 3; c++) data[(y * width + x) * 3 + c] = data[(y * width + from) * 3 + c]
    }
  }
  // Only the mark's own pixels, grown slightly, so the background between its curves is kept.
  const red = [[372, 8], [392, 8], [512, 118], [512, 140], [372, 140]]
  const teal = [[310, 102], [408, 102], [408, 198], [388, 198]]
  const onMark = new Uint8Array(width * height)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (!inPoly(x, y, red) && !inPoly(x, y, teal)) continue
      const i = (y * width + x) * 3
      const [r, g, b] = [data[i], data[i + 1], data[i + 2]]
      const isRed = r > 110 && r > g + 50
      const isTeal = r < 70 && g > r + 40 && b < g + 45
      const isLeaf = x >= 374 && x <= 406 && y >= 103 && y <= 135
      if (isRed || isTeal || isLeaf) onMark[y * width + x] = 1
    }
  }
  const grown = new Uint8Array(onMark)
  const GROW = 4
  for (let y = GROW; y < height - GROW; y++) {
    for (let x = GROW; x < width - GROW; x++) {
      if (!onMark[y * width + x]) continue
      for (let dy = -GROW; dy <= GROW; dy++) for (let dx = -GROW; dx <= GROW; dx++) grown[(y + dy) * width + x + dx] = 1
    }
  }
  diffuse(img, (x, y) => grown[y * width + x] === 1 || (x > 420 && x < 582 && y > 322 && y < 438) || distToSegment(x, y, [181, 102], [430, 406]) < 4.5)
  // The mirrored part reads as out-of-focus background once it is heavily blurred.
  const blurred = await sharp(data, { raw: { width, height, channels: 3 } }).blur(16).raw().toBuffer()
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (!inPoly(x, y, left)) continue
      for (let c = 0; c < 3; c++) data[(y * width + x) * 3 + c] = blurred[(y * width + x) * 3 + c]
    }
  }
  await save(img, 'hero.jpg', 1872)
}

// Why Chemillion: mockup box (0, 920, 505, 350)
{
  const img = await crop([0, 920, 505, 350])
  const { data, width, height } = img
  const band = [[0, 98], [222, 352], [0, 352]]
  const teal = [0, 71, 77]
  const alpha = 0.62
  const px = (x, y, c) => (y * width + x) * 3 + c
  // The mockup's teal overlay is semi-transparent, so the photo underneath can be recovered from it.
  for (let y = 98; y < 312; y++) {
    for (let x = 0; x < width; x++) {
      if (!inPoly(x, y, band) || inPoly(x, y, [[0, 182], [114, 312], [0, 312]])) continue
      const rgb = [0, 1, 2].map((c) => Math.max(0, Math.min(255, (data[px(x, y, c)] - alpha * teal[c]) / (1 - alpha))))
      // Pull the remaining teal cast towards neutral grey steel.
      const grey = (rgb[0] + rgb[1] + rgb[2]) / 3
      for (let c = 0; c < 3; c++) data[px(x, y, c)] = grey * 0.8 + rgb[c] * 0.2
    }
  }
  // Below the photo and under the pale triangle there is no picture left: mirror upwards.
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const blank = y >= 312 || inPoly(x, y, [[0, 182], [114, 312], [0, 312]])
      if (!blank) continue
      const from = Math.max(0, 2 * Math.min(y, 300) - y - 40)
      for (let c = 0; c < 3; c++) data[px(x, y, c)] = data[px(x, from, c)]
    }
  }
  await save(img, 'plant.jpg', 1515)
}

// A clean inner crop of the plant for pages without the Why section's mask
await save(await crop([118, 924, 228, 214]), 'facility.jpg', 1140)

// CTA banner: mockup box (0, 1277, 212, 116)
await save(await crop([0, 1277, 212, 116]), 'cta.jpg', 848)

// Category cards
const cats = {
  'industrial-chemicals': [58, 733, 177, 113],
  'specialty-chemicals': [247, 733, 172, 113],
  'raw-materials': [431, 733, 164, 113],
  'laboratory-reagents': [607, 733, 174, 113],
  'other-products': [793, 733, 175, 113],
}
for (const [name, box] of Object.entries(cats)) await save(await crop(box), `${name}.jpg`, 900)

// Neutral stand-ins for logos and the map
const svgImage = (name, svg) => sharp(Buffer.from(svg)).png().toFile(path.join(out, name))
for (let i = 1; i <= 3; i++) {
  await svgImage(
    `certification-${i}.png`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240"><circle cx="120" cy="120" r="112" fill="#fff" stroke="#0f6b70" stroke-width="10"/><circle cx="120" cy="120" r="84" fill="none" stroke="#0f6b70" stroke-width="3"/><text x="120" y="138" text-anchor="middle" font-family="Arial,sans-serif" font-size="56" font-weight="700" fill="#0f6b70">C${i}</text></svg>`,
  )
}
const streets = Array.from({ length: 11 }, (_, i) => `<path d="M${i * 110 - 60} 0 L${i * 110 + 60} 900" stroke="#fff" stroke-width="${i % 3 ? 7 : 16}"/><path d="M0 ${i * 90 - 40} L1200 ${i * 90 + 50}" stroke="#fff" stroke-width="${i % 4 ? 7 : 18}"/>`).join('')
await svgImage(
  'map.png',
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900"><rect width="1200" height="900" fill="#e4ebee"/>${streets}<path d="M600 300a90 90 0 0 0-90 90c0 66 90 170 90 170s90-104 90-170a90 90 0 0 0-90-90Zm0 124a34 34 0 1 1 0-68 34 34 0 0 1 0 68Z" fill="#e1183a"/></svg>`,
)

console.log('Placeholders written to seed/images')
