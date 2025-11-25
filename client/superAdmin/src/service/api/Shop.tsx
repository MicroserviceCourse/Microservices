import { type ApiResponse, type GetAllOptions, type PageResponse, type ShopDetail, type ShopDTO } from "../../types";
import Http from "../http/http";

export const getShops = async (options: GetAllOptions = {}) => {
    const {
        page = 1,
        size = 5,
        sort = "id,desc",
        filter,
        searchField,
        searchValue,
        all = false,
    } = options;
    const resp = await Http.get<ApiResponse<PageResponse<ShopDTO>>>(
        "/api/shops",
        {
            params: {
                page,
                size,
                sort,
                filter,
                searchField,
                searchValue,
                all
            }
        }
    )
    return resp.data.data;

}

export const approveShop = async (id: number)=>{
    return await Http.patch<ApiResponse<void>>
    (`/api/shops/${id}/approve`);
}

export const blockShop = async (id: number, note:string)=>{
    return await Http.patch<ApiResponse<void>>
    (`/api/shops/${id}/block`,{
        note:note
    });
}

export const rejectShop = async (id:number,note:string) =>{
    return await Http.patch<ApiResponse<void>>
    (`/api/shops/${id}/reject`,{
        note:note
    });
}
export const restoreShop = async (id:number) =>{
    return await Http.patch<ApiResponse<void>>
    (`/api/shops/${id}/restore`);
}

export const getShopById = async (id:number) =>{
    return await Http.get<ApiResponse<ShopDetail>>
    (`/api/shops/${id}`);
}