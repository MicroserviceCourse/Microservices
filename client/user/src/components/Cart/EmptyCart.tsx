import { ShoppingBag } from 'lucide-react'

const EmptyCart = ({onShoppingCart}:any) => {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <ShoppingBag size={56} className="text-gray-300 mb-6" />
      <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
      <p className="text-gray-500 mb-8">
        Looks like you haven’t added anything to your cart yet.
      </p>
      <button
        onClick={onShoppingCart}
        className="px-8 py-3 border text-sm uppercase
        hover:bg-black hover:text-white transition"
      >
        Go Shopping
      </button>
    </div>
  )
}
export default EmptyCart
