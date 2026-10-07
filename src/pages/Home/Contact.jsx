import React, { useState } from "react";
import {
    FaArrowRight,
    FaBrain,
    FaBuilding,
    FaCheck,
    FaEnvelope,
    FaGraduationCap,
    FaHeadset,
    FaPhone,
    FaRobot,
    FaShieldHalved,
} from "react-icons/fa6";

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

const contactOptions = [
    {
        title: "Request a Demo",
        description:
            "See how ZensonEdu can support your institution's academic and administrative operations.",
        icon: FaGraduationCap,
        bg: "bg-violet-50",
        iconColor: "text-violet-600",
    },
    {
        title: "Get a Quote",
        description:
            "Tell us about your students, campuses, and requirements and we'll prepare a suitable plan.",
        icon: FaBuilding,
        bg: "bg-cyan-50",
        iconColor: "text-cyan-600",
    },
    {
        title: "AI Platform",
        description:
            "Learn how LLM, vector search, and RAG can be used with your institution's knowledge.",
        icon: FaBrain,
        bg: "bg-fuchsia-50",
        iconColor: "text-fuchsia-600",
    },
];

const benefits = [
    "Platform tailored to your institution",
    "Student and instructor management",
    "Courses and academic management",
    "Exams, assessments and results",
    "LLM-powered AI capabilities",
    "Vector database and RAG",
    "Multi-campus support",
    "Custom integrations",
];

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        institution: "",
        phone: "",
        students: "",
        interest: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setSuccess(false);
        setError("");

        try {
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.message || "Failed to send enquiry");
            }

            setSuccess(true);

            setFormData({
                name: "",
                email: "",
                institution: "",
                phone: "",
                students: "",
                interest: "",
                message: "",
            });
        } catch (error) {
            setError(
                "Unable to send your enquiry right now. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-white">
            <section className="relative overflow-hidden bg-violet-50/60 px-5 pb-20 pt-20 sm:px-6 lg:px-8 lg:pb-28 lg:pt-28">
                <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-200/50 blur-3xl" />

                <div className="absolute -bottom-40 -right-32 h-[450px] w-[450px] rounded-full bg-cyan-100/60 blur-3xl" />

                <div className="relative mx-auto max-w-4xl text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center bg-white text-violet-600 shadow-lg shadow-violet-100">
                        <FaEnvelope className="text-2xl" />
                    </div>

                    <p className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-cyan-600">
                        Contact ZensonEdu
                    </p>

                    <h1 className="mt-4 text-4xl font-black tracking-tight text-violet-900 sm:text-5xl lg:text-6xl">
                        Let's build your
                        <span className="block bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
                            education platform
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg">
                        Talk to our team about launching ZensonEdu for your
                        institution, getting a quote, or exploring our
                        AI-powered education capabilities.
                    </p>
                </div>
            </section>

            <section className="px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
                <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
                    {contactOptions.map((option) => {
                        const Icon = option.icon;

                        return (
                            <div
                                key={option.title}
                                className="bg-white p-7 shadow-lg shadow-violet-100/50 ring-1 ring-violet-100 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div
                                    className={`flex h-12 w-12 items-center justify-center ${option.bg}`}
                                >
                                    <Icon
                                        className={`text-xl ${option.iconColor}`}
                                    />
                                </div>

                                <h2 className="mt-6 text-lg font-bold text-violet-900">
                                    {option.title}
                                </h2>

                                <p className="mt-3 text-sm leading-6 text-gray-500">
                                    {option.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="bg-violet-50/40 px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
                <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600">
                            Talk to us
                        </p>

                        <h2 className="mt-3 text-3xl font-black text-violet-900 sm:text-4xl">
                            Tell us what your institution needs
                        </h2>

                        <p className="mt-5 leading-7 text-gray-500">
                            Whether you are a school, training institute,
                            university, or education organization, we can help
                            you plan the right ZensonEdu platform.
                        </p>

                        <div className="mt-8 space-y-5">
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-white text-violet-600 shadow-sm">
                                    <FaEnvelope />
                                </div>

                                <div>
                                    <p className="text-sm font-bold text-violet-900">
                                        Email
                                    </p>

                                    <p className="mt-1 text-sm text-gray-500">
                                        sales@zensonedu.com
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-white text-cyan-600 shadow-sm">
                                    <FaPhone />
                                </div>

                                <div>
                                    <p className="text-sm font-bold text-violet-900">
                                        Sales & Support
                                    </p>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Talk to our team about your requirements
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-white text-fuchsia-600 shadow-sm">
                                    <FaHeadset />
                                </div>

                                <div>
                                    <p className="text-sm font-bold text-violet-900">
                                        Platform Consultation
                                    </p>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Discuss your institution's workflows and
                                        platform requirements.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 bg-white p-6 shadow-sm ring-1 ring-violet-100">
                            <div className="flex items-center gap-3">
                                <FaShieldHalved className="text-violet-600" />

                                <p className="text-sm font-bold text-violet-900">
                                    Built for education organizations
                                </p>
                            </div>

                            <p className="mt-3 text-sm leading-6 text-gray-500">
                                ZensonEdu brings academic management,
                                administration, analytics, and AI capabilities
                                together in one platform.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-6 shadow-xl shadow-violet-100/60 ring-1 ring-violet-100 sm:p-8 lg:p-10">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.15em] text-cyan-600">
                                Get in touch
                            </p>

                            <h2 className="mt-2 text-2xl font-black text-violet-900">
                                Request information
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Complete the form and our team can learn more
                                about your requirements.
                            </p>
                        </div>

                        {success && (
                            <div className="mt-6 border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                                Your enquiry has been sent successfully. Our
                                team will get back to you soon.
                            </div>
                        )}

                        {error && (
                            <div className="mt-6 border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                                {error}
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-5"
                        >
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-violet-900">
                                        Your name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your name"
                                        className="w-full border border-violet-100 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-violet-900">
                                        Email address
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="you@example.com"
                                        className="w-full border border-violet-100 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                                    />
                                </div>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-violet-900">
                                        Institution
                                    </label>

                                    <input
                                        type="text"
                                        name="institution"
                                        value={formData.institution}
                                        onChange={handleChange}
                                        required
                                        placeholder="Institution name"
                                        className="w-full border border-violet-100 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-violet-900">
                                        Phone
                                    </label>

                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Phone number"
                                        className="w-full border border-violet-100 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                                    />
                                </div>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-violet-900">
                                        Number of students
                                    </label>

                                    <select
                                        name="students"
                                        value={formData.students}
                                        onChange={handleChange}
                                        className="w-full border border-violet-100 bg-white px-4 py-3 text-sm text-gray-500 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                                    >
                                        <option value="">
                                            Select student count
                                        </option>

                                        <option value="up-to-500">
                                            Up to 500
                                        </option>

                                        <option value="500-3000">
                                            500–3,000
                                        </option>

                                        <option value="3000-plus">
                                            3,000+
                                        </option>

                                        <option value="multiple-campuses">
                                            Multiple campuses
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-violet-900">
                                        I'm interested in
                                    </label>

                                    <select
                                        name="interest"
                                        value={formData.interest}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-violet-100 bg-white px-4 py-3 text-sm text-gray-500 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                                    >
                                        <option value="">
                                            Select an option
                                        </option>

                                        <option value="platform">
                                            Education Platform
                                        </option>

                                        <option value="demo">
                                            Platform Demo
                                        </option>

                                        <option value="ai">
                                            AI / LLM / RAG
                                        </option>

                                        <option value="enterprise">
                                            Enterprise Solution
                                        </option>

                                        <option value="integration">
                                            Custom Integration
                                        </option>

                                        <option value="support">
                                            General Enquiry
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-violet-900">
                                    Tell us about your requirements
                                </label>

                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="6"
                                    placeholder="Tell us about your institution, requirements, campuses, students, or AI needs..."
                                    className="w-full resize-none border border-violet-100 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex w-full items-center justify-center gap-3 bg-violet-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Sending..." : "Send Enquiry"}

                                {!loading && (
                                    <FaArrowRight className="text-xs" />
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <section className="px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600">
                                Why ZensonEdu
                            </p>

                            <h2 className="mt-3 text-3xl font-black text-violet-900 sm:text-4xl">
                                One platform that grows with your institution
                            </h2>

                            <p className="mt-5 leading-7 text-gray-500">
                                Start with the core tools your institution needs
                                and expand into advanced academic management,
                                analytics, and AI-powered capabilities.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {benefits.map((benefit) => (
                                <div
                                    key={benefit}
                                    className="flex items-start gap-3 bg-violet-50/60 p-4"
                                >
                                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-white text-violet-600">
                                        <FaCheck className="text-[9px]" />
                                    </div>

                                    <span className="text-sm font-medium text-gray-600">
                                        {benefit}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-5 pb-20 sm:px-6 lg:px-8 lg:pb-24">
                <div className="mx-auto max-w-5xl bg-gradient-to-r from-violet-600 to-cyan-500 px-7 py-12 text-center shadow-2xl shadow-violet-200 sm:px-12 lg:py-16">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center bg-white/15 text-white">
                        <FaRobot className="text-xl" />
                    </div>

                    <h2 className="mt-6 text-3xl font-black text-white sm:text-4xl">
                        Interested in AI-powered education?
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
                        Explore how LLMs, vector search, and
                        retrieval-augmented generation can turn your
                        institution's resources into an intelligent knowledge
                        platform.
                    </p>

                    <a
                        href="#"
                        className="mt-8 inline-flex items-center gap-3 bg-white px-7 py-3.5 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
                    >
                        Discuss AI Features
                        <FaArrowRight className="text-xs" />
                    </a>
                </div>
            </section>
        </main>
    );
};

export default Contact;