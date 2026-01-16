export interface Tokens {
  accessToken: string;
  refreshToken?: string;
  accessTokenAt: number;
  refreshTokenAt?: number;
}
export type Column<T> = {
  key: keyof T | string;
  title: string;
  sortable?: boolean;
  className?: string;
  render?: (row: T) => React.ReactNode;
};
export type SortOrder = "asc" | "desc";

export type SortState<T> = {
  key: keyof T;
  order: SortOrder;
};
export interface TableProps<T> {
    columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string;

  sort?: SortState<T>;
  onSortChange?: (sort: SortState<T>) => void;

  loading?: boolean;
}
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: number;
}
export interface PageResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}
export type GetAllOptions = {
  page?: number;
  size?: number;
  sort?: string;
  filter?: string;
  searchField?: string;
  searchValue?: string;
  all?: boolean;
};
