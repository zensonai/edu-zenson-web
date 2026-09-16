import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaCheck, FaCreditCard, FaUser, FaUserCheck, FaCalendarDays } from 'react-icons/fa6'
import API from '../../services/api'
import { useAuth } from '../../context/AuthContext'

const ViewMyPayment = () => {
    const { id } = useParams()
    const token = localStorage.getItem('access_token')
    const [mypayments, setMypayments] = useState('')
    const [planpayments, setPlanpayments] = useState([])
    const { auth } = useAuth()

    useEffect(() => {
        const fetchmypayment = async () => {
            const res = await API.get(`/payment/fetch-my-payment/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                setMypayments(res.data.result[0])

                if (auth?.user?.role === "INSTITUTE_ADMIN") {
                    setPlanpayments(res.data.result.slice(1))
                }
            }
        }

        if (token) fetchmypayment()
    }, [token, id, auth?.user?.role])

    if (!mypayments) {
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
                        Payment Details
                    </h1>

                    <p className="mt-1 text-sm font-medium text-slate-400">
                        Loading payment details
                    </p>
                </div>

                <div className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-violet-100/70">
                    <div className="mx-auto h-10 w-10 animate-pulse rounded-xl bg-violet-100" />
                    <p className="mt-4 text-xs font-bold text-slate-400">
                        Loading payment...
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
                        My Payment Details
                    </h1>

                    <p className="mt-1 text-sm font-medium text-slate-400">
                        View your payment information and payment status
                    </p>
                </div>

                <div className="flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-violet-50 to-cyan-50 px-4 py-2.5">

                    <span className={`h-2 w-2 rounded-full ${mypayments.payment_status === 'ACTIVE'
                        ? 'bg-lime-400'
                        : mypayments.payment_status === 'REJECTED'
                            ? 'bg-red-400'
                            : 'bg-amber-400'
                        }`} />

                    <span className="text-xs font-bold text-violet-700">
                        {mypayments.payment_status}
                    </span>

                </div>

            </div>

            <div className="space-y-5">

                <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-violet-100/70">

                    <div className="bg-gradient-to-r from-violet-600 via-violet-600 to-cyan-500 px-5 py-6 sm:px-7">

                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                            <div className="flex min-w-0 items-center gap-4">

                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-xl font-black text-white shadow-lg ring-1 ring-white/20 backdrop-blur-sm">
                                    <FaCreditCard className="h-6 w-6" />
                                </div>

                                <div className="min-w-0">

                                    <div className="flex flex-wrap items-center gap-2">

                                        <h2 className="truncate text-xl font-black text-white">
                                            Payment
                                        </h2>

                                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white ring-1 ring-white/20">
                                            {mypayments.payment_type}
                                        </span>

                                    </div>

                                    <p className="mt-1 text-xs font-medium text-violet-100">
                                        Your payment transaction details
                                    </p>

                                </div>

                            </div>

                            <div className="flex items-center gap-2 self-start rounded-xl bg-white/10 px-3 py-2 ring-1 ring-white/20 sm:self-auto">

                                <span className={`h-2 w-2 rounded-full ${mypayments.payment_status === 'ACTIVE'
                                    ? 'bg-lime-300'
                                    : mypayments.payment_status === 'REJECTED'
                                        ? 'bg-red-300'
                                        : 'bg-amber-300'
                                    }`} />

                                <span className="text-[10px] font-black uppercase tracking-wider text-white">
                                    {mypayments.payment_status}
                                </span>

                            </div>

                        </div>

                    </div>

                    <div className="p-5 sm:p-7">

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                            <div className="rounded-xl bg-gradient-to-br from-violet-50 to-white p-4 ring-1 ring-violet-100/70">

                                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                    Payment User
                                </p>

                                <div className="mt-2 flex items-center gap-2">

                                    <FaUser className="h-3 w-3 text-violet-500" />

                                    <p className="truncate text-sm font-black text-violet-950">
                                        {mypayments.userId?.email || auth?.user?.email || '-'}
                                    </p>

                                </div>

                            </div>

                            <div className="rounded-xl bg-gradient-to-br from-cyan-50 to-white p-4 ring-1 ring-cyan-100/70">

                                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-cyan-500">
                                    Reviewed By
                                </p>

                                <div className="mt-2 flex items-center gap-2">

                                    <FaUserCheck className="h-3 w-3 text-cyan-500" />

                                    <p className="truncate text-sm font-black text-violet-950">
                                        {mypayments.reviewed_by?.email || '-'}
                                    </p>

                                </div>

                            </div>

                            <div className="rounded-xl bg-gradient-to-br from-lime-50 to-white p-4 ring-1 ring-lime-100/70">

                                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-lime-600">
                                    Amount
                                </p>

                                <p className="mt-2 text-xl font-black text-violet-950">
                                    Rs. {mypayments.ammout}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-violet-100/70">

                        <div className="flex items-center justify-between border-b border-violet-50 bg-gradient-to-r from-violet-50 via-white to-cyan-50 px-5 py-4">

                            <div className="flex items-center gap-3">

                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                                    <FaCreditCard className="h-3.5 w-3.5" />
                                </div>

                                <div>
                                    <h3 className="text-xs font-black uppercase tracking-[0.12em] text-violet-950">
                                        Payment Information
                                    </h3>

                                    <p className="mt-0.5 text-[9px] font-medium text-slate-400">
                                        Your payment transaction information
                                    </p>
                                </div>

                            </div>

                        </div>

                        <div className="p-4 sm:p-5">

                            <div className="space-y-2">

                                <div className="flex items-center justify-between rounded-xl bg-slate-50/60 px-3 py-3 ring-1 ring-violet-100/50">

                                    <p className="text-[9px] font-black uppercase tracking-wider text-violet-400">
                                        Payment Type
                                    </p>

                                    <p className="text-xs font-bold text-violet-950">
                                        {mypayments.payment_type}
                                    </p>

                                </div>

                                <div className="flex items-center justify-between rounded-xl bg-slate-50/60 px-3 py-3 ring-1 ring-violet-100/50">

                                    <p className="text-[9px] font-black uppercase tracking-wider text-violet-400">
                                        Amount
                                    </p>

                                    <p className="text-sm font-black text-violet-950">
                                        Rs. {mypayments.ammout}
                                    </p>

                                </div>

                                <div className="flex items-center justify-between rounded-xl bg-slate-50/60 px-3 py-3 ring-1 ring-violet-100/50">

                                    <p className="text-[9px] font-black uppercase tracking-wider text-violet-400">
                                        Payment Reference
                                    </p>

                                    <p className="text-xs font-bold text-violet-950">
                                        {mypayments.payment_reference || '-'}
                                    </p>

                                </div>

                                <div className="flex items-center justify-between rounded-xl bg-slate-50/60 px-3 py-3 ring-1 ring-violet-100/50">

                                    <p className="text-[9px] font-black uppercase tracking-wider text-violet-400">
                                        Status
                                    </p>

                                    <span className={`inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[9px] font-black uppercase tracking-wider ${mypayments.payment_status === 'ACTIVE'
                                        ? 'bg-lime-50 text-lime-700'
                                        : mypayments.payment_status === 'REJECTED'
                                            ? 'bg-red-50 text-red-600'
                                            : 'bg-amber-50 text-amber-600'
                                        }`}>

                                        <span className={`h-1.5 w-1.5 rounded-full ${mypayments.payment_status === 'ACTIVE'
                                            ? 'bg-lime-500'
                                            : mypayments.payment_status === 'REJECTED'
                                                ? 'bg-red-500'
                                                : 'bg-amber-500'
                                            }`} />

                                        {mypayments.payment_status}

                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-violet-100/70">

                        <div className="flex items-center justify-between border-b border-violet-50 bg-gradient-to-r from-violet-50 via-white to-cyan-50 px-5 py-4">

                            <div className="flex items-center gap-3">

                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                                    <FaUser className="h-3.5 w-3.5" />
                                </div>

                                <div>
                                    <h3 className="text-xs font-black uppercase tracking-[0.12em] text-violet-950">
                                        Users
                                    </h3>

                                    <p className="mt-0.5 text-[9px] font-medium text-slate-400">
                                        Payment user information
                                    </p>
                                </div>

                            </div>

                        </div>

                        <div className="p-4 sm:p-5">

                            <div className="space-y-3">

                                <div className="rounded-xl bg-gradient-to-br from-violet-50/70 via-white to-cyan-50/50 px-4 py-3 ring-1 ring-violet-100/60">

                                    <p className="text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                        User Email
                                    </p>

                                    <p className="mt-2 break-all text-sm font-black text-violet-950">
                                        {mypayments.userId?.email || auth?.user?.email || '-'}
                                    </p>

                                </div>

                                <div className="rounded-xl bg-gradient-to-br from-cyan-50/70 via-white to-violet-50/50 px-4 py-3 ring-1 ring-cyan-100/60">

                                    <p className="text-[9px] font-black uppercase tracking-[0.15em] text-cyan-500">
                                        Reviewer Email
                                    </p>

                                    <p className="mt-2 break-all text-sm font-black text-violet-950">
                                        {mypayments.reviewed_by?.email || '-'}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-violet-100/70">

                    <div className="flex items-center gap-3 border-b border-violet-50 bg-gradient-to-r from-violet-50 via-white to-cyan-50 px-5 py-4">

                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-lime-50 text-lime-600">
                            <FaCheck className="h-3.5 w-3.5" />
                        </div>

                        <div>
                            <h3 className="text-xs font-black uppercase tracking-[0.12em] text-violet-950">
                                Payment Status
                            </h3>

                            <p className="mt-0.5 text-[9px] font-medium text-slate-400">
                                Current payment processing status
                            </p>
                        </div>

                    </div>

                    <div className="p-4 sm:p-5">

                        <div className={`rounded-xl p-4 ring-1 ${mypayments.payment_status === 'ACTIVE'
                            ? 'bg-lime-50/60 ring-lime-100'
                            : mypayments.payment_status === 'REJECTED'
                                ? 'bg-red-50/60 ring-red-100'
                                : 'bg-amber-50/60 ring-amber-100'
                            }`}>

                            <div className="flex items-center gap-3">

                                <span className={`flex h-8 w-8 items-center justify-center rounded-xl ${mypayments.payment_status === 'ACTIVE'
                                    ? 'bg-lime-100 text-lime-600'
                                    : mypayments.payment_status === 'REJECTED'
                                        ? 'bg-red-100 text-red-600'
                                        : 'bg-amber-100 text-amber-600'
                                    }`}>

                                    <FaCheck className="h-3 w-3" />

                                </span>

                                <div>

                                    <p className="text-sm font-black text-violet-950">
                                        {mypayments.payment_status}
                                    </p>

                                    <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                                        Current payment status
                                    </p>

                                </div>

                            </div>

                            <div className="my-4">

                                <img
                                    src={`${import.meta.env.VITE_APP_API_FILES}/uploads/payments/${mypayments.payment_proof}`}
                                    alt=""
                                    className="h-40 w-40 rounded-xl object-cover ring-1 ring-violet-100"
                                />

                            </div>

                        </div>

                    </div>

                </div>

                {auth?.user?.role === "INSTITUTE_ADMIN" && planpayments.length > 0 && (

                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-violet-100/70">

                        <div className="flex items-center justify-between border-b border-violet-50 bg-gradient-to-r from-violet-50 via-white to-cyan-50 px-5 py-4">

                            <div className="flex items-center gap-3">

                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                                    <FaCreditCard className="h-3.5 w-3.5" />
                                </div>

                                <div>
                                    <h3 className="text-xs font-black uppercase tracking-[0.12em] text-violet-950">
                                        Plan Payment
                                    </h3>

                                    <p className="mt-0.5 text-[9px] font-medium text-slate-400">
                                        Your institute plan subscription information
                                    </p>
                                </div>

                            </div>

                        </div>

                        <div className="p-4 sm:p-5">

                            <div className="space-y-3">

                                {planpayments.map((planpayment) => (

                                    <div
                                        key={planpayment._id}
                                        className="rounded-xl bg-gradient-to-br from-violet-50/60 via-white to-cyan-50/40 p-4 ring-1 ring-violet-100/60"
                                    >

                                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

                                            <div className="rounded-xl bg-white px-4 py-3 ring-1 ring-violet-100/50">

                                                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                                    Plan ID
                                                </p>

                                                <p className="mt-2 break-all text-xs font-black text-violet-950">
                                                    {planpayment.planId || '-'}
                                                </p>

                                            </div>

                                            <div className="rounded-xl bg-white px-4 py-3 ring-1 ring-cyan-100/50">

                                                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-cyan-500">
                                                    Billing Cycle
                                                </p>

                                                <p className="mt-2 text-xs font-black text-violet-950">
                                                    {planpayment.billingCycle || '-'}
                                                </p>

                                            </div>

                                            <div className="rounded-xl bg-white px-4 py-3 ring-1 ring-lime-100/50">

                                                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-lime-600">
                                                    Plan Status
                                                </p>

                                                <span className="mt-2 inline-flex items-center gap-2 rounded-lg bg-lime-50 px-2.5 py-1.5 text-[9px] font-black uppercase tracking-wider text-lime-700">

                                                    <span className="h-1.5 w-1.5 rounded-full bg-lime-500" />

                                                    {planpayment.planStatus || '-'}

                                                </span>

                                            </div>

                                        </div>

                                        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">

                                            <div className="rounded-xl bg-white px-4 py-3 ring-1 ring-violet-100/50">

                                                <div className="flex items-center gap-2">

                                                    <FaCalendarDays className="h-3 w-3 text-violet-500" />

                                                    <p className="text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                                        Start Date
                                                    </p>

                                                </div>

                                                <p className="mt-2 text-xs font-black text-violet-950">
                                                    {planpayment.startDate
                                                        ? new Date(planpayment.startDate).toLocaleString()
                                                        : '-'}
                                                </p>

                                            </div>

                                            <div className="rounded-xl bg-white px-4 py-3 ring-1 ring-cyan-100/50">

                                                <div className="flex items-center gap-2">

                                                    <FaCalendarDays className="h-3 w-3 text-cyan-500" />

                                                    <p className="text-[9px] font-black uppercase tracking-[0.15em] text-cyan-500">
                                                        End Date
                                                    </p>

                                                </div>

                                                <p className="mt-2 text-xs font-black text-violet-950">
                                                    {planpayment.endDate
                                                        ? new Date(planpayment.endDate).toLocaleString()
                                                        : '-'}
                                                </p>

                                            </div>

                                        </div>

                                        <div className="mt-3 rounded-xl bg-white px-4 py-3 ring-1 ring-violet-100/50">

                                            <p className="text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                                Payment ID
                                            </p>

                                            <p className="mt-2 break-all text-xs font-black text-violet-950">
                                                {planpayment.paymentId || '-'}
                                            </p>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </div>
    )
}

export default ViewMyPayment