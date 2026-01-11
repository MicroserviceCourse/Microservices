import { sidebarMenu } from "../config/sidebarMenu";
import SideBarGroup from "./SideBarGroup";

const SideBar = () => {
  return (
    <aside className="w-64 bg-[#262d34] text-gray-300">
      <div className="h-16 flex items-center px-6 gap-2 border-b border-slate-800">
        <img
          src="https://techzaa.in/larkon/admin/assets/images/logo-light.png"
          alt="Larkon Logo"
          className="h-25 w-25 object-contain"
        />
      </div>
      <div className="p-3 space-y-6">
        {sidebarMenu.map((group) => (
          <SideBarGroup key={group.section} group={group} />
        ))}
      </div>
    </aside>
  );
};
export default SideBar;
