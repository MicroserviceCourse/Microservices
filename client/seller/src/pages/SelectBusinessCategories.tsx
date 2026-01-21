import { Check, Search } from "lucide-react";
import { useMemo, useState } from "react";

const CATEGORIES = [
  { id: 1, name: "Fashion & Apparel" },
  { id: 2, name: "Beauty & Care" },
  { id: 3, name: "Grocery & Food" },
  { id: 4, name: "Sports & Outdoor" },
  { id: 5, name: "Toys & Hobbies" },
  { id: 6, name: "Books & Stationery" },
  { id: 7, name: "Automotive" },
  { id: 8, name: "Health & Wellness" },
  { id: 9, name: "Jewelry & Accessories" },
  { id: 10, name: "Electronics" },
  { id: 11, name: "Home & Living" },
  { id: 12, name: "Gadgets" },
];

const MAX = 5;

export default function SelectBusinessCategories() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<number[]>([10, 11, 12]);

  const filtered = useMemo(
    () => CATEGORIES.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  const toggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : prev.length < MAX ? [...prev, id] : prev,
    );
  };

  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto max-w-6xl px-4 space-y-10">
        {/* ===== TITLE (OUTSIDE BOX) ===== */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Select Business Categories</h1>
          <p className="mt-2 text-sm text-gray-500">
            Choose up to 5 categories that best describe your business.
          </p>
        </div>

        {/* ===== CONTENT BOX ===== */}
        <div className="rounded-3xl bg-white p-10 shadow-[0_24px_60px_rgba(0,0,0,0.08)] space-y-8">
          {/* STEP */}
          <div className="flex justify-end">
            <span className="rounded-full bg-blue-50 px-4 py-1.5 text-xs font-medium text-blue-600">
              Step 4 / 4
            </span>
          </div>

          {/* SEARCH */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search categories..."
              className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-700 outline-none
            focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* SELECTED */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-700">Selected categories</span>
              <span className="font-medium text-blue-600">
                {selected.length}/{MAX}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {selected.length === 0 && (
                <span className="text-sm text-gray-400">No category selected</span>
              )}

              {selected.map((id) => {
                const cat = CATEGORIES.find((c) => c.id === id);
                if (!cat) return null;
                return (
                  <button
                    key={id}
                    onClick={() => toggle(id)}
                    className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
                  >
                    {cat.name}
                    <span className="opacity-80">×</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* AVAILABLE */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((cat) => {
              const active = selected.includes(cat.id);
              const disabled = !active && selected.length >= MAX;

              return (
                <button
                  key={cat.id}
                  onClick={() => !disabled && toggle(cat.id)}
                  className={`
                  flex items-center justify-between rounded-2xl border px-5 py-4 text-sm transition
                  ${
                    active
                      ? "border-blue-600 bg-blue-50"
                      : disabled
                        ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                        : "border-gray-100 bg-white hover:border-blue-300 hover:bg-blue-50/40"
                  }
                `}
                >
                  <span className="font-medium text-gray-800">{cat.name}</span>

                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-md border
                    ${active ? "border-blue-600 bg-blue-600" : "border-gray-300 bg-white"}`}
                  >
                    {active && <Check className="h-3 w-3 text-white" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* FOOTER */}
          <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-8">
            <button className="text-sm text-gray-500 hover:text-gray-800">← Back</button>

            <button className="flex items-center gap-2 rounded-2xl bg-blue-600 px-10 py-3 text-sm font-semibold text-white hover:bg-blue-700">
              Complete Registration
              <Check className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
