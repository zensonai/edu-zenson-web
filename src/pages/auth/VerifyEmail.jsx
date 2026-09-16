import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../../services/api";

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get("token");

    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setMsg("Invalid verification link.");
                setSuccess(false);
                setLoading(false);
                return;
            }

            try {
                const res = await API.post(`/auth/verfiy-email/${encodeURIComponent(token)}`);

                setSuccess(res.data?.success === true);
                setMsg(res.data?.message || "Email verification completed.");
            } catch (error) {
                setSuccess(error.response?.data?.success === true);
                setMsg(error.response?.data?.message || "Email verification failed.");
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, [token]);

    useEffect(() => {
        if (loading) return;

        if (countdown === 0) {
            navigate("/login", { replace: true });
            return;
        }

        const timer = setTimeout(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [loading, countdown, navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-cyan-50 px-4 py-8">

            <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">

                <div className="w-full max-w-md overflow-hidden bg-white shadow-[0_30px_80px_rgba(124,58,237,0.12)]">

                    <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 to-cyan-500 px-8 py-8 sm:px-10">

                        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10"></div>

                        <div className="absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-cyan-300/20"></div>

                        <div className="relative z-10 flex items-center gap-4">

                            <div className="flex h-12 w-12 items-center justify-center bg-white text-violet-600 shadow-lg">
                                <span className="text-lg font-bold">
                                    Z
                                </span>
                            </div>

                            <div className="text-left">
                                <p className="text-lg font-bold text-white">
                                    ZensonEdu
                                </p>

                                <p className="text-xs tracking-wide text-violet-100">
                                    Education Platform
                                </p>
                            </div>

                        </div>

                    </div>

                    <div className="p-8 text-center sm:p-10">

                        {loading ? (
                            <>

                                <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center bg-violet-50">
                                    <div className="h-9 w-9 animate-spin rounded-full border-4 border-violet-100 border-t-violet-600"></div>
                                </div>

                                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
                                    Account Verification
                                </p>

                                <h1 className="text-3xl font-bold tracking-[-1px] text-violet-950 sm:text-4xl">
                                    Verifying Email
                                </h1>

                                <p className="mt-4 text-sm leading-6 text-slate-500">
                                    Please wait while we verify your email
                                    address and activate your account.
                                </p>

                                <div className="mx-auto mt-8 flex items-center justify-center gap-2">

                                    <span className="h-1.5 w-1.5 bg-violet-500"></span>

                                    <span className="h-1.5 w-8 bg-cyan-400"></span>

                                    <span className="h-1.5 w-1.5 bg-violet-300"></span>

                                </div>

                            </>
                        ) : (
                            <>

                                <div className={`mx-auto mb-7 flex h-16 w-16 items-center justify-center ${success ? "bg-emerald-50 text-emerald-500" : "bg-violet-50 text-violet-500"}`}>

                                    <span className="text-3xl font-bold">
                                        {success ? "✓" : "×"}
                                    </span>

                                </div>

                                <p className={`mb-3 text-xs font-bold uppercase tracking-[0.2em] ${success ? "text-emerald-500" : "text-violet-600"}`}>
                                    {success ? "Verification Complete" : "Account Verification"}
                                </p>

                                <h1 className={`text-3xl font-bold tracking-[-1px] sm:text-4xl ${success ? "text-emerald-600" : "text-violet-950"}`}>
                                    {success ? "Email Verified" : "Verification Failed"}
                                </h1>

                                <p className="mt-4 text-sm leading-6 text-slate-500">
                                    {msg}
                                </p>

                                <div className="mt-8 bg-violet-50/70 px-5 py-5">

                                    <p className="text-sm font-medium text-violet-900">
                                        Redirecting to login in
                                    </p>

                                    <div className="mt-2 text-4xl font-bold text-violet-600">
                                        {countdown}
                                    </div>

                                    <p className="mt-1 text-xs text-violet-400">
                                        seconds
                                    </p>

                                </div>

                                <div className="mx-auto mt-7 flex items-center justify-center gap-2">

                                    <span className="h-1.5 w-1.5 bg-violet-500"></span>

                                    <span className="h-1.5 w-8 bg-cyan-400"></span>

                                    <span className="h-1.5 w-1.5 bg-violet-300"></span>

                                </div>

                            </>
                        )}

                    </div>

                </div>

            </div>

        </div>
    );
};

export default VerifyEmail;