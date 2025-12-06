import { useEffect, useState } from "react";
import { Plus, X, ImageIcon, Edit2, ImageUp } from "lucide-react";
import { type ProductFormData, type Variant } from "../types";
import { useAlert } from "../components/alert-context";
import { createProduct } from "../service/api/Product";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../service/api/Categories";
import CategoryParentSelect from "../components/category/CategoryParentSelect";

const inputBase =
    "w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 " +
    "text-slate-800 dark:text-slate-200 rounded-md shadow-sm px-3 py-2.5 " +
    " focus:ring-2 focus:ring-blue-600 focus:outline-none transition";


const CreateProductPage = () => {

    const [categories,setCategories]=useState<any[]>([]);
    const [formData, setFormData] = useState<ProductFormData>({
        name: "",
        description: "",
        price: "",
        thumbnailFile: null as File | null,
        galleryFiles: [],
        categoryIds: [] as number[]
    });
    const navigate = useNavigate();
    const { showAlert } = useAlert();
    const [removingGalleryIndex, setRemovingGalleryIndex] = useState<number | null>(null);

    const [isSaving, setIsSaving] = useState(false);
    const [isRemovingThumb, setIsRemovingThumb] = useState(false);

    const [removingIds, setRemovingIds] = useState<number[]>([]);

    const [isDraggingThumb, setIsDraggingThumb] = useState(false);
    const [isDraggingGallery, setIsDraggingGallery] = useState(false);
    const [galleryPreview, setGalleryPreview] = useState<string[]>([]);
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
    const [variants, setVariants] = useState<Variant[]>([
        { id: null, name: "", price: "", sku: "", imagePreview: null, imageFile: null }
    ]);
    const uploadThumbnail = (file: File) => {
        setFormData(prev => ({
            ...prev,
            thumbnailFile: file
        }));

        // Tạo preview
        const reader = new FileReader();
        reader.onload = () => setThumbnailPreview(reader.result as string);
        reader.readAsDataURL(file);
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const uploadGallery = (files: FileList) => {
        const arr = Array.from(files);

        // Lưu file thật
        setFormData(prev => ({
            ...prev,
            galleryFiles: [...prev.galleryFiles, ...arr]
        }));

        // Tạo preview
        Promise.all(
            arr.map(file => {
                return new Promise<string>((resolve) => {
                    const r = new FileReader();
                    r.onload = () => resolve(r.result as string);
                    r.readAsDataURL(file);
                });
            })
        ).then(images => {
            setGalleryPreview(prev => [...prev, ...images]);
        });
    };
    const uploadVariantImage = (index: number, file: File) => {
        const preview = URL.createObjectURL(file);
        setVariants(prev => {
            const arr = [...prev];
            arr[index] = {
                ...arr[index],
                imagePreview: preview,
                imageFile: file
            };
            return arr;
        });
    };

    const addVariant = () => {
        setVariants(prev => [
            ...prev,
            { id: null, name: "", price: "", sku: "", imagePreview: null, imageFile: null }
        ]);
    };

    const updateVariant = (index: number, key: keyof Variant, value: any) => {
        setVariants(prev => {
            const arr = [...prev];
            arr[index] = {
                ...arr[index],
                [key]: value,
                sku: key === "name"
                    ? generateVariantSKU(formData.name, value)
                    : arr[index].sku
            };
            return arr;
        });
    };



    const removeVariant = (index: number) => {
        setRemovingIds(prev => [...prev, index]);


        setTimeout(() => {
            setVariants(prev => prev.filter((_, i) => i !== index));

            setRemovingIds(prev => prev.filter(x => x !== index));
        }, 250);
    };

    const removeGalleryImage = (index: number) => {
        // Xóa preview
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
    const fetchCategories = async () => {
        try {
            const res = await getCategories({ all: true });
            setCategories(res.content || []);
        } catch (err) {
            console.log("Failed to load categories");
        }
    };
    useEffect(()=>{
        fetchCategories();
    })
    const handleDropThumbnail = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDraggingThumb(false);

        const file = e.dataTransfer.files?.[0];
        if (file) uploadThumbnail(file);
    };
    const handleDropGallery = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDraggingGallery(false);
        if (e.dataTransfer.files) uploadGallery(e.dataTransfer.files);
    };
    const removeThumbnail = () => {
        setIsRemovingThumb(true);
        setTimeout(() => {
            setThumbnailPreview(null);
            setFormData(prev => ({ ...prev, thumbnailFile: null }));
            setIsRemovingThumb(false);
        }, 250);
    };
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
    const handleSaveProduct = async () => {
        if (isSaving) return;

        setIsSaving(true);

        const payload = {
            name: formData.name,
            description: formData.description,
            price: Number(formData.price),
            thumbnailFile: formData.thumbnailFile,
            categoryIds:formData.categoryIds,
            galleryFiles: formData.galleryFiles,
            variants: variants.map(v => ({
                name: v.name,
                price: Number(v.price),
                sku: v.sku,
                imageFile: v.imageFile ?? null
            }))
        }
        try {
            const response = await createProduct(payload);

            showAlert({
                title: response?.data?.message || "Product created successfully!",
                type: "success",
                autoClose: 3000,
            });

            setFormData({
                name: "",
                description: "",
                price: "",
                thumbnailFile: null as File | null,
                galleryFiles: [],
                categoryIds: [] as number[]
            });
            setGalleryPreview([]);
            setThumbnailPreview(null);
            setVariants([]);

        } catch (err: any) {
            showAlert({
                title: err?.response?.data?.message || "Failed to create product.",
                type: "error",
                autoClose: 3000,
            });
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen space-y-8">

            {/* HEADER */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Create Product</h1>

                <div className="flex gap-3">
                    <button onClick={() => navigate("/Dashboard/product")} className="px-4 py-2 rounded-lg  bg-slate-200 hover:bg-slate-300 font-medium text-[#334155">
                        Cancel
                    </button>

                    <button
                        disabled={isSaving}
                        onClick={handleSaveProduct}
                        className={`px-4 py-2 rounded-lg text-white shadow-sm 
                        ${isSaving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
                    `}
                    >
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

            {/* ================= CONTENT ================= */}
            <div className="space-y-8 max-w-6xl mx-auto">

                {/* BASIC INFO */}
                <div className="bg-white p-6 rounded-xl  border border-slate-200">
                    <h2 className="text-lg font-semibold mb-4">Basic Info</h2>

                    <div className="space-y-6">

                        <div>
                            <label className="text-sm font-medium">Name</label>
                            <input
                                className={inputBase}
                                name="name"
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
                                placeholder="e.g. Modern Sofa" />
                        </div>

                        <div>
                            <label className="text-sm font-medium">Description</label>
                            <textarea
                                className={inputBase}
                                rows={5}
                                onChange={handleChange}
                                name="description"
                                value={formData.description}
                                placeholder="Write a detailed description for your product..."
                            ></textarea>
                        </div>

                        <div>
                            <label className="text-sm font-medium">Price</label>
                            <input
                                className={inputBase}
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="$ 250.00" />
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

                <div className="bg-white p-6 rounded-xl border border-slate-200">
                    <h2 className="text-lg font-semibold mb-4">Media</h2>

                    {/* ---------------------- THUMBNAIL ---------------------- */}
                    <div className="space-y-2">
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
                            `}

                        >
                            {/* Khi có thumbnail -> hiện ảnh full box */}
                            {thumbnailPreview ? (
                                <>
                                    <img
                                        src={thumbnailPreview}
                                        className={`absolute inset-0 w-full h-full object-cover 
                                            ${isRemovingThumb ? "scale-out" : "scale-in"}
                                        `}
                                    />
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeThumbnail();
                                        }}
                                        className="
                        absolute top-3 right-3 bg-black/60 text-white p-1.5 rounded-full
                        opacity-0 group-hover:opacity-100 transition
                    "
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                    {/* Overlay Edit */}
                                    <div
                                        className="
            absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 
            flex items-center justify-center transition
          "
                                    >
                                        <Edit2 className="text-white h-7 w-7" />
                                    </div>
                                </>
                            ) : (
                                /* Khi chưa có thumbnail -> hiện UI upload */
                                <div className="flex flex-col items-center">
                                    <ImageIcon className="h-12 w-12 text-slate-400" />
                                    <p className="text-blue-600 font-medium mt-2">Upload a file</p>
                                    <p className="text-xs text-slate-400">PNG, JPG up to 5MB</p>
                                </div>
                            )}

                            {/* Input file */}
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                    e.target.files && uploadThumbnail(e.target.files[0])
                                }
                            />
                        </label>
                    </div>

                    {/* ---------------------- GALLERY ---------------------- */}
                    <div className="mt-6">
                        <label className="text-sm font-medium">Gallery</label>

                        {/* Upload box */}
                        <label
                            onDragOver={(e) => {
                                e.preventDefault();
                                setIsDraggingGallery(true);
                            }}
                            onDragLeave={() => setIsDraggingGallery(false)}
                            onDrop={handleDropGallery}
                            className={`
                                border-2 border-dashed rounded-lg p-10 mt-2 flex flex-col items-center
                                justify-center cursor-pointer transition
                                ${isDraggingGallery ? "border-blue-600 bg-blue-50 drop-hover" : "border-slate-300"}
                              `}

                        >
                            <ImageIcon className="h-10 w-10 mb-2" />
                            <p className="text-blue-600 font-medium">
                                {isDraggingGallery ? "Drop images to upload" : "Upload files"}
                            </p>

                            <p className="text-xs text-slate-400">PNG, JPG up to 5MB</p>

                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => e.target.files && uploadGallery(e.target.files)}
                            />
                        </label>

                        {/* Preview gallery */}
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


                {/* VARIANTS (TABLE STYLE) */}
                <div className="bg-white p-6 rounded-xl  border border-slate-200">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg font-semibold">Variants</h2>

                        <button
                            onClick={addVariant}
                            className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            <Plus className="h-4 w-4" /> Add Variant Option
                        </button>
                    </div>

                    <p className="text-sm text-slate-500 mb-4">
                        Add variants if this product comes in multiple versions, like different sizes or colors.
                    </p>

                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="bg-slate-50 text-slate-600 uppercase text-xs">
                                <th className="px-4 py-3 text-left">Variant</th>
                                <th className="px-4 py-3 text-left">Price</th>
                                <th className="px-4 py-3 text-left">SKU (optional)</th>
                                <th className="px-4 py-3 text-left">Image</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {variants.map((v, index) => (
                                <tr key={index} className={`
                                border-b border-slate-200 last:border-none hover:bg-slate-50 transition
                                ${removingIds.includes(index) ? "fade-out" : "fade-in"}
                              `}>

                                    {/* Variant */}
                                    <td className="px-4 py-3">
                                        <input
                                            className={inputBase}
                                            value={v.name}
                                            onChange={(e) => updateVariant(index, "name", e.target.value)}
                                            placeholder="Red / Small"
                                        />
                                    </td>

                                    {/* Price */}
                                    <td className="px-4 py-3">
                                        <input
                                            className={inputBase}
                                            value={v.price}
                                            onChange={(e) => updateVariant(index, "price", e.target.value)}
                                            placeholder="$ 250.00"
                                        />
                                    </td>

                                    {/* SKU */}
                                    <td className="px-4 py-3">
                                        <input
                                            className="
                                            w-full px-3 py-2.5 rounded-md 
                                            bg-slate-100 text-slate-500 cursor-not-allowed 
                                             border border-slate-300 
                                             opacity-70 
                                             focus:outline-none
                                            select-none"
                                            value={v.sku}
                                            disabled
                                        />
                                    </td>

                                    <td className="px-4 py-3">
                                        {!v.imagePreview ? (
                                            /* ADD IMAGE */
                                            <label className="text-blue-600 cursor-pointer hover:underline text-sm">
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
                                            /* IMAGE WITH EDIT ICON ONLY */
                                            <div className="relative w-12 h-12 group">
                                                <img
                                                    src={v.imagePreview}
                                                    className="w-12 h-12 rounded-md object-cover"
                                                />

                                                {/* OVERLAY */}
                                                <div
                                                    className="
        absolute inset-0 bg-black/50 rounded-md 
        opacity-0 group-hover:opacity-100 
        flex items-center justify-center
        transition-opacity
      "
                                                >
                                                    <label className="cursor-pointer">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-5 w-5 text-white hover:text-blue-200"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M11 5h2m-1-1v2m4.38 2.62l1 1a1.5 1.5 0 010 2.12l-7.5 7.5a1 1 0 01-.71.29H7v-2.17a1 1 0 01.29-.71l7.5-7.5a1.5 1.5 0 012.12 0z"
                                                            />
                                                        </svg>

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


                                    {/* DELETE ROW */}
                                    {/* DELETE ROW */}
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
        </div>
    );
};

export default CreateProductPage;
