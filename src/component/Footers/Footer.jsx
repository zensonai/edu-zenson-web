import React from "react";

import {
    FaArrowRight,
    FaFacebookF,
    FaGraduationCap,
    FaLinkedinIn,
    FaPuzzlePiece,
} from "react-icons/fa6";

const socialLinks = [
    {
        label: "Facebook",
        href: "https://www.facebook.com/people/Zenson/100091384830986/",
        icon: FaFacebookF,
        className:
            "bg-violet-50 text-violet-500 hover:bg-violet-600 hover:text-white",
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/zenson-iot/",
        icon: FaLinkedinIn,
        className:
            "bg-cyan-50 text-cyan-600 hover:bg-cyan-500 hover:text-white",
    },
];

const Footer = () => {
    return (
        <footer className="border-t border-violet-100 bg-white">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <div className="py-16 lg:py-20">
                    <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
                        <div>
                            <div className="inline-flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center bg-violet-50 text-violet-600">
                                    <FaGraduationCap className="text-xl" />
                                </div>

                                <div>
                                    <h2 className="text-lg font-black tracking-tight text-violet-800">
                                        ZensonEdu
                                    </h2>

                                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-600">
                                        Education Platform
                                    </p>
                                </div>
                            </div>

                            <p className="mt-6 max-w-lg text-sm leading-7 text-gray-500">
                                A modern education SaaS platform that helps institutions
                                create, manage, and grow their own digital education
                                ecosystem for students, instructors, and academic teams.
                            </p>

                            <a
                                href="/platform"
                                className="group mt-7 inline-flex items-center gap-3 text-sm font-bold text-violet-600 transition hover:text-violet-700"
                            >
                                Explore Platform
                                <FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
                            </a>

                            <div className="mt-8 flex items-center gap-2">
                                {socialLinks.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <a
                                            key={item.label}
                                            href={item.href}
                                            aria-label={item.label}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex h-10 w-10 items-center justify-center transition ${item.className}`}
                                        >
                                            <Icon className="text-xs" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="lg:pl-10">
                            <div className="border border-violet-100 bg-violet-50/50 p-7 sm:p-8">
                                <div className="flex items-start justify-between gap-6">
                                    <div>
                                        <div className="flex h-12 w-12 items-center justify-center bg-white text-violet-600 shadow-sm">
                                            <FaPuzzlePiece className="text-lg" />
                                        </div>

                                        <p className="mt-6 text-lg font-black tracking-tight text-violet-800">
                                            Build your own education platform
                                        </p>

                                        <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
                                            Give your institution a dedicated digital
                                            platform built around your students,
                                            instructors, courses, and academic workflow.
                                        </p>
                                    </div>
                                </div>

                                <a
                                    href="/register"
                                    className="group mt-7 inline-flex items-center gap-3 bg-violet-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-violet-700"
                                >
                                    Create Your Platform
                                    <FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-violet-100">
                    <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs text-gray-500">
                            © {new Date().getFullYear()} ZensonEdu. All rights reserved.
                            {" "} | Developed and Maintained by{" "}
                            <a
                                href="https://zenson.ai/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-gray-600 transition hover:text-violet-600"
                            >
                                Zenson AI
                            </a>
                        </p>

                        <div className="flex items-center gap-6">
                            <a
                                href="/privacy"
                                className="text-xs text-gray-500 transition hover:text-violet-600"
                            >
                                Privacy Policy
                            </a>

                            <a
                                href="/terms"
                                className="text-xs text-gray-500 transition hover:text-violet-600"
                            >
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;