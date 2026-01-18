import { useState } from "react";

const tabs = ["description", "additional information", "reviews (1)"];

const ProductTabs = () => {
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* TAB HEADER */}
      <div className="flex gap-4 border-b">
        {tabs.map((t, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`
              px-8 py-4 uppercase text-sm
              ${active === i ? "bg-black text-white" : "text-gray-500"}
            `}
          >
            {t}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="mt-10 text-gray-600 leading-7 max-w-4xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut
        ullamcorper leo, eget euismod orci. Cum sociis natoque penatibus
        et magnis dis parturient montes.
      </div>
    </div>
  );
};

export default ProductTabs;
