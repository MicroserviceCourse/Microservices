import {
  LayoutDashboard,
  Shirt,
  Layers,
  Boxes,
  ShoppingBag,
  Truck,
  Sliders,
  FileText,
  Settings,
  User,
  Shield,
  Users,
  Store,
  Ticket,
} from "lucide-react";
export const sidebarMenu = [
  {
    section: "GENERAL",
    items: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        to: "/dashboard",
      },
      {
        label: "Media",
        icon: FileText,
        to: "/media",
      },
      {
        label: "Products",
        icon: Shirt,
        children: [
          { label: "List", to: "/products" },
          { label: "Create", to: "/products/create" },
        ],
      },
      {
        label: "Category",
        icon: Layers,
        children: [{ label: "List", to: "/categories" }],
      },
      {
        label: "Inventory",
        icon: Boxes,
        children: [{ label: "Stock", to: "/inventory" }],
      },
      {
        label: "Orders",
        icon: ShoppingBag,
        children: [{ label: "Order List", to: "/orders" }],
      },
      {
        label: "Purchases",
        icon: Truck,
        children: [{ label: "Purchase List", to: "/purchases" }],
      },
      {
        label: "Attributes",
        icon: Sliders,
        children: [{ label: "Attributes", to: "/attributes" }],
      },
      {
        label: "Invoices",
        icon: FileText,
        to: "/invoices",
      },
      {
        label: "Settings",
        icon: Settings,
        to: "/settings",
      },
    ],
  },
  {
    section: "USERS",
    items: [
      {
        label: "Profile",
        icon: User,
        to: "/profile",
      },
      {
        label: "Roles",
        icon: Shield,
        children: [{ label: "Role List", to: "/roles" }],
      },
      {
        label: "Customers",
        icon: Users,
        children: [{ label: "Customer List", to: "/customers" }],
      },
      {
        label: "Sellers",
        icon: Store,
        children: [{ label: "Seller List", to: "/sellers" }],
      },
    ],
  },
  {
    section: "OTHER",
    items: [
      {
        label: "Coupons",
        icon: Ticket,
        children: [{ label: "Coupon List", to: "/coupons" }],
      },
    ],
  },
];
