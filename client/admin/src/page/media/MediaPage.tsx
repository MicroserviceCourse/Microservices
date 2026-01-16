import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import UploadModal from "../../components/upload-modal/UploadModal";

function MediaPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <h1 className="text-3xl font-bold">Media Library</h1>
          <p className="mt-2 text-slate-600">
            Manage your media files here. Upload, organize, and edit images, videos, and documents
            used across your platform.
          </p>
        </div>
        <div
          className="flex flex-col justify-center items-center bg-white p-6 rounded-xl border-2 border-dashed border-gray-400 p-4 hover:border-blue-300 hover:text-blue-300"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <FaCloudUploadAlt size={32} />
          <h2 className="text-2xl font-semibold mb-4">Drag and Drop Files Here</h2>
        </div>
        <UploadModal isOpen={open} onClose={() => setOpen(false)}></UploadModal>
      </div>
    </>
  );
}

export default MediaPage;
