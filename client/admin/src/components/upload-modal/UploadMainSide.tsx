import React, { useState } from "react";
import MediaLibraryContent from "./MediaLibrarContent";
import UploadContent from "./UploadContent";
import type { UploadMainSideProps } from "./types";

const SelectFileType = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        w-48
        rounded-lg
        border border-gray-300
        px-3 py-2
        text-sm
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
      "
    >
      <option value="all">Tất cả file media</option>
      <option value="image">Ảnh</option>
      <option value="video">Video</option>
      <option value="pdf">PDF</option>
    </select>
  );
};
const SelectTime = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        w-40
        rounded-lg
        border border-gray-300
        px-3 py-2
        text-sm
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
      "
    >
      <option value="all-time">Tất cả các ngày</option>
      <option value="today">Hôm nay</option>
      <option value="7days">7 ngày</option>
      <option value="30days">30 ngày</option>
    </select>
  );
};
const UploadMainSide = ({ onSelectMedia }: UploadMainSideProps) => {
  const [selected, setSelected] = useState<"mediaLibrary" | "upload">("mediaLibrary");
  const [fileType, setFileType] = useState("all");
  const [timeFrame, setTimeFrame] = useState("all-time");

  return (
    <main className="flex flex-1 min-h-0 flex-col bg-white">
      {/* Header tabs */}
      <div className="flex shrink-0 border-b">
        <button
          className={`flex-1 py-4 text-center text-sm font-semibold
            ${
              selected === "mediaLibrary"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          onClick={() => setSelected("mediaLibrary")}
        >
          Thư viện media
        </button>

        <button
          className={`flex-1 py-4 text-center text-sm font-semibold
            ${
              selected === "upload"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          onClick={() => setSelected("upload")}
        >
          Tải lên
        </button>
      </div>

      {/* Filter section */}
      <div className="shrink-0 border-b bg-gray-50 px-6 py-4">
        <div className="flex gap-4">
          <SelectFileType value={fileType} onChange={setFileType} />
          <SelectTime value={timeFrame} onChange={setTimeFrame} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {selected === "mediaLibrary" && (
          <MediaLibraryContent filter={{ fileType, timeFrame }} onSelectMedia={onSelectMedia} />
        )}

        {selected === "upload" && <UploadContent />}
      </div>
    </main>
  );
};

export default UploadMainSide;
