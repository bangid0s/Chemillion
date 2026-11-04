import Link from 'next/link'
import type { News, Product, ProductCategory } from '@/payload-types'
import { productPath } from '@/lib/cms'
import { t } from '@/i18n/en'
import { Icon } from './Icon'
import { CmsImage, formatDate } from './ui'

export const CategoryCard = ({ category, count, countLabel }: { category: ProductCategory; count?: string; countLabel?: string }) => (
  <Link href={`/products/${category.slug}`} className="cat-card">
    <span className="cat-card__img">
      <CmsImage media={category.image} sizes="(max-width: 640px) 50vw, (max-width: 1023px) 33vw, 20vw" />
    </span>
    <span className="cat-card__label">
      <span className="cat-card__name">
        {category.name}
        {count && (
          <small>
            {count} {countLabel}
          </small>
        )}
      </span>
      <span className="round-arrow">
        <Icon name="arrow" />
      </span>
    </span>
  </Link>
)

export const ProductCard = ({ product }: { product: Product }) => (
  <Link href={productPath(product)} className="product-card">
    <span className="product-card__img">
      <CmsImage media={product.gallery?.[0]?.image} sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 30vw" />
    </span>
    <span className="product-card__body">
      <span className="product-card__name">{product.name}</span>
      {product.casNumber && (
        <span className="product-card__cas">
          {t.casNumber}: {product.casNumber}
        </span>
      )}
      {product.shortDescription && <span className="product-card__text">{product.shortDescription}</span>}
      <span className="link-arrow">
        {t.viewProduct}
        <Icon name="arrow" />
      </span>
    </span>
  </Link>
)

export const NewsCard = ({ article }: { article: News }) => (
  <article className="news-card">
    <Link href={`/news/${article.slug}`} className="news-card__img" tabIndex={-1} aria-hidden="true">
      <CmsImage media={article.cover} sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 30vw" />
    </Link>
    <div className="news-card__body">
      <p className="news-card__meta">
        {article.category && <span>{article.category}</span>}
        <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
      </p>
      <h3>
        <Link href={`/news/${article.slug}`}>{article.title}</Link>
      </h3>
      {article.excerpt && <p className="news-card__text">{article.excerpt}</p>}
    </div>
  </article>
)
