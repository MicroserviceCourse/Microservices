import { Outlet } from "react-router-dom";

import SellerHeader from "../components/SellerHeader";
import Sidebar from "./SideBar";

export default function SellerLayout() {
  return (
    <div className="flex w-full h-screen bg-gray-50 overflow-hidden">

      {/* Sidebar */}
      <Sidebar />

      {/* MAIN SECTION */}
      <div className="flex-1 flex flex-col overflow-y-auto">

        {/* Header */}
        <SellerHeader />

        {/* CONTENT AREA */}
        <div className="p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
}
