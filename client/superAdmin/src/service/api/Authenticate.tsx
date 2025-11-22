import type { GetAllOptions } from "../../types";
import Http from "../http/http"

export const login = async (email: string, password: string) => {
    const response = await Http.post(
        "/api/account/login",
        { email, password },
        { skipAuth: true, withCredentials: true }
    )
    return response.data;
}
export const getAllUser =async(options:GetAllOptions={})=>{
    const {
        page = 1,
        size = 5,
        sort = "id,desc",
        filter,
        searchField,
        searchValue,
        all = false,
        relation="roles",
        nested= "role",
        field= "id",
        values= [1]
      } = options;
      const res = await Http.get("/api/account", {
        params: { page, size, sort, filter, searchField, searchValue, all,
          relation,nested,field,values
          
         },
        
      })
      return res.data;
}
export const getUserRoles=(userId:number)=>{
    return Http.get(`/api/account/${userId}/roles`);
}
export const assignUserRoles=async(userId:number,roleIds:number[])=>{
  return await Http.post(`/api/account/${userId}/assign`,roleIds);

}