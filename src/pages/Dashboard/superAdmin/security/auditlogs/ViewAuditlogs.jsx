import React, { useEffect, useState } from 'react'
import {
    FaArrowLeft,
    FaArrowRight,
    FaClock,
    FaEye,
    FaMagnifyingGlass,
    FaShieldHalved,
    FaUser,
    FaRightToBracket
} from 'react-icons/fa6'
import API from '../../../../../services/api'

const ViewAuditlogs = () => {
    const token = localStorage.getItem('access_token')
    const [auditlogs, setAuditlogs] = useState([])
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchauditlogs = async () => {
            setLoading(true)

            const res = await API.get('/admin/fetch-auditlogs', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            if (res.data.success === true) {
                setAuditlogs(res.data.result)
            }

            setLoading(false)
        }

        if (token) fetchauditlogs()
    }, [token])

    const filteredAuditlogs = auditlogs.filter((data) => {
        const searchValue = search.toLowerCase()

        return (
            data?.userId?.email?.toLowerCase().includes(searchValue) ||
            data?.action?.toLowerCase().includes(searchValue) ||
            data?.resource?.toLowerCase().includes(searchValue) ||
            data?.result?.toLowerCase().includes(searchValue) ||
            data?.severity?.toLowerCase().includes(searchValue) ||
            data?.reason?.toLowerCase().includes(searchValue) ||
            data?.ipAddress?.toLowerCase().includes(searchValue)
        )
    })

    const itemsPerPage = 20
    const totalPages = Math.ceil(
        filteredAuditlogs.length / itemsPerPage
    )

    const startIndex = (currentPage - 1) * itemsPerPage

    const currentAuditlogs = filteredAuditlogs.slice(
        startIndex,
        startIndex + itemsPerPage
    )

    const handleSearch = (e) => {
        setSearch(e.target.value)
        setCurrentPage(1)
    }

    const formatDate = (date) => {
        if (!date) return '—'

        return new Date(date).toLocaleString()
    }

    const getActionClass = (action) => {
        if (action === 'LOGIN') {
            return 'bg-violet-50 text-violet-700 ring-violet-100'
        }

        if (action === 'LOGOUT') {
            return 'bg-slate-50 text-slate-600 ring-slate-100'
        }

        if (action === 'REGISTER') {
            return 'bg-cyan-50 text-cyan-700 ring-cyan-100'
        }

        if (action === 'ACCESS_GRANTED') {
            return 'bg-lime-50 text-lime-700 ring-lime-100'
        }

        if (action === 'ACCESS_DENIED') {
            return 'bg-red-50 text-red-600 ring-red-100'
        }

        return 'bg-blue-50 text-blue-700 ring-blue-100'
    }

    const getSeverityClass = (severity) => {
        if (severity === 'LOW') {
            return 'bg-slate-50 text-slate-600 ring-slate-100'
        }

        if (severity === 'MEDIUM') {
            return 'bg-amber-50 text-amber-700 ring-amber-100'
        }

        if (severity === 'HIGH') {
            return 'bg-orange-50 text-orange-700 ring-orange-100'
        }

        if (severity === 'CRITICAL') {
            return 'bg-red-50 text-red-600 ring-red-100'
        }

        return 'bg-slate-50 text-slate-600 ring-slate-100'
    }

    return (
        <div className="w-full bg-white p-4 sm:p-5 lg:p-6">
            <div className="mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-50 via-white to-cyan-50 ring-1 ring-violet-100/70">
                <div className="flex flex-col gap-4 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex min-w-0 items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-200">
                            <FaShieldHalved className="h-5 w-5" />
                        </div>

                        <div className="min-w-0">
                            <p className="mb-1 text-[9px] font-black uppercase tracking-[0.18em] text-violet-500">
                                Security & Activity
                            </p>

                            <h1 className="text-xl font-black tracking-tight text-violet-950 sm:text-2xl">
                                Audit Logs
                            </h1>

                            <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                                View all security and system activity recorded by the authentication system.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 self-start rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-violet-100 lg:self-auto">
                        <FaShieldHalved className="h-3.5 w-3.5 text-violet-600" />

                        <span className="text-[10px] font-black uppercase tracking-wider text-violet-700">
                            {filteredAuditlogs.length} Logs
                        </span>
                    </div>
                </div>
            </div>

            <div className="mb-5 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:p-5">
                <div className="relative">
                    <FaMagnifyingGlass className="pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-violet-400" />

                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="Search by email, action, resource, result, severity, IP..."
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-xs font-medium text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:ring-2 focus:ring-violet-100"
                    />
                </div>
            </div>

            <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 sm:block">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1300px]">
                        <thead>
                            <tr className="border-b border-violet-50 bg-gradient-to-r from-violet-50/70 via-white to-cyan-50/40">
                                <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.12em] text-violet-500">
                                    User
                                </th>

                                <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.12em] text-violet-500">
                                    Action
                                </th>

                                <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.12em] text-violet-500">
                                    Resource
                                </th>

                                <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.12em] text-violet-500">
                                    Result
                                </th>

                                <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.12em] text-violet-500">
                                    Severity
                                </th>

                                <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.12em] text-violet-500">
                                    Reason
                                </th>

                                <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.12em] text-violet-500">
                                    IP Address
                                </th>

                                <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.12em] text-violet-500">
                                    Date & Time
                                </th>

                                <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.12em] text-violet-500">
                                    View
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                currentAuditlogs.map((data, index) => {
                                    return (
                                        <tr
                                            key={data._id || index}
                                            className="border-b border-slate-50 transition-colors duration-200 hover:bg-violet-50/30"
                                        >
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600 ring-1 ring-violet-100">
                                                        <FaUser className="h-3.5 w-3.5" />
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="max-w-[220px] truncate text-xs font-bold text-violet-950">
                                                            {data?.userId?.email}
                                                        </p>

                                                        <p className="mt-1 text-[9px] font-black uppercase tracking-wider text-slate-400">
                                                            User Email
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wide ring-1 ${getActionClass(data.action)}`}
                                                >
                                                    {data.action === 'LOGIN' && (
                                                        <FaRightToBracket className="h-3 w-3" />
                                                    )}

                                                    {data.action}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className="text-xs font-semibold text-slate-600">
                                                    {data.resource || '—'}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wide ${data.result === 'SUCCESS'
                                                            ? 'bg-lime-50 text-lime-700 ring-1 ring-lime-100'
                                                            : data.result === 'DENIED'
                                                                ? 'bg-red-50 text-red-600 ring-1 ring-red-100'
                                                                : 'bg-amber-50 text-amber-700 ring-1 ring-amber-100'
                                                        }`}
                                                >
                                                    {data.result || '—'}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wide ring-1 ${getSeverityClass(data.severity)}`}
                                                >
                                                    <FaShieldHalved className="h-3 w-3" />
                                                    {data.severity || '—'}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <p className="max-w-[280px] truncate text-xs font-medium text-slate-600">
                                                    {data.reason || '—'}
                                                </p>
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className="text-xs font-semibold text-slate-600">
                                                    {data.ipAddress || '—'}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2">
                                                    <FaClock className="h-3 w-3 text-slate-400" />

                                                    <span className="text-xs font-medium text-slate-500">
                                                        {formatDate(data.createdAt)}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                <a
                                                    href={`/dashboard/security/view-auditlog/${data._id}`}
                                                    title="View Audit Log"
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition-all duration-200 hover:bg-violet-50 hover:text-violet-600"
                                                >
                                                    <FaEye className="h-3.5 w-3.5" />
                                                </a>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="space-y-4 sm:hidden">
                {
                    currentAuditlogs.map((data, index) => {
                        return (
                            <div
                                key={data._id || index}
                                className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100"
                            >
                                <div className="flex items-start justify-between gap-3 border-b border-violet-50 bg-gradient-to-r from-violet-50/70 via-white to-cyan-50/40 p-4">
                                    <div className="flex min-w-0 items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                                            <FaShieldHalved className="h-4 w-4" />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="truncate text-xs font-black text-violet-950">
                                                {data?.userId?.email}
                                            </p>

                                            <p className="mt-1 text-[9px] font-black uppercase tracking-wider text-slate-400">
                                                User Email
                                            </p>
                                        </div>
                                    </div>

                                    <span
                                        className={`shrink-0 rounded-full px-2.5 py-1.5 text-[9px] font-black uppercase tracking-wide ${data.result === 'SUCCESS'
                                                ? 'bg-lime-50 text-lime-700 ring-1 ring-lime-100'
                                                : data.result === 'DENIED'
                                                    ? 'bg-red-50 text-red-600 ring-1 ring-red-100'
                                                    : 'bg-amber-50 text-amber-700 ring-1 ring-amber-100'
                                            }`}
                                    >
                                        {data.result || '—'}
                                    </span>
                                </div>

                                <div className="space-y-3 p-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                            Action
                                        </span>

                                        <span
                                            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[9px] font-black uppercase ring-1 ${getActionClass(data.action)}`}
                                        >
                                            {data.action === 'LOGIN' && (
                                                <FaRightToBracket className="h-2.5 w-2.5" />
                                            )}

                                            {data.action}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between gap-3">
                                        <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                            Resource
                                        </span>

                                        <span className="max-w-[220px] truncate text-right text-xs font-semibold text-slate-600">
                                            {data.resource || '—'}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between gap-3">
                                        <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                            Severity
                                        </span>

                                        <span
                                            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[9px] font-black uppercase ring-1 ${getSeverityClass(data.severity)}`}
                                        >
                                            <FaShieldHalved className="h-2.5 w-2.5" />
                                            {data.severity || '—'}
                                        </span>
                                    </div>

                                    <div className="flex items-start justify-between gap-3">
                                        <span className="pt-1 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                            Reason
                                        </span>

                                        <span className="max-w-[220px] text-right text-[11px] font-medium leading-5 text-slate-500">
                                            {data.reason || '—'}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between gap-3">
                                        <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                            IP Address
                                        </span>

                                        <span className="text-xs font-semibold text-slate-600">
                                            {data.ipAddress || '—'}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between gap-3">
                                        <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                            Date & Time
                                        </span>

                                        <span className="flex items-center gap-1.5 text-right text-[11px] font-medium text-slate-500">
                                            <FaClock className="h-3 w-3" />
                                            {formatDate(data.createdAt)}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between gap-3 border-t border-slate-50 pt-3">
                                        <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                            View
                                        </span>

                                        <a
                                            href={`/dashboard/security/view-auditlog/${data._id}`}
                                            title="View Audit Log"
                                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition-all duration-200 hover:bg-violet-50 hover:text-violet-600"
                                        >
                                            <FaEye className="h-3.5 w-3.5" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            {!loading && currentAuditlogs.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-violet-50 via-white to-cyan-50 px-6 py-16 text-center ring-1 ring-violet-100/70">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-violet-500 shadow-sm ring-1 ring-violet-100">
                        <FaShieldHalved className="h-6 w-6" />
                    </div>

                    <h3 className="mt-4 text-sm font-black text-violet-950">
                        No Audit Logs Found
                    </h3>

                    <p className="mt-1 max-w-sm text-xs leading-5 text-slate-400">
                        No audit activity matches your current search.
                    </p>
                </div>
            )}

            {totalPages > 0 && (
                <div className="mt-5 flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[10px] font-bold text-slate-400">
                        Showing{' '}
                        <span className="text-violet-700">
                            {startIndex + 1}
                        </span>{' '}
                        to{' '}
                        <span className="text-violet-700">
                            {Math.min(
                                startIndex + itemsPerPage,
                                filteredAuditlogs.length
                            )}
                        </span>{' '}
                        of{' '}
                        <span className="text-violet-700">
                            {filteredAuditlogs.length}
                        </span>{' '}
                        logs
                    </p>

                    <div className="flex items-center justify-between gap-2 sm:justify-end">
                        <button
                            type="button"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((page) => page - 1)}
                            className="flex h-8 items-center gap-2 rounded-lg bg-slate-50 px-3 text-[10px] font-black text-slate-500 ring-1 ring-slate-100 transition-all duration-200 hover:bg-violet-50 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <FaArrowLeft className="h-3 w-3" />
                            Previous
                        </button>

                        <div className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-violet-600 px-2.5 text-[10px] font-black text-white shadow-sm shadow-violet-200">
                            {currentPage}
                        </div>

                        <button
                            type="button"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((page) => page + 1)}
                            className="flex h-8 items-center gap-2 rounded-lg bg-slate-50 px-3 text-[10px] font-black text-slate-500 ring-1 ring-slate-100 transition-all duration-200 hover:bg-violet-50 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Next
                            <FaArrowRight className="h-3 w-3" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ViewAuditlogs