import { useEffect, useState } from "react";
import type { UpdateBlogTagFormModalProps } from "../../../types/blog/tag/tag.type";
import { getBlogTabById, updateBlogTag } from "../../../service/api/Blog/BlogTag";
import { useAlert } from "../../alert-context/alert-context";
import { X } from "lucide-react";

const EditBlogTagModal = ({
  isOpen,
  onClose,
  onSuccess,
  blogTagId,
}: UpdateBlogTagFormModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { showAlert } = useAlert();
  useEffect(() => {
    if (!isOpen || !blogTagId) return;
    setLoading(true);
    getBlogTabById(blogTagId)
      .then((res) => {
        const data = res?.data?.data;
        setFormData({
          name: data.name,
        });
      })
      .catch(() => {
        showAlert({
          title: "Failed to load blog category",
          type: "error",
        });
        onClose();
      })
      .finally(() => {
        setLoading(false);
      });
  }, [isOpen, blogTagId]);
  const handleSubmit = async () => {
    setSaving(true);
    try {
      await updateBlogTag(blogTagId!, {
        name: formData.name.trim(),
      });
      showAlert({
        title: "Blog tag updated successfully",
        type: "success",
        autoClose: 3000,
      });
      onSuccess?.();
      onClose();
    } catch {
      showAlert({
        title: "Update blog category failed",
        type: "error",
      });
    } finally {
      setSaving(false);
    }
  };
  if(!isOpen) return <></>;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
       <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-lg ring-1 ring-[#E9EEF5]">
        <div className="flex items-center justify-between border-b border-[#EEF2F7] px-5 py-4">
          <h2 className="text-base font-semibold text-[#1E293B]">Edit Blog Tag</h2>
          <button
            onClick={onClose}
            disabled={loading || saving}
            className="rounded-lg p-1 text-[#64748B] hover:bg-[#F1F5F9]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-4 px-5 py-4">
          <div>
            <label className="mb-1 block text-sm font-medium  text-[#334155]">Tag name</label>
            {loading ? (
              <div className="h-9 w-full animate-pulse rounded-xl bg-[#F1F5F9]" />
            ) : (
              <input
                type="text"
                value={formData.name}
                disabled={saving}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="
                  w-full rounded-xl border border-[#E6EDF5]
                  px-3 py-2 text-sm
                  disabled:bg-[#F8FAFC]
                  focus:border-[#FF7A29]
                  focus:outline-none focus:ring-1 focus:ring-[#FF7A29]
                "
              />
            )}
          </div>
        </div>
        <div className="flex justify-end gap-2 border-t border-[#EEF2F7] px-5 py-4">
          <button
            onClick={onClose}
            disabled={saving}
            className="
              rounded-xl border border-[#E6EDF5]
              bg-white px-4 py-2 text-sm
              text-[#475569] hover:bg-[#F8FAFC]
              disabled:opacity-50
            "
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving || loading}
            className={`
              rounded-xl px-4 py-2 text-sm font-medium text-white transition
              ${saving ? "cursor-not-allowed bg-[#FF7A29]/70" : "bg-[#FF7A29] hover:bg-[#FF6A14]"}
            `}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  )
};
export default EditBlogTagModal;