export interface ProductVariant {
    id:number;
    name:string;
    quantity:number;
}
export const ProductVariantOption ={
    COLOR:1,
    SIZE:2
} as const;
export type ProductVariantOption = typeof ProductVariantOption[keyof typeof ProductVariantOption];