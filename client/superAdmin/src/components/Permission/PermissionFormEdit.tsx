import { useEffect, useState } from "react";
import type { UpdatePermissionFormModalProps } from "../../types";
import ModalForm from "../ui/ModalForm";
import { updatePermission } from "../../service/api/Permission";
import { useAlert } from "../alert-context";

const PermissionFormEdit=({
    isOpen,
    onClose,
    onSubmit,
    idModule,
    permissionData
}:UpdatePermissionFormModalProps)=>{
    const [loading,setLoading]=useState(false);
    const [formData, setFormData] = useState({
        permissionKey: "",
        idModule: idModule
    });
    useEffect(()=>{
        if(permissionData){
            setFormData({
                permissionKey: permissionData.permissionKey || "",
                idModule: idModule
            })
        }
    },[permissionData,isOpen]);
    const { showAlert } = useAlert();
    const handleChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };
    const handleSubmit=async()=>{
        setLoading(true);
        try{
            const response=await updatePermission(permissionData.id,formData);
            showAlert({
                title: response?.data?.message || "Permission updated successfully.",
                type: "success",
                autoClose: 3000,
            });
            onSubmit?.();
            onClose();
            setFormData({
                permissionKey: "",
                idModule: idModule
            });
        }catch (err: any) {
            showAlert({
                title:
                    err?.response?.data?.message ||
                    "Failed to update Permission. Please try again.",
                type: "error",
                autoClose: 4000,
            });
        }finally{
            setLoading(false)
        }
    }
    return(
        <ModalForm
        isOpen={isOpen}
        onSubmit={handleSubmit}
        title="Edit Permission"
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
export default PermissionFormEdit;