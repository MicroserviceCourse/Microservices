import { X } from "lucide-react";
import type { MediaItem, UploadModalProps } from "./types";
import { useState } from "react";
import UploadMainSide from "./UploadMainSide";
import UploadPreviewAside from "./UploadPreviewAside";

const UploadModal = ({ isOpen, onClose }: UploadModalProps) => {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  if (!isOpen) return <></>;
  return (
    <>
      {/* overlay */}
      <div className="fixed w-full flex justify-center items-center inset-0 bg-black/25">
        {/* modal content */}
        <div className="relative w-5/6 min-h-[800px] rounded-lg bg-white p-6 shadow-lg">
          <button
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            <X size={32} className="hover:bg-red-500" />
          </button>
          <div>
            <h2 className="text-2xl font-bold mb-4">Thư viện Media</h2>
          </div>
          <div>
            <div className="flex flex-1 min-h-0">
              {/* left side */}
              <UploadMainSide onSelectMedia={setSelectedMedia}></UploadMainSide>
              {/* right side */}
              <UploadPreviewAside media={selectedMedia}></UploadPreviewAside>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadModal;
