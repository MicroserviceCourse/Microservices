import type { GetAllOptions } from "../../types";
import Http from "../http/http";

export const createMedia = async (files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  return Http.post("/api/medias", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getMedias = async (options: GetAllOptions = {}) => {
  const resp = await Http.get("/api/medias", { params: options });
  return resp.data.data;
};

export const deleteMedia = async (id: number) => {
  return await Http.delete(`/api/medias/${id}`);
};