// src/service/http/blogHttp.ts

import axios from "axios";

const blogHttp = axios.create({
  baseURL: "http://localhost:8686", // hoặc gateway của bạn
  withCredentials: false,           // FE user thường public, không gửi cookie/JWT
});

export default blogHttp;
