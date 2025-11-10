import { useState } from "react";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TooltipProps } from "../../types";
const Tooltip = ({ text, children }: TooltipProps) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full mb-2 px-3 py-1 text-xs font-medium text-white bg-gray-800 rounded-md shadow-lg whitespace-nowrap z-50"
          >
            {text}
            <div className="absolute left-1/2 bottom-[-4px] -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
