import type { SkillBarProps } from "../../types/about.type";

const SkillBar = ({label,value}:SkillBarProps)=>{
    return(
        <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-500">
                <span>{label}</span>
                <span>{value}%</span>
            </div>
            <div className="w-full h-[6px] bg-gray-200">
                <div
          className="h-full bg-black transition-all duration-700"
          style={{ width: `${value}%` }}
        />
            </div>
        </div>
    )
}
export default SkillBar;