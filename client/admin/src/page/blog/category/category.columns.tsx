import type { Column } from "../../../types";
import type { BlogCategory } from "../../../types/blog/blog.type";

export const categoryColumns : Column<BlogCategory>[]=[
    {
        key:"blogCategoryCode",
        title:"ID",
    },
    {
        key:"name",
        title:"Name",
    },
    
]