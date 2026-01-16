export interface BlogCategory {
    id:number;
    code:string;
    name:string;
    isStatus:boolean;
    createdAt:string;
    updatedAt:string;

}
export interface BlogCategoryColumnProps{
    onToggleStatus:(id:number,nextStatus:boolean)=>void;
    onEdit:(row:BlogCategory)=>void;
}
export interface BlogCategoryFormModalProps {
    isOpen:boolean;
    onClose:()=>void;
    onSuccess:()=>void;
}

export interface UpdateBlogCategoryFormModalProps extends BlogCategoryFormModalProps{
    blogCategoryId:number;
}

