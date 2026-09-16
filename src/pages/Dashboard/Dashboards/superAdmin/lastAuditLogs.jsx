import React, { useEffect, useState } from 'react'
import API from '../../../../services/api'
import {
    FaArrowRight,
    FaClock,
    FaShieldHalved,
    FaEnvelope,
    FaUserPlus,
    FaUserCheck,
    FaUserXmark,
    FaRightToBracket,
    FaRightFromBracket,
    FaPenToSquare,
    FaTrash,
    FaPlus,
    FaFileLines,
    FaClipboardCheck,
    FaLock,
    FaKey,
    FaCircleInfo
} from 'react-icons/fa6'

const LastAuditLogs = () => {
    const token = localStorage.getItem('access_token')
    const [auditlogs, setAuditlogs] = useState([])

    useEffect(() => {
        const fetchauditlogs = async () => {
            const res = await API.get('/admin/fetch-auditlogs', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            if (res.data.success === true) {
                const logs = res.data.result || []

                const latestLogs = [...logs]
                    .sort((a, b) => {
                        return new Date(
                            b.createdAt || b.updatedAt || 0
                        ) - new Date(
                            a.createdAt || a.updatedAt || 0
                        )
                    })
                    .slice(0, 6)

                setAuditlogs(latestLogs)
            }
        }

        if (token) fetchauditlogs()
    }, [token])

    const getActionLabel = (action) => {
        if (!action) {
            return 'System Activity'
        }

        return action
            .toString()
            .replace(/_/g, ' ')
            .toLowerCase()
            .replace(/\b\w/g, (letter) => letter.toUpperCase())
    }

    const getResourceLabel = (resource) => {
        if (!resource) {
            return 'System'
        }

        return resource
            .toString()
            .replace(/_/g, ' ')
            .toLowerCase()
            .replace(/\b\w/g, (letter) => letter.toUpperCase())
    }

    const getTimeAgo = (date) => {
        if (!date) {
            return 'Unknown'
        }

        const createdDate = new Date(date)

        if (Number.isNaN(createdDate.getTime())) {
            return 'Unknown'
        }

        const difference = Date.now() - createdDate.getTime()

        const minutes = Math.floor(difference / 60000)
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)

        if (minutes < 1) {
            return 'Just now'
        }

        if (minutes < 60) {
            return `${minutes}m ago`
        }

        if (hours < 24) {
            return `${hours}h ago`
        }

        if (days < 7) {
            return `${days}d ago`
        }

        return createdDate.toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric'
        })
    }

    const getActionIcon = (action) => {
        const value = action?.toString().toUpperCase() || ''

        if (
            value.includes('EMAIL') ||
            value.includes('VERIFICATION') ||
            value.includes('PASSWORD_RESET')
        ) {
            return {
                icon: FaEnvelope,
                bg: 'bg-blue-50',
                color: 'text-blue-600'
            }
        }

        if (
            value.includes('LOGIN') ||
            value.includes('SIGN_IN') ||
            value.includes('AUTHENTICATION')
        ) {
            return {
                icon: FaRightToBracket,
                bg: 'bg-emerald-50',
                color: 'text-emerald-600'
            }
        }

        if (
            value.includes('LOGOUT') ||
            value.includes('SIGN_OUT')
        ) {
            return {
                icon: FaRightFromBracket,
                bg: 'bg-slate-100',
                color: 'text-slate-600'
            }
        }

        if (
            value.includes('CREATE') ||
            value.includes('CREATED') ||
            value.includes('REGISTER')
        ) {
            return {
                icon: FaPlus,
                bg: 'bg-indigo-50',
                color: 'text-indigo-600'
            }
        }

        if (
            value.includes('UPDATE') ||
            value.includes('EDIT') ||
            value.includes('MODIFY')
        ) {
            return {
                icon: FaPenToSquare,
                bg: 'bg-amber-50',
                color: 'text-amber-600'
            }
        }

        if (
            value.includes('DELETE') ||
            value.includes('REMOVE')
        ) {
            return {
                icon: FaTrash,
                bg: 'bg-red-50',
                color: 'text-red-600'
            }
        }

        if (
            value.includes('USER')
        ) {
            return {
                icon: FaUserPlus,
                bg: 'bg-violet-50',
                color: 'text-violet-600'
            }
        }

        if (
            value.includes('ASSIGNMENT') ||
            value.includes('SUBMISSION')
        ) {
            return {
                icon: FaClipboardCheck,
                bg: 'bg-orange-50',
                color: 'text-orange-600'
            }
        }

        if (
            value.includes('ATTENDANCE')
        ) {
            return {
                icon: FaUserCheck,
                bg: 'bg-cyan-50',
                color: 'text-cyan-600'
            }
        }

        if (
            value.includes('ROLE') ||
            value.includes('PERMISSION') ||
            value.includes('POLICY')
        ) {
            return {
                icon: FaLock,
                bg: 'bg-purple-50',
                color: 'text-purple-600'
            }
        }

        if (
            value.includes('TOKEN') ||
            value.includes('SECURITY')
        ) {
            return {
                icon: FaKey,
                bg: 'bg-yellow-50',
                color: 'text-yellow-600'
            }
        }

        if (
            value.includes('PROFILE')
        ) {
            return {
                icon: FaUserCheck,
                bg: 'bg-pink-50',
                color: 'text-pink-600'
            }
        }

        if (
            value.includes('DOCUMENT') ||
            value.includes('FILE')
        ) {
            return {
                icon: FaFileLines,
                bg: 'bg-sky-50',
                color: 'text-sky-600'
            }
        }

        return {
            icon: FaCircleInfo,
            bg: 'bg-slate-50',
            color: 'text-slate-500'
        }
    }

    return (
        <div className="w-full rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">

            <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3">

                <div className="flex items-center gap-2.5">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                        <FaShieldHalved className="h-4 w-4" />
                    </div>

                    <div>

                        <h2 className="text-sm font-black text-slate-900">
                            Recent Audit Logs
                        </h2>

                        <p className="text-[9px] font-medium text-slate-400">
                            Latest system activity
                        </p>

                    </div>

                </div>

                <span className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-[8px] font-black uppercase tracking-wider text-slate-500">
                    Last 6
                </span>

            </div>

            <div className="space-y-1">

                {auditlogs.length > 0 ? (
                    auditlogs.map((data, index) => {

                        const actionStyle = getActionIcon(data.action)
                        const ActionIcon = actionStyle.icon

                        const activityDate =
                            data.createdAt ||
                            data.updatedAt

                        const userName =
                            data.user?.name ||
                            data.user?.email ||
                            data.userEmail ||
                            data.email ||
                            data.userId ||
                            'System User'

                        const result =
                            data.result ||
                            data.status ||
                            data.abacDecision ||
                            'INFO'

                        return (
                            <div
                                key={data._id || index}
                                className="group flex min-h-[52px] items-center gap-3 rounded-lg px-2.5 py-2 transition-colors duration-150 hover:bg-slate-50"
                            >

                                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${actionStyle.bg} ${actionStyle.color}`}>
                                    <ActionIcon className="h-3.5 w-3.5" />
                                </div>

                                <div className="min-w-0 flex-1">

                                    <div className="flex min-w-0 items-center gap-2">

                                        <p className="truncate text-[11px] font-black text-slate-800">
                                            {getActionLabel(data.action)}
                                        </p>

                                        <span className="shrink-0 text-[9px] text-slate-300">
                                            /
                                        </span>

                                        <p className="truncate text-[10px] font-bold text-slate-400">
                                            {getResourceLabel(data.resource)}
                                        </p>

                                    </div>

                                    <p className="mt-0.5 truncate text-[9px] font-medium text-slate-400">
                                        {typeof userName === 'string'
                                            ? userName
                                            : 'System User'}
                                    </p>

                                </div>

                                <div className="flex shrink-0 items-center gap-2">

                                    <div className="hidden items-center gap-1 text-[8px] font-bold text-slate-400 sm:flex">
                                        <FaClock className="h-2.5 w-2.5" />
                                        {getTimeAgo(activityDate)}
                                    </div>

                                    <span className="rounded-md bg-lime-50 px-2 py-1 text-[7px] font-black uppercase tracking-wider text-lime-700">
                                        {result}
                                    </span>

                                    <FaArrowRight className="hidden h-2.5 w-2.5 text-slate-300 transition-colors group-hover:text-indigo-500 sm:block" />

                                </div>

                            </div>
                        )
                    })
                ) : (
                    <div className="flex min-h-[120px] items-center justify-center rounded-lg bg-slate-50">

                        <div className="text-center">

                            <FaShieldHalved className="mx-auto h-5 w-5 text-slate-300" />

                            <p className="mt-2 text-[10px] font-black text-slate-500">
                                No audit activity found
                            </p>

                        </div>

                    </div>
                )}

            </div>
            <div className="text-center mt-4">
                <a href="/dashboard/security/audit-logs" className='text-blue-500 font-bold duration-500 hover:underline'>
                    View more
                </a>
            </div>

        </div>
    )
}

export default LastAuditLogs