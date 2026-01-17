// components/product/ProductGrid.tsx
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import type { Product, ProductGridProps } from "../../types/product.type";
import { getProduct } from "../../service/api/Product";



const ProductGrid = ({page,size,onTotalChange}:ProductGridProps) => {
   const [product,setProduct]=useState<Product[]>([]);
   const [loading,setLoading] = useState(false);
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        setLoading(true)
        const response = await getProduct({
          page,
          size
        });
        setProduct(response.data.data.content || []);
        onTotalChange(response.data.data.totalElements);
      }catch(error){
        console.log(error);
      }finally{
        setLoading(false)
      }
    }
    fetchData();
  },[page,size,onTotalChange])
   if (loading) {
    return (
      <div className="flex justify-center py-20 text-gray-500">
        Loading products...
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9">
      {product.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};

export default ProductGrid;
