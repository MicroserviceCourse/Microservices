import { ChevronLeft, ChevronRight, Eye, Pencil, Trash2, Plus, Search } from "lucide-react";
import type { TableUIProps } from "../../types";
import { useState } from "react";

function TableUI<T>({ title, columns, data, onView, onEdit }: TableUIProps<T>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const filteredData = data.filter((row) =>
    Object.values(row).some((val) =>
      val?.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentPageData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div className="mx-auto bg-white rounded-2xl border border-gray-100 p-6"
      style={{
        boxShadow: "0 4px 24px 2px rgba(20, 25, 38, 0.05)",
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
          <Plus size={16} /> Add new
        </button>
      </div>

      {/* Filter bar */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <label>Show</label>
          <select className="border rounded px-2 py-1" value={rowsPerPage}>
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
          <span>entries</span>
        </div>

        <div className="relative w-full max-w-xs">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search here..."
            className="w-full pl-10 pr-[22px] py-[10px] text-[14px] leading-5 font-inter font-normal
      bg-transparent border border-[#ecf0f4] rounded-xl text-[#111]
      outline-none focus:outline-none focus:ring-0 focus:border-blue-500
      placeholder:text-gray-400 transition"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      {/* Table */}
      <div
        className="overflow-x-auto rounded-xl border border-gray-100"
        style={{
          background: "var(--White, #fff)",
          boxShadow: "0 4px 24px 2px rgba(20, 25, 38, 0.05)",
        }}
      >
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f6f8fbcc] text-gray-600 text-sm uppercase">
              {columns.map((col, i) => (
                <th key={i} className="px-4 py-3 whitespace-nowrap font-semibold">
                  {col.header}
                </th>
              ))}
              {(onView || onEdit) && (
                <th className="px-4 py-3 whitespace-nowrap font-semibold">Action</th>
              )}
            </tr>
          </thead>

          <tbody>
            {currentPageData.map((row, i) => (
              <tr
                key={i}
                className={`transition ${i % 2 === 0 ? "bg-white" : "bg-[#f6f8fbcc]"
                  } hover:bg-gray-50`}
              >
                {columns.map((col, j) => (
                  <td key={j} className="px-4 py-3 text-gray-700 text-sm">
                    {col.render ? col.render(row[col.accessor], row) : (row[col.accessor] as any)}
                  </td>
                ))}

                {(onView || onEdit) && (
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      {onView && (
                        <button
                          onClick={() => onView(row)}
                          className="text-blue-500 hover:text-blue-700 transition"
                        >
                          <Eye size={18} />
                        </button>
                      )}
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="text-green-500 hover:text-green-700 transition"
                        >
                          <Pencil size={18} />
                        </button>
                      )}

                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <span>
          Showing {(page - 1) * rowsPerPage + 1}–
          {Math.min(page * rowsPerPage, filteredData.length)} of {filteredData.length} entries
        </span>

        <div className="flex items-center gap-2">
          <button
            className="p-2 border rounded hover:bg-gray-100 disabled:opacity-40"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${page === i + 1
                  ? "bg-blue-600 text-white shadow"
                  : "hover:bg-gray-100 text-gray-700"
                }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="p-2 border rounded hover:bg-gray-100 disabled:opacity-40"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TableUI;
