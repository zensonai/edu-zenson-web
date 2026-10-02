import React, { useEffect, useState } from 'react'
import { FaEnvelope } from 'react-icons/fa'
import useForm from '../../hooks/useForm'
import API from '../../services/api'
import Toast from '../../component/Toast/Toast'
import DefaultButton from '../../component/Buttons/DefaultButton'
import DefaultInput from '../../component/Form/DefaultInput'

const ForgetPassword = () => {
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)

    const { values, handleChange } = useForm({
        email: '',
    });

    const headleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const res = await API.post('/auth/forget-password', values)
            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message,
                })
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
                <div className="fixed top-6 right-6 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
                <div className="w-full max-w-md">

                    <div className="overflow-hidden bg-white p-8 shadow-[0_24px_70px_rgba(124,58,237,0.12)] sm:p-10">

                        <div className="mb-8">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center bg-violet-50 text-violet-600">
                                <FaEnvelope className="text-xl" />
                            </div>

                            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
                                Account Recovery
                            </p>

                            <h1 className="text-3xl font-bold tracking-tight text-violet-950">
                                Forgot Password?
                            </h1>

                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                Enter your email address and we'll send you a
                                password reset link.
                            </p>
                        </div>

                        <form onSubmit={headleResetPassword} className="space-y-5">
                            <DefaultInput
                                label="Email Address"
                                name="email"
                                type="email"
                                value={values.email}
                                onChange={handleChange}
                                placeholder="Enter your email address"
                                required
                            />

                            <div className="pt-2">
                                <DefaultButton
                                    type="submit"
                                    label={loading ? 'Sending...' : 'Request Password Reset Link'}
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

                        <div className="mx-auto mt-6 h-1 w-12 bg-gradient-to-r from-violet-500 to-cyan-400" />

                    </div>

                </div>
            </div>
        </div>
    )

}

export default ForgetPassword