import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    FaGraduationCap,
    FaUser,
    FaUserCheck,
    FaIdCard,
    FaEnvelope,
    FaCircleCheck
} from 'react-icons/fa6'
import API from '../../../../services/api'

const ViewTeacher = () => {
    const [loadError, setLoadError] = useState('')
    const { id } = useParams()
    const token = localStorage.getItem('access_token')
    const [teacher, setTeacher] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchteacherdata = async () => {
            setLoadError('')
            setLoading(true)
            try {
                const res = await API.get(`/teacher/institute-teacher/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.data.success === true) {
                    setTeacher(res.data.result)
                }
            } catch (err) {
                const message = err.response?.data?.message
                setLoadError(Array.isArray(message) ? message.join(' ') : message || 'Unable to load this record. Please try again.')
            } finally {
                setLoading(false)
            }
        }

        if (token) fetchteacherdata()
    }, [token, id])

    if (loadError) {
        return (
            <div className="w-full bg-white p-4">
                <p role="alert" className="text-sm text-slate-700">{loadError}</p>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="w-full min-w-0 max-w-full overflow-hidden bg-white p-3 sm:p-4">

                <div className="mb-6">
                    <div className="mb-2 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-violet-400">
                            Education SaaS
                        </p>
                    </div>

                    <h1 className="text-xl font-black tracking-tight text-violet-950">
                        Teacher Details
                    </h1>

                    <p className="mt-1 text-sm font-medium text-slate-400">
                        Loading teacher details
                    </p>
                </div>

                <div className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-violet-100/70">
                    <div className="mx-auto h-10 w-10 animate-pulse rounded-xl bg-violet-100" />

                    <p className="mt-4 text-xs font-bold text-slate-400">
                        Loading teacher...
                    </p>
                </div>

            </div>
        )
    }

    if (!teacher) {
        return (
            <div className="w-full min-w-0 max-w-full overflow-hidden bg-white p-3 sm:p-4">

                <div className="mb-6">
                    <div className="mb-2 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-violet-400">
                            Education SaaS
                        </p>
                    </div>

                    <h1 className="text-xl font-black tracking-tight text-violet-950">
                        Teacher Details
                    </h1>
                </div>

                <div className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-violet-100/70">
                    <FaGraduationCap className="mx-auto h-8 w-8 text-violet-300" />

                    <p className="mt-4 text-sm font-bold text-slate-400">
                        Teacher not found
                    </p>
                </div>

            </div>
        )
    }

    const teacherData = teacher
    const profileData = teacher?.profile
    const teacherUser = teacher?.userId

    return (
        <div className="w-full min-w-0 max-w-full overflow-hidden bg-white p-3 sm:p-4">

            <div className="mb-5 flex min-w-0 flex-col gap-4 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">

                <div className="min-w-0">
                    <div className="mb-2 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />

                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-violet-400">
                            Education SaaS
                        </p>
                    </div>

                    <h1 className="text-xl font-black tracking-tight text-violet-950">
                        Teacher Details
                    </h1>

                    <p className="mt-1 text-sm font-medium text-slate-400">
                        View teacher information and profile details
                    </p>
                </div>

                <div className="flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-violet-50 to-cyan-50 px-4 py-2.5">

                    <span className="h-2 w-2 rounded-full bg-lime-400" />

                    <span className="text-xs font-bold text-violet-700">
                        {teacherUser?.accountStatus || 'ACTIVE'}
                    </span>

                </div>

            </div>

            <div className="space-y-5">

                <div className="w-full min-w-0 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-violet-100/70">

                    <div className="bg-gradient-to-r from-violet-600 via-violet-600 to-cyan-500 px-5 py-6 sm:px-7">

                        <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                            <div className="flex min-w-0 items-center gap-4">

                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-xl font-black text-white shadow-lg ring-1 ring-white/20 backdrop-blur-sm">
                                    <FaGraduationCap className="h-6 w-6" />
                                </div>

                                <div className="min-w-0">

                                    <div className="flex min-w-0 flex-wrap items-center gap-2">

                                        <h2 className="max-w-full break-all text-xl font-black text-white">
                                            {teacherUser?.email || 'Teacher'}
                                        </h2>

                                        <span className="inline-flex max-w-full break-all rounded-lg bg-white/15 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white ring-1 ring-white/20">
                                            Teacher
                                        </span>

                                    </div>

                                    <p className="mt-1 text-xs font-medium text-violet-100">
                                        Teacher account and academic information
                                    </p>

                                </div>

                            </div>

                            <div className="flex items-center gap-2 self-start rounded-xl bg-white/10 px-3 py-2 ring-1 ring-white/20 sm:self-auto">

                                <span className="h-2 w-2 rounded-full bg-lime-300" />

                                <span className="text-[10px] font-black uppercase tracking-wider text-white">
                                    {teacherUser?.accountStatus || 'ACTIVE'}
                                </span>

                            </div>

                        </div>

                    </div>

                    <div className="p-5 sm:p-7">

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                            <div className="min-w-0 rounded-xl bg-gradient-to-br from-violet-50 to-white p-4 ring-1 ring-violet-100/70">

                                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                    Teacher Email
                                </p>

                                <div className="mt-2 flex min-w-0 items-start gap-2">

                                    <FaEnvelope className="mt-0.5 h-3 w-3 shrink-0 text-violet-500" />

                                    <p className="min-w-0 break-all text-sm font-black text-violet-950">
                                        {teacherUser?.email || '-'}
                                    </p>

                                </div>

                            </div>

                            <div className="min-w-0 rounded-xl bg-gradient-to-br from-cyan-50 to-white p-4 ring-1 ring-cyan-100/70">

                                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-cyan-500">
                                    Teacher Number
                                </p>

                                <div className="mt-2 flex items-center gap-2">

                                    <FaIdCard className="h-3 w-3 shrink-0 text-cyan-500" />

                                    <p className="break-all text-sm font-black text-violet-950">
                                        {teacherData?.teacher_no || teacherData?.admission_no || '-'}
                                    </p>

                                </div>

                            </div>

                            <div className="min-w-0 rounded-xl bg-gradient-to-br from-lime-50 to-white p-4 ring-1 ring-lime-100/70">

                                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-lime-600">
                                    Account Status
                                </p>

                                <div className="mt-2 flex items-center gap-2">

                                    <FaCircleCheck className="h-3 w-3 shrink-0 text-lime-500" />

                                    <p className="text-sm font-black text-violet-950">
                                        {teacherUser?.accountStatus || '-'}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-2">

                    <div className="min-w-0 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-violet-100/70">

                        <div className="flex items-center gap-3 border-b border-violet-50 bg-gradient-to-r from-violet-50 via-white to-cyan-50 px-5 py-4">

                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                                <FaGraduationCap className="h-3.5 w-3.5" />
                            </div>

                            <div className="min-w-0">

                                <h3 className="text-xs font-black uppercase tracking-[0.12em] text-violet-950">
                                    Teacher Information
                                </h3>

                                <p className="mt-0.5 text-[9px] font-medium text-slate-400">
                                    Academic teacher information
                                </p>

                            </div>

                        </div>

                        <div className="p-4 sm:p-5">

                            <div className="space-y-2">

                                <div className="flex min-w-0 flex-col gap-1 rounded-xl bg-slate-50/60 px-3 py-3 ring-1 ring-violet-100/50 sm:flex-row sm:items-center sm:justify-between">

                                    <p className="shrink-0 text-[9px] font-black uppercase tracking-wider text-violet-400">
                                        Teacher Number
                                    </p>

                                    <p className="break-all text-xs font-bold text-violet-950 sm:text-right">
                                        {teacherData?.teacher_no || teacherData?.admission_no || '-'}
                                    </p>

                                </div>

                                <div className="flex min-w-0 flex-col gap-1 rounded-xl bg-slate-50/60 px-3 py-3 ring-1 ring-violet-100/50 sm:flex-row sm:items-center sm:justify-between">

                                    <p className="shrink-0 text-[9px] font-black uppercase tracking-wider text-violet-400">
                                        Teacher ID
                                    </p>

                                    <p className="break-all text-xs font-bold text-violet-950 sm:text-right">
                                        {teacherData?._id || '-'}
                                    </p>

                                </div>

                                <div className="flex min-w-0 flex-col gap-1 rounded-xl bg-slate-50/60 px-3 py-3 ring-1 ring-violet-100/50 sm:flex-row sm:items-center sm:justify-between">

                                    <p className="shrink-0 text-[9px] font-black uppercase tracking-wider text-violet-400">
                                        Institution ID
                                    </p>

                                    <p className="break-all text-xs font-bold text-violet-950 sm:text-right">
                                        {teacherData?.institutionId || '-'}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="min-w-0 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-violet-100/70">

                        <div className="flex items-center gap-3 border-b border-violet-50 bg-gradient-to-r from-violet-50 via-white to-cyan-50 px-5 py-4">

                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                                <FaUser className="h-3.5 w-3.5" />
                            </div>

                            <div className="min-w-0">

                                <h3 className="text-xs font-black uppercase tracking-[0.12em] text-violet-950">
                                    User Profile
                                </h3>

                                <p className="mt-0.5 text-[9px] font-medium text-slate-400">
                                    Teacher account profile information
                                </p>

                            </div>

                        </div>

                        <div className="p-4 sm:p-5">

                            <div className="space-y-3">

                                <div className="min-w-0 rounded-xl bg-gradient-to-br from-violet-50/70 via-white to-cyan-50/50 px-4 py-3 ring-1 ring-violet-100/60">

                                    <p className="text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                        User Email
                                    </p>

                                    <p className="mt-2 break-all text-sm font-black text-violet-950">
                                        {teacherUser?.email || '-'}
                                    </p>

                                </div>

                                <div className="min-w-0 rounded-xl bg-gradient-to-br from-cyan-50/70 via-white to-violet-50/50 px-4 py-3 ring-1 ring-cyan-100/60">

                                    <p className="text-[9px] font-black uppercase tracking-[0.15em] text-cyan-500">
                                        Email Verified
                                    </p>

                                    <p className="mt-2 break-words text-sm font-black text-violet-950">
                                        {teacherUser?.emailVerified ? 'Verified' : 'Not Verified'}
                                    </p>

                                </div>

                                <div className="min-w-0 rounded-xl bg-gradient-to-br from-lime-50/70 via-white to-violet-50/50 px-4 py-3 ring-1 ring-lime-100/60">

                                    <p className="text-[9px] font-black uppercase tracking-[0.15em] text-lime-600">
                                        Role
                                    </p>

                                    <p className="mt-2 break-words text-sm font-black text-violet-950">
                                        {teacherUser?.role || 'TEACHER'}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="min-w-0 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-violet-100/70">

                    <div className="flex items-center gap-3 border-b border-violet-50 bg-gradient-to-r from-violet-50 via-white to-cyan-50 px-5 py-4">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-lime-50 text-lime-600">
                            <FaUserCheck className="h-3.5 w-3.5" />
                        </div>

                        <div className="min-w-0">

                            <h3 className="text-xs font-black uppercase tracking-[0.12em] text-violet-950">
                                Profile Information
                            </h3>

                            <p className="mt-0.5 text-[9px] font-medium text-slate-400">
                                Teacher personal profile information
                            </p>

                        </div>

                    </div>

                    <div className="p-4 sm:p-5">

                        <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

                            {Object.entries(profileData || {})
                                .filter(([key]) => key !== '_id' && key !== 'userId' && key !== '__v')
                                .map(([key, value]) => (

                                    <div
                                        key={key}
                                        className="min-w-0 rounded-xl bg-gradient-to-br from-violet-50/60 via-white to-cyan-50/40 px-4 py-3 ring-1 ring-violet-100/60"
                                    >

                                        <p className="break-words text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                            {key.replace(/_/g, ' ')}
                                        </p>

                                        <p className="mt-2 break-all text-sm font-black text-violet-950">
                                            {value === null || value === undefined || value === ''
                                                ? '-'
                                                : typeof value === 'object'
                                                    ? JSON.stringify(value)
                                                    : String(value)}
                                        </p>

                                    </div>

                                ))}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default ViewTeacher