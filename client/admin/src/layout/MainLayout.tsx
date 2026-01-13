import { Bell, Search } from "lucide-react";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
import { AlertProvider } from "../components/alert-context/alert-context";


const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#f6f7fb]">
      <SideBar />

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-500">WELCOME!</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-3 py-2 rounded-lg bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-blue-400"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search />
              </span>
            </div>
            <button className="text-gray-500 hover:text-gray-700">🌙</button>
            <button className="relative text-gray-500 hover:text-gray-700">
              <Bell />
              <span className="absolute -top-1 -right-1 text-[10px] bg-red-500 text-white rounded-full px-1">
                3
              </span>
            </button>
            <img src="https://i.pravatar.cc/40" alt="avatar" className="w-8 h-8 rounded-full" />
          </div>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
            <AlertProvider>
            <Outlet />
          </AlertProvider>
        </main>
      </div>
    </div>
  );
};
export default MainLayout;
