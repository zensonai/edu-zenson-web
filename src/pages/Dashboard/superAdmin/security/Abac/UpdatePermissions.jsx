import React, { useEffect, useState } from 'react'
import useForm from '../../../../../hooks/useForm'
import API from '../../../../../services/api'
import Toast from '../../../../../component/Toast/Toast'
import DefaultInput from '../../../../../component/Form/DefaultInput'
import TextAreaInput from '../../../../../component/Form/TextAreaInput'
import DefaultButton from '../../../../../component/Buttons/DefaultButton'
import Dropdown from '../../../../../component/Form/Dropdown'

const UpdatePermissions = () => {
    const token = localStorage.getItem('access_token')

    const [loading, setLoading] = useState(false)
    const [permissions, setPermissions] = useState([])
    const [selectedPermission, setSelectedPermission] = useState('')
    const [toast, setToast] = useState(false)

    const { values, handleChange, setValues } = useForm({
        name: "",
        resource: "",
        action: "",
        description: "",
        isActive: true,
    })

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const res = await API.get('/admin/permissions', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.data.success === true) {
                    setPermissions(res.data.result)
                }
            }
            catch (err) {
                setToast({
                    success: false,
                    message: err.response?.data?.message || 'Failed to fetch permissions',
                })
            }
        }

        fetchPermissions()
    }, [token])

    const handlePermissionSelect = (e) => {
        const permissionId = e.target.value

        setSelectedPermission(permissionId)

        const selected = permissions.find(
            permission => permission._id === permissionId
        )

        if (selected) {
            setValues({
                name: selected.name ?? "",
                resource: selected.resource ?? "",
                action: selected.action ?? "",
                description: selected.description ?? "",
                isActive: selected.isActive ?? true,
            })
        }
    }

    const handlePermissions = async (e) => {
        e.preventDefault()

        if (!selectedPermission) {
            setToast({
                success: false,
                message: 'Please select a permission',
            })
            return
        }

        setLoading(true)

        try {
            const res = await API.patch(`/admin/permission/${selectedPermission}`, values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            )

            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message,
                })

                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            }
        }
        catch (err) {
            setToast({
                success: false,
                message: err.response?.data?.message || 'Failed to update permission',
            })
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white">

            {toast && (
                <div className="fixed top-6 right-6 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div className="mb-6 border-l-4 border-indigo-700 bg-indigo-50 px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-950">
                    Permission Configuration
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                    Select a permission and update its configuration.
                </p>
            </div>

            <form onSubmit={handlePermissions} method="post">

                <div className="border border-slate-200 bg-white p-5 md:p-6">

                    <div className="mb-5">
                        <h3 className="text-sm font-bold text-indigo-950">
                            Select Permission
                        </h3>

                        <div className="mt-2 h-px bg-slate-100" />
                    </div>

                    <div className="mb-6">
                        <Dropdown
                            label={"Permission"}
                            value={selectedPermission}
                            name={"permission"}
                            onChange={handlePermissionSelect}
                            required
                            options={permissions.map(permission => ({
                                value: permission._id,
                                label: permission.name
                            }))}
                        />
                    </div>

                    <div className="mb-5">
                        <h3 className="text-sm font-bold text-indigo-950">
                            Permission Information
                        </h3>

                        <div className="mt-2 h-px bg-slate-100" />
                    </div>

                    <div className="grid grid-cols-1 gap-0 md:grid-cols-2">

                        <div>
                            <DefaultInput
                                label={"Permission Name"}
                                value={values.name}
                                name={"name"}
                                placeholder={"ASSIGNMENT_ACCESS"}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <DefaultInput
                                label={"Resource"}
                                value={values.resource}
                                name={"resource"}
                                placeholder={"ASSIGNMENT"}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Dropdown
                                label={"Action"}
                                value={values.action}
                                name={"action"}
                                onChange={handleChange}
                                required
                                options={[
                                    { value: "ACCESS", label: "Access" },
                                    { value: "CREATE", label: "Create" },
                                    { value: "READ", label: "Read" },
                                    { value: "UPDATE", label: "Update" },
                                    { value: "DELETE", label: "Delete" },
                                    { value: "MANAGE", label: "Manage" },
                                    { value: "APPROVE", label: "Approve" },
                                    { value: "REJECT", label: "Reject" },
                                    { value: "ASSIGN", label: "Assign" },
                                    { value: "DOWNLOAD", label: "Download" },
                                    { value: "UPLOAD", label: "Upload" },
                                    { value: "EXPORT", label: "Export" },
                                    { value: "IMPORT", label: "Import" }
                                ]}
                            />
                        </div>

                        <div>
                            <Dropdown
                                label={"Status"}
                                value={values.isActive}
                                name={"isActive"}
                                onChange={(e) => {
                                    setValues({
                                        ...values,
                                        isActive: e.target.value === "true"
                                    })
                                }}
                                options={[
                                    { value: "true", label: "Active" },
                                    { value: "false", label: "Inactive" }
                                ]}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <TextAreaInput
                                label={"Permission Description"}
                                value={values.description}
                                name={"description"}
                                placeholder="Allow students to access assignments"
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>

                    <div className="mt-7 flex items-center justify-end border-t border-slate-100 pt-5">

                        <DefaultButton
                            type="submit"
                            label={loading ? "Updating" : "Update Permission"}
                        />

                    </div>

                </div>

            </form>

        </div>
    )
}

export default UpdatePermissions