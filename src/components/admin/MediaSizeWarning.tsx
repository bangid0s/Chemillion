'use client'

import { useFormFields } from '@payloadcms/ui'

const RECOMMENDED_WIDTH = 1920

export const MediaSizeWarning = () => {
  const width = useFormFields(([fields]) => fields.width?.value as number | undefined)
  const mime = useFormFields(([fields]) => fields.mimeType?.value as string | undefined)
  if (!width || !mime?.startsWith('image/') || mime === 'image/svg+xml' || width >= RECOMMENDED_WIDTH) return null
  return (
    <p className="ch-note ch-note--warn">
      This image is {width} px wide. Hero images should be at least {RECOMMENDED_WIDTH} px wide to stay sharp on large screens.
    </p>
  )
}
