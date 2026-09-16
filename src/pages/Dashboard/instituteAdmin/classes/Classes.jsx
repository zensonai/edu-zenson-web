import React, { useEffect, useMemo, useState } from 'react'
import { FaEye, FaMagnifyingGlass } from 'react-icons/fa6'
import API from '../../../../services/api'

const Classes = () => {
    const token = localStorage.getItem('access_token')
    const [classes, setClasses] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState('')

    const classesPerPage = 10

    const filteredClasses = useMemo(() => {
        const searchValue = search.trim().toLowerCase()

        if (!searchValue) {
            return classes
        }

        return classes.filter((classItem) =>
            classItem.class_name?.toLowerCase().includes(searchValue) ||
            classItem.teacher?.userId?.email?.toLowerCase().includes(searchValue)
        )
    }, [classes, search])

    const totalPages = Math.ceil(filteredClasses.length / classesPerPage)
    const startIndex = (currentPage - 1) * classesPerPage
    const currentClasses = filteredClasses.slice(startIndex, startIndex + classesPerPage)

    useEffect(() => {
        const fetchclasses = async () => {
            const res = await API.get('/classes/fetch-classes', {
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

    useEffect(() => {
        setCurrentPage(1)
    }, [search])

    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages)
        }
    }, [currentPage, totalPages])

    return (
        <div className="w-full bg-white p-3 sm:p-4">

            <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">

                <div className="min-w-0">
                    <div className="mb-2 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-violet-400">
                            Class Management
                        </p>
                    </div>

                    <h1 className="text-xl font-black tracking-tight text-violet-950">
                        Classes
                    </h1>

                    <p className="mt-1 text-sm font-medium text-slate-400">
                        Manage classes registered in your institution
                    </p>
                </div>

                <div className="flex w-fit shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-violet-50 to-cyan-50 px-4 py-2.5">
                    <span className="h-2 w-2 rounded-full bg-lime-400" />
                    <span className="text-xs font-bold text-violet-700">
                        {filteredClasses.length} Classes
                    </span>
                </div>

            </div>

            <div className="mb-4 flex w-full">

                <div className="relative w-full">

                    <FaMagnifyingGlass className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-violet-300" />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search class or teacher email..."
                        className="h-11 w-full rounded-xl border-0 bg-slate-50 pl-10 pr-4 text-xs font-semibold text-violet-950 outline-none ring-1 ring-violet-100 transition-all placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-violet-300"
                    />

                </div>

            </div>

            <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-violet-100/70">

                <div className="hidden overflow-x-auto sm:block">

                    <table className="w-full min-w-[800px]">

                        <thead>
                            <tr className="bg-gradient-to-r from-violet-50 via-white to-cyan-50">

                                <th className="px-5 py-4 text-left text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                    Class
                                </th>

                                <th className="px-5 py-4 text-left text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                    Teacher
                                </th>

                                <th className="px-5 py-4 text-left text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                    Students
                                </th>

                                <th className="px-5 py-4 text-left text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                    Schedule
                                </th>

                                <th className="px-5 py-4 text-right text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                    Action
                                </th>

                            </tr>
                        </thead>

                        <tbody>

                            {currentClasses.length > 0 ? (

                                currentClasses.map((classItem) => (

                                    <tr
                                        key={classItem._id}
                                        className="group border-t border-violet-50 transition-all duration-200 hover:bg-gradient-to-r hover:from-violet-50/50 hover:via-white hover:to-cyan-50/40"
                                    >

                                        <td className="px-5 py-4">

                                            <div className="flex items-center gap-3">

                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-sm font-black text-violet-600 shadow-sm">
                                                    {classItem.class_name?.charAt(0)?.toUpperCase() || 'C'}
                                                </div>

                                                <div className="min-w-0">

                                                    <p className="max-w-[220px] truncate text-[13px] font-extrabold text-violet-950">
                                                        {classItem.class_name || '-'}
                                                    </p>

                                                    <p className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                                                        Class
                                                    </p>

                                                </div>

                                            </div>

                                        </td>

                                        <td className="px-5 py-4">

                                            <p className="max-w-[220px] truncate text-[12px] font-extrabold text-violet-950">
                                                {classItem.teacher?.userId?.email || '-'}
                                            </p>

                                            <p className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                                                Teacher
                                            </p>

                                        </td>

                                        <td className="px-5 py-4">

                                            <span className="inline-flex rounded-lg bg-violet-50 px-2.5 py-1.5 text-[10px] font-black tracking-wider text-violet-600">
                                                {classItem.students?.length || 0} Students
                                            </span>

                                        </td>

                                        <td className="px-5 py-4">

                                            <div className="flex max-w-[220px] flex-col gap-1">

                                                {classItem.schedule?.map((schedule, index) => (

                                                    <span
                                                        key={index}
                                                        className="inline-flex w-fit rounded-lg bg-cyan-50 px-2.5 py-1.5 text-[9px] font-black tracking-wider text-cyan-700"
                                                    >
                                                        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][schedule.day]} {schedule.startTime} - {schedule.endTime}
                                                    </span>

                                                ))}

                                            </div>

                                        </td>

                                        <td className="px-5 py-4">

                                            <div className="flex items-center justify-end">

                                                <a
                                                    href={`/dashboard/classes/view-class/${classItem._id}`}
                                                    title="View Class"
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition-all duration-200 hover:bg-violet-50 hover:text-violet-600"
                                                >
                                                    <FaEye className="h-3.5 w-3.5" />
                                                </a>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td colSpan="5" className="px-5 py-16 text-center">

                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-400">
                                            <span className="text-lg font-black">
                                                Z
                                            </span>
                                        </div>

                                        <p className="mt-3 text-sm font-bold text-violet-900">
                                            No classes found
                                        </p>

                                        <p className="mt-1 text-xs font-medium text-slate-400">
                                            {search ? 'No class or teacher email matches your search' : 'No class records are available'}
                                        </p>

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

                <div className="space-y-3 p-3 sm:hidden">

                    {currentClasses.length > 0 ? (

                        currentClasses.map((classItem) => (

                            <div
                                key={classItem._id}
                                className="w-full rounded-2xl bg-gradient-to-br from-white via-violet-50/40 to-cyan-50/40 p-3.5 ring-1 ring-violet-100/70"
                            >

                                <div className="flex w-full items-start gap-3">

                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-sm font-black text-violet-600 shadow-sm">
                                        {classItem.class_name?.charAt(0)?.toUpperCase() || 'C'}
                                    </div>

                                    <div className="min-w-0 flex-1">

                                        <p className="break-all text-[12px] font-extrabold leading-5 text-violet-950">
                                            {classItem.class_name || '-'}
                                        </p>

                                        <p className="mt-0.5 break-all text-[9px] font-bold tracking-wider text-slate-400">
                                            {classItem.teacher?.userId?.email || '-'}
                                        </p>

                                    </div>

                                    <a
                                        href={`/dashboard/classes/view-class/${classItem._id}`}
                                        title="View Class"
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-violet-500 shadow-sm ring-1 ring-violet-100 transition-all duration-200 hover:bg-violet-600 hover:text-white"
                                    >
                                        <FaEye className="h-3.5 w-3.5" />
                                    </a>

                                </div>

                                <div className="mt-3 grid grid-cols-1 gap-2.5 xs:grid-cols-2">

                                    <div className="min-w-0 rounded-xl bg-white px-3 py-2.5 ring-1 ring-violet-100/60">

                                        <p className="text-[9px] font-black uppercase tracking-wider text-violet-400">
                                            Students
                                        </p>

                                        <p className="mt-1 break-all text-[11px] font-extrabold text-violet-950">
                                            {classItem.students?.length || 0} Students
                                        </p>

                                    </div>

                                    <div className="min-w-0 rounded-xl bg-white px-3 py-2.5 ring-1 ring-violet-100/60">

                                        <p className="text-[9px] font-black uppercase tracking-wider text-violet-400">
                                            Weekly Class
                                        </p>

                                        <span className={`mt-1 inline-flex max-w-full items-center gap-2 rounded-lg px-2 py-1 text-[9px] font-black uppercase tracking-wider ${classItem.continue
                                            ? 'bg-lime-50 text-lime-700'
                                            : 'bg-amber-50 text-amber-600'
                                            }`}>

                                            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${classItem.continue
                                                ? 'bg-lime-500'
                                                : 'bg-amber-500'
                                                }`} />

                                            {classItem.continue ? 'Every Week' : 'One Time'}

                                        </span>

                                    </div>

                                </div>

                                <div className="mt-2.5 rounded-xl bg-white px-3 py-2.5 ring-1 ring-violet-100/60">

                                    <p className="text-[9px] font-black uppercase tracking-wider text-violet-400">
                                        Schedule
                                    </p>

                                    <div className="mt-1.5 flex flex-col gap-1.5">

                                        {classItem.schedule?.map((schedule, index) => (

                                            <span
                                                key={index}
                                                className="w-fit max-w-full break-all rounded-lg bg-cyan-50 px-2 py-1 text-[9px] font-black text-cyan-700"
                                            >
                                                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][schedule.day]} {schedule.startTime} - {schedule.endTime}
                                            </span>

                                        ))}

                                    </div>

                                </div>

                            </div>

                        ))

                    ) : (

                        <div className="px-5 py-16 text-center">

                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-400">
                                <span className="text-lg font-black">
                                    Z
                                </span>
                            </div>

                            <p className="mt-3 text-sm font-bold text-violet-900">
                                No classes found
                            </p>

                            <p className="mt-1 text-xs font-medium text-slate-400">
                                {search ? 'No class or teacher email matches your search' : 'No class records are available'}
                            </p>

                        </div>

                    )}

                </div>

                {filteredClasses.length > 0 && (

                    <div className="flex flex-col gap-3 border-t border-violet-50 bg-gradient-to-r from-white via-violet-50/30 to-cyan-50/30 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4">

                        <p className="text-center text-[10px] font-semibold text-slate-400 sm:text-left">
                            Showing <span className="font-black text-violet-600">{startIndex + 1}</span> to <span className="font-black text-violet-600">{Math.min(startIndex + classesPerPage, filteredClasses.length)}</span> of <span className="font-black text-violet-600">{filteredClasses.length}</span> classes
                        </p>

                        <div className="flex w-full items-center justify-center gap-1.5 sm:w-auto">

                            <button
                                type="button"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((page) => page - 1)}
                                className="rounded-lg bg-white px-2.5 py-2 text-[10px] font-bold text-slate-400 shadow-sm ring-1 ring-violet-100 transition-all hover:bg-violet-50 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-40 sm:px-3"
                            >
                                Previous
                            </button>

                            <div className="flex max-w-[150px] items-center gap-1.5 overflow-x-auto px-0.5 sm:max-w-none">

                                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (

                                    <button
                                        key={page}
                                        type="button"
                                        onClick={() => setCurrentPage(page)}
                                        className={`flex h-8 min-w-8 shrink-0 items-center justify-center rounded-lg px-2 text-[10px] font-black transition-all ${currentPage === page
                                            ? 'bg-violet-600 text-white shadow-md shadow-violet-200'
                                            : 'bg-white text-slate-400 ring-1 ring-violet-100 hover:bg-violet-50 hover:text-violet-600'
                                            }`}
                                    >
                                        {page}
                                    </button>

                                ))}

                            </div>

                            <button
                                type="button"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((page) => page + 1)}
                                className="rounded-lg bg-white px-2.5 py-2 text-[10px] font-bold text-slate-400 shadow-sm ring-1 ring-violet-100 transition-all hover:bg-violet-50 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-40 sm:px-3"
                            >
                                Next
                            </button>

                        </div>

                    </div>

                )}

            </div>

        </div>
    )
}

export default Classes