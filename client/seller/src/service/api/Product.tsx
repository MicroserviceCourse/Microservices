import type { CreateProductPayload, GetAllOptions, UpdateProductPayload } from "../../types";
import { objectToFormData } from "../../util/formData.util";
import Http from "../http/http";

export const getProducts = async (options: GetAllOptions = {}) => {
    const resp = await Http.get(
        "/api/products",
        { params: options }
    )
    return resp.data.data;
}

export const createProduct = async (payload: CreateProductPayload) => {
    const formData = objectToFormData(payload);
    if (payload.thumbnailFile) {
        formData.append("thumbnail", payload.thumbnailFile);
    }

    payload.galleryFiles.forEach(f => {
        if (f) formData.append("gallery", f);
    });

    payload.variants.forEach(v => {
        if (v.imageFile) formData.append("variantImages", v.imageFile);
    });

    const resp = await Http.post("/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return resp.data;
};

export const ChangeStatus =async(id:number,status:number)=>{
    return await Http.patch(`/api/products/${id}/status?status=${status}`)
}

export const getProductDetail=async(id:number)=>{
    return await Http.get(`/api/products/${id}`)

}
export const EditProduct = async (id: number, payload: UpdateProductPayload) => {
    const formData = new FormData();
    console.log(payload)
    // append JSON vào field "data"
    formData.append(
        "data",
        new Blob([JSON.stringify({
            name: payload.name,
            description: payload.description,
            price: payload.price,
            status: payload.status,
            categoryIds:payload.categoryIds,
            variants: payload.variants.map(v => ({
                id: v.id,
                name: v.name,
                sku: v.sku,
                price: v.price,
                imageIndex: v.imageIndex
            }))
        })], { type: "application/json" })
    );

    // thumbnail
    if (payload.thumbnailFile) {
        formData.append("thumbnail", payload.thumbnailFile);
    }

    // gallery
    payload.galleryFiles.forEach(f => {
        if (f) formData.append("gallery", f);
    });

    // variant images
    payload.variants.forEach(v => {
        if (v.imageFile) {
            formData.append("variantImages", v.imageFile);
        }
    });

    const resp = await Http.put(`/api/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });

    return resp.data;
};
