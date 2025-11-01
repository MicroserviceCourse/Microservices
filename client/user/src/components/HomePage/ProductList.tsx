import React from "react";
import ProductCard from "./ProductCard";
interface Product{
    name:string;
    image:string;
    price:number;
    oldPrice?:number;
    tag?: 'sale' | 'new' | '';
    status?: 'out-of-stock' | '';
}
const products:Product[] = [
    {
        name: 'white blouse',
        image: '/h1-product-2-768x768.jpg',
        price: 25,
        status: '',
        tag: ''
    },
    {
        name: 'round sunglasses',
        image: '/h1-product-1-768x768.jpg',
        price: 14,
        oldPrice: 34,
        status: '',
        tag: 'sale'
    },
    {
        name: 'ballerina dress',
        image: '/h1-product-3-768x768.jpg',
        price: 65,
        oldPrice: 85,
        status: '',
        tag: 'sale',
    },
    {
        name: 'leather backpack',
        image: '/h1-product-4-768x768.jpg',
        price: 28,
        status: 'out-of-stock',
        tag: '',
    },
]
const ProductList = () => {
    return (
        <section className="px-20 py-16 text-center font-poppins">
            <h3 className="text-xl italic text-gray-500 mb-2">don't wait</h3>
            <h2 className="text-3xl font-bold mb-4">shopping everyday</h2>
            <p className="max-w-xl mx-auto text-gray-500 mb-12">
                Alienum phaedrum torquatos nec eu, vis detraxit ertssa periculer ex, nihil expetendis in
                mei. In mei ngerst frust bura erbu
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
            </div>
        </section>
    )
}
export default ProductList;