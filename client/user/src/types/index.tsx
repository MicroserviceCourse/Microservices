// src/types/blog.ts

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface PageResponse<T> {
  content: T[]
  page: number
  size: number
  totalElements: number
  totalPages: number
}

export interface PostDto {
  id: number
  title: string
  slug: string
  content: string
  thumbnailUrl?: string
  publishedAt?: string

  // tuỳ PostResponse bên backend của bạn có gì
  categoryName?: string
}
export interface BreadCrumbItem {
  label: string
  href?: string
}
export interface BreadCrumbProps {
  items: BreadCrumbItem[]
}
export interface GetAllOptions {
  page?: number
  size?: number
  sort?: string
  filter?: string
  searchField?: string
  searchValue?: string
  all?: boolean
}
export interface Tokens {
  accessToken: string;
  refreshToken?: string;
  accessTokenAt: number;
  refreshTokenAt?: number;
}
export interface ImageResponse {
  url: string;
  altText: string;
}
export interface PaginationProps {
  page:number;
  total:number;
  size:number;
  onChange:(page:number)=>void;
}