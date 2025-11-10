import { Settings, Trash2, MoreVertical, Edit, Eye, CircleOff, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import type { ActionMenuProps } from "../../types";

const ActionMenu: React.FC<ActionMenuProps> = ({
  onEdit,
  onConfig,
  onDelete,
  onActive,
  onDeactive,
  onViewPermission,
  size = 18,
}) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updatePosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const menuWidth = 160;
      const screenWidth = window.innerWidth;

      let left =
        rect.left + window.scrollX + rect.width / 2 - menuWidth / 2;

      if (left + menuWidth > screenWidth - 10) left = screenWidth - menuWidth - 10;
      if (left < 10) left = 10;

      setPosition({
        top: rect.bottom + window.scrollY + 6,
        left,
      });
    }
  };

  const toggleMenu = () => {
    updatePosition();
    setOpen((prev) => !prev);
  };

  const menu = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 5, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 5, scale: 0.97 }}
          transition={{ duration: 0.15 }}
          style={{
            position: "absolute",
            top: position.top,
            left: position.left,
            zIndex: 9999,
          }}
          className="w-40 bg-white border border-gray-200 rounded-xl shadow-xl py-2 text-sm text-gray-700"
        >
          <ul>
            {onViewPermission && (
              <li
              onClick={()=>{
                onViewPermission();
                setOpen(false)
              }}
               className="flex items-center gap-2 px-4 py-2 hover:bg-indigo-50 cursor-pointer text-indigo-600 font-medium"
              >
                <Eye size={16} /> View Permission
              </li>
            )}
            {/* Edit */}
            
            {onEdit && (
              <li
                onClick={() => {
                  onEdit();
                  setOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 cursor-pointer text-blue-600 font-medium"
              >
                <Edit size={16} /> Edit
              </li>
            )}

            {/* Active / Inactive */}
            { onActive && (
              <li
                onClick={() => {
                  onActive();
                  setOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 hover:bg-green-50 cursor-pointer text-green-600 font-medium"
              >
                {/* Có thể dùng icon Eye hoặc Settings tuỳ bạn */}
                <CheckCircle2 size={16} />  Active
              </li>
            )}

            { onDeactive && (
              <li
                onClick={() => {
                  onDeactive();
                  setOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 hover:bg-yellow-50 cursor-pointer text-yellow-600 font-medium"
              >
                <CircleOff size={16} /> Inactive
              </li>
            )}

            {/* Config */}
            {onConfig && (
              <li
                onClick={() => {
                  onConfig();
                  setOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 font-medium"
              >
                <Settings size={16} /> Config
              </li>
            )}

            {/* Delete */}
            {onDelete && (
              <li
                onClick={() => {
                  onDelete();
                  setOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 cursor-pointer text-red-600 font-medium"
              >
                <Trash2 size={16} /> Delete
              </li>
            )}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="p-2 rounded-md hover:bg-gray-100 transition"
      >
        <MoreVertical size={size} className="text-gray-600" />
      </button>

      {ReactDOM.createPortal(menu, document.body)}
    </>
  );
};

export default ActionMenu;
