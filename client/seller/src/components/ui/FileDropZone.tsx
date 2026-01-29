import { useMemo, useRef, useState } from "react";

const FileDropZone = ({
  title,
  subTitle,
  hint,
  icon,
  previewUrl,
  onPick,
  aspectClass = "",
  heightClass = "min-h-[180px]",
}: any) => {
  const [isHover, setIsHover] = useState(false);

  const borderClass = useMemo(() => {
    return isHover ? "border-blue-400 ring-2 ring-blue-100" : "border-gray-200";
  }, [isHover]);
  return (
    <div
      className={[
        "relative w-full rounded-xl border border-dashed p-6 bg-gray-50/60 hover:bg-slate-100 transition-all",
        borderClass,
        heightClass,
        aspectClass,
        "flex items-center justify-center cursor-pointer",
      ].join(" ")}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={onPick}
    >
      {previewUrl ? (
        <div className="absolute inset-2 overflow-hidden rounded-lg bg-white border border-gray-200">
          <img src={previewUrl} alt="preview" className="h-full w-full object-cover" />

          <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition flex items-end justify-end p-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg
                bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm border
                border-gray-200 hover:bg-gray-50"
            >
              {icon}
              Change
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center">
          <div
            className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white
              text-blue-600 border border-blue-100"
          >
            {icon}
          </div>

          <div className="text-sm font-medium text-slate-700">{title}</div>

          {subTitle && <div className="mt-1 text-xs text-slate-600">{subTitle}</div>}

          {hint && <div className="mt-1 text-[11px] text-gray-500">{hint}</div>}
        </div>
      )}
    </div>
  );
};
export default FileDropZone;
