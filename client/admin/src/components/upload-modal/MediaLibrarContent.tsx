import type { MediaItem } from "./types";

type MediaLibraryContentProps = {
  onSelectMedia: (media: MediaItem) => void;
  filter: {
    fileType: string;
    timeFrame: string;
  };
};
const MediaLibraryContent = ({ onSelectMedia, filter }: MediaLibraryContentProps) => {
  // MOCK DATA
  const medias = [
    {
      id: 1,
      type: "image",
      url: "https://images.unsplash.com/photo-1761839258753-85d8eecbbc29?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      size: 34567,
    },
    {
      id: 2,
      type: "image",
      url: "https://images.unsplash.com/photo-1761839258753-85d8eecbbc29?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      size: 45678,
    },
    {
      id: 3,
      type: "video",
      url: "https://images.unsplash.com/photo-1761839258753-85d8eecbbc29?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      size: 56789,
    },
  ];

  const filteredMedias =
    filter.fileType === "all" ? medias : medias.filter((m) => m.type === filter.fileType);

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {filteredMedias.map((media) => (
        <div
          key={media.id}
          className="group relative aspect-square overflow-hidden rounded-lg border bg-gray-100"
          onClick={() => onSelectMedia(media)}
        >
          <img src={media.url} alt="" className="h-full w-full object-cover" />

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
            <span className="text-sm text-white">Chọn</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MediaLibraryContent;
