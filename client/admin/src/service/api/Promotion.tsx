import type { ApiResponse, GetAllOptions, PageResponse } from "../../types";
import type { Promotion } from "../../types/promotion/promotion";

import Http from "../http/http";

export const getPromotions = async(options:GetAllOptions={})=>{
    return await Http.get<ApiResponse<PageResponse<Promotion>>>("/api/promotions",{
        params:options
    })
}

export const createPromotion = async (data:any)=>{
    return await Http.post<ApiResponse<void>>("/api/promotions",data)

}

export const getPromotionById = async (id:number)=>{
    return await Http.get<ApiResponse<Promotion>>(`/api/promotions/${id}`)
}

export const updatePromotion = async (id:number,data:any)=>{
    return await Http.put<ApiResponse<void>>(`/api/promotions/${id}`,data)
}
export const changeStatusPromotion = async (id:number,status:number)=>{
    return await Http.patch<ApiResponse<void>>(`/api/promotions/${id}/status?status=${status}`)
}