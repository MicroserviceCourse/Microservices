import type { Variants } from "framer-motion";
import type { ReactNode } from "react";

export interface Column<T> {
    header: string;
    accessor: string;
    render?: (value: any, row: any) => React.ReactNode;
    sortable?: boolean;

}
export interface TableUIProps<T> {
    title?: string;
    columns: Column<T>[];
    data: any[];
    onView?: (row: any) => void;
    onEdit?: (row: any) => void;
}
export type Permission = {
    id: string;
    code: string;
    moduleName: string;
    moduleId: number;
    permissionKey: string;
    description: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
export type Module = {
    id: string;
    code: string;
    name: string;
    permissionCount: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
export type Role = {
    id: string;
    code: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}
export type GetAllOptions = {
    page?: number;
    size?: number;
    sort?: string;
    filter?: string;
    searchField?: string;
    searchValue?: string
    all?: boolean;
    relation?: string;   // ví dụ "roles"
    nested?: string;     // ví dụ "role"
    field?: string;      // ví dụ "id"
    values?: number[];   // ví dụ [1]
    mode?: string
};


export type TooltipProps = {
    text: string;
    children: ReactNode;
}
export type ModalFormProps = {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    onSubmit: () => void;
    children: ReactNode;
    confirmText?: string;
    cancelText?: string;
    loading?: boolean;
    width?: string;
    height?:string;
}
export interface ModuleFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    loading?: boolean
}
export interface PermissionFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    idModule: number;
}
export interface UpdatePermissionFormModalProps extends PermissionFormModalProps {
    permissionData: any;
}
export interface UpdateRoleFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    roleData: any;
}
export interface UpdateModuleFormModalProps extends ModuleFormModalProps {
    moduleData: any;
}
export type ActionMenuProps = {
    onEdit?: () => void;
    onConfig?: () => void;
    onDelete?: () => void;
    onActive?: () => void;
    onDeactive?: () => void;
    onViewPermission?: () => void;
    size?: number;
}
export type ActionPermissionProps = {
    status: any,
    onEdit: () => void;
    onActive?: () => void;
    onDeactive?: () => void;
    size?: number;
}
export type ActionRoleProps = {
    onEdit?: () => void;
    onViewPermission?: () => void;
}
export type ActionModuleProps = {
    status: any,
    onEdit: () => void;
    onActive?: () => void;
    onDeactive?: () => void;
    onViewPermission?: () => void;
    size?: number;
}
export type ActionUserProps = {
    status: any,
    onAssignRole: () => void;
    onActive?: () => void;
    onDeactive?: () => void;
}
export type TableSearchConfig<T> = {
    enabled?: boolean;
    placeholder?: string;
    searchKeys?: (keyof T | string)[];
    filterFn?: (row: T, term: string) => boolean;
    value?: string;
    onChange?: (value: string) => void;
    serverSide?: boolean;
}
export type TableFilterConfig<T, V = any> = {
    enabled?: boolean;
    label?: string;
    options: { label: string; value: V }[];
    defaultValue?: V;
    predicate?: (row: T, selected: V) => boolean;
    value?: V;
    onChange?: (v: V) => void;
    /** true => TableUI không tự filter, để parent gọi API/filter */
    serverSide?: boolean;
}
export type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    loading?: boolean;
    disabled?: boolean;
}
export type SortState = {
    accessor: string;
    direction: "asc" | "desc";
};
export interface PermissionItem {
    id: string;
    permissionKey: string;
    checked: boolean;
    description?: string;
}
export interface PermissionGroup {
    module: string;
    permissions: PermissionItem[];
}
export interface RolePermissionPopupProps {
    roleId: number;
    roleName: string;
    onClose: () => void;
}
export const backdropVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
}
export const panelVariants: Variants = {
    initial: { y: 40, opacity: 0 },
    animate: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.25, ease: "easeOut" },
    },
    exit: { y: 40, opacity: 0, transition: { duration: 0.2 } },
}
export interface UserAssignRolePopupProps {
    selectedUser: any;
    onClose: () => void;
    onUpdated: () => void
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

/* ================== BLOG: CATEGORY ================== */

export interface CategoryDto {
    id: number;
    name: string;
    slug: string;
    description?: string;
}

export interface CategoryQuery {
    page?: number;
    size?: number;
    search?: string;
    sort?: string; // vd: "id,desc"
}

/* ================== BLOG: TAG ================== */

export interface TagDto {
    id: number;
    name: string;
    slug: string;
}

/* ================== BLOG: POST ================== */

export interface PostDto {
    id: number;
    title: string;
    content: string;
    slug: string;
    thumbnailUrl?: string;
    metaTitle?: string;
    metaDescription?: string;
    published: boolean;
    publishedAt?: string;

    categoryId: number;
    categoryName: string;
    tags: TagDto[];
}

export interface BlogCategoryForm {
    name: string;
    slug: string;        // user nhập hoặc pick từ gợi ý
    description: string;
}

/* ================== BLOG: TAG ================== */

export interface TagDto {
    id: number;
    name: string;
    slug: string;
}

export interface BlogTagForm {
    name: string;
    slug: string;
}
export interface TagQuery {
    page?: number;
    size?: number;
}

export interface PostDto {
    id: number;
    title: string;
    content: string;
    slug: string;
    thumbnailUrl?: string;
    metaTitle?: string;
    metaDescription?: string;
    published: boolean;
    publishedAt?: string;

    categoryId: number;
    categoryName: string;
    tags: TagDto[];
}

export interface PostQuery {
    page?: number;
    size?: number;
}

export interface BlogPostForm {
    title: string;
    content: string;
    slug: string;
    thumbnailUrl?: string;
    metaTitle?: string;
    metaDescription?: string;
    published: boolean;

    categoryId: number;
    tagIds: number[];
}

/* giữ nguyên BlogCategoryForm phía dưới nếu đã có */
export interface BlogCategoryForm {
    name: string;
    slug: string;        // user nhập hoặc pick từ gợi ý
    description: string;
}
export interface ShopActionMenuProps {
    status: number;
    loading?:boolean;
    onApprove?: () => void;
    onReject?: () => void;
    onBlock?: () => void;
    onRestore?: () => void;
    onViewDetail?: () => void;
}

export interface ModalReasonProps {
    title: string;
    onConfirm: (reason: string) => void;
    onClose: () => void;
    loading?: boolean;
}

export interface ShopDTO {
    id: number;
    shopCode: string;
    shopName: string;
    owner: string;
    status: number;
    createdAt: string;
    updatedAt: string;
}
export interface ShopDetail {
    id: number;
    shopCode: string;
    shopName: string;
    slug: string;
    description: string;
    logoUrl: string;
    bannerUrl: string;
    status: number;

    // Owner info
    ownerId: number;
    ownerName?: string;
    ownerEmail?: string;
    ownerPhone?: string;

    // Timestamp
    createdAt: string;
    updatedAt: string;

    // Addresses
    addresses: ShopAddress[];

    // Status history
    histories?: ShopHistory[];
}

export interface ShopAddress {
    id: number;
    fullAddress: string;
    idProvince: number;
    idDistrict: number;
    idWard: number;
    lat: number | null;
    lng: number | null;
    isDefault: boolean;
}

export interface ShopHistory {
    id: number;
    previousStatus: number;
    newStatus: number;
    reason: string;
    actionBy: number;
    actionAt: string;
}
export interface ShopDetailTabProps  {
    shop: ShopDetail;
}
export interface HistoryTabProps {
    shopId:number;
}
export interface CategoryResponse {
    id:number;
    name:string;
    parentId: number | null;
    parentName: string | null;
    sortOrder: number | null;
    active: boolean;
    level: number;
    children : CategoryResponse[];
}
export interface CategoryFormModalProps {
    isOpen:boolean;
    onClose:()=>void;
    onSubmit?:()=>void;
    loading?:boolean;
}
export interface CategoryUpdateFormModalProps{
    isOpen:boolean;
    onClose:()=>void;
    onSubmit?:()=>void;
    loading?:boolean;
    categoryData:any;
}
export interface CategoryParentSelectedProps {
    categories:CategoryResponse[];
    value:number | "";
    onChange:(value:number | "")=>void;
}