import React, { useEffect } from "react";
import { FaCheckCircle, FaTimesCircle, FaTimes } from "react-icons/fa";

const Toast = ({ success, message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const icon = success ? (
        <FaCheckCircle className="text-lime-500 w-5 h-5" />
    ) : (
        <FaTimesCircle className="text-[#8D153A] w-5 h-5" />
    );

    const toastStyle = success
        ? "bg-white border-l-4 border-lime-500 border border-slate-200"
        : "bg-white border-l-4 border-[#8D153A] border border-slate-200";

    return (
        <div
            className={`flex items-center w-full max-w-sm p-4 mb-4 text-slate-700 shadow-xl transform transition-all duration-500 ease-out ${toastStyle} animate-slide-in`}
            role="alert"
        >

            <div className={`flex items-center justify-center w-9 h-9 mr-3 ${success
                    ? "bg-lime-50"
                    : "bg-[#F8F1F3]"
                }`}>
                {icon}
            </div>

            <div className="flex-1 text-sm font-semibold text-slate-700">
                {message}
            </div>

            <button
                onClick={onClose}
                type="button"
                className="ml-3 text-slate-400 hover:text-indigo-700 bg-slate-50 hover:bg-indigo-50 p-1.5 transition"
                aria-label="Close"
            >
                <FaTimes className="w-3 h-3" />
            </button>

        </div>
    );
};

export default Toast;