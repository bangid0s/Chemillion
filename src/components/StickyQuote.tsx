'use client'

import { useEffect, useState } from 'react'

/**
 * The floating "Request a Quote" bar. It stays out of the way while the page's own quote button is on screen,
 * and slides in once that button has scrolled past, so it never covers the content a visitor is reading.
 */
export const StickyQuote = ({ watch, children }: { watch: string; children: React.ReactNode }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const target = document.querySelector(watch)
    if (!target || !('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0), {
      threshold: 0,
    })
    observer.observe(target)
    return () => observer.disconnect()
  }, [watch])

  return (
    <div className={`sticky-quote${visible ? ' is-visible' : ''}`} aria-hidden={!visible} inert={!visible}>
      {children}
    </div>
  )
}
