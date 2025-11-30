import { useState, useRef, useEffect } from "react";
import type { CategoryParentSelectedProps, CategoryResponse } from "../../types";

const CategoryParentSelect = ({ categories, value, onChange }: CategoryParentSelectedProps) => {
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

    const selectedLabel =
        value ? treeOptions.find(o => o.id === value)?.name : "Select parent";
    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });

    const openDropdown = () => {
        if (!wrapperRef.current) return;   // <-- FIX

        const r = wrapperRef.current.getBoundingClientRect();
        setDropdownPos({ top: r.bottom + 6, left: r.left, width: r.width });
        setOpen(true);
    };

    return (
        <div className="relative" ref={wrapperRef}>
            {/* Input view */}
            <div
             onClick={() => open ? setOpen(false) : openDropdown()}
                className={`px-3 py-2 border rounded-lg cursor-pointer bg-white select-none transition
                    ${open ? "border-blue-500 ring-2 ring-blue-400" : "border-gray-300 hover:border-gray-400"}`}
            >
                {selectedLabel || "Select parent"}
            </div>

            {/* Dropdown absolute – does NOT affect layout */}
            {open && (
                <div
                    className="
                fixed z-[9999]
                bg-white border border-gray-300 rounded-xl shadow-xl
                max-h-60 overflow-y-auto
                animate-fadeIn
            "
                    style={{
                        top: dropdownPos.top,
                        left: dropdownPos.left,
                        width: dropdownPos.width,
                    }}
                >
                    {/* Root choice */}
                    <div
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                            onChange("");
                            setOpen(false);
                        }}
                    >
                        None (Root Category)
                    </div>

                    {treeOptions.map(row => (
                        <div
                            key={row.id}
                            className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => {
                                onChange(row.id);
                                setOpen(false);
                            }}
                        >
                            {/* Indent */}
                            <div style={{ marginLeft: row.level * 20 }} />

                            {/* Expand arrow */}
                            {row.hasChildren ? (
                                <button
                                    className="mr-2 text-gray-400"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setExpanded(prev => ({
                                            ...prev,
                                            [row.id]: !prev[row.id],
                                        }));
                                    }}
                                >
                                    {expanded[row.id] ? "▼" : "▶"}
                                </button>
                            ) : (
                                <div className="mr-2 w-4" />
                            )}

                            <span className={value === row.id ? "font-semibold text-blue-600" : ""}>
                                {row.name}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryParentSelect;
