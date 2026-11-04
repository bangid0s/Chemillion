/** Chemillion's red and teal folded-arrow mark. Inline SVG, so it stays crisp and needs no image request. */
export const BrandMark = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="60 28 775 730" aria-hidden="true" focusable="false">
    <path
      fill="#e1183a"
      d="M303 396V62c0-30 36-34 50-6 74 180 240 346 448 408 34 10 30 44-4 44H417v-54c0-34-27-58-62-58z"
    />
    <path
      fill="#0b7c84"
      d="M303 396H95c-36 0-42 34-8 44 124 40 240 150 285 272 12 34 45 28 45-4V508h-52c-35 0-62-27-62-58z"
    />
    <path
      fill="#fff"
      fillOpacity=".9"
      d="M303 396h52c35 0 62 24 62 58v54h-52c-35 0-62-27-62-58z"
    />
  </svg>
)
