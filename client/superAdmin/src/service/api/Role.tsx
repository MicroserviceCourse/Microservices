import type { GetAllOptions } from "../../types";
import Http from "../http/http";

export const getListRole=async(options:GetAllOptions={})=>{
    const {
        page = 1,
        size = 5,
        sort = "id,desc",
        filter,
        searchField,
        searchValue,
        all = false,
      } = options;
      const res = await Http.get("/api/roles", {
        params: { page, size, sort, filter, searchField, searchValue, all },
      });
      return res.data;
}
export const updateRole=async(id:number,data:any)=>{
  return await Http.put(`/api/roles/${id}`,data);
}