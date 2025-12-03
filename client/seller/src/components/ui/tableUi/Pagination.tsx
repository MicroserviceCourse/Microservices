import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginationProps } from "../../../types";

const Pagination = ({ page, totalPages, onChange }: PaginationProps) => {
    if (totalPages <= 1) return null;

    const buildPages = () => {
        const set = new Set<number>();
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || Math.abs(i - page) <= 1) {
                set.add(i);
            }
        }

        return [...set].sort((a, b) => a - b);
    }
    const pages = buildPages();

    return (
        <div className="flex items-center justify-end mt-4 select-none">
            <button
                disabled={page == 1}
                onClick={() => onChange(page - 1)}
                className="
            h-8 w-8 flex items-center justify-center rounded-lg 
            hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed
            "
            >
                <ChevronLeft className="h-4 w-4" />
            </button>

            {pages.map((p, i) => {
                const next = pages[i + 1];
                const showDots = next && next - p > 1;
                return (
                    <div key={p} className="flex items-center gap-2">
                        <button
                            onClick={() => onChange(p)}
                            className={`
                          h-8 px-3 rounded-lg text-sm
                          ${p === page
                                    ? "bg-blue-600 text-white"
                                    : "hover:bg-gray-100 text-gray-700"}
                        `}
                        >
                            {p}
                        </button>

                        {showDots && <span className="text-gray-400">...</span>}
                    </div>
                );
            })}
            <button
                disabled={page === totalPages}
                onClick={() => onChange(page + 1)}
                className="
          h-8 w-8 flex items-center justify-center rounded-lg 
          hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed
        "
            >
                <ChevronRight className="h-4 w-4" />
            </button>

        </div>
    )
}
export default Pagination;