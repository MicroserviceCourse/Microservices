import { useState } from "react";
import { Upload, Image, Plus, X, ImageIcon, Edit2, ImageUp } from "lucide-react";

const inputBase =
    "w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 " +
    "text-slate-800 dark:text-slate-200 rounded-md shadow-sm px-3 py-2.5 " +
    " focus:ring-2 focus:ring-blue-600 focus:outline-none transition";

interface Variant {
    id: number;
    name: string;
    price: string;
    stock: string;
    sku: string;
    image?: string | null;
}

const CreateProductPage = () => {
    const [variants, setVariants] = useState<Variant[]>([
        { id: 1, name: "", price: "", stock: "", sku: "", image: null },
    ]);
    const [thumbnail, setThumbnail] = useState<string | null>(null);
    const [gallery, setGallery] = useState<string[]>([]);
    const [removing, setRemoving] = useState<number | null>(null);
    const uploadThumbnail = (file: File) => {
        const reader = new FileReader();
        reader.onload = () => setThumbnail(reader.result as string);
        reader.readAsDataURL(file);
    };

    const uploadGallery = (files: FileList) => {
        const readers = Array.from(files).map(file => {
            return new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.readAsDataURL(file);
            });
        });
    
        Promise.all(readers).then(images => {
            // images = ["base64_1", "base64_2", ...]
            setGallery(prev => [...prev, ...images]);
        });
    };
    
    const removeGalleryImage = (index: number) => {
        setGallery((prev) => prev.filter((_, i) => i !== index));
    };
    const addVariant = () => {
        setVariants([
            ...variants,
            { id: Date.now(), name: "", price: "", stock: "", sku: "", image: null },
        ]);
    };

    const updateVariant = (id: number, key: keyof Variant, value: any) => {
        setVariants((prev) =>
            prev.map((v) => (v.id === id ? { ...v, [key]: value } : v))
        );
    };

    const uploadVariantImage = (id: number, file: File) => {
        const url = URL.createObjectURL(file);
        updateVariant(id, "image", url);
    };
    const deleteVariantRow = (id: number) => {
        setRemoving(id);
        setTimeout(() => {
            setVariants(prev => prev.filter(v => v.id !== id));
            setRemoving(null);
        }, 250);
    };
    const [isDraggingThumb, setIsDraggingThumb] = useState(false);

    const handleDropThumbnail = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDraggingThumb(false);

        const file = e.dataTransfer.files?.[0];
        if (file) uploadThumbnail(file);
    };
    const [isDraggingGallery, setIsDraggingGallery] = useState(false);
    const handleDropGallery = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDraggingGallery(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) uploadGallery(files);
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen space-y-8">

            {/* HEADER */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Create Product</h1>

                <div className="flex gap-3">
                    <button className="px-4 py-2 rounded-lg  bg-slate-200 hover:bg-slate-300 font-medium text-[#334155">
                        Cancel
                    </button>

                    <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-sm">
                        Save Product
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
                            <input className={inputBase} placeholder="e.g. Modern Sofa" />
                        </div>

                        <div>
                            <label className="text-sm font-medium">Description</label>
                            <textarea
                                className={inputBase}
                                rows={5}
                                placeholder="Write a detailed description for your product..."
                            ></textarea>
                        </div>

                        <div>
                            <label className="text-sm font-medium">Price</label>
                            <input className={inputBase} placeholder="$ 250.00" />
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
                                items-center justify-center text-slate-500 cursor-pointer overflow-hidden
                                ${isDraggingThumb ? "border-blue-600 bg-blue-50" : "border-slate-300"}
                            `}
                        >
                            {/* Khi có thumbnail -> hiện ảnh full box */}
                            {thumbnail ? (
                                <>
                                    <img
                                        src={thumbnail}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />

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
        border-2 border-dashed rounded-lg p-10 mt-2 flex flex-col items-center justify-center 
        text-slate-500 cursor-pointer transition
        ${isDraggingGallery ? "border-blue-600 bg-blue-50" : "border-slate-300"}
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
                            {gallery.map((img, index) => (
                                <div key={index} className="relative group h-20 w-20">
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
                            {variants.map((v) => (
                                <tr key={v.id} className={`
                                    border-b border-slate-200 last:border-none hover:bg-slate-50 transition
                                    ${removing === v.id ? "fade-out" : "fade-in"}
                                  `}>

                                    {/* Variant */}
                                    <td className="px-4 py-3">
                                        <input
                                            className={inputBase}
                                            value={v.name}
                                            onChange={(e) => updateVariant(v.id, "name", e.target.value)}
                                            placeholder="Red / Small"
                                        />
                                    </td>

                                    {/* Price */}
                                    <td className="px-4 py-3">
                                        <input
                                            className={inputBase}
                                            value={v.price}
                                            onChange={(e) => updateVariant(v.id, "price", e.target.value)}
                                            placeholder="$ 250.00"
                                        />
                                    </td>

                                    {/* SKU */}
                                    <td className="px-4 py-3">
                                        <input
                                            className={inputBase}
                                            value={v.sku}
                                            onChange={(e) => updateVariant(v.id, "sku", e.target.value)}
                                            placeholder="SOFA-RED-S"
                                        />
                                    </td>

                                    <td className="px-4 py-3">
                                        {!v.image ? (
                                            /* ADD IMAGE */
                                            <label className="text-blue-600 cursor-pointer hover:underline text-sm">
                                                <ImageUp className="h-5 w-5" />
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) =>
                                                        e.target.files &&
                                                        uploadVariantImage(v.id, e.target.files[0])
                                                    }
                                                />
                                            </label>
                                        ) : (
                                            /* IMAGE WITH EDIT ICON ONLY */
                                            <div className="relative w-12 h-12 group">
                                                <img
                                                    src={v.image}
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
                                                                uploadVariantImage(v.id, e.target.files[0])
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
                                            onClick={() => deleteVariantRow(v.id)}
                                            className="text-red-500 hover:text-red-700 transition"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3m-4 0h14"
                                                />
                                            </svg>
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
