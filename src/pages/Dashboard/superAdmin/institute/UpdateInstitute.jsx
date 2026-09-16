import React, { useEffect, useState } from 'react'
import {
    FaBuilding,
    FaCircleCheck,
    FaCircleInfo,
    FaFloppyDisk,
    FaLocationDot,
    FaPhone,
    FaShieldHalved,
    FaUser
} from 'react-icons/fa6'
import useForm from '../../../../hooks/useForm'
import API from '../../../../services/api'
import DefaultButton from '../../../../component/Buttons/DefaultButton'
import DefaultInput from '../../../../component/Form/DefaultInput'
import TextAreaInput from '../../../../component/Form/TextAreaInput'
import Dropdown from '../../../../component/Form/Dropdown'
import Toast from '../../../../component/Toast/Toast'

const UpdateInstitute = ({
    token,
    InstituteData,
    InstituteID
}) => {
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const [users, setUsers] = useState([])
    const [plans, setPlans] = useState([])

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

    useEffect(() => {
        const fetchplans = async () => {
            const res = await API.get('/plan/fetch-plans', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                setPlans(res.data.result)
            }
        }

        if (token) fetchplans()
    }, [token])

    const { values, handleChange, setValues } = useForm({
        name: '',
        institution_admin: '',
        plan_id: '',
        code: '',
        description: '',
        addressLine1: '',
        addressLine2: '',
        phone: '',
        alternatePhone: ''
    })

    useEffect(() => {
        if (InstituteData) {
            const institution = Array.isArray(InstituteData)
                ? InstituteData[0]
                : InstituteData

            setValues({
                name: institution?.name || '',
                institution_admin: institution?.institution_admin?._id || institution?.institution_admin || '',
                plan_id: institution?.plan?._id || institution?.plan || '',
                code: institution?.code || '',
                description: institution?.description || '',
                addressLine1: institution?.addressLine1 || '',
                addressLine2: institution?.addressLine2 || '',
                phone: institution?.phone || '',
                alternatePhone: institution?.alternatePhone || ''
            })
        }
    }, [InstituteData])

    const headleUpdateInstitue = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await API.patch(
                `/institution/update-institution/${InstituteID}`,
                values,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

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
        <div className="w-full bg-white p-4 sm:p-5 lg:p-6">
            {toast && (
                <div className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div className="mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-50 via-white to-cyan-50 ring-1 ring-violet-100/70">
                <div className="flex flex-col gap-4 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex min-w-0 items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-200">
                            <FaBuilding className="h-5 w-5" />
                        </div>

                        <div className="min-w-0">
                            <p className="mb-1 text-[9px] font-black uppercase tracking-[0.18em] text-violet-500">
                                Institution Management
                            </p>

                            <h1 className="text-xl font-black tracking-tight text-violet-950 sm:text-2xl">
                                Update Institution
                            </h1>

                            <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                                Update institution information, administration and subscription details.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 self-start rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-violet-100 lg:self-auto">
                        <FaCircleInfo className="h-3.5 w-3.5 text-violet-600" />

                        <span className="text-[10px] font-black uppercase tracking-wider text-violet-700">
                            Edit Institution
                        </span>
                    </div>
                </div>
            </div>

            <form onSubmit={headleUpdateInstitue}>
                <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                        <div className="border-b border-violet-50 bg-gradient-to-r from-violet-50/70 via-white to-white px-5 py-4 sm:px-6">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                                    <FaBuilding className="h-4 w-4" />
                                </div>

                                <div>
                                    <h2 className="text-sm font-black text-violet-950">
                                        Institution Information
                                    </h2>

                                    <p className="text-[11px] text-slate-400">
                                        Basic institution details
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-5 sm:p-6">
                            <DefaultInput
                                label="Institution Name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                placeholder="Enter institution name"
                                required
                            />

                            <DefaultInput
                                label="Institution Code"
                                name="code"
                                value={values.code}
                                onChange={handleChange}
                                placeholder="Enter institution code"
                                required
                            />

                            <TextAreaInput
                                label="Description"
                                name="description"
                                rows={4}
                                value={values.description}
                                onChange={handleChange}
                                placeholder="Enter institution description"
                            />
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                        <div className="border-b border-cyan-50 bg-gradient-to-r from-cyan-50/70 via-white to-white px-5 py-4 sm:px-6">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600">
                                    <FaUser className="h-4 w-4" />
                                </div>

                                <div>
                                    <h2 className="text-sm font-black text-violet-950">
                                        Administration & Plan
                                    </h2>

                                    <p className="text-[11px] text-slate-400">
                                        Assign administrator and subscription plan
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-5 sm:p-6">
                            <Dropdown
                                label="Institution Administrator"
                                name="institution_admin"
                                value={values.institution_admin}
                                onChange={handleChange}
                                required
                                options={users
                                    .filter((user) => user.roleId?.name === 'INSTITUTE_ADMIN')
                                    .map((user) => {
                                        return {
                                            value: user._id,
                                            label: user.name || user.email
                                        }
                                    })}
                            />

                            <Dropdown
                                label="Subscription Plan"
                                name="plan_id"
                                value={values.plan_id}
                                onChange={handleChange}
                                required
                                options={plans.map((plan) => {
                                    return {
                                        value: plan._id,
                                        label: plan.name
                                    }
                                })}
                            />
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                        <div className="border-b border-lime-50 bg-gradient-to-r from-lime-50/70 via-white to-white px-5 py-4 sm:px-6">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-lime-100 text-lime-700">
                                    <FaLocationDot className="h-4 w-4" />
                                </div>

                                <div>
                                    <h2 className="text-sm font-black text-violet-950">
                                        Institution Address
                                    </h2>

                                    <p className="text-[11px] text-slate-400">
                                        Update institution location details
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-5 sm:p-6">
                            <DefaultInput
                                label="Address Line 1"
                                name="addressLine1"
                                value={values.addressLine1}
                                onChange={handleChange}
                                placeholder="Enter address line 1"
                            />

                            <DefaultInput
                                label="Address Line 2"
                                name="addressLine2"
                                value={values.addressLine2}
                                onChange={handleChange}
                                placeholder="Enter address line 2"
                            />
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                        <div className="border-b border-violet-50 bg-gradient-to-r from-violet-50/70 via-white to-cyan-50/40 px-5 py-4 sm:px-6">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                                    <FaPhone className="h-4 w-4" />
                                </div>

                                <div>
                                    <h2 className="text-sm font-black text-violet-950">
                                        Contact Information
                                    </h2>

                                    <p className="text-[11px] text-slate-400">
                                        Update institution contact numbers
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-5 sm:p-6">
                            <DefaultInput
                                label="Phone"
                                name="phone"
                                value={values.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                            />

                            <DefaultInput
                                label="Alternate Phone"
                                name="alternatePhone"
                                value={values.alternatePhone}
                                onChange={handleChange}
                                placeholder="Enter alternate phone number"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-5 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-50 via-white to-cyan-50 p-5 ring-1 ring-violet-100/70 sm:p-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm ring-1 ring-violet-100">
                                <FaShieldHalved className="h-4 w-4" />
                            </div>

                            <div>
                                <h3 className="text-sm font-black text-violet-950">
                                    Save Institution Changes
                                </h3>

                                <p className="mt-1 text-xs leading-5 text-slate-500">
                                    Review the updated information before saving the institution.
                                </p>
                            </div>
                        </div>

                        <div className="w-full lg:w-auto">
                            <DefaultButton
                                label={loading ? 'Updating Institution...' : 'Update Institution'}
                                type="submit"
                                disabled={loading}
                                loading={loading}
                                icon={loading ? <FaCircleCheck /> : <FaFloppyDisk />}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateInstitute