import type { GetAllOptions } from "../../types";
import Http from "../http/http";

export const getCategories =async(options:GetAllOptions={})=>{
    const resp = await Http.get(
        "/api/categories",
        { params: options }
    )
    return resp.data.data;
}