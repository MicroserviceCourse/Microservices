import type { SidebarItemProps } from "../types";

export default function SidebarItem({ icon: Icon, label, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2 w-full text-[#00224F] 
        hover:bg-gray-100 rounded-lg transition cursor-pointer"
    >
      <Icon size={18} />
      {label}
    </button>
  );
}
