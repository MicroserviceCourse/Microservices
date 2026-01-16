
import type { ApiResponse, GetAllOptions, PageResponse } from "../../../types"
import type { BlogCategory } from "../../../types/blog/category/category.type"
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
export const getBlogCategoryById = async(id:number)=>{
    return await Http.get<ApiResponse<BlogCategory>>(`/api/blog/categories/${id}`)
}
export const updateBlogCategory = async(id:number,data:any)=>{
    return await Http.put<ApiResponse<void>>(`/api/blog/categories/${id}`,data)
}
export const changeStatusBlogCategory = async(id:number,status:boolean)=>{
    return await Http.patch<ApiResponse<void>>(`/api/blog/categories/${id}/status?status=${status}`)

}