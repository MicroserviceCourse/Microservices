import { motion } from "framer-motion";
import {
  type PaginationProps,
  type SortState,
  type TableFilterConfig,
  type TableSearchConfig,
  type TableUIProps,
} from "../../types";
import { useState, useMemo, type ReactNode } from "react";
function TableUI<T>({
  columns,
  data,
  renderActions,
  searchConfig,
  filterConfig,
  loading,
  loadingText,
  pagination,
  headerRight,
  sortState,          
  onSortChange,       
}: TableUIProps<T> & {
  renderActions?: (row: T) => ReactNode;
  searchConfig?: TableSearchConfig<T>;
  filterConfig?: TableFilterConfig<T>;
  loading?: boolean;
  loadingText?: string;
  pagination?: PaginationProps;
  headerRight?: ReactNode;
  sortState?: SortState | null;
  onSortChange?: (state: SortState | null) => void;
}) {
  const [internalSearch, setInternalSearch] = useState("");
  const [internalFilter, setInternalFilter] = useState(
    filterConfig?.defaultValue ?? (filterConfig?.options?.[0]?.value as any)
  );

  const searchTerm =
    searchConfig?.value !== undefined ? searchConfig.value : internalSearch;

  const selectedFilterValue =
    filterConfig?.value !== undefined ? filterConfig.value : internalFilter;

  const handleSearchChange = (value: string) => {
    if (searchConfig?.onChange) {
      searchConfig.onChange(value);
    } else {
      setInternalSearch(value);
    }
  };

  const handleFilterChange = (value: any) => {
    if (filterConfig?.onChange) {
      filterConfig.onChange(value);
    } else {
      setInternalFilter(value);
    }
  };

  const handleSortClick = (colAccessor: string, sortable?: boolean) => {
    if (!sortable || !onSortChange) return;

    const current = sortState;

    // Tính trạng thái sort tiếp theo
    if (!current || current.accessor !== colAccessor) {
      // cột mới → asc
      onSortChange({ accessor: colAccessor, direction: "asc" });
    } else if (current.direction === "asc") {
      // asc → desc
      onSortChange({ accessor: colAccessor, direction: "desc" });
    } else {
      // desc → asc (hoặc bạn thích thì có thể cho null để bỏ sort)
      onSortChange({ accessor: colAccessor, direction: "asc" });
      // hoặc: onSortChange(null);
    }
  };

  // ========== 1. SEARCH + FILTER (client hoặc server, data đã được parent xử lý) ==========
  const filteredData = useMemo(() => {
    let result = data;

    // SEARCH client-side (nếu muốn search server-side, có thể tắt đoạn này)
    if (searchConfig?.enabled && searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();

      if (typeof searchConfig.filterFn === "function") {
        const fn = searchConfig.filterFn;
        result = result.filter((row) => fn(row, term));
      } else {
        const keys =
          searchConfig.searchKeys && searchConfig.searchKeys.length > 0
            ? searchConfig.searchKeys
            : columns
              .map((c) => c.accessor)
              .filter((a): a is string => typeof a === "string");

        result = result.filter((row) =>
          keys.some((key) => {
            const value = (row as any)[key];
            if (value === undefined || value === null) return false;
            return String(value).toLowerCase().includes(term);
          })
        );
      }
    }

    // FILTER client-side (nếu đang filter server-side thì có thể bỏ)
    if (
      filterConfig?.enabled &&
      typeof filterConfig.predicate === "function"
    ) {
      const predicate = filterConfig.predicate;
      result = result.filter((row) => predicate(row, selectedFilterValue));
    }

    return result;
  }, [
    data,
    columns,
    searchConfig,
    filterConfig,
    searchTerm,
    selectedFilterValue,
  ]);

  const showPagination =
    pagination && pagination.totalPages && pagination.totalPages > 1;

  const buildPageList = () => {
    if (!pagination) return [];
    const { currentPage, totalPages } = pagination;
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    const addRange = (start: number, end: number) => {
      for (let i = start; i <= end; i++) pages.push(i);
    };

    if (currentPage <= 4) {
      addRange(1, 5);
      pages.push("...");
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(1);
      pages.push("...");
      addRange(totalPages - 4, totalPages);
    } else {
      pages.push(1);
      pages.push("...");
      addRange(currentPage - 1, currentPage + 1);
      pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pageList = buildPageList();

  const isPageDisabled = (targetPage: number) =>
    loading || pagination?.disabled || targetPage === pagination?.currentPage;

  return (
    <div className="relative w-full overflow-x-auto">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 space-y-3">
        {/* 🔍 Search + Filter Row + Add button */}
        {(searchConfig?.enabled || filterConfig?.enabled || headerRight) && (
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            {/* Left: search + filter */}
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4 flex-1">
              {searchConfig?.enabled && (
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder={searchConfig.placeholder || "Search..."}
                  className="w-full md:max-w-xs px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              )}

              {filterConfig?.enabled && (
                <div className="flex items-center gap-2">
                  {filterConfig.label && (
                    <span className="text-sm text-gray-600">
                      {filterConfig.label}:
                    </span>
                  )}
                  <div className="inline-flex rounded-full border border-gray-200 bg-gray-50 p-1">
                    {filterConfig.options.map((opt) => (
                      <button
                        key={String(opt.value)}
                        onClick={() => handleFilterChange(opt.value)}
                        className={`px-3 py-1 text-xs font-medium rounded-full transition ${opt.value === selectedFilterValue
                            ? "bg-blue-500 text-white shadow-sm"
                            : "bg-transparent text-gray-600 hover:bg-white"
                          }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: custom header content (Add button, v.v.) */}
            {headerRight && (
              <div className="flex justify-end">{headerRight}</div>
            )}
          </div>
        )}

        {/* Table */}
        <table className="w-full text-sm text-gray-700 border-separate border-spacing-y-2">
          <thead className="bg-[#f9fafc] text-gray-600 uppercase text-xs tracking-wide rounded-lg">
            <tr>
              {columns.map((col, i) => {
                const accessorKey = String(col.accessor);
                const isSorted =
                  sortState && sortState.accessor === accessorKey;
                const direction = isSorted ? sortState!.direction : null;

                return (
                  <th
                    key={i}
                    onClick={() =>
                      handleSortClick(accessorKey, (col as any).sortable)
                    }
                    className={`px-6 py-3 text-left font-semibold whitespace-nowrap select-none ${(col as any).sortable
                        ? "cursor-pointer hover:bg-gray-100 rounded-lg"
                        : ""
                      }`}
                  >
                    <span className="inline-flex items-center gap-1">
                      {col.header}
                      {(col as any).sortable && (
                        <span className="text-[10px] text-gray-400">
                          {direction === "asc"
                            ? "▲"
                            : direction === "desc"
                              ? "▼"
                              : "▲▼"}
                        </span>
                      )}
                    </span>
                  </th>
                );
              })}
              {renderActions && (
                <th className="px-6 py-3 text-left font-semibold whitespace-nowrap">
                  Action
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length + (renderActions ? 1 : 0)}
                  className="text-center py-10 text-blue-500"
                >
                  {loadingText || "Loading..."}
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (renderActions ? 1 : 0)}
                  className="text-center py-10 text-gray-400"
                >
                  No data available
                </td>
              </tr>
            ) : (
              filteredData.map((row, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className="bg-white shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 rounded-xl"
                >
                  {columns.map((col, j) => (
                    <td
                      key={j}
                      className="px-6 py-4 align-middle whitespace-nowrap first:rounded-l-xl last:rounded-r-xl"
                    >
                      {col.render
                        ? col.render((row as any)[col.accessor], row)
                        : (row as any)[col.accessor]}
                    </td>
                  ))}

                  {renderActions && (
                    <td className="px-6 py-4 whitespace-nowrap first:rounded-l-xl last:rounded-r-xl">
                      {renderActions(row)}
                    </td>
                  )}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>

        {/* 🔢 Pagination */}
        {showPagination && (
          <div className="flex items-center justify-end pt-3">
            <div className="flex items-center gap-2">
              {/* Prev */}
              <button
                disabled={
                  pagination!.currentPage <= 1 ||
                  loading ||
                  pagination!.disabled
                }
                onClick={() =>
                  pagination!.onPageChange(pagination!.currentPage - 1)
                }
                className={`w-8 h-8 flex items-center justify-center font-bold rounded-full border text-sm ${pagination!.currentPage <= 1 ||
                    loading ||
                    pagination!.disabled
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
                    disabled={isPageDisabled(p)}
                    onClick={() => pagination!.onPageChange(p)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition ${p === pagination!.currentPage
                        ? "bg-[#2275fc] text-white shadow"
                        : "text-gray-800 hover:bg-gray-100"
                      } ${isPageDisabled(p) ? "cursor-not-allowed opacity-70" : ""
                      }`}
                  >
                    {p}
                  </button>
                ) : (
                  <span
                    key={idx}
                    className="px-1 text-xs text-gray-400 select-none"
                  >
                    {p}
                  </span>
                )
              )}

              {/* Next */}
              <button
                disabled={
                  pagination!.currentPage >= pagination!.totalPages ||
                  loading ||
                  pagination!.disabled
                }
                onClick={() =>
                  pagination!.onPageChange(pagination!.currentPage + 1)
                }
                className={`w-8 h-8 flex items-center justify-center font-bold rounded-full border text-sm ${pagination!.currentPage >= pagination!.totalPages ||
                    loading ||
                    pagination!.disabled
                    ? "border-gray-200 text-gray-300 cursor-not-allowed"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
              >
                &gt;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TableUI;
