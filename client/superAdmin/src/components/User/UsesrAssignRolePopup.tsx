import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  backdropVariants,
  panelVariants,
  type UserAssignRolePopupProps
} from "../../types";
import { getListRole } from "../../service/api/Role";
import { useAlert } from "../alert-context";
import { assignUserRoles, getUserRoles } from "../../service/api/Authenticate";

const UserActionRoleSidebar = ({
  selectedUser,
  onClose,
}: UserAssignRolePopupProps) => {
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
  const [saving, setSaving] = useState(false);
  const { showAlert } = useAlert();
  const [isExiting, setIsExiting] = useState(false);
  useEffect(() => {
    const fetchRoles = async () => {
      const res = await getListRole({ page: 1, size: 100,filter:"id!=1" });
      setRoles(res.data.content || []);
      const userRoleRes=await getUserRoles(selectedUser.id);
      const userRoleIds = userRoleRes.data.data.map((r: any) => r.id);
      setSelectedRoles(userRoleIds);
    };
    fetchRoles();
  }, [selectedUser]);

  const toggleRole = (id: number) => {
    setSelectedRoles(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleClose = () => setIsExiting(true);

  const handleAnimationComplete = () => {
    if (isExiting) onClose();
  };
  const handleSave = async () => {
    try {
      setSaving(true);
  
      const res = await assignUserRoles(selectedUser.id, selectedRoles);
  
      showAlert({
        title: res?.data?.message || "Roles updated successfully!",
        type: "success",
        autoClose: 3000
      });
  
      onClose(); // đóng sidebar
    } catch (err: any) {
      showAlert({
        title: "Failed to update roles",
        type: "error",
      });
    } finally {
      setSaving(false);
    }
  };
  
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/40"
      variants={backdropVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onClick={handleClose}
    >
      <motion.div
        variants={panelVariants}
        initial="initial"
        animate={isExiting ? "exit" : "animate"}
        exit="exit"
        onAnimationComplete={handleAnimationComplete}
        onClick={e => e.stopPropagation()}
        className="
          absolute right-0 top-0 
          w-full max-w-[500px] h-full 
          bg-white shadow-2xl 
          border-l border-gray-200 
          flex flex-col
        "
      >
        {/* HEADER */}
        <div className="px-6 py-4 border-b border-gray-200 bg-white flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Assign Roles</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 text-2xl hover:text-gray-600"
          >
            ×
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {roles.map((role: any) => (
            <div
              key={role.id}
              className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
            >
              <div className="text-gray-900 font-medium">{role.name}</div>

              {/* Toggle */}
              <button
                onClick={() => toggleRole(role.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  selectedRoles.includes(role.id)
                    ? "bg-blue-600"
                    : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                    selectedRoles.includes(role.id)
                      ? "translate-x-5"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="border-t border-gray-200 px-6 py-4 bg-white">
          <button
            className="w-full py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:bg-blue-300"
            disabled={saving}
            onClick={handleSave}
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserActionRoleSidebar;
