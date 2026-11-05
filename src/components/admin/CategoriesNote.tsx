import Link from 'next/link'

export const CategoriesNote = () => (
  <p className="ch-note">
    The cards in this section come from <Link href="/admin/collections/product-categories">Product Categories</Link>: change their image,
    name, order and the “Show on Home” toggle there. Each card opens the quote form with its category filled in.
  </p>
)
