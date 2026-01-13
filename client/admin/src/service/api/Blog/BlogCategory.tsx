
import type { ApiResponse, GetAllOptions, PageResponse } from "../../../types"
import type { BlogCategory } from "../../../types/blog/blog.type"
import Http from "../../http/http"

export const createBlogCategory = async(data:any)=>{
    return await Http.post<ApiResponse<void>>("/api/blog/categories",data)
}

export const getBlogCategories = async (options:GetAllOptions = {})=>{
    return await Http.get<ApiResponse<PageResponse<BlogCategory>>>(
        "/api/blog/categories",
        {params:options}
    )
}