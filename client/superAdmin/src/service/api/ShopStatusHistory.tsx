import 
{   
    type ApiResponse, 
    type PageResponse, 
    type ShopHistory, 
    type GetAllOptions 
} from "../../types";
import Http from "../http/http";

export const GetShopStatusHistories = async (options: GetAllOptions) => {
    const {
        page = 1,
        size = 5,
        sort = "id,desc",
        filter,
        searchField,
        searchValue,
        all = false,
    } = options;
    const resp = await Http.get<ApiResponse<PageResponse<ShopHistory>>>(
        "/api/shop-status-histories",
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