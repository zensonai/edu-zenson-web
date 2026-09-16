import React from "react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { FiBookOpen, FiArrowUpRight } from "react-icons/fi";
import { MdAutoAwesome } from "react-icons/md";

const DashFooter = () => {
    const year = new Date().getFullYear();

    const quickLinks = [
        { name: "Home", href: "https://zenson.ai/" },
        { name: "Documentation", href: "#" },
        { name: "Features", href: "#" },
        { name: "Pricing", href: "#" },
        { name: "Privacy Policy", href: "#" },
    ];

    const socials = [
        { icon: <FaTwitter />, href: "https://twitter.com" },
        { icon: <FaLinkedin />, href: "https://linkedin.com" },
        { icon: <FaGithub />, href: "https://github.com" },
    ];

    return (
        <footer className="mt-10 border-t border-violet-100 bg-white">

            <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">

                <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:gap-20">

                    <div className="space-y-5">

                        <div className="flex items-center gap-3">

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-200/60">
                                <FiBookOpen className="h-6 w-6" />
                            </div>

                            <div>
                                <h1 className="text-xl font-black tracking-tight text-violet-950">
                                    ZensonEdu
                                </h1>

                                <p className="text-xs font-semibold text-violet-500">
                                    Education SaaS Platform
                                </p>
                            </div>

                        </div>

                        <p className="max-w-sm text-sm leading-7 text-slate-500">
                            A modern education management platform designed to help institutions build, manage and grow their own digital education experience.
                        </p>

                    </div>

                    <div>

                        <h3 className="mb-6 text-sm font-bold text-violet-950">
                            Platform
                        </h3>

                        <div className="flex flex-col gap-4">

                            {quickLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex w-fit items-center gap-1 text-sm font-medium text-slate-500 transition hover:text-violet-600"
                                >
                                    {link.name}

                                    {link.href !== "#" && (
                                        <FiArrowUpRight className="h-3.5 w-3.5" />
                                    )}
                                </a>
                            ))}

                        </div>

                    </div>

                    <div>

                        <h3 className="mb-6 text-sm font-bold text-violet-950">
                            Connect With Us
                        </h3>

                        <div className="mb-6 flex items-center gap-3 rounded-xl bg-gradient-to-r from-violet-50 to-cyan-50 px-4 py-3">

                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-violet-600 shadow-sm">
                                <MdAutoAwesome className="h-5 w-5" />
                            </div>

                            <span className="text-xs font-semibold leading-5 text-violet-700">
                                Building smarter digital education platforms
                            </span>

                        </div>

                        <div className="flex gap-3">

                            {socials.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition hover:bg-violet-600 hover:text-white hover:shadow-lg hover:shadow-violet-200"
                                >
                                    {social.icon}
                                </a>
                            ))}

                        </div>

                    </div>

                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-violet-50 pt-7 md:flex-row">

                    <p className="text-center text-xs text-slate-400 md:text-left">
                        © {year} ZensonEdu. All rights reserved | Developed and Maintained by{" "}
                        <a
                            href="https://zenson.ai/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-violet-600 transition hover:text-violet-700"
                        >
                            Zenson.ai
                        </a>
                    </p>

                    <p className="text-xs font-medium text-slate-400">
                        Education SaaS Platform
                    </p>

                </div>

            </div>

        </footer>
    );
};

export default DashFooter;