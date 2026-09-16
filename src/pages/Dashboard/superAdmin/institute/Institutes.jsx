import React, { useEffect, useState } from 'react'
import {
    FaBuilding,
    FaEye,
    FaLocationDot,
    FaShieldHalved,
    FaUser
} from 'react-icons/fa6'
import API from '../../../../services/api'

const Institutes = () => {
    const token = localStorage.getItem('access_token')
    const [institutes, setInstitutes] = useState([])

    useEffect(() => {
        const fetchinstitutions = async () => {
            const res = await API.get('/institution/fetch-all', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                setInstitutes(res.data.result)
            }
        }

        if (token) fetchinstitutions()
    }, [token])

    return (
        <div className="w-full bg-white p-4 sm:p-5 lg:p-6">
            <div className="mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-50 via-white to-cyan-50 ring-1 ring-violet-100/70">
                <div className="flex flex-col gap-4 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-200">
                            <FaBuilding className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="mb-1 text-[9px] font-black uppercase tracking-[0.18em] text-violet-500">
                                Institution Management
                            </p>

                            <h1 className="text-xl font-black tracking-tight text-violet-950 sm:text-2xl">
                                Institutions
                            </h1>

                            <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                                Manage registered education institutions, administrators and subscription plans.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 self-start rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-violet-100 lg:self-auto">
                        <FaBuilding className="h-3.5 w-3.5 text-violet-600" />

                        <span className="text-[10px] font-black uppercase tracking-wider text-violet-700">
                            {institutes.length} Institutions
                        </span>
                    </div>
                </div>
            </div>

            <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 sm:block">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[850px]">
                        <thead>
                            <tr className="border-b border-violet-50 bg-gradient-to-r from-violet-50/70 via-white to-cyan-50/40">
                                <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.12em] text-violet-500">
                                    Institution
                                </th>

                                <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.12em] text-violet-500">
                                    Code
                                </th>

                                <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.12em] text-violet-500">
                                    Administrator
                                </th>

                                <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.12em] text-violet-500">
                                    Plan
                                </th>

                                <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.12em] text-violet-500">
                                    Status
                                </th>

                                <th className="px-5 py-4 text-right text-[10px] font-black uppercase tracking-[0.12em] text-violet-500">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                institutes.map((data, index) => {
                                    return (
                                        <tr
                                            key={index}
                                            className="border-b border-slate-50 transition-colors duration-200 hover:bg-violet-50/30"
                                        >
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 ring-1 ring-violet-100">
                                                        <FaBuilding className="h-4 w-4" />
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="truncate text-sm font-black text-violet-950">
                                                            {data.name}
                                                        </p>

                                                        <p className="mt-0.5 text-[11px] text-slate-400">
                                                            Institution
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-600 ring-1 ring-slate-100">
                                                    {data.code}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
                                                        <FaUser className="h-3.5 w-3.5" />
                                                    </div>

                                                    <span className="max-w-[190px] truncate text-xs font-medium text-slate-600">
                                                        {data?.institution_admin?.email || 'Not assigned'}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className="inline-flex rounded-lg bg-violet-50 px-2.5 py-1.5 text-xs font-bold text-violet-700 ring-1 ring-violet-100">
                                                    {data?.plan?.name || 'No plan'}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wide ${
                                                        data.active
                                                            ? 'bg-lime-50 text-lime-700 ring-1 ring-lime-100'
                                                            : 'bg-red-50 text-red-600 ring-1 ring-red-100'
                                                    }`}
                                                >
                                                    <span
                                                        className={`h-1.5 w-1.5 rounded-full ${
                                                            data.active
                                                                ? 'bg-lime-500'
                                                                : 'bg-red-500'
                                                        }`}
                                                    />

                                                    {data.active ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="flex justify-end">
                                                    <a
                                                        href={`/dashboard/institute/view-institute/${data._id}`}
                                                        title="View Institution"
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition-all duration-200 hover:bg-violet-50 hover:text-violet-600"
                                                    >
                                                        <FaEye className="h-3.5 w-3.5" />
                                                    </a>
                                                </div>
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
                    institutes.map((data, index) => {
                        return (
                            <div
                                key={index}
                                className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100"
                            >
                                <div className="flex items-start justify-between gap-3 border-b border-violet-50 bg-gradient-to-r from-violet-50/70 via-white to-cyan-50/40 p-4">
                                    <div className="flex min-w-0 items-center gap-3">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 text-white shadow-md shadow-violet-100">
                                            <FaBuilding className="h-4 w-4" />
                                        </div>

                                        <div className="min-w-0">
                                            <h2 className="truncate text-sm font-black text-violet-950">
                                                {data.name}
                                            </h2>

                                            <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                {data.code}
                                            </p>
                                        </div>
                                    </div>

                                    <a
                                        href={`/dashboard/institute/view-institute/${data._id}`}
                                        title="View Institution"
                                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-slate-400 shadow-sm ring-1 ring-slate-100 transition-all duration-200 hover:bg-violet-50 hover:text-violet-600"
                                    >
                                        <FaEye className="h-3.5 w-3.5" />
                                    </a>
                                </div>

                                <div className="space-y-3 p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
                                            <FaUser className="h-3.5 w-3.5" />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                                Administrator
                                            </p>

                                            <p className="mt-0.5 truncate text-xs font-semibold text-slate-600">
                                                {data?.institution_admin?.email || 'Not assigned'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                                            <FaShieldHalved className="h-3.5 w-3.5" />
                                        </div>

                                        <div>
                                            <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                                Subscription Plan
                                            </p>

                                            <p className="mt-0.5 text-xs font-bold text-violet-700">
                                                {data?.plan?.name || 'No plan'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-lime-50 text-lime-600">
                                            <FaLocationDot className="h-3.5 w-3.5" />
                                        </div>

                                        <div>
                                            <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                                Status
                                            </p>

                                            <span
                                                className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${
                                                    data.active
                                                        ? 'bg-lime-50 text-lime-700 ring-1 ring-lime-100'
                                                        : 'bg-red-50 text-red-600 ring-1 ring-red-100'
                                                }`}
                                            >
                                                <span
                                                    className={`h-1.5 w-1.5 rounded-full ${
                                                        data.active
                                                            ? 'bg-lime-500'
                                                            : 'bg-red-500'
                                                    }`}
                                                />

                                                {data.active ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            {institutes.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-violet-50 via-white to-cyan-50 px-6 py-16 text-center ring-1 ring-violet-100/70">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-violet-500 shadow-sm ring-1 ring-violet-100">
                        <FaBuilding className="h-6 w-6" />
                    </div>

                    <h3 className="mt-4 text-sm font-black text-violet-950">
                        No Institutions Found
                    </h3>

                    <p className="mt-1 max-w-sm text-xs leading-5 text-slate-400">
                        There are currently no institutions available in the system.
                    </p>
                </div>
            )}
        </div>
    )
}

export default Institutes