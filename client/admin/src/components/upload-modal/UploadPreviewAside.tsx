import { formatFileSize } from "../../util/file";
import InfoRow from "./InfoRow";
import type { MediaItem } from "./types";
type UploadPreviewAsideProps = {
  media: MediaItem | null;
};
const UploadPreviewAside = ({ media }: UploadPreviewAsideProps) => {
  return (
    <>
      <aside className="w-xl shrink-0 border-r bg-gray-50 p-4">
        <h3 className="mb-4 text-lg font-semibold text-gray-700">File preview</h3>
        {/* preview image */}
        <div className="mb-4 aspect-square overflow-hidden rounded-lg border bg-white">
          {media ? (
            <img src={media.url} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-gray-400">
              No image selected
            </div>
          )}
        </div>
        {/* preview file info */}
        <div className="space-y-2 text-sm text-gray-600">
          <InfoRow label="Name" value={media?.name || "-"} />
          <InfoRow label="Size" value={media ? formatFileSize(media.size) : "-"} />
          <InfoRow label="Type" value={media?.type || "-"} />
        </div>

        {/* Action */}
        {media && (
          <button className="mt-4 w-full rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600 hover:bg-red-100">
            Remove file
          </button>
        )}
      </aside>
    </>
  );
};

export default UploadPreviewAside;
