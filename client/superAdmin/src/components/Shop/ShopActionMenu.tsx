import { useEffect, useRef, useState } from "react";
import type { ShopActionMenuProps } from "../../types";
import {
    FiCheckCircle,
    FiEye,
    FiMoreHorizontal,
    FiRefreshCcw,
    FiSlash,
    FiXCircle,
    FiLoader
} from "react-icons/fi";
import { createPortal } from "react-dom";

const ShopActionMenu: React.FC<ShopActionMenuProps> = ({
    status,
    loading = false,   // ⬅ default false
    onApprove,
    onReject,
    onBlock,
    onRestore,
    onViewDetail
}) => {
    const btnRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState(false);
    const [pos, setPos] = useState({ top: 0, left: 0 });

    const updatePos = () => {
        if (!btnRef.current) return;
        const r = btnRef.current.getBoundingClientRect();
        setPos({
            top: r.bottom + 6,
            left: r.right - 175
        });
    };

    const toggleMenu = () => {
        updatePos();
        setOpen(prev => !prev);
    };

    useEffect(() => {
        const handle = (e: MouseEvent) => {
            const target = e.target as Node;
            if (
                !btnRef.current?.contains(target) &&
                !menuRef.current?.contains(target)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handle);
        return () => document.removeEventListener("mousedown", handle);
    }, []);

    // CSS disabled state
    const disabledClass = loading ? "opacity-50 cursor-not-allowed" : "";

    // Spinner
    const Spinner = () => (
        <FiLoader className="animate-spin text-gray-500" size={18} />
    );

    return (
        <>
            <button
                ref={btnRef}
                onClick={toggleMenu}
                disabled={loading}
                className={`p-2 rounded-lg hover:bg-gray-100 border border-gray-200 ${disabledClass}`}
            >
                {loading ? <Spinner /> : <FiMoreHorizontal size={18} className="text-gray-700" />}
            </button>

            {open &&
                createPortal(
                    <div
                        ref={menuRef}
                        style={{
                            position: "fixed",
                            top: pos.top,
                            left: pos.left,
                            zIndex: 9999
                        }}
                        className="bg-white rounded-xl border border-gray-200 shadow-lg py-2 min-w-[180px]"
                    >
                        {/* View Detail */}
                        <button
                            disabled={loading}
                            onClick={() => {
                                onViewDetail?.();
                                setOpen(false);
                            }}
                            className={`flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-gray-100 ${disabledClass}`}
                        >
                            <FiEye size={18} className="text-gray-600" />
                            <span>View Detail</span>
                        </button>

                        {/* ===== Pending ===== */}
                        {status === 0 && (
                            <>
                                {/* Approve */}
                                <button
                                    disabled={loading}
                                    onClick={() => {
                                        onApprove?.();
                                        setOpen(false);
                                    }}
                                    className={`flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-green-50 ${disabledClass}`}
                                >
                                    {loading ? (
                                        <Spinner />
                                    ) : (
                                        <FiCheckCircle size={18} className="text-green-600" />
                                    )}
                                    <span className="text-green-700">Approve</span>
                                </button>

                                {/* Reject */}
                                <button
                                    disabled={loading}
                                    onClick={() => {
                                        onReject?.();
                                        setOpen(false);
                                    }}
                                    className={`flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-red-50 ${disabledClass}`}
                                >
                                    {loading ? (
                                        <Spinner />
                                    ) : (
                                        <FiXCircle size={18} className="text-red-600" />
                                    )}
                                    <span className="text-red-600">Reject</span>
                                </button>
                            </>
                        )}

                        {/* ===== Active ===== */}
                        {status === 1 && (
                            <button
                                disabled={loading}
                                onClick={() => {
                                    onBlock?.();
                                    setOpen(false);
                                }}
                                className={`flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-orange-50 ${disabledClass}`}
                            >
                                {loading ? (
                                    <Spinner />
                                ) : (
                                    <FiSlash size={18} className="text-orange-600" />
                                )}
                                <span className="text-orange-700">Block</span>
                            </button>
                        )}

                        {/* ===== Blocked ===== */}
                        {status === 3 && (
                            <button
                                disabled={loading}
                                onClick={() => {
                                    onRestore?.();
                                    setOpen(false);
                                }}
                                className={`flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-blue-50 ${disabledClass}`}
                            >
                                {loading ? (
                                    <Spinner />
                                ) : (
                                    <FiRefreshCcw size={18} className="text-blue-600" />
                                )}
                                <span className="text-blue-700">Restore</span>
                            </button>
                        )}
                    </div>,
                    document.body
                )}
        </>
    );
};

export default ShopActionMenu;
