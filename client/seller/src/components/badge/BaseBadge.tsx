import type { BaseBadgeProps } from "../../types";

const BaseBadge = ({ label, className = "", icon }: BaseBadgeProps) => {
  return (
    <span
      className={`
            inline-flex items-center gap-1
            px-3 py-1 rounded-full text-xs font-medium
            ${className}
          `}
    >
      {icon}
      {label}
    </span>
  );
};
export default BaseBadge;
