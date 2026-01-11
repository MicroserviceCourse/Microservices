import type { GetAllOptions } from "../../types";
import Http from "../http/http";

export const createPromotion = async (data: any) => {
  return await Http.post("/api/promotions", data);
};

export const getPromotions = async (options: GetAllOptions = {}) => {
  const resp = await Http.get("/api/promotions", { params: options });
  return resp.data.data;
};

export const getPromotionById = async (id: number) => {
  return await Http.get(`/api/promotions/${id}`);
};
export const updatePromotion = async (id: number, data: any) => {
  return await Http.put(`/api/promotions/${id}`, data);
};
