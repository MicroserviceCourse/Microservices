import { useEffect, useState } from "react";
import { X, Check } from "lucide-react";
import { getMedias } from "../../service/api/Media";
import type { MediaItem, MediaLibraryProps } from "../../types";

const MediaLibraryModal = ({ isOpen, onClose, onSelect,multiple=false}: MediaLibraryProps) => {
    const [mediaList, setMediaList] = useState<MediaItem[]>([]);
    const [multiSelected, setMultiSelected] = useState<MediaItem[]>([]);
    const [selectedDetail, setSelectedDetail] = useState<MediaItem | null>(null);
    const [typeFilter, setTypeFilter] = useState("ALL");
    const [dateFilter, setDateFilter] = useState("ALL");

    const getDateRange = () => {
        const now = new Date();
        let start: Date | null = null;

        if (dateFilter === "TODAY") start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        if (dateFilter === "WEEK") { start = new Date(); start.setDate(now.getDate() - 7); }
        if (dateFilter === "MONTH") { start = new Date(); start.setDate(now.getDate() - 30); }

        if (!start) return null;

        const f = (d: Date) => d.toISOString().split("T")[0];
        return { start: f(start), end: f(now) };
    };

    const fetchData = async () => {
        let filters: string[] = [];

        if (typeFilter !== "ALL") filters.push(`mediaType==${typeFilter}`);

        const range = getDateRange();
        if (range) filters.push(`createdAt>=${range.start} and createdAt<=${range.end}`);

        const resp = await getMedias({
            page: 1,
            size: 50,
            ...(filters.length ? { filter: filters.join(" and ") } : {})
        });

        setMediaList(resp.content ?? []);

    };

    useEffect(() => {
        if (isOpen) fetchData();
    }, [isOpen, typeFilter, dateFilter]);

    if (!isOpen) return null;
    const formatDate = (date: string) => {
        const d = new Date(date);

        const month = d.getMonth() + 1; // 1-12
        const day = d.getDate();
        const year = d.getFullYear();

        return `Tháng ${month} ${day}, ${year}`;
    };

    const toggleSelect = (item: MediaItem) => {
        if (!multiple) {
            setMultiSelected([item]);   // chỉ chọn 1
            setSelectedDetail(item);
            return;
        }
    
    
        setMultiSelected(prev => {
            if (prev.find(m => m.id === item.id)) {
                return prev.filter(m => m.id !== item.id);
            }
            return [...prev, item];
        });
    
        setSelectedDetail(item);
    }
    const handleClose=()=>{
        setMultiSelected([]);
        setSelectedDetail(null);
        onClose();
    }
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/50" style={{ fontFamily: 'Inter, sans-serif' }}>
            <div className="flex flex-col w-full h-full max-w-6xl bg-white rounded-xl shadow-2xl overflow-hidden">

                {/* HEADER */}
                <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h1 className="text-xl font-bold text-[#111318]">Thư viện Media</h1>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <X size={24} />
                    </button>
                </header>

                <div className="flex flex-1 min-h-0">

                    {/* LEFT SIDE */}
                    <main className="flex flex-col flex-1 min-w-0 bg-[#f6f6f8]">

                        {/* TABS */}
                        <div className="px-6 border-b border-gray-200 bg-white">
                            <div className="flex gap-8">
                                <button className="flex flex-col items-center border-b-[3px] border-primary pb-3 pt-4 text-primary font-bold">
                                    Thư viện Media
                                </button>

                                <button className="flex flex-col items-center pb-3 pt-4 text-gray-500 hover:text-gray-800">
                                    Tải lên tệp
                                </button>
                            </div>
                        </div>

                        {/* FILTER BAR */}
                        <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-200 bg-white">

                            {/* Filter Button: Loại tệp */}
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


                            {/* Filter Button: Ngày đăng */}
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

                        {/* GRID */}
                        <div className="flex-1 p-6 overflow-y-auto">
                            <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-4">

                                {mediaList.map((m) => {
                                    const isSelected =  multiSelected.some(item => item.id === m.id);

                                    return (
                                        <div key={m.id} onClick={() => toggleSelect(m)} className="relative cursor-pointer group">
                                            <div
                                                className={`w-full bg-center bg-no-repeat bg-cover border-2 rounded-lg aspect-square 
                                                    ${isSelected ? "border-blue-500" : "border-transparent group-hover:border-blue-500/50"}
                                                `}
                                                style={{ backgroundImage: `url(${m.url})` }}
                                            ></div>

                                            {/* Overlay */}
                                            {isSelected && <div className="absolute inset-0  rounded-lg"></div>}

                                            {/* Check icon */}
                                            {isSelected && (
                                                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                                    <Check size={16} />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </main>

                    {/* SIDEBAR */}
                    {/* SIDEBAR */}
                    <aside className="flex flex-col w-80 border-l border-gray-200 bg-[#f6f6f8]">

                        <div className="flex-1 p-6 overflow-y-auto">
                            <h2 className="text-lg font-bold text-[#111318] mb-4">Chi tiết đính kèm</h2>

                            {selectedDetail ? (
                                <>
                                    {/* IMAGE PREVIEW */}
                                    <div className="mb-6">
                                        <img
                                            src={selectedDetail.url}
                                            className="object-cover w-full border rounded-lg border-gray-300 aspect-video"
                                        />
                                    </div>

                                    {/* FILE INFO */}
                                    <div className="space-y-2 text-xs text-gray-600">
                                        <p><strong>{selectedDetail.fileName}</strong></p>
                                        <p>{formatDate(selectedDetail.createdAt)}</p>
                                        <p>{(selectedDetail.size / 1024).toFixed(1)} KB</p>
                                        <p>{selectedDetail.width} × {selectedDetail.height} pixels</p>
                                    </div>

                                    <hr className="my-6 border-gray-300" />

                                    {/* ALT TEXT */}
                                    <div className="space-y-1 mb-4">
                                        <label className="text-sm font-medium text-gray-700">Văn bản thay thế (Alt Text)</label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 bg-[#f0f2f4] text-gray-500 cursor-not-allowed"
                                            placeholder="Mô tả ảnh…"
                                            value={selectedDetail.alt}
                                        />
                                    </div>



                                    {/* FILE URL */}
                                    <div className="space-y-1 mb-4">
                                        <label className="text-sm font-medium text-gray-700">URL tệp</label>
                                        <input
                                            type="text"
                                            readOnly
                                            value={selectedDetail.url}
                                            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 bg-[#f0f2f4] text-gray-500 cursor-not-allowed"
                                        />
                                    </div>
                                </>
                            ) : (
                                <p className="text-gray-500 mt-10 text-center">Chọn 1 ảnh bên trái</p>
                            )}
                        </div>
                    </aside>

                </div>

                {/* FOOTER */}
                <footer className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-white">

                    <p className="text-sm font-medium text-gray-700">
                        Đã chọn {multiSelected.length} ảnh
                    </p>

                    <div className="flex items-center gap-3">
                        <button onClick={onClose} className="px-4 py-2 text-sm font-bold bg-gray-200 rounded-lg hover:bg-gray-300">
                            Hủy
                        </button>

                        <button
                            disabled={multiSelected.length === 0}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
                            onClick={() => {
                                onSelect(multiSelected.map(i => i.url));
                                handleClose();
                            }}
                        >
                            Chọn ảnh
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default MediaLibraryModal; 