import React, { useEffect, useState } from 'react'
import { FiShield } from 'react-icons/fi'
import API from '../../../../../services/api'
import Toast from '../../../../../component/Toast/Toast'
import Dropdown from '../../../../../component/Form/Dropdown'
import DefaultButton from '../../../../../component/Buttons/DefaultButton'
import { useNavigate } from 'react-router-dom'

const AssignPermissions = () => {
    const [roles, setRoles] = useState([])
    const [permissions, setPermissions] = useState([])
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const token = localStorage.getItem('access_token')
    const navigate = useNavigate

    useEffect(() => {
        const fetchpermissions = async () => {
            const res = await API.get('/admin/permissions', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.data.success === true) {
                setPermissions(res.data.result || [])
            }
        }
        if (token) fetchpermissions()
    }, [token])

    useEffect(() => {
        const fetchroles = async () => {
            const res = await API.get('/admin/roles', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.data.success === true) {
                setRoles(res.data.result || [])
            }
        }
        if (token) fetchroles()
    }, [token])

    const headleAssingPermissions = async (e, permissionId, roleId) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await API.post(`/admin/roles/${roleId}/permissions/${permissionId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message
                })

                setTimeout(() => {
                    window.location.reload()
                }, 3000)
            }
        }
        catch (err) {
            setToast({
                success: false,
                message: err.response?.data?.message,
            })
        }
        finally {
            setLoading(false)
        }
    }

    const handleRemovePermission = async (permissionId, roleId) => {
        setLoading(true)

        try {
            const res = await API.delete(`/admin/roles/${roleId}/permissions/${permissionId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message
                })

                setTimeout(() => {
                    window.location.reload()
                }, 3000)
            }
        }
        catch (err) {
            setToast({
                success: false,
                message: err.response?.data?.message,
            })
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            {toast && (
                <div className="fixed top-6 right-6 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}
            <div className="w-full">
                <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

                    <div className="p-5 sm:p-6 border-b border-gray-200">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 shrink-0 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <FiShield size={23} />
                            </div>

                            <div>
                                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                                    Assign Permissions
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Manage access permissions for system roles
                                </p>
                            </div>
                        </div>
                    </div>

                    <form
                        onSubmit={(e) => {
                            const roleId = e.currentTarget.role.value
                            const permissionId = e.currentTarget.permission.value

                            headleAssingPermissions(e, permissionId, roleId)
                        }}
                        method="post"
                        className="p-5 sm:p-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <Dropdown
                                label="Select Role"
                                name="role"
                                required={true}
                                options={roles.map((role) => ({
                                    value: role._id,
                                    label: role.name
                                }))}
                            />

                            <Dropdown
                                label="Select Permission"
                                name="permission"
                                required={true}
                                options={permissions.map((permission) => ({
                                    value: permission._id,
                                    label: permission.name
                                }))}
                            />

                        </div>

                        <div className="flex justify-end pt-2">
                            <DefaultButton
                                type="submit"
                                label={loading ? 'Permission Assiging' : 'Assign Permission'}
                            />
                        </div>
                    </form>

                    <div className="px-5 pb-5 sm:px-6">
                        {roles.map((role) => (
                            <div key={role._id} className="mb-4 border border-gray-200 rounded-xl p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-sm font-semibold text-gray-900">
                                        {role.name}
                                    </h3>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {role.permissions?.map((permissionId) => {
                                        const permission = permissions.find(
                                            (item) => item._id.toString() === permissionId.toString()
                                        )

                                        if (!permission) return null

                                        return (
                                            <div
                                                key={permission._id}
                                                className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg"
                                            >
                                                <span className="text-sm text-gray-700">
                                                    {permission.name}
                                                </span>

                                                <button
                                                    type="button"
                                                    disabled={loading}
                                                    onClick={() =>
                                                        handleRemovePermission(
                                                            permission._id,
                                                            role._id
                                                        )
                                                    }
                                                    className="text-xs text-red-600 hover:text-red-800 disabled:opacity-50"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                        <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                            <FiShield
                                className="text-blue-600 mt-0.5 shrink-0"
                                size={17}
                            />

                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                Assigning a permission gives the selected role access
                                to the corresponding system functionality.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AssignPermissions