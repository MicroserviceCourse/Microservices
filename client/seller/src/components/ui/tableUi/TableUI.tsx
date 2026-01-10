import { ChevronsUpDown, ChevronUp, ChevronDown } from "lucide-react";
import type { TableUIProps } from "../../../types";
import Pagination from "./Pagination";

const TableUI = <T,>({
  columns,
  data,
  loading,
  sortKey,
  sortDir,
  page,
  totalPages,
  onPageChange,
  onSort,
}: TableUIProps<T>) => {
  return (
    <div className="relative">
      <table className="w-full text-left border-separate border-spacing-0">

        {/* HEADER */}
        <thead className="text-sm text-gray-500">
          <tr>
            {columns.map((col, i) => {
              const isSorted = sortKey === col.key;

              return (
                <th
                  key={i}
                  className={`py-3 px-4 font-semibold bg-white ${col.align === "right"
                    ? "text-right"
                    : col.align === "center"
                      ? "text-center"
                      : "text-left"
                    }`}
                >
                  <div
                    className={`flex items-center gap-1 ${col.sortable ? "cursor-pointer select-none" : ""
                      }`}
                    onClick={() => col.sortable && onSort?.(col.key as keyof T)}

                  >
                    <span>{col.label}</span>

                    {/* ICON SORT */}
                    {col.sortable && (
                      <>
                        {!isSorted && (
                          <ChevronsUpDown className="h-4 w-4 text-gray-400" />
                        )}

                        {isSorted && sortDir === "asc" && (
                          <ChevronUp className="h-4 w-4 text-primary" />
                        )}

                        {isSorted && sortDir === "desc" && (
                          <ChevronDown className="h-4 w-4 text-primary" />
                        )}
                      </>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>

          {/* HEADER BORDER */}
          <tr>
            <td colSpan={columns.length} className="border-b border-gray-200"></td>
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="text-gray-900 bg-white">
          {/* LOADING */}
          {loading &&
            Array.from({ length: 5 }).map((_, idx) => (
              <tr key={idx}>
                {columns.map((col, cIdx) => (
                  <td key={cIdx} className="py-4 px-4 border-b border-gray-200">
                    <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                  </td>
                ))}
              </tr>
            ))}

          {/* EMPTY */}
          {!loading && data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="py-6 text-center text-gray-500">
                No data found
              </td>
            </tr>
          )}

          {/* DATA */}
          {!loading &&
            data.map((row, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50 transition"
              >
                {columns.map((col, cIdx) => (
                  <td
                    key={cIdx}
                    className={`py-4 px-4 border-b border-gray-200
    ${col.align === "right" ? "text-right" : ""}
    relative
  `}
                  >
                    {col.render ? col.render(row) : (row as any)[col.key]}
                  </td>

                ))}
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={onPageChange}
      />

    </div>
  );
};

export default TableUI;
