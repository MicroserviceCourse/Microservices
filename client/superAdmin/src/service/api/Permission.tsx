import type { GetAllOptions } from "../../types";
import Http from "../http/http";

export const getAllPermission = async (options: GetAllOptions = {}) => {
    const {
        page = 1,
        size = 5,
        sort = "id,desc",
        filter,
        searchField,
        searchValue,
        all = false,
    } = options;
    const resp = await Http.get("/api/permissions",{
        params: { page, size, sort, filter, searchField, searchValue, all },
    })
    return resp.data;
}
export const createPermission=async(permission:any)=>{
    return await Http.post("/api/permissions",permission);
}
export const updatePermission=async(id:number,permission:any)=>{
    return await Http.put(`/api/permissions/${id}`,permission);
}
export const updateStatus=async(id:number,status:boolean)=>{
    return await Http.patch(`/api/permissions/${id}/status`,null,{
        params:{status}
    })
}