import React from "react";
import {
    FaArrowLeft,
    FaArrowRight,
    FaBookOpen,
    FaGraduationCap,
} from "react-icons/fa6";

const DefultError = () => {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-violet-50/40 px-5 py-10 sm:px-6">
            <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-violet-200/30 blur-3xl" />

            <div className="absolute -bottom-32 -right-32 h-[420px] w-[420px] rounded-full bg-cyan-200/30 blur-3xl" />

            <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-100/40 blur-3xl" />

            <div
                className="absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                    backgroundSize: "44px 44px",
                }}
            />

            <div className="relative w-full max-w-2xl">
                <div className="border border-violet-100 bg-white shadow-[0_30px_80px_rgba(124,58,237,0.10)]">
                    <div className="px-6 py-10 text-center sm:px-12 sm:py-14">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center bg-violet-50 text-violet-600">
                            <FaGraduationCap className="text-xl" />
                        </div>

                        <div className="mt-8">
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-violet-600">
                                ZensonEdu
                            </span>

                            <h1 className="mt-5 text-[82px] font-black leading-none tracking-[-0.06em] text-violet-600 sm:text-[130px]">
                                404
                            </h1>
                        </div>

                        <div className="mx-auto mt-2 h-px w-12 bg-cyan-400" />

                        <h2 className="mt-7 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                            We couldn't find this page.
                        </h2>

                        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
                            The page you're looking for may have been moved,
                            removed, or the address may be incorrect. Let's get
                            you back to the ZensonEdu platform.
                        </p>

                        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                            <a
                                href="/"
                                className="inline-flex h-12 w-full items-center justify-center gap-3 bg-violet-600 px-7 text-sm font-bold text-white transition hover:bg-violet-700 sm:w-auto"
                            >
                                Go to Homepage
                                <FaArrowRight className="text-xs" />
                            </a>

                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                className="inline-flex h-12 w-full items-center justify-center gap-3 border border-slate-200 bg-white px-7 text-sm font-bold text-slate-600 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600 sm:w-auto"
                            >
                                <FaArrowLeft className="text-xs" />
                                Go Back
                            </button>
                        </div>
                    </div>

                    <div className="grid border-t border-slate-100 sm:grid-cols-3">
                        <div className="flex items-center justify-center gap-3 border-b border-slate-100 px-5 py-5 sm:border-b-0 sm:border-r">
                            <FaGraduationCap className="text-violet-500" />

                            <div className="text-left">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Platform
                                </p>

                                <p className="mt-1 text-xs font-bold text-slate-700">
                                    ZensonEdu
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-3 border-b border-slate-100 px-5 py-5 sm:border-b-0 sm:border-r">
                            <FaBookOpen className="text-cyan-500" />

                            <div className="text-left">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Education
                                </p>

                                <p className="mt-1 text-xs font-bold text-slate-700">
                                    Learn & Manage
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-center px-5 py-5">
                            <p className="text-center text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                Error 404 · Page Not Found
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2">
                    <span className="h-1.5 w-1.5 bg-violet-500" />

                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Build your education platform with ZensonEdu
                    </p>

                    <span className="h-1.5 w-1.5 bg-cyan-400" />
                </div>
            </div>
        </div>
    );
};

export default DefultError;