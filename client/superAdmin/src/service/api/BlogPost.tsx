// src/service/api/BlogPost.tsx

import blogHttp from "../http/blogHttp";
import type {
  ApiResponse,
  PageResponse,
  PostDto,
  PostQuery,
  BlogPostForm,
} from "../../types";

const BASE_URL = "/api/posts";

export const BlogPostApi = {
  async getPage(params: PostQuery) {
    const res = await blogHttp.get<ApiResponse<PageResponse<PostDto>>>(
      BASE_URL,
      { params }
    );
    return res.data.data; // PageResponse<PostDto>
  },

  async getById(id: number) {
    const res = await blogHttp.get<ApiResponse<PostDto>>(
      `${BASE_URL}/${id}`
    );
    return res.data.data;
  },

  async create(payload: BlogPostForm) {
    const res = await blogHttp.post<ApiResponse<PostDto>>(
      BASE_URL,
      payload
    );
    return res.data.data;
  },

  async update(id: number, payload: BlogPostForm) {
    // PostController.update trả ApiResponse<Void>
    await blogHttp.put<ApiResponse<void>>(`${BASE_URL}/${id}`, payload);
  },

  async delete(id: number) {
    await blogHttp.delete<ApiResponse<void>>(`${BASE_URL}/${id}`);
  },
};
