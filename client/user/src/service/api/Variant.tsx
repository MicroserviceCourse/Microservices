import type { ApiResponse, GetAllOptions, PageResponse } from "../../types";
import type { ProductVariant } from "../../types/productVariant.type";
import Http from "../http/http";

export const getVariant = async(options:GetAllOptions = {})=>{
    return await Http.get<ApiResponse<PageResponse<ProductVariant>>>("/api/variants",{
        params:options,
        skipAuth:true,
    })

}