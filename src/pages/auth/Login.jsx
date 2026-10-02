import React, { useRef, useState } from 'react'
import { FaArrowRight, FaBuildingColumns, FaShieldHalved, FaUsers } from 'react-icons/fa6'
import { GoogleLogin } from '@react-oauth/google'
import DefaultInput from '../../component/Form/DefaultInput';
import DefaultButton from '../../component/Buttons/DefaultButton';
import Toast from '../../component/Toast/Toast';
import useForm from '../../hooks/useForm';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [loading, setLoading] = useState(false)
    const loginPending = useRef(false)
    const [googleLoading, setGoogleLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const { values, handleChange } = useForm({
        email: '',
        password: ''
    });

    const headleLogin = async (e) => {
        e.preventDefault();
        if (loginPending.current) return;
        loginPending.current = true;
        setLoading(true)

        try {
            const res = await API.post('/auth/login', values)

            if (res.data.success === true) {
                login(
                    res.data.accessToken,
                    res.data.refreshToken
                )
                setToast({
                    success: true,
                    message: res.data.message
                })

                setTimeout(() => {
                    navigate('/dashboard')
                }, 3000)
            }
        }
        catch (err) {
            setToast({
                success: false,
                message: err.response?.data?.message,
            });
        }
        finally {
            loginPending.current = false;
            setLoading(false)
        }
    }

    const handleGoogleLogin = async (credentialResponse) => {
        setGoogleLoading(true)

        try {
            const res = await API.post('/auth/google-login', {
                credential: credentialResponse.credential
            })

            if (res.data.accessToken && res.data.refreshToken) {
                login(
                    res.data.accessToken,
                    res.data.refreshToken,
                    res.data.user
                )

                setToast({
                    success: true,
                    message: res.data.message
                })

                setTimeout(() => {
                    navigate('/dashboard', { replace: true })
                }, 500)

                return
            }

            setToast({
                success: false,
                message: res.data.message || 'Google login failed'
            })
        } catch (err) {
            console.log('GOOGLE LOGIN ERROR:', err.response?.data || err)

            setToast({
                success: false,
                message:
                    err.response?.data?.message ||
                    'Google login failed'
            })
        } finally {
            setGoogleLoading(false)
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
                <div className="grid w-full min-w-0 grid-cols-1 overflow-hidden bg-white shadow-[0_30px_90px_rgba(124,58,237,0.12)] lg:grid-cols-[0.95fr_1.05fr]">

                    <div className="relative hidden overflow-hidden bg-gradient-to-br from-violet-600 via-violet-500 to-cyan-500 p-10 lg:flex xl:p-14">
                        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10"></div>
                        <div className="absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-cyan-300/20"></div>
                        <div className="absolute right-16 top-32 h-20 w-20 rotate-12 bg-white/10"></div>
                        <div className="absolute bottom-28 right-20 h-3 w-28 bg-cyan-200/70"></div>

                        <div className="relative z-10 flex w-full flex-col justify-between">

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

                            <div className="max-w-lg">
                                <div className="mb-6 inline-flex items-center gap-3">
                                    <span className="h-2.5 w-2.5 bg-cyan-200"></span>

                                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-violet-100">
                                        Your Education Platform
                                    </span>
                                </div>

                                <h1 className="text-5xl font-bold leading-[1.08] tracking-[-2px] text-white xl:text-6xl">
                                    Your institution.
                                    <span className="block text-cyan-200">
                                        Your platform.
                                    </span>
                                </h1>

                                <p className="mt-7 max-w-md text-base leading-7 text-violet-100">
                                    Manage students, instructors, courses, academic
                                    programs, assessments and your complete education
                                    journey from one platform.
                                </p>

                                <div className="mt-10 grid max-w-lg grid-cols-2 gap-4">
                                    <div className="bg-white/10 p-5 backdrop-blur-sm">
                                        <FaUsers className="mb-4 text-xl text-cyan-200" />

                                        <p className="text-sm font-semibold text-white">
                                            Education Management
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

                    <div className="flex min-w-0 min-h-[680px] items-center justify-center px-6 py-10 sm:px-10 lg:px-14 xl:px-20">

                        <div className="w-full min-w-0 max-w-md">

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
                                <div className="mb-4 flex h-11 w-11 items-center justify-center bg-cyan-50 text-cyan-600">
                                    <FaShieldHalved className="text-lg" />
                                </div>

                                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
                                    Welcome Back
                                </p>

                                <h1 className="text-4xl font-bold tracking-[-1.5px] text-violet-950 sm:text-5xl">
                                    Sign in
                                </h1>

                                <p className="mt-4 text-sm leading-6 text-slate-500">
                                    Sign in to manage your education platform,
                                    courses, students and academic activities.
                                </p>
                            </div>

                            <form method="post" onSubmit={headleLogin} className="space-y-6">
                                <div>
                                    <DefaultInput
                                        label={"Email Address"}
                                        value={values.email}
                                        name={'email'}
                                        onChange={handleChange}
                                        required
                                        placeholder={"Enter your email address"}
                                    />
                                </div>

                                <div>
                                    <DefaultInput
                                        label={"Password"}
                                        type='password'
                                        value={values.password}
                                        name={'password'}
                                        onChange={handleChange}
                                        required
                                        placeholder={"Enter your password"}
                                    />
                                </div>

                                <div className="flex items-center justify-between pt-1">
                                    <a href="/forget-password">
                                        <button
                                            type="button"
                                            className="text-sm font-semibold text-violet-600 transition hover:text-cyan-600"
                                        >
                                            Forgot password?
                                        </button>
                                    </a>
                                </div>

                                <div className="pt-3">
                                    <DefaultButton
                                        type="submit"
                                        label={loading ? 'Signing in...' : 'Sign In'}
                                        disabled={loading}
                                    />
                                </div>
                            </form>

                            <div className="my-7 flex items-center gap-4">
                                <div className="h-px flex-1 bg-violet-100"></div>
                                <span className="text-xs font-medium text-slate-400">
                                    OR
                                </span>
                                <div className="h-px flex-1 bg-violet-100"></div>
                            </div>

                            <div className={`flex justify-center ${googleLoading ? 'pointer-events-none opacity-60' : ''}`}>
                                <GoogleLogin
                                    onSuccess={handleGoogleLogin}
                                    onError={() => {
                                        setToast({
                                            success: false,
                                            message: 'Google login failed'
                                        })
                                    }}
                                    text="signin_with"
                                    shape="rectangular"
                                    size="large"
                                />
                            </div>

                            <div className="mt-10 border-t border-violet-100 pt-7">
                                <div className="flex items-center justify-between gap-5">
                                    <div>
                                        <p className="text-sm font-semibold text-violet-900">
                                            New to ZensonEdu?
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-slate-400">
                                            Create your education platform account.
                                        </p>
                                    </div>

                                    <a href="register">
                                        <button
                                            type="button"
                                            className="flex h-11 w-11 shrink-0 items-center justify-center bg-violet-50 text-violet-600 transition hover:bg-violet-600 hover:text-white"
                                        >
                                            <FaArrowRight className="text-sm" />
                                        </button>
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

export default Login