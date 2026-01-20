import { useEffect, useState } from 'react'
import CartItem from '../components/Cart/CartItem'
import CartSummary from '../components/Cart/CartSummary'
import { deleteCart, getCart, updateQuantityCart } from '../service/api/Cart'
import CartSkeleton from '../components/Cart/CartSkeleton'
import EmptyCart from '../components/Cart/EmptyCart'
import { useNavigate } from 'react-router-dom'
import type { CartResponse } from '../types/cart.type'
import Checkbox from '../components/ui/CheckBox'
import { useCart } from '../components/Cart/cart-context'
import { useAlert } from '../components/alert-context/alert-context'

const CartPage = () => {
  const [data, setData] = useState<CartResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const { refreshCartCount } = useCart()
  const { showAlert } = useAlert()
  const navigate = useNavigate()
  const [updatingId, setUpdatingId] = useState<number | null>(null)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const toggleSelectItem = (productId: number) => {
    setSelectedIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )
  }
  const handlelDelete = async () => {
    try {
      setSaving(true)
      await deleteCart(selectedIds)
      refreshCartCount()
      setSelectedIds([])
      fetchData()
    } catch (err) {
      console.log(err)
    } finally {
      setSaving(false)
    }
  }

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await getCart()
      setData(res?.data?.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  const cartItems = data?.cartItems ?? []

  const isAllSelected =
    cartItems.length > 0 && selectedIds.length === cartItems.length

  const toggleSelectAll = () => {
    if (!data) return

    if (isAllSelected) {
      setSelectedIds([])
    } else {
      setSelectedIds(data.cartItems.map((item) => item.productId))
    }
  }

  const updateQuantityLocal = (
    cart: CartResponse,
    productId: number,
    quantity: number
  ): CartResponse => {
    const items = cart.cartItems.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    )

    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

    return {
      ...cart,
      cartItems: items,
      totalPrice: total,
    }
  }
  const updateQuantity = async (productId: number, quantity: number) => {
    if (!data || quantity < 0) return
    setUpdatingId(productId)
    const prevData = data

    setData(updateQuantityLocal(data, productId, quantity))

    try {
      await updateQuantityCart([{ productId, quantity }])
    } catch (err:any) {
      setData(prevData)
      showAlert({
        title: 'Cannot update quantity',
        description: err?.response?.data?.message ||'Please try again later',
        type: 'error',
      })
    } finally {
      setUpdatingId(null)
    }
  }

  const handleDeleteItem = async (productId: number) => {
    try {
      setSaving(true)
      await deleteCart([productId])
      await refreshCartCount()
      fetchData()
    } catch (err) {
      console.log(err)
    } finally {
      setSaving(false)
    }
  }
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
      <div className="max-w-7xl mx-auto px-10 py-20 ">
        {loading || (saving && <CartSkeleton />)}
        {!loading && !saving && (!data || data.cartItems.length === 0) && (
          <EmptyCart onShoppingCart={() => navigate('/')} />
        )}
        {!loading && !saving && data && data.cartItems.length > 0 && (
          <div className="grid grid-cols-12 gap-16">
            <div className="col-span-8">
              <h2 className="text-lg font-semibold mb-8 uppercase">
                Shopping Cart
              </h2>
              <div className="flex items-center gap-3 mb-6">
                <Checkbox checked={isAllSelected} onChange={toggleSelectAll} />
                <span className="text-sm uppercase tracking-wide">
                  Select all
                </span>
              </div>
              {data.cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  disabled={updatingId === item.productId}
                  onUpdateQuantity={updateQuantity}
                  onToggleSelect={toggleSelectItem}
                  onDeleteItem={handleDeleteItem}
                  isSelected={selectedIds.includes(item.productId)}
                />
              ))}
              <div className="flex  justify-between mt-10">
                <button
                  onClick={() => navigate('/')}
                  className="text-sm text-gray-500 hover:text-black"
                >
                  ← Go shopping
                </button>
                <div className="flex gap-4">
                  <button
                    onClick={handlelDelete}
                    disabled={selectedIds.length === 0}
                    className="border px-6 py-3 uppercase
                  hover:bg-red-600 hover:text-white
                  disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
            <div className="col-span-4">
              <CartSummary total={data.totalPrice} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default CartPage
