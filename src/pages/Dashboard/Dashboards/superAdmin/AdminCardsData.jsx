import React, { useEffect, useMemo, useState } from 'react'
import {
    FaSchool,
    FaLayerGroup,
    FaShieldHalved,
    FaUserShield,
    FaFileShield,
    FaUserTie,
    FaUserGear,
    FaUserGraduate,
    FaChalkboardUser,
    FaUsers,
    FaArrowTrendUp
} from 'react-icons/fa6'
import API from '../../../../services/api'

const AdminCardsData = () => {
    const token = localStorage.getItem('access_token')

    const [institutes, setInstitutes] = useState([])
    const [plans, setPlans] = useState([])
    const [roles, setRoles] = useState([])
    const [policies, setPolicies] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchinstitutions = async () => {
            try {
                const res = await API.get('/institution/fetch-all', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.data.success === true) {
                    setInstitutes(res.data.result || [])
                }
            } catch (error) {
                setInstitutes([])
            }
        }

        if (token) fetchinstitutions()
    }, [token])

    useEffect(() => {
        const fetchplans = async () => {
            try {
                const res = await API.get('/plan/fetch-plans', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                })

                if (res.data.success === true) {
                    setPlans(res.data.result || [])
                }
            } catch (error) {
                setPlans([])
            }
        }

        if (token) fetchplans()
    }, [token])

    useEffect(() => {
        const fetchRoles = async () => {
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

        if (token) fetchRoles()
    }, [token])

    useEffect(() => {
        const fetchPolicies = async () => {
            try {
                const res = await API.get('/admin/policy', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.data.success === true) {
                    setPolicies(res.data.result || [])
                }
            } catch (error) {
                setPolicies([])
            }
        }

        if (token) fetchPolicies()
    }, [token])

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

    const rolePermissionCount = useMemo(() => {
        const permissionIds = new Set()

        roles.forEach((role) => {
            if (Array.isArray(role.permissions)) {
                role.permissions.forEach((permission) => {
                    const permissionId =
                        typeof permission === 'object'
                            ? permission._id || permission.id
                            : permission

                    if (permissionId) {
                        permissionIds.add(permissionId.toString())
                    }
                })
            }
        })

        return permissionIds.size
    }, [roles])

    const countUsersByRole = (roleName) => {
        const role = roles.find(
            (item) => item.name?.toUpperCase() === roleName
        )

        if (!role?._id) {
            return 0
        }

        return users.filter((user) => {
            if (!user.roleId) {
                return false
            }

            const userRoleId =
                typeof user.roleId === 'object'
                    ? user.roleId._id || user.roleId.id
                    : user.roleId

            return userRoleId?.toString() === role._id.toString()
        }).length
    }

    const activeRoles = roles.filter((role) => role.isActive === true).length

    const activePolicies = policies.filter((policy) => {
        if (policy.isActive === undefined) {
            return true
        }

        return policy.isActive === true
    }).length

    const admin_cards = [
        {
            id: 'institutions',
            name: 'Institutions',
            subtitle: 'Registered educational institutions',
            count_value: institutes.length,
            icon: FaSchool,
            iconBg: 'bg-indigo-50',
            iconColor: 'text-indigo-600',
            countColor: 'text-indigo-700',
            badge: 'Institutions',
            badgeBg: 'bg-indigo-50',
            badgeColor: 'text-indigo-600',
            ring: 'ring-indigo-100',
        },
        {
            id: 'plans',
            name: 'Plans',
            subtitle: 'Available subscription plans',
            count_value: plans.length,
            icon: FaLayerGroup,
            iconBg: 'bg-orange-50',
            iconColor: 'text-orange-500',
            countColor: 'text-orange-600',
            badge: 'Subscriptions',
            badgeBg: 'bg-orange-50',
            badgeColor: 'text-orange-600',
            ring: 'ring-orange-100',
        },
        {
            id: 'permissions',
            name: 'Permissions',
            subtitle: 'Unique access permissions configured',
            count_value: rolePermissionCount,
            icon: FaShieldHalved,
            iconBg: 'bg-lime-50',
            iconColor: 'text-lime-600',
            countColor: 'text-lime-700',
            badge: 'Access Control',
            badgeBg: 'bg-lime-50',
            badgeColor: 'text-lime-700',
            ring: 'ring-lime-100',
        },
        {
            id: 'roles',
            name: 'Roles',
            subtitle: `${activeRoles} active roles in the system`,
            count_value: roles.length,
            icon: FaUserShield,
            iconBg: 'bg-violet-50',
            iconColor: 'text-violet-600',
            countColor: 'text-violet-700',
            badge: 'RBAC',
            badgeBg: 'bg-violet-50',
            badgeColor: 'text-violet-700',
            ring: 'ring-violet-100',
        },
        {
            id: 'policies',
            name: 'Policies',
            subtitle: 'Active authorization policies',
            count_value: policies.length,
            icon: FaFileShield,
            iconBg: 'bg-cyan-50',
            iconColor: 'text-cyan-600',
            countColor: 'text-cyan-700',
            badge: `${activePolicies} Active`,
            badgeBg: 'bg-cyan-50',
            badgeColor: 'text-cyan-700',
            ring: 'ring-cyan-100',
        },
        {
            id: 'super-admins',
            name: 'Super Admins',
            subtitle: 'System-wide administrative accounts',
            count_value: countUsersByRole('SUPER_ADMIN'),
            icon: FaUserTie,
            iconBg: 'bg-red-50',
            iconColor: 'text-red-600',
            countColor: 'text-red-700',
            badge: 'SUPER ADMIN',
            badgeBg: 'bg-red-50',
            badgeColor: 'text-red-600',
            ring: 'ring-red-100',
        },
        {
            id: 'system-staff',
            name: 'System Staff',
            subtitle: 'Core platform staff accounts',
            count_value: countUsersByRole('SYSTEM_STAFF'),
            icon: FaUserGear,
            iconBg: 'bg-slate-100',
            iconColor: 'text-slate-600',
            countColor: 'text-slate-700',
            badge: 'SYSTEM STAFF',
            badgeBg: 'bg-slate-100',
            badgeColor: 'text-slate-700',
            ring: 'ring-slate-200',
        },
        {
            id: 'institute-admins',
            name: 'Institute Admins',
            subtitle: 'Administrators managing institutions',
            count_value: countUsersByRole('INSTITUTE_ADMIN'),
            icon: FaUserShield,
            iconBg: 'bg-blue-50',
            iconColor: 'text-blue-600',
            countColor: 'text-blue-700',
            badge: 'INSTITUTE ADMIN',
            badgeBg: 'bg-blue-50',
            badgeColor: 'text-blue-700',
            ring: 'ring-blue-100',
        },
        {
            id: 'teachers',
            name: 'Teachers',
            subtitle: 'Teaching and academic staff',
            count_value: countUsersByRole('TEACHER'),
            icon: FaChalkboardUser,
            iconBg: 'bg-emerald-50',
            iconColor: 'text-emerald-600',
            countColor: 'text-emerald-700',
            badge: 'TEACHERS',
            badgeBg: 'bg-emerald-50',
            badgeColor: 'text-emerald-700',
            ring: 'ring-emerald-100',
        },
        {
            id: 'students',
            name: 'Students',
            subtitle: 'Registered student accounts',
            count_value: countUsersByRole('STUDENT'),
            icon: FaUserGraduate,
            iconBg: 'bg-pink-50',
            iconColor: 'text-pink-600',
            countColor: 'text-pink-700',
            badge: 'STUDENTS',
            badgeBg: 'bg-pink-50',
            badgeColor: 'text-pink-700',
            ring: 'ring-pink-100',
        },
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
                            System Overview
                        </span>

                    </div>

                    <h2 className="mt-2 text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                        Administration Overview
                    </h2>

                    <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
                        Monitor your platform structure, access control and user ecosystem.
                    </p>
                </div>

                <div className="flex w-fit items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200">

                    <span className="h-2 w-2 rounded-full bg-lime-500"></span>

                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-600">
                        Live System Data
                    </span>

                </div>

            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">

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
                        Platform Structure
                    </p>
                    <p className="mt-1 text-xs font-bold text-indigo-900">
                        {institutes.length} institutions · {plans.length} plans
                    </p>
                </div>

                <div className="rounded-xl bg-lime-50 px-4 py-3 ring-1 ring-lime-100">
                    <p className="text-[9px] font-black uppercase tracking-wider text-lime-600">
                        Access Management
                    </p>
                    <p className="mt-1 text-xs font-bold text-lime-900">
                        {roles.length} roles · {rolePermissionCount} permissions
                    </p>
                </div>

                <div className="rounded-xl bg-orange-50 px-4 py-3 ring-1 ring-orange-100">
                    <p className="text-[9px] font-black uppercase tracking-wider text-orange-500">
                        User Ecosystem
                    </p>
                    <p className="mt-1 text-xs font-bold text-orange-900">
                        {users.length} total registered users
                    </p>
                </div>

            </div>

        </div>
    )
}

export default AdminCardsData