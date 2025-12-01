import type { IconType } from "react-icons";

export type Tokens = {
    accessToken: string;
    refreshToken?: string;
    accessTokenAt: number;
    refreshTokenAt?: number;
}
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
export type TableColumn<T> =  {
  key:string;
  label:string;
  sortable?: boolean;
  align?:"left" | "center" | "right";
  render?:(row:any)=>React.ReactNode;
}
export type TableUIProps<T> ={
  columns:TableColumn<T>[];
  data: T[];
  loading?: boolean;
  sortKey?: string;
  sortDir?: "asc" | "desc";
  onSort?: (key: keyof T) => void;
}
export interface Product {
  id: number;
  code: string;
  name: string;
  slug: string;
  price: number;
  status: number;
  thumbnailUrl: string;
  updatedAt: string;
}
export type GetAllOptions = {
  page?:number;
    size?:number;
    sort?:string;
    filter?:string;
    searchField?:string;
    searchValue?:string
    all?:boolean;
};
