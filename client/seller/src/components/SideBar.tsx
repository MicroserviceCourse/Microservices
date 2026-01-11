import { useState } from "react";
import { motion } from "framer-motion";
import { Icons } from "../icons";
import { MenuConfig } from "../config/menu";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState("Dashboard");

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 p-6 flex flex-col">
      {/* LOGO */}
      <div className="flex items-center gap-3 mb-10">
        <img
          src="https://shop-point.merku.love/assets/logo_light-33bb10d5.svg"
          className="w-8 h-8"
        />
        <h1 className="text-xl font-semibold text-[#00224F]">ShopPoint</h1>
      </div>

      <nav className="flex-1 space-y-4">
        {MenuConfig.map((menu, idx) => {
          const Icon = menu.icon;

          // Nếu có submenu (collapsible)
          if (menu.collapsible) {
            return (
              <div key={idx}>
                {/* COLLAPSE BUTTON */}
                <button
                  onClick={() => setOpenMenu(openMenu === menu.label ? "" : menu.label)}
                  className="flex justify-between items-center w-full px-3 py-2 text-left
                             font-medium text-[#00224F] hover:bg-gray-100 rounded-lg"
                >
                  <span className="flex items-center gap-3">
                    <Icon size={18} />
                    {menu.label}
                  </span>

                  <Icons.ArrowDown
                    size={18}
                    className={`transition-transform ${
                      openMenu === menu.label ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* SUBMENU */}
                {openMenu === menu.label && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.2 }}
                    className="ml-4 mt-2 space-y-3"
                  >
                    {menu.submenu.map((sub, subIdx) => (
                      <li
                        key={subIdx}
                        className="flex items-center text-sm text-gray-600 cursor-pointer
                                   hover:text-[#00224F] transition"
                      >
                        <span className="mr-2 text-lg">•</span>
                        {sub.label}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </div>
            );
          }

          // Nếu là menu thường
          return <SidebarItem key={idx} icon={Icon} label={menu.label} />;
        })}
      </nav>
    </div>
  );
}
