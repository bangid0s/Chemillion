import { LocalLink as Link } from '@/components/LocaleProvider'
import type { ProductCategory } from '@/payload-types'
import { solutionHref } from '@/lib/cms'
import { getT } from '@/i18n/server'
import { Icon } from './Icon'
import { CmsImage } from './ui'

/** A solution on the Home page: image, name and one-line summary, opening its section on the Solutions page. */
export const CategoryCard = async ({ category }: { category: ProductCategory }) => {
  const t = await getT()
  return (
    <Link href={solutionHref(category)} className="cat-card">
      <span className="cat-card__img">
        <CmsImage media={category.image} sizes="(max-width: 640px) 50vw, (max-width: 1023px) 33vw, 30vw" />
      </span>
      <span className="cat-card__label">
        <span className="cat-card__name">
          {category.name}
          {category.summary && <small>{category.summary}</small>}
          <span className="sr-only">: {t.viewSolution}</span>
        </span>
        <span className="round-arrow">
          <Icon name="arrow" />
        </span>
      </span>
    </Link>
  )
}
