import React, { useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa6'
import API from '../../../../services/api'

const Plans = () => {
    const token = localStorage.getItem('access_token')
    const [plans, setPlans] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    const plansPerPage = 10
    const totalPages = Math.ceil(plans.length / plansPerPage)
    const startIndex = (currentPage - 1) * plansPerPage
    const currentPlans = plans.slice(startIndex, startIndex + plansPerPage)

    useEffect(() => {
        const fetchplans = async () => {
            const res = await API.get('/plan/fetch-plans', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })

            if (res.data.success === true) {
                setPlans(res.data.result)
            }
        }

        if (token) fetchplans()
    }, [token])

    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages)
        }
    }, [currentPage, totalPages])

    return (
        <div className="w-full bg-white p-4">

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                <div>
                    <div className="mb-2 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-violet-400">
                            Education SaaS
                        </p>
                    </div>

                    <h1 className="text-xl font-black tracking-tight text-violet-950">
                        Subscription Plans
                    </h1>

                    <p className="mt-1 text-sm font-medium text-slate-400">
                        Manage education platform plans and pricing
                    </p>
                </div>

                <div className="flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-violet-50 to-cyan-50 px-4 py-2.5">
                    <span className="h-2 w-2 rounded-full bg-lime-400" />
                    <span className="text-xs font-bold text-violet-700">
                        {plans.length} Plans
                    </span>
                </div>

            </div>

            <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-violet-100/70">

                <div className="hidden overflow-x-auto sm:block">

                    <table className="w-full min-w-[820px]">

                        <thead>
                            <tr className="bg-gradient-to-r from-violet-50 via-white to-cyan-50">

                                <th className="px-5 py-4 text-left text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                    Plan
                                </th>

                                <th className="px-5 py-4 text-left text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                    Monthly
                                </th>

                                <th className="px-5 py-4 text-left text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                    Yearly
                                </th>

                                <th className="px-5 py-4 text-left text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                    Status
                                </th>

                                <th className="px-5 py-4 text-left text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                    Popular
                                </th>

                                <th className="px-5 py-4 text-right text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                    Action
                                </th>

                            </tr>
                        </thead>

                        <tbody>

                            {currentPlans.length > 0 ? (

                                currentPlans.map((plan) => (

                                    <tr
                                        key={plan._id}
                                        className="group border-t border-violet-50 transition-all duration-200 hover:bg-gradient-to-r hover:from-violet-50/50 hover:via-white hover:to-cyan-50/40"
                                    >

                                        <td className="px-5 py-4">

                                            <div className="flex items-center gap-3">

                                                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-black shadow-sm ${plan.isPopular
                                                    ? 'bg-gradient-to-br from-violet-600 to-cyan-500 text-white shadow-violet-200'
                                                    : 'bg-violet-50 text-violet-600'
                                                    }`}>
                                                    {plan.name?.charAt(0)?.toUpperCase()}
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="truncate text-[13px] font-extrabold text-violet-950">
                                                        {plan.name}
                                                    </p>

                                                    <p className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                                                        Education Plan
                                                    </p>
                                                </div>

                                            </div>

                                        </td>

                                        <td className="px-5 py-4">
                                            <span className="text-sm font-extrabold text-violet-950">
                                                {plan.monthlyPrice}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className="text-sm font-extrabold text-violet-950">
                                                {plan.yearlyPrice}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">

                                            <span className={`inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[9px] font-black uppercase tracking-wider ${plan.isActive
                                                ? 'bg-lime-50 text-lime-700'
                                                : 'bg-slate-100 text-slate-500'
                                                }`}>

                                                <span className={`h-1.5 w-1.5 rounded-full ${plan.isActive
                                                    ? 'bg-lime-500'
                                                    : 'bg-slate-400'
                                                    }`} />

                                                {plan.isActive ? 'Active' : 'Inactive'}

                                            </span>

                                        </td>

                                        <td className="px-5 py-4">

                                            {plan.isPopular ? (

                                                <span className="inline-flex items-center gap-1.5 rounded-lg bg-violet-50 px-2.5 py-1.5 text-[9px] font-black uppercase tracking-wider text-violet-600">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                                                    Popular
                                                </span>

                                            ) : (

                                                <span className="text-[10px] font-semibold text-slate-300">
                                                    Standard
                                                </span>

                                            )}

                                        </td>

                                        <td className="px-5 py-4">

                                            <div className="flex items-center justify-end">

                                                <a
                                                    href={`/dashboard/plan/view-plan/${plan._id}`}
                                                    title="View Plan"
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

                                    <td colSpan="6" className="px-5 py-16 text-center">

                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-400">
                                            <span className="text-lg font-black">
                                                Z
                                            </span>
                                        </div>

                                        <p className="mt-3 text-sm font-bold text-violet-900">
                                            No plans found
                                        </p>

                                        <p className="mt-1 text-xs font-medium text-slate-400">
                                            No subscription plans are available
                                        </p>

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

                <div className="space-y-3 p-3 sm:hidden">

                    {currentPlans.length > 0 ? (

                        currentPlans.map((plan) => (

                            <div
                                key={plan._id}
                                className="rounded-2xl bg-gradient-to-br from-white via-violet-50/40 to-cyan-50/40 p-4 ring-1 ring-violet-100/70"
                            >

                                <div className="flex items-start justify-between gap-3">

                                    <div className="flex min-w-0 items-center gap-3">

                                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-black shadow-sm ${plan.isPopular
                                            ? 'bg-gradient-to-br from-violet-600 to-cyan-500 text-white shadow-violet-200'
                                            : 'bg-violet-50 text-violet-600'
                                            }`}>
                                            {plan.name?.charAt(0)?.toUpperCase()}
                                        </div>

                                        <div className="min-w-0">
                                            <p className="truncate text-[13px] font-extrabold text-violet-950">
                                                {plan.name}
                                            </p>

                                            <p className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                                                Education Plan
                                            </p>
                                        </div>

                                    </div>

                                    <a
                                        href={`/dashboard/plan/view-plan/${plan._id}`}
                                        title="View Plan"
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-violet-500 shadow-sm ring-1 ring-violet-100 transition-all duration-200 hover:bg-violet-600 hover:text-white"
                                    >
                                        <FaEye className="h-3.5 w-3.5" />
                                    </a>

                                </div>

                                <div className="mt-4 grid grid-cols-2 gap-3">

                                    <div className="rounded-xl bg-white px-3 py-2.5 ring-1 ring-violet-100/60">
                                        <p className="text-[9px] font-black uppercase tracking-wider text-violet-400">
                                            Monthly
                                        </p>
                                        <p className="mt-1 text-sm font-extrabold text-violet-950">
                                            {plan.monthlyPrice}
                                        </p>
                                    </div>

                                    <div className="rounded-xl bg-white px-3 py-2.5 ring-1 ring-violet-100/60">
                                        <p className="text-[9px] font-black uppercase tracking-wider text-violet-400">
                                            Yearly
                                        </p>
                                        <p className="mt-1 text-sm font-extrabold text-violet-950">
                                            {plan.yearlyPrice}
                                        </p>
                                    </div>

                                </div>

                                <div className="mt-3 flex flex-wrap items-center gap-2">

                                    <span className={`inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[9px] font-black uppercase tracking-wider ${plan.isActive
                                        ? 'bg-lime-50 text-lime-700'
                                        : 'bg-slate-100 text-slate-500'
                                        }`}>

                                        <span className={`h-1.5 w-1.5 rounded-full ${plan.isActive
                                            ? 'bg-lime-500'
                                            : 'bg-slate-400'
                                            }`} />

                                        {plan.isActive ? 'Active' : 'Inactive'}

                                    </span>

                                    {plan.isPopular && (

                                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-violet-50 px-2.5 py-1.5 text-[9px] font-black uppercase tracking-wider text-violet-600">
                                            <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                                            Popular
                                        </span>

                                    )}

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
                                No plans found
                            </p>

                            <p className="mt-1 text-xs font-medium text-slate-400">
                                No subscription plans are available
                            </p>

                        </div>

                    )}

                </div>

                {plans.length > 0 && (

                    <div className="flex flex-col gap-4 border-t border-violet-50 bg-gradient-to-r from-white via-violet-50/30 to-cyan-50/30 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">

                        <p className="text-center text-[10px] font-semibold text-slate-400 sm:text-left">
                            Showing <span className="font-black text-violet-600">{startIndex + 1}</span> to <span className="font-black text-violet-600">{Math.min(startIndex + plansPerPage, plans.length)}</span> of <span className="font-black text-violet-600">{plans.length}</span> plans
                        </p>

                        <div className="flex w-full items-center justify-center gap-1.5 sm:w-auto">

                            <button
                                type="button"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((page) => page - 1)}
                                className="rounded-lg bg-white px-3 py-2 text-[10px] font-bold text-slate-400 shadow-sm ring-1 ring-violet-100 transition-all hover:bg-violet-50 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Previous
                            </button>

                            <div className="flex items-center gap-1.5 overflow-x-auto">

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
                                className="rounded-lg bg-white px-3 py-2 text-[10px] font-bold text-slate-400 shadow-sm ring-1 ring-violet-100 transition-all hover:bg-violet-50 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-40"
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

export default Plans