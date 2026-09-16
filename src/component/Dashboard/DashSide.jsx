import React, { useEffect, useLayoutEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
    FiBookOpen,
    FiGrid,
    FiArrowRight,
} from "react-icons/fi";
import defaultUser from "../../assets/User.png";
import { useAuth } from "../../context/AuthContext";
import { menus } from "./menus";
import API from "../../services/api";
import './DashSide.css'

const DashSide = ({ closeSidebar }) => {
    const { auth } = useAuth();
    const location = useLocation();
    const token = localStorage.getItem("access_token");

    const [openMenu, setOpenMenu] = useState(null);
    const [myprofile, setMyProfile] = useState(null);

    const sections = menus[auth?.user?.role] || [];

    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }

        return () => {
            if ("scrollRestoration" in window.history) {
                window.history.scrollRestoration = "auto";
            }
        };
    }, []);

    useLayoutEffect(() => {
        const resetScroll = () => {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;

            const all = document.querySelectorAll("*");

            all.forEach((element) => {
                const style = window.getComputedStyle(element);

                if (
                    (style.overflowY === "auto" ||
                        style.overflowY === "scroll" ||
                        style.overflowY === "overlay") &&
                    element.scrollHeight > element.clientHeight
                ) {
                    element.scrollTop = 0;
                }

                if (
                    (style.overflowX === "auto" ||
                        style.overflowX === "scroll" ||
                        style.overflowX === "overlay") &&
                    element.scrollWidth > element.clientWidth
                ) {
                    element.scrollLeft = 0;
                }
            });
        };

        resetScroll();

        requestAnimationFrame(() => {
            resetScroll();

            requestAnimationFrame(() => {
                resetScroll();
            });
        });
    }, [location.pathname]);

    useEffect(() => {
        const activeMenu = sections
            .flatMap((section) => section.items)
            .find((item) =>
                item.submenu?.some((sub) =>
                    location.pathname.startsWith(sub.link)
                )
            );

        if (activeMenu) {
            setOpenMenu(activeMenu.name);
        }
    }, [location.pathname, auth?.user?.role]);

    const handleNavigation = () => {
        if (closeSidebar) {
            closeSidebar();
        }
    };

    const toggleMenu = (name) => {
        setOpenMenu((prev) => (prev === name ? null : name));
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

    return (
        <aside className="custom-scrollbar h-screen w-72 shrink-0 overflow-y-auto overflow-x-hidden bg-white px-4 py-5">
            <div className="mb-7">

                <div className="flex items-center gap-3 px-2">

                    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-200/60">

                        <FiBookOpen className="h-5 w-5" />

                        <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-lime-400" />

                    </div>

                    <div className="min-w-0">

                        <div className="flex items-center gap-2">

                            <p className="truncate text-[17px] font-black tracking-tight text-violet-950">
                                ZensonEdu
                            </p>

                        </div>

                        <p className="mt-0.5 truncate text-[10px] font-semibold uppercase tracking-[0.12em] text-violet-400">
                            Education SaaS
                        </p>

                    </div>

                </div>

                <div className="mt-5 rounded-2xl bg-gradient-to-r from-violet-50 via-white to-cyan-50 p-3">

                    <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm">
                            <FiGrid className="h-4 w-4" />
                        </div>

                        <div className="min-w-0">

                            <p className="truncate text-[11px] font-bold text-violet-900">
                                Education Platform
                            </p>

                            <p className="mt-0.5 truncate text-[10px] text-slate-400">
                                Manage your institution
                            </p>

                        </div>

                    </div>

                </div>

            </div>

            <div className="mb-4 px-3">

                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300">
                    Workspace
                </p>

            </div>

            <div className="flex-1 space-y-6">

                {sections.map((section) => (
                    <div key={section.section}>

                        <div className="mb-2 flex items-center gap-2 px-3">

                            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />

                            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
                                {section.section}
                            </p>

                        </div>

                        <div className="space-y-1">

                            {section.items.map((item) => {

                                const activeSubmenu = item.submenu?.some(
                                    (sub) =>
                                        location.pathname.startsWith(sub.link)
                                );

                                const isOpen =
                                    openMenu === item.name || activeSubmenu;

                                return (
                                    <div key={item.name}>

                                        {item.submenu ? (
                                            <>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        toggleMenu(item.name)
                                                    }
                                                    className={`group relative flex w-full items-center justify-between rounded-xl px-2.5 py-2 transition-all duration-200 ${isOpen
                                                        ? "bg-violet-50 text-violet-800"
                                                        : "text-slate-500 hover:bg-slate-50 hover:text-violet-700"
                                                        }`}
                                                >

                                                    <div className="flex min-w-0 items-center gap-3">

                                                        <span
                                                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-200 ${isOpen
                                                                ? "bg-violet-600 text-white shadow-md shadow-violet-200"
                                                                : "bg-slate-50 text-slate-400 group-hover:bg-violet-50 group-hover:text-violet-600"
                                                                }`}
                                                        >
                                                            {item.icon}
                                                        </span>

                                                        <span className="truncate text-[13px] font-semibold">
                                                            {item.name}
                                                        </span>

                                                    </div>

                                                    <ChevronDown
                                                        className={`h-4 w-4 shrink-0 transition-all duration-200 ${isOpen
                                                            ? "rotate-180 text-violet-600"
                                                            : "text-slate-300 group-hover:text-violet-500"
                                                            }`}
                                                    />

                                                </button>

                                                <AnimatePresence initial={false}>

                                                    {isOpen && (
                                                        <motion.div
                                                            initial={{
                                                                opacity: 0,
                                                                height: 0,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                height: "auto",
                                                            }}
                                                            exit={{
                                                                opacity: 0,
                                                                height: 0,
                                                            }}
                                                            transition={{
                                                                duration: 0.2,
                                                            }}
                                                            className="ml-7 mt-1 overflow-hidden pl-5"
                                                        >

                                                            <div className="border-l border-violet-100 pl-2">

                                                                {item.submenu.map(
                                                                    (sub) => (
                                                                        <NavLink
                                                                            key={
                                                                                sub.link
                                                                            }
                                                                            to={
                                                                                sub.link
                                                                            }
                                                                            onClick={
                                                                                handleNavigation
                                                                            }
                                                                            className={({
                                                                                isActive,
                                                                            }) =>
                                                                                `group relative flex items-center gap-2 rounded-lg px-3 py-2 text-[11px] transition-all duration-200 ${isActive
                                                                                    ? "bg-violet-50 font-bold text-violet-700"
                                                                                    : "font-medium text-slate-400 hover:bg-slate-50 hover:text-violet-600"
                                                                                }`
                                                                            }
                                                                        >
                                                                            {({
                                                                                isActive,
                                                                            }) => (
                                                                                <>
                                                                                    {isActive && (
                                                                                        <span className="absolute -left-[9px] h-4 w-0.5 rounded-full bg-violet-600" />
                                                                                    )}

                                                                                    <span className="truncate">
                                                                                        {
                                                                                            sub.name
                                                                                        }
                                                                                    </span>

                                                                                    {isActive && (
                                                                                        <FiArrowRight className="ml-auto h-3 w-3 shrink-0 text-violet-500" />
                                                                                    )}
                                                                                </>
                                                                            )}
                                                                        </NavLink>
                                                                    )
                                                                )}

                                                            </div>

                                                        </motion.div>
                                                    )}

                                                </AnimatePresence>

                                            </>
                                        ) : (
                                            <NavLink
                                                to={item.link}
                                                onClick={handleNavigation}
                                                className={({ isActive }) =>
                                                    `group relative flex items-center gap-3 rounded-xl px-2.5 py-2 transition-all duration-200 ${isActive
                                                        ? "bg-violet-600 text-white shadow-lg shadow-violet-200/50"
                                                        : "text-slate-500 hover:bg-slate-50 hover:text-violet-700"
                                                    }`
                                                }
                                            >
                                                {({ isActive }) => (
                                                    <>

                                                        <span
                                                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-200 ${isActive
                                                                ? "bg-white/15 text-white"
                                                                : "bg-slate-50 text-slate-400 group-hover:bg-violet-50 group-hover:text-violet-600"
                                                                }`}
                                                        >
                                                            {item.icon}
                                                        </span>

                                                        <span className="truncate text-[13px] font-semibold">
                                                            {item.name}
                                                        </span>

                                                        {isActive && (
                                                            <motion.span
                                                                layoutId="activeDot"
                                                                className="ml-auto h-1.5 w-1.5 rounded-full bg-lime-300"
                                                            />
                                                        )}

                                                    </>
                                                )}
                                            </NavLink>
                                        )}

                                    </div>
                                );
                            })}

                        </div>

                    </div>
                ))}

            </div>

            <div className="mt-6">

                <div className="mb-3 flex items-center gap-2 px-3">

                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

                    <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
                        Account
                    </p>

                </div>

                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-50 via-white to-cyan-50 p-3 shadow-sm ring-1 ring-violet-100/70">

                    <div className="absolute right-0 top-0 h-16 w-16 rounded-full bg-violet-200/20 blur-2xl" />

                    <div className="relative flex items-center gap-3">

                        <div className="relative shrink-0">

                            <img
                                src={
                                    myprofile?.profileImage
                                        ? `${import.meta.env.VITE_APP_API_FILES}/uploads/profile/${myprofile.profileImage}`
                                        : defaultUser
                                }
                                alt="User"
                                className="h-10 w-10 rounded-xl object-cover shadow-sm ring-2 ring-white"
                            />

                            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-lime-500" />

                        </div>

                        <div className="min-w-0 flex-1">

                            <p className="truncate text-[12px] font-extrabold text-violet-950">
                                {auth?.user?.email?.replace(
                                    /@gmail\.com$/i,
                                    ""
                                ) || "User"}
                            </p>

                            <div className="mt-1 flex items-center gap-1.5">

                                <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />

                                <p className="truncate text-[9px] font-bold uppercase tracking-wider text-violet-500">
                                    {auth?.user?.role || "User"}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="mt-3 flex items-center justify-center">

                    <p className="text-[9px] font-semibold tracking-wide text-slate-300">
                        ZensonEdu · Education SaaS
                    </p>

                </div>

            </div>

        </aside>
    );
};

export default DashSide;