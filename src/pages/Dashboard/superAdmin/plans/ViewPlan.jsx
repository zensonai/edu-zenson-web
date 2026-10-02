import React, { useEffect, useState } from 'react'
import { FaCheck, FaCrown, FaRobot } from 'react-icons/fa6'
import { useParams } from 'react-router-dom'
import API from '../../../../services/api'
import UpdatePlan from './UpdatePlan'

const ViewPlan = () => {
    const [loadError, setLoadError] = useState('')
    const { id } = useParams()
    const token = localStorage.getItem('access_token')
    const [plan, setPlan] = useState(null)

    useEffect(() => {
        const fetchplan = async () => {
            setLoadError('')
            try {
                const res = await API.get(`/plan/fetch-plan-byid/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                })

                if (res.data.success === true) {
                    setPlan(res.data.result)
                }
            } catch (err) {
                const message = err.response?.data?.message
                setLoadError(Array.isArray(message) ? message.join(' ') : message || 'Unable to load this record. Please try again.')
            }
        }

        if (token) fetchplan()
    }, [token, id])

    if (loadError) {
        return (
            <div className="w-full bg-white p-4">
                <p role="alert" className="text-sm text-slate-700">{loadError}</p>
            </div>
        )
    }

    if (!plan) {
        return (
            <div className="w-full bg-white p-4">

                <div className="mb-6">
                    <div className="mb-2 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-violet-400">
                            Education SaaS
                        </p>
                    </div>

                    <h1 className="text-xl font-black tracking-tight text-violet-950">
                        Plan Details
                    </h1>

                    <p className="mt-1 text-sm font-medium text-slate-400">
                        Loading subscription plan details
                    </p>
                </div>

                <div className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-violet-100/70">
                    <div className="mx-auto h-10 w-10 animate-pulse rounded-xl bg-violet-100" />
                    <p className="mt-4 text-xs font-bold text-slate-400">
                        Loading plan...
                    </p>
                </div>

            </div>
        )
    }

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
                        Plan Details
                    </h1>

                    <p className="mt-1 text-sm font-medium text-slate-400">
                        View subscription plan configuration and features
                    </p>
                </div>

                <div className="flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-violet-50 to-cyan-50 px-4 py-2.5">

                    <span className={`h-2 w-2 rounded-full ${plan.isActive
                        ? 'bg-lime-400'
                        : 'bg-slate-400'
                        }`} />

                    <span className="text-xs font-bold text-violet-700">
                        {plan.isActive ? 'Active Plan' : 'Inactive Plan'}
                    </span>

                </div>

            </div>

            <div className="space-y-5">

                <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-violet-100/70">

                    <div className="bg-gradient-to-r from-violet-600 via-violet-600 to-cyan-500 px-5 py-6 sm:px-7">

                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                            <div className="flex min-w-0 items-center gap-4">

                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-xl font-black text-white shadow-lg ring-1 ring-white/20 backdrop-blur-sm">
                                    {plan.name?.charAt(0)?.toUpperCase()}
                                </div>

                                <div className="min-w-0">

                                    <div className="flex flex-wrap items-center gap-2">

                                        <h2 className="truncate text-xl font-black text-white">
                                            {plan.name}
                                        </h2>

                                        {plan.isPopular && (
                                            <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white ring-1 ring-white/20">
                                                <FaCrown className="h-2.5 w-2.5" />
                                                Popular
                                            </span>
                                        )}

                                    </div>

                                    <p className="mt-1 text-xs font-medium text-violet-100">
                                        {plan.subtitle}
                                    </p>

                                </div>

                            </div>

                            <div className="flex items-center gap-2 self-start rounded-xl bg-white/10 px-3 py-2 ring-1 ring-white/20 sm:self-auto">

                                <span className={`h-2 w-2 rounded-full ${plan.isActive
                                    ? 'bg-lime-300'
                                    : 'bg-slate-300'
                                    }`} />

                                <span className="text-[10px] font-black uppercase tracking-wider text-white">
                                    {plan.isActive ? 'Active' : 'Inactive'}
                                </span>

                            </div>

                        </div>

                    </div>

                    <div className="p-5 sm:p-7">

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                            <div className="rounded-xl bg-gradient-to-br from-violet-50 to-white p-4 ring-1 ring-violet-100/70">

                                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                    Plan Type
                                </p>

                                <p className="mt-2 text-sm font-black text-violet-950">
                                    {plan.type}
                                </p>

                            </div>

                            <div className="rounded-xl bg-gradient-to-br from-cyan-50 to-white p-4 ring-1 ring-cyan-100/70">

                                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-cyan-500">
                                    Pricing Type
                                </p>

                                <p className="mt-2 text-sm font-black text-violet-950">
                                    {plan.pricingType}
                                </p>

                            </div>

                            <div className="rounded-xl bg-gradient-to-br from-lime-50 to-white p-4 ring-1 ring-lime-100/70">

                                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-lime-600">
                                    Monthly Price
                                </p>

                                <p className="mt-2 text-sm font-black text-violet-950">
                                    {plan.monthlyPrice}
                                </p>

                            </div>

                            <div className="rounded-xl bg-gradient-to-br from-violet-50 to-white p-4 ring-1 ring-violet-100/70">

                                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                    Yearly Price
                                </p>

                                <p className="mt-2 text-sm font-black text-violet-950">
                                    {plan.yearlyPrice}
                                </p>

                            </div>

                        </div>

                        <div className="mt-5 rounded-xl bg-slate-50/70 p-4 ring-1 ring-violet-100/60">

                            <p className="text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                Description
                            </p>

                            <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
                                {plan.description}
                            </p>

                        </div>

                    </div>

                </div>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-violet-100/70">

                        <div className="flex items-center justify-between border-b border-violet-50 bg-gradient-to-r from-violet-50 via-white to-cyan-50 px-5 py-4">

                            <div className="flex items-center gap-3">

                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                                    <FaCheck className="h-3.5 w-3.5" />
                                </div>

                                <div>
                                    <h3 className="text-xs font-black uppercase tracking-[0.12em] text-violet-950">
                                        Plan Features
                                    </h3>

                                    <p className="mt-0.5 text-[9px] font-medium text-slate-400">
                                        Included capabilities
                                    </p>
                                </div>

                            </div>

                            <span className="rounded-lg bg-violet-50 px-2.5 py-1.5 text-[9px] font-black text-violet-600">
                                {plan.features?.length || 0}
                            </span>

                        </div>

                        <div className="p-4 sm:p-5">

                            {plan.features?.length > 0 ? (

                                <div className="space-y-2">

                                    {plan.features.map((feature, index) => (

                                        <div
                                            key={index}
                                            className="flex items-start gap-3 rounded-xl bg-slate-50/60 px-3 py-2.5 ring-1 ring-violet-100/50"
                                        >

                                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-lime-50 text-lime-600">
                                                <FaCheck className="h-2.5 w-2.5" />
                                            </span>

                                            <p className="text-xs font-semibold leading-5 text-slate-600">
                                                {feature}
                                            </p>

                                        </div>

                                    ))}

                                </div>

                            ) : (

                                <p className="py-8 text-center text-xs font-medium text-slate-400">
                                    No features available
                                </p>

                            )}

                        </div>

                    </div>

                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-violet-100/70">

                        <div className="flex items-center justify-between border-b border-violet-50 bg-gradient-to-r from-violet-50 via-white to-cyan-50 px-5 py-4">

                            <div className="flex items-center gap-3">

                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                                    <FaCheck className="h-3.5 w-3.5" />
                                </div>

                                <div>
                                    <h3 className="text-xs font-black uppercase tracking-[0.12em] text-violet-950">
                                        Included Modules
                                    </h3>

                                    <p className="mt-0.5 text-[9px] font-medium text-slate-400">
                                        Available platform modules
                                    </p>
                                </div>

                            </div>

                            <span className="rounded-lg bg-cyan-50 px-2.5 py-1.5 text-[9px] font-black text-cyan-600">
                                {plan.includedModules?.length || 0}
                            </span>

                        </div>

                        <div className="p-4 sm:p-5">

                            {plan.includedModules?.length > 0 ? (

                                <div className="space-y-2">

                                    {plan.includedModules.map((module, index) => (

                                        <div
                                            key={index}
                                            className="flex items-start gap-3 rounded-xl bg-slate-50/60 px-3 py-2.5 ring-1 ring-cyan-100/50"
                                        >

                                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
                                                <FaCheck className="h-2.5 w-2.5" />
                                            </span>

                                            <p className="text-xs font-semibold leading-5 text-slate-600">
                                                {module}
                                            </p>

                                        </div>

                                    ))}

                                </div>

                            ) : (

                                <p className="py-8 text-center text-xs font-medium text-slate-400">
                                    No modules available
                                </p>

                            )}

                        </div>

                    </div>

                </div>

                <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-violet-100/70">

                    <div className="flex items-center justify-between border-b border-violet-50 bg-gradient-to-r from-violet-50 via-white to-cyan-50 px-5 py-4">

                        <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-lime-50 text-lime-600">
                                <FaRobot className="h-4 w-4" />
                            </div>

                            <div>
                                <h3 className="text-xs font-black uppercase tracking-[0.12em] text-violet-950">
                                    AI Features
                                </h3>

                                <p className="mt-0.5 text-[9px] font-medium text-slate-400">
                                    AI-powered education capabilities
                                </p>
                            </div>

                        </div>

                        <span className="rounded-lg bg-lime-50 px-2.5 py-1.5 text-[9px] font-black text-lime-700">
                            {plan.aiFeatures?.length || 0}
                        </span>

                    </div>

                    <div className="p-4 sm:p-5">

                        {plan.aiFeatures?.length > 0 ? (

                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">

                                {plan.aiFeatures.map((feature, index) => (

                                    <div
                                        key={index}
                                        className="flex items-start gap-3 rounded-xl bg-gradient-to-br from-lime-50/70 via-white to-violet-50/50 px-3 py-3 ring-1 ring-lime-100/60"
                                    >

                                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-lime-50 text-lime-600">
                                            <FaRobot className="h-2.5 w-2.5" />
                                        </span>

                                        <p className="text-xs font-semibold leading-5 text-slate-600">
                                            {feature}
                                        </p>

                                    </div>

                                ))}

                            </div>

                        ) : (

                            <p className="py-8 text-center text-xs font-medium text-slate-400">
                                No AI features available
                            </p>

                        )}

                    </div>

                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    <div className="rounded-2xl bg-gradient-to-r from-violet-50 via-white to-cyan-50 p-5 ring-1 ring-violet-100/70">

                        <p className="text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                            Student Limit
                        </p>

                        <p className="mt-2 text-2xl font-black text-violet-950">
                            {plan.maxStudents}
                        </p>

                        <p className="mt-1 text-[10px] font-medium text-slate-400">
                            Maximum active students
                        </p>

                    </div>

                    <div className="rounded-2xl bg-gradient-to-r from-cyan-50 via-white to-violet-50 p-5 ring-1 ring-cyan-100/70">

                        <p className="text-[9px] font-black uppercase tracking-[0.15em] text-cyan-500">
                            Branch Limit
                        </p>

                        <p className="mt-2 text-2xl font-black text-violet-950">
                            {plan.maxBranches}
                        </p>

                        <p className="mt-1 text-[10px] font-medium text-slate-400">
                            Maximum branches or campuses
                        </p>

                    </div>

                </div>

                <div className="">
                    <UpdatePlan 
                        token={token}
                        plan={plan}
                        planID={id}
                    />
                </div>

            </div>

        </div>
    )
}

export default ViewPlan