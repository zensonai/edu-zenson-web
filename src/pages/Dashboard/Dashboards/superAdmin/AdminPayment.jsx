import React, { useEffect, useMemo, useState } from 'react'
import API from '../../../../services/api'
import {
    FaMoneyBillWave,
    FaClock,
    FaCircleCheck,
    FaCircleXmark,
    FaWallet,
    FaCalendarDays,
    FaArrowRight,
    FaReceipt
} from 'react-icons/fa6'
import { useAuth } from '../../../../context/AuthContext'

const AdminPayment = () => {
    const token = localStorage.getItem('access_token')
    const { auth } = useAuth()
    const [payments, setPayments] = useState([])

    useEffect(() => {
        const fetchpayments = async () => {
            const paymentEndpoint =
                auth?.user?.role === 'INSTITUTE_ADMIN'
                    ? '/payment/institute-payment-recodes'
                    : '/payment/fetch-all-payments'

            const res = await API.get(paymentEndpoint, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })

            if (res.data.success === true) {
                setPayments(res.data.result || [])
            }
        }

        if (token && auth?.user?.role) fetchpayments()
    }, [token, auth?.user?.role])

    const paymentSummary = useMemo(() => {
        const totalPayments = payments.length

        const pendingPayments = payments.filter((payment) => {
            return payment.payment_status?.toUpperCase() === 'PENDING'
        }).length

        const approvedPayments = payments.filter((payment) => {
            return payment.payment_status?.toUpperCase() === 'ACTIVE'
        }).length

        const rejectedPayments = payments.filter((payment) => {
            return payment.payment_status?.toUpperCase() === 'REJECTED'
        }).length

        const totalIncome = payments
            .filter((payment) => {
                return payment.payment_status?.toUpperCase() === 'ACTIVE'
            })
            .reduce((total, payment) => {
                return total + Number(payment.ammout || 0)
            }, 0)

        const currentMonth = new Date().getMonth()
        const currentYear = new Date().getFullYear()

        const totalIncomeThisMonth = payments
            .filter((payment) => {
                const paymentDate = new Date(
                    payment.createdAt || payment.updatedAt
                )

                return (
                    payment.payment_status?.toUpperCase() === 'ACTIVE' &&
                    paymentDate.getMonth() === currentMonth &&
                    paymentDate.getFullYear() === currentYear
                )
            })
            .reduce((total, payment) => {
                return total + Number(payment.ammout || 0)
            }, 0)

        return {
            totalPayments,
            pendingPayments,
            approvedPayments,
            rejectedPayments,
            totalIncome,
            totalIncomeThisMonth
        }
    }, [payments])

    const latestPayments = useMemo(() => {
        return [...payments]
            .sort((a, b) => {
                return new Date(
                    b.createdAt || b.updatedAt || 0
                ) - new Date(
                    a.createdAt || a.updatedAt || 0
                )
            })
            .slice(0, 5)
    }, [payments])

    const currentDate = new Date()

    const currentMonthName = currentDate.toLocaleString('en-US', {
        month: 'long'
    })

    const currentYear = currentDate.getFullYear()

    const payment_cards = [
        {
            id: 1,
            name: 'Total Payments',
            subtitle: 'All transactions',
            icon: FaMoneyBillWave,
            count_values: paymentSummary.totalPayments,
            icon_bg: 'bg-indigo-50',
            icon_color: 'text-indigo-600',
            value_color: 'text-indigo-600'
        },
        {
            id: 2,
            name: 'Pending Payments',
            subtitle: 'Awaiting review',
            icon: FaClock,
            count_values: paymentSummary.pendingPayments,
            icon_bg: 'bg-orange-50',
            icon_color: 'text-orange-600',
            value_color: 'text-orange-600'
        },
        {
            id: 3,
            name: 'Approved Payments',
            subtitle: 'Active records',
            icon: FaCircleCheck,
            count_values: paymentSummary.approvedPayments,
            icon_bg: 'bg-lime-50',
            icon_color: 'text-lime-600',
            value_color: 'text-lime-600'
        },
        {
            id: 4,
            name: 'Rejected Payments',
            subtitle: 'Rejected records',
            icon: FaCircleXmark,
            count_values: paymentSummary.rejectedPayments,
            icon_bg: 'bg-red-50',
            icon_color: 'text-red-600',
            value_color: 'text-red-600'
        },
        {
            id: 5,
            name: 'Total Income',
            subtitle: 'Active payments',
            icon: FaWallet,
            count_values: paymentSummary.totalIncome,
            icon_bg: 'bg-indigo-50',
            icon_color: 'text-indigo-600',
            value_color: 'text-indigo-600',
            currency: true
        },
        {
            id: 6,
            name: 'Monthly Income',
            subtitle: `${currentMonthName} ${currentYear}`,
            icon: FaCalendarDays,
            count_values: paymentSummary.totalIncomeThisMonth,
            icon_bg: 'bg-orange-50',
            icon_color: 'text-orange-600',
            value_color: 'text-orange-600',
            currency: true
        }
    ]

    const getPaymentType = (type) => {
        if (!type) {
            return 'Payment'
        }

        return type
            .replace(/_/g, ' ')
            .toLowerCase()
            .replace(/\b\w/g, (letter) => letter.toUpperCase())
    }

    const getPaymentStatus = (status) => {
        if (!status) {
            return 'Unknown'
        }

        return status
            .replace(/_/g, ' ')
            .toLowerCase()
            .replace(/\b\w/g, (letter) => letter.toUpperCase())
    }

    const getStatusStyle = (status) => {
        const currentStatus = status?.toUpperCase()

        if (currentStatus === 'ACTIVE') {
            return {
                bg: 'bg-lime-50',
                text: 'text-lime-700',
                dot: 'bg-lime-500'
            }
        }

        if (currentStatus === 'PENDING') {
            return {
                bg: 'bg-orange-50',
                text: 'text-orange-700',
                dot: 'bg-orange-500'
            }
        }

        if (currentStatus === 'REJECTED') {
            return {
                bg: 'bg-red-50',
                text: 'text-red-700',
                dot: 'bg-red-500'
            }
        }

        return {
            bg: 'bg-slate-50',
            text: 'text-slate-600',
            dot: 'bg-slate-400'
        }
    }

    const formatDate = (date) => {
        if (!date) {
            return '-'
        }

        return new Date(date).toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })
    }

    return (
        <div className="w-full">

            <div className="mb-4 flex items-end justify-between gap-4">

                <div>
                    <div className="flex items-center gap-2">

                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>

                        <p className="text-[8px] font-black uppercase tracking-[0.18em] text-indigo-500">
                            Payment Analytics
                        </p>

                    </div>

                    <h2 className="mt-1 text-base font-black tracking-tight text-slate-900">
                        Payment Overview
                    </h2>

                    <p className="mt-0.5 text-[9px] font-medium text-slate-400">
                        Overview of payment activity and income
                    </p>
                </div>

                <a
                    href={`/dashboard/${auth?.user?.role === "SUPER_ADMIN" ? 'payments' : 'manage-institute-payments' }`}
                    className="group flex shrink-0 items-center gap-2 rounded-lg border border-slate-100 bg-white px-3 py-2 text-[8px] font-black uppercase tracking-wider text-slate-500 shadow-sm transition-all duration-200 hover:border-indigo-100 hover:bg-indigo-50 hover:text-indigo-600"
                >
                    <span>
                        View More Payments
                    </span>

                    <FaArrowRight className="h-2 w-2 transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>

            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">

                {payment_cards.map((card) => {
                    const Icon = card.icon

                    return (
                        <div
                            key={card.id}
                            className="group rounded-xl border border-slate-100 bg-white px-3 py-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:shadow-md"
                        >

                            <div className="flex items-center gap-3">

                                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${card.icon_bg} ${card.icon_color} transition-transform duration-200 group-hover:scale-105`}>
                                    <Icon className="h-4 w-4" />
                                </div>

                                <div className="min-w-0 flex-1">

                                    <div className="flex items-center justify-between gap-2">

                                        <p className="truncate text-[8px] font-black uppercase tracking-[0.1em] text-slate-400">
                                            {card.name}
                                        </p>

                                        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${card.icon_color.replace('text-', 'bg-')}`}></span>

                                    </div>

                                    <p className={`mt-1 text-lg font-black leading-none tracking-tight ${card.value_color}`}>
                                        {card.currency
                                            ? `LKR ${Number(card.count_values || 0).toLocaleString()}`
                                            : Number(card.count_values || 0).toLocaleString()
                                        }
                                    </p>

                                    <p className="mt-1 truncate text-[8px] font-medium text-slate-400">
                                        {card.subtitle}
                                    </p>

                                </div>

                                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-50 text-slate-300 transition-all duration-200 group-hover:bg-indigo-50 group-hover:text-indigo-500">
                                    <FaArrowRight className="h-2 w-2" />
                                </div>

                            </div>

                            <div className="mt-2 h-0.5 overflow-hidden rounded-full bg-slate-100">
                                <div
                                    className={`h-full w-2/3 rounded-full ${card.icon_color.replace('text-', 'bg-')} transition-all duration-300 group-hover:w-full`}
                                ></div>
                            </div>

                        </div>
                    )
                })}

            </div>

            <div className="mt-5 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">

                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">

                    <div className="flex items-center gap-2.5">

                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                            <FaReceipt className="h-3.5 w-3.5" />
                        </div>

                        <div>

                            <p className="text-[8px] font-black uppercase tracking-[0.15em] text-indigo-500">
                                Recent Activity
                            </p>

                            <h3 className="mt-0.5 text-xs font-black text-slate-900">
                                Last 5 Payment Records
                            </h3>

                        </div>

                    </div>

                    <div className="flex items-center gap-2">

                        <span className="hidden text-[8px] font-medium text-slate-400 sm:block">
                            Latest transactions
                        </span>

                        <div className="rounded-md bg-slate-50 px-2.5 py-1">
                            <span className="text-[7px] font-black uppercase tracking-wider text-slate-500">
                                {latestPayments.length} Records
                            </span>
                        </div>

                    </div>

                </div>

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[850px]">

                        <thead>

                            <tr className="border-b border-slate-100 bg-slate-50/60">

                                <th className="px-4 py-2.5 text-left text-[7px] font-black uppercase tracking-[0.12em] text-slate-400">
                                    Payment
                                </th>

                                <th className="px-4 py-2.5 text-left text-[7px] font-black uppercase tracking-[0.12em] text-slate-400">
                                    Type
                                </th>

                                <th className="px-4 py-2.5 text-left text-[7px] font-black uppercase tracking-[0.12em] text-slate-400">
                                    Description
                                </th>

                                <th className="px-4 py-2.5 text-right text-[7px] font-black uppercase tracking-[0.12em] text-slate-400">
                                    Amount
                                </th>

                                <th className="px-4 py-2.5 text-center text-[7px] font-black uppercase tracking-[0.12em] text-slate-400">
                                    Status
                                </th>

                                <th className="px-4 py-2.5 text-right text-[7px] font-black uppercase tracking-[0.12em] text-slate-400">
                                    Date
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {latestPayments.length > 0 ? (
                                latestPayments.map((payment, index) => {

                                    const statusStyle = getStatusStyle(
                                        payment.payment_status
                                    )

                                    return (
                                        <tr
                                            key={payment._id || index}
                                            className="border-b border-slate-50 transition-colors duration-150 hover:bg-slate-50/70"
                                        >

                                            <td className="px-4 py-3">

                                                <div className="flex items-center gap-2.5">

                                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                                        <FaMoneyBillWave className="h-2.5 w-2.5" />
                                                    </div>

                                                    <div className="min-w-0">

                                                        <p className="text-[8px] font-black text-slate-700">
                                                            {payment.payment_reference || 'No Reference'}
                                                        </p>

                                                        <p className="mt-0.5 text-[7px] text-slate-400">
                                                            #{payment._id?.toString().slice(-8)}
                                                        </p>

                                                    </div>

                                                </div>

                                            </td>

                                            <td className="px-4 py-3">

                                                <p className="text-[8px] font-bold text-slate-600">
                                                    {getPaymentType(payment.payment_type)}
                                                </p>

                                            </td>

                                            <td className="max-w-[220px] px-4 py-3">

                                                <p className="truncate text-[8px] font-medium text-slate-500">
                                                    {payment.descpition || 'No description'}
                                                </p>

                                            </td>

                                            <td className="px-4 py-3 text-right">

                                                <p className="text-[9px] font-black text-slate-800">
                                                    LKR {Number(payment.ammout || 0).toLocaleString()}
                                                </p>

                                            </td>

                                            <td className="px-4 py-3 text-center">

                                                <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 ${statusStyle.bg} ${statusStyle.text}`}>

                                                    <span className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}></span>

                                                    <span className="text-[7px] font-black uppercase tracking-wider">
                                                        {getPaymentStatus(payment.payment_status)}
                                                    </span>

                                                </span>

                                            </td>

                                            <td className="px-4 py-3 text-right">

                                                <p className="text-[8px] font-bold text-slate-500">
                                                    {formatDate(
                                                        payment.createdAt ||
                                                        payment.updatedAt
                                                    )}
                                                </p>

                                            </td>

                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>

                                    <td
                                        colSpan="6"
                                        className="px-4 py-10 text-center"
                                    >

                                        <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-slate-300">
                                            <FaReceipt className="h-4 w-4" />
                                        </div>

                                        <p className="mt-2 text-[10px] font-black text-slate-600">
                                            No payment records found
                                        </p>

                                        <p className="mt-1 text-[8px] font-medium text-slate-400">
                                            Recent payment records will appear here.
                                        </p>

                                    </td>

                                </tr>
                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    )
}

export default AdminPayment