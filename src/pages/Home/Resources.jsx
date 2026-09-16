import React from "react";
import {
    FaArrowRight,
    FaBookOpen,
    FaCircleQuestion,
    FaGraduationCap,
    FaLightbulb,
    FaPlay,
    FaRocket,
    FaShieldHalved,
    FaUserTie,
} from "react-icons/fa6";

const resourceCategories = [
    {
        title: "Getting Started",
        description: "Learn how to create and launch your education platform with ZensonEdu.",
        icon: FaRocket,
        bg: "bg-violet-50",
        iconColor: "text-violet-600",
        link: "#getting-started",
    },
    {
        title: "Platform Guides",
        description: "Explore practical guides for managing students, courses, instructors, and academics.",
        icon: FaBookOpen,
        bg: "bg-cyan-50",
        iconColor: "text-cyan-600",
        link: "#platform-guides",
    },
    {
        title: "Tutorials",
        description: "Follow step-by-step tutorials to get more from your ZensonEdu platform.",
        icon: FaPlay,
        bg: "bg-fuchsia-50",
        iconColor: "text-fuchsia-600",
        link: "#tutorials",
    },
    {
        title: "Best Practices",
        description: "Discover ideas and strategies for building better digital learning experiences.",
        icon: FaLightbulb,
        bg: "bg-amber-50",
        iconColor: "text-amber-600",
        link: "#best-practices",
    },
];

const featuredResources = [
    {
        category: "Getting Started",
        title: "How to launch your education platform",
        description:
            "A simple guide to setting up your institution, branding your platform, and preparing it for students and instructors.",
        icon: FaRocket,
        bg: "bg-violet-50",
        iconColor: "text-violet-600",
        href: "#",
    },
    {
        category: "Platform Guide",
        title: "Managing students and instructors",
        description:
            "Learn how to organize users, assign roles, manage access, and keep your academic community connected.",
        icon: FaUserTie,
        bg: "bg-cyan-50",
        iconColor: "text-cyan-600",
        href: "#",
    },
    {
        category: "Platform Guide",
        title: "Building courses and programs",
        description:
            "Create structured courses and academic programs with the tools your institution needs.",
        icon: FaBookOpen,
        bg: "bg-fuchsia-50",
        iconColor: "text-fuchsia-600",
        href: "#",
    },
    {
        category: "Security",
        title: "Understanding platform access",
        description:
            "Learn how role-based access and permissions help keep your institution's platform organized and secure.",
        icon: FaShieldHalved,
        bg: "bg-emerald-50",
        iconColor: "text-emerald-600",
        href: "#",
    },
    {
        category: "Tutorial",
        title: "Getting the most from your dashboard",
        description:
            "Understand the main areas of your platform and quickly find the tools you use every day.",
        icon: FaGraduationCap,
        bg: "bg-sky-50",
        iconColor: "text-sky-600",
        href: "#",
    },
    {
        category: "FAQ",
        title: "Frequently asked questions",
        description:
            "Find quick answers about creating, managing, and growing your education platform.",
        icon: FaCircleQuestion,
        bg: "bg-pink-50",
        iconColor: "text-pink-600",
        href: "#",
    },
];

const quickLinks = [
    {
        title: "Documentation",
        description: "Explore platform documentation and helpful guides.",
        href: "#documentation",
    },
    {
        title: "Tutorials",
        description: "Follow practical step-by-step tutorials.",
        href: "#tutorials",
    },
    {
        title: "FAQs",
        description: "Get answers to common platform questions.",
        href: "#faq",
    },
    {
        title: "Contact Support",
        description: "Need help? Get in touch with the ZensonEdu team.",
        href: "#support",
    },
];

const Resources = () => {
    return (
        <div className="min-h-screen bg-white text-gray-700">

            <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-cyan-50">
                <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-violet-200/30 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-200/30 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
                    <div className="mx-auto max-w-4xl text-center">

                        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-violet-600 shadow-sm ring-1 ring-violet-100">
                            <FaBookOpen className="text-sm" />
                            ZensonEdu Resources
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                            Everything you need to{" "}
                            <span className="text-violet-600">
                                build and grow
                            </span>{" "}
                            your education platform.
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-500 sm:text-lg">
                            Explore guides, tutorials, best practices, and helpful
                            resources designed to help your institution get the most
                            from ZensonEdu.
                        </p>

                        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                            <a
                                href="#resources"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-violet-700"
                            >
                                Explore Resources
                                <FaArrowRight className="text-xs" />
                            </a>

                            <a
                                href="#getting-started"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-violet-600 shadow-sm ring-1 ring-violet-100 transition hover:bg-violet-50"
                            >
                                Get Started
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section
                id="resources"
                className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
            >
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wider text-violet-600">
                        Explore
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                        Resources for every stage
                    </h2>

                    <p className="mt-4 text-gray-500">
                        Whether you're just getting started or already running
                        your platform, find the resources you need.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {resourceCategories.map((resource) => {
                        const Icon = resource.icon;

                        return (
                            <a
                                key={resource.title}
                                href={resource.link}
                                className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-violet-100 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${resource.bg}`}
                                >
                                    <Icon
                                        className={`text-xl ${resource.iconColor}`}
                                    />
                                </div>

                                <h3 className="mt-5 text-lg font-semibold text-gray-900">
                                    {resource.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-gray-500">
                                    {resource.description}
                                </p>

                                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-600 transition group-hover:gap-3">
                                    Explore
                                    <FaArrowRight className="text-xs" />
                                </div>
                            </a>
                        );
                    })}
                </div>
            </section>

            <section
                id="getting-started"
                className="bg-violet-50/60 py-16 sm:py-20"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wider text-violet-600">
                                Featured Resources
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                                Start with the essentials
                            </h2>

                            <p className="mt-3 max-w-2xl text-gray-500">
                                Practical resources to help you understand the
                                platform and start building your institution.
                            </p>
                        </div>

                        <a
                            href="#"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 transition hover:text-violet-700"
                        >
                            View all resources
                            <FaArrowRight className="text-xs" />
                        </a>
                    </div>

                    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {featuredResources.map((resource) => {
                            const Icon = resource.icon;

                            return (
                                <a
                                    key={resource.title}
                                    href={resource.href}
                                    className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-violet-100 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <div className="flex items-center justify-between">
                                        <div
                                            className={`flex h-11 w-11 items-center justify-center rounded-xl ${resource.bg}`}
                                        >
                                            <Icon
                                                className={`text-lg ${resource.iconColor}`}
                                            />
                                        </div>

                                        <span className="text-xs font-semibold text-violet-500">
                                            {resource.category}
                                        </span>
                                    </div>

                                    <h3 className="mt-5 text-lg font-semibold text-gray-900">
                                        {resource.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-gray-500">
                                        {resource.description}
                                    </p>

                                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-600 transition group-hover:gap-3">
                                        Read guide
                                        <FaArrowRight className="text-xs" />
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section
                id="platform-guides"
                className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
            >
                <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

                    <div>
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50">
                            <FaGraduationCap className="text-2xl text-cyan-600" />
                        </div>

                        <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-cyan-600">
                            Build with confidence
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                            Learn how to make the most of your platform
                        </h2>

                        <p className="mt-5 leading-7 text-gray-500">
                            ZensonEdu gives institutions the tools to manage
                            students, instructors, courses, academic activities,
                            assessments, certificates, and communication in one
                            platform.
                        </p>

                        <a
                            href="#documentation"
                            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-cyan-600"
                        >
                            Explore Documentation
                            <FaArrowRight className="text-xs" />
                        </a>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {quickLinks.map((link) => (
                            <a
                                key={link.title}
                                href={link.href}
                                className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-cyan-100 transition hover:-translate-y-1 hover:shadow-md"
                            >
                                <h3 className="font-semibold text-gray-900">
                                    {link.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-gray-500">
                                    {link.description}
                                </p>

                                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-cyan-600 transition group-hover:gap-3">
                                    Explore
                                    <FaArrowRight className="text-xs" />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <section
                id="tutorials"
                className="px-4 pb-20 sm:px-6 lg:px-8"
            >
                <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-14 text-center sm:px-12">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-white">
                        <FaRocket className="text-2xl" />
                    </div>

                    <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
                        Ready to build your education platform?
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/85">
                        Start creating your institution's digital platform with
                        ZensonEdu and bring your students, instructors, courses,
                        and academic operations together.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <a
                            href="/signup"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-violet-600 transition hover:bg-violet-50"
                        >
                            Create Your Platform
                            <FaArrowRight className="text-xs" />
                        </a>

                        <a
                            href="/pricing"
                            className="inline-flex items-center justify-center rounded-xl border border-white/40 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                        >
                            View Plans
                        </a>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Resources;