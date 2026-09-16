import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    FaCalendarCheck,
    FaClock,
    FaUsers,
    FaChalkboardUser,
    FaCircleCheck,
    FaCircleXmark
} from 'react-icons/fa6'
import API from '../../../../services/api'

const ViewAttendance = () => {
    const { id } = useParams()

    const token = localStorage.getItem('access_token')
    const [attendance, setAttendance] = useState(null)

    useEffect(() => {
        const fetchattendance = async () => {
            const res = await API.get('/classes/fetch-attendaces', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                const result = res.data.result || []
                const selectedAttendance = result.find(
                    (item) => item._id === id
                )

                setAttendance(selectedAttendance || null)
            }
        }

        if (token && id) fetchattendance()
    }, [token, id])

    if (!attendance) {
        return (
            <div className="flex min-h-[400px] items-center justify-center bg-white">
                <div className="text-center">

                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-500">
                        <FaCalendarCheck className="h-5 w-5" />
                    </div>

                    <p className="mt-3 text-sm font-bold text-violet-900">
                        Loading attendance...
                    </p>

                </div>
            </div>
        )
    }

    const totalStudents = attendance.students?.length || 0

    const presentStudents = attendance.students?.filter(
        (student) => student.is_attend === true
    ).length || 0

    const absentStudents = totalStudents - presentStudents

    return (
        <div className="w-full bg-white p-3 sm:p-4">

            <div className="mb-6 rounded-2xl bg-gradient-to-br from-violet-50 via-white to-cyan-50 p-5 ring-1 ring-violet-100/70 sm:p-6">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                    <div className="flex min-w-0 items-start gap-3">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                            <FaCalendarCheck className="h-5 w-5" />
                        </div>

                        <div className="min-w-0">

                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-violet-400">
                                Attendance Record
                            </p>

                            <h1 className="mt-1 break-all text-xl font-black tracking-tight text-violet-950">
                                {attendance.class?.class_name || '-'}
                            </h1>

                            <p className="mt-1 break-all text-sm font-medium leading-5 text-slate-400">
                                Attendance marked for this class
                            </p>

                        </div>

                    </div>

                    <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg bg-lime-50 px-3 py-2 text-[9px] font-black uppercase tracking-wider text-lime-700">

                        <span className="h-1.5 w-1.5 rounded-full bg-lime-500" />

                        {attendance.mark_attendance ? 'Marked' : 'Not Marked'}

                    </span>

                </div>

            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-violet-100/70">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-500">
                            <FaChalkboardUser className="h-4 w-4" />
                        </div>

                        <div>

                            <p className="text-[9px] font-black uppercase tracking-wider text-violet-400">
                                Class
                            </p>

                            <p className="mt-1 break-all text-sm font-black text-violet-950">
                                {attendance.class?.class_name || '-'}
                            </p>

                        </div>

                    </div>

                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-violet-100/70">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-500">
                            <FaUsers className="h-4 w-4" />
                        </div>

                        <div>

                            <p className="text-[9px] font-black uppercase tracking-wider text-cyan-500">
                                Students
                            </p>

                            <p className="mt-1 text-sm font-black text-violet-950">
                                {totalStudents} Students
                            </p>

                        </div>

                    </div>

                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-violet-100/70">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-50 text-lime-600">
                            <FaClock className="h-4 w-4" />
                        </div>

                        <div>

                            <p className="text-[9px] font-black uppercase tracking-wider text-lime-600">
                                Marked At
                            </p>

                            <p className="mt-1 text-sm font-black text-violet-950">
                                {attendance.time_attendance
                                    ? new Date(attendance.time_attendance).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })
                                    : '-'}
                            </p>

                        </div>

                    </div>

                </div>

            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">

                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-violet-100/70">

                    <div className="mb-4 flex items-center gap-2">

                        <FaCalendarCheck className="h-3.5 w-3.5 text-cyan-500" />

                        <h2 className="text-sm font-black text-violet-950">
                            Attendance Summary
                        </h2>

                    </div>

                    <div className="flex flex-col gap-2">

                        <div className="flex items-center justify-between rounded-xl bg-lime-50 px-3 py-3">

                            <div className="flex items-center gap-3">

                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime-100 text-lime-600">
                                    <FaCircleCheck className="h-3 w-3" />
                                </div>

                                <p className="text-xs font-bold text-lime-800">
                                    Present
                                </p>

                            </div>

                            <span className="text-sm font-black text-lime-700">
                                {presentStudents}
                            </span>

                        </div>

                        <div className="flex items-center justify-between rounded-xl bg-red-50 px-3 py-3">

                            <div className="flex items-center gap-3">

                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600">
                                    <FaCircleXmark className="h-3 w-3" />
                                </div>

                                <p className="text-xs font-bold text-red-800">
                                    Absent
                                </p>

                            </div>

                            <span className="text-sm font-black text-red-700">
                                {absentStudents}
                            </span>

                        </div>

                        <div className="flex items-center justify-between rounded-xl bg-violet-50 px-3 py-3">

                            <div className="flex items-center gap-3">

                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-500">
                                    <FaUsers className="h-3 w-3" />
                                </div>

                                <p className="text-xs font-bold text-violet-900">
                                    Total Students
                                </p>

                            </div>

                            <span className="text-sm font-black text-violet-700">
                                {totalStudents}
                            </span>

                        </div>

                    </div>

                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-violet-100/70">

                    <div className="mb-4 flex items-center gap-2">

                        <FaClock className="h-3.5 w-3.5 text-cyan-500" />

                        <h2 className="text-sm font-black text-violet-950">
                            Attendance Information
                        </h2>

                    </div>

                    <div className="flex flex-col gap-2">

                        <div className="rounded-xl bg-cyan-50 px-3 py-3">

                            <p className="text-[9px] font-black uppercase tracking-wider text-cyan-600">
                                Attendance Date
                            </p>

                            <p className="mt-1 text-xs font-black text-cyan-900">
                                {attendance.time_attendance
                                    ? new Date(attendance.time_attendance).toLocaleDateString()
                                    : '-'}
                            </p>

                        </div>

                        <div className="rounded-xl bg-violet-50 px-3 py-3">

                            <p className="text-[9px] font-black uppercase tracking-wider text-violet-400">
                                Attendance Time
                            </p>

                            <p className="mt-1 text-xs font-black text-violet-900">
                                {attendance.time_attendance
                                    ? new Date(attendance.time_attendance).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit'
                                    })
                                    : '-'}
                            </p>

                        </div>

                        <div className="rounded-xl bg-lime-50 px-3 py-3">

                            <p className="text-[9px] font-black uppercase tracking-wider text-lime-600">
                                Status
                            </p>

                            <p className="mt-1 text-xs font-black text-lime-800">
                                {attendance.mark_attendance ? 'Attendance Marked' : 'Attendance Not Marked'}
                            </p>

                        </div>

                    </div>

                </div>

            </div>

            <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-violet-100/70">

                <div className="mb-4 flex items-center gap-2">

                    <FaUsers className="h-3.5 w-3.5 text-violet-500" />

                    <h2 className="text-sm font-black text-violet-950">
                        Student Attendance
                    </h2>

                </div>

                <div className="flex flex-col gap-2">

                    {attendance.students?.length > 0 ? (

                        attendance.students.map((student, index) => (

                            <div
                                key={student._id || student.stdID || index}
                                className={`flex items-center justify-between rounded-xl px-3 py-3 ${student.is_attend
                                        ? 'bg-lime-50'
                                        : 'bg-red-50'
                                    }`}
                            >

                                <div className="flex min-w-0 items-center gap-3">

                                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${student.is_attend
                                            ? 'bg-lime-100 text-lime-600'
                                            : 'bg-red-100 text-red-600'
                                        }`}>

                                        {student.is_attend ? (
                                            <FaCircleCheck className="h-3 w-3" />
                                        ) : (
                                            <FaCircleXmark className="h-3 w-3" />
                                        )}

                                    </div>

                                    <div className="min-w-0">

                                        <p className={`break-all text-xs font-bold ${student.is_attend
                                                ? 'text-lime-900'
                                                : 'text-red-900'
                                            }`}>
                                            {student.stdID || '-'}
                                        </p>

                                        <p className="mt-0.5 text-[9px] font-black uppercase tracking-wider text-slate-400">
                                            Student #{index + 1}
                                        </p>

                                    </div>

                                </div>

                                <span className={`shrink-0 rounded-lg px-2.5 py-1.5 text-[9px] font-black uppercase tracking-wider ${student.is_attend
                                        ? 'bg-lime-100 text-lime-700'
                                        : 'bg-red-100 text-red-700'
                                    }`}>
                                    {student.is_attend ? 'Present' : 'Absent'}
                                </span>

                            </div>

                        ))

                    ) : (

                        <p className="py-5 text-center text-xs font-medium text-slate-400">
                            No student attendance records available
                        </p>

                    )}

                </div>

            </div>

        </div>
    )
}

export default ViewAttendance