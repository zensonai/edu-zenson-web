import React, { useEffect, useState } from 'react'
import API from '../../../../../services/api'
import { FiShield, FiKey, FiUsers, FiFileText, FiCheckCircle } from 'react-icons/fi'

const ABAC = () => {
    const token = localStorage.getItem('access_token')
    const [permission, setPermission] = useState([])
    const [policies, setPolicies] = useState([])
    const [roles, setRoles] = useState([])

    useEffect(() => {
        const fetchPermissions = async () => {
            const res = await API.get('/admin/permissions', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.data.success === true) {
                setPermission(res.data.result)
            }
        }
        if (token) fetchPermissions()
    }, [token])

    useEffect(() => {
        const fetchRoles = async () => {
            const res = await API.get('/admin/roles', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.data.success === true) {
                setRoles(res.data.result)
            }
        }
        if (token) fetchRoles()
    }, [token])

    useEffect(() => {
        const fetchPolicies = async () => {
            const res = await API.get('/admin/policy', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.data.success === true) {
                setPolicies(res.data.result)
            }
        }
        if (token) fetchPolicies()
    }, [token])

    const getPermissionById = (id) => {
        const permissionId = id?._id || id
        return permission.find(item => String(item._id) === String(permissionId))
    }

    const getRolePermissions = (role) => {
        if (!Array.isArray(role.permissions)) return []
        return role.permissions.map(item => getPermissionById(item)).filter(Boolean)
    }

    const getPolicyPermission = (policy) => {
        return getPermissionById(policy.permissionId)
    }

    const formatAttribute = (attribute) => {
        const attributes = {
            'subject.role': 'User Role',
            'environment.dayOfWeek': 'Day of Week',
            'environment.hour': 'Hour'
        }
        return attributes[attribute] || attribute
    }

    const formatOperator = (operator) => {
        const operators = {
            EQUALS: 'equals',
            NOT_EQUALS: 'does not equal',
            IN: 'is one of',
            NOT_IN: 'is not one of',
            GREATER_THAN: 'is greater than',
            GREATER_THAN_OR_EQUAL: 'is greater than or equal to',
            LESS_THAN: 'is less than',
            LESS_THAN_OR_EQUAL: 'is less than or equal to'
        }
        return operators[operator] || operator
    }

    return (
        <div className="min-h-screen bg-white p-3 sm:p-5 lg:p-8">
            <div className="mb-6">
                <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 min-w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                        <FiShield />
                    </div>
                    <div className="min-w-0">
                        <h1 className="break-words text-xl font-bold text-slate-900 sm:text-2xl">
                            ABAC Management
                        </h1>
                        <p className="text-xs leading-5 text-slate-500 sm:text-sm">
                            Manage roles, permissions and attribute-based access policies.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
                    <FiUsers className="mb-2 text-blue-600" />
                    <p className="text-lg font-bold sm:text-xl">{roles.length}</p>
                    <p className="text-xs text-slate-500">Roles</p>
                </div>

                <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
                    <FiKey className="mb-2 text-purple-600" />
                    <p className="text-lg font-bold sm:text-xl">{permission.length}</p>
                    <p className="text-xs text-slate-500">Permissions</p>
                </div>

                <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
                    <FiFileText className="mb-2 text-orange-600" />
                    <p className="text-lg font-bold sm:text-xl">{policies.length}</p>
                    <p className="text-xs text-slate-500">Policies</p>
                </div>

                <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
                    <FiCheckCircle className="mb-2 text-green-600" />
                    <p className="text-lg font-bold sm:text-xl">
                        {policies.filter(item => item.isActive).length}
                    </p>
                    <p className="text-xs text-slate-500">Active Policies</p>
                </div>
            </div>

            <section className="mb-6">
                <div className="mb-4">
                    <h2 className="text-lg font-bold text-slate-900">Permissions</h2>
                    <p className="text-xs text-slate-500 sm:text-sm">
                        Available system permissions.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {permission.map(item => (
                        <div
                            key={item._id}
                            className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 sm:p-4"
                        >
                            <div className="mb-3 flex items-center justify-between gap-2">
                                <FiKey className="shrink-0 text-purple-600" />
                                <span className={`rounded-md px-2 py-1 text-[10px] font-bold ${item.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {item.isActive ? 'ACTIVE' : 'INACTIVE'}
                                </span>
                            </div>

                            <h3 className="break-all text-sm font-bold text-slate-900">
                                {item.name}
                            </h3>

                            <p className="mt-2 break-words text-xs leading-5 text-slate-500">
                                {item.description || 'No description'}
                            </p>

                            <div className="mt-4 grid grid-cols-1 gap-3 border-t border-slate-100 pt-3 min-[400px]:grid-cols-2">
                                <div className="min-w-0">
                                    <p className="text-[10px] uppercase text-slate-400">Resource</p>
                                    <p className="mt-1 break-all text-xs font-semibold">
                                        {item.resource || '-'}
                                    </p>
                                </div>

                                <div className="min-w-0">
                                    <p className="text-[10px] uppercase text-slate-400">Action</p>
                                    <p className="mt-1 break-all text-xs font-semibold">
                                        {item.action || '-'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-6">
                <div className="mb-4">
                    <h2 className="text-lg font-bold text-slate-900">Roles</h2>
                    <p className="text-xs text-slate-500 sm:text-sm">
                        Roles and their assigned permissions.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {roles.map(role => {
                        const rolePermissions = getRolePermissions(role)

                        return (
                            <div
                                key={role._id}
                                className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 sm:p-4"
                            >
                                <div className="mb-3 flex items-center justify-between gap-2">
                                    <FiUsers className="shrink-0 text-blue-600" />
                                    <span className={`rounded-md px-2 py-1 text-[10px] font-bold ${role.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {role.isActive ? 'ACTIVE' : 'INACTIVE'}
                                    </span>
                                </div>

                                <h3 className="break-all text-sm font-bold text-slate-900">
                                    {role.name}
                                </h3>

                                <p className="mt-2 break-words text-xs leading-5 text-slate-500">
                                    {role.description || 'No description'}
                                </p>

                                <div className="mt-4 border-t border-slate-100 pt-3">
                                    <p className="mb-2 text-[10px] uppercase text-slate-400">
                                        Permissions
                                    </p>

                                    {rolePermissions.length === 0 ? (
                                        <p className="text-xs text-slate-400">
                                            No permissions assigned
                                        </p>
                                    ) : (
                                        <div className="flex flex-wrap gap-2">
                                            {rolePermissions.map(item => (
                                                <span
                                                    key={item._id}
                                                    className="max-w-full break-all rounded-md bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-700"
                                                >
                                                    {item.name}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

            <section>
                <div className="mb-4">
                    <h2 className="text-lg font-bold text-slate-900">Policies</h2>
                    <p className="text-xs text-slate-500 sm:text-sm">
                        Attribute-based access control policies and conditions.
                    </p>
                </div>

                <div className="space-y-3">
                    {policies.map(policy => {
                        const policyPermission = getPolicyPermission(policy)

                        return (
                            <div
                                key={policy._id}
                                className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 sm:p-4"
                            >
                                <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h3 className="break-all text-sm font-bold text-slate-900">
                                                {policy.name}
                                            </h3>

                                            <span className={`rounded-md px-2 py-1 text-[10px] font-bold ${policy.effect === 'ALLOW' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {policy.effect}
                                            </span>
                                        </div>

                                        <p className="mt-2 break-words text-xs leading-5 text-slate-500">
                                            {policy.description || 'No description'}
                                        </p>
                                    </div>

                                    <span className={`w-fit shrink-0 rounded-md px-2 py-1 text-[10px] font-bold ${policy.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {policy.isActive ? 'ACTIVE' : 'INACTIVE'}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 gap-3 border-b border-slate-100 py-4 min-[400px]:grid-cols-2 md:grid-cols-4">
                                    <div className="min-w-0">
                                        <p className="text-[10px] uppercase text-slate-400">Permission</p>
                                        <p className="mt-1 break-all text-xs font-semibold">
                                            {policyPermission?.name || 'Permission not found'}
                                        </p>
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-[10px] uppercase text-slate-400">Resource</p>
                                        <p className="mt-1 break-all text-xs font-semibold">
                                            {policyPermission?.resource || '-'}
                                        </p>
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-[10px] uppercase text-slate-400">Action</p>
                                        <p className="mt-1 break-all text-xs font-semibold">
                                            {policyPermission?.action || '-'}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[10px] uppercase text-slate-400">Version</p>
                                        <p className="mt-1 text-xs font-semibold">
                                            v{policy.version || 1}
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <div className="mb-3 flex items-center gap-2">
                                        <FiShield className="shrink-0 text-blue-600" />
                                        <p className="text-[10px] font-bold uppercase text-slate-500">
                                            Conditions
                                        </p>
                                    </div>

                                    {policy.conditions?.length ? (
                                        <div className="space-y-2">
                                            {policy.conditions.map((condition, index) => (
                                                <div
                                                    key={index}
                                                    className="flex min-w-0 items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2.5 sm:p-3"
                                                >
                                                    <div className="flex h-6 w-6 min-w-6 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-600">
                                                        {index + 1}
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="break-words text-xs font-bold text-slate-700">
                                                            {formatAttribute(condition.attribute)}
                                                        </p>

                                                        <p className="mt-1 break-words text-[10px] leading-5 text-slate-500">
                                                            {formatOperator(condition.operator)}{' '}
                                                            <span className="font-bold text-slate-700">
                                                                {Array.isArray(condition.value)
                                                                    ? condition.value.join(', ')
                                                                    : condition.value}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-xs text-slate-400">
                                            No conditions configured
                                        </p>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>
        </div>
    )
}

export default ABAC