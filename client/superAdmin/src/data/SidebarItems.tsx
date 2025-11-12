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
 
        name: "Roles & Permissions",
        icon: Shield,
        path: "/dashboard/roles",     
      },
      {
       
        name: "Modules & Permissions",
        icon: Layers,
        path: "/dashboard/modules",    
      },
      {
        name: "System Settings",
        icon: Settings,
        path: "/dashboard/settings",
      },
    ]
  }
]