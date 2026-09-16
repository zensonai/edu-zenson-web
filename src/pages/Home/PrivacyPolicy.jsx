import React from "react";
import {
    FaArrowLeft,
    FaDatabase,
    FaGraduationCap,
    FaLock,
    FaShieldHalved,
    FaUserShield
} from "react-icons/fa6";

const PrivacyPolicy = () => {
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
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center bg-violet-50 text-violet-600">
                        <FaUserShield className="text-xl" />
                    </div>

                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
                        ZensonEdu Legal
                    </p>

                    <h1 className="text-4xl font-bold tracking-[-1.5px] text-violet-950 sm:text-5xl">
                        Privacy Policy
                    </h1>

                    <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-500">
                        This Privacy Policy explains how ZensonEdu collects,
                        uses, protects and manages information when you use
                        our education platform and related services.
                    </p>

                    <p className="mt-4 text-xs font-medium text-violet-400">
                        Last updated: September 10, 2026
                    </p>
                </div>

                <div className="space-y-8">

                    <section className="bg-white p-6 shadow-[0_15px_50px_rgba(124,58,237,0.06)] sm:p-8">
                        <h2 className="text-xl font-bold text-violet-950">
                            1. Introduction
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            ZensonEdu is an education software platform that
                            enables schools, academies, training institutes and
                            higher education organisations to create and manage
                            their own digital education environment.
                        </p>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            We respect your privacy and are committed to
                            protecting personal and educational information
                            processed through the platform.
                        </p>
                    </section>

                    <section className="bg-white p-6 shadow-[0_15px_50px_rgba(124,58,237,0.06)] sm:p-8">
                        <div className="flex items-center gap-3">
                            <FaDatabase className="text-violet-500" />
                            <h2 className="text-xl font-bold text-violet-950">
                                2. Information We Collect
                            </h2>
                        </div>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            Depending on how you use ZensonEdu, we may collect
                            and process the following categories of information:
                        </p>

                        <div className="mt-5 space-y-4">

                            <div className="bg-violet-50 p-5">
                                <h3 className="font-semibold text-violet-900">
                                    Account Information
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    Name, email address, password credentials,
                                    account role, institution information and
                                    account status.
                                </p>
                            </div>

                            <div className="bg-cyan-50 p-5">
                                <h3 className="font-semibold text-cyan-900">
                                    Education Information
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    Student records, instructor information,
                                    courses, programs, attendance, assignments,
                                    assessments, examination results,
                                    certificates and related academic data.
                                </p>
                            </div>

                            <div className="bg-violet-50 p-5">
                                <h3 className="font-semibold text-violet-900">
                                    Technical Information
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    IP address, browser information, device
                                    information, operating system, login
                                    activity, security events and basic usage
                                    information.
                                </p>
                            </div>

                            <div className="bg-cyan-50 p-5">
                                <h3 className="font-semibold text-cyan-900">
                                    Communications
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    Information you provide when contacting
                                    support, requesting a demonstration,
                                    requesting a quotation or communicating
                                    with our team.
                                </p>
                            </div>

                        </div>
                    </section>

                    <section className="bg-white p-6 shadow-[0_15px_50px_rgba(124,58,237,0.06)] sm:p-8">
                        <h2 className="text-xl font-bold text-violet-950">
                            3. How We Use Information
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            We may use information to:
                        </p>

                        <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-500">
                            <li>• Create and manage user accounts.</li>
                            <li>• Provide education management functionality.</li>
                            <li>• Manage students, instructors and academic programs.</li>
                            <li>• Process courses, assessments, examinations and certificates.</li>
                            <li>• Provide platform security and authentication.</li>
                            <li>• Monitor system performance and reliability.</li>
                            <li>• Respond to support requests.</li>
                            <li>• Improve platform functionality and user experience.</li>
                            <li>• Detect, prevent and investigate security incidents.</li>
                            <li>• Communicate important service and account information.</li>
                        </ul>
                    </section>

                    <section className="bg-white p-6 shadow-[0_15px_50px_rgba(124,58,237,0.06)] sm:p-8">
                        <div className="flex items-center gap-3">
                            <FaShieldHalved className="text-cyan-500" />

                            <h2 className="text-xl font-bold text-violet-950">
                                4. Educational Data
                            </h2>
                        </div>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            Educational institutions using ZensonEdu are
                            responsible for determining what student and
                            academic information is entered into their
                            platform.
                        </p>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            Institutions should only provide information that
                            is necessary for legitimate educational and
                            administrative purposes and should ensure that
                            users have appropriate permissions to access such
                            information.
                        </p>
                    </section>

                    <section className="bg-white p-6 shadow-[0_15px_50px_rgba(124,58,237,0.06)] sm:p-8">
                        <h2 className="text-xl font-bold text-violet-950">
                            5. Artificial Intelligence Features
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            Certain ZensonEdu plans may provide AI-powered
                            functionality, including LLM-based assistants,
                            AI question answering, semantic search, vector
                            databases and Retrieval-Augmented Generation
                            (RAG).
                        </p>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            Where enabled, information and educational resources
                            may be processed to provide answers, generate
                            assistance or retrieve relevant institutional
                            knowledge.
                        </p>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            AI-generated responses may contain errors and should
                            be reviewed by an appropriate person before being
                            relied upon for important academic, administrative
                            or institutional decisions.
                        </p>
                    </section>

                    <section className="bg-white p-6 shadow-[0_15px_50px_rgba(124,58,237,0.06)] sm:p-8">
                        <h2 className="text-xl font-bold text-violet-950">
                            6. Data Storage and Security
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            We use reasonable technical and organisational
                            measures to protect information against
                            unauthorised access, alteration, disclosure,
                            destruction and loss.
                        </p>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            Security measures may include authentication,
                            access controls, encrypted connections, password
                            hashing, session management, audit logging and
                            other security controls appropriate to the service.
                        </p>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            No internet-based service can guarantee absolute
                            security. Users and institutions are responsible
                            for maintaining secure passwords and protecting
                            their account credentials.
                        </p>
                    </section>

                    <section className="bg-white p-6 shadow-[0_15px_50px_rgba(124,58,237,0.06)] sm:p-8">
                        <h2 className="text-xl font-bold text-violet-950">
                            7. Data Sharing
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            We do not sell personal information as a commercial
                            product.
                        </p>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            Information may be processed or shared with trusted
                            service providers when necessary to operate the
                            platform, provide infrastructure, deliver email,
                            maintain security, process payments or provide
                            other requested services.
                        </p>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            Information may also be disclosed where required
                            by applicable law, legal process or to protect the
                            rights, safety and security of ZensonEdu, our users
                            or other parties.
                        </p>
                    </section>

                    <section className="bg-white p-6 shadow-[0_15px_50px_rgba(124,58,237,0.06)] sm:p-8">
                        <h2 className="text-xl font-bold text-violet-950">
                            8. Cookies and Similar Technologies
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            ZensonEdu may use cookies, local storage and similar
                            technologies to maintain authentication sessions,
                            remember preferences, improve security and support
                            platform functionality.
                        </p>
                    </section>

                    <section className="bg-white p-6 shadow-[0_15px_50px_rgba(124,58,237,0.06)] sm:p-8">
                        <h2 className="text-xl font-bold text-violet-950">
                            9. Data Retention
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            We retain information for as long as reasonably
                            necessary to provide the service, maintain
                            legitimate business records, comply with legal
                            obligations, resolve disputes and enforce our
                            agreements.
                        </p>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            Retention periods may vary depending on the type of
                            information and the requirements of the institution
                            using the platform.
                        </p>
                    </section>

                    <section className="bg-white p-6 shadow-[0_15px_50px_rgba(124,58,237,0.06)] sm:p-8">
                        <h2 className="text-xl font-bold text-violet-950">
                            10. Your Rights
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            Depending on applicable law, users may have rights
                            relating to their personal information, including
                            requesting access, correction, deletion or
                            restriction of certain processing.
                        </p>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            Requests relating to institutional education data
                            may need to be directed to the relevant
                            institution that controls the information.
                        </p>
                    </section>

                    <section className="bg-white p-6 shadow-[0_15px_50px_rgba(124,58,237,0.06)] sm:p-8">
                        <h2 className="text-xl font-bold text-violet-950">
                            11. Children's and Student Information
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            ZensonEdu may process student information on behalf
                            of educational institutions. Institutions are
                            responsible for ensuring that collection and use
                            of student information complies with applicable
                            privacy and education requirements.
                        </p>
                    </section>

                    <section className="bg-white p-6 shadow-[0_15px_50px_rgba(124,58,237,0.06)] sm:p-8">
                        <h2 className="text-xl font-bold text-violet-950">
                            12. Changes to This Privacy Policy
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            We may update this Privacy Policy from time to time
                            to reflect changes to our services, technology,
                            legal requirements or business practices.
                        </p>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            The updated version will be published on this page
                            with a revised "Last updated" date.
                        </p>
                    </section>

                    <section className="bg-gradient-to-br from-violet-600 to-cyan-500 p-7 text-white sm:p-9">
                        <div className="flex items-start gap-4">
                            <FaLock className="mt-1 text-xl text-cyan-200" />

                            <div>
                                <h2 className="text-xl font-bold">
                                    Privacy Questions
                                </h2>

                                <p className="mt-3 text-sm leading-6 text-violet-100">
                                    If you have questions about this Privacy
                                    Policy or how information is handled,
                                    please contact the ZensonEdu team through
                                    the contact options provided on our website.
                                </p>
                            </div>
                        </div>
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

export default PrivacyPolicy;