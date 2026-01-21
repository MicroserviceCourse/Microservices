import { useMemo, useRef, useState } from "react";

const FileDropZone = ({
  title,
  subTitle,
  hint,
  icon,
  accept = "image/png,image/jpeg,image/webp",
  onFile,
  previewUrl,
  heightClass = "h-[140px]",
}: any) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const borderClass = useMemo(() => {
    if (isDragOver) return "border-blue-400 ring-2 ring-blue-100 ";
    return "border-gray-200 ";
  }, [isDragOver]);

  const handlePick = () => inputRef.current?.click();

  const handleFiles = (files: any) => {
    const f = files?.[0];
    if (!f) return;
    onFile?.(f);
  };
  return (
    <div
      className={[
        "relative w-full rounded-xl border border-dashed p-9 bg-gray-50/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all ",
        borderClass,
        heightClass,
        "flex items-center justify-center ",
        "transition",
      ].join("")}
      onDragEnter={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
        handleFiles(e.dataTransfer.files);
      }}
    >
      {previewUrl ? (
        <div
          className="absolute inset-2 overflow-hidden rounded-lg bg-white border border-gray-200
                "
        >
          <img src={previewUrl} alt="preview" className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={handlePick}
            className="absolute bottom-2 right-2 inline-flex items-center gap-2 rounded-lg
                    bg-white/90 px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm border
                    border-gray-200 hover:bg-white"
          >
            {icon}
            Change
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={handlePick}
          className="group w-full h-full rounded-xl flex flex-col items-center
                justify-center text-center"
        >
          <div
            className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white 
                    text-blue-600 border border-blue-100"
          >
            {icon}
          </div>
          <div className="text-sm font-medium text-slate-700 dark:text-slate-200">{title}</div>
          {subTitle && <div className="mt-1 text-xs text-slate-700 dark:text-slate-200">{subTitle}</div>}
          {hint && <div className="mt-1 text-[11px] text-gray-500">{hint}</div>}
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
};
export default FileDropZone;