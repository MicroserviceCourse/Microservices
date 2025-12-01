import type { GetAllOptions } from "../../types";
import Http from "../http/http";

export const getProducts=async (options: GetAllOptions = {}) => {
    const resp = await Http.get(
        "/api/products",
        { params: options }
    )
    return resp.data.data;
}