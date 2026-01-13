import type { TableProps } from "../../types";

export function Table<T>({ columns, data, rowKey }: TableProps<T>) {
  return (
    <div className="rounded-2xl bg-white ring-1 ring-[#E9EEF5]">
      <table className="w-full border-collapse">
        {/* HEADER */}
        <thead>
          <tr className="border-b border-[#EEF2F7] bg-[#fcfcfd]">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-4 text-left text-[13px] font-semibold text-[#64748B] ${col.className ?? ""}`}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {data.map((row) => (
            <tr
              key={rowKey(row)}
              className="border-b border-[#EEF2F7] hover:bg-[#FAFBFF] transition"
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-4 text-sm text-[#475569]">
                  {col.render ? col.render(row) : (row as any)[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
