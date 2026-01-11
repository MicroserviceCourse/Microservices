import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SideBarItem = ({ item }: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const Icon = item.icon;
  const isActive = item.to && location.pathname === item.to;
  const hasChildren = !!item.children;
  const [open, setOpen] = useState(
    hasChildren && item.children.some((c: any) => location.pathname.startsWith(c.to)),
  );

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition
            ${open ? "bg-slate-800 text-white" : "hover:bg-slate-800"}`}
        >
          <div className="flex items-center gap-3">
            <Icon size={18} />
            <span>{item.label}</span>
          </div>
          <ChevronDown size={16} className={`transition ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div className="ml-10 mt-1 space-y-1">
            {item.children.map((sub: any) => {
              const subActive = location.pathname === sub.to;

              return (
                <button
                  key={sub.to}
                  onClick={() => navigate(sub.to)}
                  className={`block w-full text-left px-3 py-1 text-sm rounded
                    ${subActive ? "text-orange-400" : "hover:text-white"}`}
                >
                  {sub.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }
  return (
    <button
      onClick={() => navigate(item.to)}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition
        ${isActive ? "bg-slate-800 text-white" : "hover:bg-slate-800"}`}
    >
      <Icon size={18} />
      <span>{item.label}</span>
    </button>
  );
};
export default SideBarItem;
