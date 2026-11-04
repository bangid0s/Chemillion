'use client'

import { RefreshRouteOnSave as PayloadRefresh } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'

/** In the dashboard's live preview, re-renders the page as soon as a draft is saved. */
export const RefreshRouteOnSave = () => {
  const router = useRouter()
  return <PayloadRefresh refresh={() => router.refresh()} serverURL={process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'} />
}
