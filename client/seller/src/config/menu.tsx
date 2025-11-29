// src/config/menu.js
import { Icons } from "../icons";

export const MenuConfig = [
  {
    label: "Dashboard",
    icon: Icons.Dashboard,
    collapsible: true,
    submenu: [
      { label: "Sales Analytics", path: "/seller/analytics" },
      { label: "Sellers List", path: "/seller/sellers/list" },
      { label: "Sellers Table", path: "/seller/sellers/table" },
      { label: "Sellers Grid", path: "/seller/sellers/grid" },
      { label: "Seller Profile", path: "/seller/profile" },
      { label: "Revenue by Period", path: "/seller/revenue" },
    ],
  },

  { label: "Products", icon: Icons.Products, path: "/seller/products" },
  { label: "Orders", icon: Icons.Orders, path: "/seller/orders" },
  { label: "Statistics", icon: Icons.Statistics, path: "/seller/statistics" },
  { label: "Reviews", icon: Icons.Reviews, path: "/seller/reviews" },
  { label: "Customers", icon: Icons.Customers, path: "/seller/customers" },
];
