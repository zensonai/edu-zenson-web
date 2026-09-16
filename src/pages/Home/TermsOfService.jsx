import React from "react";
import {
    FaArrowLeft,
    FaBookOpen,
    FaGraduationCap,
    FaShieldHalved,
    FaUserCheck
} from "react-icons/fa6";

const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-cyan-50">

            <div className="border-b border-violet-100 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">

                    <a
                        href="/"
                        className="flex items-center gap-3"
                    >
                        <div className="flex h-10 w-10 items-center justify-center bg-violet-50 text-violet-600">
                            <FaGraduationCap className="text-lg" />
                        </div>

                        <div>
                            <p className="text-base font-bold text-violet-950">
                                ZensonEdu
                            </p>

                            <p className="text-[10px] uppercase tracking-[0.15em] text-violet-500">
                                Education Platform
                            </p>
                        </div>
                    </a>

                    <a
                        href="/"
                        className="flex items-center gap-2 text-sm font-semibold text-violet-600 transition hover:text-cyan-600"
                    >
                        <FaArrowLeft className="text-xs" />
                        Back
                    </a>

                </div>
            </div>

            <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">

                <div className="mb-12">
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center bg-cyan-50 text-cyan-600">
                        <FaBookOpen className="text-xl" />
                    </div>

                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">
                        ZensonEdu Legal
                    </p>

                    <h1 className="text-4xl font-bold tracking-[-1.5px] text-violet-950 sm:text-5xl">
                        Terms of Service
                    </h1>

                    <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-500">
                        These Terms of Service govern your access to and use of
                        the ZensonEdu education platform and related services.
                    </p>

                    <p className="mt-4 text-xs font-medium text-violet-400">
                        Last updated: September 10, 2026
                    </p>
                </div>

                <div className="space-y-8">

                    <section className="bg-white p-6 shadow-[0_15px_50px_rgba(124,58,237,0.06)] sm:p-8">
                        <h2 className="text-xl font-bold text-violet-950">
                            1. Acceptance of Terms
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            By accessing or using ZensonEdu, you agree to be
                            bound by these Terms of Service. If you do not agree
                            with these terms, you should not use the platform.
                        </p>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            If you use ZensonEdu on behalf of an educational
                            institution or organisation, you confirm that you
                            have authority to accept these terms on its behalf.
                        </p>
                    </section>

                    <section className="bg-white p-6 shadow-[0_15px_50px_rgba(124,58,237,0.06)] sm:p-8">
                        <div className="flex items-center gap-3">
                            <FaGraduationCap className="text-violet-500" />

                            <h2 className="text-xl font-bold text-violet-950">
                                2. The ZensonEdu Platform
                            </h2>
                        </div>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            ZensonEdu provides cloud-based education management
                            functionality that may include student management,
                            instructor management, courses, academic programs,
                            attendance, assignments, assessments, examinations,
                            results, certificates, announcements, analytics
                            and access control.
                        </p>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            Features available to you depend on your institution,
                            subscription plan, account role and enabled
                            services.
                        </p>
                    </section>

                    <section className="bg-white p-6 shadow-[0_15px_50px_rgba(124,58,237,0.06)] sm:p-8">
                        <h2 className="text-xl font-bold text-violet-950">
                            3. Accounts
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            You are responsible for providing accurate account
                            information and keeping your login credentials
                            confidential.
                        </p>

                        <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-500">
                            <li>• Do not share your password with unauthorised users.</li>
                            <li>• Do not attempt to access another user's account.</li>
                            <li>• Notify the appropriate administrator if you suspect unauthorised access.</li>
                            <li>• Provide accurate information when creating an account.</li>
                            <li>• Use the platform only for lawful and authorised purposes.</li>
                        </ul>
                    </section>

                    <section className="bg-white p-6 shadow-[0_15px_50px_rgba(124,58,237,0.06)] sm:p-8">
                        <h2 className="text-xl font-bold text-violet-950">
                            4. Institution Responsibilities
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            Institutions using ZensonEdu are responsible for
                            managing their users, roles, permissions and
                            educational information.
                        </p>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            Institutions must ensure that their use of the
                            platform complies with applicable laws,
                            regulations, educational requirements and their
                            own internal policies.
                        </p>
                    </section>

                    <section className="bg-white p-6 shadow-[0_15px_50px_rgba(124,58,237,0.06)] sm:p-8">
                        <div className="flex items-center gap-3">
                            <FaUserCheck className="text-cyan-500" />

                            <h2 className="text-xl font-bold text-violet-950">
                                5. Acceptable Use
                            </h2>
                        </div>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            You agree not to use ZensonEdu to:
                        </p>

                        <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-500">
                            <li>• Violate applicable laws or regulations.</li>
                            <li>• Access systems or information without authorisation.</li>
                            <li>• Upload malicious software or harmful code.</li>
                            <li>• Attempt to interfere with platform availability or security.</li>
                            <li>• Abuse authentication or access-control mechanisms.</li>
                            <li>• Misuse another institution's or user's information.</li>
                            <li>• Upload content that infringes intellectual property or privacy rights.</li>
                            <li>• Use the platform for fraudulent or unlawful activities.</li>
                        </ul>
                    </section>

                    <section className="bg-white p-6 shadow-[0_15px_50px_rgba(124,58,237,0.06)] sm:p-8">
                        <h2 className="text-xl font-bold text-violet-950">
                            6. Subscription Plans and Services
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            ZensonEdu may offer different service plans with
                            different limits, features and capabilities.
                            Features available under each plan are described
                            on the applicable pricing or service page.
                        </p>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            Pricing, billing terms, implementation services and
                            custom enterprise arrangements may be agreed
                            separately between ZensonEdu and the relevant
                            institution.
                        </p>
                    </section>

                    <section className="bg-white p-6 shadow-[0_15px_50px_rgba(124,58,237,0.06)] sm:p-8">
                        <h2 className="text-xl font-bold text-violet-950">
                            7. AI and RAG Features
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            Certain plans may include artificial intelligence
                            capabilities such as LLM assistants, AI question
                            answering, vector databases, semantic search and
                            Retrieval-Augmented Generation.
                        </p>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            AI functionality is provided as an assistance tool
                            and does not guarantee that generated information
                            will always be accurate, complete, current or
                            suitable for a particular academic or
                            administrative decision.
                        </p>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            Users and institutions should review important
                            AI-generated information before using it for
                            decisions involving students, academic results,
                            institutional policies or other consequential
                            matters.
                        </p>
                    </section>

                    <section className="bg-white p-6 shadow-[0_15px_50px_rgba(124,58,237,0.06)] sm:p-8">
                        <h2 className="text-xl font-bold text-violet-950">
                            8. Intellectual Property
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            ZensonEdu and its licensors retain rights in the
                            platform, software, design, branding, documentation
                            and other materials provided by ZensonEdu unless
                            otherwise agreed in writing.
                        </p>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            Institutions and users retain ownership of content
                            and educational information they provide to the
                            platform, subject to the rights necessary for
                            ZensonEdu to operate and provide the service.
                        </p>
                    </section>

                    <section className="bg-white p-6 shadow-[0_15px_50px_rgba(124,58,237,0.06)] sm:p-8">
                        <h2 className="text-xl font-bold text-violet-950">
                            9. Availability and Maintenance
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            We aim to provide a reliable and secure service.
                            However, availability may occasionally be affected
                            by maintenance, infrastructure failures, security
                            incidents, third-party services, network problems
                            or circumstances outside our reasonable control.
                        </p>
                    </section>

                    <section className="bg-white p-6 shadow-[0_15px_50px_rgba(124,58,237,0.06)] sm:p-8">
                        <div className="flex items-center gap-3">
                            <FaShieldHalved className="text-violet-500" />

                            <h2 className="text-xl font-bold text-violet-950">
                                10. Security
                            </h2>
                        </div>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            Users must not attempt to bypass security controls,
                            access restricted resources, interfere with
                            authentication systems or conduct security testing
                            against ZensonEdu without appropriate authorisation.
                        </p>
                    </section>

                    <section className="bg-white p-6 shadow-[0_15px_50px_rgba(124,58,237,0.06)] sm:p-8">
                        <h2 className="text-xl font-bold text-violet-950">
                            11. Suspension and Termination
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            Access may be suspended or terminated where
                            necessary to protect the platform, users or
                            institutions, including in cases of serious
                            security concerns, misuse, unlawful activity,
                            violation of these terms or non-payment where
                            applicable.
                        </p>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            Institutions should maintain appropriate backups and
                            data-export procedures for information they manage
                            through the platform.
                        </p>
                    </section>

                    <section className="bg-white p-6 shadow-[0_15px_50px_rgba(124,58,237,0.06)] sm:p-8">
                        <h2 className="text-xl font-bold text-violet-950">
                            12. Disclaimer
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            ZensonEdu is provided on an "as available" basis.
                            To the extent permitted by applicable law, we do
                            not guarantee that the platform will always be
                            uninterrupted, error-free or completely secure.
                        </p>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            Educational institutions remain responsible for
                            their academic decisions, policies, student
                            management and use of information generated or
                            processed through the platform.
                        </p>
                    </section>

                    <section className="bg-white p-6 shadow-[0_15px_50px_rgba(124,58,237,0.06)] sm:p-8">
                        <h2 className="text-xl font-bold text-violet-950">
                            13. Limitation of Liability
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            To the maximum extent permitted by applicable law,
                            ZensonEdu will not be responsible for indirect,
                            incidental, special or consequential losses arising
                            from use of or inability to use the platform.
                        </p>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            Nothing in these terms is intended to exclude or
                            limit liability where such exclusion or limitation
                            is prohibited by applicable law.
                        </p>
                    </section>

                    <section className="bg-white p-6 shadow-[0_15px_50px_rgba(124,58,237,0.06)] sm:p-8">
                        <h2 className="text-xl font-bold text-violet-950">
                            14. Changes to These Terms
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            We may update these Terms of Service when our
                            platform, services, business practices or legal
                            requirements change.
                        </p>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            Updated terms will be published on this page with
                            a revised "Last updated" date.
                        </p>
                    </section>

                    <section className="bg-white p-6 shadow-[0_15px_50px_rgba(124,58,237,0.06)] sm:p-8">
                        <h2 className="text-xl font-bold text-violet-950">
                            15. Governing Law
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            These terms are intended to be interpreted in
                            accordance with applicable law. Where a specific
                            governing law or dispute-resolution arrangement is
                            required for a particular institution or
                            subscription, that arrangement may be established
                            in the applicable service agreement.
                        </p>
                    </section>

                    <section className="bg-gradient-to-br from-violet-600 to-cyan-500 p-7 text-white sm:p-9">
                        <h2 className="text-xl font-bold">
                            Questions About These Terms?
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-violet-100">
                            If you have questions about ZensonEdu, these Terms
                            of Service or your institution's service agreement,
                            please contact the ZensonEdu team through the
                            contact options available on our website.
                        </p>
                    </section>

                </div>

            </main>

            <footer className="border-t border-violet-100 bg-white px-4 py-7 text-center">
                <p className="text-xs text-gray-500">
                    © {new Date().getFullYear()} ZensonEdu. All rights reserved.
                </p>
            </footer>

        </div>
    );
};

export default TermsOfService;