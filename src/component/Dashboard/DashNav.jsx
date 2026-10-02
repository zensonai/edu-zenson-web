import React, { useState, useEffect, useRef } from "react";
import {
    FiBell,
    FiMail,
    FiMenu,
    FiX,
    FiUser,
    FiLogOut,
    FiSettings,
    FiChevronDown,
    FiBookOpen,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import defultUser from "../../assets/User.png";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import DashSide from "./DashSide";
import API from "../../services/api";
import Toast from "../Toast/Toast";

const DashNav = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("access_token");
    const { auth } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [myprofile, setMyProfile] = useState(null);
    const [toast, setToast] = useState(false)

    const dropdownRef = useRef(null);

    const headleLogout = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/auth/logout", {
                refreshToken: localStorage.getItem("refresh_token"),
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.data.success === true) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                setToast({
                    success: true,
                    message: res.data.message
                })

                setTimeout(() => {
                    navigate('/', { replace: true })
                }, 3000)
                window.location.reload();
            }
        } catch (err) {
            setToast({
                success: false,
                message: err.response?.data?.message
            })
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            setTimeout(() => {
                navigate('/', { replace: true })
            }, 3000)
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await API.get("/profile/my-profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.data.success) {
                    setMyProfile(res.data.result.profile);
                }
            } catch (err) {
                console.log(err.response?.data || err.message);
            }
        };

        if (token) {
            fetchProfile();
        }
    }, [token]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <motion.header
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.35 }}
                className="sticky top-0 z-30 w-full border-b border-violet-100 bg-white/95 backdrop-blur-xl"
            >
                <div className="flex h-[74px] items-center justify-between px-4 sm:px-6 lg:px-8 xl:pl-[20rem]">
                    {toast && (
                        <div className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6">
                            <Toast
                                success={toast.success}
                                message={toast.message}
                                onClose={() => setToast(null)}
                            />
                        </div>
                    )}

                    <div className="flex min-w-0 items-center gap-3">

                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="flex h-10 w-10 items-center justify-center bg-violet-50 text-violet-600 transition hover:bg-violet-100 xl:hidden"
                        >
                            {mobileOpen ? (
                                <FiX className="h-5 w-5" />
                            ) : (
                                <FiMenu className="h-5 w-5" />
                            )}
                        </button>

                        <div className="flex min-w-0 items-center gap-3">

                            <div className="hidden h-11 w-11 shrink-0 items-center justify-center bg-gradient-to-br from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-200 sm:flex">
                                <FiBookOpen className="h-5 w-5" />
                            </div>

                            <div className="min-w-0">

                                <div className="flex items-center gap-2">

                                    <h1 className="truncate text-base font-black tracking-tight text-violet-950 sm:text-lg">
                                        ZensonEdu
                                    </h1>

                                    <span className="hidden bg-cyan-50 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-cyan-600 sm:inline-flex">
                                        SaaS Platform
                                    </span>

                                </div>

                                <p className="truncate text-[11px] font-medium text-gray-400 sm:text-xs">
                                    Education Management Platform
                                </p>

                            </div>

                        </div>

                    </div>

                    <div
                        className="flex items-center gap-2 sm:gap-3"
                        ref={dropdownRef}
                    >

                        <div className="hidden h-8 w-px bg-violet-100 md:block" />

                        <div className="relative">

                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="group flex items-center gap-2 px-1.5 py-1.5 transition hover:bg-violet-50"
                            >

                                <div className="relative h-10 w-10 shrink-0">

                                    <img
                                        src={
                                            myprofile?.profileImage
                                                ? `${import.meta.env.VITE_APP_API_FILES}/uploads/profile/${myprofile.profileImage}`
                                                : defultUser
                                        }
                                        alt="Profile"
                                        className="h-10 w-10 rounded-full object-cover ring-2 ring-violet-100 transition group-hover:ring-violet-200"
                                    />

                                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-lime-500" />

                                </div>

                                <div className="hidden max-w-[160px] text-left lg:block">

                                    <p className="truncate text-sm font-bold text-violet-950">
                                        {auth?.user?.email?.replace(
                                            /@gmail\.com$/i,
                                            ""
                                        ) || "User"}
                                    </p>

                                    <p className="mt-0.5 truncate text-[10px] font-bold uppercase tracking-wider text-violet-500">
                                        {auth?.user?.role || "Role"}
                                    </p>

                                </div>

                                <FiChevronDown
                                    className={`hidden h-4 w-4 text-gray-400 transition lg:block ${dropdownOpen
                                        ? "rotate-180 text-violet-600"
                                        : ""
                                        }`}
                                />

                            </button>

                            <AnimatePresence>

                                {dropdownOpen && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: -10,
                                            scale: 0.97,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            scale: 1,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: -10,
                                            scale: 0.97,
                                        }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-3 w-[310px] max-w-[calc(100vw-2rem)] overflow-hidden bg-white shadow-2xl shadow-violet-200/50 ring-1 ring-violet-100"
                                    >

                                        <div className="h-1 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500" />

                                        <div className="bg-gradient-to-br from-violet-50 via-white to-cyan-50 p-5">

                                            <div className="flex items-center gap-4">

                                                <div className="relative h-14 w-14 shrink-0">

                                                    <img
                                                        src={
                                                            myprofile?.profileImage
                                                                ? `${import.meta.env.VITE_APP_API_FILES}/uploads/profile/${myprofile.profileImage}`
                                                                : defultUser
                                                        }
                                                        alt="User"
                                                        className="h-14 w-14 rounded-full object-cover ring-4 ring-white shadow-md"
                                                    />

                                                    <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-lime-500" />

                                                </div>

                                                <div className="min-w-0 flex-1">

                                                    <p className="truncate text-sm font-black text-violet-950">
                                                        {auth?.user?.email?.replace(
                                                            /@gmail\.com$/i,
                                                            ""
                                                        ) || "User"}
                                                    </p>

                                                    <div className="mt-1 inline-flex bg-violet-100 px-2 py-1">

                                                        <p className="truncate text-[10px] font-bold uppercase tracking-wider text-violet-700">
                                                            {auth?.user?.role ||
                                                                "Role"}
                                                        </p>

                                                    </div>

                                                    <p className="mt-1.5 truncate text-[11px] text-gray-400">
                                                        {auth?.user?.email ||
                                                            "user@example.com"}
                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                        <div className="grid grid-cols-2 gap-2 border-y border-violet-50 bg-white p-3">

                                            <Link
                                                to="/Dashboard/my-profile"
                                                onClick={() =>
                                                    setDropdownOpen(false)
                                                }
                                                className="group flex items-center justify-center gap-2 bg-violet-50 px-3 py-3 text-xs font-bold text-violet-700 transition hover:bg-violet-100"
                                            >
                                                <FiUser className="h-4 w-4 transition group-hover:scale-110" />
                                                Profile
                                            </Link>

                                            <Link
                                                to="/Dashboard/settings"
                                                onClick={() =>
                                                    setDropdownOpen(false)
                                                }
                                                className="group flex items-center justify-center gap-2 bg-cyan-50 px-3 py-3 text-xs font-bold text-cyan-700 transition hover:bg-cyan-100"
                                            >
                                                <FiSettings className="h-4 w-4 transition group-hover:rotate-45" />
                                                Settings
                                            </Link>

                                        </div>

                                        <div className="bg-white p-2">

                                            <Link
                                                to="/Dashboard/notifications"
                                                onClick={() =>
                                                    setDropdownOpen(false)
                                                }
                                                className="group flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-gray-500 transition hover:bg-violet-50 hover:text-violet-700"
                                            >
                                                <span className="flex h-9 w-9 items-center justify-center bg-violet-50 text-violet-600 transition group-hover:bg-violet-100">
                                                    <FiBell className="h-4 w-4" />
                                                </span>

                                                <span>Notifications</span>
                                            </Link>

                                            <Link
                                                to="/Dashboard/messages"
                                                onClick={() =>
                                                    setDropdownOpen(false)
                                                }
                                                className="group flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-gray-500 transition hover:bg-cyan-50 hover:text-cyan-700"
                                            >
                                                <span className="flex h-9 w-9 items-center justify-center bg-cyan-50 text-cyan-600 transition group-hover:bg-cyan-100">
                                                    <FiMail className="h-4 w-4" />
                                                </span>

                                                <span>Messages</span>
                                            </Link>

                                            <button
                                                onClick={headleLogout}
                                                className="group flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-[#8D153A] transition hover:bg-[#F8F1F3]"
                                            >
                                                <span className="flex h-9 w-9 items-center justify-center bg-[#F8F1F3] transition group-hover:bg-[#F1E2E7]">
                                                    <FiLogOut className="h-4 w-4" />
                                                </span>

                                                <span>Logout</span>
                                            </button>

                                        </div>

                                        <div className="border-t border-violet-50 bg-violet-50/50 px-5 py-3">
                                            <p className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-violet-400">
                                                ZensonEdu · Education SaaS
                                            </p>
                                        </div>

                                    </motion.div>
                                )}

                            </AnimatePresence>

                        </div>

                    </div>

                </div>
            </motion.header>

            <div className="fixed left-0 top-0 z-50 hidden h-screen w-72 xl:flex">
                <DashSide />
            </div>

            <AnimatePresence>

                {mobileOpen && (
                    <div className="xl:hidden">

                        <motion.div
                            initial={{ x: -320 }}
                            animate={{ x: 0 }}
                            exit={{ x: -320 }}
                            transition={{
                                type: "spring",
                                stiffness: 320,
                                damping: 32,
                            }}
                            className="fixed left-0 top-0 z-50 h-screen w-72 shadow-2xl"
                        >
                            <DashSide
                                closeSidebar={() => setMobileOpen(false)}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.35 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-violet-950"
                            onClick={() => setMobileOpen(false)}
                        />

                    </div>
                )}

            </AnimatePresence>
        </>
    );
};

export default DashNav;