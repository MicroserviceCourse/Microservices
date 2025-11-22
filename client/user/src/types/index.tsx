// src/types/blog.ts

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface PostDto {
  id: number;
  title: string;
  slug: string;
  content: string;
  thumbnailUrl?: string;
  publishedAt?: string;

  // tuỳ PostResponse bên backend của bạn có gì
  categoryName?: string;
}
