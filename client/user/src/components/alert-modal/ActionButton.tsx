import type { ActionButtonProps } from "../../types/alert.type";

const ActionButton = ({
  label,
  onClick,
  autoFocus,
  variant = "primary",
  onClose,
}: ActionButtonProps) => {
  const base =
    "inline-flex items-center justify-center rounded-xl px-3.5 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black/30 transition";

  const styles: Record<string, string> = {
    primary: "bg-neutral-900 text-white hover:bg-neutral-800",
    secondary: "bg-neutral-100 text-neutral-800 hover:bg-neutral-200",
    ghost: "bg-transparent text-neutral-700 hover:bg-neutral-100",
  };
  return (
    <button
      autoFocus={autoFocus}
      className={`${base} ${styles[variant]}`}
      onClick={() => {
        onClick?.();
        onClose();
      }}
    >
      {label}
    </button>
  );
};
export default ActionButton;
