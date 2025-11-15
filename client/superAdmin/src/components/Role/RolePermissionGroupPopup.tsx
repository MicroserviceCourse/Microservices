import { useEffect, useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import Select from "react-select";
import { assignRolePermissions, getRolePermissions } from "../../service/api/Role";
import type { PermissionGroup, RolePermissionPopupProps } from "../../types";
import { useAlert } from "../alert-context";

// Backdrop fade in/out
const backdropVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// Sidebar slide in/out
const panelVariants: Variants = {
  initial: { x: "100%", opacity: 0.9 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 90,
      damping: 20,
    },
  },
  exit: {
    x: "100%",
    opacity: 0.7,
    transition: {
      duration: 0.2,
      ease: "easeInOut" as const,
    },
  },
};

const RolePermissionGroupPopup = ({
  roleId,
  roleName,
  onClose,
}: RolePermissionPopupProps) => {
  const [groups, setGroups] = useState<PermissionGroup[]>([]);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const { showAlert } = useAlert();
  const [isExiting, setIsExiting] = useState(false);
  const fetchPermissions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getRolePermissions(roleId);
      const data: PermissionGroup[] = res.data.data || [];
      setGroups(data);
      setExpanded(data.map((g) => g.module));
    } catch (e) {
      console.error("Failed to load permissions", e);
      setError("Failed to load permissions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, [roleId]);
  const handleClose = () => {
    setIsExiting(true);
  };

  const handleTogglePermission = (module: string, permId: string) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.module === module
          ? {
            ...g,
            permissions: g.permissions.map((p) =>
              p.id === permId ? { ...p, checked: !p.checked } : p
            ),
          }
          : g
      )
    );
  };

  const toggleExpand = (moduleName: string) => {
    setExpanded((prev) =>
      prev.includes(moduleName)
        ? prev.filter((m) => m !== moduleName)
        : [...prev, moduleName]
    );
  };

  const moduleOptions = useMemo(
    () => [
      { value: "", label: "All modules" },
      ...Array.from(new Set(groups.map((g) => g.module))).map((m) => ({
        value: m,
        label: m,
      })),
    ],
    [groups]
  );

  const filteredGroups = useMemo(() => {
    if (!selectedModule) return groups;
    if (selectedModule === "") return groups;
    return groups.filter((g) => g.module === selectedModule);
  }, [groups, selectedModule]);

  const selectStyles = {
    control: (base: any, state: any) => ({
      ...base,
      minHeight: "36px",
      borderRadius: 9999,
      borderColor: state.isFocused ? "#2563eb" : "#e5e7eb",
      boxShadow: state.isFocused ? "0 0 0 1px #2563eb33" : "none",
      "&:hover": { borderColor: "#2563eb" },
      backgroundColor: "#f9fafb",
      fontSize: "0.875rem",
    }),
    menu: (base: any) => ({
      ...base,
      borderRadius: 12,
      overflow: "hidden",
      fontSize: "0.875rem",
      zIndex: 9999,
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#2563eb"
        : state.isFocused
          ? "#eff6ff"
          : "#ffffff",
      color: state.isSelected ? "#ffffff" : "#111827",
      cursor: "pointer",
    }),
    valueContainer: (base: any) => ({
      ...base,
      padding: "0 0.5rem",
    }),
    indicatorsContainer: (base: any) => ({
      ...base,
      paddingRight: "0.25rem",
    }),
  };

  const currentSelectValue =
    selectedModule === null
      ? moduleOptions[0]
      : moduleOptions.find((opt) => opt.value === selectedModule) ||
      moduleOptions[0];
  const getCheckedPermissionIds = () => {
    return groups.flatMap((g) =>
      g.permissions.filter((p) => p.checked).map((p) => Number(p.id))
    );
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const checkedIds = getCheckedPermissionIds();
      const response = await assignRolePermissions(roleId, checkedIds);
      showAlert({
        title: response?.data?.message || "role assigned successfully.",
        type: "success",
        autoClose: 3000,
      });
      onClose();
    } catch (e) {
      console.error("Failed to assign permissions", e);
      showAlert({
        title: "Failed to assign permissions",
        type: "error",
      });
    } finally {
      setSaving(false);
    }
  };
  const handleAnimationComplete = () => {
    if (isExiting) onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/40"
      onClick={handleClose}
      variants={backdropVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        variants={panelVariants}
        initial="initial"
        animate={isExiting ? "exit" : "animate"}
        onAnimationComplete={handleAnimationComplete}
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 top-0 w-full max-w-[520px] h-full
                   bg-[#f5f6fb] shadow-2xl flex flex-col border-l border-gray-200"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-white">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 uppercase tracking-wide">
                {roleName}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Permission list will change when you update this role.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              ×
            </button>
          </div>

          {/* Filter by module */}
          <div className="mt-3">
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Filter by module
            </label>
            <Select
              styles={selectStyles}
              options={moduleOptions}
              value={currentSelectValue}
              onChange={(opt: any) => {
                setSelectedModule(opt?.value ?? "");
              }}
              isClearable={false}
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="px-6 pt-3">
            <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {error}
            </div>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 sidebar-scroll">
          {loading ? (
            <p className="text-sm text-gray-500">Loading permissions...</p>
          ) : filteredGroups.length === 0 ? (
            <p className="text-sm text-gray-500 italic">
              No permissions found for this role.
            </p>
          ) : (
            filteredGroups.map((group) => {
              const total = group.permissions.length;
              const enabled =
                group.permissions.filter((p) => p.checked).length;

              return (
                <div
                  key={group.module}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleExpand(group.module)}
                    className="w-full flex items-center justify-between px-5 py-3"
                  >
                    <div className="flex items-center gap-2">
                      {expanded.includes(group.module) ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                      <span className="font-semibold text-gray-900">
                        {group.module}
                      </span>
                      <span className="text-xs text-gray-500">
                        {enabled}/{total} enabled
                      </span>
                    </div>
                  </button>

                  <div className="border-t border-gray-200" />

                  {/* Permission list */}
                  {expanded.includes(group.module) && (
                    <div className="divide-y divide-gray-100">
                      {group.permissions.map((perm) => (
                        <div
                          key={perm.id}
                          className="flex items-center justify-between px-5 py-3"
                        >
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {perm.permissionKey}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {perm.description
                                ? perm.description
                                : `Allows this role to ${perm.permissionKey.toLowerCase()}`}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              handleTogglePermission(group.module, perm.id)
                            }
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${perm.checked
                              ? "bg-[#1a73e8]"
                              : "bg-gray-300"
                              }`}
                          >
                            <span
                              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${perm.checked
                                ? "translate-x-5"
                                : "translate-x-1"
                                }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-white px-6 py-4">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || loading}
            className="w-full py-2.5 rounded-full bg-[#1a73e8] text-white text-sm font-semibold shadow-sm hover:bg-[#185ec2] disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RolePermissionGroupPopup;
