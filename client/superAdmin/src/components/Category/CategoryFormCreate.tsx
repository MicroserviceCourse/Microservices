import { useEffect, useState } from "react"
import type { CategoryFormModalProps } from "../../types";
import { useAlert } from "../alert-context";
import { createCategories, getCategories } from "../../service/api/Category";
import ModalForm from "../ui/ModalForm";
import CategoryParentSelect from "./CategoryParentSelect";

const CategoryFormCreate = ({
    isOpen,
    onClose,
    onSubmit,
    loading = false
}: CategoryFormModalProps) => {
    const [form, setForm] = useState({
        name: "",
        parentId: "",
        sortOrder: 0
    })

    const [categoryOptions, setCategoryOptions] = useState<any[]>([]);
    const { showAlert } = useAlert();

    useEffect(() => {
        if (isOpen) {
            fetchCategories();
        }
    }, [isOpen]);

    const fetchCategories = async () => {
        try {
            const res = await getCategories({ all: true });
            setCategoryOptions(res.content || []);
        } catch (err: any) {
            console.error("Failed to load category list");
        }
    }
    const handleChange = (field: string, value: any) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };


    const handleSubmit = async () => {
        try {
            const payload = {
                name: form.name,
                parentId: form.parentId ? Number(form.parentId) : null,
                sortOrder: Number(form.sortOrder)
            }

            const res = await createCategories(payload);

            showAlert({
                title: res?.data?.message || "Category created successfully.",
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
                title: err?.response?.data?.message || "Failed to create category.",
                type: "error",
                autoClose: 4000,
            });
        }

    }
    return (
        <ModalForm
            isOpen={isOpen}
            title="Create Category"
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
export default CategoryFormCreate;