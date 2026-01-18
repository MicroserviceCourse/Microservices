import { FiHeart } from "react-icons/fi";

type Product = {
  id?: number;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  category?: string;
  badge?: "sale" | "out-of-stock";
};

const ProductCard = ({ product }: { product: Product }) => {
  const { name, price, salePrice, image, category, badge } = product;

  return (
    <div className="group text-sm">
      {/* IMAGE */}
      <div className="relative overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-[420px] object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* BADGE */}
        {badge && (
          <span className="absolute top-4 right-4 bg-black text-white text-xs px-4 py-1 uppercase">
            {badge === "sale" ? "sale" : "out of stock"}
          </span>
        )}

        {/* HOVER ACTION */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition">
          <div className="flex shadow-lg">
            <button
              className="
                bg-black text-white px-5 py-3 text-xs uppercase
                tracking-wider hover:bg-gray-900 transition
              "
            >
              quick look
            </button>
            <button
              className="
                bg-[#949494] px-4 flex items-center justify-center
                hover:bg-gray-700 transition
              "
            >
              <FiHeart className="text-white text-sm" />
            </button>
          </div>
        </div>
      </div>

      {/* INFO */}
      <div className="mt-4 space-y-1">
        <h3 className="text-base font-medium text-black">{name}</h3>

        {category && (
          <p className="text-xs uppercase text-gray-400">{category}</p>
        )}

        {/* PRICE */}
        <div className="flex items-center gap-2 text-sm">
          {salePrice ? (
            <>
              <span className="line-through text-gray-400">
                ${price}
              </span>
              <span className="font-medium text-black">
                ${salePrice}
              </span>
            </>
          ) : (
            <span className="font-medium text-black">${price}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
