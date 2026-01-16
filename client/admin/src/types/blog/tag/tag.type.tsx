export interface BlogTag {
    id:number;
    code:string;
    name:string;
    isStatus:boolean;
}
export interface BlogTagFormModalProps {
    isOpen:boolean;
    onClose:()=>void;
    onSuccess:()=>void;
}

export interface TagColumnProps {
    onToggleStatus:(id:number,nextStatus:boolean)=>void;
    onEdit:(row:BlogTag)=>void;

}
export interface UpdateBlogTagFormModalProps extends BlogTagFormModalProps{
    blogTagId:any;
}