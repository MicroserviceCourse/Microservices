import React, { useState } from "react";
import type { ModalReasonProps } from "../../types";

const ReasonModal: React.FC<ModalReasonProps> = ({ title, onConfirm, onClose, loading }) => {
    const [reason, setReason] = useState("");

    return (
        <div
            className="
                fixed inset-0 
                bg-gray-200/40 
                backdrop-blur-[1px] 
                flex items-center justify-center 
                z-[9999]
            "
        >
            <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md animate-fadeIn">
                <h2 className="text-lg font-semibold mb-4">{title}</h2>

                <textarea
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none"
                    rows={4}
                    placeholder="Enter reason..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                />

                <div className="flex justify-end gap-3 mt-4">
                    <button
                        className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </button>

                    <button
                        className={`
                            px-4 py-2 rounded-lg text-white 
                            flex items-center gap-2
                            ${loading 
                                ? "bg-red-400 cursor-not-allowed" 
                                : "bg-red-600 hover:bg-red-700"}
                        `}
                        disabled={loading}
                        onClick={() => {
                            if (reason.trim()) onConfirm(reason);
                        }}
                    >
                        {loading && (
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        )}
                        <span>Confirm</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReasonModal;
