import { useState } from "react";
import type { PermissionFormModalProps } from "../../types";
import ModalForm from "../ui/ModalForm";
import { useAlert } from "../alert-context";
import { createPermission } from "../../service/api/Permission";

const PermissionFormCreate = ({
    isOpen,
    onClose,
    onSubmit,
    idModule
}: PermissionFormModalProps) => {
    const [loading,setLoading]=useState(false)
    const [formData, setFormData] = useState({
        permissionKey: "",
        idModule: idModule
    });
    const handleChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };
    const { showAlert } = useAlert();
    const handleSubmit = async () => {
        setLoading(true)
        try {
            const response = await createPermission(formData);
            showAlert({
                title: response?.data?.message || "Permission created successfully.",
                type: "success",
                autoClose: 3000,
            });
            onSubmit?.();
            onClose();
            setFormData({
                permissionKey: "",
                idModule: idModule
            });
        } catch (err: any) {
            showAlert({
                title:
                    err?.response?.data?.message ||
                    "Failed to create Permission. Please try again.",
                type: "error",
                autoClose: 4000,
            });
        }finally{
            setLoading(false)
        }
    }
    return (
        <ModalForm
            isOpen={isOpen}
            title={"Add New Permission"}
            onSubmit={handleSubmit}
            onClose={onClose}
            confirmText={loading ? "loading..." : "save"}
            loading={loading}
        >
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Key
                    </label>
                    <input
                        type="text"
                        name="permissionKey"
                        value={formData.permissionKey}
                        onChange={(e) => handleChange("permissionKey", e.target.value)}
                        placeholder="Enter key"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
        </ModalForm>
    )
}
export default PermissionFormCreate;