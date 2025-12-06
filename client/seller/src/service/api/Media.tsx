import type { GetAllOptions } from "../../types";
import Http from "../http/http";

export const createMedia = async(media:any)=>{
    const formData = new FormData();
    media.files?.forEach((img: File) => formData.append("files", img));
    return await Http.post("/api/medias",formData,{
        headers: { "Content-Type": "multipart/form-data" },
    })
}

export const getMedias=async(options:GetAllOptions={})=>{
    const resp = await Http.get(
        "/api/medias",
        { params: options }
    )
    return resp.data.data;

}