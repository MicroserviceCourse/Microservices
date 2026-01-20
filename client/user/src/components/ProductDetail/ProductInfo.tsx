import { useState } from "react";
import type { ProductProps } from "../../types/product.type";
import { useAlert } from "../alert-context/alert-context";
import { addCart } from "../../service/api/Cart";
import { useCart } from "../Cart/cart-context";

const ProductInfo = ({product}:ProductProps) => {
  const [quantity,setQuantity] = useState(1);
  const [loading,setLoading] = useState(false);
  const {showAlert} = useAlert();
  const {refreshCartCount} = useCart();
  const handleAddCart = async()=>{
    if(!product?.id) return;

    try{
      setLoading(true);
      const payload ={
        productId:product.id,
        quantity,
      
      }
      await addCart(payload);
      refreshCartCount();
      showAlert({
        title:"Add to cart success",
        type:"success",
        autoClose:3000,
      })
    }catch(error:any){
      showAlert({
        title:error?.response?.data?.message || "Add to cart failed",
        type:"error",
        autoClose:3000,
      })
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className="space-y-6 text-sm text-gray-600">
      <h1 className="text-3xl font-semibold text-black">
        {product?.name}
      </h1>

      <p className="text-xl text-black">${product?.price}</p>

      {/* RATING */}
      <div className="flex items-center gap-2">
        <div className="flex text-black">★★★★★</div>
        <span className="text-gray-500">(1 customer review)</span>
      </div>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut
        ullamcorper leo, eget euismod orci.
      </p>

      {/* QUANTITY + BUTTON */}
      <div className="flex gap-4 items-center">
        <div className="flex border h-[48px]">
          <button className="w-12"  onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
          <input
            className="w-12 text-center outline-none"
             value={quantity}
             readOnly
          />
          <button className="w-12"  onClick={() => setQuantity(q => q + 1)}>+</button>
        </div>

       <button
          onClick={handleAddCart}
          disabled={loading}
          className="bg-black text-white px-8 h-[48px] uppercase text-sm disabled:opacity-50"
        >
          {loading ? "adding..." : "add to cart"}
        </button>
      </div>

      <button className="text-gray-400 hover:text-black text-sm">
        add to wishlist
      </button>

      {/* META */}
      <div className="space-y-1 text-gray-500">
        <p>SKU: {product?.slug}</p>
        <p>Category: {product?.categories.join(",")}</p>
        <p>Tags: Catalog, Wood</p>
      </div>
    </div>
  );
};

export default ProductInfo;
