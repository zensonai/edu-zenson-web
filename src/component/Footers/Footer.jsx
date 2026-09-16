import React from "react";
import {
    FaArrowRight,
    FaFacebookF,
    FaGraduationCap,
    FaLinkedinIn,
    FaPuzzlePiece,
    FaYoutube,
} from "react-icons/fa6";

const platformLinks = [
    {
        label: "Platform Overview",
        href: "/platform",
    },
    {
        label: "Student Management",
        href: "/platform/students",
    },
    {
        label: "Courses & Programs",
        href: "/platform/courses",
    },
    {
        label: "Academic Management",
        href: "/platform/academics",
    },
    {
        label: "Assessments & Exams",
        href: "/platform/assessments",
    },
];

const solutionLinks = [
    {
        label: "Schools & Academies",
        href: "/solutions/schools",
    },
    {
        label: "Training Institutes",
        href: "/solutions/institutes",
    },
    {
        label: "Higher Education",
        href: "/solutions/higher-education",
    },
    {
        label: "Pricing",
        href: "/pricing",
    },
    {
        label: "Sign In",
        href: "/login",
    },
];

const socialLinks = [
    {
        label: "Facebook",
        href: "#",
        icon: FaFacebookF,
        className:
            "bg-violet-50 text-violet-500 hover:bg-violet-600 hover:text-white",
    },
    {
        label: "LinkedIn",
        href: "#",
        icon: FaLinkedinIn,
        className:
            "bg-cyan-50 text-cyan-600 hover:bg-cyan-500 hover:text-white",
    },
    {
        label: "YouTube",
        href: "#",
        icon: FaYoutube,
        className:
            "bg-fuchsia-50 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-white",
    },
];

const Footer = () => {
    return (
        <footer className="border-t border-violet-100 bg-white">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <div className="py-16 lg:py-20">
                    <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">

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

                            <p className="mt-6 max-w-md text-sm leading-7 text-gray-500">
                                A modern education SaaS platform that lets institutions
                                create, manage, and grow their own digital education
                                platform for students, instructors, and academic teams.
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
                                            className={`flex h-10 w-10 items-center justify-center transition ${item.className}`}
                                        >
                                            <Icon className="text-xs" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-violet-800">
                                Platform
                            </h3>

                            <div className="mt-6 space-y-4">
                                {platformLinks.map((item) => (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        className="block text-sm text-gray-500 transition hover:text-violet-600"
                                    >
                                        {item.label}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-violet-800">
                                Solutions
                            </h3>

                            <div className="mt-6 space-y-4">
                                {solutionLinks.map((item) => (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        className="block text-sm text-gray-500 transition hover:text-violet-600"
                                    >
                                        {item.label}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-violet-800">
                                Get Started
                            </h3>

                            <div className="mt-6">
                                <div className="flex h-12 w-12 items-center justify-center bg-cyan-50 text-cyan-600">
                                    <FaPuzzlePiece className="text-lg" />
                                </div>

                                <p className="mt-5 text-sm font-bold text-violet-800">
                                    Build your own education platform
                                </p>

                                <p className="mt-2 text-sm leading-6 text-gray-500">
                                    Choose a plan and launch a dedicated platform
                                    for your institution.
                                </p>

                                <a
                                    href="/register"
                                    className="mt-6 inline-flex items-center gap-3 bg-violet-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-violet-700"
                                >
                                    Create Your Platform
                                    <FaArrowRight className="text-xs" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-violet-100">
                    <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs text-gray-500">
                            © {new Date().getFullYear()} ZensonEdu. All rights reserved. | Developed and Maintained by{" "}
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