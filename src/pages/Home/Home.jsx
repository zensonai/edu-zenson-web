import React from "react";
import {
    FaArrowRight,
    FaBookOpen,
    FaBullhorn,
    FaCertificate,
    FaChartLine,
    FaCheck,
    FaChevronRight,
    FaClipboardCheck,
    FaGraduationCap,
    FaMagnifyingGlass,
    FaPeopleGroup,
    FaRegClock,
    FaShieldHalved,
    FaUserTie,
} from "react-icons/fa6";

const Home = () => {
    const features = [
        {
            icon: FaGraduationCap,
            title: "Your Own Education Platform",
            description:
                "Create a dedicated education platform for your institution with your own users, courses, branding and academic structure.",
        },
        {
            icon: FaBookOpen,
            title: "Courses & Programs",
            description:
                "Create programs, courses, modules and learning content while keeping your entire academic structure organized.",
        },
        {
            icon: FaPeopleGroup,
            title: "Students & Instructors",
            description:
                "Manage students, instructors, staff and their access from one centralized education management platform.",
        },
        {
            icon: FaChartLine,
            title: "Academic Management",
            description:
                "Manage attendance, assessments, results, schedules and academic progress without using multiple systems.",
        },
        {
            icon: FaClipboardCheck,
            title: "Assessments & Exams",
            description:
                "Create assessments, manage submissions, record results and keep academic evaluation connected to each course.",
        },
        {
            icon: FaCertificate,
            title: "Certificates",
            description:
                "Issue professional digital certificates and keep certificate records connected to student achievements.",
        },
    ];

    const platformFeatures = [
        "Multi-tenant education platform",
        "Custom institution branding",
        "Student and instructor management",
        "Courses and academic programs",
        "Attendance and class management",
        "Assignments and assessments",
        "Exams and results",
        "Certificates and achievements",
        "Announcements and communication",
        "Role-based access control",
        "Academic analytics",
        "Cloud-based access",
    ];

    const solutions = [
        {
            number: "01",
            title: "Schools & Academies",
            description:
                "Build a complete digital platform for managing students, teachers, courses and academic activities.",
        },
        {
            number: "02",
            title: "Training Institutes",
            description:
                "Manage professional courses, learners, instructors, assessments and certificates from one place.",
        },
        {
            number: "03",
            title: "Higher Education",
            description:
                "Organize programs, modules, students, academic records, examinations and institutional workflows.",
        },
    ];

    return (
        <div className="overflow-hidden bg-white text-slate-900">
            <section className="relative border-b border-slate-100 bg-white">
                <div className="absolute right-0 top-0 h-[520px] w-[520px] translate-x-1/3 -translate-y-1/3 rounded-full bg-violet-50" />

                <div className="absolute bottom-0 left-0 h-[360px] w-[360px] -translate-x-1/3 translate-y-1/3 rounded-full bg-cyan-50" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid min-h-[720px] items-center gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:py-24">
                        <div>
                            <div className="inline-flex items-center gap-3 border border-violet-100 bg-violet-50 px-4 py-2">
                                <span className="h-2 w-2 bg-violet-500" />

                                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-violet-700">
                                    Education SaaS Platform
                                </span>
                            </div>

                            <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-[72px]">
                                Build your own
                                <span className="block text-violet-600">
                                    education platform.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-xl text-base leading-8 text-slate-500 sm:text-lg">
                                ZensonEdu gives schools, academies, institutes and
                                education providers everything they need to create
                                and manage their own digital education platform.
                            </p>

                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <a
                                    href="/register"
                                    className="inline-flex items-center justify-center gap-3 bg-violet-600 px-7 py-4 text-sm font-bold text-white transition hover:bg-violet-700"
                                >
                                    Create Your Platform
                                    <FaArrowRight className="text-xs" />
                                </a>

                                <a
                                    href="/pricing"
                                    className="inline-flex items-center justify-center gap-3 border border-slate-200 bg-white px-7 py-4 text-sm font-bold text-slate-700 transition hover:border-violet-200 hover:text-violet-600"
                                >
                                    View Plans
                                    <FaChevronRight className="text-xs" />
                                </a>
                            </div>

                            <div className="mt-11 grid max-w-xl grid-cols-1 gap-4 border-t border-slate-100 pt-7 sm:grid-cols-3 sm:gap-0">
                                <div className="flex items-center gap-3 sm:border-r sm:border-slate-200 sm:pr-5">
                                    <FaShieldHalved className="text-violet-500" />

                                    <div>
                                        <p className="text-xs font-bold text-slate-800">
                                            Secure
                                        </p>

                                        <p className="mt-1 text-[10px] text-slate-400">
                                            Role-based access
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 sm:px-5 sm:border-r sm:border-slate-200">
                                    <FaRegClock className="text-violet-500" />

                                    <div>
                                        <p className="text-xs font-bold text-slate-800">
                                            Cloud Based
                                        </p>

                                        <p className="mt-1 text-[10px] text-slate-400">
                                            Access anywhere
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 sm:pl-5">
                                    <FaChartLine className="text-violet-500" />

                                    <div>
                                        <p className="text-xs font-bold text-slate-800">
                                            Scalable
                                        </p>

                                        <p className="mt-1 text-[10px] text-slate-400">
                                            Built to grow
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="mx-auto max-w-[500px]">
                                <div className="border border-slate-200 bg-white p-3 shadow-[0_30px_80px_rgba(124,58,237,0.10)]">
                                    <div className="border border-slate-100 bg-slate-50 p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center bg-violet-600 text-white">
                                                    <FaGraduationCap />
                                                </div>

                                                <div>
                                                    <p className="text-xs font-black text-slate-900">
                                                        ZensonEdu
                                                    </p>

                                                    <p className="text-[9px] text-slate-400">
                                                        Education Platform
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="h-8 w-8 bg-white" />
                                        </div>

                                        <div className="mt-5 grid gap-3 sm:grid-cols-3">
                                            <div className="bg-white p-4">
                                                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                                                    Students
                                                </p>

                                                <p className="mt-2 text-2xl font-black text-slate-900">
                                                    2,480
                                                </p>

                                                <p className="mt-1 text-[9px] font-semibold text-emerald-500">
                                                    +12.8%
                                                </p>
                                            </div>

                                            <div className="bg-white p-4">
                                                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                                                    Courses
                                                </p>

                                                <p className="mt-2 text-2xl font-black text-slate-900">
                                                    86
                                                </p>

                                                <p className="mt-1 text-[9px] font-semibold text-violet-500">
                                                    Active
                                                </p>
                                            </div>

                                            <div className="bg-white p-4">
                                                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                                                    Instructors
                                                </p>

                                                <p className="mt-2 text-2xl font-black text-slate-900">
                                                    42
                                                </p>

                                                <p className="mt-1 text-[9px] font-semibold text-cyan-500">
                                                    Online
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-3 bg-white p-5">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-xs font-bold text-slate-900">
                                                        Academic Overview
                                                    </p>

                                                    <p className="mt-1 text-[9px] text-slate-400">
                                                        Student engagement
                                                    </p>
                                                </div>

                                                <FaChartLine className="text-violet-500" />
                                            </div>

                                            <div className="mt-7 flex h-32 items-end gap-2">
                                                <div className="h-[35%] flex-1 bg-violet-100" />
                                                <div className="h-[50%] flex-1 bg-violet-200" />
                                                <div className="h-[42%] flex-1 bg-violet-200" />
                                                <div className="h-[67%] flex-1 bg-violet-300" />
                                                <div className="h-[58%] flex-1 bg-violet-300" />
                                                <div className="h-[78%] flex-1 bg-violet-400" />
                                                <div className="h-[92%] flex-1 bg-violet-500" />
                                            </div>
                                        </div>

                                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                            <div className="flex items-center gap-3 bg-white p-4">
                                                <div className="flex h-9 w-9 items-center justify-center bg-violet-50 text-violet-600">
                                                    <FaBookOpen className="text-sm" />
                                                </div>

                                                <div>
                                                    <p className="text-[9px] text-slate-400">
                                                        Active Courses
                                                    </p>

                                                    <p className="text-xs font-bold text-slate-900">
                                                        24 courses
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 bg-white p-4">
                                                <div className="flex h-9 w-9 items-center justify-center bg-cyan-50 text-cyan-600">
                                                    <FaClipboardCheck className="text-sm" />
                                                </div>

                                                <div>
                                                    <p className="text-[9px] text-slate-400">
                                                        Assessments
                                                    </p>

                                                    <p className="text-xs font-bold text-slate-900">
                                                        138 active
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute -left-3 top-[16%] hidden border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/40 sm:block">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center bg-violet-50 text-violet-600">
                                            <FaPeopleGroup className="text-sm" />
                                        </div>

                                        <div>
                                            <p className="text-[9px] text-slate-400">
                                                Learners
                                            </p>

                                            <p className="text-xs font-bold text-slate-900">
                                                2,480
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute -right-3 bottom-[17%] hidden border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/40 sm:block">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center bg-cyan-50 text-cyan-600">
                                            <FaCertificate className="text-sm" />
                                        </div>

                                        <div>
                                            <p className="text-[9px] text-slate-400">
                                                Certificates
                                            </p>

                                            <p className="text-xs font-bold text-slate-900">
                                                1,204 issued
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-b border-slate-100 bg-slate-50">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-violet-600">
                                One Platform
                            </span>

                            <h2 className="mt-4 max-w-xl text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
                                Run your entire education business from one place.
                            </h2>

                            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-500">
                                Replace disconnected tools with one connected
                                platform designed around the way your institution
                                actually works.
                            </p>
                        </div>

                        <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                            {platformFeatures.map((feature) => (
                                <div
                                    key={feature}
                                    className="flex items-center gap-3"
                                >
                                    <div className="flex h-6 w-6 shrink-0 items-center justify-center bg-violet-100 text-violet-600">
                                        <FaCheck className="text-[9px]" />
                                    </div>

                                    <span className="text-sm font-semibold text-slate-700">
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white">
                <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-6 border-b border-slate-200 pb-9 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-violet-600">
                                Platform Features
                            </span>

                            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                                Everything your institution needs.
                            </h2>
                        </div>

                        <p className="max-w-md text-sm leading-7 text-slate-500">
                            Build a complete digital education experience without
                            having to manage multiple disconnected systems.
                        </p>
                    </div>

                    <div className="mt-10 grid border-l border-slate-200 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => {
                            const Icon = feature.icon;

                            return (
                                <div
                                    key={feature.title}
                                    className="group border-b border-r border-t border-slate-200 p-7 transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/40 lg:border-t-0"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center bg-violet-50 text-violet-600 transition duration-300 group-hover:bg-violet-600 group-hover:text-white">
                                        <Icon />
                                    </div>

                                    <h3 className="mt-7 text-base font-bold text-slate-950">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-slate-500">
                                        {feature.description}
                                    </p>

                                    <div className="mt-7 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-violet-600">
                                        Learn more
                                        <FaArrowRight className="text-[9px] transition group-hover:translate-x-1" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="border-y border-slate-100 bg-violet-50/40">
                <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
                    <div className="grid gap-16 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-violet-600">
                                Built For Education
                            </span>

                            <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
                                One platform.
                                <span className="block text-violet-600">
                                    Many possibilities.
                                </span>
                            </h2>

                            <p className="mt-5 max-w-md text-sm leading-7 text-slate-500">
                                Whether you run a school, academy, training
                                institute or higher education organization,
                                ZensonEdu adapts to your education model.
                            </p>

                            <a
                                href="/solutions"
                                className="mt-8 inline-flex items-center gap-3 text-sm font-bold text-violet-600 transition hover:text-violet-800"
                            >
                                Explore solutions
                                <FaArrowRight className="text-xs" />
                            </a>
                        </div>

                        <div className="border-t border-slate-200 bg-white">
                            {solutions.map((solution) => (
                                <a
                                    href="/solutions"
                                    key={solution.number}
                                    className="group flex flex-col gap-5 border-b border-slate-200 p-7 transition hover:bg-violet-50/50 sm:flex-row sm:items-center sm:p-8"
                                >
                                    <div className="text-3xl font-black tracking-tight text-violet-200">
                                        {solution.number}
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-base font-bold text-slate-950 transition group-hover:text-violet-600 sm:text-lg">
                                            {solution.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-500">
                                            {solution.description}
                                        </p>
                                    </div>

                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-slate-200 text-slate-300 transition group-hover:border-violet-200 group-hover:text-violet-600">
                                        <FaArrowRight className="text-xs" />
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white">
                <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
                    <div className="grid gap-16 lg:grid-cols-[1fr_1.3fr] lg:items-center">
                        <div>
                            <div className="flex h-14 w-14 items-center justify-center bg-cyan-50 text-cyan-600">
                                <FaUserTie className="text-xl" />
                            </div>

                            <h2 className="mt-7 max-w-lg text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
                                Give your institution
                                <span className="text-violet-600">
                                    {" "}its own digital identity.
                                </span>
                            </h2>

                            <p className="mt-5 max-w-lg text-sm leading-7 text-slate-500">
                                Your organization gets its own education
                                environment with dedicated users, courses,
                                academic data, branding and administration.
                            </p>

                            <a
                                href="/register"
                                className="mt-8 inline-flex items-center gap-3 bg-violet-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-violet-700"
                            >
                                Create Your Platform
                                <FaArrowRight className="text-xs" />
                            </a>
                        </div>

                        <div className="grid border-l border-t border-slate-200 sm:grid-cols-2">
                            <div className="border-b border-r border-slate-200 p-7 sm:p-9">
                                <FaShieldHalved className="text-lg text-violet-600" />

                                <h3 className="mt-6 text-base font-bold text-slate-950">
                                    Secure Access
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-slate-500">
                                    Control access across administrators,
                                    instructors, students and staff.
                                </p>
                            </div>

                            <div className="border-b border-r border-slate-200 p-7 sm:p-9">
                                <FaBookOpen className="text-lg text-violet-600" />

                                <h3 className="mt-6 text-base font-bold text-slate-950">
                                    Flexible Learning
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-slate-500">
                                    Organize courses, programs, modules and
                                    learning resources your way.
                                </p>
                            </div>

                            <div className="border-b border-r border-slate-200 p-7 sm:p-9 sm:border-b-0">
                                <FaChartLine className="text-lg text-violet-600" />

                                <h3 className="mt-6 text-base font-bold text-slate-950">
                                    Insights
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-slate-500">
                                    Understand student activity and academic
                                    performance through connected data.
                                </p>
                            </div>

                            <div className="border-b border-r border-slate-200 p-7 sm:p-9 sm:border-b-0">
                                <FaBullhorn className="text-lg text-violet-600" />

                                <h3 className="mt-6 text-base font-bold text-slate-950">
                                    Communication
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-slate-500">
                                    Keep students and instructors informed with
                                    announcements and platform communication.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-t border-violet-100 bg-violet-50">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden border border-violet-100 bg-white px-7 py-12 sm:px-12 lg:px-16">
                        <div className="absolute right-0 top-0 h-44 w-44 translate-x-1/3 -translate-y-1/3 rounded-full bg-cyan-100" />

                        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-violet-600">
                                    ZensonEdu
                                </span>

                                <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                                    Your education platform starts here.
                                </h2>

                                <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500">
                                    Create your platform, bring your students and
                                    instructors together, and manage your entire
                                    education operation from one place.
                                </p>
                            </div>

                            <a
                                href="/register"
                                className="inline-flex shrink-0 items-center justify-center gap-3 bg-violet-600 px-7 py-4 text-sm font-bold text-white transition hover:bg-violet-700"
                            >
                                Get Started
                                <FaArrowRight className="text-xs" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;