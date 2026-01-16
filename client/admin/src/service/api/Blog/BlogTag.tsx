
import type { ApiResponse, GetAllOptions, PageResponse } from "../../../types"
import type { BlogTag } from "../../../types/blog/tag/tag.type"
import Http from "../../http/http"

export const createBlogTag = async(data:any)=>{
    return await Http.post<ApiResponse<void>>("/api/blog/tags",data)
}
export const getBlogTags = async(options: GetAllOptions = {})=>{
    return await Http.get<ApiResponse<PageResponse<BlogTag>>>("/api/blog/tags",{
        params:options
    })
}
export const changeStatusBlogTag = async(id:number,status:boolean)=>{
    return await Http.patch<ApiResponse<void>>(`/api/blog/tags/${id}/status?status=${status}`)

}

export const updateBlogTag = async(id:number,data:any)=>{
    return await Http.put<ApiResponse<void>>(`/api/blog/tags/${id}`,data)

}
export const getBlogTabById  = async(id:number)=>{
    return await Http.get<ApiResponse<BlogTag>>(`/api/blog/tags/${id}`) 
}