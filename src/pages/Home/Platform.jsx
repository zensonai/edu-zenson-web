import React from "react";
import {
    FaArrowRight,
    FaBrain,
    FaBuilding,
    FaBullhorn,
    FaCertificate,
    FaChartLine,
    FaCheck,
    FaClipboardCheck,
    FaDatabase,
    FaGraduationCap,
    FaPeopleGroup,
    FaRobot,
    FaSchool,
    FaShieldHalved,
    FaUserTie,
} from "react-icons/fa6";

const platformModules = [
    {
        title: "Student Management",
        description:
            "Manage student profiles, enrolments, academic records, and student information from one central platform.",
        icon: FaGraduationCap,
        bg: "bg-violet-50",
        iconColor: "text-violet-600",
    },
    {
        title: "Instructor Management",
        description:
            "Organize instructors, lecturers, responsibilities, classes, and academic activities.",
        icon: FaUserTie,
        bg: "bg-cyan-50",
        iconColor: "text-cyan-600",
    },
    {
        title: "Courses & Programs",
        description:
            "Create and manage courses, subjects, programs, classes, and structured learning content.",
        icon: FaSchool,
        bg: "bg-fuchsia-50",
        iconColor: "text-fuchsia-600",
    },
    {
        title: "Academic Management",
        description:
            "Manage academic structures, classes, attendance, schedules, and student academic activities.",
        icon: FaPeopleGroup,
        bg: "bg-emerald-50",
        iconColor: "text-emerald-600",
    },
    {
        title: "Assessments & Exams",
        description:
            "Create assessments, manage examinations, record results, and support academic evaluation.",
        icon: FaClipboardCheck,
        bg: "bg-amber-50",
        iconColor: "text-amber-600",
    },
    {
        title: "Certificates",
        description:
            "Manage certificates and recognize student achievements through your digital platform.",
        icon: FaCertificate,
        bg: "bg-pink-50",
        iconColor: "text-pink-600",
    },
    {
        title: "Announcements",
        description:
            "Keep students, instructors, and staff informed through centralized announcements and communication.",
        icon: FaBullhorn,
        bg: "bg-sky-50",
        iconColor: "text-sky-600",
    },
    {
        title: "Analytics",
        description:
            "Understand academic activity and institutional performance through useful reports and analytics.",
        icon: FaChartLine,
        bg: "bg-indigo-50",
        iconColor: "text-indigo-600",
    },
    {
        title: "Access Control",
        description:
            "Control platform access with roles, permissions, and secure institution-level authorization.",
        icon: FaShieldHalved,
        bg: "bg-violet-50",
        iconColor: "text-violet-600",
    },
];

const aiCapabilities = [
    "LLM-powered AI assistant",
    "Institution-specific knowledge",
    "Vector embeddings",
    "Semantic search",
    "Retrieval-augmented generation",
    "AI question answering",
    "Resource-based responses",
    "AI knowledge management",
];

const platformBenefits = [
    {
        title: "Your own platform",
        description:
            "Create a dedicated digital education platform for your institution with your own identity and configuration.",
    },
    {
        title: "Centralized management",
        description:
            "Bring students, instructors, courses, academics, assessments, and communication into one system.",
    },
    {
        title: "Scalable architecture",
        description:
            "Start with essential capabilities and expand your platform as your institution grows.",
    },
    {
        title: "AI-ready education",
        description:
            "Growth and Enterprise plans can extend the platform with LLM, vector search, and RAG capabilities.",
    },
];

const Platform = () => {
    return (
        <main className="min-h-screen bg-white">

            <section className="relative overflow-hidden bg-violet-50/60 px-5 pb-20 pt-20 sm:px-6 lg:px-8 lg:pb-28 lg:pt-28">
                <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-200/50 blur-3xl" />

                <div className="absolute -bottom-40 -right-32 h-[450px] w-[450px] rounded-full bg-cyan-100/60 blur-3xl" />

                <div className="relative mx-auto max-w-5xl text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center bg-white text-violet-600 shadow-lg shadow-violet-100">
                        <FaGraduationCap className="text-2xl" />
                    </div>

                    <p className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-cyan-600">
                        ZensonEdu Platform
                    </p>

                    <h1 className="mt-4 text-4xl font-black tracking-tight text-violet-900 sm:text-5xl lg:text-6xl">
                        Your institution.
                        <span className="block bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
                            Your education platform.
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-gray-500 sm:text-lg">
                        ZensonEdu gives schools, academies, training institutes,
                        and higher education organizations the tools to build,
                        manage, and grow their own digital education platform.
                    </p>

                    <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center gap-3 bg-violet-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"
                        >
                            Create Your Platform
                            <FaArrowRight className="text-xs" />
                        </a>

                        <a
                            href="/pricing"
                            className="inline-flex items-center justify-center bg-white px-7 py-3.5 text-sm font-bold text-violet-600 shadow-sm ring-1 ring-violet-100 transition hover:bg-violet-50"
                        >
                            Explore Plans
                        </a>
                    </div>
                </div>
            </section>

            <section className="px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600">
                            Complete Education Platform
                        </p>

                        <h2 className="mt-3 text-3xl font-black text-violet-900 sm:text-4xl">
                            Everything your institution needs
                        </h2>

                        <p className="mt-4 text-base leading-7 text-gray-500">
                            Manage the core operations of your institution
                            through one connected education platform.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {platformModules.map((module) => {
                            const Icon = module.icon;

                            return (
                                <div
                                    key={module.title}
                                    className="group bg-white p-7 shadow-lg shadow-violet-100/40 ring-1 ring-violet-100 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >
                                    <div
                                        className={`flex h-12 w-12 items-center justify-center ${module.bg}`}
                                    >
                                        <Icon
                                            className={`text-xl ${module.iconColor}`}
                                        />
                                    </div>

                                    <h3 className="mt-6 text-lg font-bold text-violet-900">
                                        {module.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-gray-500">
                                        {module.description}
                                    </p>

                                    <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-violet-600 transition group-hover:gap-3">
                                        Learn more
                                        <FaArrowRight className="text-xs" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-violet-50/50 px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600">
                                AI-Powered Platform
                            </p>

                            <h2 className="mt-3 text-3xl font-black text-violet-900 sm:text-4xl">
                                Turn your institution's knowledge into an
                                intelligent education assistant
                            </h2>

                            <p className="mt-5 text-base leading-8 text-gray-500">
                                ZensonEdu can extend your education platform with
                                an AI layer that combines large language models,
                                vector search, and retrieval-augmented generation.
                                Your institution can provide AI assistance based
                                on its own educational resources and knowledge.
                            </p>

                            <a
                                href="/contact"
                                className="mt-7 inline-flex items-center gap-3 bg-cyan-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-100 transition hover:bg-cyan-600"
                            >
                                Discuss AI Features
                                <FaArrowRight className="text-xs" />
                            </a>
                        </div>

                        <div className="bg-white p-7 shadow-xl shadow-violet-100/50 ring-1 ring-violet-100 sm:p-9">
                            <div className="flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center bg-violet-50 text-violet-600">
                                    <FaBrain className="text-2xl" />
                                </div>

                                <div>
                                    <h3 className="text-xl font-black text-violet-900">
                                        ZensonEdu AI
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-500">
                                        LLM + Vector Search + RAG
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 space-y-4">
                                {aiCapabilities.map((feature) => (
                                    <div
                                        key={feature}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="flex h-5 w-5 shrink-0 items-center justify-center bg-cyan-50 text-cyan-600">
                                            <FaCheck className="text-[9px]" />
                                        </div>

                                        <span className="text-sm font-medium text-gray-600">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 grid grid-cols-3 gap-3">
                                <div className="bg-violet-50 p-4 text-center">
                                    <FaDatabase className="mx-auto text-violet-600" />

                                    <p className="mt-2 text-xs font-bold text-violet-800">
                                        Vector
                                    </p>
                                </div>

                                <div className="bg-cyan-50 p-4 text-center">
                                    <FaRobot className="mx-auto text-cyan-600" />

                                    <p className="mt-2 text-xs font-bold text-cyan-800">
                                        LLM
                                    </p>
                                </div>

                                <div className="bg-fuchsia-50 p-4 text-center">
                                    <FaBrain className="mx-auto text-fuchsia-600" />

                                    <p className="mt-2 text-xs font-bold text-fuchsia-800">
                                        RAG
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600">
                            How It Works
                        </p>

                        <h2 className="mt-3 text-3xl font-black text-violet-900 sm:text-4xl">
                            One connected platform
                        </h2>

                        <p className="mt-4 text-base leading-7 text-gray-500">
                            ZensonEdu connects your institution's people,
                            academic operations, data, and intelligent services.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        <div className="bg-violet-50 p-7">
                            <div className="flex h-12 w-12 items-center justify-center bg-white text-violet-600">
                                <FaSchool className="text-xl" />
                            </div>

                            <p className="mt-5 text-sm font-bold text-violet-600">
                                01
                            </p>

                            <h3 className="mt-2 text-xl font-black text-violet-900">
                                Build your platform
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-gray-500">
                                Configure a dedicated education platform for
                                your institution and its academic structure.
                            </p>
                        </div>

                        <div className="bg-cyan-50 p-7">
                            <div className="flex h-12 w-12 items-center justify-center bg-white text-cyan-600">
                                <FaPeopleGroup className="text-xl" />
                            </div>

                            <p className="mt-5 text-sm font-bold text-cyan-600">
                                02
                            </p>

                            <h3 className="mt-2 text-xl font-black text-violet-900">
                                Manage education
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-gray-500">
                                Bring students, instructors, courses, classes,
                                attendance, assessments, and results together.
                            </p>
                        </div>

                        <div className="bg-fuchsia-50 p-7">
                            <div className="flex h-12 w-12 items-center justify-center bg-white text-fuchsia-600">
                                <FaRobot className="text-xl" />
                            </div>

                            <p className="mt-5 text-sm font-bold text-fuchsia-600">
                                03
                            </p>

                            <h3 className="mt-2 text-xl font-black text-violet-900">
                                Add intelligent capabilities
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-gray-500">
                                Growth and Enterprise institutions can extend
                                their platform with LLM, vector search, and RAG.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-cyan-50/50 px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600">
                                Platform Benefits
                            </p>

                            <h2 className="mt-3 text-3xl font-black text-violet-900 sm:text-4xl">
                                Designed to grow with you
                            </h2>

                            <p className="mt-5 leading-7 text-gray-500">
                                Start with essential education management and
                                expand into advanced academic, administrative,
                                and AI capabilities as your organization grows.
                            </p>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            {platformBenefits.map((benefit, index) => (
                                <div
                                    key={benefit.title}
                                    className="bg-white p-6 shadow-sm ring-1 ring-cyan-100"
                                >
                                    <div className="flex h-9 w-9 items-center justify-center bg-cyan-50 text-sm font-black text-cyan-600">
                                        0{index + 1}
                                    </div>

                                    <h3 className="mt-5 text-lg font-bold text-violet-900">
                                        {benefit.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-gray-500">
                                        {benefit.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-6 md:grid-cols-3">

                        <div className="bg-white p-7 shadow-lg shadow-violet-100/40 ring-1 ring-violet-100">
                            <FaGraduationCap className="text-2xl text-violet-600" />

                            <h3 className="mt-5 text-xl font-black text-violet-900">
                                For Schools & Academies
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-gray-500">
                                Manage students, instructors, classes,
                                attendance, courses, assessments, and
                                communication.
                            </p>

                            <a
                                href="/solutions/schools"
                                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-violet-600"
                            >
                                Explore solution
                                <FaArrowRight className="text-xs" />
                            </a>
                        </div>

                        <div className="bg-white p-7 shadow-lg shadow-cyan-100/40 ring-1 ring-cyan-100">
                            <FaSchool className="text-2xl text-cyan-600" />

                            <h3 className="mt-5 text-xl font-black text-violet-900">
                                For Training Institutes
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-gray-500">
                                Organize learners, programs, instructors,
                                schedules, assessments, exams, and certificates.
                            </p>

                            <a
                                href="/solutions/institutes"
                                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyan-600"
                            >
                                Explore solution
                                <FaArrowRight className="text-xs" />
                            </a>
                        </div>

                        <div className="bg-white p-7 shadow-lg shadow-fuchsia-100/40 ring-1 ring-fuchsia-100">
                            <FaBuilding className="text-2xl text-fuchsia-600" />

                            <h3 className="mt-5 text-xl font-black text-violet-900">
                                For Higher Education
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-gray-500">
                                Support academic programs, student information,
                                examinations, results, analytics, and
                                institution-wide management.
                            </p>

                            <a
                                href="/solutions/higher-education"
                                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-fuchsia-600"
                            >
                                Explore solution
                                <FaArrowRight className="text-xs" />
                            </a>
                        </div>

                    </div>
                </div>
            </section>

            <section className="px-5 pb-20 sm:px-6 lg:px-8 lg:pb-24">
                <div className="mx-auto max-w-5xl bg-gradient-to-r from-violet-600 to-cyan-500 px-7 py-12 text-center shadow-2xl shadow-violet-200 sm:px-12 lg:py-16">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center bg-white/15 text-white">
                        <FaGraduationCap className="text-xl" />
                    </div>

                    <h2 className="mt-6 text-3xl font-black text-white sm:text-4xl">
                        Build your education platform with ZensonEdu
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
                        Start with the core platform and scale into advanced
                        academic management, analytics, and AI-powered
                        education.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center gap-3 bg-white px-7 py-3.5 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
                        >
                            Create Your Platform
                            <FaArrowRight className="text-xs" />
                        </a>

                        <a
                            href="/pricing"
                            className="inline-flex items-center justify-center bg-white/10 px-7 py-3.5 text-sm font-bold text-white ring-1 ring-white/30 transition hover:bg-white/15"
                        >
                            View Pricing
                        </a>
                    </div>
                </div>
            </section>

        </main>
    );
};

export default Platform;