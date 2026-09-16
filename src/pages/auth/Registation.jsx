import React, { useState } from 'react'
import {
    FaArrowRight,
    FaBuildingColumns,
    FaShieldHalved,
    FaUsers
} from 'react-icons/fa6'
import DefaultInput from '../../component/Form/DefaultInput'
import DefaultButton from '../../component/Buttons/DefaultButton'
import Toast from '../../component/Toast/Toast'
import useForm from '../../hooks/useForm'
import API from '../../services/api'

const Registation = () => {
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(null)

    const { values, handleChange } = useForm({
        email: '',
        password: ''
    })

    const handleRegistration = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await API.post('/auth/register', values)
            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message
                })
            }
        }
        catch (err) {
            setToast({
                success: false,
                message:
                    err?.response?.data?.message ||
                    err?.message ||
                    'Something went wrong'
            })
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-cyan-50 px-4 py-6 sm:px-6 lg:px-8">

            {toast && (
                <div className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl items-center justify-center">

                <div className="grid w-full overflow-hidden bg-white shadow-[0_30px_90px_rgba(124,58,237,0.12)] lg:grid-cols-[1.05fr_0.95fr]">

                    <div className="relative hidden overflow-hidden bg-gradient-to-br from-violet-600 via-violet-500 to-cyan-500 lg:flex">

                        <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-white/10"></div>

                        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-cyan-300/20"></div>

                        <div className="absolute right-20 top-24 h-20 w-20 rotate-12 bg-white/10"></div>

                        <div className="absolute bottom-32 right-24 h-3 w-28 bg-cyan-200/70"></div>

                        <div className="relative z-10 flex min-h-[720px] w-full flex-col justify-between p-12 xl:p-16">

                            <div className="flex items-center gap-4">

                                <div className="flex h-12 w-12 items-center justify-center bg-white text-violet-600 shadow-lg">
                                    <FaBuildingColumns className="text-xl" />
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold text-white">
                                        ZensonEdu
                                    </h2>

                                    <p className="text-xs tracking-wide text-violet-100">
                                        Education Platform
                                    </p>
                                </div>

                            </div>

                            <div className="max-w-xl">

                                <div className="mb-7 inline-flex items-center gap-3">

                                    <span className="h-2.5 w-2.5 bg-cyan-200"></span>

                                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-violet-100">
                                        Build Your Platform
                                    </span>

                                </div>

                                <h1 className="text-5xl font-bold leading-[1.08] tracking-[-2px] text-white xl:text-6xl">
                                    Start your
                                    <span className="block text-cyan-200">
                                        education journey.
                                    </span>
                                </h1>

                                <p className="mt-7 max-w-lg text-base leading-7 text-violet-100">
                                    Create your ZensonEdu account and build a complete
                                    education platform for students, instructors,
                                    courses and academic management.
                                </p>

                                <div className="mt-10 grid max-w-lg grid-cols-2 gap-4">

                                    <div className="bg-white/10 p-5 backdrop-blur-sm">

                                        <FaUsers className="mb-4 text-xl text-cyan-200" />

                                        <p className="text-sm font-semibold text-white">
                                            Manage Education
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-violet-100">
                                            Students, instructors and programs
                                        </p>

                                    </div>

                                    <div className="bg-white/10 p-5 backdrop-blur-sm">

                                        <FaShieldHalved className="mb-4 text-xl text-cyan-200" />

                                        <p className="text-sm font-semibold text-white">
                                            Secure Platform
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-violet-100">
                                            Controlled access for every role
                                        </p>

                                    </div>

                                </div>

                            </div>

                            <div className="flex items-center gap-3">

                                <span className="h-2 w-2 bg-cyan-200"></span>

                                <p className="text-xs text-violet-100">
                                    Build, manage and grow your education platform
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="flex min-h-[720px] items-center justify-center px-6 py-10 sm:px-10 lg:px-14 xl:px-20">

                        <div className="w-full max-w-md">

                            <div className="mb-10 lg:hidden">

                                <div className="flex items-center gap-4">

                                    <div className="flex h-11 w-11 items-center justify-center bg-violet-50 text-violet-600">
                                        <FaBuildingColumns />
                                    </div>

                                    <div>
                                        <p className="text-base font-bold text-violet-950">
                                            ZensonEdu
                                        </p>

                                        <p className="text-[10px] uppercase tracking-[0.15em] text-violet-500">
                                            Education Platform
                                        </p>
                                    </div>

                                </div>

                            </div>

                            <div className="mb-10">

                                <div className="mb-5 flex h-11 w-11 items-center justify-center bg-cyan-50 text-cyan-600">
                                    <FaUsers className="text-lg" />
                                </div>

                                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
                                    Get Started
                                </p>

                                <h1 className="text-4xl font-bold tracking-[-1.5px] text-violet-950 sm:text-5xl">
                                    Create account
                                </h1>

                                <p className="mt-4 text-sm leading-6 text-slate-500">
                                    Create your ZensonEdu account and start
                                    building your education platform.
                                </p>

                            </div>

                            <form
                                onSubmit={handleRegistration}
                                className="space-y-6"
                            >

                                <div>
                                    <DefaultInput
                                        label="Email Address"
                                        type='email'
                                        value={values.email}
                                        name="email"
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your email address"
                                    />
                                </div>

                                <div>
                                    <DefaultInput
                                        label="Password"
                                        type='password'
                                        value={values.password}
                                        name="password"
                                        onChange={handleChange}
                                        required
                                        placeholder="Create your password"
                                    />
                                </div>

                                <div className="flex items-start gap-3 pt-1">

                                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center bg-violet-50 text-[9px] font-bold text-violet-600">
                                        ✓
                                    </span>

                                    <p className="text-xs leading-5 text-slate-400">
                                        Your account information will be securely
                                        handled and used to provide access to
                                        your education platform.
                                    </p>

                                </div>

                                <div className="pt-3">

                                    <DefaultButton
                                        type="submit"
                                        label={
                                            loading
                                                ? 'Creating account...'
                                                : 'Create Account'
                                        }
                                    />

                                </div>

                            </form>

                            <div className="mt-10 border-t border-violet-100 pt-7">

                                <div className="flex items-center justify-between gap-5">

                                    <div>
                                        <p className="text-sm font-semibold text-violet-900">
                                            Already have an account?
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-slate-400">
                                            Sign in to continue to your platform.
                                        </p>
                                    </div>

                                    <a
                                        href="/login"
                                        className="flex h-11 w-11 shrink-0 items-center justify-center bg-violet-50 text-violet-600 transition hover:bg-violet-600 hover:text-white"
                                    >
                                        <FaArrowRight className="text-sm" />
                                    </a>

                                </div>

                            </div>

                            <div className="mt-8 flex items-center justify-center gap-2">

                                <span className="h-1.5 w-1.5 bg-violet-500"></span>

                                <span className="h-1.5 w-8 bg-cyan-400"></span>

                                <span className="h-1.5 w-1.5 bg-violet-300"></span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Registation