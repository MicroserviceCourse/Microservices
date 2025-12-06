import { useEffect, useRef, useState } from "react";
import { Plus, X, ImageIcon, Edit2, ImageUp } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { EditProduct, getProductDetail } from "../service/api/Product";
import { useAlert } from "../components/alert-context";
import { type Variant, type ProductEditData, type UpdateProductPayload } from "../types";
import { ProductStatus, ProductStatusLabel } from "../enums";
import CategoryParentSelect from "../components/category/CategoryParentSelect";
import { getCategories } from "../service/api/Categories";

const inputBase =
    "w-full bg-slate-50 border border-slate-300 text-slate-800 rounded-md shadow-sm px-3 py-2.5 " +
    "focus:ring-2 focus:ring-blue-600 focus:outline-none transition";

const EditProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showAlert } = useAlert();
    const [isRemovingThumb, setIsRemovingThumb] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState(true);
    const[hasError, setHasError] = useState(false);
    const [isDraggingThumb, setIsDraggingThumb] = useState(false);
    const [isDraggingGallery, setIsDraggingGallery] = useState(false);
    const [removingGalleryIndex, setRemovingGalleryIndex] = useState<number | null>(null);
    const [formData, setFormData] = useState<ProductEditData>({
        name: "",
        description: "",
        price: "",
        status: String(ProductStatus.ACTIVE),
        thumbnailFile: null,
        galleryFiles: [],
        categoryIds: [] as number[]
    });

    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
    const [galleryPreview, setGalleryPreview] = useState<string[]>([]);

    const [variants, setVariants] = useState<Variant[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [categories,setCategories]=useState<any[]>([]);

    // ============================= LOAD PRODUCT =============================
    const fetchCategories = async () => {
        try {
            const res = await getCategories({ all: true });
            setCategories(res.content || []);
        } catch (err) {
            console.log("Failed to load categories");
        }
    };
    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                const res = await getProductDetail(Number(id));
                const p = res.data.data;

                setFormData({
                    name: p.name,
                    description: p.description,
                    price: String(p.price),
                    status: p.status ?? String(ProductStatus.ACTIVE),
                    thumbnailFile: null,
                    galleryFiles: [],
                    categoryIds: p.categories.map((c: any) => c.id)
                });

                // Thumbnail
                setThumbnailPreview(p.thumbnailUrl || null);

                // Gallery
                setGalleryPreview(p.galleryUrls || []);


                // Variants
                const variantImageMap: Record<number, string> = {};

                const loadedVariants = p.variants.map((v: any) => {
                    variantImageMap[v.id] = v.imageUrl;

                    return {
                        id: v.id,
                        name: v.name,
                        price: String(v.price),
                        sku: v.sku,
                        imagePreview: v.imageUrl,
                        imageFile: null
                    };
                });

                setVariants(loadedVariants);


            } catch (error) {
                showAlert({ title: "Unable to load product", type: "error" });
                setHasError(true)
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
        fetchCategories();
    }, [id]);

    // ============================= UPLOAD FUNCTIONS =============================
    const uploadThumbnail = (file: File) => {
        setFormData(prev => ({ ...prev, thumbnailFile: file }));

        const reader = new FileReader();
        reader.onload = () => setThumbnailPreview(reader.result as string);
        reader.readAsDataURL(file);
    };

    const handleDropThumbnail = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDraggingThumb(false);

        const file = e.dataTransfer.files?.[0];
        if (file) uploadThumbnail(file);
    }

    const handleEditThumbnail = () => {
        inputRef.current?.click();
    };
    const handleChangeThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) uploadThumbnail(file);
    };

    const removeThumbnail = () => {
        setIsRemovingThumb(true);
        setTimeout(() => {
            setThumbnailPreview(null);
            setFormData(prev => ({ ...prev, thumbnailFile: null }));
            setIsRemovingThumb(false);
        }, 250);
    };

    const uploadGallery = (files: FileList) => {
        const arr = Array.from(files);

        setFormData(prev => ({
            ...prev,
            galleryFiles: [...prev.galleryFiles, ...arr]
        }));

        Promise.all(
            arr.map(file => {
                return new Promise<string>(resolve => {
                    const r = new FileReader();
                    r.onload = () => resolve(r.result as string);
                    r.readAsDataURL(file);
                });
            })
        ).then(newImages => {
            setGalleryPreview(prev => [...prev, ...newImages]);
        });
    };

    const removeGalleryImage = (index: number) => {
        setRemovingGalleryIndex(index);

        setTimeout(() => {
            // Xóa preview
            setGalleryPreview(prev => prev.filter((_, i) => i !== index));

            // Xóa file thật
            setFormData(prev => ({
                ...prev,
                galleryFiles: prev.galleryFiles.filter((_, i) => i !== index)
            }));

            setRemovingGalleryIndex(null);
        }, 250);
    };

    const uploadVariantImage = (index: number, file: File) => {
        const preview = URL.createObjectURL(file);
        setVariants(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], imagePreview: preview, imageFile: file };
            return updated;
        });
    };


    const removeVariant = (index: number) => {
        setVariants(prev => prev.filter((_, i) => i !== index));
    };


    const addVariant = () => {
        setVariants(prev => [
            ...prev,
            {
                id: Date.now(),
                name: "",
                price: "",
                sku: "",
                imagePreview: null,
                imageFile: null
            }
        ]);
    };


    const updateVariant = (index: number, key: keyof Variant, value: any) => {
        setVariants(prev => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                [key]: value,
                sku: key === "name"
                    ? generateVariantSKU(formData.name, value)
                    : updated[index].sku
            };
            return updated;
        });
    };


    // ============================= SAVE EDIT =============================
    const handleSave = async () => {

        if (isSaving) return;

        setIsSaving(true);
        const payload: UpdateProductPayload = {
            name: formData.name,
            description: formData.description,
            price: Number(formData.price),
            status: formData.status,
            categoryIds:formData.categoryIds,
            thumbnailFile: formData.thumbnailFile,
            galleryFiles: formData.galleryFiles,

            variants: variants.map((v, idx) => ({
                id: typeof v.id === "number" ? v.id : null,   // new variant: id=null
                name: v.name,
                sku: v.sku,
                price: Number(v.price),

                imageFile: v.imageFile ?? null,               // gửi file lên
                imageIndex: v.imageFile ? idx : null          // index để BE nhận đúng file
            }))
        };


        try {
            const res = await EditProduct(Number(id), payload);

            showAlert({
                title: res?.data?.message || "Updated successfully!",
                type: "success",
                autoClose: 2500
            });

            navigate("/Dashboard/product");
        } catch (err: any) {
            showAlert({
                title: err?.response?.data?.message || "Update failed",
                type: "error"
            });
        } finally {
            setIsSaving(false);
        }
    };
    const handleDropGallery = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDraggingGallery(false);
        if (e.dataTransfer.files) uploadGallery(e.dataTransfer.files);
    };
    if (loading) return <div className="p-6">Loading...</div>;
    if (hasError)
        return (
            <div className="p-10 text-center">
                <h2 className="text-xl font-semibold text-red-500">Failed to load product.</h2>
                <p className="text-slate-600 mt-2">Please try again later.</p>
    
                <button
                    onClick={() => navigate("/Dashboard/product")}
                    className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Go Back
                </button>
            </div>
        );
    
    const toSKU = (text: string) =>
        text
            .trim()
            .toUpperCase()
            .replace(/[^A-Z0-9]+/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "");
    const generateVariantSKU = (productName: string, variantName: string) => {
        const base = toSKU(productName || "PRODUCT");
        const v = toSKU(variantName || "OPTION");
        return `${base}-${v}`;
    };
    return (
        <div className="p-8 bg-gray-50 min-h-screen space-y-8">
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Edit Product</h1>

                <div className="flex gap-3">
                    <button onClick={() => navigate("/Dashboard/product")} className="px-4 py-2 rounded-lg  bg-slate-200 hover:bg-slate-300 font-medium text-[#334155">
                        Cancel
                    </button>

                    <button onClick={handleSave} className={`px-4 py-2 rounded-lg text-white shadow-sm 
                        ${isSaving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
                    `}>
                       {isSaving ? (
                            <div className="flex items-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 010 16v4l3.5-3.5L12 20v-4a8 8 0 01-8-8z">
                                    </path>
                                </svg>
                                Saving...
                            </div>
                        ) : (
                            "Save Product"
                        )}
                    </button>
                </div>
            </div>

            {/* === GRID 2 COLUMNS === */}
            <div className="max-w-6xl mx-auto grid grid-cols-12 gap-6">

                {/* ---------------- LEFT SIDE (8 cols) ---------------- */}
                <div className="col-span-8 space-y-8">

                    {/* BASIC INFO */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200">
                        <h2 className="text-lg font-semibold mb-4">Basic Info</h2>

                        <div className="space-y-6">
                            {/* NAME */}
                            <div>
                                <label className="text-sm font-medium">Name</label>
                                <input
                                    className={inputBase}
                                    value={formData.name}
                                    onChange={(e) => {
                                        const name = e.target.value;
                                        setFormData(prev => ({ ...prev, name }));
                                        setVariants(prev =>
                                            prev.map(v => ({
                                                ...v,
                                                sku: generateVariantSKU(name, v.name)
                                            }))
                                        );
                                    }}
                                    placeholder="Product name"
                                />
                            </div>

                            {/* DESCRIPTION */}
                            <div>
                                <label className="text-sm font-medium">Description</label>
                                <textarea
                                    className={inputBase}
                                    rows={5}
                                    value={formData.description}
                                    onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                ></textarea>
                            </div>

                            {/* PRICE */}
                            <div>
                                <label className="text-sm font-medium">Price</label>
                                <input
                                    className={inputBase}
                                    value={formData.price}
                                    onChange={e => setFormData(prev => ({ ...prev, price: e.target.value }))}
                                />
                            </div>

                            <div>
                            <label className="text-sm font-medium">Categories</label>
                            <CategoryParentSelect
                            categories={categories}
                            value={formData.categoryIds}
                            onChange={(ids) =>
                                setFormData(prev => ({ ...prev, categoryIds: ids }))
                            }
                            />
                        </div>
                        </div>
                    </div>

                    {/* MEDIA */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200">
                        <h2 className="text-lg font-semibold mb-4">Media</h2>

                        {/* THUMBNAIL */}
                        <div>
                            <label className="text-sm font-medium">Thumbnail</label>

                            <label
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    setIsDraggingThumb(true);
                                }}
                                onDragLeave={() => setIsDraggingThumb(false)}
                                onDrop={handleDropThumbnail}
                                className={`
                                    relative border-2 border-dashed rounded-xl w-full h-56 flex flex-col 
                                    items-center justify-center cursor-pointer overflow-hidden
                                    group
                                    ${isDraggingThumb ? "border-blue-600 bg-blue-50 drop-hover" : "border-slate-300"}
                                `}>
                                {thumbnailPreview ? (
                                    <>
                                        <img
                                            src={thumbnailPreview}
                                            className={`absolute inset-0 w-full h-full object-cover 
                                     ${isRemovingThumb ? "scale-out" : "scale-in"}
                                   `}
                                        />

                                        {/* REMOVE BUTTON – nằm trên cùng */}
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                removeThumbnail();
                                            }}
                                            className="
                                       absolute top-3 right-3 bg-black/60 text-white p-1.5 rounded-full
                                       opacity-0 group-hover:opacity-100 transition z-30
                                   "
                                        >
                                            <X className="h-4 w-4" />
                                        </button>

                                        {/* EDIT OVERLAY – không bắt click, chỉ icon mới bắt click */}
                                        <div
                                            className="
                                     absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 
                                     flex items-center justify-center transition cursor-pointer
                                     pointer-events-none z-10
                                   "
                                        >
                                            <Edit2
                                                className="text-white h-7 w-7 pointer-events-auto"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                    handleEditThumbnail();
                                                }}
                                            />
                                        </div>

                                        {/* Hidden input */}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={inputRef}
                                            onChange={handleChangeThumbnail}
                                            className="hidden"
                                        />
                                    </>


                                ) : (
                                    /* Khi chưa có thumbnail -> hiện UI upload */
                                    <div className="flex flex-col items-center">
                                        <ImageIcon className="h-12 w-12 text-slate-400" />
                                        <p className="text-blue-600 font-medium mt-2">Upload a file</p>
                                        <p className="text-xs text-slate-400">PNG, JPG up to 5MB</p>
                                    </div>
                                )}

                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => e.target.files && uploadThumbnail(e.target.files[0])}
                                />
                            </label>
                        </div>

                        {/* GALLERY */}
                        <div className="mt-6">
                            <label className="text-sm font-medium">Gallery</label>

                            <label onDragOver={(e) => {
                                e.preventDefault();
                                setIsDraggingGallery(true);
                            }}
                                onDragLeave={() => setIsDraggingGallery(false)}
                                onDrop={handleDropGallery}
                                className={`
                                border-2 border-dashed rounded-lg p-10 mt-2 flex flex-col items-center
                                justify-center cursor-pointer transition
                                ${isDraggingGallery ? "border-blue-600 bg-blue-50 drop-hover" : "border-slate-300"}
                              `}>
                                <ImageIcon className="h-10 w-10 mb-2" />
                                <p className="text-blue-600 font-medium">Upload images</p>
                                <p className="text-xs text-slate-400">PNG, JPG up to 5MB</p>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => e.target.files && uploadGallery(e.target.files)}
                                />
                            </label>

                            <div className="flex gap-3 mt-4 flex-wrap">
                                {galleryPreview.map((img, index) => (
                                    <div key={index} className={`
                                    relative group h-20 w-20 rounded-lg overflow-hidden
                                    ${removingGalleryIndex === index ? "scale-out" : "scale-in"}
                                  `}>
                                        <img src={img} className="h-20 w-20 rounded-lg object-cover" />

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => removeGalleryImage(index)}
                                            className="
              absolute top-1 right-1 bg-black/50 p-1 rounded-full 
              opacity-0 group-hover:opacity-100 transition
            "
                                        >
                                            <X className="h-4 w-4 text-white" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* VARIANTS */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-lg font-semibold">Variants</h2>

                            <button
                                onClick={addVariant}
                                className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg"
                            >
                                <Plus className="h-4 w-4" /> Add Variant Option
                            </button>
                        </div>

                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="bg-slate-50 text-slate-600 uppercase text-xs">
                                    <th className="px-4 py-3 text-left">Variant</th>
                                    <th className="px-4 py-3 text-left">Price</th>
                                    <th className="px-4 py-3 text-left">SKU</th>
                                    <th className="px-4 py-3 text-left">Image</th>
                                    <th className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {variants.map((v, index) => (
                                    <tr key={v.id} className="border-b hover:bg-slate-50 border-slate-200">
                                        <td className="px-4 py-3">
                                            <input
                                                className={inputBase}
                                                value={v.name}
                                                onChange={(e) => updateVariant(index, "name", e.target.value)}
                                            />
                                        </td>

                                        <td className="px-4 py-3">
                                            <input
                                                className={inputBase}
                                                value={v.price}
                                                onChange={(e) => updateVariant(index, "price", e.target.value)}
                                            />
                                        </td>

                                        <td className="px-4 py-3">
                                            <input
                                                className="w-full px-3 py-2.5 rounded-md bg-slate-100 text-slate-500 cursor-not-allowed border border-slate-300 opacity-70"
                                                value={v.sku}
                                                disabled
                                            />
                                        </td>

                                        <td className="px-4 py-3">
                                            {!v.imagePreview ? (
                                                <label className="cursor-pointer text-blue-600">
                                                    <ImageUp className="h-5 w-5" />
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) =>
                                                            e.target.files &&
                                                            uploadVariantImage(index, e.target.files[0])
                                                        }
                                                    />
                                                </label>
                                            ) : (
                                                <div className="relative w-12 h-12 group">
                                                    <img src={v.imagePreview} className="w-12 h-12 rounded-md object-cover" />

                                                    <div className="absolute inset-0 bg-black/50 rounded-md opacity-0 group-hover:opacity-100 flex items-center justify-center">
                                                        <label className="cursor-pointer">
                                                            <Edit2 className="h-5 w-5 text-white" />
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                className="hidden"
                                                                onChange={(e) =>
                                                                    e.target.files &&
                                                                    uploadVariantImage(index, e.target.files[0])
                                                                }
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                            )}
                                        </td>

                                        <td className="px-4 py-3 text-right">
                                            <button
                                                onClick={() => removeVariant(index)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <X />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>

                {/* ---------------- RIGHT SIDE - META INFO (4 cols) ---------------- */}
                <div className="col-span-4 space-y-6">

                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Meta Info</h2>

                        <div className="space-y-4">

                            {/* STATUS */}
                            <div>
                                <label className="text-sm font-medium">Status</label>
                                <select
                                    className={inputBase}
                                    value={formData.status}
                                    onChange={e => setFormData(prev => ({ ...prev, status: e.target.value }))}
                                >
                                    {Object.values(ProductStatus)
                                        .filter(v => typeof v === "number")
                                        .map(value => (
                                            <option key={value} value={value}>
                                                {ProductStatusLabel[value as ProductStatus]}
                                            </option>
                                        ))}
                                </select>
                            </div>


                        </div>
                    </div>

                </div>

            </div>
        </div>

    );
};

export default EditProductPage;
