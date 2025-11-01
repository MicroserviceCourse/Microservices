import React from "react";
const products = [
    {
        id: 1,
        name: "bzfk4 4259",
        price: 240,
        image: 'https://bazaar.qodeinteractive.com/wp-content/uploads/2017/06/h10-product-4-1100x550.jpg'
    },
    {
        id: 2,
        name: "bzfk4 4273",
        price: 180,
        image: "https://bazaar.qodeinteractive.com/wp-content/uploads/2017/06/h10-product-5-1100x550.jpg",
    },
    {
        id: 3,
        name: "bzfk4 3549",
        price: 90,
        image: "https://bazaar.qodeinteractive.com/wp-content/uploads/2017/06/h10-product-6-1100x550.jpg"
    },
    {
        id: 4,
        name: "bzfk4 4274",
        price: 250,
        image: "https://bazaar.qodeinteractive.com/wp-content/uploads/2017/06/h10-product-7-1100x550.jpg"
    }
]
const ProductRow = () => {
    return (
        <section className="bg-white py-12 px-4">
            <div className="flex flex-wrap justify-center gap-8">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="flex flex-col items-center text-center w-[200px]"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-auto object-contain mb-4 transition-transform duration-300 hover:scale-105"
                        />
                        <h3 className="text-[15px] font-medium">{product.name}</h3>
                        <p className="text-gray-500 text-[14px]">${product.price}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
export default ProductRow;