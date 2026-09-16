import React, { useEffect, useState } from "react";
import { MdLockOutline, MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const token = localStorage.getItem("access_token");

        if (!token) {
            navigate("/", { replace: true });
            return;
        }

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);

                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");

                    navigate("/", { replace: true });

                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    const handleUnauthorized = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        navigate("/", { replace: true });
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 bg-slate-50 relative overflow-hidden">

            <div className="absolute w-[450px] h-[450px] bg-indigo-200/40 rounded-full blur-[120px] -top-40 -left-40"></div>

            <div className="absolute w-[400px] h-[400px] bg-lime-200/40 rounded-full blur-[120px] -bottom-40 -right-40"></div>

            <div className="absolute w-[250px] h-[250px] bg-indigo-100/50 rounded-full blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

            <div className="relative w-full max-w-lg">

                <div className="absolute -inset-[1px] bg-gradient-to-r from-indigo-500 via-indigo-400 to-lime-400"></div>

                <div className="relative bg-white p-10 text-center">

                    <div className="flex justify-center mb-7">

                        <div className="relative">

                            <div className="absolute inset-0 bg-lime-300/40 blur-2xl"></div>

                            <div className="relative w-20 h-20 flex items-center justify-center bg-indigo-50 border border-indigo-100 text-indigo-600">
                                <MdLockOutline size={42} />
                            </div>

                        </div>

                    </div>

                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 border border-lime-300 bg-lime-50">

                        <span className="w-2 h-2 bg-lime-500"></span>

                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-lime-700">
                            Access Restricted
                        </span>

                    </div>

                    <h1 className="text-3xl font-bold text-slate-900 mb-4">
                        Unauthorized Access
                    </h1>

                    <p className="text-slate-500 leading-7 mb-3">
                        You do not have permission to access this resource.
                    </p>

                    <p className="text-slate-400 text-sm leading-6 mb-8">
                        Your authentication session will be terminated and you will be redirected to the login page.
                    </p>

                    <div className="border-y border-slate-100 py-6 mb-8">

                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-3">
                            Session Termination
                        </p>

                        <div className="flex items-center justify-center gap-3">

                            <span className="text-5xl font-bold text-indigo-600 tabular-nums">
                                {countdown}
                            </span>

                            <span className="text-slate-400 text-sm">
                                seconds
                            </span>

                        </div>

                    </div>

                    <button
                        onClick={handleUnauthorized}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all duration-200 border border-indigo-600 hover:border-lime-500"
                    >
                        <MdArrowBack size={21} />
                        Logout & Go Back
                    </button>

                    <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
                        <span className="w-1.5 h-1.5 bg-lime-500"></span>
                        Protected Access Control
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Unauthorized;