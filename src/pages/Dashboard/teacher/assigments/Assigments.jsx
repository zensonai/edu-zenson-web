import React, { useEffect, useMemo, useState } from 'react'
import { FaEye, FaFilePdf, FaMagnifyingGlass } from 'react-icons/fa6'
import API from '../../../../services/api'

const Assigments = () => {
    const token = localStorage.getItem('access_token')

    const [assigments, setAssigments] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState('')

    const assigmentsPerPage = 10

    const filteredAssigments = useMemo(() => {
        const searchValue = search.trim().toLowerCase()

        if (!searchValue) {
            return assigments
        }

        return assigments.filter((assigment) =>
            assigment.name?.toLowerCase().includes(searchValue) ||
            assigment.class?.class_name?.toLowerCase().includes(searchValue)
        )
    }, [assigments, search])

    const totalPages = Math.ceil(filteredAssigments.length / assigmentsPerPage)
    const startIndex = (currentPage - 1) * assigmentsPerPage
    const currentAssigments = filteredAssigments.slice(startIndex, startIndex + assigmentsPerPage)

    useEffect(() => {
        const fetchassignments = async () => {
            const res = await API.get('/assigments/fetch-my-assgnmnets', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (res.data.success === true) {
                setAssigments(res.data.result)
            }
        }

        if (token) fetchassignments()
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
                            Assignment Management
                        </p>
                    </div>

                    <h1 className="text-xl font-black tracking-tight text-violet-950">
                        Assignments
                    </h1>

                    <p className="mt-1 text-sm font-medium text-slate-400">
                        Manage assignments created for your classes
                    </p>

                </div>

                <div className="flex w-fit shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-violet-50 to-cyan-50 px-4 py-2.5">

                    <span className="h-2 w-2 rounded-full bg-lime-400" />

                    <span className="text-xs font-bold text-violet-700">
                        {filteredAssigments.length} Assignments
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
                        placeholder="Search assignment or class..."
                        className="h-11 w-full rounded-xl border-0 bg-slate-50 pl-10 pr-4 text-xs font-semibold text-violet-950 outline-none ring-1 ring-violet-100 transition-all placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-violet-300"
                    />

                </div>

            </div>

            <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-violet-100/70">

                <div className="hidden overflow-x-auto sm:block">

                    <table className="w-full min-w-[900px]">

                        <thead>

                            <tr className="bg-gradient-to-r from-violet-50 via-white to-cyan-50">

                                <th className="px-5 py-4 text-left text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                    Assignment
                                </th>

                                <th className="px-5 py-4 text-left text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                    Class
                                </th>

                                <th className="px-5 py-4 text-left text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                    Due Date
                                </th>

                                <th className="px-5 py-4 text-left text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                    Assignment Document
                                </th>

                                <th className="px-5 py-4 text-right text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {currentAssigments.length > 0 ? (

                                currentAssigments.map((assigment) => (

                                    <tr
                                        key={assigment._id}
                                        className="group border-t border-violet-50 transition-all duration-200 hover:bg-gradient-to-r hover:from-violet-50/50 hover:via-white hover:to-cyan-50/40"
                                    >

                                        <td className="px-5 py-4">

                                            <div className="flex items-center gap-3">

                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-sm font-black text-violet-600 shadow-sm">
                                                    {assigment.name?.charAt(0)?.toUpperCase() || 'A'}
                                                </div>

                                                <div className="min-w-0">

                                                    <p className="max-w-[260px] truncate text-[13px] font-extrabold text-violet-950">
                                                        {assigment.name || '-'}
                                                    </p>

                                                    <p className="mt-0.5 max-w-[300px] truncate text-[9px] font-bold uppercase tracking-wider text-slate-400">
                                                        {assigment.description || 'Assignment'}
                                                    </p>

                                                </div>

                                            </div>

                                        </td>

                                        <td className="px-5 py-4">

                                            <span className="inline-flex rounded-lg bg-violet-50 px-2.5 py-1.5 text-[10px] font-black tracking-wider text-violet-600">
                                                {assigment.class?.class_name || '-'}
                                            </span>

                                        </td>

                                        <td className="px-5 py-4">

                                            <span className="inline-flex rounded-lg bg-cyan-50 px-2.5 py-1.5 text-[10px] font-black tracking-wider text-cyan-700">
                                                {assigment.due_date
                                                    ? new Date(assigment.due_date).toLocaleDateString()
                                                    : '-'}
                                            </span>

                                        </td>

                                        <td className="px-5 py-4">

                                            <a
                                                href={`${import.meta.env.VITE_APP_API_FILES}/uploads/assigments/${assigment.assigment_docs}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="Open Assignment Document"
                                                className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-[10px] font-black uppercase tracking-wider text-red-600 transition-all duration-200 hover:bg-red-600 hover:text-white"
                                            >
                                                <FaFilePdf className="h-3.5 w-3.5" />
                                                Open PDF
                                            </a>

                                        </td>

                                        <td className="px-5 py-4">

                                            <div className="flex items-center justify-end">

                                                <a
                                                    href={`/dashboard/assigment/view-assigment/${assigment._id}`}
                                                    title="View Assignment"
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
                                            No assignments found
                                        </p>

                                        <p className="mt-1 text-xs font-medium text-slate-400">
                                            {search
                                                ? 'No assignment or class matches your search'
                                                : 'No assignment records are available'}
                                        </p>

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

                <div className="space-y-3 p-3 sm:hidden">

                    {currentAssigments.length > 0 ? (

                        currentAssigments.map((assigment) => (

                            <div
                                key={assigment._id}
                                className="w-full rounded-2xl bg-gradient-to-br from-white via-violet-50/40 to-cyan-50/40 p-3.5 ring-1 ring-violet-100/70"
                            >

                                <div className="flex w-full items-start gap-3">

                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-sm font-black text-violet-600 shadow-sm">
                                        {assigment.name?.charAt(0)?.toUpperCase() || 'A'}
                                    </div>

                                    <div className="min-w-0 flex-1">

                                        <p className="break-words text-[12px] font-extrabold leading-5 text-violet-950">
                                            {assigment.name || '-'}
                                        </p>

                                        <p className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                                            Assignment
                                        </p>

                                    </div>

                                    <a
                                        href={`/dashboard/assigment/view-assigment/${assigment._id}`}
                                        title="View Assignment"
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-violet-500 shadow-sm ring-1 ring-violet-100 transition-all duration-200 hover:bg-violet-600 hover:text-white"
                                    >
                                        <FaEye className="h-3.5 w-3.5" />
                                    </a>

                                </div>

                                <div className="mt-3 grid grid-cols-1 gap-2.5 xs:grid-cols-2">

                                    <div className="min-w-0 rounded-xl bg-white px-3 py-2.5 ring-1 ring-violet-100/60">

                                        <p className="text-[9px] font-black uppercase tracking-wider text-violet-400">
                                            Class
                                        </p>

                                        <p className="mt-1 break-words text-[11px] font-extrabold text-violet-950">
                                            {assigment.class?.class_name || '-'}
                                        </p>

                                    </div>

                                    <div className="min-w-0 rounded-xl bg-white px-3 py-2.5 ring-1 ring-violet-100/60">

                                        <p className="text-[9px] font-black uppercase tracking-wider text-violet-400">
                                            Due Date
                                        </p>

                                        <p className="mt-1 text-[11px] font-extrabold text-violet-950">
                                            {assigment.due_date
                                                ? new Date(assigment.due_date).toLocaleDateString()
                                                : '-'}
                                        </p>

                                    </div>

                                    <div className="min-w-0 rounded-xl bg-white px-3 py-2.5 ring-1 ring-violet-100/60 xs:col-span-2">

                                        <p className="text-[9px] font-black uppercase tracking-wider text-violet-400">
                                            Assignment Document
                                        </p>

                                        <a
                                            href={`/uploads/${assigment.assigment_docs}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-[10px] font-black uppercase tracking-wider text-red-600 transition-all duration-200 hover:bg-red-600 hover:text-white"
                                        >
                                            <FaFilePdf className="h-3.5 w-3.5" />
                                            Open Assignment PDF
                                        </a>

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
                                No assignments found
                            </p>

                            <p className="mt-1 text-xs font-medium text-slate-400">
                                {search
                                    ? 'No assignment or class matches your search'
                                    : 'No assignment records are available'}
                            </p>

                        </div>

                    )}

                </div>

                {filteredAssigments.length > 0 && (

                    <div className="flex flex-col gap-3 border-t border-violet-50 bg-gradient-to-r from-white via-violet-50/30 to-cyan-50/30 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4">

                        <p className="text-center text-[10px] font-semibold text-slate-400 sm:text-left">
                            Showing <span className="font-black text-violet-600">{startIndex + 1}</span> to <span className="font-black text-violet-600">{Math.min(startIndex + assigmentsPerPage, filteredAssigments.length)}</span> of <span className="font-black text-violet-600">{filteredAssigments.length}</span> assignments
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

export default Assigments