import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaUserGraduate, FaEnvelope, FaIdCard, FaCircleCheck } from 'react-icons/fa6'
import API from '../../../../services/api'

const ViewMyStudent = () => {
    const [loadError, setLoadError] = useState('')
    const { id } = useParams()
    const token = localStorage.getItem('access_token')
    const [student, setStudent] = useState(null)

    useEffect(() => {
        const fetchstudent = async () => {
            setLoadError('')
            try {
                const res = await API.get(`/student/my-student/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.data.success === true) {
                    setStudent(res.data.result)
                }
            } catch (err) {
                const message = err.response?.data?.message
                setLoadError(Array.isArray(message) ? message.join(' ') : message || 'Unable to load this record. Please try again.')
            }
        }

        if (token && id) fetchstudent()
    }, [token, id])

    if (loadError) {
        return (
            <div className="w-full bg-white p-4">
                <p role="alert" className="text-sm text-slate-700">{loadError}</p>
            </div>
        )
    }

    if (!student) {
        return (
            <div className="flex min-h-[400px] items-center justify-center bg-white">
                <div className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-500">
                        <FaUserGraduate className="h-5 w-5" />
                    </div>
                    <p className="mt-3 text-sm font-bold text-violet-900">
                        Loading student...
                    </p>
                </div>
            </div>
        )
    }

    const accountStatus = student.userId?.accountStatus || 'UNKNOWN'

    return (
        <div className="w-full bg-white p-3 sm:p-4">

            <div className="mb-6 rounded-2xl bg-gradient-to-br from-violet-50 via-white to-cyan-50 p-5 ring-1 ring-violet-100/70 sm:p-6">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                    <div className="flex min-w-0 items-start gap-3">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                            <FaUserGraduate className="h-5 w-5" />
                        </div>

                        <div className="min-w-0">

                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-violet-400">
                                My Student
                            </p>

                            <h1 className="mt-1 break-all text-xl font-black tracking-tight text-violet-950">
                                {student.admission_no || '-'}
                            </h1>

                            <p className="mt-1 break-all text-sm font-medium leading-5 text-slate-400">
                                {student.userId?.email || 'No email available'}
                            </p>

                        </div>

                    </div>

                    <span className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-[9px] font-black uppercase tracking-wider ${accountStatus === 'ACTIVE'
                        ? 'bg-lime-50 text-lime-700'
                        : accountStatus === 'SUSPENDED'
                            ? 'bg-red-50 text-red-600'
                            : 'bg-amber-50 text-amber-600'
                        }`}>

                        <span className={`h-1.5 w-1.5 rounded-full ${accountStatus === 'ACTIVE'
                            ? 'bg-lime-500'
                            : accountStatus === 'SUSPENDED'
                                ? 'bg-red-500'
                                : 'bg-amber-500'
                            }`} />

                        {accountStatus}

                    </span>

                </div>

            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-violet-100/70">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-500">
                            <FaEnvelope className="h-4 w-4" />
                        </div>

                        <div className="min-w-0">

                            <p className="text-[9px] font-black uppercase tracking-wider text-violet-400">
                                Email
                            </p>

                            <p className="mt-1 break-all text-sm font-black text-violet-950">
                                {student.userId?.email || '-'}
                            </p>

                        </div>

                    </div>

                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-violet-100/70">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-500">
                            <FaIdCard className="h-4 w-4" />
                        </div>

                        <div className="min-w-0">

                            <p className="text-[9px] font-black uppercase tracking-wider text-cyan-500">
                                Admission Number
                            </p>

                            <p className="mt-1 break-all text-sm font-black text-violet-950">
                                {student.admission_no || '-'}
                            </p>

                        </div>

                    </div>

                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-violet-100/70">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-50 text-lime-600">
                            <FaCircleCheck className="h-4 w-4" />
                        </div>

                        <div>

                            <p className="text-[9px] font-black uppercase tracking-wider text-lime-600">
                                Account Status
                            </p>

                            <p className="mt-1 text-sm font-black text-violet-950">
                                {accountStatus}
                            </p>

                        </div>

                    </div>

                </div>

            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">

                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-violet-100/70">

                    <div className="mb-4 flex items-center gap-2">
                        <FaUserGraduate className="h-3.5 w-3.5 text-violet-500" />
                        <h2 className="text-sm font-black text-violet-950">
                            Student Information
                        </h2>
                    </div>

                    <div className="flex flex-col gap-3">

                        <div className="rounded-xl bg-violet-50 px-3 py-3">

                            <p className="text-[9px] font-black uppercase tracking-wider text-violet-400">
                                Admission Number
                            </p>

                            <p className="mt-1 break-all text-xs font-black text-violet-900">
                                {student.admission_no || '-'}
                            </p>

                        </div>

                        <div className="rounded-xl bg-cyan-50 px-3 py-3">

                            <p className="text-[9px] font-black uppercase tracking-wider text-cyan-500">
                                Email Address
                            </p>

                            <p className="mt-1 break-all text-xs font-black text-cyan-800">
                                {student.userId?.email || '-'}
                            </p>

                        </div>

                    </div>

                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-violet-100/70">

                    <div className="mb-4 flex items-center gap-2">
                        <FaCircleCheck className="h-3.5 w-3.5 text-lime-500" />
                        <h2 className="text-sm font-black text-violet-950">
                            Account Information
                        </h2>
                    </div>

                    <div className="flex flex-col gap-2">

                        <div className={`flex items-center justify-between rounded-xl px-3 py-3 ${accountStatus === 'ACTIVE'
                            ? 'bg-lime-50'
                            : accountStatus === 'SUSPENDED'
                                ? 'bg-red-50'
                                : 'bg-amber-50'
                            }`}>

                            <div className="flex items-center gap-3">

                                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${accountStatus === 'ACTIVE'
                                    ? 'bg-lime-100 text-lime-600'
                                    : accountStatus === 'SUSPENDED'
                                        ? 'bg-red-100 text-red-600'
                                        : 'bg-amber-100 text-amber-600'
                                    }`}>
                                    <FaCircleCheck className="h-3 w-3" />
                                </div>

                                <div>

                                    <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                                        Status
                                    </p>

                                    <p className="mt-1 text-xs font-black text-violet-900">
                                        {accountStatus}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default ViewMyStudent