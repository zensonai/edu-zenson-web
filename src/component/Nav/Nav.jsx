import React, { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import {
    FaArrowRight,
    FaBars,
    FaBookOpen,
    FaChartLine,
    FaClipboardCheck,
    FaGraduationCap,
    FaPeopleGroup,
    FaPuzzlePiece,
    FaSchool,
    FaUserTie,
} from "react-icons/fa6";

export default function Nav() {
    const [menu, setMenu] = useState(false);
    const [drop, setDrop] = useState(false);
    const [mobileDrop, setMobileDrop] = useState(false);

    const platform = [
        {
            name: "Student Management",
            description: "Manage students, profiles and academic records",
            link: "/platform",
            icon: FaPeopleGroup,
        },
        {
            name: "Courses & Programs",
            description: "Build courses, programs and learning structures",
            link: "/platform",
            icon: FaBookOpen,
        },
        {
            name: "Academic Management",
            description: "Manage classes, attendance and academic activities",
            link: "/platform",
            icon: FaGraduationCap,
        },
        {
            name: "Assessments & Exams",
            description: "Create assessments, exams and manage results",
            link: "/platform",
            icon: FaClipboardCheck,
        },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <div className="flex h-[76px] items-center justify-between">
                    <a href="/" className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center bg-violet-600 text-white">
                            <FaGraduationCap className="text-lg" />
                        </div>

                        <div>
                            <h1 className="text-[15px] font-black tracking-tight text-slate-950">
                                ZensonEdu
                            </h1>

                            <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                                Education Platform
                            </p>
                        </div>
                    </a>

                    <nav className="hidden items-center gap-8 lg:flex">
                        <a
                            href="/"
                            className="text-sm font-semibold text-violet-600 transition hover:text-violet-700"
                        >
                            Home
                        </a>

                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setDrop(!drop)}
                                className="flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-violet-600"
                            >
                                Platform

                                <ChevronDown
                                    className={`h-3.5 w-3.5 transition-transform ${
                                        drop ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            {drop && (
                                <div className="absolute left-1/2 top-full mt-5 w-[500px] -translate-x-1/2 border border-slate-200 bg-white p-3 shadow-[0_25px_70px_rgba(124,58,237,0.10)]">
                                    <div className="mb-2 px-3 py-3">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-600">
                                            ZensonEdu Platform
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-slate-400">
                                            Everything you need to operate your own
                                            education platform.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-1">
                                        {platform.map((item) => {
                                            const Icon = item.icon;

                                            return (
                                                <a
                                                    key={item.name}
                                                    href={item.link}
                                                    className="group p-4 transition hover:bg-violet-50"
                                                >
                                                    <div className="mb-3 flex h-9 w-9 items-center justify-center bg-violet-50 text-violet-600 transition group-hover:bg-violet-600 group-hover:text-white">
                                                        <Icon className="text-sm" />
                                                    </div>

                                                    <p className="text-sm font-bold text-slate-800 transition group-hover:text-violet-600">
                                                        {item.name}
                                                    </p>

                                                    <p className="mt-1 text-[11px] leading-5 text-slate-400">
                                                        {item.description}
                                                    </p>
                                                </a>
                                            );
                                        })}
                                    </div>

                                    <a
                                        href="/platform"
                                        className="mt-2 flex items-center justify-between border-t border-slate-100 px-4 py-4 text-xs font-bold text-violet-600 transition hover:bg-slate-50"
                                    >
                                        Explore the full platform

                                        <FaArrowRight className="text-[10px]" />
                                    </a>
                                </div>
                            )}
                        </div>

                        <a
                            href="/solutions"
                            className="text-sm font-semibold text-slate-600 transition hover:text-violet-600"
                        >
                            Solutions
                        </a>

                        <a
                            href="/features"
                            className="text-sm font-semibold text-slate-600 transition hover:text-violet-600"
                        >
                            Features
                        </a>

                        <a
                            href="/pricing"
                            className="text-sm font-semibold text-slate-600 transition hover:text-violet-600"
                        >
                            Pricing
                        </a>

                        <a
                            href="/resources"
                            className="text-sm font-semibold text-slate-600 transition hover:text-violet-600"
                        >
                            Resources
                        </a>
                    </nav>

                    <div className="hidden items-center gap-3 lg:flex">
                        <a
                            href="/login"
                            className="flex h-10 items-center px-4 text-xs font-bold text-slate-600 transition hover:text-violet-600"
                        >
                            Sign In
                        </a>

                        <a
                            href="/register"
                            className="flex h-10 items-center gap-2 bg-violet-600 px-5 text-xs font-bold text-white transition hover:bg-violet-700"
                        >
                            Get Started

                            <FaArrowRight className="text-[9px]" />
                        </a>
                    </div>

                    <div className="flex items-center gap-3 lg:hidden">
                        <a
                            href="/login"
                            className="hidden h-10 items-center px-3 text-xs font-bold text-slate-600 sm:flex"
                        >
                            Sign In
                        </a>

                        <button
                            type="button"
                            onClick={() => setMenu(!menu)}
                            className="flex h-10 w-10 items-center justify-center bg-violet-600 text-white transition hover:bg-violet-700"
                        >
                            {menu ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <FaBars className="text-sm" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {menu && (
                <div className="border-t border-slate-100 bg-white lg:hidden">
                    <div className="mx-auto max-w-7xl px-5 py-6 sm:px-6">
                        <div className="mb-5 border border-violet-100 bg-violet-50 p-5">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center bg-violet-600 text-white">
                                    <FaGraduationCap />
                                </div>

                                <div>
                                    <p className="text-sm font-black text-slate-900">
                                        ZensonEdu
                                    </p>

                                    <p className="mt-0.5 text-[10px] text-slate-400">
                                        Build your own education platform
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <a
                                href="/"
                                className="block px-4 py-3 text-sm font-bold text-violet-600"
                            >
                                Home
                            </a>

                            <button
                                type="button"
                                onClick={() => setMobileDrop(!mobileDrop)}
                                className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:text-violet-600"
                            >
                                Platform

                                <ChevronDown
                                    className={`h-4 w-4 transition-transform ${
                                        mobileDrop ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            {mobileDrop && (
                                <div className="space-y-1 bg-slate-50 p-2">
                                    {platform.map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <a
                                                key={item.name}
                                                href={item.link}
                                                className="flex items-center gap-3 p-3 transition hover:bg-white"
                                            >
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-violet-50 text-violet-600">
                                                    <Icon className="text-sm" />
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="text-sm font-bold text-slate-700">
                                                        {item.name}
                                                    </p>

                                                    <p className="mt-0.5 text-[11px] leading-5 text-slate-400">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </a>
                                        );
                                    })}

                                    <a
                                        href="/platform"
                                        className="flex items-center justify-between border-t border-slate-200 px-3 py-4 text-xs font-bold text-violet-600"
                                    >
                                        Explore Platform

                                        <FaArrowRight className="text-[10px]" />
                                    </a>
                                </div>
                            )}

                            <a
                                href="/solutions"
                                className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:text-violet-600"
                            >
                                <FaSchool className="text-violet-500" />
                                Solutions
                            </a>

                            <a
                                href="/features"
                                className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:text-violet-600"
                            >
                                <FaPuzzlePiece className="text-violet-500" />
                                Features
                            </a>

                            <a
                                href="/pricing"
                                className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:text-violet-600"
                            >
                                <FaChartLine className="text-violet-500" />
                                Pricing
                            </a>

                            <a
                                href="/resources"
                                className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:text-violet-600"
                            >
                                <FaBookOpen className="text-violet-500" />
                                Resources
                            </a>
                        </div>

                        <div className="mt-6 border-t border-slate-100 pt-5">
                            <a
                                href="/register"
                                className="flex h-12 w-full items-center justify-center gap-3 bg-violet-600 text-sm font-bold text-white transition hover:bg-violet-700"
                            >
                                Create Your Platform

                                <FaArrowRight className="text-xs" />
                            </a>

                            <a
                                href="/login"
                                className="mt-3 flex h-12 w-full items-center justify-center border border-slate-200 bg-white text-sm font-bold text-slate-700 transition hover:border-violet-200 hover:text-violet-600"
                            >
                                Sign In
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}