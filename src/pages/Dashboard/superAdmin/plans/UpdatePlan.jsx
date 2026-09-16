import React, { useEffect, useState } from 'react'
import { FaCheck, FaPlus, FaTrash } from 'react-icons/fa6'
import API from '../../../../services/api'
import Toast from '../../../../component/Toast/Toast'
import DefaultButton from '../../../../component/Buttons/DefaultButton'
import DefaultInput from '../../../../component/Form/DefaultInput'
import Dropdown from '../../../../component/Form/Dropdown'
import TextAreaInput from '../../../../component/Form/TextAreaInput'
import useForm from '../../../../hooks/useForm'

const UpdatePlan = ({
    token,
    plan,
    planID
}) => {
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)

    const { values, handleChange, setValues } = useForm({
        name: '',
        description: '',
        subtitle: '',
        type: '',
        maxStudents: 0,
        maxBranches: 0,
        pricingType: '',
        monthlyPrice: 0,
        yearlyPrice: 0,
        isActive: true,
        isPopular: false,
        features: [],
        includedModules: [],
        aiFeatures: []
    })

    useEffect(() => {
        if (plan) {
            setValues({
                name: plan.name || '',
                description: plan.description || '',
                subtitle: plan.subtitle || '',
                type: plan.type || '',
                maxStudents: plan.maxStudents || 0,
                maxBranches: plan.maxBranches || 0,
                pricingType: plan.pricingType || '',
                monthlyPrice: plan.monthlyPrice || 0,
                yearlyPrice: plan.yearlyPrice || 0,
                isActive: plan.isActive ?? true,
                isPopular: plan.isPopular ?? false,
                features: plan.features || [],
                includedModules: plan.includedModules || [],
                aiFeatures: plan.aiFeatures || []
            })
        }
    }, [plan])

    const headleUpdatePlan = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await API.patch(`/plan/update-plan/${planID}`, values, {
                headers: {
                    Authorization: `Bearer ${token}`
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

    const handleArrayChange = (field, index, value) => {
        setValues({
            ...values,
            [field]: values[field].map((item, i) =>
                i === index ? value : item
            )
        })
    }

    const addArrayItem = (field) => {
        setValues({
            ...values,
            [field]: [...values[field], '']
        })
    }

    const removeArrayItem = (field, index) => {
        setValues({
            ...values,
            [field]: values[field].filter((_, i) => i !== index)
        })
    }

    return (
        <div className="w-full bg-white p-4">

            {toast && (
                <div className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div className="mb-6">

                <div className="mb-2 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />

                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-violet-400">
                        Education SaaS
                    </p>
                </div>

                <h1 className="text-xl font-black tracking-tight text-violet-950">
                    Update Plan
                </h1>

                <p className="mt-1 text-sm font-medium text-slate-400">
                    Update education platform subscription plan details
                </p>

            </div>

            <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-violet-100/70">

                <div className="border-b border-violet-50 bg-gradient-to-r from-violet-50 via-white to-cyan-50 px-5 py-4 sm:px-6">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 text-white shadow-md shadow-violet-200">
                            <span className="text-sm font-black">
                                {values.name?.charAt(0)?.toUpperCase() || 'Z'}
                            </span>
                        </div>

                        <div>
                            <h2 className="text-sm font-black text-violet-950">
                                {values.name || 'Plan Configuration'}
                            </h2>

                            <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                                Update pricing, limits and platform features
                            </p>
                        </div>

                    </div>

                </div>

                <form
                    onSubmit={headleUpdatePlan}
                    className="p-5 sm:p-6"
                >

                    <div className="mb-6">

                        <div className="mb-4 flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />

                            <h3 className="text-xs font-black uppercase tracking-[0.15em] text-violet-700">
                                Basic Information
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            <DefaultInput
                                label="Plan Name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                placeholder="Professional"
                                required
                            />

                            <Dropdown
                                label="Plan Type"
                                name="type"
                                value={values.type}
                                onChange={handleChange}
                                required
                                options={[
                                    {
                                        value: 'STARTER',
                                        label: 'Starter'
                                    },
                                    {
                                        value: 'PROFESSIONAL',
                                        label: 'Professional'
                                    },
                                    {
                                        value: 'ENTERPRISE',
                                        label: 'Enterprise'
                                    }
                                ]}
                            />

                        </div>

                        <DefaultInput
                            label="Subtitle"
                            name="subtitle"
                            value={values.subtitle}
                            onChange={handleChange}
                            placeholder="For institutions with up to 1,500 students"
                            required
                        />

                        <TextAreaInput
                            label="Description"
                            name="description"
                            value={values.description}
                            onChange={handleChange}
                            placeholder="Plan description"
                            rows={4}
                            required
                        />

                    </div>

                    <div className="mb-6">

                        <div className="mb-4 flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />

                            <h3 className="text-xs font-black uppercase tracking-[0.15em] text-violet-700">
                                Pricing & Limits
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            <DefaultInput
                                label="Maximum Students"
                                type="number"
                                name="maxStudents"
                                value={values.maxStudents}
                                onChange={handleChange}
                                placeholder="1500"
                                required
                            />

                            <DefaultInput
                                label="Maximum Branches"
                                type="number"
                                name="maxBranches"
                                value={values.maxBranches}
                                onChange={handleChange}
                                placeholder="1"
                                required
                            />

                            <Dropdown
                                label="Pricing Type"
                                name="pricingType"
                                value={values.pricingType}
                                onChange={handleChange}
                                required
                                options={[
                                    {
                                        value: 'CONTACT',
                                        label: 'Contact'
                                    },
                                    {
                                        value: 'CUSTOM',
                                        label: 'Custom'
                                    }
                                ]}
                            />

                            <DefaultInput
                                label="Monthly Price"
                                type="number"
                                name="monthlyPrice"
                                value={values.monthlyPrice}
                                onChange={handleChange}
                                placeholder="0"
                                required
                            />

                            <DefaultInput
                                label="Yearly Price"
                                type="number"
                                name="yearlyPrice"
                                value={values.yearlyPrice}
                                onChange={handleChange}
                                placeholder="0"
                                required
                            />

                        </div>

                    </div>

                    <div className="mb-6">

                        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                            <div>
                                <div className="flex items-center gap-2">

                                    <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />

                                    <h3 className="text-xs font-black uppercase tracking-[0.15em] text-violet-700">
                                        Features
                                    </h3>

                                </div>

                                <p className="mt-1 text-[10px] font-medium text-slate-400">
                                    Features included with this subscription plan
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => addArrayItem('features')}
                                className="flex w-fit items-center justify-center gap-2 rounded-xl bg-violet-50 px-3 py-2 text-[10px] font-black text-violet-600 ring-1 ring-violet-100 transition-all duration-200 hover:bg-violet-600 hover:text-white"
                            >
                                <FaPlus className="h-2.5 w-2.5" />
                                Add Feature
                            </button>

                        </div>

                        <div className="space-y-3">

                            {values.features.map((feature, index) => (

                                <div
                                    key={index}
                                    className="flex flex-col gap-2 rounded-xl bg-slate-50/60 p-3 ring-1 ring-violet-100/60 sm:flex-row sm:items-center"
                                >

                                    <div className="min-w-0 flex-1">

                                        <DefaultInput
                                            label=""
                                            name={`feature-${index}`}
                                            value={feature}
                                            onChange={(e) =>
                                                handleArrayChange(
                                                    'features',
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter feature"
                                        />

                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeArrayItem('features', index)
                                        }
                                        className="flex h-10 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-red-50 px-3 text-[10px] font-black text-red-500 ring-1 ring-red-100 transition-all duration-200 hover:bg-red-500 hover:text-white sm:mb-5 sm:h-10 sm:w-10"
                                    >
                                        <FaTrash className="h-3 w-3" />

                                        <span className="sm:hidden">
                                            Remove
                                        </span>
                                    </button>

                                </div>

                            ))}

                        </div>

                    </div>

                    <div className="mb-6">

                        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                            <div>

                                <div className="flex items-center gap-2">

                                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />

                                    <h3 className="text-xs font-black uppercase tracking-[0.15em] text-violet-700">
                                        Included Modules
                                    </h3>

                                </div>

                                <p className="mt-1 text-[10px] font-medium text-slate-400">
                                    Modules available under this plan
                                </p>

                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    addArrayItem('includedModules')
                                }
                                className="flex w-fit items-center justify-center gap-2 rounded-xl bg-cyan-50 px-3 py-2 text-[10px] font-black text-cyan-600 ring-1 ring-cyan-100 transition-all duration-200 hover:bg-cyan-500 hover:text-white"
                            >
                                <FaPlus className="h-2.5 w-2.5" />
                                Add Module
                            </button>

                        </div>

                        <div className="space-y-3">

                            {values.includedModules.map((module, index) => (

                                <div
                                    key={index}
                                    className="flex flex-col gap-2 rounded-xl bg-slate-50/60 p-3 ring-1 ring-violet-100/60 sm:flex-row sm:items-center"
                                >

                                    <div className="min-w-0 flex-1">

                                        <DefaultInput
                                            label=""
                                            name={`module-${index}`}
                                            value={module}
                                            onChange={(e) =>
                                                handleArrayChange(
                                                    'includedModules',
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter included module"
                                        />

                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeArrayItem(
                                                'includedModules',
                                                index
                                            )
                                        }
                                        className="flex h-10 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-red-50 px-3 text-[10px] font-black text-red-500 ring-1 ring-red-100 transition-all duration-200 hover:bg-red-500 hover:text-white sm:mb-5 sm:h-10 sm:w-10"
                                    >
                                        <FaTrash className="h-3 w-3" />

                                        <span className="sm:hidden">
                                            Remove
                                        </span>
                                    </button>

                                </div>

                            ))}

                        </div>

                    </div>

                    <div className="mb-6">

                        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                            <div>

                                <div className="flex items-center gap-2">

                                    <span className="h-1.5 w-1.5 rounded-full bg-lime-500" />

                                    <h3 className="text-xs font-black uppercase tracking-[0.15em] text-violet-700">
                                        AI Features
                                    </h3>

                                </div>

                                <p className="mt-1 text-[10px] font-medium text-slate-400">
                                    AI capabilities included in this plan
                                </p>

                            </div>

                            <button
                                type="button"
                                onClick={() => addArrayItem('aiFeatures')}
                                className="flex w-fit items-center justify-center gap-2 rounded-xl bg-lime-50 px-3 py-2 text-[10px] font-black text-lime-700 ring-1 ring-lime-100 transition-all duration-200 hover:bg-lime-500 hover:text-white"
                            >
                                <FaPlus className="h-2.5 w-2.5" />
                                Add AI Feature
                            </button>

                        </div>

                        <div className="space-y-3">

                            {values.aiFeatures.map((feature, index) => (

                                <div
                                    key={index}
                                    className="flex flex-col gap-2 rounded-xl bg-slate-50/60 p-3 ring-1 ring-violet-100/60 sm:flex-row sm:items-center"
                                >

                                    <div className="min-w-0 flex-1">

                                        <DefaultInput
                                            label=""
                                            name={`aiFeature-${index}`}
                                            value={feature}
                                            onChange={(e) =>
                                                handleArrayChange(
                                                    'aiFeatures',
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter AI feature"
                                        />

                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeArrayItem(
                                                'aiFeatures',
                                                index
                                            )
                                        }
                                        className="flex h-10 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-red-50 px-3 text-[10px] font-black text-red-500 ring-1 ring-red-100 transition-all duration-200 hover:bg-red-500 hover:text-white sm:mb-5 sm:h-10 sm:w-10"
                                    >
                                        <FaTrash className="h-3 w-3" />

                                        <span className="sm:hidden">
                                            Remove
                                        </span>
                                    </button>

                                </div>

                            ))}

                        </div>

                    </div>

                    <div className="mb-6 rounded-2xl bg-gradient-to-r from-violet-50 via-white to-cyan-50 p-4 ring-1 ring-violet-100/70 sm:p-5">

                        <div className="mb-4">

                            <div className="flex items-center gap-2">

                                <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />

                                <h3 className="text-xs font-black uppercase tracking-[0.15em] text-violet-700">
                                    Plan Visibility
                                </h3>

                            </div>

                            <p className="mt-1 text-[10px] font-medium text-slate-400">
                                Control how this plan is presented to customers
                            </p>

                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                            <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-white px-4 py-3 ring-1 ring-violet-100/70 transition-all duration-200 hover:bg-violet-50/50">

                                <input
                                    type="checkbox"
                                    name="isActive"
                                    checked={values.isActive}
                                    onChange={handleChange}
                                    className="h-4 w-4 accent-violet-600"
                                />

                                <div className="flex items-center gap-2">

                                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-lime-50 text-lime-600">
                                        <FaCheck className="h-3 w-3" />
                                    </span>

                                    <div>
                                        <p className="text-xs font-extrabold text-violet-950">
                                            Active Plan
                                        </p>

                                        <p className="text-[9px] font-medium text-slate-400">
                                            Available for customers
                                        </p>
                                    </div>

                                </div>

                            </label>

                            <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-white px-4 py-3 ring-1 ring-violet-100/70 transition-all duration-200 hover:bg-violet-50/50">

                                <input
                                    type="checkbox"
                                    name="isPopular"
                                    checked={values.isPopular}
                                    onChange={handleChange}
                                    className="h-4 w-4 accent-violet-600"
                                />

                                <div className="flex items-center gap-2">

                                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                                        <span className="text-[10px] font-black">
                                            P
                                        </span>
                                    </span>

                                    <div>
                                        <p className="text-xs font-extrabold text-violet-950">
                                            Popular Plan
                                        </p>

                                        <p className="text-[9px] font-medium text-slate-400">
                                            Highlight this plan
                                        </p>
                                    </div>

                                </div>

                            </label>

                        </div>

                    </div>

                    <div className="flex flex-col gap-3 border-t border-violet-50 pt-5 sm:flex-row sm:items-center sm:justify-end">

                        <DefaultButton
                            type="submit"
                            label={loading ? 'Updating Plan...' : 'Update Plan'}
                        />

                    </div>

                </form>

            </div>

        </div>
    )
}

export default UpdatePlan