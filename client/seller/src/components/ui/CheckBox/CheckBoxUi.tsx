import { Check } from "lucide-react";
import type { CheckBoxProps } from "../../../types";



const CheckBoxUi = ({ checked }: CheckBoxProps) => {
  return (
    <div
    className={`
      h-5 w-5 rounded-md flex items-center justify-center
      shadow-sm border
      ${checked ? "bg-white border-white" : "bg-white border-gray-300"}
    `}
  >
    {checked && (
      <Check
        className="h-3.5 w-3.5 text-blue-500"
        strokeWidth={3}
      />
    )}
  </div>
  );
};

export default CheckBoxUi;
