import ProductCard from './ProductCard'

const RelatedProducts = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-10">related products</h2>

      <div className="grid grid-cols-3 gap-10">
        <ProductCard
          product={{
            name: 'linen bed skirt',
            price: 129,
            salePrice: 109,
            image: '/images/p2.jpg',
            category: 'home decor',
            badge: 'sale',
          }}
        />
      </div>
    </div>
  )
}

export default RelatedProducts
