import type { JSX } from "react";
import type { IconType } from "react-icons";
import type { Product } from "./product.type";

export type Tokens = {
  accessToken: string;
  refreshToken?: string;
  accessTokenAt: number;
  refreshTokenAt?: number;
};
export type SidebarItemProps = {
  icon: IconType;
  label: string;
  onClick?: () => void;
};
export type ReportItemProps = {
  icon: string;
  label: string;
  amount: string;
  growth: string;
  color: string;
};
export type TableColumn<T> = {
  key: string;
  label: string;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  render?: (row: any) => React.ReactNode;
};
export type TableUIProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  sortKey?: string;
  sortDir?: "asc" | "desc";
  onSort?: (key: keyof T) => void;

  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};
export type PaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export type GetAllOptions = {
  page?: number;
  size?: number;
  sort?: string;
  filter?: string;
  searchField?: string;
  searchValue?: string;
  all?: boolean;
};
export type Variant = {
  id: number | null;
  name: string;
  price: string;
  sku: string;
  imagePreview?: string | null;
  imageFile?: File | null;
};
export type ProductFormData = {
  name: string;
  description: string;
  price: string;
  categoryIds: number[];
};
export interface CreateProductPayload {
  name: string;
  description: string;
  price: number;
  thumbnailUrl: string;
  galleryUrls: string[];
  categoryIds: number[];
  variants: {
    name: string;
    sku: string;
    price: number;
    imageUrl: string;
  }[];
}

export interface VariantUpdatePayload {
  id: number | null;
  name: string;
  sku: string;
  price: number;
  imageUrl: string;
}

export interface UpdateProductPayload {
  name: string;
  description: string;
  price: number;
  status: string;

  thumbnailUrl: string;
  galleryUrls: string[];
  categoryIds: number[];
  variants: VariantUpdatePayload[];
}
export type CheckBoxProps = {
  checked: boolean;
};

export type IActionItem = {
  label: string;
  icon?: JSX.Element;
  onClick?: () => void;
  hidden?: boolean;
};
export type TableActionProps = {
  actions: IActionItem[];
};
export type ProductTableActionProps = {
  product: Product;
  onUpdated?: () => void;
};
export type ProductEditData = {
  name: string;
  description: string;
  price: string;
  thumbnailFile: File | null;
  galleryFiles: File[];
  status: string;
  categoryIds: number[];
};
export type BaseBadgeProps = {
  label: string;
  className?: string;
  icon?: React.ReactNode;
};
export type StatusBadgeProps = {
  value: number | string;
};
export interface CategoryParentSelectedProps {
  categories: CategoryResponse[];
  value: number[];
  onChange: (ids: number[]) => void;
}
export interface CategoryResponse {
  id: number;
  name: string;
  parentId: number | null;
  parentName: string | null;
  sortOrder: number | null;
  active: boolean;
  level: number;
  children: CategoryResponse[];
}
export type MediaDetailsProps = {
  active: {
    url: string;
    fileName: string;
    mediaType: string;
    createdAt: string;
    mimeType: string;
    size: string;
    alt: string;
  };
};
export type MediaItem = {
  id: number;
  url: string;
  fileName: string;
  size: number;
  createdAt: string;
  alt: string;
  width: number;
  height: number;
};
export type MediaLibraryProps = {
  isOpen: boolean;
  onClose: () => void;
  multiple?: boolean;
  onSelect: (url: string | string[]) => void;
};
