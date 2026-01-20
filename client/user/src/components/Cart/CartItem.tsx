import { useEffect, useState } from 'react'
import { useAlert } from '../alert-context/alert-context'
import Checkbox from '../ui/CheckBox'

const CartItem = ({
  item,
  onUpdateQuantity,
  onToggleSelect,
  isSelected,
  disabled,
  onDeleteItem,
}: any) => {
  const total = item.price * item.quantity
  const { showAlert } = useAlert()
  const handlePlus = () => {
    onUpdateQuantity(item.productId, item.quantity + 1)
  }
  const handleMinus = () => {
    if (item.quantity - 1 <= 0) {
      showAlert({
        title: 'Remove item',
        description: 'Do you want to remove this item from cart?',
        type: 'warning',
        primaryAction: {
          label: 'Remove',
          onClick: () => onDeleteItem(item.productId),
        },
        secondaryAction: {
          label: 'Cancel',
          onClick: () => {},
        },
      })
      return
    }
    onUpdateQuantity(item.productId, item.quantity - 1)
  }
  const [tempQty, setTempQty] = useState(item.quantity)
  const [isEditing, setIsEditing] = useState(false)
  useEffect(() => {
    setTempQty(item.quantity)
  }, [item.quantity])

  const commitChange = () => {
    if (!isEditing || disabled) return
    setIsEditing(false)

    if (tempQty === item.quantity || tempQty < 1) {
      setTempQty(item.quantity)
      return
    }

    onUpdateQuantity(item.productId, tempQty)
  }
  return (
    <div className="border-t border-b py-16 flex items-center gap-6">
      <Checkbox
        checked={isSelected}
        onChange={() => onToggleSelect(item.productId)}
      />
      <img
        src={item?.productImage}
        alt="product"
        className="w-20 h-20 object-cover"
      />
      <div className="flex-1">
        <div className="font-medium text-black">{item?.productName}</div>
        <p className="text-sm text-gray-400">${item?.price}</p>
      </div>
      <div className="flex border h-[42px]">
        <button
          className="w-10 text-gray-500 hover:text-black disabled:opacity-40
          disabled:cursor-not-allowed disabled:hover:text-gray-500"
          disabled={disabled}
          onClick={handleMinus}
        >
          -
        </button>
        <input
          type="number"
          min={1}
          value={tempQty}
          disabled={disabled}
          className="w-12 text-center border outline-none"
          onFocus={() => setIsEditing(true)}
          onChange={(e) => setTempQty(Number(e.target.value))}
          onBlur={commitChange} 
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.currentTarget.blur() 
            }
          }}
        />

        <button
          className="w-10 text-gray-500 hover:text-black disabled:opacity-40
          disabled:cursor-not-allowed disabled:hover:text-gray-500"
          disabled={disabled}
          onClick={handlePlus}
        >
          +
        </button>
      </div>

      {/* TOTAL */}
      <p className="w-20 text-right text-sm">${total}</p>
    </div>
  )
}
export default CartItem
