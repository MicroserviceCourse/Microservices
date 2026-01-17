import { useState } from 'react'
import Breadcrumb from '../components/breadcrumb/Breadcrumb'
import ProductGrid from '../components/product/ProductGrid'
import SideBarProductFilter from '../components/product/SideBarProductFilter'
import PaginationPage from '../components/PaginationPage'

const HEADER_HEIGHT = 'pt-20' // ~112px

const ProductPage = () => {
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  return (
    <>
      {/* BREADCRUMB SECTION */}
      <section
        className={`w-full bg-[#f6f6f6] border-b border-gray-100 ${HEADER_HEIGHT}`}
      >
        <div className="max-w-7xl mx-auto px-10 py-12">
          <Breadcrumb
            items={[{ label: 'Home', href: '/' }, { label: 'Product' }]}
          />
        </div>
      </section>

      {/* MAIN CONTENT (sau này) */}
      <section className="max-w-7xl mx-auto px-10 py-16 grid grid-cols-4 gap-12">
        {/* SIDEBAR */}
        <aside className="col-span-1 space-y-10">
          <SideBarProductFilter />
        </aside>

        {/* PRODUCTS */}
        <div className="col-span-3">
          <div className="flex justify-between mb-10 text-sm text-gray-500">
            <span>Showing 1–9 of 125 results</span>
            <select className="border px-4 py-2">
              <option>Default sorting</option>
            </select>
          </div>

          <ProductGrid page={page} size={10} onTotalChange={setTotal} />
          <PaginationPage
            page={page}
            total={total}
            size={10}
            onChange={setPage}
          />
        </div>
      </section>
    </>
  )
}

export default ProductPage
