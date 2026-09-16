import React, { useEffect, useState } from 'react'
import Toast from '../../../../component/Toast/Toast'
import API from '../../../../services/api'
import useForm from '../../../../hooks/useForm'
import Dropdown from '../../../../component/Form/Dropdown'
import DefaultButton from '../../../../component/Buttons/DefaultButton'

const UpdateUser = ({ token, userdata, userID }) => {

    const [loading, setLoading] = useState(false)
    const [roleloading, setRoleLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const [roles, setRoles] = useState([])

    const { values, handleChange } = useForm({
        role: ''
    });

    useEffect(() => {
        const fetchroles = async () => {
            const res = await API.get('/admin/roles', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.data.success === true) {
                setRoles(res.data.result)
            }
        }

        if (token) fetchroles()
    }, [token])

    const headleUpdateUserState = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const res = await API.patch(`/admin/update-user-stats/${userID}`, {
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
            });
        }
        finally {
            setLoading(false)
        }
    }

    const headleUpdateRole = async (e) => {
        e.preventDefault();
        setRoleLoading(true)

        try {
            const res = await API.patch(`/admin/user-role-update/${userID}`, values, {
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
            });
        }
        finally {
            setRoleLoading(false)
        }
    }


    return (
        <div className="min-h-full w-full bg-white">

            {toast && (
                <div className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div className="w-full p-4 sm:p-5 lg:p-6">

                <div className="mb-6">
                    <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                        Update User
                    </h1>

                    <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                        Manage user account status and role
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white sm:rounded-2xl">

                        <div className="border-b border-slate-200 bg-slate-50 px-4 py-4 sm:px-5">
                            <h2 className="text-sm font-bold text-slate-800 sm:text-base">
                                Account Status
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                Update the current account status
                            </p>
                        </div>

                        <form onSubmit={headleUpdateUserState}>

                            <div className="p-4 sm:p-5">

                                <div className="mb-5 rounded-xl bg-slate-50 p-4">
                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                        Current Status
                                    </p>

                                    <span
                                        className={`mt-2 inline-flex rounded-lg px-3 py-1.5 text-xs font-semibold ${userdata?.[0]?.accountStatus === 'ACTIVE'
                                                ? 'bg-lime-50 text-lime-700'
                                                : userdata?.[0]?.accountStatus === 'SUSPENDED'
                                                    ? 'bg-red-50 text-red-700'
                                                    : 'bg-slate-100 text-slate-600'
                                            }`}
                                    >
                                        {userdata?.[0]?.accountStatus || '—'}
                                    </span>
                                </div>

                                <DefaultButton
                                    label={loading ? 'Updating...' : 'Update Account Status'}
                                    type="submit"
                                    disabled={loading}
                                />

                            </div>

                        </form>

                    </div>

                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white sm:rounded-2xl">

                        <div className="border-b border-slate-200 bg-slate-50 px-4 py-4 sm:px-5">
                            <h2 className="text-sm font-bold text-slate-800 sm:text-base">
                                User Role
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                Change the role assigned to this user
                            </p>
                        </div>

                        <form
                            onSubmit={headleUpdateRole}
                            className="p-4 sm:p-5"
                        >

                            <Dropdown
                                label="Select Role"
                                name="role"
                                value={values.role}
                                onChange={handleChange}
                                required
                                options={roles.map((role) => ({
                                    value: role._id,
                                    label: role.name
                                }))}
                            />

                            <DefaultButton
                                label={roleloading ? 'Updating...' : 'Update User Role'}
                                type="submit"
                                disabled={roleloading}
                            />

                        </form>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default UpdateUser