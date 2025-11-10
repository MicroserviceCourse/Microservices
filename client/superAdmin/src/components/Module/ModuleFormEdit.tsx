import { useEffect, useState } from "react"
import type { UpdateModuleFormModalProps } from "../../types"
import { useAlert } from "../alert-context";
import { update } from "../../service/api/Module";
import ModalForm from "../ui/ModalForm";

const ModuleFormEdit = ({
    isOpen,
    onClose,
    onSubmit,
    loading = false,
    moduleData

}: UpdateModuleFormModalProps) => {
    const [form, setForm] = useState({
        name: ""
    });
    const { showAlert } = useAlert();
    const handleChange = (field: string, value: string | boolean) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };
    useEffect(() => {
        if (moduleData) {
            setForm({
                name: moduleData.name || ""
            })
        }
    },[moduleData,isOpen])
    const handleSubmit = async () => {
        try {
            const response = await update(moduleData.id, form);
            showAlert({
                title: response?.data?.message || "Module created successfully.",
                type: "success",
                autoClose: 3000,
            });
            onSubmit?.();
            onClose();
            setForm({ name: "" });
        } catch (err: any) {
            console.error("Update error:", err);
            showAlert({
                title:
                    err?.response?.data?.message ||
                    "Failed to update Module. Please try again.",
                type: "error",
                autoClose: 4000,
            })
        }
    }
    return (
        <ModalForm
            isOpen={isOpen}
            onSubmit={handleSubmit}
            title={"Edit Module"}
            onClose={onClose}
            confirmText={"Save Changes"}
            loading={loading}
        >
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Module Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
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
export default ModuleFormEdit;