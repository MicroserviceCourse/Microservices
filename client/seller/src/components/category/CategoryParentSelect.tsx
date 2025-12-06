import { useState, useRef, useEffect } from "react";
import type { CategoryParentSelectedProps, CategoryResponse } from "../../types";
import { ChevronDown, ChevronRight } from "lucide-react";

const CategoryParentSelect = ({ categories, value = [], onChange }: CategoryParentSelectedProps) => {
    const [expanded, setExpanded] = useState<Record<number, boolean>>({});
    const [open, setOpen] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null);

    /** Close when click outside */
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    /** Build tree */
    const buildTree = () => {
        const flatten = (cat: CategoryResponse, level: number) => {
            const row = {
                id: cat.id,
                name: cat.name,
                level,
                hasChildren: !!cat.children?.length
            };
            const res = [row];

            if (expanded[cat.id] && row.hasChildren) {
                cat.children!.forEach(child => {
                    res.push(...flatten(child, level + 1));
                });
            }
            return res;
        };

        const roots = categories.filter(c => c.parentId == null);
        return roots.flatMap(r => flatten(r, 0));
    };

    const treeOptions = buildTree();

    const toggleSelect = (id: number) => {
        if (value.includes(id)) {
            onChange(value.filter(v => v !== id));
        } else {
            onChange([...value, id]);
        }
    };

    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });

    const openDropdown = () => {
        if (!wrapperRef.current) return;
        const r = wrapperRef.current.getBoundingClientRect();
        setDropdownPos({ top: r.bottom + 6, left: r.left, width: r.width });
        setOpen(true);
    }
    return (
        <div className="relative" ref={wrapperRef}>
            {/* Input view */}
            <div
                onClick={() => (open ? setOpen(false) : openDropdown())}
                className={`
                    px-3 py-2 border rounded-lg cursor-pointer select-none bg-white
                    ${open ? "border-blue-500 ring-2 ring-blue-400" : "border-gray-300 hover:border-gray-400"}
                `}
            >
                {value.length === 0
                    ? "Select categories"
                    : (
                        <div className="flex flex-wrap gap-1">
                            {value.map(id => {
                                const cat = treeOptions.find(o => o.id === id);
                                return (
                                    <span
                                        key={id}
                                        className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-md"
                                    >
                                        {cat?.name}
                                    </span>
                                );
                            })}
                        </div>
                    )}
            </div>

            {/* Dropdown */}
            {open && (
                <div
                    className="
                        fixed z-[9999] bg-white border border-gray-300 rounded-xl shadow-xl
                        max-h-60 overflow-y-auto animate-fadeIn
                    "
                    style={{
                        top: dropdownPos.top,
                        left: dropdownPos.left,
                        width: dropdownPos.width,
                    }}
                >
                    {treeOptions.map(row => (
                        <div
                            key={row.id}
                            className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {/* Indent */}
                            <div style={{ marginLeft: row.level * 20 }} />

                            {/* Expand arrow */}
                            {row.hasChildren ? (
                                <button
                                    className="mr-2 text-gray-500 hover:text-gray-700 transition"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setExpanded(prev => ({ ...prev, [row.id]: !prev[row.id] }));
                                    }}
                                >
                                    {expanded[row.id] ? (
                                        <ChevronDown size={16} />
                                    ) : (
                                        <ChevronRight size={16} />
                                    )}
                                </button>
                            ) : (
                                <div className="mr-2 w-4" />    // giữ layout cho item không có con
                            )}


                            {/* Checkbox */}
                            <input
                                type="checkbox"
                                checked={value.includes(row.id)}
                                onChange={() => toggleSelect(row.id)}
                                className="mr-2"
                            />

                            {/* Label */}
                            <span className={value.includes(row.id) ? "font-semibold text-blue-600" : ""}>
                                {row.name}
                            </span>
                        </div>
                    ))}

                    <div className="p-2 border-t text-right border-slate-200">
                        <button
                            onClick={() => setOpen(false)}
                            className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md"
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryParentSelect;
