import React, { useEffect, useMemo, useState } from 'react'
import { FaBell, FaSearch } from 'react-icons/fa'
import API from '../../services/api'
import Toast from '../../component/Toast/Toast'
import DefaultButton from '../../component/Buttons/DefaultButton'

const Notifications = () => {
    const [notifications, setNotifcations] = useState([])
    const [search, setSearch] = useState('')
    const [typeFilter, setTypeFilter] = useState('ALL')
    const [readFilter, setReadFilter] = useState('ALL')
    const [loading, setLoading] = useState(null)
    const [toast, setToast] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    const token = localStorage.getItem('access_token')

    const itemsPerPage = 50

    useEffect(() => {
        const fetchnotifications = async () => {
            const res = await API.get('/notifications/fetch-notifications', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (res.data.success === true) {
                const notifications = res.data.result || []

                const latestNotifications = [...notifications].sort(
                    (a, b) =>
                        new Date(b.createdAt || b.updatedAt || 0) -
                        new Date(a.createdAt || a.updatedAt || 0)
                )

                setNotifcations(latestNotifications)
            }
        }

        if (token) fetchnotifications()
    }, [token])

    const headlereadNotificaion = async (e, id) => {
        e.preventDefault()
        setLoading(id)

        try {
            const res = await API.patch(`/notifications/read-notifications/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message
                })

                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            }
        }
        catch (err) {
            setToast({
                success: false,
                message: err.response?.data?.message || 'Unable to mark notification as read'
            })
        }
        finally {
            setLoading(null)
        }
    }

    const filteredNotifications = useMemo(() => {
        return notifications.filter(notification => {
            const searchValue = search.toLowerCase()

            const matchesSearch =
                notification.title?.toLowerCase().includes(searchValue) ||
                notification.message?.toLowerCase().includes(searchValue) ||
                notification.type?.toLowerCase().includes(searchValue)

            const matchesType =
                typeFilter === 'ALL' ||
                notification.type === typeFilter

            const matchesRead =
                readFilter === 'ALL' ||
                (readFilter === 'READ' && notification.isRead) ||
                (readFilter === 'UNREAD' && !notification.isRead)

            return matchesSearch && matchesType && matchesRead
        })
    }, [notifications, search, typeFilter, readFilter])

    const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage)

    const paginatedNotifications = filteredNotifications.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    const totalNotifications = notifications.length

    const unreadNotifications = notifications.filter(
        notification => !notification.isRead
    ).length

    const readNotifications = notifications.filter(
        notification => notification.isRead
    ).length

    const notificationTypes = [
        ...new Set(notifications.map(notification => notification.type))
    ]

    const formatDate = date => {
        if (!date) return '-'

        return new Date(date).toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    useEffect(() => {
        setCurrentPage(1)
    }, [search, typeFilter, readFilter])

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">

            {toast && (
                <div className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div>

                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white">
                                <FaBell />
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Notifications
                                </h1>

                                <p className="text-sm text-gray-500">
                                    Manage your notifications
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <p className="text-sm font-medium text-gray-500">
                            Total Notifications
                        </p>

                        <p className="mt-2 text-2xl font-bold text-gray-900">
                            {totalNotifications}
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <p className="text-sm font-medium text-gray-500">
                            Unread
                        </p>

                        <p className="mt-2 text-2xl font-bold text-gray-900">
                            {unreadNotifications}
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <p className="text-sm font-medium text-gray-500">
                            Read
                        </p>

                        <p className="mt-2 text-2xl font-bold text-gray-900">
                            {readNotifications}
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <p className="text-sm font-medium text-gray-500">
                            Showing
                        </p>

                        <p className="mt-2 text-2xl font-bold text-gray-900">
                            {filteredNotifications.length}
                        </p>
                    </div>

                </div>

                <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4">

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                        <div className="relative">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                            <input
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search notifications..."
                                className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 text-sm outline-none focus:border-black"
                            />
                        </div>

                        <select
                            value={typeFilter}
                            onChange={e => setTypeFilter(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
                        >
                            <option value="ALL">All Types</option>

                            {notificationTypes.map(type => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>

                        <select
                            value={readFilter}
                            onChange={e => setReadFilter(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
                        >
                            <option value="ALL">All Notifications</option>
                            <option value="UNREAD">Unread</option>
                            <option value="READ">Read</option>
                        </select>

                    </div>

                </div>

                <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white md:block">

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-gray-200 bg-gray-50">
                                <tr>
                                    <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                                        Notification
                                    </th>

                                    <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                                        Type
                                    </th>

                                    <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                                        Status
                                    </th>

                                    <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                                        Date
                                    </th>

                                    <th className="px-5 py-4 text-right text-sm font-semibold text-gray-700">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {paginatedNotifications.map(notification => (
                                    <tr
                                        key={notification._id}
                                        className={!notification.isRead ? 'bg-gray-50' : 'bg-white'}
                                    >
                                        <td className="px-5 py-5">
                                            <div>
                                                <p className="font-semibold text-gray-900">
                                                    {notification.title}
                                                </p>

                                                <p className="mt-1 max-w-md text-sm text-gray-500">
                                                    {notification.message}
                                                </p>
                                            </div>
                                        </td>

                                        <td className="px-5 py-5">
                                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                                                {notification.type}
                                            </span>
                                        </td>

                                        <td className="px-5 py-5">
                                            {notification.isRead ? (
                                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                                    Read
                                                </span>
                                            ) : (
                                                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                                                    Unread
                                                </span>
                                            )}
                                        </td>

                                        <td className="whitespace-nowrap px-5 py-5 text-sm text-gray-500">
                                            {formatDate(notification.createdAt)}
                                        </td>

                                        <td className="px-5 py-5">
                                            {!notification.isRead && (
                                                <form onSubmit={e => headlereadNotificaion(e, notification._id)}>
                                                    <DefaultButton
                                                        type="submit"
                                                        label={loading === notification._id ? 'Marking...' : 'Mark as Read'}
                                                        disabled={loading === notification._id}
                                                        loading={loading === notification._id}
                                                    />
                                                </form>
                                            )}
                                        </td>
                                    </tr>
                                ))}

                                {paginatedNotifications.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="px-5 py-12 text-center text-sm text-gray-500"
                                        >
                                            No notifications found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>

                <div className="space-y-4 md:hidden">

                    {paginatedNotifications.map(notification => (
                        <div
                            key={notification._id}
                            className={`rounded-xl border border-gray-200 bg-white p-5 ${!notification.isRead ? 'border-l-4 border-l-black' : ''}`}
                        >
                            <div className="flex items-start justify-between gap-3">

                                <div className="min-w-0">
                                    <h3 className="font-semibold text-gray-900">
                                        {notification.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-gray-600">
                                        {notification.message}
                                    </p>
                                </div>

                                <span
                                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${notification.isRead
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-orange-100 text-orange-700'
                                        }`}
                                >
                                    {notification.isRead ? 'Read' : 'Unread'}
                                </span>

                            </div>

                            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                                <span className="rounded-full bg-gray-100 px-3 py-1 font-semibold text-gray-700">
                                    {notification.type}
                                </span>

                                <span>
                                    {formatDate(notification.createdAt)}
                                </span>
                            </div>

                            {!notification.isRead && (
                                <form
                                    onSubmit={e => headlereadNotificaion(e, notification._id)}
                                    className="mt-4 w-full"
                                >
                                    <DefaultButton
                                        type="submit"
                                        label={loading === notification._id ? 'Marking...' : 'Mark as Read'}
                                        disabled={loading === notification._id}
                                        loading={loading === notification._id}
                                    />
                                </form>
                            )}

                        </div>
                    ))}

                    {paginatedNotifications.length === 0 && (
                        <div className="rounded-xl border border-gray-200 bg-white px-5 py-12 text-center text-sm text-gray-500">
                            No notifications found
                        </div>
                    )}

                </div>

                {totalPages > 1 && (
                    <div className="mt-6 flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4">

                        <p className="text-sm text-gray-500">
                            Page {currentPage} of {totalPages}
                        </p>

                        <div className="flex items-center gap-2">

                            <button
                                type="button"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(prev => prev - 1)}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Previous
                            </button>

                            <button
                                type="button"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(prev => prev + 1)}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
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

export default Notifications