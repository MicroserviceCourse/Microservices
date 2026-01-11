// src/config/menu.js
import { Icons } from "../icons";

export const MenuConfig = [
  {
    label: "Dashboard",
    icon: Icons.Dashboard,
    path: "/",
  },

  {
    label: "Products",
    icon: Icons.Products,
    collapsible: true,
    submenu: [
      {
        label: "Products List",
        path: "/product",
      },
      {
        label: "Create Product",
        path: "/product/create",
      },
    ],
  },
  {
    label: "Inventory",
    icon: Icons.Inventory,
    path: "/inventory/import",
  },

  {
    label: "Media",
    icon: Icons.Media,
    path: "/media",
  },

  {
    label: "Promotions",
    icon: Icons.Promotions,
    collapsible: true,
    submenu: [
      {
        label: "All Promotions",
        path: "/promotion",
      },
      {
        label: "Create Promotion",
        path: "/promotion/create",
      },
    ],
  },
];
