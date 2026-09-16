import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { FaLock } from 'react-icons/fa'
import useForm from '../../hooks/useForm'
import API from '../../services/api'
import Toast from '../../component/Toast/Toast'
import DefaultButton from '../../component/Buttons/DefaultButton'
import DefaultInput from '../../component/Form/DefaultInput'


const ResetPassword = () => {
    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")

    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [token]);

    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)

    const { values, handleChange } = useForm({
        password: ''
    });

    const headleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const res = await API.post(`/auth/reset-password/${token}`, values)
            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message,
                })
                setTimeout(() => {
                    navigate('/login')
                }, 3000)
            }
        }
        catch (err) {
            setToast({
                success: false,
                message: err.response?.data?.message || "Something went wrong",
            });
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-cyan-50 px-4 py-8 sm:px-6">

            {toast && (
                <div className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
                <div className="w-full max-w-md">

                    <div className="overflow-hidden bg-white shadow-[0_30px_80px_rgba(124,58,237,0.12)]">

                        <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 to-cyan-500 px-8 py-8 sm:px-10">

                            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10"></div>

                            <div className="absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-cyan-300/20"></div>

                            <div className="relative z-10 flex items-center gap-4">

                                <div className="flex h-12 w-12 items-center justify-center bg-white text-violet-600 shadow-lg">
                                    <FaLock className="text-lg" />
                                </div>

                                <div>
                                    <p className="text-lg font-bold text-white">
                                        ZensonEdu
                                    </p>

                                    <p className="text-xs tracking-wide text-violet-100">
                                        Education Platform
                                    </p>
                                </div>

                            </div>

                        </div>

                        <div className="p-8 sm:p-10">

                            <div className="mb-8">

                                <div className="mb-5 inline-flex h-10 w-10 items-center justify-center bg-violet-50 text-violet-600">
                                    <FaLock className="text-sm" />
                                </div>

                                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
                                    Account Security
                                </p>

                                <h1 className="text-3xl font-bold tracking-[-1px] text-violet-950 sm:text-4xl">
                                    Reset Password
                                </h1>

                                <p className="mt-3 text-sm leading-6 text-slate-500">
                                    Create a new password to secure your
                                    ZensonEdu account.
                                </p>

                            </div>

                            <form
                                onSubmit={headleResetPassword}
                                className="space-y-5"
                            >

                                <DefaultInput
                                    label="New Password"
                                    name="password"
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    placeholder="Enter your new password"
                                    required
                                />

                                <div className="pt-3">
                                    <DefaultButton
                                        type="submit"
                                        label={loading ? 'Resetting...' : 'Reset Password'}
                                    />
                                </div>

                            </form>

                            <div className="mt-8 border-t border-violet-100 pt-6 text-center">

                                <p className="text-sm text-slate-500">
                                    Remember your password?{" "}
                                    <a
                                        href="/login"
                                        className="font-semibold text-violet-600 transition hover:text-cyan-600"
                                    >
                                        Back to Login
                                    </a>
                                </p>

                            </div>

                            <div className="mt-7 flex items-center justify-center gap-2">

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

export default ResetPassword