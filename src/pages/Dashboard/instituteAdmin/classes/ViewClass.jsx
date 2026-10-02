import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaCalendarDays, FaClock, FaGraduationCap, FaUser, FaUsers } from 'react-icons/fa6'
import API from '../../../../services/api'
import UpdateClass from './UpdateClass'

const ViewClass = () => {
    const [loadError, setLoadError] = useState('')
    const { id } = useParams()
    const token = localStorage.getItem('access_token')
    const [instituteclass, setInstituteclass] = useState()

    useEffect(() => {
        const fetchclass = async () => {
            setLoadError('')
            try {
                const res = await API.get(`/classes/fetch-class-byid/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                if (res.data.success === true) {
                    setInstituteclass(res.data.result)
                }
            } catch (err) {
                const message = err.response?.data?.message
                setLoadError(Array.isArray(message) ? message.join(' ') : message || 'Unable to load this record. Please try again.')
            }
        }
        if (token) fetchclass()
    }, [token, id])

    if (loadError) {
        return (
            <div className="w-full bg-white p-4">
                <p role="alert" className="text-sm text-slate-700">{loadError}</p>
            </div>
        )
    }

    if (!instituteclass) {
        return (
            <div className="w-full min-w-0 bg-white p-3 sm:p-4">

                <div className="mb-6">
                    <div className="mb-2 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-violet-400">
                            Education SaaS
                        </p>
                    </div>

                    <h1 className="text-xl font-black tracking-tight text-violet-950">
                        Class Details
                    </h1>

                    <p className="mt-1 text-sm font-medium text-slate-400">
                        Loading class details
                    </p>
                </div>

                <div className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-violet-100/70 sm:p-10">
                    <div className="mx-auto h-10 w-10 animate-pulse rounded-xl bg-violet-100" />
                    <p className="mt-4 text-xs font-bold text-slate-400">
                        Loading class...
                    </p>
                </div>

            </div>
        )
    }

    return (
        <div className="w-full min-w-0 overflow-hidden bg-white p-3 sm:p-4">

            <div className="mb-6 flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                <div className="min-w-0">
                    <div className="mb-2 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-violet-400">
                            Education SaaS
                        </p>
                    </div>

                    <h1 className="text-xl font-black tracking-tight text-violet-950">
                        Class Details
                    </h1>

                    <p className="mt-1 text-sm font-medium text-slate-400">
                        View class information, teacher and students
                    </p>
                </div>

                <div className="flex w-fit max-w-full items-center gap-2 rounded-xl bg-gradient-to-r from-violet-50 to-cyan-50 px-4 py-2.5">

                    <span className={`h-2 w-2 shrink-0 rounded-full ${instituteclass.continue
                        ? 'bg-lime-400'
                        : 'bg-amber-400'
                        }`} />

                    <span className="text-xs font-bold text-violet-700">
                        {instituteclass.continue ? 'Every Week' : 'One Time'}
                    </span>

                </div>

            </div>

            <div className="min-w-0 space-y-5">

                <div className="min-w-0 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-violet-100/70">

                    <div className="bg-gradient-to-r from-violet-600 via-violet-600 to-cyan-500 px-4 py-5 sm:px-7 sm:py-6">

                        <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                            <div className="flex min-w-0 items-center gap-3 sm:gap-4">

                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-xl font-black text-white shadow-lg ring-1 ring-white/20 backdrop-blur-sm sm:h-14 sm:w-14">
                                    <FaGraduationCap className="h-5 w-5 sm:h-6 sm:w-6" />
                                </div>

                                <div className="min-w-0">

                                    <div className="flex min-w-0 flex-wrap items-center gap-2">

                                        <h2 className="max-w-full break-words text-lg font-black text-white sm:text-xl">
                                            {instituteclass.class_name || 'Class'}
                                        </h2>

                                        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-white/15 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white ring-1 ring-white/20">
                                            Class
                                        </span>

                                    </div>

                                    <p className="mt-1 text-xs font-medium text-violet-100">
                                        Class information and academic schedule
                                    </p>

                                </div>

                            </div>

                            <div className="flex w-fit max-w-full items-center gap-2 self-start rounded-xl bg-white/10 px-3 py-2 ring-1 ring-white/20 sm:self-auto">

                                <span className={`h-2 w-2 shrink-0 rounded-full ${instituteclass.continue
                                    ? 'bg-lime-300'
                                    : 'bg-amber-300'
                                    }`} />

                                <span className="text-[10px] font-black uppercase tracking-wider text-white">
                                    {instituteclass.continue ? 'Every Week' : 'One Time'}
                                </span>

                            </div>

                        </div>

                    </div>

                    <div className="p-4 sm:p-7">

                        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                            <div className="min-w-0 rounded-xl bg-gradient-to-br from-violet-50 to-white p-4 ring-1 ring-violet-100/70">

                                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                    Class Name
                                </p>

                                <div className="mt-2 flex min-w-0 items-center gap-2">

                                    <FaGraduationCap className="h-3 w-3 shrink-0 text-violet-500" />

                                    <p className="min-w-0 break-words text-sm font-black text-violet-950">
                                        {instituteclass.class_name || '-'}
                                    </p>

                                </div>

                            </div>

                            <div className="min-w-0 rounded-xl bg-gradient-to-br from-cyan-50 to-white p-4 ring-1 ring-cyan-100/70">

                                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-cyan-500">
                                    Teacher
                                </p>

                                <div className="mt-2 flex min-w-0 items-center gap-2">

                                    <FaUser className="h-3 w-3 shrink-0 text-cyan-500" />

                                    <p className="min-w-0 break-all text-sm font-black text-violet-950">
                                        {instituteclass.teacher?.userId?.email || '-'}
                                    </p>

                                </div>

                            </div>

                            <div className="min-w-0 rounded-xl bg-gradient-to-br from-lime-50 to-white p-4 ring-1 ring-lime-100/70">

                                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-lime-600">
                                    Students
                                </p>

                                <div className="mt-2 flex items-center gap-2">

                                    <FaUsers className="h-3 w-3 shrink-0 text-lime-600" />

                                    <p className="text-xl font-black text-violet-950">
                                        {instituteclass.students?.length || 0}
                                    </p>

                                    <p className="text-xs font-bold text-slate-400">
                                        Students
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-2">

                    <div className="min-w-0 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-violet-100/70">

                        <div className="flex min-w-0 items-center justify-between gap-3 border-b border-violet-50 bg-gradient-to-r from-violet-50 via-white to-cyan-50 px-4 py-4 sm:px-5">

                            <div className="flex min-w-0 items-center gap-3">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                                    <FaCalendarDays className="h-3.5 w-3.5" />
                                </div>

                                <div className="min-w-0">
                                    <h3 className="text-xs font-black uppercase tracking-[0.12em] text-violet-950">
                                        Class Schedule
                                    </h3>

                                    <p className="mt-0.5 text-[9px] font-medium text-slate-400">
                                        Class days and times
                                    </p>
                                </div>

                            </div>

                        </div>

                        <div className="p-4 sm:p-5">

                            <div className="space-y-2">

                                {instituteclass.schedule?.length > 0 ? (

                                    instituteclass.schedule.map((schedule, index) => (

                                        <div
                                            key={index}
                                            className="flex min-w-0 flex-col gap-3 rounded-xl bg-slate-50/60 px-3 py-3 ring-1 ring-violet-100/50 sm:flex-row sm:items-center sm:justify-between sm:gap-2"
                                        >

                                            <div className="flex min-w-0 items-center gap-2">

                                                <FaCalendarDays className="h-3 w-3 shrink-0 text-violet-500" />

                                                <p className="text-xs font-bold text-violet-950">
                                                    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][schedule.day]}
                                                </p>

                                            </div>

                                            <div className="flex min-w-0 items-center gap-2">

                                                <FaClock className="h-3 w-3 shrink-0 text-cyan-500" />

                                                <p className="break-words text-xs font-black text-violet-950">
                                                    {schedule.startTime} - {schedule.endTime}
                                                </p>

                                            </div>

                                        </div>

                                    ))

                                ) : (

                                    <div className="rounded-xl bg-slate-50/60 px-3 py-5 text-center ring-1 ring-violet-100/50">

                                        <p className="text-xs font-bold text-slate-400">
                                            No schedule available
                                        </p>

                                    </div>

                                )}

                            </div>

                        </div>

                    </div>

                    <div className="min-w-0 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-violet-100/70">

                        <div className="flex min-w-0 items-center justify-between gap-3 border-b border-violet-50 bg-gradient-to-r from-violet-50 via-white to-cyan-50 px-4 py-4 sm:px-5">

                            <div className="flex min-w-0 items-center gap-3">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                                    <FaUsers className="h-3.5 w-3.5" />
                                </div>

                                <div className="min-w-0">
                                    <h3 className="text-xs font-black uppercase tracking-[0.12em] text-violet-950">
                                        Students
                                    </h3>

                                    <p className="mt-0.5 text-[9px] font-medium text-slate-400">
                                        Students enrolled in this class
                                    </p>
                                </div>

                            </div>

                        </div>

                        <div className="p-4 sm:p-5">

                            <div className="space-y-2">

                                {instituteclass.students?.length > 0 ? (

                                    instituteclass.students.map((student, index) => (

                                        <div
                                            key={student._id || index}
                                            className="flex min-w-0 items-start gap-3 rounded-xl bg-gradient-to-br from-violet-50/70 via-white to-cyan-50/50 px-3 py-3 ring-1 ring-violet-100/60 sm:px-4"
                                        >

                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-xs font-black text-violet-600">
                                                {student.userId?.email?.charAt(0)?.toUpperCase() || 'S'}
                                            </div>

                                            <div className="min-w-0 flex-1">

                                                <p className="break-all text-sm font-black text-violet-950">
                                                    {student.userId?.email || '-'}
                                                </p>

                                                <p className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                                                    Student Account
                                                </p>

                                            </div>

                                        </div>

                                    ))

                                ) : (

                                    <div className="rounded-xl bg-slate-50/60 px-3 py-5 text-center ring-1 ring-violet-100/50">

                                        <p className="text-xs font-bold text-slate-400">
                                            No students enrolled
                                        </p>

                                    </div>

                                )}

                            </div>

                        </div>

                    </div>

                </div>

                <div className="min-w-0 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-violet-100/70">

                    <div className="flex min-w-0 items-center gap-3 border-b border-violet-50 bg-gradient-to-r from-violet-50 via-white to-cyan-50 px-4 py-4 sm:px-5">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-lime-50 text-lime-600">
                            <FaGraduationCap className="h-3.5 w-3.5" />
                        </div>

                        <div className="min-w-0">
                            <h3 className="text-xs font-black uppercase tracking-[0.12em] text-violet-950">
                                Class Information
                            </h3>

                            <p className="mt-0.5 text-[9px] font-medium text-slate-400">
                                Additional class information
                            </p>
                        </div>

                    </div>

                    <div className="p-4 sm:p-5">

                        <div className="space-y-2">

                            <div className="flex min-w-0 flex-col gap-2 rounded-xl bg-slate-50/60 px-3 py-3 ring-1 ring-violet-100/50 sm:flex-row sm:items-center sm:justify-between">

                                <p className="text-[9px] font-black uppercase tracking-wider text-violet-400">
                                    Class Name
                                </p>

                                <p className="break-words text-xs font-bold text-violet-950 sm:text-right">
                                    {instituteclass.class_name || '-'}
                                </p>

                            </div>

                            <div className="flex min-w-0 flex-col gap-2 rounded-xl bg-slate-50/60 px-3 py-3 ring-1 ring-violet-100/50 sm:flex-row sm:items-center sm:justify-between">

                                <p className="text-[9px] font-black uppercase tracking-wider text-violet-400">
                                    Teacher Email
                                </p>

                                <p className="break-all text-xs font-bold text-violet-950 sm:text-right">
                                    {instituteclass.teacher?.userId?.email || '-'}
                                </p>

                            </div>

                            <div className="flex min-w-0 flex-col gap-2 rounded-xl bg-slate-50/60 px-3 py-3 ring-1 ring-violet-100/50 sm:flex-row sm:items-center sm:justify-between">

                                <p className="text-[9px] font-black uppercase tracking-wider text-violet-400">
                                    Class Type
                                </p>

                                <span className={`inline-flex w-fit items-center gap-2 rounded-lg px-2.5 py-1.5 text-[9px] font-black uppercase tracking-wider ${instituteclass.continue
                                    ? 'bg-lime-50 text-lime-700'
                                    : 'bg-amber-50 text-amber-600'
                                    }`}>

                                    <span className={`h-1.5 w-1.5 rounded-full ${instituteclass.continue
                                        ? 'bg-lime-500'
                                        : 'bg-amber-500'
                                        }`} />

                                    {instituteclass.continue ? 'Every Week' : 'One Time'}

                                </span>

                            </div>

                            <div className="rounded-xl bg-gradient-to-br from-violet-50/70 via-white to-cyan-50/50 px-3 py-4 ring-1 ring-violet-100/60 sm:px-4">

                                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                    Description
                                </p>

                                <p className="mt-2 break-words text-sm font-medium leading-6 text-violet-950">
                                    {instituteclass.description || 'No description available'}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                <UpdateClass 
                    token={token}
                    classData={instituteclass}
                    classID={id}
                />

            </div>

        </div>
    )
}

export default ViewClass