import React, { useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa6'
import API from '../../../services/api'
import { useAuth } from '../../../context/AuthContext'

const PaymentsIA = () => {
    const token = localStorage.getItem('access_token')
    const [payments, setPayments] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [paymentStatus, setPaymentStatus] = useState('ALL')
    const { auth } = useAuth()

    const paymentsPerPage = 10

    const filteredPayments = paymentStatus === 'ALL'
        ? payments
        : payments.filter((payment) => payment.payment_status === paymentStatus)

    const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage)
    const startIndex = (currentPage - 1) * paymentsPerPage
    const currentPayments = filteredPayments.slice(startIndex, startIndex + paymentsPerPage)

    useEffect(() => {
        const fetchpayments = async () => {
            const res = await API.get('/payment/institute-payment-recodes', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (res.data.success === true) {
                setPayments(res.data.result)
            }
        }

        if (token) fetchpayments()
    }, [token])

    useEffect(() => {
        setCurrentPage(1)
    }, [paymentStatus])

    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages)
        }
    }, [currentPage, totalPages])

    return (
        <div className="w-full min-w-0 bg-white p-3 sm:p-4">

            <div className="mb-5 flex min-w-0 flex-col gap-4 sm:mb-6 lg:flex-row lg:items-end lg:justify-between">

                <div className="min-w-0">
                    <div className="mb-2 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-violet-400">
                            Education SaaS
                        </p>
                    </div>

                    <h1 className="text-xl font-black tracking-tight text-violet-950">
                        Institute Payments
                    </h1>

                    <p className="mt-1 text-sm font-medium text-slate-400">
                        Manage payment records for your institution
                    </p>
                </div>

                <div className="flex w-full min-w-0 flex-col gap-2 sm:flex-row lg:w-auto lg:items-center">

                    <select
                        value={paymentStatus}
                        onChange={(e) => setPaymentStatus(e.target.value)}
                        className="h-10 w-full min-w-0 rounded-xl border-0 bg-white px-3 text-xs font-bold text-violet-700 shadow-sm ring-1 ring-violet-100 outline-none transition-all focus:ring-2 focus:ring-violet-300 sm:w-auto sm:px-4"
                    >
                        <option value="ALL">All Status</option>
                        <option value="PENDING">Pending</option>
                        <option value="ACTIVE">Active</option>
                        <option value="REJECTED">Rejected</option>
                    </select>

                    <div className="flex w-full min-w-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-50 to-cyan-50 px-4 py-2.5 sm:w-auto">
                        <span className="h-2 w-2 shrink-0 rounded-full bg-lime-400" />
                        <span className="truncate text-xs font-bold text-violet-700">
                            {filteredPayments.length} Payments
                        </span>
                    </div>

                </div>

            </div>

            <div className="w-full min-w-0 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-violet-100/70">

                <div className="hidden overflow-x-auto md:block">

                    <table className="w-full min-w-[900px]">

                        <thead>
                            <tr className="bg-gradient-to-r from-violet-50 via-white to-cyan-50">

                                <th className="px-5 py-4 text-left text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                    User
                                </th>

                                <th className="px-5 py-4 text-left text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                    Reviewed By
                                </th>

                                <th className="px-5 py-4 text-left text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                    Payment Type
                                </th>

                                <th className="px-5 py-4 text-left text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                    Status
                                </th>

                                <th className="px-5 py-4 text-left text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                    Amount
                                </th>

                                <th className="px-5 py-4 text-right text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                    Action
                                </th>

                            </tr>
                        </thead>

                        <tbody>

                            {currentPayments.length > 0 ? (

                                currentPayments.map((payment) => (

                                    <tr
                                        key={payment._id}
                                        className="group border-t border-violet-50 transition-all duration-200 hover:bg-gradient-to-r hover:from-violet-50/50 hover:via-white hover:to-cyan-50/40"
                                    >

                                        <td className="max-w-[260px] px-5 py-4">

                                            <div className="flex min-w-0 items-center gap-3">

                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-sm font-black text-violet-600 shadow-sm">
                                                    {payment.userId?.email?.charAt(0)?.toUpperCase() || 'U'}
                                                </div>

                                                <div className="min-w-0">

                                                    <p className="truncate text-[13px] font-extrabold text-violet-950">
                                                        {payment.userId?.email || '-'}
                                                    </p>

                                                    <p className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                                                        Payment User
                                                    </p>

                                                </div>

                                            </div>

                                        </td>

                                        <td className="max-w-[220px] px-5 py-4">

                                            <p className="truncate text-[13px] font-bold text-violet-950">
                                                {payment.reviewed_by?.email || '-'}
                                            </p>

                                        </td>

                                        <td className="px-5 py-4">

                                            <span className="inline-flex max-w-[180px] truncate rounded-lg bg-violet-50 px-2.5 py-1.5 text-[9px] font-black uppercase tracking-wider text-violet-600">
                                                {payment.payment_type}
                                            </span>

                                        </td>

                                        <td className="px-5 py-4">

                                            <span className={`inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[9px] font-black uppercase tracking-wider ${payment.payment_status === 'ACTIVE'
                                                ? 'bg-lime-50 text-lime-700'
                                                : payment.payment_status === 'REJECTED'
                                                    ? 'bg-red-50 text-red-600'
                                                    : 'bg-amber-50 text-amber-600'
                                                }`}>

                                                <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${payment.payment_status === 'ACTIVE'
                                                    ? 'bg-lime-500'
                                                    : payment.payment_status === 'REJECTED'
                                                        ? 'bg-red-500'
                                                        : 'bg-amber-500'
                                                    }`} />

                                                {payment.payment_status}

                                            </span>

                                        </td>

                                        <td className="whitespace-nowrap px-5 py-4">

                                            <span className="text-sm font-extrabold text-violet-950">
                                                Rs. {payment.ammout}
                                            </span>

                                        </td>

                                        <td className="px-5 py-4">

                                            <div className="flex items-center justify-end">

                                                <a
                                                    href={`/dashboard/payment/view-institute-payment/${payment._id}`}
                                                    title="View Payment"
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
                                            No payments found
                                        </p>

                                        <p className="mt-1 text-xs font-medium text-slate-400">
                                            No payment records are available for your institution
                                        </p>

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

                <div className="space-y-3 p-3 md:hidden">

                    {currentPayments.length > 0 ? (

                        currentPayments.map((payment) => (

                            <div
                                key={payment._id}
                                className="w-full min-w-0 rounded-2xl bg-gradient-to-br from-white via-violet-50/40 to-cyan-50/40 p-3.5 ring-1 ring-violet-100/70"
                            >

                                <div className="flex min-w-0 items-start gap-2.5">

                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-sm font-black text-violet-600 shadow-sm">
                                        {payment.userId?.email?.charAt(0)?.toUpperCase() || 'U'}
                                    </div>

                                    <div className="min-w-0 flex-1">

                                        <p className="break-all text-[12px] font-extrabold leading-4 text-violet-950">
                                            {payment.userId?.email || '-'}
                                        </p>

                                        <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                                            Payment User
                                        </p>

                                    </div>

                                    <a
                                        href={`/dashboard/payment/view-institute-payment/${payment._id}`}
                                        title="View Payment"
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-violet-500 shadow-sm ring-1 ring-violet-100 transition-all duration-200 hover:bg-violet-600 hover:text-white"
                                    >
                                        <FaEye className="h-3.5 w-3.5" />
                                    </a>

                                </div>

                                <div className="mt-3 grid grid-cols-1 gap-2.5 min-[400px]:grid-cols-2">

                                    <div className="min-w-0 rounded-xl bg-white px-3 py-2.5 ring-1 ring-violet-100/60">

                                        <p className="text-[9px] font-black uppercase tracking-wider text-violet-400">
                                            Payment Type
                                        </p>

                                        <p className="mt-1 break-words text-[10px] font-extrabold leading-4 text-violet-950">
                                            {payment.payment_type || '-'}
                                        </p>

                                    </div>

                                    <div className="min-w-0 rounded-xl bg-white px-3 py-2.5 ring-1 ring-violet-100/60">

                                        <p className="text-[9px] font-black uppercase tracking-wider text-violet-400">
                                            Amount
                                        </p>

                                        <p className="mt-1 text-sm font-extrabold text-violet-950">
                                            Rs. {payment.ammout}
                                        </p>

                                    </div>

                                </div>

                                <div className="mt-2.5 min-w-0 rounded-xl bg-white px-3 py-2.5 ring-1 ring-violet-100/60">

                                    <p className="text-[9px] font-black uppercase tracking-wider text-violet-400">
                                        Reviewed By
                                    </p>

                                    <p className="mt-1 break-all text-[10px] font-bold leading-4 text-violet-950">
                                        {payment.reviewed_by?.email || '-'}
                                    </p>

                                </div>

                                <div className="mt-2.5 flex min-w-0 flex-wrap items-center gap-2">

                                    <span className="max-w-full break-all rounded-lg bg-violet-50 px-2.5 py-1.5 text-[9px] font-black uppercase tracking-wider text-violet-600">
                                        {payment.payment_type}
                                    </span>

                                    <span className={`inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[9px] font-black uppercase tracking-wider ${payment.payment_status === 'ACTIVE'
                                        ? 'bg-lime-50 text-lime-700'
                                        : payment.payment_status === 'REJECTED'
                                            ? 'bg-red-50 text-red-600'
                                            : 'bg-amber-50 text-amber-600'
                                        }`}>

                                        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${payment.payment_status === 'ACTIVE'
                                            ? 'bg-lime-500'
                                            : payment.payment_status === 'REJECTED'
                                                ? 'bg-red-500'
                                                : 'bg-amber-500'
                                            }`} />

                                        {payment.payment_status}

                                    </span>

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
                                No payments found
                            </p>

                            <p className="mt-1 text-xs font-medium text-slate-400">
                                No payment records are available for your institution
                            </p>

                        </div>

                    )}

                </div>

                {filteredPayments.length > 0 && (

                    <div className="flex min-w-0 flex-col gap-3 border-t border-violet-50 bg-gradient-to-r from-white via-violet-50/30 to-cyan-50/30 px-3 py-3 sm:px-5 sm:py-4">

                        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                            <p className="text-center text-[10px] font-semibold text-slate-400 sm:text-left">
                                Showing <span className="font-black text-violet-600">{startIndex + 1}</span> to <span className="font-black text-violet-600">{Math.min(startIndex + paymentsPerPage, filteredPayments.length)}</span> of <span className="font-black text-violet-600">{filteredPayments.length}</span> payments
                            </p>

                            <div className="flex w-full min-w-0 items-center justify-center gap-1.5 sm:w-auto">

                                <button
                                    type="button"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage((page) => page - 1)}
                                    className="shrink-0 rounded-lg bg-white px-2.5 py-2 text-[9px] font-bold text-slate-400 shadow-sm ring-1 ring-violet-100 transition-all hover:bg-violet-50 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-40 sm:px-3 sm:text-[10px]"
                                >
                                    Previous
                                </button>

                                <div className="flex min-w-0 max-w-[45vw] items-center gap-1.5 overflow-x-auto px-0.5 sm:max-w-none">

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
                                    className="shrink-0 rounded-lg bg-white px-2.5 py-2 text-[9px] font-bold text-slate-400 shadow-sm ring-1 ring-violet-100 transition-all hover:bg-violet-50 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-40 sm:px-3 sm:text-[10px]"
                                >
                                    Next
                                </button>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </div>
    )
}

export default PaymentsIA