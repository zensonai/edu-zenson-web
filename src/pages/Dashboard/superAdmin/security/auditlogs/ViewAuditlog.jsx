import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    FaArrowLeft,
    FaCalendarDays,
    FaCircleCheck,
    FaCircleXmark,
    FaClock,
    FaCode,
    FaDesktop,
    FaFingerprint,
    FaGlobe,
    FaHashtag,
    FaNetworkWired,
    FaShieldHalved,
    FaUser,
    FaUserShield
} from 'react-icons/fa6'
import API from '../../../../../services/api'

const ViewAuditlog = () => {
    const { id } = useParams()
    const token = localStorage.getItem('access_token')
    const [auditlog, setAuditlog] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchauditlog = async () => {
            setLoading(true)

            const res = await API.get(`/admin/auditlog-by-id/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            if (res.data.success === true) {
                setAuditlog(res.data.result)
            }

            setLoading(false)
        }

        if (token) fetchauditlog()
    }, [token, id])

    const formatDate = (date) => {
        if (!date) return '—'

        return new Date(date).toLocaleString()
    }

    const getResultClass = (result) => {
        if (result === 'SUCCESS') {
            return 'bg-lime-50 text-lime-700 ring-lime-100'
        }

        if (result === 'FAILED' || result === 'DENIED') {
            return 'bg-red-50 text-red-600 ring-red-100'
        }

        return 'bg-amber-50 text-amber-700 ring-amber-100'
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

    const getActionClass = (action) => {
        if (action === 'LOGIN') {
            return 'bg-violet-50 text-violet-700 ring-violet-100'
        }

        if (action === 'LOGOUT') {
            return 'bg-slate-50 text-slate-600 ring-slate-100'
        }

        if (action === 'ACCESS_GRANTED') {
            return 'bg-lime-50 text-lime-700 ring-lime-100'
        }

        if (action === 'ACCESS_DENIED') {
            return 'bg-red-50 text-red-600 ring-red-100'
        }

        return 'bg-cyan-50 text-cyan-700 ring-cyan-100'
    }

    if (loading) {
        return (
            <div className="w-full bg-white p-4 sm:p-5 lg:p-6">
                <div className="flex min-h-[420px] items-center justify-center rounded-2xl bg-gradient-to-br from-violet-50 via-white to-cyan-50 ring-1 ring-violet-100/70">
                    <div className="text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-200">
                            <FaShieldHalved className="h-5 w-5" />
                        </div>

                        <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-violet-600">
                            Loading Audit Log
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                            Fetching security activity details
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    if (!auditlog) {
        return (
            <div className="w-full bg-white p-4 sm:p-5 lg:p-6">
                <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-violet-50 via-white to-cyan-50 px-6 text-center ring-1 ring-violet-100/70">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-violet-500 shadow-sm ring-1 ring-violet-100">
                        <FaShieldHalved className="h-6 w-6" />
                    </div>

                    <h3 className="mt-4 text-sm font-black text-violet-950">
                        Audit Log Not Found
                    </h3>

                    <p className="mt-1 max-w-sm text-xs leading-5 text-slate-400">
                        The requested audit log could not be found.
                    </p>

                    <a
                        href="/dashboard/security/login-history"
                        className="mt-5 flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-[10px] font-black uppercase tracking-wide text-white shadow-sm shadow-violet-200 transition-all duration-200 hover:bg-violet-700"
                    >
                        <FaArrowLeft className="h-3 w-3" />
                        Back to Login History
                    </a>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full bg-white p-4 sm:p-5 lg:p-6">
            <div className="mb-5 flex items-center justify-between gap-3">

                <span className="hidden text-[9px] font-black uppercase tracking-[0.18em] text-slate-400 sm:block">
                    Security / Audit Log
                </span>
            </div>

            <div className="mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-50 via-white to-cyan-50 ring-1 ring-violet-100/70">
                <div className="p-5 sm:p-6">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex min-w-0 items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-200">
                                <FaShieldHalved className="h-5 w-5" />
                            </div>

                            <div className="min-w-0">
                                <p className="mb-1 text-[9px] font-black uppercase tracking-[0.18em] text-violet-500">
                                    Security Activity
                                </p>

                                <h1 className="text-xl font-black tracking-tight text-violet-950 sm:text-2xl">
                                    Audit Log Details
                                </h1>

                                <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                                    Detailed information about this recorded system activity.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-lg bg-violet-50 px-3 py-2 text-[10px] font-black uppercase tracking-wide text-violet-700 ring-1 ring-violet-100">
                                {auditlog?.action || '—'}
                            </span>

                            <span
                                className={`rounded-full px-3 py-2 text-[10px] font-black uppercase tracking-wide ring-1 ${getResultClass(auditlog?.result)}`}
                            >
                                {auditlog?.result || '—'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 lg:col-span-2">
                    <div className="border-b border-violet-50 bg-gradient-to-r from-violet-50/70 via-white to-cyan-50/40 px-5 py-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600 ring-1 ring-violet-100">
                                <FaShieldHalved className="h-3.5 w-3.5" />
                            </div>

                            <div>
                                <p className="text-xs font-black text-violet-950">
                                    Activity Information
                                </p>

                                <p className="mt-0.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                    Recorded security event
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2">
                        <div>
                            <p className="mb-1.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                Action
                            </p>

                            <span
                                className={`inline-flex rounded-lg px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wide ring-1 ${getActionClass(auditlog?.action)}`}
                            >
                                {auditlog?.action || '—'}
                            </span>
                        </div>

                        <div>
                            <p className="mb-1.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                Result
                            </p>

                            <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wide ring-1 ${getResultClass(auditlog?.result)}`}
                            >
                                {auditlog?.result === 'SUCCESS' ? (
                                    <FaCircleCheck className="h-3 w-3" />
                                ) : (
                                    <FaCircleXmark className="h-3 w-3" />
                                )}

                                {auditlog?.result || '—'}
                            </span>
                        </div>

                        <div>
                            <p className="mb-1.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                Severity
                            </p>

                            <span
                                className={`inline-flex rounded-lg px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wide ring-1 ${getSeverityClass(auditlog?.severity)}`}
                            >
                                {auditlog?.severity || '—'}
                            </span>
                        </div>

                        <div>
                            <p className="mb-1.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                Resource
                            </p>

                            <p className="text-xs font-bold text-slate-700">
                                {auditlog?.resource || '—'}
                            </p>
                        </div>

                        <div>
                            <p className="mb-1.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                Resource ID
                            </p>

                            <p className="break-all text-[11px] font-medium text-slate-500">
                                {auditlog?.resourceId || '—'}
                            </p>
                        </div>

                        <div>
                            <p className="mb-1.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                Target User ID
                            </p>

                            <p className="break-all text-[11px] font-medium text-slate-500">
                                {auditlog?.targetUserId || '—'}
                            </p>
                        </div>

                        <div className="sm:col-span-2">
                            <p className="mb-1.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                Reason
                            </p>

                            <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                                <p className="text-xs font-medium leading-5 text-slate-600">
                                    {auditlog?.reason || '—'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                    <div className="border-b border-violet-50 bg-gradient-to-r from-violet-50/70 via-white to-cyan-50/40 px-5 py-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 ring-1 ring-cyan-100">
                                <FaUser className="h-3.5 w-3.5" />
                            </div>

                            <div>
                                <p className="text-xs font-black text-violet-950">
                                    User Information
                                </p>

                                <p className="mt-0.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                    Account details
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-5 p-5">
                        <div>
                            <p className="mb-1.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                Email
                            </p>

                            <p className="break-all text-xs font-bold text-violet-950">
                                {auditlog?.userId?.email || '—'}
                            </p>
                        </div>

                        <div>
                            <p className="mb-1.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                User ID
                            </p>

                            <p className="break-all text-[11px] font-medium text-slate-500">
                                {auditlog?.userId?._id || auditlog?.userId || '—'}
                            </p>
                        </div>

                        <div>
                            <p className="mb-1.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                Audit Log ID
                            </p>

                            <p className="break-all text-[11px] font-medium text-slate-500">
                                {auditlog?._id || id}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                    <div className="border-b border-violet-50 bg-gradient-to-r from-violet-50/70 via-white to-cyan-50/40 px-5 py-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 ring-1 ring-cyan-100">
                                <FaNetworkWired className="h-3.5 w-3.5" />
                            </div>

                            <div>
                                <p className="text-xs font-black text-violet-950">
                                    Network Information
                                </p>

                                <p className="mt-0.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                    Connection details
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-5 p-5">
                        <div>
                            <p className="mb-1.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                IP Address
                            </p>

                            <div className="flex items-center gap-2">
                                <FaGlobe className="h-3 w-3 text-violet-400" />

                                <p className="text-xs font-bold text-slate-700">
                                    {auditlog?.ipAddress || '—'}
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className="mb-1.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                Device ID
                            </p>

                            <p className="break-all text-[11px] font-medium text-slate-500">
                                {auditlog?.metadata?.deviceId || '—'}
                            </p>
                        </div>

                        <div>
                            <p className="mb-1.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                User Agent
                            </p>

                            <div className="flex items-start gap-2">
                                <FaDesktop className="mt-0.5 h-3 w-3 shrink-0 text-violet-400" />

                                <p className="break-words text-[11px] font-medium leading-5 text-slate-500">
                                    {auditlog?.userAgent || '—'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                    <div className="border-b border-violet-50 bg-gradient-to-r from-violet-50/70 via-white to-cyan-50/40 px-5 py-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-lime-50 text-lime-600 ring-1 ring-lime-100">
                                <FaClock className="h-3.5 w-3.5" />
                            </div>

                            <div>
                                <p className="text-xs font-black text-violet-950">
                                    Time Information
                                </p>

                                <p className="mt-0.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                    Recorded timestamps
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-5 p-5">
                        <div>
                            <p className="mb-1.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                Created At
                            </p>

                            <div className="flex items-center gap-2">
                                <FaCalendarDays className="h-3 w-3 text-violet-400" />

                                <p className="text-xs font-semibold text-slate-600">
                                    {formatDate(auditlog?.createdAt)}
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className="mb-1.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                Updated At
                            </p>

                            <div className="flex items-center gap-2">
                                <FaClock className="h-3 w-3 text-violet-400" />

                                <p className="text-xs font-semibold text-slate-600">
                                    {formatDate(auditlog?.updatedAt)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                    <div className="border-b border-violet-50 bg-gradient-to-r from-violet-50/70 via-white to-cyan-50/40 px-5 py-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600 ring-1 ring-violet-100">
                                <FaFingerprint className="h-3.5 w-3.5" />
                            </div>

                            <div>
                                <p className="text-xs font-black text-violet-950">
                                    Session Information
                                </p>

                                <p className="mt-0.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                    Request and session data
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-5 p-5">
                        <div>
                            <p className="mb-1.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                Session ID
                            </p>

                            <p className="break-all text-[11px] font-medium text-slate-500">
                                {auditlog?.sessionId || '—'}
                            </p>
                        </div>

                        <div>
                            <p className="mb-1.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                Request ID
                            </p>

                            <p className="break-all text-[11px] font-medium text-slate-500">
                                {auditlog?.requestId || '—'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                    <div className="border-b border-violet-50 bg-gradient-to-r from-violet-50/70 via-white to-cyan-50/40 px-5 py-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 ring-1 ring-cyan-100">
                                <FaCode className="h-3.5 w-3.5" />
                            </div>

                            <div>
                                <p className="text-xs font-black text-violet-950">
                                    Request Information
                                </p>

                                <p className="mt-0.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                    HTTP request details
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-5 p-5">
                        <div>
                            <p className="mb-1.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                Endpoint
                            </p>

                            <p className="break-all text-[11px] font-medium text-slate-500">
                                {auditlog?.endpoint || '—'}
                            </p>
                        </div>

                        <div>
                            <p className="mb-1.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                HTTP Method
                            </p>

                            <span className="inline-flex rounded-lg bg-violet-50 px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wide text-violet-700 ring-1 ring-violet-100">
                                {auditlog?.httpMethod || '—'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                    <div className="border-b border-violet-50 bg-gradient-to-r from-violet-50/70 via-white to-cyan-50/40 px-5 py-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600 ring-1 ring-violet-100">
                                <FaUserShield className="h-3.5 w-3.5" />
                            </div>

                            <div>
                                <p className="text-xs font-black text-violet-950">
                                    ABAC Information
                                </p>

                                <p className="mt-0.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                    Access policy evaluation
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-5 p-5">
                        <div>
                            <p className="mb-1.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                Policy ID
                            </p>

                            <p className="break-all text-[11px] font-medium text-slate-500">
                                {auditlog?.policyId || '—'}
                            </p>
                        </div>

                        <div>
                            <p className="mb-1.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                Policy Version
                            </p>

                            <p className="text-xs font-bold text-slate-700">
                                {auditlog?.policyVersion || '—'}
                            </p>
                        </div>

                        <div>
                            <p className="mb-1.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                ABAC Decision
                            </p>

                            <p className="text-xs font-bold text-slate-700">
                                {auditlog?.abacDecision || '—'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 lg:col-span-3">
                    <div className="border-b border-violet-50 bg-gradient-to-r from-violet-50/70 via-white to-cyan-50/40 px-5 py-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 ring-1 ring-cyan-100">
                                <FaHashtag className="h-3.5 w-3.5" />
                            </div>

                            <div>
                                <p className="text-xs font-black text-violet-950">
                                    Audit Metadata
                                </p>

                                <p className="mt-0.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                    Additional audit information
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <p className="mb-1.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                Audit ID
                            </p>

                            <p className="break-all text-[11px] font-medium text-slate-500">
                                {auditlog?._id || id}
                            </p>
                        </div>

                        <div>
                            <p className="mb-1.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                Device ID
                            </p>

                            <p className="break-all text-[11px] font-medium text-slate-500">
                                {auditlog?.metadata?.deviceId || '—'}
                            </p>
                        </div>

                        <div>
                            <p className="mb-1.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                Created At
                            </p>

                            <p className="text-xs font-semibold text-slate-600">
                                {formatDate(auditlog?.createdAt)}
                            </p>
                        </div>

                        <div>
                            <p className="mb-1.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                Updated At
                            </p>

                            <p className="text-xs font-semibold text-slate-600">
                                {formatDate(auditlog?.updatedAt)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewAuditlog