import {
  useEffect,
  useId,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import type { AlertModalProps } from "../../types/alert.type";
import ActionButton from "./ActionButton";
import { iconMap, tone } from "../../constant/AlertConstant";


const AlertModal=({
  open,
  onOpenChange,
  title,
  description,
  type = "info",
  closeable = true,
  autoClose,
  primaryAction,
  secondaryAction,
  size = "md",
}: AlertModalProps) =>{
 const titleId = useId();
  const descId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();

  // Sizes
  const maxWidth = size === "sm" ? "max-w-sm" : size === "lg" ? "max-w-lg" : "max-w-md";

  // Auto close
  useEffect(() => {
    if (!open || !autoClose) return;
    const t = setTimeout(() => onOpenChange(false), autoClose);
    return () => clearTimeout(t);
  }, [open, autoClose, onOpenChange]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  // Simple focus trap
  useEffect(() => {
    if (!open || !panelRef.current) return;
    const el = panelRef.current;
    const focusable = el.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (focusable.length === 0) return;
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        (last || first).focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        (first || last).focus();
      }
    };

    el.addEventListener("keydown", onKeyDown as any);
    return () => el.removeEventListener("keydown", onKeyDown as any);
  }, [open]);

  if (typeof window === "undefined") return null;

  const t = tone[type];

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          {/* Dim/overlay with subtle blur */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.18 }}
          />

          {/* Panel */}
          <motion.div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descId : undefined}
            tabIndex={-1}
            ref={panelRef}
            className={`absolute left-1/2 top-1/2 w-[92vw] ${maxWidth} -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/60 bg-white/85 shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl ring-1 ring-black/5`}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: reduced ? "tween" : "spring", duration: reduced ? 0.18 : 0.28, stiffness: 420, damping: 30 }}
          >
            {/* Accent bar */}
            <div className={`h-1.5 bg-gradient-to-r ${t.accent}`} />

            {/* Header */}
            <div className="p-5">
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl ${t.badge}`}>
                  <span className={`${t.icon}`}>{iconMap[type]}</span>
                </div>
                <div className="flex-1">
                  <h2 id={titleId} className="text-base font-semibold tracking-tight text-neutral-900">
                    {title}
                  </h2>
                  {description && (
                    <div id={descId} className="mt-1 text-sm leading-6 text-neutral-600">
                      {description}
                    </div>
                  )}
                </div>

                {closeable && (
                  <button
                    aria-label="Close"
                    onClick={() => onOpenChange(false)}
                    className="rounded-lg p-1.5 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-black/30"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Footer */}
              {(primaryAction || secondaryAction) && (
                <div className="mt-5 flex justify-end gap-2">
                  {secondaryAction && (
                    <ActionButton {...secondaryAction} onClose={() => onOpenChange(false)} />
                  )}
                  {primaryAction && (
                    <ActionButton {...primaryAction} onClose={() => onOpenChange(false)} />
                  )}
                </div>
              )}
            </div>

            {/* Auto-close progress */}
            {autoClose && (
              <motion.div
                className={`h-1 w-full bg-gradient-to-r ${t.accent}`}
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                style={{ transformOrigin: "left" }}
                transition={{ duration: reduced ? 0 : (autoClose / 1000), ease: "linear" }}
              />
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
export default AlertModal;