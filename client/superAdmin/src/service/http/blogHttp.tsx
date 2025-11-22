import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { BLOG_API } from "../../setting/constant/app";
import { getTokens } from "../../util/auth";

const BlogHttp = axios.create({
  baseURL: BLOG_API,
  withCredentials: true,
});

BlogHttp.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getTokens()?.accessToken;

    if (!config.skipAuth && token && token !== "undefined") {
      if (config.headers && typeof config.headers.set === "function") {
        config.headers.set("Authorization", `Bearer ${token}`);
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

BlogHttp.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default BlogHttp;
