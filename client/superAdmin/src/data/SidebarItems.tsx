import { FileText, Grid, Layers, Package, ShoppingCart } from "lucide-react";

export const SideBarItems = [
    {
        title: "Main Home",
        items: [
            {
                name: 'Dashboard',
                icon: Grid,
                children: [
                    "Home 01",
                    "Home 02",
                    "Home 03",
                    "Home 04",
                    "Home Boxed",
                    "Home Menu Icon Hover",
                    "Home Menu Icon Default",
                ]
            }
        ]
    },
    {
        title: 'ALL PAGE',
        items: [
            {
                name: 'Eccommerce',
                icon: ShoppingCart,
                children: ['Product List', 'Add Product', 'Product Detail']
            },
            {
                name: 'Category',
                icon: Layers,
                children: ["Category List", "Add Category"],
            },
            {
                name: "Attributes",
                icon: Package,
                children: ["Color", "Size", "Material"],
            },
            {
                name: "Order",
                icon: FileText,
                children: ["Order List", "Order Detail"],
            }
        ]
    }
]