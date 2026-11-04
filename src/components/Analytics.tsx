'use client'

import Script from 'next/script'
import { useEffect } from 'react'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export const track = (event: string, params?: Record<string, unknown>) => window.gtag?.('event', event, params)

/** GA4 loads after the page is idle. Elements carrying `data-track` report their click event. */
export const Analytics = ({ gaId }: { gaId: string }) => {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>('[data-track]')
      if (el?.dataset.track) track(el.dataset.track)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="lazyOnload" />
      <Script id="ga-init" strategy="lazyOnload">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config',${JSON.stringify(gaId)});`}
      </Script>
    </>
  )
}
