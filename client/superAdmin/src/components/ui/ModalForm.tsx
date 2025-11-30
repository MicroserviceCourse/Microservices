import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { ModalFormProps } from "../../types";

const ModalForm = ({
  isOpen,
  title,
  onClose,
  onSubmit,
  children,
  confirmText = "Save",
  cancelText = "Cancel",
  loading = false,
  height = "65vh",            
  width = "max-w-lg",
}: ModalFormProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 220, damping: 25 }}
            className={`relative bg-white ${width} w-full rounded-2xl shadow-2xl border border-gray-100 p-6`}
            style={{
              boxShadow:
                "0 8px 32px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)",
            }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-5 border-b border-gray-100 pb-3">
              <h2 className="text-[20px] font-semibold text-gray-800 tracking-tight">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Form content */}
            <div className="max-h-[65vh] overflow-y-auto px-1 scrollbar-thin scrollbar-thumb-gray-200  custom-scroll"   style={{ height: height }}>
              {children}
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-4">
              <button
                onClick={onClose}
                className="px-5 py-2.5 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg 
                  font-medium hover:bg-gray-100 transition-all duration-200"
              >
                {cancelText}
              </button>
              <button
                onClick={onSubmit}
                disabled={loading}
                className={`px-5 py-2.5 text-white font-medium rounded-lg transition-all duration-300 ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-sm hover:shadow"
                }`}
              >
                {loading ? "Saving..." : confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalForm;
