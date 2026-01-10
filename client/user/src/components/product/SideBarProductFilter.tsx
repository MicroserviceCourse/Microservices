import { useState } from "react";

const COLORS = [
    { name: "Black", count: 37 },
    { name: "Blue", count: 31 },
    { name: "Brown", count: 61 },
    { name: "Green", count: 20 },
    { name: "Grey", count: 61 },
    { name: "Pink", count: 29 },
    { name: "Red", count: 12 },
    { name: "White", count: 57 },
    { name: "Yellow", count: 26 },
];
const SIZES = [
    { name: "Extra Large (XL)", count: 19 },
    { name: "Extra Small (XS)", count: 10 },
    { name: "Large (L)", count: 44 },
    { name: "Medium (M)", count: 45 },
    { name: "One Size", count: 52 },
    { name: "Small (S)", count: 36 },
]
const SideBarProductFilter = () => {
    const [color, setColor] = useState<string | null>(null);
    const [size, setSize] = useState<string | null>(null);
    return (
        <div className="space-y-12 text-sm text-gray-600">
            <div>
                <h3 className="mb-5 font-semibold uppercase tracking-wide text-black">
                    colors
                </h3>
                <ul className="space-y-3">
                    {COLORS.map((c) => (
                        <li
                            key={c.name}
                            onClick={() => setColor(c.name)}
                            className={`
                cursor-pointer flex justify-between
                hover:text-black
                ${color === c.name ? "text-black font-medium" : ""}
              `}
                        >
                            <span>{c.name}</span>
                            <span>({c.count})</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3 className="mb-5 font-semibold uppercase tracking-wide text-black">
                    sizes
                </h3>
                <ul className="space-y-3">
                    {SIZES.map((s) => (
                        <li
                            key={s.name}
                            onClick={() => setSize(s.name)}
                            className={`
                cursor-pointer flex justify-between
                hover:text-black
                ${size === s.name ? "text-black font-medium" : ""}
              `}
                        >
                            <span>{s.name}</span>
                            <span>({s.count})</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default SideBarProductFilter;