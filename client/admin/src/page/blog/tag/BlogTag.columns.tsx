import TableActions from "../../../components/ui/Table/TableActions";
import type { Column } from "../../../types";
import type { BlogTag, TagColumnProps } from "../../../types/blog/tag/tag.type";

export const getBlogTagColumns = ({
  onToggleStatus,
  onEdit,
}: TagColumnProps): Column<BlogTag>[] => [
  {
    key: "code",
    title: "ID",
    sortable: true,
  },
  {
    key: "name",
    title: "Name",
    sortable: true,
  },
  {
    key: "createdAt",
    title: "Created At",
    sortable: true,
  },
  {
    key: "updatedAt",
    title: "Updated At",
    sortable: true,
  },
  {
    key: "isStatus",
    title: "Status",
     render: (row) => (
      <span
        className={`rounded-lg px-3 py-1.5 text-xs font-medium
          ${row.isStatus ? "bg-[#ECFDF3] text-[#16A34A]" : "bg-[#FEF2F2] text-[#DC2626]"}
        `}
      >
        {row.isStatus ? "Active" : "Inactive"}
      </span>
    ),
  },
  {
    key: "action",
    title: "Action",
    render: (row) => (
      <TableActions
        onToggle={() => onToggleStatus(row.id, !row.isStatus)}
        onEdit={() => onEdit(row)}
      />
    ),
  },
];
