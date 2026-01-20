const CartSkeleton = () => {
  return (
    <div className="grid grid-cols-12 gap-16 animate-pulse">
      {/* LEFT - CART ITEMS */}
      <div className="col-span-8 space-y-8">
        {/* ITEM */}
        <div className="flex items-center gap-6 border-t border-b py-6">
          <div className="w-4 h-4 bg-gray-200 rounded-full" />

          <div className="w-20 h-20 bg-gray-200 rounded" />

          <div className="flex-1 space-y-3">
            <div className="h-4 w-40 bg-gray-200 rounded" />
            <div className="h-3 w-20 bg-gray-200 rounded" />
          </div>

          <div className="w-32 h-10 bg-gray-200 rounded" />
          <div className="w-16 h-4 bg-gray-200 rounded" />
        </div>

        {/* COUPON / UPDATE */}
        <div className="flex gap-6">
          <div className="flex-1 h-12 bg-gray-200 rounded" />
          <div className="w-40 h-12 bg-gray-200 rounded" />
        </div>
      </div>

      {/* RIGHT - SUMMARY */}
      <div className="col-span-4">
        <div className="bg-gray-100 p-6 space-y-6 rounded">
          <div className="h-5 w-32 bg-gray-200 rounded" />

          <div className="flex justify-between">
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-4 w-16 bg-gray-200 rounded" />
          </div>

          <div className="flex justify-between">
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-4 w-28 bg-gray-200 rounded" />
          </div>

          <div className="border-t pt-4 flex justify-between">
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-5 w-24 bg-gray-200 rounded" />
          </div>

          <div className="h-12 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  )
}

export default CartSkeleton
