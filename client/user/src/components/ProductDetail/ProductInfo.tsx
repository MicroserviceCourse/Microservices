import type { ProductProps } from "../../types/product.type";

const ProductInfo = ({product}:ProductProps) => {
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
          <button className="w-12">-</button>
          <input
            className="w-12 text-center outline-none"
            defaultValue={1}
          />
          <button className="w-12">+</button>
        </div>

        <button className="bg-black text-white px-8 h-[48px] uppercase text-sm">
          add to cart
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
