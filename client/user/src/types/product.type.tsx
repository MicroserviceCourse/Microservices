export interface ProductProps {
    product: {
        id: number;
        name: string;
        category: string;
        image: string;
        price: number;
        salePrice?: number;
        isNew?: boolean;
        isSale?: boolean;
    }
}