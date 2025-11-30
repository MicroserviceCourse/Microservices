import type { ApiResponse, CategoryResponse, GetAllOptions, PageResponse } from "../../types";
import Http from "../http/http";

export const getCategories = async (options: GetAllOptions = {}) => {
    const resp = await Http.get<ApiResponse<PageResponse<CategoryResponse>>>(
        "/api/categories",
        { params: options }
    )
    return resp.data.data;
}

export const createCategories = async (data: any) => {
    return await Http.post("/api/categories", data);
}

export const getCategoryById = async (id: number) => {
    return await Http.get<ApiResponse<CategoryResponse>>(`/api/categories/${id}`);
}

export const updateCategory = async (id: number, data: any) => {
    return await Http.put(`/api/categories/${id}`,data)
}

export const changeCategoryStatus = async(id:number,status:boolean)=>{
    return await Http.patch(`/api/categories/${id}/status`,null,{
        params:{status}
    })

}