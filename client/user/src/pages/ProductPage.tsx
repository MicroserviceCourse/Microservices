import { Link } from "react-router-dom";
import { FiSearch, FiShoppingBag } from "react-icons/fi";
import { BsGrid3X3Gap } from "react-icons/bs";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import ProductGrid from "../components/product/ProductGrid";
import SideBarProductFilter from "../components/product/SideBarProductFilter";

const HEADER_HEIGHT = "pt-20"; // ~112px

const ProductPage = () => {
  return (
    <>
      {/* HEADER */}
      <header className="absolute top-0 left-0 w-full z-20 bg-white">
        <div className="flex items-center justify-between px-10 py-6 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">bazaar</h1>

          <ul className="flex gap-6 text-lg font-medium">
            <li><Link to="/">Home</Link></li>
            <li>Pages</li>
            <li>Shop</li>
            <li><Link to="/blog">Blog</Link></li>
            <li>Lookbook</li>
            <li>Elements</li>
          </ul>

          <div className="flex items-center gap-5 text-xl">
            <FiShoppingBag />
            <FiSearch />
            <BsGrid3X3Gap />
          </div>
        </div>
      </header>

      {/* BREADCRUMB SECTION */}
      <section className={`w-full bg-[#f6f6f6] border-b border-gray-100 ${HEADER_HEIGHT}`}>
        <div className="max-w-7xl mx-auto px-10 py-12">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Product" },
            ]}
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

          <ProductGrid />
          <div className="flex justify-end mt-16 gap-4 text-sm text-gray-500">
            <button className="font-medium text-black">1</button>
            <button>2</button>
            <button>3</button>
            <span>...</span>
            <button>14</button>
            <button>{">"}</button>
          </div>

        </div>
      </section>
    </>
  );
};

export default ProductPage;
