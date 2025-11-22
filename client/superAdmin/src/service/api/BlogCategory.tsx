import blogHttp from "../http/blogHttp";

import type {
  ApiResponse,
  PageResponse,
  CategoryDto,
  CategoryQuery,
} from "../../types";

const BASE_URL = "/api/categories";

export const BlogCategoryApi = {
  async getPage(params: CategoryQuery) {
    const res = await blogHttp.get<ApiResponse<PageResponse<CategoryDto>>>(
      BASE_URL,
      { params }
    );
    return res.data.data;
  },

  async getById(id: number) {
    const res = await blogHttp.get<ApiResponse<CategoryDto>>(
      `${BASE_URL}/${id}`
    );
    return res.data.data;
  },

  async create(payload: Omit<CategoryDto, "id" | "slug">) {
    const res = await blogHttp.post<ApiResponse<CategoryDto>>(
      BASE_URL,
      payload
    );
    return res.data.data;
  },

  async update(id: number, payload: Partial<Omit<CategoryDto, "id">>) {
    const res = await blogHttp.put<ApiResponse<CategoryDto>>(
      `${BASE_URL}/${id}`,
      payload
    );
    return res.data.data;
  },

  async delete(id: number) {
    await blogHttp.delete<ApiResponse<void>>(`${BASE_URL}/${id}`);
  },
};
