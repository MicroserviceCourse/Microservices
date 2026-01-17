export interface Product {
  id: number;
  code: string;
  name: string;
  slug: string;
  price: number;
  stock: number;
  status: number;
  thumbnailUrl: string;
  updatedAt: string;
}
export interface SelectedItem {
  productId: number;
  importQty: number | undefined;
}
export const VARIANT_TYPES: { label: string; value: string }[] = [
  { label: "COLOR", value: "1" },
  { label: "SIZE", value: "2" },
];