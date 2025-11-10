import { useState } from "react"
import type { ModuleFormModalProps } from "../../types";
import ModalForm from "../ui/ModalForm";
import { useAlert } from "../alert-context";
import { create } from "../../service/api/Module";


const ModuleFormCreate = ({
    isOpen,
    onClose,
    onSubmit,
    loading = false,
}: ModuleFormModalProps) => {
    const [form, setForm] = useState({
        name: ""
    })
    const { showAlert } = useAlert();
    const handleChange = (field: string, value: string | boolean) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };
    const handleSubmit = async () => {

        try {
            const response = await create(form);
            showAlert({
                title: response?.data?.message || "Module created successfully.",
                type: "success",
                autoClose: 3000,
            });
            onSubmit?.();
            onClose();
            setForm({ name: "" });
        } catch (err: any) {
            console.error("Create error:", err);
            showAlert({
                title:
                    err?.response?.data?.message ||
                    "Failed to create Module. Please try again.",
                type: "error",
                autoClose: 4000,
            });
        }
    }
    return (
        <ModalForm
            isOpen={isOpen}
            onSubmit={handleSubmit}
            title={"Add New Module"}
            onClose={onClose}
            confirmText={"Create Module"}
            loading={loading}
        >
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Module Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Enter module name"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
        </ModalForm>
    )
}
export default ModuleFormCreate