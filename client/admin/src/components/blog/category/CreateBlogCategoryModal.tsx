import { useState } from "react";
import type { BlogCategoryFormModalProps } from "../../../types/blog/category/category.type";
import { X } from "lucide-react";
import { createBlogCategory } from "../../../service/api/Blog/BlogCategory";
import { useAlert } from "../../alert-context/alert-context";

const CreateBlogCategoryModal = ({ isOpen, onClose, onSuccess }: BlogCategoryFormModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
  });
  const { showAlert } = useAlert();
  const [saving, setSaving] = useState(false);
  const handleSubmit = async () => {
    setSaving(true);
    try {
      const cleanedData = Object.fromEntries(
        Object.entries({
          name: formData.name,
        }).map(([key, value]) => [key, value?.toString().trim() === "" ? null : value]),
      );
      const response = await createBlogCategory(cleanedData);
      showAlert({
        title: response?.data?.message || "Blog category create successfully",
        type: "success",
        autoClose: 3000,
      });
      setFormData({
        name: "",
      })
      onClose();
      onSuccess();
    } catch (err: any) {
      console.error("create error:", err.message);
      showAlert({
        title:
          err?.response?.data?.message || "Blog category create failed. Please try again later.",
        type: "error",
        autoClose: 4000,
      });
    } finally {
      setSaving(false);
    }
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-lg ring-1 ring-[#E9EEF5]">
        <div className="flex items-center justify-between border-b border-[#EEF2F7] px-5 py-4">
          <h2 className="text-base font-semibold text-[#1E293B]">Create Blog Category</h2>
          <button onClick={onClose} className="rounded-lg p-1 text-[#64748B] hover:bg-[#F1F5F9]">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-4 px-5 py-4">
          <div>
            <label className="mb-1 block text-sm font-medium  text-[#334155]">Category name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter category blog name"
              className="w-full rounded-xl border border-[#E6EDF5]
                px-3 py-2 text-sm
                focus:border-[#FF7A29]
                focus:outline-none focus:ring-1 focus:ring-[#FF7A29]"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 border-t border-[#EEF2F7] px-5 py-4">
          <button
            onClick={onClose}
            className="rounded-xl border border-[#E6EDF5]
            bg-white px-4 py-2 text-sm text-[#475569] hover:bg-[#F8FAFC]"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className={`rounded-xl px-4 py-2 text-sm font-medium text-white transition 
                ${saving ? "cursor-not-allowed bg-[#FF7A29]/70" : "bg-[#FF7A29] hover:bg-[#FF6A14]"}`}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default CreateBlogCategoryModal;
