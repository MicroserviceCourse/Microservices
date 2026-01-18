import { Trash2 } from 'lucide-react'

const CartItem = () => {
  return (
    <div className="border-t border-b py-16 flex items-center gap-6">
      <button className="text-gray-400 hover:text-black">
        <Trash2 size={18} />
      </button>
      <img
        src="https://bazaar.qodeinteractive.com/wp-content/uploads/2017/07/shop-img-1.jpg"
        alt="product"
        className="w-20 h-20 object-cover"
      />
      <div className="flex-1">
        <div className="font-medium text-black">3-drawer chest</div>
        <p className="text-sm text-gray-400">$169</p>
      </div>
      <div className="flex border h-[42px]">
        <button className="w-10 text-gray-500 hover:text-black">-</button>
        <input
          className="w-12 text-center outline-none text-sm"
          defaultValue={1}
        />
        <button className="w-10 text-gray-500 hover:text-black">+</button>
      </div>

      {/* TOTAL */}
      <p className="w-20 text-right text-sm">$169</p>
    </div>
  )
}
export default CartItem;