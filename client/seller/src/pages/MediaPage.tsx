import { useEffect, useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { Grid, List, Trash2 } from "lucide-react";
import MediaDetailsPanel from "../components/media/MediaDetailsPanel";
import { createMedia, getMedias } from "../service/api/Media";

const MediaPage = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState<any[]>([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState<number[]>([]);
  const [active, setActive] = useState<any | null>(null);

  const multiSelect = selected.length > 0;

  const toggleItem = (item: any) => {
    setSelected((prev) => {
      // Nếu đã được chọn → bỏ chọn
      if (prev.includes(item.id)) {
        const newSelected = prev.filter((x) => x !== item.id);

        // Nếu không còn item nào được chọn → tắt active
        if (newSelected.length === 0) {
          setActive(null);
        } else {
          setActive((current: any) => {
            if (!current || current.id === item.id) {
              const next = media.find((m) => m.id === newSelected[0]);
              return next || null;
            }
            return current;
          });
        }

        return newSelected;
      }

      // Nếu chưa chọn → thêm vào selected + setActive item đó
      const newSelected = [...prev, item.id];
      setActive(item);
      return newSelected;
    });
  };
  const getDateRange = (dateFilter: string) => {
    const now = new Date();
    let startDate: Date | null = null;

    switch (dateFilter) {
      case "TODAY":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;

      case "WEEK":
        startDate = new Date();
        startDate.setDate(now.getDate() - 7);
        break;

      case "MONTH":
        startDate = new Date();
        startDate.setDate(now.getDate() - 30);
        break;

      default:
        return null;
    }

    // Format YYYY-MM-DD
    const format = (d: Date) => d.toISOString().split("T")[0];

    return {
      start: format(startDate),
      end: format(now),
    };
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const filters: string[] = [];
      if (typeFilter) {
        filters.push(`mediaType==${typeFilter}`);
      }
      const range = getDateRange(dateFilter);
      if (range) {
        filters.push(`createdAt>=${range.start} and createdAt<=${range.end}`);
      }
      const filterQuery = filters.join(" and ");
      const param = {
        page: 1,
        size: 10,
        ...(filterQuery ? { filter: filterQuery } : {}),
      };
      const resp = await getMedias(param);
      setMedia(resp.content ?? []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [typeFilter, dateFilter]);
  const selectAll = () => {
    if (selected.length === media.length) setSelected([]);
    else setSelected(media.map((m) => m.id));
  };

  const handleSelectFiles = async (files: FileList | null) => {
    if (!files) return;

    const previews = Array.from(files).map((file) => ({
      id: Math.random(),
      url: URL.createObjectURL(file),
      file,
      progress: 0,
    }));
    setUploading((prev) => [...prev, ...previews]);
    previews.forEach((item) => uploadFile(item));
  };

  const uploadFile = async (item: any) => {

    let fake = 0;
    const fakeInterval = setInterval(() => {
      fake += 6;
      if (fake <= 85) updateProgress(item.id, fake);
      else clearInterval(fakeInterval);
    }, 120);

    try {
      await createMedia(item.file);
      setMedia((prev) => [
        ...prev,
        {
          id: Math.random(),
          url: item.url,
          file: item.file.name,
          size: (item.file.size / 1024).toFixed(1) + " KB",
          date: new Date().toLocaleDateString(),
        },
      ]);
      setUploading((list) => list.filter((u) => u.id !== item.id));
    } catch (err) {
      console.error("Upload error:", err);
      updateProgress(item.id, 0);
      setUploading((list) => list.filter((u) => u.id !== item.id));
    } finally {
      fetchData();
    }
  };

  const updateProgress = (id: number, percent: number) => {
    setUploading((list) =>
      list.map((item) => (item.id === id ? { ...item, progress: percent } : item)),
    );
  };
  return (
    <div className="p-8 min-h-screen bg-[#F9FAFB] " style={{ fontFamily: "Inter, sans-serif" }}>
      {/* TITLE */}
      <h1 className="text-2xl font-bold">Media Library</h1>
      <p className="text-gray-600">Manage all media files uploaded to your store.</p>

      {/* UPLOAD BOX */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleSelectFiles(e.dataTransfer.files);
        }}
        className={`mt-6 h-56 border-2 border-dashed rounded-xl
                flex flex-col items-center justify-center transition
                ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}`}
      >
        <FaFileUpload size={32} className="text-gray-400 mb-3" />
        <p className="text-gray-700 text-sm">Drag and drop files to upload</p>
        <p className="text-gray-400 text-xs my-1">or</p>
        <label className="flex h-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-slate-200 px-4 text-sm font-bold text-slate-900 hover:bg-slate-300 dark:bg-[#232f48] dark:text-white dark:hover:bg-[#2c3a57]">
          Select Files
          <input
            type="file"
            multiple
            className="hidden"
            onChange={(e) => handleSelectFiles(e.target.files)}
          />
        </label>
      </div>

      {/* TOP FILTER BAR */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-4">
          {/* TYPE FILTER */}
          <div className="relative inline-block">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-2 pr-10
                   shadow-sm text-gray-700 cursor-pointer transition-all
                   hover:border-gray-400
                   focus:outline-none focus:ring-0 focus:border-gray-300"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="ALL">Tất cả file media</option>
              <option value="1">Ảnh</option>
              <option value="2">Video</option>
            </select>

            {/* Arrow Icon */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              ▼
            </div>
          </div>

          {/* DATE FILTER */}
          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-2 pr-10
                   shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400
                   hover:border-gray-400 transition-all cursor-pointer"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="ALL">Tất cả các ngày</option>
              <option value="TODAY">Hôm nay</option>
              <option value="WEEK">7 ngày qua</option>
              <option value="MONTH">30 ngày qua</option>
            </select>

            {/* Arrow Icon */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              ▼
            </div>
          </div>
        </div>

        {/* VIEW MODE */}
        <div className="flex border border-gray-300 rounded-lg overflow-hidden bg-white">
          <button
            onClick={() => setViewMode("grid")}
            className={`h-10 w-10 flex items-center justify-center border-r border-slate-200
                            ${viewMode === "grid" ? "bg-blue-50" : "hover:bg-gray-100"}`}
          >
            <Grid size={18} className={viewMode === "grid" ? "text-blue-600" : "text-gray-600"} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`h-10 w-10 flex items-center justify-center
                            ${viewMode === "list" ? "bg-blue-50" : "hover:bg-gray-100"}`}
          >
            <List size={18} className={viewMode === "list" ? "text-blue-600" : "text-gray-600"} />
          </button>
        </div>
      </div>

      {/* MULTI SELECT BAR */}
      {multiSelect && (
        <div
          className="flex items-center justify-between mt-4 px-4 py-3
                    bg-white border-y border-t rounded-xl border-slate-200 shadow-sm"
        >
          {/* LEFT SIDE */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={selected.length === media.length}
              onChange={selectAll}
              className="h-4 w-4 accent-blue-600"
            />

            <span className="text-gray-600 text-sm">{selected.length} items selected</span>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-lg
                               flex items-center gap-2 hover:bg-red-700"
            >
              <Trash2 size={16} />
              Delete Selected ({selected.length})
            </button>

            <button
              onClick={() => setSelected([])}
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel Selection
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-6 mt-8 items-start">
        {/* MEDIA LIST — FLEX ROW, NO WRAP */}
        <div className="flex overflow-x-auto flex-nowrap gap-4 flex-grow">
          {uploading.map((u) => (
            <div
              key={u.id}
              className="relative flex-none w-[140px] h-[112px] rounded-lg border border-gray-300 overflow-hidden bg-gray-100"
            >
              {/* Preview image */}
              <img src={u.url} className="w-full h-full object-cover opacity-60" />

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 w-full bg-gray-300 h-2">
                <div
                  className="bg-blue-600 h-2 transition-all"
                  style={{ width: `${u.progress}%` }}
                />
              </div>

              {/* Percentage text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-sm font-semibold drop-shadow">{u.progress}%</span>
              </div>
            </div>
          ))}
          {loading &&
            Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="flex-none w-[140px] h-[112px] rounded-lg border border-gray-300
                   bg-gray-200 animate-pulse"
              />
            ))}

          {/* EMPTY STATE */}
          {!loading && media.length === 0 && (
            <div className="text-gray-500 text-sm mt-6">No media files found.</div>
          )}
          {!loading &&
            media.map((m) => (
              <div
                key={m.id}
                className="relative cursor-pointer flex-none w-[140px] h-[112px]"
                onClick={() => toggleItem(m)}
              >
                {/* CHECKBOX */}
                <div
                  className={`absolute top-2 left-2 h-5 w-5 rounded-md flex items-center justify-center z-10
            ${
              selected.includes(m.id) ? "bg-blue-600 border-blue-600" : "bg-white border-gray-300"
            }`}
                >
                  {selected.includes(m.id) && (
                    <svg
                      className="h-3 w-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                <img
                  src={m.url}
                  className={`w-full h-full object-cover rounded-lg ${
                    selected.includes(m.id) ? "border-2 border-blue-500" : "border border-gray-300"
                  }`}
                />
              </div>
            ))}
        </div>

        {/* DETAILS PANEL — BÊN PHẢI */}
        {active && (
          <div className="w-[340px] shrink-0">
            <MediaDetailsPanel active={active} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaPage;
