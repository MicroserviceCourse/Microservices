import type { GetAllOptions } from "../../types";
import Http from "../http/http";

export const getAllModule=async(options:GetAllOptions={})=>{
    const {
        page = 1,
        size = 5,
        sort = "id,desc",
        filter,
        searchField,
        searchValue,
        all = false,
      } = options;
      const res = await Http.get("/api/modules/all", {
        params: { page, size, sort, filter, searchField, searchValue, all },
      })
      return res.data;
}
export const create=async(data:any)=>{
    return await Http.post("/api/modules/create",data)
}
export const update=async(id:number,data:any)=>{
  return await Http.put(`/api/modules/${id}`,data);
}
export const updateStatus=async(id:number,status:boolean)=>{
  return Http.patch(`/api/modules/updateStatus/${id}`, null, {
    params: { status },
  });
}