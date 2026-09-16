import React, { useEffect, useState } from 'react'
import {
    FaChalkboardUser,
    FaUserGraduate,
    FaFilePen,
    FaFileCircleCheck,
    FaArrowTrendUp,
    FaBell,
    FaBellSlash
} from 'react-icons/fa6'
import API from '../../../../services/api'

const TeacherDataCard = () => {
    const token = localStorage.getItem('access_token')

    const [classes, setClasses] = useState([])
    const [students, setStudents] = useState([])
    const [assigments, setAssigments] = useState([])
    const [subissions, setSubmissions] = useState([])
    const [notifiactions, setNotifcations] = useState([])

    useEffect(() => {
        const fetchclasses = async () => {
            const res = await API.get('/classes/fetch-teacherclasses', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (res.data.success === true) {
                setClasses(res.data.result || [])
            }
        }

        if (token) fetchclasses()
    }, [token])

    useEffect(() => {
        const fetchstudents = async () => {
            const res = await API.get('/student/my-students', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (res.data.success === true) {
                setStudents(res.data.result || [])
            }
        }

        if (token) fetchstudents()
    }, [token])

    useEffect(() => {
        const fetchsubmissions = async () => {
            const res = await API.get('/assigments/teacher-submissions', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (res.data.success === true) {
                setSubmissions(res.data.result || [])
            }
        }

        if (token) fetchsubmissions()
    }, [token])

    useEffect(() => {
        const fetchassignments = async () => {
            const res = await API.get('/assigments/fetch-my-assgnmnets', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (res.data.success === true) {
                setAssigments(res.data.result || [])
            }
        }

        if (token) fetchassignments()
    }, [token])

    useEffect(() => {
        const fetchnotifications = async () => {
            const res = await API.get('/notifications/fetch-notifications', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (res.data.success === true) {
                setNotifcations(res.data.result || [])
            }
        }

        if (token) fetchnotifications()
    }, [token])

    const readNotifications = notifiactions.filter(
        (notification) => notification.isRead === true
    ).length

    const unreadNotifications = notifiactions.filter(
        (notification) => notification.isRead === false
    ).length

    const teacher_cards = [
        {
            id: 'classes',
            name: 'My Classes',
            subtitle: 'Classes assigned to you',
            count_value: classes.length,
            icon: FaChalkboardUser,
            iconBg: 'bg-indigo-50',
            iconColor: 'text-indigo-600',
            countColor: 'text-indigo-700',
            badge: 'Classes',
            badgeBg: 'bg-indigo-50',
            badgeColor: 'text-indigo-600',
            ring: 'ring-indigo-100'
        },
        {
            id: 'students',
            name: 'My Students',
            subtitle: 'Students in your classes',
            count_value: students.length,
            icon: FaUserGraduate,
            iconBg: 'bg-orange-50',
            iconColor: 'text-orange-600',
            countColor: 'text-orange-700',
            badge: 'Students',
            badgeBg: 'bg-orange-50',
            badgeColor: 'text-orange-600',
            ring: 'ring-orange-100'
        },
        {
            id: 'assignments',
            name: 'Assignments',
            subtitle: 'Assignments created by you',
            count_value: assigments.length,
            icon: FaFilePen,
            iconBg: 'bg-lime-50',
            iconColor: 'text-lime-600',
            countColor: 'text-lime-700',
            badge: 'Assignments',
            badgeBg: 'bg-lime-50',
            badgeColor: 'text-lime-600',
            ring: 'ring-lime-100'
        },
        {
            id: 'submissions',
            name: 'Submissions',
            subtitle: 'Student assignment submissions',
            count_value: subissions.length,
            icon: FaFileCircleCheck,
            iconBg: 'bg-violet-50',
            iconColor: 'text-violet-600',
            countColor: 'text-violet-700',
            badge: 'Submissions',
            badgeBg: 'bg-violet-50',
            badgeColor: 'text-violet-600',
            ring: 'ring-violet-100'
        },
        {
            id: 'notifications',
            name: 'Notifications',
            subtitle: 'All notifications received',
            count_value: notifiactions.length,
            icon: FaBell,
            iconBg: 'bg-blue-50',
            iconColor: 'text-blue-600',
            countColor: 'text-blue-700',
            badge: 'Notifications',
            badgeBg: 'bg-blue-50',
            badgeColor: 'text-blue-600',
            ring: 'ring-blue-100'
        },
        {
            id: 'read-notifications',
            name: 'Read Notifications',
            subtitle: 'Notifications you have read',
            count_value: readNotifications,
            icon: FaBell,
            iconBg: 'bg-emerald-50',
            iconColor: 'text-emerald-600',
            countColor: 'text-emerald-700',
            badge: 'Read',
            badgeBg: 'bg-emerald-50',
            badgeColor: 'text-emerald-600',
            ring: 'ring-emerald-100'
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
                            Teacher Overview
                        </span>

                    </div>

                    <h2 className="mt-2 text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                        Teaching Overview
                    </h2>

                    <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
                        Monitor your classes, students, assignments and submissions.
                    </p>
                </div>

                <div className="flex w-fit items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200">

                    <span className="h-2 w-2 rounded-full bg-lime-500"></span>

                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-600">
                        Live Teacher Data
                    </span>

                </div>

            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                {teacher_cards.map((card) => {

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
                        Teaching Structure
                    </p>

                    <p className="mt-1 text-xs font-bold text-indigo-900">
                        {classes.length} classes · {students.length} students
                    </p>
                </div>

                <div className="rounded-xl bg-lime-50 px-4 py-3 ring-1 ring-lime-100">
                    <p className="text-[9px] font-black uppercase tracking-wider text-lime-600">
                        Assignments
                    </p>

                    <p className="mt-1 text-xs font-bold text-lime-900">
                        {assigments.length} assignments created
                    </p>
                </div>

                <div className="rounded-xl bg-orange-50 px-4 py-3 ring-1 ring-orange-100">
                    <p className="text-[9px] font-black uppercase tracking-wider text-orange-500">
                        Notifications
                    </p>

                    <p className="mt-1 text-xs font-bold text-orange-900">
                        {unreadNotifications} unread · {readNotifications} read
                    </p>
                </div>

            </div>

        </div>
    )
}

export default TeacherDataCard