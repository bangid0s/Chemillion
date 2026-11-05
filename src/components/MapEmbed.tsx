'use client'

import { useState } from 'react'
import { useT } from './LocaleProvider'

/** A static image first. Google Maps only loads on click, to protect page speed. */
export const MapEmbed = ({ embedUrl, children }: { embedUrl?: string | null; children: React.ReactNode }) => {
  const t = useT()
  const [loaded, setLoaded] = useState(false)
  if (loaded && embedUrl) {
    return <iframe className="map__frame" src={embedUrl} title={t.loadMap} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
  }
  if (!embedUrl) return <div className="map">{children}</div>
  return (
    <button type="button" className="map" onClick={() => setLoaded(true)}>
      {children}
      <span className="map__label">{t.loadMap}</span>
    </button>
  )
}
