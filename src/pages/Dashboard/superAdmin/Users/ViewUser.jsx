import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../../../services/api'
import UpdateUser from './UpdateUser'

const ViewUser = () => {
    const [loadError, setLoadError] = useState('')
    const { id } = useParams()
    const token = localStorage.getItem('access_token')
    const [user, setUser] = useState('')
    const [auditSearch, setAuditSearch] = useState('')
    const [auditFilter, setAuditFilter] = useState('ALL')
    const [auditPage, setAuditPage] = useState(1)

    useEffect(() => {
        const fetchuser = async () => {
            setLoadError('')
            try {
                const res = await API.get(`/admin/user/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                if (res.data.success === true) {
                    setUser(res.data.result)
                }
            } catch (err) {
                const message = err.response?.data?.message
                setLoadError(Array.isArray(message) ? message.join(' ') : message || 'Unable to load this record. Please try again.')
            }
        }
        if (token) fetchuser()
    }, [token, id])

    const filteredAuditLogs = user[2]?.filter((log) => {
        const searchValue = auditSearch.toLowerCase()

        const matchesSearch =
            log.action?.toLowerCase().includes(searchValue) ||
            log.resource?.toLowerCase().includes(searchValue) ||
            log.result?.toLowerCase().includes(searchValue) ||
            log.severity?.toLowerCase().includes(searchValue) ||
            log.reason?.toLowerCase().includes(searchValue) ||
            log.ipAddress?.toLowerCase().includes(searchValue)

        const matchesFilter =
            auditFilter === 'ALL' ||
            log.result === auditFilter ||
            log.severity === auditFilter

        return matchesSearch && matchesFilter
    }) || []

    const auditLogsPerPage = 10
    const auditTotalPages = Math.ceil(filteredAuditLogs.length / auditLogsPerPage)
    const auditStartIndex = (auditPage - 1) * auditLogsPerPage
    const currentAuditLogs = filteredAuditLogs.slice(
        auditStartIndex,
        auditStartIndex + auditLogsPerPage
    )

    useEffect(() => {
        setAuditPage(1)
    }, [auditSearch, auditFilter])

    if (loadError) {
        return (
            <div className="w-full bg-white p-4">
                <p role="alert" className="text-sm text-slate-700">{loadError}</p>
            </div>
        )
    }

    return (
        <div className="min-h-full w-full bg-white">
            <div className="w-full">

                <div className="p-4 sm:p-5 lg:p-6">
                    <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                        View User
                    </h1>
                    <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                        View user profile and account activity
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 px-4 sm:gap-5 sm:px-5 lg:grid-cols-3 lg:px-6">

                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white sm:rounded-2xl lg:col-span-1">

                        <div className="border-b border-slate-200 bg-slate-50 px-4 py-4 sm:px-5">
                            <h2 className="text-sm font-bold text-slate-800 sm:text-base">
                                Account Information
                            </h2>
                        </div>

                        <div className="p-4 sm:p-5">

                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-lg font-bold text-indigo-600">
                                    {user[0]?.email?.charAt(0)?.toUpperCase() || 'U'}
                                </div>

                                <div className="min-w-0">
                                    <p className="break-all text-sm font-semibold text-slate-800">
                                        {user[0]?.email || '—'}
                                    </p>

                                    <p className="mt-1 text-xs text-slate-400">
                                        User Account
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 space-y-4">

                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                        Email
                                    </p>
                                    <p className="mt-1 break-all text-sm font-medium text-slate-700">
                                        {user[0]?.email || '—'}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                        Role
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-indigo-700">
                                        {user[0]?.roleId?.name || '—'}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                        Account Status
                                    </p>
                                    <span
                                        className={`mt-1 inline-flex rounded-lg px-3 py-1.5 text-xs font-semibold ${user[0]?.accountStatus === 'ACTIVE'
                                                ? 'bg-lime-50 text-lime-700'
                                                : user[0]?.accountStatus === 'SUSPENDED'
                                                    ? 'bg-red-50 text-red-700'
                                                    : 'bg-slate-100 text-slate-600'
                                            }`}
                                    >
                                        {user[0]?.accountStatus || '—'}
                                    </span>
                                </div>

                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                        Authentication Provider
                                    </p>
                                    <p className="mt-1 text-sm font-medium text-slate-700">
                                        {user[0]?.authProvider || 'LOCAL'}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                        Email Verified
                                    </p>
                                    <p className="mt-1 text-sm font-medium text-slate-700">
                                        {user[0]?.emailVerified ? 'Verified' : 'Not Verified'}
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white sm:rounded-2xl lg:col-span-2">

                        <div className="border-b border-slate-200 bg-slate-50 px-4 py-4 sm:px-5">
                            <h2 className="text-sm font-bold text-slate-800 sm:text-base">
                                Personal Information
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:gap-5 sm:p-5">

                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                    Middle Name
                                </p>
                                <p className="mt-1 text-sm font-medium text-slate-700">
                                    {user[1]?.middleName || '—'}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                    Display Name
                                </p>
                                <p className="mt-1 text-sm font-medium text-slate-700">
                                    {user[1]?.displayName || '—'}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                    Title
                                </p>
                                <p className="mt-1 text-sm font-medium text-slate-700">
                                    {user[1]?.title || '—'}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                    Date of Birth
                                </p>
                                <p className="mt-1 text-sm font-medium text-slate-700">
                                    {user[1]?.dateOfBirth || '—'}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                    Gender
                                </p>
                                <p className="mt-1 text-sm font-medium text-slate-700">
                                    {user[1]?.gender || '—'}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                    NIC
                                </p>
                                <p className="mt-1 text-sm font-medium text-slate-700">
                                    {user[1]?.nic || '—'}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                    Passport Number
                                </p>
                                <p className="mt-1 text-sm font-medium text-slate-700">
                                    {user[1]?.passportNumber || '—'}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                    Nationality
                                </p>
                                <p className="mt-1 text-sm font-medium text-slate-700">
                                    {user[1]?.nationality || '—'}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                    Phone
                                </p>
                                <p className="mt-1 text-sm font-medium text-slate-700">
                                    {user[1]?.phone || '—'}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                    Alternate Phone
                                </p>
                                <p className="mt-1 text-sm font-medium text-slate-700">
                                    {user[1]?.alternatePhone || '—'}
                                </p>
                            </div>

                            <div className="sm:col-span-2">
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                    Address
                                </p>
                                <p className="mt-1 break-words text-sm font-medium text-slate-700">
                                    {[
                                        user[1]?.addressLine1,
                                        user[1]?.addressLine2,
                                        user[1]?.city,
                                        user[1]?.state,
                                        user[1]?.postalCode
                                    ].filter(Boolean).join(', ') || '—'}
                                </p>
                            </div>

                        </div>
                    </div>

                </div>

                <div className="mt-4 px-4 sm:mt-5 sm:px-5 lg:px-6">
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white sm:rounded-2xl">

                        <div className="border-b border-slate-200 bg-slate-50 px-4 py-4 sm:px-5">
                            <h2 className="text-sm font-bold text-slate-800 sm:text-base">
                                Emergency Contact
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 sm:gap-5 sm:p-5">

                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                    Name
                                </p>
                                <p className="mt-1 text-sm font-medium text-slate-700">
                                    {user[1]?.emergencyContactName || '—'}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                    Phone
                                </p>
                                <p className="mt-1 text-sm font-medium text-slate-700">
                                    {user[1]?.emergencyContactPhone || '—'}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                    Relationship
                                </p>
                                <p className="mt-1 text-sm font-medium text-slate-700">
                                    {user[1]?.emergencyContactRelationship || '—'}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="mt-4 px-4 sm:mt-5 sm:px-5 lg:px-6">
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white sm:rounded-2xl">

                        <div className="border-b border-slate-200 bg-slate-50 px-4 py-4 sm:px-5">
                            <h2 className="text-sm font-bold text-slate-800 sm:text-base">
                                Social Information
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:gap-5 sm:p-5">

                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                    Facebook
                                </p>
                                <p className="mt-1 break-all text-sm font-medium text-slate-700">
                                    {user[1]?.facebook || '—'} 
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                    User ID
                                </p>
                                <p className="mt-1 break-all text-sm font-medium text-slate-700">
                                    {user[0]?._id || '—'}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="mt-4 px-4 pb-5 sm:mt-5 sm:px-5 sm:pb-6 lg:px-6">
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white sm:rounded-2xl">

                        <div className="border-b border-slate-200 bg-slate-50 px-4 py-4 sm:px-5">
                            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

                                <div>
                                    <h2 className="text-sm font-bold text-slate-800 sm:text-base">
                                        Audit Logs
                                    </h2>
                                    <p className="mt-1 text-xs text-slate-400">
                                        {filteredAuditLogs.length} log{filteredAuditLogs.length !== 1 ? 's' : ''} found
                                    </p>
                                </div>

                                <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">

                                    <input
                                        type="text"
                                        value={auditSearch}
                                        onChange={(e) => setAuditSearch(e.target.value)}
                                        placeholder="Search audit logs..."
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:w-64 sm:rounded-xl sm:px-4"
                                    />

                                    <select
                                        value={auditFilter}
                                        onChange={(e) => setAuditFilter(e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:w-44 sm:rounded-xl sm:px-4"
                                    >
                                        <option value="ALL">All Logs</option>
                                        <option value="SUCCESS">Success</option>
                                        <option value="FAILED">Failed</option>
                                        <option value="DENIED">Denied</option>
                                        <option value="LOW">Low</option>
                                        <option value="MEDIUM">Medium</option>
                                        <option value="HIGH">High</option>
                                        <option value="CRITICAL">Critical</option>
                                    </select>

                                </div>

                            </div>
                        </div>

                        <div className="hidden overflow-x-auto md:block">
                            <table className="w-full min-w-[1000px]">
                                <thead>
                                    <tr className="border-b border-slate-200 bg-white">
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Action
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Resource
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Result
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Severity
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Reason
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Date
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100">
                                    {
                                        currentAuditLogs.length > 0 ? (
                                            currentAuditLogs.map((log, index) => (
                                                <tr
                                                    key={index}
                                                    className="transition hover:bg-slate-50"
                                                >
                                                    <td className="px-4 py-4 text-sm font-semibold text-slate-700">
                                                        {log.action || '—'}
                                                    </td>

                                                    <td className="px-4 py-4 text-sm text-slate-600">
                                                        {log.resource || '—'}
                                                    </td>

                                                    <td className="px-4 py-4">
                                                        <span
                                                            className={`inline-flex rounded-lg px-3 py-1.5 text-xs font-semibold ${log.result === 'SUCCESS'
                                                                    ? 'bg-lime-50 text-lime-700'
                                                                    : log.result === 'FAILED'
                                                                        ? 'bg-red-50 text-red-700'
                                                                        : log.result === 'DENIED'
                                                                            ? 'bg-orange-50 text-orange-700'
                                                                            : 'bg-slate-100 text-slate-600'
                                                                }`}
                                                        >
                                                            {log.result || '—'}
                                                        </span>
                                                    </td>

                                                    <td className="px-4 py-4">
                                                        <span
                                                            className={`inline-flex rounded-lg px-3 py-1.5 text-xs font-semibold ${log.severity === 'CRITICAL'
                                                                    ? 'bg-red-50 text-red-700'
                                                                    : log.severity === 'HIGH'
                                                                        ? 'bg-orange-50 text-orange-700'
                                                                        : log.severity === 'MEDIUM'
                                                                            ? 'bg-amber-50 text-amber-700'
                                                                            : 'bg-slate-100 text-slate-600'
                                                                }`}
                                                        >
                                                            {log.severity || '—'}
                                                        </span>
                                                    </td>

                                                    <td className="max-w-xs px-4 py-4 text-sm text-slate-600">
                                                        {log.reason || '—'}
                                                    </td>

                                                    <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-500">
                                                        {log.createdAt
                                                            ? new Date(log.createdAt).toLocaleString()
                                                            : '—'}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    className="px-4 py-10 text-center text-sm font-medium text-slate-500"
                                                >
                                                    No audit logs found
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className="block md:hidden">
                            {
                                currentAuditLogs.length > 0 ? (
                                    <div className="divide-y divide-slate-100">
                                        {
                                            currentAuditLogs.map((log, index) => (
                                                <div
                                                    key={index}
                                                    className="p-4"
                                                >
                                                    <div className="flex items-start justify-between gap-3">

                                                        <div className="min-w-0">
                                                            <p className="break-words text-sm font-semibold text-slate-800">
                                                                {log.action || '—'}
                                                            </p>

                                                            <p className="mt-1 text-xs text-slate-400">
                                                                {log.resource || '—'}
                                                            </p>
                                                        </div>

                                                        <span
                                                            className={`shrink-0 rounded-lg px-2.5 py-1 text-[10px] font-semibold ${log.result === 'SUCCESS'
                                                                    ? 'bg-lime-50 text-lime-700'
                                                                    : log.result === 'FAILED'
                                                                        ? 'bg-red-50 text-red-700'
                                                                        : log.result === 'DENIED'
                                                                            ? 'bg-orange-50 text-orange-700'
                                                                            : 'bg-slate-100 text-slate-600'
                                                                }`}
                                                        >
                                                            {log.result || '—'}
                                                        </span>

                                                    </div>

                                                    <div className="mt-4 grid grid-cols-2 gap-4">

                                                        <div>
                                                            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                                                Severity
                                                            </p>

                                                            <span
                                                                className={`mt-1 inline-flex rounded-lg px-2.5 py-1 text-[10px] font-semibold ${log.severity === 'CRITICAL'
                                                                        ? 'bg-red-50 text-red-700'
                                                                        : log.severity === 'HIGH'
                                                                            ? 'bg-orange-50 text-orange-700'
                                                                            : log.severity === 'MEDIUM'
                                                                                ? 'bg-amber-50 text-amber-700'
                                                                                : 'bg-slate-100 text-slate-600'
                                                                    }`}
                                                            >
                                                                {log.severity || '—'}
                                                            </span>
                                                        </div>

                                                        <div>
                                                            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                                                Date
                                                            </p>

                                                            <p className="mt-1 text-xs font-medium text-slate-600">
                                                                {log.createdAt
                                                                    ? new Date(log.createdAt).toLocaleString()
                                                                    : '—'}
                                                            </p>
                                                        </div>

                                                    </div>

                                                    <div className="mt-4">
                                                        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                                            Reason
                                                        </p>

                                                        <p className="mt-1 break-words text-xs leading-5 text-slate-600">
                                                            {log.reason || '—'}
                                                        </p>
                                                    </div>

                                                    <div className="mt-4 grid grid-cols-1 gap-3">

                                                        <div>
                                                            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                                                IP Address
                                                            </p>

                                                            <p className="mt-1 break-all text-xs font-medium text-slate-600">
                                                                {log.ipAddress || '—'}
                                                            </p>
                                                        </div>

                                                        <div>
                                                            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                                                Endpoint
                                                            </p>

                                                            <p className="mt-1 break-all text-xs font-medium text-slate-600">
                                                                {log.endpoint || '—'}
                                                            </p>
                                                        </div>

                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                ) : (
                                    <div className="px-4 py-10 text-center text-sm font-medium text-slate-500">
                                        No audit logs found
                                    </div>
                                )
                            }
                        </div>

                        <div className="flex flex-col gap-3 border-t border-slate-200 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4">

                            <p className="text-xs text-slate-500 sm:text-sm">
                                Showing{' '}
                                <span className="font-semibold text-slate-700">
                                    {filteredAuditLogs.length === 0 ? 0 : auditStartIndex + 1}
                                </span>
                                {' '}to{' '}
                                <span className="font-semibold text-slate-700">
                                    {Math.min(
                                        auditStartIndex + auditLogsPerPage,
                                        filteredAuditLogs.length
                                    )}
                                </span>
                                {' '}of{' '}
                                <span className="font-semibold text-slate-700">
                                    {filteredAuditLogs.length}
                                </span>
                            </p>

                            <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end">

                                <button
                                    type="button"
                                    onClick={() => setAuditPage((page) => Math.max(page - 1, 1))}
                                    disabled={auditPage === 1}
                                    className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm"
                                >
                                    Previous
                                </button>

                                <div className="flex max-w-[45vw] items-center gap-1 overflow-x-auto">
                                    {
                                        Array.from(
                                            { length: auditTotalPages },
                                            (_, index) => index + 1
                                        ).map((page) => (
                                            <button
                                                type="button"
                                                key={page}
                                                onClick={() => setAuditPage(page)}
                                                className={`h-8 min-w-8 shrink-0 rounded-lg px-2 text-xs font-semibold transition sm:h-9 sm:min-w-9 sm:px-3 sm:text-sm ${auditPage === page
                                                        ? 'bg-indigo-600 text-white'
                                                        : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        ))
                                    }
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setAuditPage((page) => Math.min(page + 1, auditTotalPages))}
                                    disabled={auditPage === auditTotalPages || auditTotalPages === 0}
                                    className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm"
                                >
                                    Next
                                </button>

                            </div>
                        </div>

                    </div>
                </div>

                <div className="p-4">
                    <UpdateUser 
                        token={token}
                        userdata={user}
                        userID={id}
                    />
                </div>

            </div>
        </div>
    )
}

export default ViewUser