export interface BlogCategory {
    id:number;
    code:string;
    name:string;

}

export interface BlogCategoryFormModalProps {
    isOpen:boolean;
    onClose:()=>void;
    onSuccess:()=>void;
}