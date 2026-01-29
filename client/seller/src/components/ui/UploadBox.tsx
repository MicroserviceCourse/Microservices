import { FileText, Upload } from "lucide-react";

const UploadBox = ({ label, hint, previewName, height = "h-[140px]", onOpenLibrary }: any) => {
  const isImage = (value?: string) => {
    if (!value) return false;
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(value);
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-gray-700">{label}</p>

      <div
        onClick={onOpenLibrary}
        className={`cursor-pointer rounded-xl border border-dashed border-gray-200 bg-gray-50 
        flex items-center justify-center text-center overflow-hidden ${height}`}
      >
        {!previewName ? (
          <div className="flex flex-col items-center">
            <Upload className="h-6 w-6 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">Chọn file từ thư viện</p>
            {hint && <p className="text-xs text-gray-400">{hint}</p>}
          </div>
        ) : isImage(previewName) ? (
          // ✅ PREVIEW IMAGE
          <img src={previewName} alt="preview" className="w-full h-full object-cover rounded-xl" />
        ) : (
          // ✅ PREVIEW FILE
          <div className="flex items-center gap-2 text-sm text-gray-700 px-4">
            <FileText className="h-5 w-5 shrink-0" />
            <span className="truncate max-w-[200px]" title={previewName}>
              {previewName}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadBox;
