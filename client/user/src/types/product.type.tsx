import type { Category } from './category.type'

export interface ProductProps {
  product: Product
}
export interface Product {
  id: number
  name: string;
  slug:string;
  price: number
  description: string
  thumbnailUrl: string,
  galleryUrls:string[],
  categories: Category[]
}

export interface ProductGridProps {
  page: number
  size: number
  onTotalChange: (total: number) => void
}
