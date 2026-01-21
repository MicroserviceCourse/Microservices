import { FiBell, FiSun, FiSearch } from "react-icons/fi";
import IconButton from "./ui/IconButton";

export default function SellerHeader() {
  return (
    <header className="sticky top-0 z-40 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between px-6 py-4">
        {/* SEARCH */}
        <div className="relative w-2/3 max-w-xl">
          <FiSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-2xl bg-gray-100 py-2.5 pl-11 pr-4 text-sm text-gray-700 outline-none
              focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* THEME */}
          <IconButton>
            <FiSun size={18} />
          </IconButton>

          {/* LANGUAGE */}
          <IconButton>
            <img
              src="https://flagcdn.com/w20/gb.png"
              alt="EN"
              className="h-4 w-6 rounded-sm"
            />
          </IconButton>

          {/* NOTIFICATION */}
          <IconButton badge={7}>
            <FiBell size={18} />
          </IconButton>

          {/* MESSAGE */}
          <IconButton badge={2} badgeColor="bg-green-500">
            <FiBell size={18} className="text-blue-600" />
          </IconButton>

          {/* AVATAR */}
          <div className="ml-2">
            <img
              src="https://i.pravatar.cc/40"
              alt="User"
              className="h-9 w-9 rounded-full ring-2 ring-gray-200 hover:ring-blue-400 cursor-pointer transition"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

