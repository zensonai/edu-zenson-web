import React, { useEffect, useState } from 'react'
import { FaBookOpen, FaClock, FaUsers, FaArrowRight } from 'react-icons/fa6'
import API from '../../../../services/api'

const MyClass = () => {
    const token = localStorage.getItem('access_token')
    const [classes, setClasses] = useState([])

    useEffect(() => {
        const fetchclasses = async () => {
            const res = await API.get('/classes/fetch-teacherclasses', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                setClasses(res.data.result)
            }
        }

        if (token) fetchclasses()
    }, [token])

    return (
        <div className="w-full bg-white p-3 sm:p-4">

            <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">

                <div className="min-w-0">

                    <div className="mb-2 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-violet-400">
                            Teaching
                        </p>
                    </div>

                    <h1 className="text-xl font-black tracking-tight text-violet-950">
                        My Classes
                    </h1>

                    <p className="mt-1 text-sm font-medium text-slate-400">
                        Classes assigned to you
                    </p>

                </div>

                <div className="flex w-fit shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-violet-50 to-cyan-50 px-4 py-2.5">
                    <span className="h-2 w-2 rounded-full bg-lime-400" />
                    <span className="text-xs font-bold text-violet-700">
                        {classes.length} Classes
                    </span>
                </div>

            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

                {classes.length > 0 ? (

                    classes.map((classItem) => (

                        <div
                            key={classItem._id}
                            className="group rounded-2xl bg-gradient-to-br from-white via-violet-50/30 to-cyan-50/30 p-4 shadow-sm ring-1 ring-violet-100/70 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                        >

                            <div className="flex items-start gap-3">

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 shadow-sm">
                                    <FaBookOpen className="h-4 w-4" />
                                </div>

                                <div className="min-w-0 flex-1">

                                    <h2 className="break-all text-sm font-black text-violet-950">
                                        {classItem.class_name || '-'}
                                    </h2>

                                    <p className="mt-1 break-all text-[10px] font-medium leading-4 text-slate-400">
                                        {classItem.description || 'No description available'}
                                    </p>

                                </div>

                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-2">

                                <div className="rounded-xl bg-white px-3 py-2.5 ring-1 ring-violet-100/60">

                                    <div className="flex items-center gap-1.5 text-violet-400">
                                        <FaUsers className="h-3 w-3" />
                                        <p className="text-[9px] font-black uppercase tracking-wider">
                                            Students
                                        </p>
                                    </div>

                                    <p className="mt-1 text-xs font-black text-violet-950">
                                        {classItem.students?.length || 0}
                                    </p>

                                </div>

                                <div className="rounded-xl bg-white px-3 py-2.5 ring-1 ring-violet-100/60">

                                    <div className="flex items-center gap-1.5 text-cyan-500">
                                        <FaClock className="h-3 w-3" />
                                        <p className="text-[9px] font-black uppercase tracking-wider">
                                            Schedule
                                        </p>
                                    </div>

                                    <p className="mt-1 text-xs font-black text-violet-950">
                                        {classItem.schedule?.length || 0} Days
                                    </p>

                                </div>

                            </div>

                            <div className="mt-3 rounded-xl bg-white px-3 py-3 ring-1 ring-violet-100/60">

                                <p className="text-[9px] font-black uppercase tracking-wider text-violet-400">
                                    Class Schedule
                                </p>

                                <div className="mt-2 flex flex-col gap-1.5">

                                    {classItem.schedule?.map((schedule, index) => (

                                        <div
                                            key={schedule._id || index}
                                            className="flex items-center justify-between gap-2 rounded-lg bg-cyan-50 px-2.5 py-2"
                                        >

                                            <span className="text-[9px] font-black text-cyan-700">
                                                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][schedule.day]}
                                            </span>

                                            <span className="text-[9px] font-bold text-cyan-600">
                                                {schedule.startTime} - {schedule.endTime}
                                            </span>

                                        </div>

                                    ))}

                                </div>

                            </div>

                            <div className="mt-3 flex items-center justify-between">

                                <span className={`inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[9px] font-black uppercase tracking-wider ${classItem.continue
                                    ? 'bg-lime-50 text-lime-700'
                                    : 'bg-amber-50 text-amber-600'
                                    }`}>

                                    <span className={`h-1.5 w-1.5 rounded-full ${classItem.continue
                                        ? 'bg-lime-500'
                                        : 'bg-amber-500'
                                        }`} />

                                    {classItem.continue ? 'Every Week' : 'One Time'}

                                </span>

                                <span className="text-[9px] font-bold text-slate-400">
                                    {classItem.students?.length || 0} Students
                                </span>

                            </div>

                            <a
                                href={`/dashboard/view-my-class/${classItem._id}`}
                                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-xs font-black text-white transition-all duration-200 hover:bg-violet-700 hover:shadow-md"
                            >
                                View Class
                                <FaArrowRight className="h-3 w-3" />
                            </a>

                        </div>

                    ))

                ) : (

                    <div className="col-span-full px-5 py-16 text-center">

                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-400">
                            <FaBookOpen className="h-5 w-5" />
                        </div>

                        <p className="mt-3 text-sm font-bold text-violet-900">
                            No classes assigned
                        </p>

                        <p className="mt-1 text-xs font-medium text-slate-400">
                            No classes are currently assigned to you
                        </p>

                    </div>

                )}

            </div>

        </div>
    )
}

export default MyClass