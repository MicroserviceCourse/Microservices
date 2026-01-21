import { FileText, Upload } from "lucide-react";
import { useRef } from "react";

const UploadBox = ({ label, accept, hint, onFile, previewName, height = "h-[140px]" }: any) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-gray-700">{label}</p>
      <div
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer rounded-xl border border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center text-center ${height}`}
      >
        {!previewName ? (
          <>
            <Upload className="h-6 w-6 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-400">{hint}</p>
          </>
        ) : (
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <FileText className="h-5 w-5" />
            {previewName}
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onFile(file);
          }}
        />
      </div>
    </div>
  );
};
export default UploadBox;