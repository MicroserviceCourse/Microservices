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
  const { showAlert } = useAlert();
  const [isSaving, setIsSaving] = useState(false);

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toOffsetDateTime = (value: any) => (value ? new Date(value).toISOString() : null);

  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);

    try {
      await createPromotion({
        name: form.name,
        type: Number(form.type),
        value: Number(form.value),
        priority: Number(form.priority),
        startAt: toOffsetDateTime(form.startAt),
        endAt: toOffsetDateTime(form.endAt),
      });

      showAlert({
        title: "Promotion created successfully!",
        type: "success",
        autoClose: 3000,
      });

      navigate("/promotion");
    } catch (err) {
      showAlert({
        title: "Failed to create promotion.",
        type: "error",
        autoClose: 3000,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-gray-50 py-6">
      {/* HEADER */}
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Create Promotion</h1>
          <p className="text-sm text-gray-500">
            Define the mechanics, eligibility, and duration for your new marketing campaign.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/promotion")}
            className="rounded-lg bg-slate-200 px-4 py-2 font-medium text-slate-700 hover:bg-slate-300"
          >
            Cancel
          </button>

          <button
            disabled={isSaving}
            onClick={handleSave}
            className={`rounded-lg px-4 py-2 text-white shadow-sm ${
              isSaving ? "cursor-not-allowed bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSaving ? "Saving..." : "Save Promotion"}
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="mx-auto mt-6 max-w-7xl">
        <div className="space-y-6 rounded-xl border border-slate-200 bg-white p-6">
          {/* General */}
          <section className="space-y-4">
            <h2 className="font-medium text-gray-900">General Information</h2>

            <div>
              <label className="text-sm text-gray-600">Promotion Name</label>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="e.g., Summer Flash Sale 2024"
                className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-800 focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Promotion Type</label>
                <select
                  name="type"
                  value={form.type}
                  onChange={onChange}
                  className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2"
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
                  className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2"
                />
              </div>
            </div>
          </section>

          {/* Priority */}
          <section className="space-y-2">
            <h2 className="font-medium text-gray-900">Rules & Priority</h2>
            <input
              name="priority"
              value={form.priority}
              onChange={onChange}
              className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2"
            />
            <p className="text-xs text-gray-500">
              1 = highest priority. Higher priority promotions override lower ones.
            </p>
          </section>

          {/* Schedule */}
          <section className="space-y-4">
            <h2 className="font-medium text-gray-900">Promotion Schedule</h2>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="datetime-local"
                name="startAt"
                value={form.startAt}
                onChange={onChange}
                className="rounded-md border border-slate-300 bg-slate-50 px-3 py-2"
              />
              <input
                type="datetime-local"
                name="endAt"
                value={form.endAt}
                onChange={onChange}
                className="rounded-md border border-slate-300 bg-slate-50 px-3 py-2"
              />
            </div>

            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700">
              Flash sales with higher priority (1–3) typically perform better during peak hours.
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CreatePromotionPage;
