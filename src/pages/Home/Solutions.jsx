import React from "react";
import {
    FaArrowRight,
    FaBookOpen,
    FaBuildingColumns,
    FaCheck,
    FaChalkboardUser,
    FaGraduationCap,
    FaPeopleGroup,
    FaSchool,
} from "react-icons/fa6";

const solutions = [
    {
        icon: FaSchool,
        title: "Schools & Academies",
        description:
            "Create a dedicated digital platform for your school or academy to manage students, instructors, classes, courses, attendance, and academic activities.",
        features: [
            "Student management",
            "Class & subject management",
            "Instructor management",
            "Attendance tracking",
            "Assignments & assessments",
            "Announcements",
        ],
        className: "bg-violet-50 text-violet-600",
        href: "/solutions/schools",
    },
    {
        icon: FaChalkboardUser,
        title: "Training Institutes",
        description:
            "Manage professional training programs, learners, instructors, courses, assessments, and certificates from one centralized platform.",
        features: [
            "Course & program management",
            "Learner management",
            "Instructor management",
            "Class scheduling",
            "Assessments & exams",
            "Digital certificates",
        ],
        className: "bg-cyan-50 text-cyan-600",
        href: "/solutions/institutes",
    },
    {
        icon: FaBuildingColumns,
        title: "Higher Education",
        description:
            "Build a structured digital platform for colleges, universities, and higher education organizations with powerful academic management capabilities.",
        features: [
            "Student information",
            "Academic programs",
            "Course management",
            "Exams & results",
            "Academic analytics",
            "Role-based access",
        ],
        className: "bg-fuchsia-50 text-fuchsia-600",
        href: "/solutions/higher-education",
    },
];

const sharedFeatures = [
    {
        icon: FaPeopleGroup,
        title: "Manage People",
        description:
            "Bring students, instructors, administrators, and academic teams together in one organized environment.",
    },
    {
        icon: FaBookOpen,
        title: "Manage Education",
        description:
            "Create courses, programs, subjects, classes, learning activities, assessments, and academic content.",
    },
    {
        icon: FaGraduationCap,
        title: "Support Student Success",
        description:
            "Track attendance, performance, assessments, results, achievements, and academic progress.",
    },
];

const platformFeatures = [
    "Your own institution platform",
    "Custom branding",
    "Student management",
    "Instructor management",
    "Courses & programs",
    "Academic management",
    "Attendance & classes",
    "Assignments & assessments",
    "Exams & results",
    "Digital certificates",
    "Announcements",
    "Academic analytics",
];

const Solutions = () => {
    return (
        <main className="min-h-screen bg-white">

            <section className="relative overflow-hidden bg-violet-50/60 px-5 pb-20 pt-20 sm:px-6 lg:px-8 lg:pb-28 lg:pt-28">
                <div className="absolute -left-32 -top-32 h-[450px] w-[450px] rounded-full bg-violet-200/50 blur-3xl" />

                <div className="absolute -bottom-40 -right-32 h-[450px] w-[450px] rounded-full bg-cyan-100/70 blur-3xl" />

                <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-100/40 blur-3xl" />

                <div className="relative mx-auto max-w-4xl text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center bg-white text-violet-600 shadow-lg shadow-violet-100">
                        <FaGraduationCap className="text-2xl" />
                    </div>

                    <p className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-cyan-600">
                        ZensonEdu Solutions
                    </p>

                    <h1 className="mt-4 text-4xl font-black tracking-tight text-violet-900 sm:text-5xl lg:text-6xl">
                        One platform for
                        <span className="block bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
                            every type of institution
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg">
                        Whether you run a school, training institute, academy,
                        college, or university, ZensonEdu gives you the tools
                        to build and manage your own digital education platform.
                    </p>

                    <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <a
                            href="/signup"
                            className="inline-flex w-full items-center justify-center gap-3 bg-violet-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700 sm:w-auto"
                        >
                            Create Your Platform
                            <FaArrowRight className="text-xs" />
                        </a>

                        <a
                            href="/pricing"
                            className="inline-flex w-full items-center justify-center bg-white px-7 py-3.5 text-sm font-bold text-violet-600 shadow-lg shadow-violet-100 transition hover:bg-violet-50 sm:w-auto"
                        >
                            View Pricing
                        </a>
                    </div>
                </div>
            </section>

            <section className="px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600">
                            Built For Education
                        </p>

                        <h2 className="mt-3 text-3xl font-black tracking-tight text-violet-900 sm:text-4xl">
                            A solution that fits your institution
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
                            Start with the platform capabilities that match
                            your institution and scale as your organization
                            grows.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-7 lg:grid-cols-3">
                        {solutions.map((solution) => {
                            const Icon = solution.icon;

                            return (
                                <div
                                    key={solution.title}
                                    className="group flex flex-col bg-white p-7 shadow-xl shadow-violet-100/60 ring-1 ring-violet-50 transition duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-8"
                                >
                                    <div
                                        className={`flex h-14 w-14 items-center justify-center ${solution.className}`}
                                    >
                                        <Icon className="text-xl" />
                                    </div>

                                    <h3 className="mt-7 text-2xl font-black text-violet-900">
                                        {solution.title}
                                    </h3>

                                    <p className="mt-4 text-sm leading-7 text-gray-500">
                                        {solution.description}
                                    </p>

                                    <div className="mt-7 space-y-3">
                                        {solution.features.map((feature) => (
                                            <div
                                                key={feature}
                                                className="flex items-center gap-3"
                                            >
                                                <div className="flex h-5 w-5 shrink-0 items-center justify-center bg-violet-50 text-violet-600">
                                                    <FaCheck className="text-[9px]" />
                                                </div>

                                                <span className="text-sm text-gray-500">
                                                    {feature}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <a
                                        href={solution.href}
                                        className="group/link mt-8 inline-flex items-center gap-3 text-sm font-bold text-violet-600 transition hover:text-cyan-600"
                                    >
                                        Explore Solution
                                        <FaArrowRight className="text-xs transition-transform duration-200 group-hover/link:translate-x-1" />
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-violet-50/50 px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-6 md:grid-cols-3">
                        {sharedFeatures.map((feature) => {
                            const Icon = feature.icon;

                            return (
                                <div
                                    key={feature.title}
                                    className="bg-white p-8 shadow-lg shadow-violet-100/60"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center bg-violet-50 text-violet-600">
                                        <Icon className="text-lg" />
                                    </div>

                                    <h3 className="mt-6 text-xl font-black text-violet-900">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-gray-500">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
                <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">

                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600">
                            Your Education Platform
                        </p>

                        <h2 className="mt-3 text-3xl font-black tracking-tight text-violet-900 sm:text-4xl">
                            Everything connected in one place
                        </h2>

                        <p className="mt-5 text-sm leading-7 text-gray-500 sm:text-base">
                            ZensonEdu brings the essential parts of your
                            institution together so your team can manage
                            education without relying on disconnected systems.
                        </p>

                        <a
                            href="/features"
                            className="mt-8 inline-flex items-center gap-3 text-sm font-bold text-violet-600 transition hover:text-cyan-600"
                        >
                            Explore all features
                            <FaArrowRight className="text-xs" />
                        </a>
                    </div>

                    <div className="bg-white p-7 shadow-xl shadow-violet-100/70 ring-1 ring-violet-50 sm:p-9">
                        <div className="grid gap-4 sm:grid-cols-2">
                            {platformFeatures.map((feature) => (
                                <div
                                    key={feature}
                                    className="flex items-start gap-3"
                                >
                                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-cyan-50 text-cyan-600">
                                        <FaCheck className="text-[9px]" />
                                    </div>

                                    <span className="text-sm leading-5 text-gray-500">
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            <section className="px-5 pb-20 sm:px-6 lg:px-8 lg:pb-28">
                <div className="mx-auto max-w-5xl bg-gradient-to-r from-violet-600 to-cyan-500 px-7 py-12 text-center shadow-2xl shadow-violet-200 sm:px-12 lg:py-16">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center bg-white/15 text-white">
                        <FaGraduationCap className="text-xl" />
                    </div>

                    <h2 className="mt-6 text-3xl font-black text-white sm:text-4xl">
                        Build the platform your institution deserves
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
                        Choose a plan, create your platform, and give your
                        students and instructors a modern digital education
                        experience.
                    </p>

                    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <a
                            href="/signup"
                            className="inline-flex w-full items-center justify-center gap-3 bg-white px-7 py-3.5 text-sm font-bold text-violet-700 transition hover:bg-violet-50 sm:w-auto"
                        >
                            Create Your Platform
                            <FaArrowRight className="text-xs" />
                        </a>

                        <a
                            href="/contact"
                            className="inline-flex w-full items-center justify-center px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/10 sm:w-auto"
                        >
                            Talk to Our Team
                        </a>
                    </div>
                </div>
            </section>

        </main>
    );
};

export default Solutions;