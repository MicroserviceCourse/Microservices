import type { StatusBadgeProps } from "../../types"
import BaseBadge from "./BaseBadge";

const STATUS_MAP = {
    0:{label:"Hidden",className:" "},
    1:{label:"Active",className:"bg-green-100 text-green-700"},
    2:{label:"Deleted",className:"bg-red-100 text-red-700"},

}

const StatusBadge = ({value}:StatusBadgeProps)=>{
    const config = STATUS_MAP[value as keyof typeof STATUS_MAP] ?? {
        label: "Unknown",
        className: "bg-gray-100 text-gray-600",
      };
      return <BaseBadge label={config.label} className={config.className} />;

}
export default StatusBadge;