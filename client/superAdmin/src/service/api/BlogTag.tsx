// src/service/api/BlogTag.tsx

import blogHttp from "../http/blogHttp";
import type {
  ApiResponse,
  PageResponse,
  TagDto,
  TagQuery,
} from "../../types";

const BASE_URL = "/api/tags";

export const BlogTagApi = {
  async getPage(params: TagQuery) {
    const res = await blogHttp.get<ApiResponse<PageResponse<TagDto>>>(
      BASE_URL,
      { params }
    );
    // backend trả ApiResponse<PageResponse<TagDto>>
    return res.data.data;
  },

  async getById(id: number) {
    const res = await blogHttp.get<ApiResponse<TagDto>>(
      `${BASE_URL}/${id}`
    );
    return res.data.data;
  },

  async create(payload: { name: string; slug: string }) {
    const res = await blogHttp.post<ApiResponse<TagDto>>(
      BASE_URL,
      payload
    );
    return res.data.data;
  },

  async update(id: number, payload: { name: string; slug: string }) {
    // TagController.update hiện trả ApiResponse<Void>
    await blogHttp.put<ApiResponse<void>>(`${BASE_URL}/${id}`, payload);
  },

  async delete(id: number) {
    await blogHttp.delete<ApiResponse<void>>(`${BASE_URL}/${id}`);
  },
};
