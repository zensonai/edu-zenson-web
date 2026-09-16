import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaBookOpen, FaClock, FaUsers, FaChalkboardUser } from 'react-icons/fa6'
import API from '../../../../services/api'

const ViewMyClass = () => {
    const { id } = useParams()

    const token = localStorage.getItem('access_token')
    const [viewclass, setViewClass] = useState(null)

    useEffect(() => {
        const fetchclass = async () => {
            const res = await API.get(`/classes/fetch-teacherclass-byid/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                setViewClass(res.data.result)
            }
        }

        if (token && id) fetchclass()
    }, [token, id])

    if (!viewclass) {
        return (
            <div className="flex min-h-[400px] items-center justify-center bg-white">
                <div className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-500">
                        <FaBookOpen className="h-5 w-5" />
                    </div>
                    <p className="mt-3 text-sm font-bold text-violet-900">
                        Loading class...
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full bg-white p-3 sm:p-4">

            <div className="mb-6 rounded-2xl bg-gradient-to-br from-violet-50 via-white to-cyan-50 p-5 ring-1 ring-violet-100/70 sm:p-6">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                    <div className="flex min-w-0 items-start gap-3">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                            <FaBookOpen className="h-5 w-5" />
                        </div>

                        <div className="min-w-0">

                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-violet-400">
                                My Class
                            </p>

                            <h1 className="mt-1 break-all text-xl font-black tracking-tight text-violet-950">
                                {viewclass.class_name || '-'}
                            </h1>

                            <p className="mt-1 break-all text-sm font-medium leading-5 text-slate-400">
                                {viewclass.description || 'No description available'}
                            </p>

                        </div>

                    </div>

                    <span className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-[9px] font-black uppercase tracking-wider ${viewclass.continue
                        ? 'bg-lime-50 text-lime-700'
                        : 'bg-amber-50 text-amber-600'
                        }`}>

                        <span className={`h-1.5 w-1.5 rounded-full ${viewclass.continue
                            ? 'bg-lime-500'
                            : 'bg-amber-500'
                            }`} />

                        {viewclass.continue ? 'Every Week' : 'One Time'}

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
                                Teacher
                            </p>
                            <p className="mt-1 break-all text-sm font-black text-violet-950">
                                {viewclass.teacher?.userId?.email || '-'}
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
                                {viewclass.students?.length || 0} Students
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
                                Schedule
                            </p>
                            <p className="mt-1 text-sm font-black text-violet-950">
                                {viewclass.schedule?.length || 0} Days
                            </p>
                        </div>

                    </div>

                </div>

            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">

                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-violet-100/70">

                    <div className="mb-4 flex items-center gap-2">
                        <FaClock className="h-3.5 w-3.5 text-cyan-500" />
                        <h2 className="text-sm font-black text-violet-950">
                            Class Schedule
                        </h2>
                    </div>

                    <div className="flex flex-col gap-2">

                        {viewclass.schedule?.length > 0 ? (

                            viewclass.schedule.map((schedule, index) => (

                                <div
                                    key={schedule._id || index}
                                    className="flex items-center justify-between gap-3 rounded-xl bg-cyan-50 px-3 py-3"
                                >

                                    <div>
                                        <p className="text-[10px] font-black text-cyan-700">
                                            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][schedule.day]}
                                        </p>
                                    </div>

                                    <div className="rounded-lg bg-white px-2.5 py-1.5">
                                        <p className="text-[10px] font-black text-cyan-600">
                                            {schedule.startTime} - {schedule.endTime}
                                        </p>
                                    </div>

                                </div>

                            ))

                        ) : (

                            <p className="py-5 text-center text-xs font-medium text-slate-400">
                                No schedule available
                            </p>

                        )}

                    </div>

                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-violet-100/70">

                    <div className="mb-4 flex items-center gap-2">
                        <FaUsers className="h-3.5 w-3.5 text-violet-500" />
                        <h2 className="text-sm font-black text-violet-950">
                            Students
                        </h2>
                    </div>

                    <div className="flex flex-col gap-2">

                        {viewclass.students?.length > 0 ? (

                            viewclass.students.map((student, index) => (

                                <div
                                    key={student._id || index}
                                    className="flex items-center justify-between rounded-xl bg-violet-50 px-3 py-3"
                                >

                                    <div className="flex min-w-0 items-center gap-3">

                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-500">
                                            <FaUsers className="h-3 w-3" />
                                        </div>

                                        <p className="break-all text-xs font-bold text-violet-900">
                                            {student.userId?.email || '-'}
                                        </p>

                                    </div>

                                    <span className="shrink-0 text-[9px] font-black text-violet-400">
                                        #{index + 1}
                                    </span>

                                </div>

                            ))

                        ) : (

                            <p className="py-5 text-center text-xs font-medium text-slate-400">
                                No students assigned
                            </p>

                        )}

                    </div>

                </div>

            </div>

        </div>
    )
}

export default ViewMyClass