import type { GetAllOptions } from "../../types"
import Http from "../http/http"

export const getCategoriesShop =async(options: GetAllOptions = {})=>{
    return await Http.get("/api/shops/categories",{params:options})
}
export const registerShop = async(data:any)=>{
    return await Http.post("/api/shops",data)
}