const CartSummary = ({total}:any) => {
  return (
    <div className="bg-[#f6f6f6] p-8 space-y-6">
      <h3 className="text-lg font-semibold uppercase">Cart totals</h3>
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Subtotal</span>
        <span>${total}</span>
      </div>
      <div className="text-sm space-y-2">
        <p className="text-gray-500">Shipping</p>
        <p className="text-gray-400">
          Enter your address to view shipping options.
        </p>

        <button className="text-black text-sm underline">
          Calculate shipping
        </button>
      </div>
      <hr />
      <div className="flex justify-between text-lg font-semibold">
        <span>Total</span>
        <span>${total}</span>
      </div>

      {/* CHECKOUT */}
      <button className="w-full bg-black text-white py-4 uppercase text-sm hover:bg-gray-900 transition">
        Proceed to checkout
      </button>
    </div>
  )
}
export default CartSummary;
