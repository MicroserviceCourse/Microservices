import { Layers, LayoutGrid,  Settings,  Shield,  Users } from "lucide-react";

export const SideBarItems = [
  {
    title:"SYSTEM MANAGEMENT",
    items:[
      {
        name:"Dashboard",
        icon:LayoutGrid,
        path:"/dashboard/dashboard"
      },
      {
        name:"User Management",
        icon: Users,
        path: "/dashboard/users",
      },
      {
        name: "Role & Permissions",
        icon: Shield,
        path: "/dashboard/roles",
      },
      {
        name:"Module Management",
        icon:Layers,
        path:"/dashboard/modules",
        children: [
          { name: "Module List", path: "/dashboard/modules" },
          { name: "Add Module", path: "/dashboard/modules/create" },
          { name: "Assign Permission", path: "/dashboard/modules/assign" },
        ],
      },
      {
        name: "System Settings",
        icon: Settings,
        path: "/dashboard/settings",
      },
    ]
  }
]