import React, { useEffect, useMemo, useState } from 'react'
import API from '../../../../services/api'
import PieChart from '../../../../component/Dashboard/Charts/PieChart'
import { FaUsers } from 'react-icons/fa6'

const UserPieChart = () => {
    const token = localStorage.getItem('access_token')
    const [users, setUsers] = useState([])
    const [roles, setRoles] = useState([])

    useEffect(() => {
        const fetchusers = async () => {
            try {
                const res = await API.get('/admin/users', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.data.success === true) {
                    setUsers(res.data.result || [])
                }
            } catch (error) {
                setUsers([])
            }
        }

        if (token) fetchusers()
    }, [token])

    useEffect(() => {
        const fetchroles = async () => {
            try {
                const res = await API.get('/admin/roles', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.data.success === true) {
                    setRoles(res.data.result || [])
                }
            } catch (error) {
                setRoles([])
            }
        }

        if (token) fetchroles()
    }, [token])

    const roleColors = [
        {
            chart: '#6366f1',
            dot: 'bg-indigo-500',
            text: 'text-indigo-600',
            bg: 'bg-indigo-50'
        },
        {
            chart: '#f97316',
            dot: 'bg-orange-500',
            text: 'text-orange-600',
            bg: 'bg-orange-50'
        },
        {
            chart: '#84cc16',
            dot: 'bg-lime-500',
            text: 'text-lime-600',
            bg: 'bg-lime-50'
        },
        {
            chart: '#4f46e5',
            dot: 'bg-indigo-600',
            text: 'text-indigo-700',
            bg: 'bg-indigo-50'
        },
        {
            chart: '#ea580c',
            dot: 'bg-orange-600',
            text: 'text-orange-700',
            bg: 'bg-orange-50'
        },
        {
            chart: '#65a30d',
            dot: 'bg-lime-600',
            text: 'text-lime-700',
            bg: 'bg-lime-50'
        }
    ]

    const roleData = useMemo(() => {
        return roles
            .map((role, index) => {
                const roleId = role._id?.toString()

                const count = users.filter((user) => {
                    const userRoleId =
                        typeof user.roleId === 'object'
                            ? user.roleId?._id || user.roleId?.id
                            : user.roleId

                    return userRoleId?.toString() === roleId
                }).length

                const color = roleColors[index % roleColors.length]

                return {
                    name: role.name,
                    value: count,
                    color: color.chart,
                    dot: color.dot,
                    text: color.text,
                    bg: color.bg
                }
            })
            .filter((role) => role.value > 0)
    }, [roles, users])

    const totalUsers = users.length

    const chartData = roleData.map((role) => {
        return {
            name: role.name,
            value: role.value,
            color: role.color
        }
    })

    return (
        <div className="w-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">

            <div className="border-b border-slate-100 px-5 py-4">

                <div className="flex items-center justify-between gap-4">

                    <div className="flex min-w-0 items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                            <FaUsers className="h-5 w-5" />
                        </div>

                        <div className="min-w-0">

                            <p className="text-[8px] font-black uppercase tracking-[0.18em] text-indigo-500">
                                User Analytics
                            </p>

                            <h2 className="mt-0.5 truncate text-sm font-black tracking-tight text-slate-900">
                                User Distribution
                            </h2>

                            <p className="mt-0.5 truncate text-[9px] font-medium text-slate-400">
                                Distribution across system roles
                            </p>

                        </div>

                    </div>

                    <div className="shrink-0 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-right">

                        <p className="text-[7px] font-black uppercase tracking-[0.16em] text-slate-400">
                            Total Users
                        </p>

                        <p className="mt-0.5 text-lg font-black leading-none text-slate-900">
                            {totalUsers}
                        </p>

                    </div>

                </div>

            </div>

            <div className="p-5">

                {roleData.length > 0 ? (
                    <>

                        <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3">

                            <PieChart
                                data={chartData}
                            />

                        </div>

                        <div className="mt-4">

                            <div className="mb-2.5 flex items-center justify-between">

                                <p className="text-[8px] font-black uppercase tracking-[0.16em] text-slate-400">
                                    Role Breakdown
                                </p>

                                <p className="text-[8px] font-bold text-slate-400">
                                    {roleData.length} Roles
                                </p>

                            </div>

                            <div className="grid grid-cols-2 gap-2">

                                {roleData.map((role, index) => {

                                    const percentage =
                                        totalUsers > 0
                                            ? ((role.value / totalUsers) * 100).toFixed(1)
                                            : 0

                                    return (
                                        <div
                                            key={role.name || index}
                                            className="rounded-xl border border-slate-100 bg-white px-3 py-2.5 transition-all duration-200 hover:border-indigo-100 hover:bg-slate-50"
                                        >

                                            <div className="flex items-center justify-between gap-2">

                                                <div className="flex min-w-0 items-center gap-2">

                                                    <span className={`h-2 w-2 shrink-0 rounded-full ${role.dot}`}></span>

                                                    <p className="truncate text-[9px] font-black uppercase tracking-wide text-slate-600">
                                                        {role.name}
                                                    </p>

                                                </div>

                                                <span className={`shrink-0 rounded-md px-1.5 py-0.5 text-[7px] font-black ${role.bg} ${role.text}`}>
                                                    {percentage}%
                                                </span>

                                            </div>

                                            <div className="mt-2 flex items-end justify-between">

                                                <p className="text-base font-black leading-none text-slate-900">
                                                    {role.value}
                                                </p>

                                                <p className="text-[7px] font-bold uppercase tracking-wide text-slate-400">
                                                    Users
                                                </p>

                                            </div>

                                            <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-100">

                                                <div
                                                    className={`h-full rounded-full ${role.dot} transition-all duration-500`}
                                                    style={{
                                                        width: `${percentage}%`
                                                    }}
                                                ></div>

                                            </div>

                                        </div>
                                    )
                                })}

                            </div>

                        </div>

                    </>
                ) : (
                    <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60">

                        <div className="text-center">

                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-300">
                                <FaUsers className="h-5 w-5" />
                            </div>

                            <p className="mt-3 text-xs font-black text-slate-600">
                                No user distribution data
                            </p>

                            <p className="mt-1 text-[9px] font-medium text-slate-400">
                                User role information will appear here.
                            </p>

                        </div>

                    </div>
                )}

            </div>

        </div>
    )
}

export default UserPieChart