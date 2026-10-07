import React from "react";
import {
    FaArrowRight,
    FaBookOpen,
    FaBullhorn,
    FaCertificate,
    FaChartLine,
    FaCheck,
    FaClipboardCheck,
    FaGraduationCap,
    FaPeopleGroup,
    FaShieldHalved,
    FaUserTie,
} from "react-icons/fa6";

const coreFeatures = [
    {
        icon: FaPeopleGroup,
        title: "Student Management",
        description:
            "Manage student profiles, enrollment, academic information, attendance, and progress from one central platform.",
        className: "bg-violet-50 text-violet-600",
    },
    {
        icon: FaUserTie,
        title: "Instructor Management",
        description:
            "Give instructors the tools they need to manage classes, students, courses, assignments, and academic activities.",
        className: "bg-cyan-50 text-cyan-600",
    },
    {
        icon: FaBookOpen,
        title: "Courses & Programs",
        description:
            "Create and organize courses, programs, subjects, learning materials, and academic structures.",
        className: "bg-fuchsia-50 text-fuchsia-600",
    },
    {
        icon: FaGraduationCap,
        title: "Academic Management",
        description:
            "Manage academic programs, classes, schedules, enrollments, attendance, and student academic records.",
        className: "bg-violet-50 text-violet-600",
    },
    {
        icon: FaClipboardCheck,
        title: "Assessments & Exams",
        description:
            "Create assessments, manage examinations, record results, and provide a structured academic evaluation workflow.",
        className: "bg-cyan-50 text-cyan-600",
    },
    {
        icon: FaCertificate,
        title: "Certificates",
        description:
            "Create and manage digital certificates for completed courses, programs, achievements, and academic milestones.",
        className: "bg-fuchsia-50 text-fuchsia-600",
    },
];

const managementFeatures = [
    {
        icon: FaBullhorn,
        title: "Announcements & Communication",
        description:
            "Keep students and instructors informed with announcements, updates, and important academic communication.",
    },
    {
        icon: FaChartLine,
        title: "Academic Analytics",
        description:
            "Understand student performance, attendance, course activity, and academic progress through useful insights.",
    },
    {
        icon: FaShieldHalved,
        title: "Role-Based Access",
        description:
            "Control access to platform features and information based on the responsibilities of each user.",
    },
];

const platformBenefits = [
    "Your own branded education platform",
    "Centralized student and academic management",
    "Courses, programs, and learning resources",
    "Attendance and class management",
    "Assignments and assessments",
    "Exams and results",
    "Digital certificates",
    "Announcements and communication",
    "Role-based access control",
    "Academic analytics",
    "Cloud-based access",
    "Designed to scale with your institution",
];

const Features = () => {
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
                        ZensonEdu Features
                    </p>

                    <h1 className="mt-4 text-4xl font-black tracking-tight text-violet-900 sm:text-5xl lg:text-6xl">
                        Everything you need to
                        <span className="block bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
                            run your education platform
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg">
                        ZensonEdu brings students, instructors, courses,
                        academics, assessments, and administration together
                        in one modern education platform.
                    </p>

                    <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <a
                            href="/register"
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
                    <div className="max-w-2xl">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600">
                            Core Features
                        </p>

                        <h2 className="mt-3 text-3xl font-black tracking-tight text-violet-900 sm:text-4xl">
                            Built for modern education
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
                            Give your institution the tools needed to manage
                            everyday education operations from one platform.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {coreFeatures.map((feature) => {
                            const Icon = feature.icon;

                            return (
                                <div
                                    key={feature.title}
                                    className="group bg-white p-7 shadow-lg shadow-violet-100/60 ring-1 ring-violet-50 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >
                                    <div
                                        className={`flex h-12 w-12 items-center justify-center ${feature.className}`}
                                    >
                                        <Icon className="text-lg" />
                                    </div>

                                    <h3 className="mt-6 text-lg font-black text-violet-900">
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

            <section className="bg-violet-50/50 px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">

                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600">
                                Platform Management
                            </p>

                            <h2 className="mt-3 text-3xl font-black tracking-tight text-violet-900 sm:text-4xl">
                                More than just course management
                            </h2>

                            <p className="mt-5 text-sm leading-7 text-gray-500 sm:text-base">
                                ZensonEdu provides the wider management tools
                                your institution needs to operate an organized
                                digital education environment.
                            </p>

                            <div className="mt-8 space-y-6">
                                {managementFeatures.map((feature) => {
                                    const Icon = feature.icon;

                                    return (
                                        <div
                                            key={feature.title}
                                            className="flex gap-4"
                                        >
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-white text-violet-600 shadow-md shadow-violet-100">
                                                <Icon className="text-sm" />
                                            </div>

                                            <div>
                                                <h3 className="text-base font-bold text-violet-900">
                                                    {feature.title}
                                                </h3>

                                                <p className="mt-1 text-sm leading-6 text-gray-500">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="bg-white p-7 shadow-xl shadow-violet-100/70 sm:p-9">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center bg-violet-50 text-violet-600">
                                    <FaGraduationCap className="text-xl" />
                                </div>

                                <div>
                                    <h3 className="text-xl font-black text-violet-900">
                                        Your Platform
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Everything connected in one place
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                {platformBenefits.map((benefit) => (
                                    <div
                                        key={benefit}
                                        className="flex items-start gap-3"
                                    >
                                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-cyan-50 text-cyan-600">
                                            <FaCheck className="text-[9px]" />
                                        </div>

                                        <span className="text-sm leading-5 text-gray-500">
                                            {benefit}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-6 md:grid-cols-3">

                        <div className="bg-violet-50 p-8">
                            <FaPeopleGroup className="text-2xl text-violet-600" />

                            <h3 className="mt-6 text-xl font-black text-violet-900">
                                For Institutions
                            </h3>

                            <p className="mt-3 text-sm leading-7 text-gray-500">
                                Create a centralized digital environment
                                for managing your entire institution.
                            </p>
                        </div>

                        <div className="bg-cyan-50 p-8">
                            <FaBookOpen className="text-2xl text-cyan-600" />

                            <h3 className="mt-6 text-xl font-black text-violet-900">
                                For Instructors
                            </h3>

                            <p className="mt-3 text-sm leading-7 text-gray-500">
                                Give instructors the tools to manage
                                courses, students, classes, and assessments.
                            </p>
                        </div>

                        <div className="bg-fuchsia-50 p-8">
                            <FaGraduationCap className="text-2xl text-fuchsia-600" />

                            <h3 className="mt-6 text-xl font-black text-violet-900">
                                For Students
                            </h3>

                            <p className="mt-3 text-sm leading-7 text-gray-500">
                                Provide students with a simple place to
                                access courses, academic information,
                                assessments, and achievements.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            <section className="px-5 pb-20 sm:px-6 lg:px-8 lg:pb-28">
                <div className="mx-auto max-w-5xl bg-gradient-to-r from-violet-600 to-cyan-500 px-7 py-12 text-center shadow-2xl shadow-violet-200 sm:px-12 lg:py-16">
                    <h2 className="text-3xl font-black text-white sm:text-4xl">
                        Build the education platform your institution needs
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
                        Start with the features you need and grow your
                        platform as your institution grows.
                    </p>

                    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <a
                            href="/register"
                            className="inline-flex w-full items-center justify-center gap-3 bg-white px-7 py-3.5 text-sm font-bold text-violet-700 transition hover:bg-violet-50 sm:w-auto"
                        >
                            Create Your Platform
                            <FaArrowRight className="text-xs" />
                        </a>

                        <a
                            href="/pricing"
                            className="inline-flex w-full items-center justify-center px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/10 sm:w-auto"
                        >
                            Explore Pricing
                        </a>
                    </div>
                </div>
            </section>

        </main>
    );
};

export default Features;