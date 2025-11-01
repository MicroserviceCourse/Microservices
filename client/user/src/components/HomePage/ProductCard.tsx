import React from 'react';

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  oldPrice?: number;
  tag?: '' | 'sale' | 'new';
  status?: 'out-of-stock' | '';
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  price,
  oldPrice,
  tag,
  status,
}) => {
  const isOutOfStock = status === 'out-of-stock';
  const isSale = tag === 'sale';
  const isNew = tag === 'new';

  return (
    <div className="relative group">
      <img
        src={image}
        alt={name}
        className={`w-full object-cover aspect-square rounded ${isOutOfStock ? 'opacity-50' : ''}`}
      />
      {tag && (
        <div
          className={`absolute top-2 right-2 px-2 py-1 text-xs text-white uppercase font-bold rounded ${
            isSale ? 'bg-black' : isNew ? 'bg-green-500' : ''
          }`}
        >
          {tag}
        </div>
      )}
      {isOutOfStock && (
        <div className="absolute top-2 right-2 px-2 py-1 text-xs bg-black text-white uppercase font-bold rounded">
          out of stock
        </div>
      )}

<div className="mt-2">
  <div className="flex justify-between items-start">
    <div>
      <h4 className="text-sm font-semibold leading-[1.1] mb-0">{name}</h4>
      <p className="text-[11px] text-[#949494] leading-[1] mt-[0.5px] text-left">join life</p>

    </div>
    <span className="text-sm font-normal">${price}</span>
  </div>
</div>

    </div>
  );
};

export default ProductCard;
