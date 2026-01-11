import React, { useState } from "react";
import { useAlert } from "../components/alert-context";
import { createPromotion } from "../service/api/Promotion";
import { useNavigate } from "react-router-dom";

const CreatePromotionPage = () => {
  const [form, setForm] = useState({
    name: "",
    type: "",
    value: "",
    priority: 1,
    startAt: "",
    endAt: "",
  });
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const { showAlert } = useAlert();
  const toOffsetDateTime = (value: string) => {
    if (!value) return null;
    return new Date(value).toISOString();
  };
  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);

    try {
      const payload = {
        name: form.name,
        type: Number(form.type),
        value: Number(form.value),
        priority: Number(form.priority),
        startAt: toOffsetDateTime(form.startAt),
        endAt: toOffsetDateTime(form.endAt),
      };
      const response = await createPromotion(payload);

      showAlert({
        title: response?.data?.message || "Promotion created successfully!",
        type: "success",
        autoClose: 3000,
      });
      setForm({
        name: "",
        type: "",
        value: "",
        priority: 1,
        startAt: "",
        endAt: "",
      });
    } catch (err: any) {
      showAlert({
        title: err?.response?.data?.message || "Failed to create promotion.",
        type: "error",
        autoClose: 3000,
      });
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Create Promotion</h1>
          <p className="text-sm text-gray-500">
            Define the mechanics, eligibility, and duration for your new marketing campaign.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/Dashboard/promotion")}
            className="px-4 py-2 rounded-lg  bg-slate-200 hover:bg-slate-300 font-medium text-[#334155"
          >
            Cancel
          </button>
          <button
            disabled={isSaving}
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
              "Save Promotion"
            )}
          </button>
        </div>
      </div>
      <div className="space-y-8 max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-xl  border border-slate-200 space-y-4">
          <h2 className="font-medium text-gray-900">General Information</h2>
          <div>
            <label className="text-sm text-gray-600">Promotion Name</label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="e.g., Summer Flash Sale 2024"
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600
                        text-slate-800 dark:text-slate-200 rounded-md shadow-sm px-3 py-1.5
                        focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Promotion Type</label>
              <select
                name="type"
                value={form.type}
                onChange={onChange}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600
                        text-slate-800 dark:text-slate-200 rounded-md shadow-sm px-3 py-1.5
                        focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
              >
                <option value="">Select type</option>
                <option value="1">Percentage (%)</option>
                <option value="2">Fixed Amount</option>
                <option value="3">Fixed Price</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600">Discount Value</label>
              <input
                name="value"
                value={form.value}
                onChange={onChange}
                placeholder="0.00"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600
                        text-slate-800 dark:text-slate-200 rounded-md shadow-sm px-3 py-1.5
                        focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
              />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="font-medium text-gray-900">Rules & Priority</h2>
            <div>
              <label className="text-sm text-gray-600">Priority Level (1-10)</label>
              <input
                name="priority"
                onChange={onChange}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600
                        text-slate-800 dark:text-slate-200 rounded-md shadow-sm px-3 py-1.5
                        focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
              />
              <p className="mt-1 text-xs text-gray-500">
                1 = highest priority. Higher priority promotions override lower ones.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="font-medium text-gray-900">Promotion Schedule</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-900">Start Date & Time</label>
                <input
                  type="datetime-local"
                  name="startAt"
                  value={form.startAt}
                  onChange={onChange}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600
                        text-slate-800 dark:text-slate-200 rounded-md shadow-sm px-3 py-1.5
                        focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
                />
              </div>
              <div>
                <label className="text-sm text-gray-900">End Date & Time</label>
                <input
                  type="datetime-local"
                  name="endAt"
                  value={form.endAt}
                  onChange={onChange}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600
                        text-slate-800 dark:text-slate-200 rounded-md shadow-sm px-3 py-1.5
                        focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
                />
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-700">
              Flash sales with higher priority (1–3) typically perform better during peak hours.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePromotionPage;
