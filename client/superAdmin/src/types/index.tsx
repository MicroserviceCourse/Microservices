export interface Category{
    id:number;
    name:string;
    icon:string;
    quantity:number;
    sale:number;
    startDate:string;
}
export interface Column<T> {
    header: string;
    accessor: string;
    render?: (value: any, row: any) => React.ReactNode;
}
export interface TableUIProps<T> {
    title?: string;
    columns: Column<T>[];
    data: any[];
    onView?: (row: any) => void;
    onEdit?: (row: any) => void;
}