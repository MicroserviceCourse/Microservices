const UploadContent = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <label className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-gray-500 hover:border-blue-500 hover:text-blue-500">
        <span className="text-sm font-medium">Kéo & thả file vào đây</span>
        <span className="mt-1 text-xs">hoặc click để chọn file</span>

        <input type="file" className="hidden" />
      </label>
    </div>
  );
};

export default UploadContent;
