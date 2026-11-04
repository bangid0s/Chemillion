/**
 * The mockup's diagonal cuts, built in SVG rather than baked into photos, so an admin can swap any image
 * without breaking the shape. All coordinates are mockup pixels inside a frame of fixed proportions: the photo's
 * clip and the overlays share these paths, so they stay aligned at every screen width.
 */

const HERO_W = 624
const HERO_H = 471
const WHY_W = 505
const WHY_H = 350

/** The glass panel's outer edge, shared by the photo's clip and the panel itself. */
const HERO_OUTER_EDGE = 'L29 194Q12 171 32 148L70 112Q80 102 94 102'
const HERO_PHOTO = `M98 0H${HERO_W}V${HERO_H}H240${HERO_OUTER_EDGE}H181Z`
const HERO_GLASS = `M94 102H181L206 133H133Q115 133 115 151V346L240 ${HERO_H}${HERO_OUTER_EDGE}Z`
const WHY_PHOTO = 'M0 0H331Q343 0 352 7L479 162Q489 175 479 189L350 312H0Z'

/** The clip definitions the masked `<img>` elements refer to. Rendered once per page by the root layout. */
export const ShapeDefs = () => (
  <svg width="0" height="0" className="shape-defs" aria-hidden="true" focusable="false">
    <defs>
      <clipPath id="clip-hero" clipPathUnits="objectBoundingBox">
        <path transform={`scale(${1 / HERO_W} ${1 / HERO_H})`} d={HERO_PHOTO} />
      </clipPath>
      <clipPath id="clip-why" clipPathUnits="objectBoundingBox">
        <path transform={`scale(${1 / WHY_W} ${1 / WHY_H})`} d={WHY_PHOTO} />
      </clipPath>
    </defs>
  </svg>
)

export const HeroOverlay = () => (
  <svg className="hero__overlay" viewBox={`0 0 ${HERO_W} ${HERO_H}`} aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="hero-band" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#f6f7f8" />
        <stop offset="1" stopColor="#e9ecef" />
      </linearGradient>
      <linearGradient id="hero-glass" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stopColor="#fff" stopOpacity=".97" />
        <stop offset=".55" stopColor="#f3f5f7" stopOpacity=".95" />
        <stop offset="1" stopColor="#e8ecf0" stopOpacity=".72" />
      </linearGradient>
    </defs>
    <path d="M0 0H98L181 102H94Q80 102 70 112Z" fill="url(#hero-band)" />
    <path d={HERO_GLASS} fill="url(#hero-glass)" />
    <path d="M181 102 426 401" stroke="#fff" strokeOpacity=".9" strokeWidth="3.5" fill="none" />
  </svg>
)

export const WhyOverlay = () => (
  <svg className="why__overlay" viewBox={`0 0 ${WHY_W} ${WHY_H}`} aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="why-floor" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#eef0f2" />
        <stop offset="1" stopColor="#fbfbfc" />
      </linearGradient>
    </defs>
    <path d="M0 185 150 350H0Z" fill="url(#why-floor)" />
    <path d="M186 312H350L315 350H222Z" fill="#f4f5f7" />
    <path d="M0 98 220 350H165Q153 350 145 341L0 185Z" fill="#00474d" fillOpacity=".74" />
    <path d="M186 312 220 350H165Q153 350 145 341L111 312Z" fill="#0c7078" />
    <path d="M410 251Q410 241 416 247L503 349H425Q410 349 410 334Z" fill="#e2183b" />
  </svg>
)

export const CtaAccent = () => (
  <svg className="cta__accent" viewBox="0 0 120 58" aria-hidden="true" focusable="false">
    <path d="M6 58 56 6Q60 1 64 5L92 36Q96 41 94 46L88 58Z" fill="#0b7880" />
  </svg>
)
