import type { ReactNode } from "react";

export interface Category {
    id: number;
    name: string;
    icon: string;
    quantity: number;
    sale: number;
    startDate: string;
}
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
    description:string;
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
    id:string;
    code:string;
    name:string;
    description:string;
    createdAt:string;
    updatedAt:string;
}
export type GetAllOptions = {
    page?: number;
    size?: number;
    sort?: string;
    filter?: string;
    searchField?: string;
    searchValue?: string
    all?: boolean;
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
}
export interface ModuleFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    loading?: boolean
}
export interface PermissionFormModalProps{
    isOpen:boolean;
    onClose:()=>void;
    onSubmit:()=>void;
    idModule:number;
}
export interface UpdatePermissionFormModalProps extends PermissionFormModalProps {
    permissionData: any;
}
export interface UpdateRoleFormModalProps{
    isOpen:boolean;
    onClose:()=>void;
    onSubmit:()=>void;
    roleData:any;
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
export type ActionPermissionProps ={
    status:any,
    onEdit:()=>void;
    onActive?:()=>void;
    onDeactive?:()=>void;
    size?:number;
}
export type ActionRoleProps ={
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
    disabled?: boolean;
}
export type SortState = {
    accessor: string;
    direction: "asc" | "desc";
};
export interface PermissionItem{
    id:string;
    permissionKey:string;
    checked:boolean;
    description?: string;
}
export interface PermissionGroup{
    module:string;
    permissions:PermissionItem[];
}
export interface RolePermissionPopupProps{
    roleId:number;
    roleName:string;
    onClose:()=>void;
}