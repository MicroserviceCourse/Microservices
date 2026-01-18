import CartItem from "../components/Cart/CartItem"
import CartSummary from "../components/Cart/CartSummary"

const CartPage = () => {
  return (
    <div className="w-full">
      <section
        className="relative w-full h-[420px] bg-center bg-cover flex
        items-center justify-center bg-fixed "
        style={{
          backgroundImage:
            'url(https://bazaar.qodeinteractive.com/wp-content/uploads/2017/07/cart-title-background-img.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-3xl font-medium tracking-wide">
            Cart
          </h1>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-10 py-20 grid grid-cols-12 gap-16">
        <div className="col-span-8">
          <h2 className="text-lg font-semibold mb-8 uppercase">
            Shopping Cart
          </h2>
          <CartItem/>
          <div className="flex items-center justify-between mt-10">
            <button className="text-sm text-gray-500 hover:text-black flex items-center gap-2">
              ← Go shopping
            </button>

            <button className="border px-6 py-3 text-sm uppercase hover:bg-black hover:text-white transition">
              Update cart
            </button>
          </div>
        </div>
        <div className="col-span-4">
            <CartSummary/>
        </div>
      </div>
    </div>
  )
}
export default CartPage
