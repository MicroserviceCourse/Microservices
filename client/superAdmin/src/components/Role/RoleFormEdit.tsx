import { useEffect, useState } from "react"
import type { UpdateRoleFormModalProps } from "../../types";
import ModalForm from "../ui/ModalForm";
import { useAlert } from "../alert-context";
import { updateRole } from "../../service/api/Role";

const RoleFormEdit = ({
    isOpen,
    onClose,
    onSubmit,
    roleData
}: UpdateRoleFormModalProps) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        description: ""
    })
    const { showAlert } = useAlert();
    useEffect(() => {
        if (roleData) {
            setFormData({
                description: roleData.description || ""
            })

        }
    }, [roleData, isOpen]);
    const handleChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }
    const handleSubmit=async()=>{
        setLoading(true)
        if (!roleData) return;
        try{
            const response=await updateRole(roleData.id,formData);
            showAlert({
                title: response?.data?.message || "Role created successfully.",
                type: "success",
                autoClose: 3000,
            });
            onSubmit?.();
            onClose();
            setFormData({
                description:""
            });
        }catch(err:any){
            showAlert({
                title:
                    err?.response?.data?.message ||
                    "Failed to edit role. Please try again.",
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
            onSubmit={handleSubmit}
            title="Edit Role"
            onClose={onClose}
            confirmText={loading ? "loading..." : "save"}
            loading={loading}
        >
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        value={roleData?.name || ""}
                        disabled

                        className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        description
                    </label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                        rows={3}
                        placeholder="Mô tả rõ role dùng cho ai, quyền tầm nào..."
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
        </ModalForm>
    )
}
export default RoleFormEdit