'use client'

import { useState } from 'react'
import type { Media } from '@/payload-types'
import { CmsImage } from './ui'

export const ProductGallery = ({ images }: { images: Media[] }) => {
  const [active, setActive] = useState(0)
  if (!images.length) return <div className="gallery gallery--empty" />
  return (
    <div className="gallery">
      <div className="gallery__main">
        <CmsImage media={images[active]} priority sizes="(max-width: 1023px) 100vw, 50vw" />
      </div>
      {images.length > 1 && (
        <div className="gallery__thumbs">
          {images.map((image, i) => (
            <button
              key={image.id}
              type="button"
              className="gallery__thumb"
              aria-pressed={i === active}
              aria-label={image.alt}
              onClick={() => setActive(i)}
            >
              <CmsImage media={image} sizes="96px" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
