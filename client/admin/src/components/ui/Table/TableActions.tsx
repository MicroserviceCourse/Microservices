import { Pause, Pencil, Power } from "lucide-react";
import type { TableActionsProps } from "../../../types/TableActions";

const TableActions = ({ onEdit, onToggle, onActive, onPause }: TableActionsProps) => {
  return (
    <div className="flex items-center gap-2">
      {onActive && (
        <button
          onClick={onActive}
          className="h-9 w-9 rounded-lg
            bg-[#ECFDF3] text-[#16A34A]
            hover:bg-[#D1FAE5] transition"
          title="Activate"
        >
          <Power className="mx-auto h-4 w-4" />
        </button>
      )}
      {onPause && (
        <button
          onClick={onPause}
          className="h-9 w-9 rounded-lg
            bg-[#FEF3C7] text-[#D97706]
            hover:bg-[#FDE68A] transition"
          title="Pause"
        >
          <Pause className="mx-auto h-4 w-4" />
        </button>
      )}
      {onToggle && (
        <button
          onClick={onToggle}
          className="h-9 w-9 rounded-lg
              bg-[#F1f5F9] text-[#0F172A]
              hover:bg-[#E8EEF5] transition
              "
          title="Change status"
        >
          <Power className="mx-auto h-4 w-4" />
        </button>
      )}

      {onEdit && (
        <button
          onClick={onEdit}
          className="h-9 w-9 rounded-lg bg-[#F1F5F9]
                text-[#475569]
                hover:bg-[#E8EEF5]
                transition"
          title="Edit"
        >
          <Pencil className="mx-auto h-4 w-4" />
        </button>
      )}
    </div>
  );
};
export default TableActions;
