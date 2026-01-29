import type { BadgeProps } from "../../../types";

const VARIANT_CLASS = {
  info: "bg-[#E6EFFF] text-[#0061FF]",
  success: "bg-[#E6F9F0] text-[#00B69B]",
  danger: "bg-[#FFE6E6] text-[#FF4D4D]",
};
export default function ProfileBadge({
  variant = "info",
  icon,
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`px-2 py-0.5 rounded text-[13px] font-bold flex items-center gap-1 ${VARIANT_CLASS[variant]} ${className}`}
    >
      {icon}
      {children}
    </span>
  );
}
