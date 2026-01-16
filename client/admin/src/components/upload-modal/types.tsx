export type UploadModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

export type MediaItem = {
  id: number;
  url: string;
  type: string;
  name?: string;
  size: number;
};

export type UploadMainSideProps = {
  onSelectMedia: (media: MediaItem | null) => void;
};
