import { useRef, useState, useEffect } from "react";
import type { ActionUserProps } from "../../types";
import { FiCheckCircle, FiMoreHorizontal, FiUserCheck, FiXCircle } from "react-icons/fi";
import { createPortal } from "react-dom";

const UserActionMenu: React.FC<ActionUserProps> = ({
    status,
    onAssignRole,
    onActive,
    onDeactive
}) => {
    const btnRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState(false);
    const [pos, setPos] = useState({ top: 0, left: 0 });

    // Tính vị trí thực của dropdown
    const updatePos = () => {
        if (!btnRef.current) return;
        const r = btnRef.current.getBoundingClientRect();
        setPos({
            top: r.bottom + 6,
            left: r.right - 160
        });
    };

    const toggleMenu = () => {
        updatePos();
        setOpen(prev => !prev);
    };

    // đóng khi click outside
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

    return (
        <>
            {/* Button */}
            <button
                ref={btnRef}
                onClick={toggleMenu}
                className="p-2 rounded-lg hover:bg-gray-100 border border-gray-200"
            >
                <FiMoreHorizontal size={18} className="text-gray-700" />
            </button>

            {/* Dropdown dùng portal — không ảnh hưởng height table */}
            {open &&
                createPortal(
                    <div
                        ref={menuRef}
                        style={{
                            position: "fixed",
                            top: pos.top,
                            left: pos.left,
                            zIndex: 99999
                        }}
                        className="bg-white rounded-xl border border-gray-200 shadow-lg py-2 min-w-[170px]"
                    >
                        {/* Assign Role */}
                        <button
                            onClick={() => {
                                onAssignRole?.();
                                setOpen(false);
                            }}
                            className="flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-gray-100"
                        >
                            <span className="text-blue-600">
                                <FiUserCheck size={18} />
                            </span>
                            <span className="text-gray-800">Assign Role</span>
                        </button>

                        {/* Activate / Deactivate */}
                        {status === 1 ? (
                            <button
                                onClick={() => {
                                    onDeactive?.();
                                    setOpen(false);
                                }}
                                className="flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-red-50"
                            >
                                <span className="text-red-600">
                                    <FiXCircle size={18} />
                                </span>
                                <span className="text-red-600">Deactivate</span>
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    onActive?.();
                                    setOpen(false);
                                }}
                                className="flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-green-50"
                            >
                                <span className="text-green-600">
                                    <FiCheckCircle size={18} />
                                </span>
                                <span className="text-green-700">Activate</span>
                            </button>
                        )}
                    </div>,
                    document.body
                )}
        </>
    );
};

export default UserActionMenu;
