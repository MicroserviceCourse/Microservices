import { useState } from "react";

const tabs = ["description", "additional information", "reviews (1)"];

const ProductTabs = ({description}:any) => {
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
        {description}
      </div>
    </div>
  );
};

export default ProductTabs;
