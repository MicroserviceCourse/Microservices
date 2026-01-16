import { useState } from "react";
import type { CreatePromotionModalProps } from "../../types/promotion";
import { X } from "lucide-react";
import { useAlert } from "../alert-context/alert-context";
import { createPromotion } from "../../service/api/Promotion";

const CreatePromotionModal = ({ isOpen, onClose, onSuccess }: CreatePromotionModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    value: "",
    type: "",
    priority: 0,
    startAt: "",
    endAt: "",
  });
  const { showAlert } = useAlert();
  const [saving, setSaving] = useState(false);
  const toOffsetDateTime = (value: string) => {
    if (!value) return null;
    return new Date(value).toISOString();
  };
  const handleSubmit = async () => {
    setSaving(true);
    try {
      const cleanedData = Object.fromEntries(
        Object.entries({
          name: formData.name,
          value: formData.value,
          type: formData.type,
          priority: formData.priority,
          startAt: toOffsetDateTime(formData.startAt),
          endAt: toOffsetDateTime(formData.endAt),
        }).map(([key, value]) => [key, value?.toString().trim() === "" ? null : value]),
      );
      const response = await createPromotion(cleanedData);
      showAlert({
        title: response?.data?.message || "Promotion create successfully",
        type: "success",
        autoClose: 3000,
      });
      setFormData({
        name: "",
        value: "",
        type: "",
        priority: 0,
        startAt: "",
        endAt: "",
      });
      onClose();
      onSuccess();
    } catch (err: any) {
      console.error("create error:", err.message);
      showAlert({
        title: err?.response?.data?.message || "Promotion create failed. Please try again later.",
        type: "error",
        autoClose: 4000,
      });
    } finally {
      setSaving(false);
    }
  };
  if (!isOpen) return <></>;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-lg ring-1 ring-[#E9EEF5]">
        <div className="flex items-center justify-between border-b  border-[#EEF2F7] px-5 py-4">
          <h2 className="text-base font-semibold text-[#1E293B]">Create Promotion</h2>
          <button onClick={onClose} className="rounded-lg p-1 text-[#64748B] hover:bg-[#F1F5F9]">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-4 px-5 py-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-[#334155]">Promotion name</label>
            <input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter promotion name"
              className="w-full rounded-xl border border-[#E6EDF5]
                px-3 py-2 text-sm   
                focus:border-[#FF7A29]
                focus:outline-none focus:ring-1 focus:ring-[#FF7A29]"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[#334155]">Promotion type</label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e.target.value,
                })
              }
              className="w-full rounded-xl border border-[#E6EDF5]
                px-3 py-2 text-sm   
                focus:border-[#FF7A29]
                focus:outline-none focus:ring-1 focus:ring-[#FF7A29]"
            >
              <option value="">Select promotion type</option>
              <option value="1">Percent</option>
              <option value="2">Fixed</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[#334155]">Value</label>
            <input
              type="number"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              className="w-full rounded-xl border border-[#E6EDF5]
                px-3 py-2 text-sm   
                focus:border-[#FF7A29]
                focus:outline-none focus:ring-1 focus:ring-[#FF7A29]"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[#334155]">Priority</label>
            <input
              type="text"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: Number(e.target.value) })}
              className="w-full rounded-xl border border-[#E6EDF5]
                px-3 py-2 text-sm   
                focus:border-[#FF7A29]
                focus:outline-none focus:ring-1 focus:ring-[#FF7A29]"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-[#334155]">Start at</label>
              <input
                type="datetime-local"
                value={formData.startAt}
                onChange={(e) => setFormData({ ...formData, startAt: e.target.value })}
                className="w-full rounded-xl border border-[#E6EDF5]
                px-3 py-2 text-sm   
                focus:border-[#FF7A29]
                focus:outline-none focus:ring-1 focus:ring-[#FF7A29]"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-[#334155]">End at</label>
              <input
                type="datetime-local"
                value={formData.endAt}
                onChange={(e) => setFormData({ ...formData, endAt: e.target.value })}
                className="w-full rounded-xl border border-[#E6EDF5]
                px-3 py-2 text-sm   
                focus:border-[#FF7A29]
                focus:outline-none focus:ring-1 focus:ring-[#FF7A29]"
              />
            </div>
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
export default CreatePromotionModal;
