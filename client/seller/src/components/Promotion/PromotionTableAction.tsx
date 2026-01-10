import { useNavigate } from "react-router-dom";
import type { PromotionTableProps } from "../../types/promotion.type";
import { useAlert } from "../alert-context";
import { Pencil } from "lucide-react";
import TableActions from "../ui/TableActions";

const PromotionTableAction = ({ promotion, onUpdated }: PromotionTableProps) => {
  const navigate = useNavigate();
  const actions = [
    {
      label: "Edit",
      icon: <Pencil className="h-4 w-4" />,
      onClick: () => navigate(`/Dashboard/promotion/${promotion.id}`),
    },
  ];
  return <TableActions actions={actions} />;
};
export default PromotionTableAction;
