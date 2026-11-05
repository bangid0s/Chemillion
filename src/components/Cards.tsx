import Link from 'next/link'
import type { ProductCategory } from '@/payload-types'
import { quoteHref } from '@/lib/cms'
import { t } from '@/i18n/en'
import { Icon } from './Icon'
import { CmsImage } from './ui'

export const CategoryCard = ({ category }: { category: ProductCategory }) => (
  <Link href={quoteHref(category.name)} className="cat-card">
    <span className="cat-card__img">
      <CmsImage media={category.image} sizes="(max-width: 640px) 50vw, (max-width: 1023px) 33vw, 20vw" />
    </span>
    <span className="cat-card__label">
      <span className="cat-card__name">
        {category.name}
        <span className="sr-only">: {t.requestQuote}</span>
      </span>
      <span className="round-arrow">
        <Icon name="arrow" />
      </span>
    </span>
  </Link>
)
