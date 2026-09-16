import React, { useEffect, useState } from 'react'
import useForm from '../../../../hooks/useForm';
import API from '../../../../services/api';

const Users = () => {
    const token = localStorage.getItem('access_token')
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('ALL')
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const fetchusers = async () => {
            const res = await API.get('/admin/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.data.success === true) {
                setUsers(res.data.result)
            }
        }
        if (token) fetchusers()
    }, [token])

    const filteredUsers = users.filter((data) => {
        const searchValue = search.toLowerCase()

        const matchesSearch =
            data.email?.toLowerCase().includes(searchValue) ||
            data.accountStatus?.toLowerCase().includes(searchValue) ||
            data.authProvider?.toLowerCase().includes(searchValue)

        const roleName = data.roleId?.name || data.Role?.name || ''

        const matchesFilter =
            filter === 'ALL' ||
            data.accountStatus === filter ||
            roleName === filter

        return matchesSearch && matchesFilter
    })

    const usersPerPage = 15
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage)
    const startIndex = (currentPage - 1) * usersPerPage
    const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage)

    useEffect(() => {
        setCurrentPage(1)
    }, [search, filter])

    return (
        <div className="min-h-full w-full bg-white">
            <div className="w-full">

                <div className="p-4">
                    <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                        Users
                    </h1>
                    <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                        Manage and view system users
                    </p>
                </div>

                <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white sm:rounded-2xl">

                    <div className="flex flex-col gap-3 border-b border-slate-200 p-3 sm:gap-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">

                        <div className="w-full lg:max-w-md">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search users..."
                                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 sm:rounded-xl sm:px-4"
                            />
                        </div>

                        <div className="w-full lg:w-auto">
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:rounded-xl sm:px-4 lg:w-48"
                            >
                                <option value="ALL">All Users</option>
                                <option value="ACTIVE">Active</option>
                                <option value="INACTIVE">Inactive</option>
                                <option value="SUSPENDED">Suspended</option>
                                <option value="SUPER_ADMIN">Super Admin</option>
                            </select>
                        </div>
                    </div>

                    <div className="hidden overflow-x-auto md:block">
                        <table className="w-full min-w-[800px]">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50">
                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        #
                                    </th>
                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Email
                                    </th>
                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Role
                                    </th>
                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Status
                                    </th>
                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Auth Provider
                                    </th>
                                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {
                                    currentUsers.length > 0 ? (
                                        currentUsers.map((data, index) => {
                                            const roleName = data.roleId?.name || data.Role?.name || '—'

                                            return (
                                                <tr
                                                    className="transition hover:bg-slate-50"
                                                    key={index}
                                                >
                                                    <td className="px-5 py-4 text-sm font-medium text-slate-500">
                                                        {startIndex + index + 1}
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-sm font-semibold text-indigo-600">
                                                                {data.email?.charAt(0)?.toUpperCase()}
                                                            </div>

                                                            <p className="truncate text-sm font-semibold text-slate-800">
                                                                {data.email}
                                                            </p>
                                                        </div>
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <span className="inline-flex rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">
                                                            {roleName}
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <span
                                                            className={`inline-flex rounded-lg px-3 py-1.5 text-xs font-semibold ${data.accountStatus === 'ACTIVE'
                                                                    ? 'bg-lime-50 text-lime-700'
                                                                    : data.accountStatus === 'SUSPENDED'
                                                                        ? 'bg-red-50 text-red-700'
                                                                        : 'bg-slate-100 text-slate-600'
                                                                }`}
                                                        >
                                                            {data.accountStatus}
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-4 text-sm font-medium text-slate-600">
                                                        {data.authProvider || 'LOCAL'}
                                                    </td>

                                                    <td className="px-5 py-4 text-right">
                                                        <a
                                                            href={`view-user/${data._id}`}
                                                            className="inline-flex items-center rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700 sm:text-sm"
                                                        >
                                                            View User
                                                        </a>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="px-5 py-12 text-center"
                                            >
                                                <div className="text-sm font-medium text-slate-500">
                                                    No users found
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className="block md:hidden">
                        {
                            currentUsers.length > 0 ? (
                                <div className="divide-y divide-slate-100">
                                    {
                                        currentUsers.map((data, index) => {
                                            const roleName = data.roleId?.name || data.Role?.name || '—'

                                            return (
                                                <div
                                                    key={index}
                                                    className="p-4"
                                                >
                                                    <div className="flex items-start gap-3">

                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-sm font-bold text-indigo-600">
                                                            {data.email?.charAt(0)?.toUpperCase()}
                                                        </div>

                                                        <div className="min-w-0 flex-1">
                                                            <div className="flex items-start justify-between gap-3">
                                                                <div className="min-w-0">
                                                                    <p className="break-all text-sm font-semibold text-slate-800">
                                                                        {data.email}
                                                                    </p>

                                                                    <p className="mt-1 text-xs text-slate-400">
                                                                        User #{startIndex + index + 1}
                                                                    </p>
                                                                </div>

                                                                <span
                                                                    className={`shrink-0 rounded-lg px-2.5 py-1 text-[10px] font-semibold ${data.accountStatus === 'ACTIVE'
                                                                            ? 'bg-lime-50 text-lime-700'
                                                                            : data.accountStatus === 'SUSPENDED'
                                                                                ? 'bg-red-50 text-red-700'
                                                                                : 'bg-slate-100 text-slate-600'
                                                                        }`}
                                                                >
                                                                    {data.accountStatus}
                                                                </span>
                                                            </div>

                                                            <div className="mt-3 grid grid-cols-2 gap-3">
                                                                <div>
                                                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                                                        Role
                                                                    </p>

                                                                    <p className="mt-1 text-xs font-semibold text-indigo-700">
                                                                        {roleName}
                                                                    </p>
                                                                </div>

                                                                <div>
                                                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                                                        Provider
                                                                    </p>

                                                                    <p className="mt-1 text-xs font-semibold text-slate-600">
                                                                        {data.authProvider || 'LOCAL'}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <a
                                                                href={`view-user/${data._id}`}
                                                                className="mt-4 flex w-full items-center justify-center rounded-lg bg-indigo-600 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-indigo-700"
                                                            >
                                                                View User
                                                            </a>
                                                        </div>

                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <div className="px-5 py-12 text-center">
                                    <div className="text-sm font-medium text-slate-500">
                                        No users found
                                    </div>
                                </div>
                            )
                        }
                    </div>

                    <div className="flex flex-col gap-3 border-t border-slate-200 px-3 py-3 sm:px-5 sm:py-4 lg:flex-row lg:items-center lg:justify-between">

                        <p className="text-xs text-slate-500 sm:text-sm">
                            Showing{' '}
                            <span className="font-semibold text-slate-700">
                                {filteredUsers.length === 0 ? 0 : startIndex + 1}
                            </span>
                            {' '}to{' '}
                            <span className="font-semibold text-slate-700">
                                {Math.min(startIndex + usersPerPage, filteredUsers.length)}
                            </span>
                            {' '}of{' '}
                            <span className="font-semibold text-slate-700">
                                {filteredUsers.length}
                            </span>
                            {' '}users
                        </p>

                        <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end">

                            <button
                                type="button"
                                onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                                disabled={currentPage === 1}
                                className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm"
                            >
                                Previous
                            </button>

                            <div className="flex max-w-[45vw] items-center gap-1 overflow-x-auto">
                                {
                                    Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => {
                                        return (
                                            <button
                                                type="button"
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`h-8 min-w-8 shrink-0 rounded-lg px-2 text-xs font-semibold transition sm:h-9 sm:min-w-9 sm:px-3 sm:text-sm ${currentPage === page
                                                        ? 'bg-indigo-600 text-white'
                                                        : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        )
                                    })
                                }
                            </div>

                            <button
                                type="button"
                                onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
                                disabled={currentPage === totalPages || totalPages === 0}
                                className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm"
                            >
                                Next
                            </button>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Users