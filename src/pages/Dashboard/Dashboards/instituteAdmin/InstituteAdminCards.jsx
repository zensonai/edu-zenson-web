import React, { useEffect, useState } from 'react'
import {
    FaChalkboardUser,
    FaUserGraduate,
    FaLayerGroup,
    FaWallet,
    FaArrowTrendUp
} from 'react-icons/fa6'
import API from '../../../../services/api'

const InstituteAdminCards = () => {
    const token = localStorage.getItem('access_token')
    const [teachers, setTeachers] = useState([])
    const [students, setStudents] = useState([])
    const [classes, setClasses] = useState([])
    const [payments, setPayments] = useState([])

    useEffect(() => {
        const fetchteachers = async () => {
            const res = await API.get('/teacher/institute-teachers', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                setTeachers(res.data.result || [])
            }
        }

        if (token) fetchteachers()
    }, [token])

    useEffect(() => {
        const fectchstudents = async () => {
            const res = await API.get('/student/institute-students', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                setStudents(res.data.result || [])
            }
        }

        if (token) fectchstudents()
    }, [token])

    useEffect(() => {
        const fetchclasses = async () => {
            const res = await API.get('/classes/fetch-classes', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                setClasses(res.data.result || [])
            }
        }

        if (token) fetchclasses()
    }, [token])

    useEffect(() => {
        const fetchpayments = async () => {
            const res = await API.get('/payment/institute-payment-recodes', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (res.data.success === true) {
                setPayments(res.data.result || [])
            }
        }

        if (token) fetchpayments()
    }, [token])

    const admin_cards = [
        {
            id: 'classes',
            name: 'Classes',
            subtitle: 'Registered classes',
            count_value: classes.length,
            icon: FaLayerGroup,
            iconBg: 'bg-indigo-50',
            iconColor: 'text-indigo-600',
            countColor: 'text-indigo-700',
            badge: 'Classes',
            badgeBg: 'bg-indigo-50',
            badgeColor: 'text-indigo-600',
            ring: 'ring-indigo-100',
        },
        {
            id: 'teachers',
            name: 'Teachers',
            subtitle: 'Registered teachers',
            count_value: teachers.length,
            icon: FaChalkboardUser,
            iconBg: 'bg-orange-50',
            iconColor: 'text-orange-600',
            countColor: 'text-orange-700',
            badge: 'Teachers',
            badgeBg: 'bg-orange-50',
            badgeColor: 'text-orange-600',
            ring: 'ring-orange-100',
        },
        {
            id: 'students',
            name: 'Students',
            subtitle: 'Registered students',
            count_value: students.length,
            icon: FaUserGraduate,
            iconBg: 'bg-lime-50',
            iconColor: 'text-lime-600',
            countColor: 'text-lime-700',
            badge: 'Students',
            badgeBg: 'bg-lime-50',
            badgeColor: 'text-lime-600',
            ring: 'ring-lime-100',
        },
        {
            id: 'payments',
            name: 'Payment Records',
            subtitle: 'Institute payment records',
            count_value: payments.length,
            icon: FaWallet,
            iconBg: 'bg-slate-50',
            iconColor: 'text-slate-600',
            countColor: 'text-slate-700',
            badge: 'Payments',
            badgeBg: 'bg-slate-50',
            badgeColor: 'text-slate-600',
            ring: 'ring-slate-100',
        }
    ]

    return (
        <div className="w-full">

            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

                <div>
                    <div className="flex items-center gap-2">

                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                            <FaArrowTrendUp className="h-3.5 w-3.5" />
                        </div>

                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500">
                            Institute Overview
                        </span>

                    </div>

                    <h2 className="mt-2 text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                        Administration Overview
                    </h2>

                    <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
                        Monitor your institute structure, teachers, students, classes and payments.
                    </p>
                </div>

                <div className="flex w-fit items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200">

                    <span className="h-2 w-2 rounded-full bg-lime-500"></span>

                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-600">
                        Live Institute Data
                    </span>

                </div>

            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                {admin_cards.map((card) => {

                    const Icon = card.icon

                    return (
                        <div
                            key={card.id}
                            className={`group relative overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ${card.ring} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
                        >

                            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-slate-50 opacity-60 transition-transform duration-500 group-hover:scale-150"></div>

                            <div className="relative">

                                <div className="flex items-start justify-between gap-3">

                                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${card.iconBg} ${card.iconColor} transition-transform duration-300 group-hover:scale-105`}>
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <span className={`rounded-lg px-2 py-1 text-[8px] font-black uppercase tracking-wider ${card.badgeBg} ${card.badgeColor}`}>
                                        {card.badge}
                                    </span>

                                </div>

                                <div className="mt-5">

                                    <div className="flex items-end justify-between gap-3">

                                        <div>

                                            <p className={`text-3xl font-black tracking-tight ${card.countColor}`}>
                                                {card.count_value}
                                            </p>

                                            <h3 className="mt-1 text-sm font-black text-slate-900">
                                                {card.name}
                                            </h3>

                                        </div>

                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-300 transition-colors group-hover:bg-slate-100 group-hover:text-slate-500">
                                            <FaArrowTrendUp className="h-3 w-3" />
                                        </div>

                                    </div>

                                    <p className="mt-2 min-h-[32px] text-[10px] font-semibold leading-4 text-slate-400">
                                        {card.subtitle}
                                    </p>

                                </div>

                            </div>

                        </div>
                    )
                })}

            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">

                <div className="rounded-xl bg-indigo-50 px-4 py-3 ring-1 ring-indigo-100">
                    <p className="text-[9px] font-black uppercase tracking-wider text-indigo-500">
                        Academic Structure
                    </p>

                    <p className="mt-1 text-xs font-bold text-indigo-900">
                        {classes.length} classes · {teachers.length} teachers
                    </p>
                </div>

                <div className="rounded-xl bg-lime-50 px-4 py-3 ring-1 ring-lime-100">
                    <p className="text-[9px] font-black uppercase tracking-wider text-lime-600">
                        Student Ecosystem
                    </p>

                    <p className="mt-1 text-xs font-bold text-lime-900">
                        {students.length} registered students
                    </p>
                </div>

                <div className="rounded-xl bg-orange-50 px-4 py-3 ring-1 ring-orange-100">
                    <p className="text-[9px] font-black uppercase tracking-wider text-orange-500">
                        Payment Activity
                    </p>

                    <p className="mt-1 text-xs font-bold text-orange-900">
                        {payments.length} payment records
                    </p>
                </div>

            </div>

        </div>
    )
}

export default InstituteAdminCards