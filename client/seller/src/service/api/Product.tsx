import type { CreateProductPayload, GetAllOptions, UpdateProductPayload } from "../../types";
import Http from "../http/http";

export const getProducts = async (options: GetAllOptions = {}) => {
  const resp = await Http.get("/api/products", { params: options });
  return resp.data.data;
};

export const createProduct = async (payload: CreateProductPayload) => {
  return await Http.post("/api/products", payload);
};

export const ChangeStatus = async (id: number, status: number) => {
  return await Http.patch(`/api/products/${id}/status?status=${status}`);
};

export const getProductDetail = async (id: number) => {
  return await Http.get(`/api/products/${id}`);
};
export const EditProduct = async (id: number, payload: UpdateProductPayload) => {
  return await Http.put(`/api/products/${id}`, payload);
};
