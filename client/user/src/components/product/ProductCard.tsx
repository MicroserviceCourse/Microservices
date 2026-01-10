import { FiHeart } from "react-icons/fi";
import type { ProductProps } from "../../types/product.type";

const ProductCard = ({ product }: ProductProps) => {
    return (
        <div className="group relative">
            <div className="relative overflow-hidden bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[320px] object-cover" />
                {product.isSale && (
                    <span className="absolute top-4 right-0 bg-black text-white text-xs px-7 py-2 font-bold">
                        sale
                    </span>
                )}
                {product.isNew && (
                    <span className="absolute top-4 right-0 bg-white text-black text-xs px-7 py-2 font-bold">
                        new
                    </span>
                )}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition">
                    <div className="flex shadow-lg">
                        <button className="bg-black text-white px-4 py-2 text-xs
                      tracking-wider hover:bg-gray-900 transition">
                            quick look
                        </button>
                        <button className="bg-[#949494]
        px-3 flex items-center justify-center
        hover:bg-gray-700
        transition">
                            <FiHeart className="text-white text-sm" />
                        </button>
                    </div>
                </div>

            </div>
            <div className="mt-4 flex justify-between items-start group">
  {/* LEFT */}
  <div className="flex-1 pr-4">
    <h3 className="font-medium text-lg">{product.name}</h3>
    <p className="text-sm text-gray-500">{product.category}</p>
  </div>

  {/* RIGHT */}
  <div className="w-28 text-right"> {/* 👈 FIX WIDTH */}
    <div className="relative h-5 overflow-hidden">
      {/* PRICE */}
      <div
        className="
          flex justify-end gap-2 text-sm
          transition-all duration-300
          group-hover:opacity-0
          group-hover:-translate-y-2
        "
      >
        {product.salePrice ? (
          <>
            <span className="line-through text-gray-400">
              ${product.price}
            </span>
            <span className="font-medium">
              ${product.salePrice}
            </span>
          </>
        ) : (
          <span className="font-medium">
            ${product.price}
          </span>
        )}
      </div>

      {/* ADD TO CART */}
      <div
        className="
          absolute right-0 top-0
          opacity-0 translate-y-2
          group-hover:opacity-100
          group-hover:translate-y-0
          transition-all duration-300
        "
      >
        <button
          className="
            text-xs uppercase tracking-wide
            text-gray-900
            hover:underline
            flex items-center gap-1
            whitespace-nowrap
          "
        >
          add to cart <span>→</span>
        </button>
      </div>
    </div>
  </div>
</div>

        </div>
    )
}
export default ProductCard;