import React, { useEffect, useState } from 'react'
import API from '../../../../services/api'
import {
    FaArrowRight,
    FaClock,
    FaBell,
    FaLock,
    FaClipboardCheck,
    FaCircleInfo,
    FaCircleCheck,
    FaUser,
    FaMoneyBill,
    FaGraduationCap,
    FaBook,
    FaCalendarCheck,
    FaBullhorn,
    FaFileLines
} from 'react-icons/fa6'

const LastNotifications = () => {
    const token = localStorage.getItem('access_token')
    const [notifiactions, setNotifcations] = useState([])

    useEffect(() => {
        const fetchnotifications = async () => {
            const res = await API.get('/notifications/fetch-notifications', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (res.data.success === true) {
                const notifications = res.data.result || []

                const latestNotifications = [...notifications]
                    .sort((a, b) => new Date(b.createdAt || b.updatedAt || 0) - new Date(a.createdAt || a.updatedAt || 0))
                    .slice(0, 6)

                setNotifcations(latestNotifications)
            }
        }

        if (token) fetchnotifications()
    }, [token])

    const getTypeLabel = (type) => {
        if (!type) return 'Notification'

        return type
            .toString()
            .replace(/_/g, ' ')
            .toLowerCase()
            .replace(/\b\w/g, (letter) => letter.toUpperCase())
    }

    const getActionLabel = (action) => {
        if (!action) return 'System Activity'

        return action
            .toString()
            .replace(/_/g, ' ')
            .toLowerCase()
            .replace(/\b\w/g, (letter) => letter.toUpperCase())
    }

    const getTimeAgo = (date) => {
        if (!date) return 'Unknown'

        const createdDate = new Date(date)

        if (Number.isNaN(createdDate.getTime())) return 'Unknown'

        const difference = Date.now() - createdDate.getTime()
        const minutes = Math.floor(difference / 60000)
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)

        if (minutes < 1) return 'Just now'
        if (minutes < 60) return `${minutes}m ago`
        if (hours < 24) return `${hours}h ago`
        if (days < 7) return `${days}d ago`

        return createdDate.toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric'
        })
    }

    const getNotificationIcon = (notification) => {
        const type = notification?.type?.toString().toUpperCase() || ''
        const action = notification?.data?.action?.toString().toUpperCase() || ''
        const value = `${type} ${action}`

        if (value.includes('PASSWORD') || value.includes('SECURITY')) {
            return {
                icon: FaLock,
                bg: 'bg-blue-50',
                color: 'text-blue-600'
            }
        }

        if (value.includes('PAYMENT')) {
            return {
                icon: FaMoneyBill,
                bg: 'bg-emerald-50',
                color: 'text-emerald-600'
            }
        }

        if (value.includes('ASSIGNMENT') || value.includes('SUBMISSION')) {
            return {
                icon: FaClipboardCheck,
                bg: 'bg-orange-50',
                color: 'text-orange-600'
            }
        }

        if (value.includes('COURSE')) {
            return {
                icon: FaBook,
                bg: 'bg-cyan-50',
                color: 'text-cyan-600'
            }
        }

        if (value.includes('STUDENT')) {
            return {
                icon: FaGraduationCap,
                bg: 'bg-violet-50',
                color: 'text-violet-600'
            }
        }

        if (value.includes('ACADEMIC')) {
            return {
                icon: FaGraduationCap,
                bg: 'bg-indigo-50',
                color: 'text-indigo-600'
            }
        }

        if (value.includes('ATTENDANCE')) {
            return {
                icon: FaCalendarCheck,
                bg: 'bg-amber-50',
                color: 'text-amber-600'
            }
        }

        if (value.includes('ANNOUNCEMENT')) {
            return {
                icon: FaBullhorn,
                bg: 'bg-pink-50',
                color: 'text-pink-600'
            }
        }

        if (value.includes('CLASSES') || value.includes('CLASS')) {
            return {
                icon: FaClipboardCheck,
                bg: 'bg-violet-50',
                color: 'text-violet-600'
            }
        }

        if (value.includes('PLAN')) {
            return {
                icon: FaFileLines,
                bg: 'bg-lime-50',
                color: 'text-lime-600'
            }
        }

        if (value.includes('ACCOUNT')) {
            return {
                icon: FaUser,
                bg: 'bg-indigo-50',
                color: 'text-indigo-600'
            }
        }

        if (value.includes('SUCCESS') || value.includes('APPROVED') || value.includes('COMPLETED')) {
            return {
                icon: FaCircleCheck,
                bg: 'bg-lime-50',
                color: 'text-lime-600'
            }
        }

        if (value.includes('SYSTEM')) {
            return {
                icon: FaBell,
                bg: 'bg-slate-50',
                color: 'text-slate-500'
            }
        }

        return {
            icon: FaBell,
            bg: 'bg-slate-50',
            color: 'text-slate-500'
        }
    }

    return (
        <div className="w-full min-w-0 max-w-full overflow-hidden rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100 sm:p-4">

            <div className="mb-3 flex min-w-0 items-center justify-between gap-3 border-b border-slate-100 pb-3">

                <div className="flex min-w-0 items-center gap-2.5">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                        <FaBell className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">

                        <h2 className="truncate text-sm font-black text-slate-900">
                            Recent Notifications
                        </h2>

                        <p className="truncate text-[9px] font-medium text-slate-400">
                            Latest notifications and updates
                        </p>

                    </div>

                </div>

                <span className="shrink-0 rounded-lg bg-slate-50 px-2.5 py-1.5 text-[8px] font-black uppercase tracking-wider text-slate-500">
                    Last 6
                </span>

            </div>

            <div className="w-full min-w-0 space-y-1.5">

                {notifiactions.length > 0 ? (
                    notifiactions.map((data, index) => {

                        const notificationStyle = getNotificationIcon(data)
                        const NotificationIcon = notificationStyle.icon
                        const action = data?.data?.action

                        return (
                            <div
                                key={data._id || index}
                                className={`w-full min-w-0 rounded-lg px-2.5 py-3 transition-colors duration-150 sm:px-3 ${data.isRead ? 'hover:bg-slate-50' : 'bg-indigo-50/40 hover:bg-indigo-50/70'}`}
                            >

                                <div className="flex w-full min-w-0 items-start gap-3">

                                    <div className={`relative mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${notificationStyle.bg} ${notificationStyle.color}`}>

                                        <NotificationIcon className="h-3.5 w-3.5" />

                                        {!data.isRead && (
                                            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-white"></span>
                                        )}

                                    </div>

                                    <div className="min-w-0 flex-1">

                                        <p className="break-words text-[11px] font-black leading-5 text-slate-800">
                                            {data.title || 'Notification'}
                                        </p>

                                        <p className="mt-0.5 break-words text-[9px] font-medium leading-4 text-slate-400 sm:text-[10px]">
                                            {data.message || 'No notification message'}
                                        </p>

                                        <div className="mt-2 flex min-w-0 flex-wrap items-center gap-1.5">

                                            <div className="flex shrink-0 items-center gap-1 text-[8px] font-bold text-slate-400">
                                                <FaClock className="h-2.5 w-2.5" />
                                                <span>
                                                    {getTimeAgo(data.createdAt)}
                                                </span>
                                            </div>

                                            <span className="max-w-[150px] truncate rounded-md bg-indigo-50 px-2 py-1 text-[7px] font-black uppercase tracking-wider text-indigo-600">
                                                {getTypeLabel(data.type)}
                                            </span>

                                            {action && (
                                                <span className="max-w-[180px] truncate rounded-md bg-slate-50 px-2 py-1 text-[7px] font-bold text-slate-400">
                                                    {getActionLabel(action)}
                                                </span>
                                            )}

                                            <FaArrowRight className="ml-auto h-2.5 w-2.5 shrink-0 text-slate-300 transition-colors hover:text-indigo-500" />

                                        </div>

                                    </div>

                                </div>

                            </div>
                        )
                    })
                ) : (
                    <div className="flex min-h-[120px] w-full items-center justify-center rounded-lg bg-slate-50 px-4">

                        <div className="text-center">

                            <FaCircleInfo className="mx-auto h-5 w-5 text-slate-300" />

                            <p className="mt-2 text-[10px] font-black text-slate-500">
                                No notifications found
                            </p>

                            <p className="mt-1 text-[8px] font-medium text-slate-400">
                                New notifications will appear here.
                            </p>

                        </div>

                    </div>
                )}

            </div>

            <div className="mt-4 flex justify-center">

                <a
                    href="/dashboard/notifications"
                    className="inline-flex items-center justify-center rounded-lg px-3 py-2 text-[10px] font-bold text-blue-500 duration-300 hover:bg-blue-50 hover:underline sm:text-xs"
                >
                    View more
                </a>

            </div>

        </div>
    )
}

export default LastNotifications