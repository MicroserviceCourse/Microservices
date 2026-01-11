import { useEffect, useState } from "react";
import { Plus, X, ImageIcon, Edit2, ImageUp } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { EditProduct, getProductDetail } from "../service/api/Product";
import { useAlert } from "../components/alert-context";
import { type Variant, type ProductEditData, type UpdateProductPayload } from "../types";
import { ProductStatus, ProductStatusLabel } from "../enums";
import CategoryParentSelect from "../components/category/CategoryParentSelect";
import { getCategories } from "../service/api/Categories";
import MediaLibraryModal from "../components/media/MediaLibraryModal";

const inputBase =
  "w-full bg-slate-50 border border-slate-300 text-slate-800 rounded-md shadow-sm px-3 py-2.5 " +
  "focus:ring-2 focus:ring-blue-600 focus:outline-none transition";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [isRemovingThumb, setIsRemovingThumb] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [removingGalleryIndex, setRemovingGalleryIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<ProductEditData>({
    name: "",
    description: "",
    price: "",
    status: String(ProductStatus.ACTIVE),
    thumbnailFile: null,
    galleryFiles: [],
    categoryIds: [] as number[],
  });
  const [openVariantIndex, setOpenVariantIndex] = useState<number | null>(null);

  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [openMediaModal, setOpenMediaModal] = useState<"thumbnail" | "gallery" | false>(false);
  const [galleryPreview, setGalleryPreview] = useState<string[]>([]);

  const [variants, setVariants] = useState<Variant[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

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
          categoryIds: p.categories.map((c: any) => c.id),
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
            imageFile: null,
          };
        });

        setVariants(loadedVariants);
      } catch (error) {
        showAlert({ title: "Unable to load product", type: "error" });
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    fetchCategories();
  }, [id]);
  const removeThumbnail = () => {
    setIsRemovingThumb(true);
    setTimeout(() => {
      setThumbnailPreview(null);
      setIsRemovingThumb(false);
    }, 250);
  };

  const removeGalleryImage = (index: number) => {
    setRemovingGalleryIndex(index);

    setTimeout(() => {
      // Xóa preview
      setGalleryPreview((prev) => prev.filter((_, i) => i !== index));
      setRemovingGalleryIndex(null);
    }, 250);
  };

  const removeVariant = (index: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "",
        price: "",
        sku: "",
        imagePreview: null,
        imageFile: null,
      },
    ]);
  };

  const updateVariant = (index: number, key: keyof Variant, value: any) => {
    setVariants((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [key]: value,
        sku: key === "name" ? generateVariantSKU(formData.name, value) : updated[index].sku,
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
      thumbnailUrl: typeof thumbnailPreview === "string" ? thumbnailPreview : "",
      galleryUrls: galleryPreview,
      status: formData.status,
      categoryIds: formData.categoryIds,
      variants: variants.map((v) => ({
        id: typeof v.id === "number" ? v.id : null,
        name: v.name,
        price: Number(v.price),
        sku: v.sku,
        imageUrl: v.imagePreview ?? "",
      })),
    };

    try {
      const res = await EditProduct(Number(id), payload);

      showAlert({
        title: res?.data?.message || "Updated successfully!",
        type: "success",
        autoClose: 2500,
      });

      navigate("/product");
    } catch (err: any) {
      showAlert({
        title: err?.response?.data?.message || "Update failed",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (hasError)
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold text-red-500">Failed to load product.</h2>
        <p className="text-slate-600 mt-2">Please try again later.</p>

        <button
          onClick={() => navigate("/product")}
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
    <div className=" bg-gray-50 min-h-screen space-y-8">
      {/* HEADER */}
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <h1 className="text-2xl font-bold">Edit Product</h1>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/product")}
            className="px-4 py-2 rounded-lg  bg-slate-200 hover:bg-slate-300 font-medium text-[#334155"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className={`px-4 py-2 rounded-lg text-white shadow-sm 
                        ${isSaving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
                    `}
          >
            {isSaving ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 010 16v4l3.5-3.5L12 20v-4a8 8 0 01-8-8z"
                  ></path>
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
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
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
                    setFormData((prev) => ({ ...prev, name }));
                    setVariants((prev) =>
                      prev.map((v) => ({
                        ...v,
                        sku: generateVariantSKU(name, v.name),
                      })),
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
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                ></textarea>
              </div>

              {/* PRICE */}
              <div>
                <label className="text-sm font-medium">Price</label>
                <input
                  className={inputBase}
                  value={formData.price}
                  onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Categories</label>
                <CategoryParentSelect
                  categories={categories}
                  value={formData.categoryIds}
                  onChange={(ids) => setFormData((prev) => ({ ...prev, categoryIds: ids }))}
                />
              </div>
            </div>
          </div>

          {/* MEDIA */}
          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <h2 className="text-lg font-semibold mb-4">Media</h2>

            {/* THUMBNAIL */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Thumbnail</label>

              <div
                onClick={() => setOpenMediaModal("thumbnail")}
                className="
        relative border-2 border-dashed rounded-xl w-full h-56 flex flex-col 
        items-center justify-center cursor-pointer overflow-hidden group
        border-slate-300 hover:border-blue-500 hover:bg-blue-50 transition
    "
              >
                {thumbnailPreview ? (
                  <>
                    <img
                      src={thumbnailPreview}
                      className={`absolute inset-0 w-full h-full object-cover 
                                            ${isRemovingThumb ? "scale-out" : "scale-in"}
                                        `}
                    />

                    {/* DELETE BUTTON */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // CHẶN MỞ POPUP
                        removeThumbnail();
                      }}
                      className="
                    absolute top-3 right-3 bg-black/60 text-white p-1.5 rounded-full
                    opacity-0 group-hover:opacity-100 transition z-20
                "
                    >
                      <X className="h-4 w-4" />
                    </button>

                    {/* EDIT OVERLAY */}
                    <div
                      onClick={(e) => e.stopPropagation()} // CHẶN CLICK
                      className="
                    absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                    flex items-center justify-center transition cursor-pointer
                "
                    >
                      <Edit2
                        onClick={() => setOpenMediaModal("thumbnail")}
                        className="text-white h-7 w-7"
                      />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center pointer-events-none">
                    <ImageIcon className="h-12 w-12 text-slate-400" />
                    <p className="text-blue-600 font-medium mt-2">Chọn ảnh từ thư viện</p>
                    <p className="text-xs text-slate-400">PNG, JPG up to 5MB</p>
                  </div>
                )}
              </div>
            </div>
            {/* GALLERY */}
            <div className="mt-6">
              <label className="text-sm font-medium">Gallery</label>

              {/* Button mở thư viện */}
              <div
                onClick={() => setOpenMediaModal("gallery")}
                className="
            border-2 border-dashed rounded-lg p-10 mt-2 flex flex-col items-center
            justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition
        "
              >
                <ImageIcon className="h-10 w-10 mb-2" />
                <p className="text-blue-600 font-medium">Chọn ảnh từ thư viện</p>
                <p className="text-xs text-slate-400">PNG, JPG up to 5MB</p>
              </div>

              {/* Preview gallery */}
              <div className="flex gap-3 mt-4 flex-wrap">
                {galleryPreview.map((img, index) => (
                  <div
                    key={index}
                    className={`
                                    relative group h-20 w-20 rounded-lg overflow-hidden
                                    ${removingGalleryIndex === index ? "scale-out" : "scale-in"}
                                  `}
                  >
                    <img src={img} className="h-20 w-20 rounded-lg object-cover" />
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
                        <div
                          className="text-blue-600 cursor-pointer hover:underline text-sm"
                          onClick={() => setOpenVariantIndex(index)}
                        >
                          <ImageUp className="h-5 w-5" />
                        </div>
                      ) : (
                        <div
                          className="relative w-12 h-12 group cursor-pointer"
                          onClick={() => setOpenVariantIndex(index)}
                        >
                          <img src={v.imagePreview} className="w-12 h-12 rounded-md object-cover" />

                          {/* OVERLAY */}
                          <div
                            className="
                                absolute inset-0 bg-black/50 rounded-md 
                                 opacity-0 group-hover:opacity-100 
                                 flex items-center justify-center
                                 transition-opacity"
                          >
                            <Edit2 className="h-5 w-5 text-white" />
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
                  onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
                >
                  {Object.values(ProductStatus)
                    .filter((v) => typeof v === "number")
                    .map((value) => (
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

      <MediaLibraryModal
        isOpen={openMediaModal === "thumbnail"}
        multiple={false}
        onClose={() => setOpenMediaModal(false)}
        onSelect={(value) => {
          const url = Array.isArray(value) ? value[0] : value;
          setThumbnailPreview(url);
        }}
      />
      <MediaLibraryModal
        isOpen={openMediaModal === "gallery"}
        multiple={true}
        onClose={() => setOpenMediaModal(false)}
        onSelect={(urls) => {
          const arr = Array.isArray(urls) ? urls : [urls];
          setGalleryPreview((prev) => [...prev, ...arr]);
        }}
      />

      <MediaLibraryModal
        isOpen={openVariantIndex !== null}
        multiple={false}
        onClose={() => setOpenVariantIndex(null)}
        onSelect={(url) => {
          if (openVariantIndex === null) return;

          const finalUrl = Array.isArray(url) ? url[0] : url; // luôn là string

          setVariants((prev) => {
            const arr = [...prev];
            arr[openVariantIndex].imagePreview = finalUrl;
            arr[openVariantIndex].imageFile = null;
            return arr;
          });

          setOpenVariantIndex(null);
        }}
      />
    </div>
  );
};

export default EditProductPage;
