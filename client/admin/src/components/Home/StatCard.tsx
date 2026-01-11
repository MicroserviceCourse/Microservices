import { ArrowDown, ArrowUp } from "lucide-react";

const StatCard = ({ icon, title, value, change, positive }: any) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm flex justify-between">
      <div className="flex gap-4">
        <div className="h-12 w-12  rounded-lg bg-orange-100 text-orange-500 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-800">{value}</p>
        </div>
      </div>
      <div className="text-right text-sm">
        <div className={`flex items-center gap-1 ${positive ? "text-green-500" : "text-red-500"}`}>
          {positive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
          {change}
        </div>
        <span className="text-gray-400">Last Month</span>
      </div>
    </div>
  );
};
export default StatCard;
