import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    FiCheckCircle,
    FiShield,
    FiUser,
    FiMail,
    FiBook
} from 'react-icons/fi'
import useForm from '../../../../hooks/useForm'
import API from '../../../../services/api'
import Toast from '../../../../component/Toast/Toast'
import DefaultInput from '../../../../component/Form/DefaultInput'
import DefaultButton from '../../../../component/Buttons/DefaultButton'
import { FaChalkboardUser } from 'react-icons/fa6'

const CreateTeacher = () => {
    const token = localStorage.getItem('access_token')
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const navigate = useNavigate()

    const { values, handleChange } = useForm({
        firstName: '',
        teacher_no: '',
        email: '',
    });

    const headleCreateTeacher = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const res = await API.post('/teacher/create-teacher', values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message
                })

                setTimeout(() => {
                    navigate('/dashboard/teachers')
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
            setLoading(false)
        }
    }

    return (
        <div className="w-full bg-white p-4 sm:p-5 lg:p-6">
            {toast && (
                <div className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div className="mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-50 via-white to-cyan-50 ring-1 ring-violet-100/70">
                <div className="flex flex-col gap-4 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-200">
                            <FaChalkboardUser className="h-6 w-6" />
                        </div>

                        <div>
                            <p className="mb-1 text-[9px] font-black uppercase tracking-[0.18em] text-violet-500">
                                Teacher Management
                            </p>
                            <h1 className="text-xl font-black tracking-tight text-violet-950 sm:text-2xl">
                                Create Teacher
                            </h1>
                            <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500 sm:text-sm">
                                Create a new Teacher account and add the Teacher to your institution.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 self-start rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-violet-100 lg:self-auto">
                        <FiShield className="h-4 w-4 text-violet-600" />
                        <span className="text-[10px] font-black uppercase tracking-wider text-violet-700">
                            Secure Setup
                        </span>
                    </div>
                </div>
            </div>

            <form onSubmit={headleCreateTeacher} className="space-y-5">
                <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                    <div className="border-b border-violet-50 bg-gradient-to-r from-violet-50/70 via-white to-white px-5 py-4 sm:px-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                                <FiUser className="h-4 w-4" />
                            </div>

                            <div>
                                <h2 className="text-sm font-black text-violet-950">
                                    Teacher Information
                                </h2>
                                <p className="text-[11px] text-slate-400">
                                    Enter the basic Teacher details
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-x-5 px-5 py-5 md:grid-cols-2 sm:px-6">
                        <DefaultInput
                            label="First Name"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            placeholder="Enter Teacher first name"
                            required
                        />

                        <DefaultInput
                            label="Teacher Number"
                            name="teacher_no"
                            value={values.teacher_no}
                            onChange={handleChange}
                            placeholder="Enter Teacher number"
                            required
                        />
                    </div>
                </div>

                <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                    <div className="border-b border-cyan-50 bg-gradient-to-r from-cyan-50/70 via-white to-white px-5 py-4 sm:px-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600">
                                <FiMail className="h-4 w-4" />
                            </div>

                            <div>
                                <h2 className="text-sm font-black text-violet-950">
                                    Contact Information
                                </h2>
                                <p className="text-[11px] text-slate-400">
                                    Enter the Teacher's email address
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-x-5 px-5 py-5 sm:px-6">
                        <DefaultInput
                            label="Email"
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            placeholder="Enter Teacher email address"
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-violet-50 via-white to-cyan-50 p-4 ring-1 ring-violet-100/70 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                    <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-lime-600 shadow-sm ring-1 ring-lime-100">
                            <FiCheckCircle className="h-4 w-4" />
                        </div>

                        <div>
                            <p className="text-xs font-black text-violet-950">
                                Ready to create Teacher
                            </p>
                            <p className="mt-1 text-[11px] leading-4 text-slate-500">
                                Make sure the Teacher's name, teacher number and email are correct.
                            </p>
                        </div>
                    </div>

                    <div className="w-full sm:w-auto">
                        <DefaultButton
                            type="submit"
                            label={loading ? 'Creating Teacher...' : 'Create Teacher'}
                            disabled={loading}
                            loading={loading}
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateTeacher