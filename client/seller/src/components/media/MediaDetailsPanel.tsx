import { Copy } from "lucide-react";
import type { MediaDetailsProps } from "../../types";

const MediaDetailsPanel = ({ active }: MediaDetailsProps) => {
    const formatDate = (date: any) => {
        return new Date(date).toLocaleDateString("vi-VN");
    };
    if (!active) return null;
    return (
        <div className="w-80 shrink-0">
            <div className="sticky top-6">
                <div className="flex flex-col gap-6  
                rounded-xl border border-slate-200 bg-white p-6
                dark:border-slate-800 dark:bg-background-dark">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            Media Details
                        </h2>
                        {/* IMAGE PREVIEW – giữ đúng tỉ lệ, không méo */}
                        <div className="w-full max-h-80 rounded-lg overflow-hidden  bg-gray-100 flex items-center justify-center">
                            <img
                                src={active.url}
                                alt={active.fileName}
                                className="max-w-full max-h-80 object-contain"
                            />
                        </div>

                    </div>
                    <div className="flex flex-col gap-4 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-500 dark:text-slate-400">File Name:</span>
                            <span className="font-medium text-slate-900 dark:text-slate-200 break-words break-all text-wrap">
                                {active.fileName}
                            </span>

                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500 dark:text-slate-400">File Type:</span>
                            <span className="font-medium text-slate-800 dark:text-slate-200">
                                {active.mediaType}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500 dark:text-slate-400">Upload Date:</span>
                            <span className="font-medium text-slate-800 dark:text-slate-200">
                                {formatDate(active.createdAt)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500 dark:text-slate-400">Dimensions:</span>
                            <span className="font-medium text-slate-800 dark:text-slate-200">
                                {active.mimeType}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500 dark:text-slate-400">File Size:</span>
                            <span className="font-medium text-slate-800 dark:text-slate-200">
                                {active.size}
                            </span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Direct URL:
                            </label>
                            <div className="flex items-center">
                                <input
                                    readOnly
                                    value={active.url}
                                    className="h-9 w-full flex-1 rounded-l-lg border border-slate-300 bg-slate-100 px-3 text-sm text-slate-900
                                    focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none
                                    dark:border-slate-700 dark:bg-slate-700/50 dark:text-white"
                                />

                                <button
                                    onClick={() => navigator.clipboard.writeText(active.url)}
                                    className="flex h-9 w-10 items-center justify-center rounded-r-lg border-y border-r border-slate-300 bg-slate-200 
                                    text-slate-600 hover:bg-slate-300 
                                    dark:border-slate-700 dark:bg-[#2c3a57] dark:text-slate-300 dark:hover:bg-[#344264]"
                                >
                                    <Copy size={18} />
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Alt Text
                                </label>
                                <textarea
                                    defaultValue={active.alt}
                                    rows={3}
                                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 
                                placeholder:text-slate-400 focus:border-primary focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none
                                dark:border-slate-700 dark:bg-[#232f48] dark:text-white dark:placeholder:text-[#92a4c9]"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 dark:border-slate-800">
                            <button className="flex h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-blue-500 text-sm font-bold text-white hover:bg-blue-500/90">
                                Update Media
                            </button>

                            <button className="flex h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-red-500/10 px-4 text-sm font-bold text-red-600 hover:bg-red-500/20 dark:bg-red-500/10 dark:text-red-500 dark:hover:bg-red-500/20">
                                Delete Media
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MediaDetailsPanel;