import { Check, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getCategoriesShop } from "../service/api/Shop";
import type { shopSelectCategories } from "../types/shop.type";



const MAX = 5;

export default function SelectBusinessCategories({onBack,onSubmit,formData,setFormData}:shopSelectCategories) {
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const response = await getCategoriesShop({all:true});
        setCategories(response?.data?.data?.content ?? [])
      }catch(err){
        console.log(err)
      }
    }
    fetchData();
  },[])
  const selectedIds = formData.categoryIds ?? [];

  const filtered = useMemo(
    () =>
      categories.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase())
      ),
    [query, categories],
  );

   const toggle = (id: number) => {
    const strId = String(id);

    setFormData((prev: any) => {
      const current = prev.categoryIds ?? [];

      if (current.includes(strId)) {
        return {
          ...prev,
          categoryIds: current.filter((i: string) => i !== strId),
        };
      }

      if (current.length >= MAX) return prev;

      return {
        ...prev,
        categoryIds: [...current, strId],
      };
    });
  };

  return (
   <>
      {/* ===== HEADER STEP ===== */}
      <div className="px-8 pt-8">
        <h2 className="text-xl font-semibold text-gray-900">
          Select Business Categories
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Choose up to {MAX} categories that best describe your business.
        </p>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="p-8 space-y-8">
        {/* SEARCH */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search categories..."
            className="w-full rounded-2xl border border-gray-200 bg-white
            py-3 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* SELECTED */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-700">
              Selected categories
            </span>
            <span className="font-medium text-blue-600">
              {selectedIds.length}/{MAX}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {selectedIds.length === 0 && (
              <span className="text-sm text-gray-400">
                No category selected
              </span>
            )}

            {selectedIds.map((id) => {
               const cat = categories.find(
                (c) => String(c.id) === id
              );
              if (!cat) return null;
              return (
                <button
                  key={id}
                      onClick={() => toggle(Number(id))}
                  className="flex items-center gap-2 rounded-full
                  bg-blue-600 px-4 py-1.5 text-xs font-medium text-white
                  hover:bg-blue-700"
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
             const active = selectedIds.includes(String(cat.id));
            const disabled =
              !active && selectedIds.length >= MAX;

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
                <span className="font-medium text-gray-800">
                  {cat.name}
                </span>

                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-md border
                  ${
                    active
                      ? "border-blue-600 bg-blue-600"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {active && (
                    <Check className="h-3 w-3 text-white" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <div className="flex items-center justify-between border-t border-gray-200 px-8 py-4">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-gray-500 hover:text-gray-800"
        >
          ← Back
        </button>

        <button
          type="button"
          onClick={onSubmit}
          className="flex items-center gap-2 rounded-2xl
          bg-blue-600 px-10 py-3 text-sm font-semibold text-white
          hover:bg-blue-700"
        >
          Complete Registration
          <Check className="h-4 w-4" />
        </button>
      </div>
    </>
  );
}
