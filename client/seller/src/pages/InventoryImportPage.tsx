import { useEffect, useState } from "react";

import { getProducts } from "../service/api/Product";
import { AlertCircle, Search } from "lucide-react";
import { useAlert } from "../components/alert-context";
import { getCategories } from "../service/api/Categories";
import type { Product, SelectedItem } from "../types/product.type";
import { importInventory } from "../service/api/Inventory";
const InventoryImportPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selected, setSelected] = useState<Record<number, SelectedItem>>({});
    const [note, setNote] = useState("");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);
    const { showAlert } = useAlert();
    const [categoryFilter, setCategoryFilter] = useState("");
    useEffect(() => {

        fetchCategories();
    }, []);
    useEffect(() => {
        fetchProduct();
    }, [search, categoryFilter]);
    const fetchProduct = async () => {
        setLoading(true);
        try {
            const filters = [];

            if (categoryFilter) {
                filters.push(`productCategories.category.id==${categoryFilter}`);
            }

            const filterQuery = filters.join(" and ");
            const param = {
                page: 1,
                size: 20,
                searchValue: search,
                ...(categories ? { filter: filterQuery } : {})
            }
            const res = await getProducts(param);
            setProducts(res?.content ?? []);
        } catch (err) {
            console.log(err);
            setProducts([])
        } finally {
            setLoading(false)
        }
    }

    const fetchCategories = async () => {
        const res = await getCategories({ all: true });
        setCategories(res?.content ?? []);
    }
    const toggleSelect = (productId: number) => {
        setSelected((prev) => {
            const copy = { ...prev };
            if (copy[productId]) {
                delete copy[productId];
            } else {
                copy[productId] = { productId, importQty: undefined };
            }
            return copy;
        });
    }

    const updateQty = (productId: number, qty?: number) => {
        if (qty != null && qty < 0) return;
        setSelected((prev) => ({
            ...prev,
            [productId]: {
                productId,
                importQty: qty
            }
        }))
    }

    const handleSubmit = async () => {
        try {
            const productInventories = Object.values(selected)
                .filter(item => item.importQty != undefined && item.importQty > 0)
                .map(item => ({
                    productId: item.productId,
                    quantity: item.importQty
                }));

            if (productInventories.length === 0) {
                alert("Please select at least one product with quantity > 0");
                return;
            }

            const payload = {
                note,
                productInventories
            };
            const response = await importInventory(payload);
            showAlert({
                title: response?.data?.message || "inventory imported successfully!",
                type: "success",
                autoClose: 3000,
            });
            setSelected({});
            setNote("");
        } catch (err: any) {
            showAlert({
                title: err?.response?.data?.message || "Failed to import inventory.",
                type: "error",
                autoClose: 3000,
            });
        }
    }
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-semibold">Inventory Import</h1>
                <p className="text-sm text-gray-500">
                    Select products and enter quantities to update stock levels
                </p>
            </div>
            <div className="flex items-center justify-between gap-4 flex-wrap">

                {/* SEARCH */}
                <div className="relative max-w-md flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search product name or SKU..."
                        className="block w-full rounded-lg border-0 py-2.5 pl-12
    text-[#111827] dark:text-white
    ring-1 ring-inset ring-[#d1d5db] dark:ring-[#4b5563]
    placeholder:text-[#9ca3af]
    focus:ring-2 focus:ring-inset focus:ring-[#2563eb]
    sm:text-sm sm:leading-6
    bg-[#f9fafb] dark:bg-[#374151] outline-none"
                    />
                </div>

                {/* FILTER CATEGORY */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <span className="text-sm text-[#6b7280] dark:text-gray-400 whitespace-nowrap">
                        Filter by:
                    </span>
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="block w-full sm:w-40 rounded-lg border-0 py-2.5 pl-3 pr-10 text-[#111827] dark:text-white ring-1 ring-inset ring-[#d1d5db] dark:ring-[#4b5563] focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6 bg-[#f9fafb] dark:bg-[#374151]"
                    >
                        <option value="">All Categories</option>
                        {categories.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>

            </div>
            <div className="bg-white dark:bg-[#1f2937] rounded-xl shadow-sm border border-[#e5e7eb] dark:border-[#374151] overflow-hidden flex flex-col">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="p-3 w-12"></th>
                            <th className="p-3 text-left">Product</th>
                            <th className="p-3">SKU</th>
                            <th className="p-3">Current Stock</th>
                            <th className="p-3">Import Qty</th>
                        </tr>

                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="py-16 text-center">
                                    <div className="flex flex-col items-center justify-center gap-3 text-gray-500 dark:text-gray-400">
                                        <div className="h-8 w-8 rounded-full border-4 border-gray-300 dark:border-gray-600 border-t-blue-600 animate-spin" />
                                        <span className="text-sm">Loading products...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : products.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="py-16 text-center text-gray-500 dark:text-gray-400"
                                >
                                    No products found
                                </td>
                            </tr>
                        ) : (

                            products
                                .map((p) => {
                                    const isChecked = !!selected[p.id];
                                    const qty = selected[p.id]?.importQty;
                                    const isError =
                                        isChecked &&
                                        qty !== undefined &&
                                        qty <= 0;
                                    return (
                                        <tr key={p.id} className={`border-t border-gray-200  ${isError
                                            ? "bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20"
                                            : isChecked
                                                ? "bg-blue-50 dark:bg-blue-900/10 hover:bg-blue-100 dark:hover:bg-blue-900/20"
                                                : "hover:bg-gray-50 dark:hover:bg-gray-800"
                                            }`}>
                                            <td className="p-3 text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={isChecked}
                                                    className="h-5 w-5 rounded-full cursor-pointer accent-[#2563eb] border border-gray-300 dark:border-gray-600
                                                focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2 
                                                focus:ring-offset-white dark:focus:ring-offset-gray-900 transition hover:scale-105"
                                                    onChange={() => toggleSelect(p.id)}
                                                />
                                            </td>
                                            <td className="p-3 flex items-center gap-3">
                                                <img
                                                    src={p.thumbnailUrl}
                                                    className="w-10 h-10 rounded-lg object-cover"
                                                />
                                                <span className="font-medium">{p.name}</span>
                                            </td>

                                            <td className="p-3 text-center font-mono">
                                                <span className="inline-flex items-center rounded-md bg-gray-50 dark:bg-[#374151] px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 ring-1 ring-inset ring-gray-500/10 font-mono">
                                                    {p.code}
                                                </span>
                                            </td>

                                            <td className="p-3 text-center">
                                                {p.stock ?? 0}
                                            </td>

                                            <td className="p-3 text-center">
                                                <input
                                                    type="text"
                                                    disabled={!isChecked}
                                                    value={selected[p.id]?.importQty ?? ""}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        updateQty(p.id,
                                                            value === "" ? undefined : Number(value)

                                                        )

                                                    }}
                                                    className={`w-30 text-center rounded-md py-1.5 px-2 text-sm border-0 ring-1 ring-inset ${isError
                                                        ? "text-red-900 dark:text-red-200  ring-1 ring-inset ring-red-300 dark:ring-red-500 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 dark:bg-[#374151]"
                                                        : "ring-gray-300 focus:ring-blue-600"
                                                        } focus:ring-2 focus:ring-inset disabled:bg-gray-100 disabled:cursor-not-allowed transition outline-none`}
                                                />
                                                {isError && (
                                                    <div className="mt-1 flex items-center gap-1 text-xs justify-center text-red-500">
                                                        <AlertCircle size={14} className="shrink-0" />
                                                        <span>Must be &gt; 0</span>
                                                    </div>
                                                )}
                                            </td>

                                        </tr>
                                    )
                                })

                        )}

                    </tbody>
                </table>
            </div>
            <div className="flex flex-col md:flex-row gap-6  pt-6">

                {/* LEFT: IMPORT NOTE */}
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-900">
                        Import Note
                        <span className="ml-2 text-gray-500 font-normal">
                            (Applied to all selected items)
                        </span>
                    </label>

                    <div className="relative mt-2">
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="e.g. Incoming shipment from supplier A"
                            className="block w-full rounded-lg border-0 py-3 px-3
        ring-1 ring-inset ring-gray-300
        focus:ring-2 focus:ring-blue-600
        bg-gray-50 outline-none"
                        />
                        <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                            {note.length}/500
                        </div>
                    </div>
                </div>

                {/* RIGHT: TOTAL SELECTED */}
                <div className="w-full md:w-64 flex flex-col items-end gap-4">

                    {/* TOTAL SELECTED */}
                    <div className="flex items-center gap-2 mt-7">
                        <span className="text-sm text-gray-500 whitespace-nowrap">
                            Total Selected:
                        </span>
                        <span className="text-lg font-semibold text-gray-900 whitespace-nowrap">
                            {Object.keys(selected).length} Items
                        </span>
                    </div>

                    {/* IMPORT BUTTON */}
                    <button
                        onClick={handleSubmit}
                        disabled={Object.keys(selected).length === 0}
                        className="
      inline-flex items-center gap-2
      bg-blue-600 text-white
      px-5 py-2.5 rounded-xl
      text-sm font-medium
      hover:bg-blue-700
      disabled:bg-gray-300 disabled:cursor-not-allowed
      transition
    "
                    >
                        Import Inventory
                    </button>

                </div>



            </div>



        </div>
    )
}
export default InventoryImportPage;