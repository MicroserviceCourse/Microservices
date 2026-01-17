import { type ApiResponse, type GetAllOptions, type PageResponse } from "../../types";
import type { Product } from "../../types/product.type";
import Http from "../http/http";

export const getProduct = async (options:GetAllOptions = {})=>{
    return await Http.get<ApiResponse<PageResponse<Product>>>("/api/products",{
        params:options,
        skipAuth:true,
    })
}