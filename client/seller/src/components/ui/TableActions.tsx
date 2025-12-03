import { useEffect, useRef, useState } from "react";
import type { TableActionProps } from "../../types";
import { MoreVertical } from "lucide-react";

const TableActions = ({ actions }: TableActionProps) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-600"
            >
                <MoreVertical className="h-5 w-5 text-gray-600" />
            </button>
            {open && (
                <div
                    className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-800
                border border-gray-200 dark:border-slate-700 
                                rounded-lg shadow-md py-2 z-50"
                >
                      {actions.filter(a => !a.hidden).map((action, idx) => (
                            <button
                            key={idx}
                            onClick={() => {
                                action.onClick?.();
                                setOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left text-sm 
                                       flex items-center gap-2
                                       hover:bg-gray-100 dark:hover:bg-slate-700"
                        >
                            {/* ICON */}
                            {action.icon && <span className="text-gray-600">{action.icon}</span>}

                            {/* LABEL */}
                            {action.label}
                        </button>
                        ))
                    }
                </div>
            )}
        </div>
    )
}
export default TableActions;