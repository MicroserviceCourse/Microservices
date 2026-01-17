import { useEffect, useState } from 'react'
import {
  ProductVariantOption,
  type ProductVariant,
} from '../../types/productVariant.type'
import { getVariant } from '../../service/api/Variant'
const SideBarProductFilter = () => {
  const [colors, setColors] = useState<ProductVariant[]>([])
  const [sizes, setSizes] = useState<ProductVariant[]>([])
  const [loadingColor, setLoadingColor] = useState(false)
  const [loadingSize, setLoadingSize] = useState(false)
  useEffect(() => {
    const fetchColor = async () => {
      try {
        setLoadingColor(true)
        const response = await getVariant({
          all: true,
          filter: `type==${ProductVariantOption.COLOR}`,
        })
        setColors(response.data.data.content || [])
      } catch (error) {
        console.log(error)
      } finally {
        setLoadingColor(false)
      }
    }
    const fetchSize = async () => {
      try {
        setLoadingSize(true)
        const response = await getVariant({
          all: true,
          filter: `type==${ProductVariantOption.SIZE}`,
        })
        setSizes(response.data.data.content || [])
      } catch (error) {
        console.log(error)
      } finally {
        setLoadingSize(false)
      }
    }
    fetchColor()
    fetchSize()
  }, [])
  const [color, setColor] = useState<string | null>(null)
  const [size, setSize] = useState<string | null>(null)
  return (
    <div className="space-y-12 text-sm text-gray-600">
      <div>
        <h3 className="mb-5 font-semibold uppercase tracking-wide text-black">
          colors
        </h3>
        <ul className="space-y-3">
          {loadingColor
            ? Array.from({ length: 6 }).map((_, i) => (
                <li key={i} className="flex justify-between animate-pulse">
                  <div className="h-4 bg-gray-200 w-20" />
                  <div className="h-4 bg-gray-200 w-8" />
                </li>
              ))
            : colors.map((c) => (
                <li
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  className={`
                cursor-pointer flex justify-between
                hover:text-black
                ${color === c.name ? 'text-black font-medium' : ''}
              `}
                >
                  <span>{c.name}</span>
                  <span>({c.quantity})</span>
                </li>
              ))}
        </ul>
      </div>
      <div>
        <h3 className="mb-5 font-semibold uppercase tracking-wide text-black">
          sizes
        </h3>
        <ul className="space-y-3">
          {loadingSize
            ? Array.from({ length: 6 }).map((_, i) => (
                <li key={i} className="flex justify-between animate-pulse">
                  <div className="h-4 bg-gray-200 w-20" />
                  <div className="h-4 bg-gray-200 w-8" />
                </li>
              ))
            : sizes.map((s) => (
                <li
                  key={s.name}
                  onClick={() => setSize(s.name)}
                  className={`
                cursor-pointer flex justify-between
                hover:text-black
                ${size === s.name ? 'text-black font-medium' : ''}
              `}
                >
                  <span>{s.name}</span>
                  <span>({s.quantity})</span>
                </li>
              ))}
        </ul>
      </div>
    </div>
  )
}
export default SideBarProductFilter
