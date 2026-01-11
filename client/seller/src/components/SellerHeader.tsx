import { Icons } from "../icons";
import { FiBell, FiSun, FiSearch } from "react-icons/fi";

export default function SellerHeader() {
  return (
    <div className="w-full bg-[#f9f9f9] px-6 py-4 flex items-center justify-between">
      {/* SEARCH BAR */}
      <div className="relative w-2/3">
        <FiSearch className="absolute top-3 left-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      {/* RIGHT ICONS */}
      <div className="flex items-center gap-5">
        <FiSun size={20} className="text-gray-600 cursor-pointer" />

        {/* LANGUAGE */}
        <img src="https://flagcdn.com/w20/gb.png" className="w-6 h-4 cursor-pointer" />

        {/* NOTIFICATIONS */}
        <div className="relative cursor-pointer">
          <FiBell size={22} className="text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            7
          </span>
        </div>

        {/* MESSAGES */}
        <div className="relative cursor-pointer">
          <FiBell size={22} className="text-blue-500" />
          <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            2
          </span>
        </div>

        {/* USER AVATAR */}
        <img src="https://i.pravatar.cc/40" className="w-9 h-9 rounded-full cursor-pointer" />
      </div>
    </div>
  );
}
