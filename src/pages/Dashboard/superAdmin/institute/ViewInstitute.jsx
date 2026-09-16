import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    FaBuilding,
    FaCalendarDays,
    FaRegCircleCheck,
    FaCircleXmark,
    FaEnvelope,
    FaLocationDot,
    FaPhone,
    FaShieldHalved,
    FaUser,
    FaUsers,
    FaChalkboardUser,
    FaUserTie
} from 'react-icons/fa6'
import API from '../../../../services/api'
import UpdateInstitute from './UpdateInstitute'

const ViewInstitute = () => {
    const { id } = useParams()
    const [institute, setInstitute] = useState(null)
    const token = localStorage.getItem('access_token')

    useEffect(() => {
        const fetchinstitution = async () => {
            const res = await API.get(`/institution/fetch-by-id/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                setInstitute(res.data.result)
            }
        }

        if (token) fetchinstitution()
    }, [token, id])

    if (!institute) {
        return (
            <div className="w-full bg-white p-4 sm:p-5 lg:p-6">
                <div className="flex min-h-[400px] items-center justify-center rounded-2xl bg-gradient-to-br from-violet-50 via-white to-cyan-50 ring-1 ring-violet-100/70">
                    <div className="text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-violet-500 shadow-sm ring-1 ring-violet-100">
                            <FaBuilding className="h-6 w-6" />
                        </div>

                        <p className="mt-4 text-sm font-black text-violet-950">
                            Loading Institution
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                            Please wait while the institution details are loading.
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    const institution = institute[0]
    const institutionData = institute[1]

    return (
        <div className="w-full bg-white p-4 sm:p-5 lg:p-6">
            <div className="mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-50 via-white to-cyan-50 ring-1 ring-violet-100/70">
                <div className="p-5 sm:p-6">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex min-w-0 items-start gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-200">
                                <FaBuilding className="h-6 w-6" />
                            </div>

                            <div className="min-w-0">
                                <p className="mb-1 text-[9px] font-black uppercase tracking-[0.18em] text-violet-500">
                                    Institution Details
                                </p>

                                <h1 className="truncate text-xl font-black tracking-tight text-violet-950 sm:text-2xl">
                                    {institution?.name}
                                </h1>

                                <div className="mt-2 flex flex-wrap items-center gap-2">
                                    <span className="rounded-lg bg-white px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-violet-700 shadow-sm ring-1 ring-violet-100">
                                        {institution?.code}
                                    </span>

                                    <span
                                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wide ${institution?.active
                                                ? 'bg-lime-50 text-lime-700 ring-1 ring-lime-100'
                                                : 'bg-red-50 text-red-600 ring-1 ring-red-100'
                                            }`}
                                    >
                                        {institution?.active ? (
                                            <FaRegCircleCheck className="h-3 w-3" />
                                        ) : (
                                            <FaCircleXmark className="h-3 w-3" />
                                        )}

                                        {institution?.active ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 self-start rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-violet-100 lg:self-auto">
                            <FaShieldHalved className="h-3.5 w-3.5 text-violet-600" />

                            <span className="text-[10px] font-black uppercase tracking-wider text-violet-700">
                                Institution Profile
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-gradient-to-br from-violet-50 via-white to-violet-50 p-5 ring-1 ring-violet-100/70">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                Students
                            </p>

                            <p className="mt-2 text-2xl font-black text-violet-950">
                                {institutionData?.total_students?.length || 0}
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm ring-1 ring-violet-100">
                            <FaUsers className="h-5 w-5" />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-cyan-50 via-white to-cyan-50 p-5 ring-1 ring-cyan-100/70">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-[0.15em] text-cyan-500">
                                Teachers
                            </p>

                            <p className="mt-2 text-2xl font-black text-violet-950">
                                {institutionData?.total_teachers?.length || 0}
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-cyan-600 shadow-sm ring-1 ring-cyan-100">
                            <FaChalkboardUser className="h-5 w-5" />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-lime-50 via-white to-lime-50 p-5 ring-1 ring-lime-100/70">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-[0.15em] text-lime-600">
                                Staff
                            </p>

                            <p className="mt-2 text-2xl font-black text-violet-950">
                                {institutionData?.total_staff?.length || 0}
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-lime-600 shadow-sm ring-1 ring-lime-100">
                            <FaUserTie className="h-5 w-5" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
                <div className="space-y-5 xl:col-span-2">
                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                        <div className="border-b border-violet-50 bg-gradient-to-r from-violet-50/70 via-white to-white px-5 py-4 sm:px-6">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                                    <FaBuilding className="h-4 w-4" />
                                </div>

                                <div>
                                    <h2 className="text-sm font-black text-violet-950">
                                        Institution Information
                                    </h2>

                                    <p className="text-[11px] text-slate-400">
                                        Basic institution details
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6">
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                    Institution Name
                                </p>

                                <p className="mt-1 text-sm font-bold text-violet-950">
                                    {institution?.name || 'Not available'}
                                </p>
                            </div>

                            <div>
                                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                    Institution Code
                                </p>

                                <p className="mt-1 text-sm font-bold text-violet-950">
                                    {institution?.code || 'Not available'}
                                </p>
                            </div>

                            <div className="sm:col-span-2">
                                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                    Description
                                </p>

                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    {institution?.description || 'No description available.'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                        <div className="border-b border-cyan-50 bg-gradient-to-r from-cyan-50/70 via-white to-white px-5 py-4 sm:px-6">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600">
                                    <FaUser className="h-4 w-4" />
                                </div>

                                <div>
                                    <h2 className="text-sm font-black text-violet-950">
                                        Institution Administrator
                                    </h2>

                                    <p className="text-[11px] text-slate-400">
                                        Assigned administrator account
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-5 sm:p-6">
                            <div className="flex flex-col gap-4 rounded-xl bg-gradient-to-r from-cyan-50/60 via-white to-violet-50/50 p-4 ring-1 ring-cyan-100/70 sm:flex-row sm:items-center">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-cyan-600 shadow-sm ring-1 ring-cyan-100">
                                    <FaUser className="h-4 w-4" />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-sm font-black text-violet-950">
                                        {institution?.institution_admin?.name || 'Institution Administrator'}
                                    </p>

                                    <div className="mt-1 flex items-center gap-2">
                                        <FaEnvelope className="h-3 w-3 shrink-0 text-slate-400" />

                                        <p className="truncate text-xs text-slate-500">
                                            {institution?.institution_admin?.email || 'No email available'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                        <div className="border-b border-lime-50 bg-gradient-to-r from-lime-50/70 via-white to-white px-5 py-4 sm:px-6">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-lime-100 text-lime-700">
                                    <FaLocationDot className="h-4 w-4" />
                                </div>

                                <div>
                                    <h2 className="text-sm font-black text-violet-950">
                                        Contact & Address
                                    </h2>

                                    <p className="text-[11px] text-slate-400">
                                        Institution location and contact details
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6">
                            <div className="flex items-start gap-3">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                                    <FaLocationDot className="h-3.5 w-3.5" />
                                </div>

                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                        Address
                                    </p>

                                    <p className="mt-1 text-sm font-semibold leading-5 text-slate-600">
                                        {institution?.addressLine1 || 'No address available'}

                                        {institution?.addressLine2 && (
                                            <>
                                                <br />
                                                {institution.addressLine2}
                                            </>
                                        )}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
                                    <FaPhone className="h-3.5 w-3.5" />
                                </div>

                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                        Phone
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-600">
                                        {institution?.phone || 'No phone available'}
                                    </p>

                                    {institution?.alternatePhone && (
                                        <p className="mt-1 text-xs text-slate-400">
                                            {institution.alternatePhone}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-5">
                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                        <div className="border-b border-violet-50 bg-gradient-to-r from-violet-50/70 via-white to-cyan-50/40 px-5 py-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                                    <FaShieldHalved className="h-4 w-4" />
                                </div>

                                <div>
                                    <h2 className="text-sm font-black text-violet-950">
                                        Subscription Plan
                                    </h2>

                                    <p className="text-[11px] text-slate-400">
                                        Current institution plan
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="rounded-xl bg-gradient-to-br from-violet-600 via-violet-600 to-cyan-500 p-5 text-white shadow-lg shadow-violet-200">
                                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-violet-100">
                                    Current Plan
                                </p>

                                <h3 className="mt-2 text-xl font-black">
                                    {institution?.plan?.name || 'No Plan'}
                                </h3>

                                {institution?.plan?.subtitle && (
                                    <p className="mt-1 text-xs leading-5 text-violet-100">
                                        {institution.plan.subtitle}
                                    </p>
                                )}
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-3">
                                <div className="rounded-xl bg-violet-50 p-3 ring-1 ring-violet-100">
                                    <p className="text-[9px] font-black uppercase tracking-wider text-violet-400">
                                        Max Students
                                    </p>

                                    <p className="mt-1 text-lg font-black text-violet-950">
                                        {institution?.plan?.maxStudents ?? '—'}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-cyan-50 p-3 ring-1 ring-cyan-100">
                                    <p className="text-[9px] font-black uppercase tracking-wider text-cyan-500">
                                        Max Branches
                                    </p>

                                    <p className="mt-1 text-lg font-black text-violet-950">
                                        {institution?.plan?.maxBranches ?? '—'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                        <div className="border-b border-lime-50 bg-gradient-to-r from-lime-50/70 via-white to-white px-5 py-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-lime-100 text-lime-700">
                                    <FaCalendarDays className="h-4 w-4" />
                                </div>

                                <div>
                                    <h2 className="text-sm font-black text-violet-950">
                                        Institution Status
                                    </h2>

                                    <p className="text-[11px] text-slate-400">
                                        Account information
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 p-5">
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-xs font-semibold text-slate-500">
                                    Status
                                </span>

                                <span
                                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wide ${institution?.active
                                            ? 'bg-lime-50 text-lime-700 ring-1 ring-lime-100'
                                            : 'bg-red-50 text-red-600 ring-1 ring-red-100'
                                        }`}
                                >
                                    {institution?.active ? (
                                        <FaRegCircleCheck className="h-3 w-3" />
                                    ) : (
                                        <FaCircleXmark className="h-3 w-3" />
                                    )}

                                    {institution?.active ? 'Active' : 'Inactive'}
                                </span>
                            </div>

                            <div className="flex items-center justify-between gap-3 border-t border-slate-50 pt-4">
                                <span className="text-xs font-semibold text-slate-500">
                                    Institution Code
                                </span>

                                <span className="text-xs font-black text-violet-700">
                                    {institution?.code || '—'}
                                </span>
                            </div>

                            <div className="flex items-center justify-between gap-3 border-t border-slate-50 pt-4">
                                <span className="text-xs font-semibold text-slate-500">
                                    Created
                                </span>

                                <span className="text-xs font-semibold text-slate-600">
                                    {institution?.createdAt
                                        ? new Date(institution.createdAt).toLocaleDateString()
                                        : '—'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                        <div className="border-b border-cyan-50 bg-gradient-to-r from-cyan-50/70 via-white to-white px-5 py-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600">
                                    <FaUsers className="h-4 w-4" />
                                </div>

                                <div>
                                    <h2 className="text-sm font-black text-violet-950">
                                        Institution Capacity
                                    </h2>

                                    <p className="text-[11px] text-slate-400">
                                        Current usage against plan limits
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 p-5">
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-600">
                                        Students
                                    </span>

                                    <span className="text-[10px] font-black text-violet-600">
                                        {institutionData?.total_students?.length || 0} / {institution?.plan?.maxStudents ?? '—'}
                                    </span>
                                </div>

                                <div className="h-2 overflow-hidden rounded-full bg-violet-50">
                                    <div
                                        className="h-full rounded-full bg-violet-600"
                                        style={{
                                            width: institution?.plan?.maxStudents
                                                ? `${Math.min(
                                                    ((institutionData?.total_students?.length || 0) / institution.plan.maxStudents) * 100,
                                                    100
                                                )}%`
                                                : '0%'
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-600">
                                        Teachers
                                    </span>

                                    <span className="text-[10px] font-black text-cyan-600">
                                        {institutionData?.total_teachers?.length || 0}
                                    </span>
                                </div>

                                <div className="h-2 overflow-hidden rounded-full bg-cyan-50">
                                    <div
                                        className="h-full rounded-full bg-cyan-500"
                                        style={{
                                            width: '100%'
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-600">
                                        Staff
                                    </span>

                                    <span className="text-[10px] font-black text-lime-600">
                                        {institutionData?.total_staff?.length || 0}
                                    </span>
                                </div>

                                <div className="h-2 overflow-hidden rounded-full bg-lime-50">
                                    <div
                                        className="h-full rounded-full bg-lime-500"
                                        style={{
                                            width: '100%'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <UpdateInstitute 
                    token={token}
                    InstituteData={institute}
                    InstituteID={id}
                />
            </div>
        </div>
    )
}

export default ViewInstitute