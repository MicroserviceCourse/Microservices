import type { PaginationProps } from "../../types";

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    disabled,
    loading,
    onPageChange,
  }) => {
    const isDisabled = disabled || loading;
  
    const buildPageList = () => {
      const pages: (number | string)[] = [];
  
      if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
        return pages;
      }
  
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
  
      return pages;
    };
  
    const pageList = buildPageList();
  
    return (
      <div className="flex items-center justify-center gap-2 pt-4">
        {/* Prev button */}
        <button
          disabled={currentPage === 1 || isDisabled}
          onClick={() => onPageChange(currentPage - 1)}
          className={`w-8 h-8 flex items-center justify-center font-bold rounded-full border text-sm 
            ${currentPage === 1 || isDisabled
              ? "border-gray-200 text-gray-300 cursor-not-allowed"
              : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
        >
          &lt;
        </button>
  
        {/* Page numbers */}
        {pageList.map((p, idx) =>
          typeof p === "number" ? (
            <button
              key={idx}
              disabled={isDisabled}
              onClick={() => onPageChange(p)}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition font-medium
                ${p === currentPage ? "bg-blue-600 text-white shadow" : "text-gray-700 hover:bg-gray-100"}
              `}
            >
              {p}
            </button>
          ) : (
            <span key={idx} className="text-gray-400 px-1 text-xs">…</span>
          )
        )}
  
        {/* Next button */}
        <button
          disabled={currentPage === totalPages || isDisabled}
          onClick={() => onPageChange(currentPage + 1)}
          className={`w-8 h-8 flex items-center justify-center font-bold rounded-full border text-sm 
            ${currentPage === totalPages || isDisabled
              ? "border-gray-200 text-gray-300 cursor-not-allowed"
              : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
        >
          &gt;
        </button>
      </div>
    );
  };
  
  export default Pagination;