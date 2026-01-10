// components/product/ProductGrid.tsx
import ProductCard from "./ProductCard";

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "aviator sunglasses",
    category: "mens fashion",
    image: "https://bazaar.qodeinteractive.com/wp-content/uploads/2017/06/h4-product-1-550x550.jpg",
    price: 25,
  },
  {
    id: 2,
    name: "backpack",
    category: "accessories",
    image: "https://bazaar.qodeinteractive.com/wp-content/uploads/2017/06/h4-product-9-550x550.jpg",
    price: 135,
    isNew: true,
  },
  {
    id: 3,
    name: "ballerina dress",
    category: "join life",
    image: "https://bazaar.qodeinteractive.com/wp-content/uploads/2017/06/h1-product-6-550x550.jpg",
    price: 85,
    salePrice: 65,
    isSale: true,
  },
];

const ProductGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9">
      {MOCK_PRODUCTS.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};

export default ProductGrid;
