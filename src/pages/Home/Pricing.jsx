import React, { useEffect, useState } from "react";
import {
    FaArrowRight,
    FaBrain,
    FaCheck,
    FaCrown,
    FaDatabase,
    FaGraduationCap,
    FaLock,
    FaRocket,
    FaRobot,
    FaUsers,
} from "react-icons/fa6";
import API from "../../services/api";

// const plans = [
//     {
//         name: "Starter",
//         available: true,
//         description:
//             "For small education institutes and learning centres starting their digital journey.",
//         price: "Contact us",
//         subtitle: "For institutions with up to 300 students",
//         icon: FaRocket,
//         iconClass: "bg-violet-50 text-violet-600",
//         buttonClass:
//             "bg-violet-600 text-white hover:bg-violet-700 shadow-violet-200",
//         buttonText: "Get Started",
//         features: [
//             "Up to 300 active students",
//             "Up to 30 active teachers",
//             "Up to 20 active staff",
//             "1 branch / campus",
//             "Advanced Student Information System",
//             "Advanced Admissions Management",
//             "Student registration",
//             "Student enrolment",
//             "Teacher & instructor management",
//             "Course & subject management",
//             "Class management",
//             "Academic calendar management",
//             "Timetable management",
//             "Attendance management",
//             "Learning Management System via Moodle",
//             "Learning materials",
//             "Assignments management",
//             "Assignment submission & grading",
//             "Online quizzes",
//             "Advanced Examinations Management",
//             "Marks & Results Management",
//             "Payment Management",
//             "Student portal",
//             "Teacher portal",
//             "Announcements",
//             "Notifications",
//             "Student communication",
//             "Academic reports",
//             "Custom reports",
//             "Academic analytics",
//             "Role-based access",
//             "Email support",
//         ],
//     },
//     {
//         name: "Professional",
//         available: true,
//         description:
//             "For growing education institutions that need a complete digital academic management platform.",
//         price: "Contact us",
//         subtitle: "For institutions with up to 1,500 students",
//         icon: FaCrown,
//         iconClass: "bg-cyan-50 text-cyan-600",
//         popular: true,
//         buttonClass:
//             "bg-cyan-500 text-white hover:bg-cyan-600 shadow-cyan-200",
//         buttonText: "Book a Demo",
//         features: [
//             "Up to 1,500 active students",
//             "Up to 100 active teachers",
//             "Up to 50 active staff",
//             "1 branch / campus",
//             "Advanced Student Information System",
//             "Advanced Admissions Management",
//             "Student registration",
//             "Student enrolment",
//             "Teacher & instructor management",
//             "Course & subject management",
//             "Class management",
//             "Academic calendar management",
//             "Timetable management",
//             "Attendance management",
//             "Learning Management System via Moodle",
//             "Learning materials",
//             "Assignments management",
//             "Assignment submission & grading",
//             "Online quizzes",
//             "Advanced Examinations Management",
//             "Marks & Results Management",
//             "Payment Management",
//             "Student portal",
//             "Teacher portal",
//             "Announcements",
//             "Notifications",
//             "Student communication",
//             "Academic reports",
//             "Custom reports",
//             "Academic analytics",
//             "Student performance analytics",
//             "Role-based access",
//             "Student document management",
//             "Student academic history",
//             "Advanced Course & subject management",
//             "Advanced Class management",
//             "Digital learning resources",
//             "Student performance analytics",
//             "Advanced AI education assistant",
//             "AI teaching support",
//             "AI learning support",
//             "Advanced AI academic insights",
//             "AI student performance insights",
//             "AI lesson planning",
//             "AI assessment support",
//             "AI educational content",
//             "AI report generation",
//             "Priority support",
//         ],
//     },
// ];

const getComparisonValue = (plan, feature) => {
    if (
        feature === "Up to 300 active students" ||
        feature === "Up to 1,500 active students"
    ) {
        return plan.maxStudents.toLocaleString();
    }

    if (
        feature === "Up to 30 active teachers" ||
        feature === "Up to 100 active teachers"
    ) {
        const teacherFeature = plan.features.find((item) =>
            item.includes("active teachers")
        );

        return teacherFeature
            ? teacherFeature.replace("Up to ", "").replace(" active teachers", "")
            : "No";
    }

    if (
        feature === "Up to 20 active staff" ||
        feature === "Up to 50 active staff"
    ) {
        const staffFeature = plan.features.find((item) =>
            item.includes("active staff")
        );

        return staffFeature
            ? staffFeature.replace("Up to ", "").replace(" active staff", "")
            : "No";
    }

    if (feature === "1 branch / campus") {
        return plan.maxBranches.toString();
    }

    if (feature === "Support") {
        if (plan.features.includes("Email support")) {
            return "Email support";
        }

        if (plan.features.includes("Priority support")) {
            return "Priority support";
        }

        return "No";
    }

    return plan.features.includes(feature) ? "Yes" : "No";
};

const Pricing = () => {
    const [plans, setPlans] = useState([])

    useEffect(() => {
        const fetchpublicplans = async () => {
            const res = await API.get('/plan/public-plans')
            if (res.data.success === true) {
                setPlans(res.data.result)
            }
        }
        fetchpublicplans()
    }, [])

    const professionalPlan = plans.find(
        (plan) => plan.name === "Professional"
    );

    const aiPlanFeatures = professionalPlan?.aiFeatures || [];

    const getPlanIcon = (plan) => {
        return plan.name === "Professional" ? FaCrown : FaRocket;
    };

    const getPlanIconClass = (plan) => {
        return plan.name === "Professional"
            ? "bg-cyan-50 text-cyan-600"
            : "bg-violet-50 text-violet-600";
    };

    const getPlanButtonClass = (plan) => {
        return plan.name === "Professional"
            ? "bg-cyan-500 text-white hover:bg-cyan-600 shadow-cyan-200"
            : "bg-violet-600 text-white hover:bg-violet-700 shadow-violet-200";
    };

    const getPlanButtonText = (plan) => {
        return plan.name === "Professional"
            ? "Book a Demo"
            : "Get Started";
    };

    const getPlanPrice = (plan) => {
        if (plan.pricingType === "CONTACT") {
            return "Contact us";
        }

        if (plan.pricingType === "CUSTOM") {
            return "Custom";
        }

        if (plan.monthlyPrice) {
            return `Rs. ${plan.monthlyPrice.toLocaleString()}`;
        }

        return "Contact us";
    };

    return (
        <main className="min-h-screen bg-white">
            <section className="relative overflow-hidden bg-violet-50/60 px-5 pb-20 pt-20 sm:px-6 lg:px-8 lg:pb-28 lg:pt-28">
                <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-200/50 blur-3xl" />

                <div className="absolute -bottom-40 -right-32 h-[450px] w-[450px] rounded-full bg-cyan-100/60 blur-3xl" />

                <div className="relative mx-auto max-w-4xl text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center bg-white text-violet-600 shadow-lg shadow-violet-100">
                        <FaGraduationCap className="text-2xl" />
                    </div>

                    <p className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-cyan-600">
                        ZensonEdu Pricing
                    </p>

                    <h1 className="mt-4 text-4xl font-black tracking-tight text-violet-900 sm:text-5xl lg:text-6xl">
                        Build the right platform
                        <span className="block bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
                            for your institution
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg">
                        Start with essential education management tools and
                        upgrade as your institution grows into a complete
                        AI-powered education platform.
                    </p>
                </div>
            </section>

            <section className="px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
                <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
                    {plans.map((plan) => {
                        const Icon = getPlanIcon(plan);
                        const iconClass = getPlanIconClass(plan);
                        const buttonClass = getPlanButtonClass(plan);
                        const buttonText = getPlanButtonText(plan);

                        return (
                            <div
                                key={plan.name}
                                className={`relative flex flex-col bg-white p-7 shadow-xl shadow-violet-100/60 transition duration-300 sm:p-8 ${plan.isPopular
                                    ? "ring-2 ring-cyan-400"
                                    : "ring-1 ring-violet-100"
                                    } ${plan.isActive
                                        ? "hover:-translate-y-1 hover:shadow-2xl"
                                        : "opacity-80"
                                    }`}
                            >
                                {!plan.isActive && (
                                    <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/60 backdrop-blur-[4px]">
                                        <div className="mx-5 flex max-w-[240px] flex-col items-center bg-white px-6 py-6 text-center shadow-2xl ring-1 ring-violet-100">
                                            <div className="flex h-12 w-12 items-center justify-center bg-violet-50 text-violet-600">
                                                <FaLock className="text-lg" />
                                            </div>

                                            <p className="mt-4 text-base font-black text-violet-900">
                                                Currently Unavailable
                                            </p>

                                            <p className="mt-2 text-xs leading-5 text-gray-500">
                                                This plan is currently unavailable.
                                                Contact our team for more information.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {plan.isPopular && (
                                    <div className="absolute right-6 top-0 -translate-y-1/2 bg-cyan-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                                        Most Popular
                                    </div>
                                )}

                                <div className="flex items-center justify-between">
                                    <div
                                        className={`flex h-12 w-12 items-center justify-center ${iconClass}`}
                                    >
                                        <Icon className="text-lg" />
                                    </div>
                                </div>

                                <h2 className="mt-7 text-2xl font-black text-violet-900">
                                    {plan.name}
                                </h2>

                                <p className="mt-3 min-h-[48px] text-sm leading-6 text-gray-500">
                                    {plan.description}
                                </p>

                                <p className="mt-5 text-sm font-semibold text-cyan-600">
                                    {plan.subtitle}
                                </p>

                                <div className="mt-7">
                                    <span className="text-3xl font-black text-violet-900 sm:text-4xl">
                                        {getPlanPrice(plan)}
                                    </span>
                                </div>

                                <a
                                    href="/contact"
                                    className={`mt-8 inline-flex items-center justify-center gap-3 px-6 py-3.5 text-sm font-bold shadow-lg transition ${buttonClass}`}
                                >
                                    {buttonText}
                                    <FaArrowRight className="text-xs" />
                                </a>

                                <div className="my-8 h-px bg-violet-100" />

                                <p className="text-sm font-bold text-violet-800">
                                    Includes:
                                </p>

                                <div className="mt-5 space-y-4">
                                    {plan.features.map((feature) => (
                                        <div
                                            key={feature}
                                            className="flex items-start gap-3"
                                        >
                                            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-violet-50 text-violet-600">
                                                <FaCheck className="text-[9px]" />
                                            </div>

                                            <span className="text-sm leading-5 text-gray-500">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="bg-violet-50/50 px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600">
                            AI Platform
                        </p>

                        <h2 className="mt-3 text-3xl font-black text-violet-900 sm:text-4xl">
                            AI-powered education starts with Professional
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
                            ZensonEdu's AI capabilities combine intelligent
                            assistance with advanced academic insights to
                            support institutions, teachers, and students.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        {aiPlanFeatures?.map((feature) => {
                            const isEducationAssistant =
                                feature === "Advanced AI education assistant";

                            const isTeachingSupport =
                                feature === "AI teaching support";

                            const Icon = isEducationAssistant
                                ? FaRobot
                                : isTeachingSupport
                                    ? FaDatabase
                                    : FaBrain;

                            const bg = isEducationAssistant
                                ? "bg-violet-50"
                                : isTeachingSupport
                                    ? "bg-cyan-50"
                                    : "bg-fuchsia-50";

                            const iconColor = isEducationAssistant
                                ? "text-violet-600"
                                : isTeachingSupport
                                    ? "text-cyan-600"
                                    : "text-fuchsia-600";

                            const description = isEducationAssistant
                                ? "Provide intelligent AI assistance for students and education institutions."
                                : isTeachingSupport
                                    ? "Support teachers with AI-powered teaching assistance and educational workflows."
                                    : "Help students with intelligent learning support throughout their academic journey.";

                            return (
                                <div
                                    key={feature}
                                    className="bg-white p-7 shadow-lg shadow-violet-100/50 ring-1 ring-violet-100"
                                >
                                    <div
                                        className={`flex h-12 w-12 items-center justify-center ${bg}`}
                                    >
                                        <Icon
                                            className={`text-xl ${iconColor}`}
                                        />
                                    </div>

                                    <h3 className="mt-6 text-lg font-bold text-violet-900">
                                        {feature}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-gray-500">
                                        {description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-8 bg-white p-6 shadow-lg shadow-violet-100/50 ring-1 ring-violet-100 sm:p-8">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <p className="text-sm font-bold text-violet-800">
                                    AI-powered education
                                </p>

                                <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-500">
                                    Professional provides AI capabilities for
                                    education, teaching, learning, academic
                                    insights, assessment support, lesson
                                    planning, educational content, and report
                                    generation.
                                </p>
                            </div>

                            <div className="flex shrink-0 items-center gap-3 text-sm font-bold text-cyan-600">
                                <FaDatabase />
                                AI Education
                                <FaArrowRight className="text-xs" />
                                <FaRobot />
                                Professional
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600">
                            Compare Plans
                        </p>

                        <h2 className="mt-3 text-3xl font-black text-violet-900 sm:text-4xl">
                            Choose the right level for your institution
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
                            Compare education management, administration,
                            analytics, and AI capabilities across ZensonEdu.
                        </p>
                    </div>

                    <div className="mt-12 overflow-x-auto bg-white shadow-xl shadow-violet-100/50 ring-1 ring-violet-100">
                        <table className="w-full min-w-[900px] border-collapse">
                            <thead>
                                <tr className="bg-violet-50">
                                    <th className="px-6 py-5 text-left text-sm font-bold text-violet-900">
                                        Features
                                    </th>

                                    {plans.map((plan) => (
                                        <th
                                            key={plan.name}
                                            className={`px-6 py-5 text-center text-sm font-bold ${plan.name === "Professional"
                                                ? "text-cyan-600"
                                                : "text-violet-900"
                                                }`}
                                        >
                                            {plan.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {[
                                    ...new Set(
                                        plans.flatMap(
                                            (plan) => plan.features
                                        )
                                    ),
                                ]
                                    .filter(
                                        (feature) =>
                                            feature !== "Email support" &&
                                            feature !== "Priority support"
                                    )
                                    .concat(["Support"])
                                    .map((feature) => (
                                        <tr
                                            key={feature}
                                            className="border-t border-violet-50"
                                        >
                                            <td className="px-6 py-4 text-sm font-medium text-gray-600">
                                                {feature}
                                            </td>

                                            {plans.map((plan) => {
                                                const value =
                                                    getComparisonValue(
                                                        plan,
                                                        feature
                                                    );

                                                const isYes =
                                                    value === "Yes" ||
                                                    value === "Email support" ||
                                                    value === "Priority support";

                                                return (
                                                    <td
                                                        key={plan.name}
                                                        className="px-6 py-4 text-center text-sm"
                                                    >
                                                        {isYes ? (
                                                            <div className="flex items-center justify-center gap-2">
                                                                <FaCheck
                                                                    className={`text-sm ${plan.name === "Professional"
                                                                            ? "text-cyan-500"
                                                                            : "text-violet-600"
                                                                        }`}
                                                                />

                                                                <span className="font-medium text-gray-500">
                                                                    {value}
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <span
                                                                className={`font-medium ${value === "No"
                                                                        ? "text-gray-400"
                                                                        : "text-gray-600"
                                                                    }`}
                                                            >
                                                                {value}
                                                            </span>
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section className="px-5 pb-20 sm:px-6 lg:px-8 lg:pb-24">
                <div className="mx-auto max-w-5xl bg-gradient-to-r from-violet-600 to-cyan-500 px-7 py-12 text-center shadow-2xl shadow-violet-200 sm:px-12 lg:py-16">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center bg-white/15 text-white">
                        <FaUsers className="text-xl" />
                    </div>

                    <h2 className="mt-6 text-3xl font-black text-white sm:text-4xl">
                        Ready to build your education platform?
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
                        Launch your institution's digital platform and scale
                        from core education management to AI-powered learning
                        and academic support.
                    </p>

                    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <a
                            href="/contact"
                            className="inline-flex w-full items-center justify-center gap-3 bg-white px-7 py-3.5 text-sm font-bold text-violet-700 transition hover:bg-violet-50 sm:w-auto"
                        >
                            Get a Quote
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

export default Pricing;