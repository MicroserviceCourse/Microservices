import { useEffect, useState } from "react";
import type { CategoryUpdateFormModalProps } from "../../types";
import { getCategories, getCategoryById, updateCategory } from "../../service/api/Category";
import ModalForm from "../ui/ModalForm";
import CategoryParentSelect from "./CategoryParentSelect";
import { useAlert } from "../alert-context";

const CategoryFormEdit = ({
    isOpen,
    onClose,
    onSubmit,
    categoryData,
    loading = false
}: CategoryUpdateFormModalProps) => {

    const [categoryOptions, setCategoryOptions] = useState<any[]>([]);
    const [form, setForm] = useState({
        name: "",
        parentId: "",
        sortOrder: 0
    });
    const { showAlert } = useAlert();


    useEffect(() => {
        if (categoryData) {
            setForm({
                name: categoryData.name ?? "",
                parentId: categoryData.parentId ? String(categoryData.parentId) : "",
                sortOrder: categoryData.sortOrder ?? 1,
            });
        }
        fetchCategories(categoryData.level, categoryData.id);
    }, [categoryData]);
    if (!isOpen || !categoryData) return null;

    const handleChange = (field: string, value: any) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };
    const filterTreeByLevel = (
        nodes: any[],
        currentLevel: number,
        currentId: number
    ): any[] => {
        return nodes
            .filter(node => node.id !== currentId && node.level <= currentLevel)
            .map(node => ({
                ...node,
                children: node.children
                    ? filterTreeByLevel(node.children, currentLevel, currentId)
                    : []
            }));
    };
    
    
    const fetchCategories = async (currentLevel: number, currentId: number) => {
        try {
            const res = await getCategories({ all: true });
            let list = res.content || [];
            list = filterTreeByLevel(list, currentLevel, currentId);
            setCategoryOptions(list);
        } catch (err: any) {
            console.error("Failed to load category list");
        }
    }
    const handleSubmit = async () => {
        try {

            const payload = {
                name: form.name,
                parentId: form.parentId === "" ? null : Number(form.parentId),
                sortOrder: Number(form.sortOrder),
            };

            const res = await updateCategory(categoryData.id, payload);

            showAlert({
                title: res?.data?.message || "Category updated successfully.",
                type: "success",
                autoClose: 3000,
            });

            onSubmit?.();
            onClose();

            setForm({
                name: "",
                parentId: "",
                sortOrder: 0
            });
        } catch (err: any) {
            showAlert({
                title: err?.response?.data?.message || "Failed to update category.",
                type: "error",
                autoClose: 4000,
            });
        }

    };

    return (
        <ModalForm
            isOpen={isOpen}
            title="Edit Category"
            onClose={onClose}
            height="75%"
            onSubmit={handleSubmit}
            loading={loading}


        >
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Category Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Enter category name"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Parent Category
                    </label>
                    <CategoryParentSelect
                        categories={categoryOptions}
                        value={Number(form.parentId)}
                        onChange={(val) => handleChange("parentId", val)}
                    />

                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Sort Order <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        value={form.sortOrder}
                        onChange={(e) => handleChange("sortOrder", e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
        </ModalForm>
    )
}
export default CategoryFormEdit;