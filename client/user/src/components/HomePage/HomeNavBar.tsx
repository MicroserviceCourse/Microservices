
import { FiChevronLeft, FiChevronRight, } from "react-icons/fi";
const HomeNavBar = () => {
  return (
    <div
      className="w-full min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/h1-slider1-background-img.jpg')", // Ảnh nằm trong public/assets
      }}
    >


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
