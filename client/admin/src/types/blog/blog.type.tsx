export interface BlogRow {
  id: string;
  title: string;
  author: string;
  createdAt: string;
  status: "draft" | "published";
}
export interface BlogCategory {
    id:number;
    code:string;
    name:string;
}

