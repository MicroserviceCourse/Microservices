
// src/service/api/BlogPost.ts

import blogHttp from "../http/blogHttp";
import type { ApiResponse, PageResponse, PostDto } from "../../types/index";

const BASE_URL = "/api/posts";

export interface PostQuery {
  page?: number;
  size?: number;
}

export const BlogPostApi = {
  async getPage(params: PostQuery) {
    const res = await blogHttp.get<ApiResponse<PageResponse<PostDto>>>(
      BASE_URL,
      { params }
    );
    return res.data.data;
  },

  async getById(id: number) {
    const res = await blogHttp.get<ApiResponse<PostDto>>(
      `${BASE_URL}/${id}`
    );
    return res.data.data;
  },
};
