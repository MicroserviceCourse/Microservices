import React from "react";
import { FiChevronLeft, FiChevronRight, FiSearch, FiShoppingBag } from "react-icons/fi";
import { BsGrid3X3Gap } from "react-icons/bs";
import { Link } from "react-router-dom";

const HomeNavBar = () => {
  return (
    <div
      className="w-full min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/h1-slider1-background-img.jpg')", // Ảnh nằm trong public/assets
      }}
    >
      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full flex items-center justify-between px-10 py-6 z-20">
        <h1 className="text-2xl font-bold">bazaar</h1>
        <ul className="flex gap-6 text-lg font-medium">
          <li>Home</li>
          <li>Pages</li>
          <li>Shop</li>
          <li>
              <Link to="/blog">Blog</Link>
          </li>
          <li>Lookbook</li>
          <li>Elements</li>
        </ul>
        <div className="flex items-center gap-5 text-xl">
          <span className="relative">
            <FiShoppingBag />
            <span className="absolute -top-2 -right-2 text-sm">0</span>
          </span>
          <FiSearch />
          <BsGrid3X3Gap />
        </div>
      </div>

      {/* Center Text */}
      <div className="w-full h-full flex flex-col items-center justify-center text-black z-10 relative pt-80">
  <h2 className="text-6xl font-bold mb-4">a summer breeze</h2>
  <div className="w-20 h-px bg-black mb-6"></div>
  <button className="bg-black text-white px-6 py-3 text-sm font-semibold tracking-wide uppercase">
    subscribe →
  </button>
</div>


      {/* Slide Numbers */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl cursor-pointer hover:scale-110 transition-transform">
        <FiChevronLeft />
      </div>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 text-3xl cursor-pointer hover:scale-110 transition-transform">
        <FiChevronRight />
      </div>
    </div>
  );
};

export default HomeNavBar;
