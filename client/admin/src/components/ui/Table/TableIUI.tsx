import type { TableProps, Column, SortState } from "../../../types";

export function Table<T>({
  columns,
  data,
  rowKey,
  sort,
  onSortChange,
  loading = false,
}: TableProps<T>) {
  const handleSort = (key: keyof T) => {
    if (!onSortChange) return;

    if (sort?.key === key) {
      onSortChange({
        key,
        order: sort.order === "asc" ? "desc" : "asc",
      });
    } else {
      onSortChange({
        key,
        order: "asc",
      });
    }
  };

  return (
    <div className="rounded-2xl bg-white ring-1 ring-[#E9EEF5]">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-[#EEF2F7] bg-[#fcfcfd]">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                onClick={() => {
                  if (col.sortable && typeof col.key !== "string") {
                    handleSort(col.key);
                  }
                }}
                className={`
      px-4 py-4 text-left text-[13px] font-semibold
      ${
        col.sortable
          ? "cursor-pointer select-none text-[#64748B] hover:text-[#1E293B]"
          : "text-[#94A3B8]"
      }
      ${col.className ?? ""}
    `}
              >
                {col.title}
                {col.sortable && (
                  <span
                    className={`ml-1 text-xs ${
                      sort?.key === col.key ? "text-[#1E293B]" : "text-[#CBD5E1]"
                    }`}
                  >
                    {sort?.key === col.key ? (sort.order === "asc" ? "▲" : "▼") : "▼"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {loading &&
            Array.from({ length: 5 }).map((_, idx) => (
              <tr key={idx} className="border-b border-[#EEF2F7]">
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-4">
                    <div className="h-4 w-full animate-pulse rounded bg-[#F1F5F9]" />
                  </td>
                ))}
              </tr>
            ))}

          {!loading && data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-10 text-center text-sm text-[#94A3B8]"
              >
                No data found
              </td>
            </tr>
          )}

          {!loading &&
            data.map((row) => (
              <tr
                key={rowKey(row)}
                className="border-b border-[#EEF2F7] hover:bg-[#FAFBFF] transition"
              >
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-4 text-sm text-[#475569]">
                    {col.render ? col.render(row) : String((row as any)[col.key])}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
