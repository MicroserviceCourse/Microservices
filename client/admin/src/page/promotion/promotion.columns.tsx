import TableActions from "../../components/ui/Table/TableActions";
import type { Column } from "../../types";
import { PROMOTION_STATUS_MAP, type Promotion, type PromotionColumnProps } from "../../types/promotion/promotion";


export const getPromotionColumns = ({
  onEdit,
  onActive,
  onPause,
}: PromotionColumnProps): Column<Promotion>[] => [
  {
    key: "code",
    title: "id",
    sortable: true,
  },
  {
    key: "name",
    title: "Name",
    sortable: true,
  },
  {
    key: "type",
    title: "Type",
    sortable: true,
    render: (row) => {
      if (row.type === 1) return "Percent";
      if (row.type === 2) return "Fixed";
    },
  },
  {
    key: "value",
    title: "Value",
    sortable: true,
    render: (row) => {
      if (row.type === 1) return `${row.value?.toLocaleString()} ₫`;
      if (row.type === 2) return `${row.value}%`;
    },
  },
  {
    key: "priority",
    title: "Priority",
    sortable: true,
  },
  {
    key: "startAt",
    title: "Duration",
    render: (row) => (
      <div className="text-xs">
        {row.startAt} → {row.endAt}
      </div>
    ),
  },
  {
    key: "status",
    title: "Status",
   render: (row) => {
  const status = PROMOTION_STATUS_MAP[row.status];

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${status.className}`}
    >
      {status.label}
    </span>
  );
},
  },
  {
    key: "action",
    title: "Actions",
    render: (row) => (
      <TableActions
        onEdit={() => onEdit(row)}
        onActive={row.status !== 2 ? () => onActive(row.id) : undefined}
        onPause={row.status === 2 ? () => onPause(row.id) : undefined}
      />
    ),
  },
];
