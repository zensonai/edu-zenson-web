import React, { useEffect, useState } from 'react'
import useForm from '../../../hooks/useForm'
import Toast from '../../../component/Toast/Toast'
import { useNavigate } from 'react-router-dom'
import API from '../../../services/api'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import DefaultInput from '../../../component/Form/DefaultInput'
import TextAreaInput from '../../../component/Form/TextAreaInput'
import Dropdown from '../../../component/Form/Dropdown'
import FileInput from '../../../component/Form/FileInput'
import { useAuth } from '../../../context/AuthContext'

const CreatePayment = () => {
    const token = localStorage.getItem('access_token')
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const [plans, setPlans] = useState([])

    const { auth } = useAuth()

    useEffect(() => {
        const fetchplans = async () => {
            const res = await API.get('/plan/public-plans')

            if (res.data.success === true) {
                setPlans(res.data.result)
            }
        }

        fetchplans()
    }, [])

    const { values, handleChange } = useForm({
        ammount: '',
        payment_type: '',
        descpition: '',
        payment_reference: '',
        billingCycle: '',
        planID: '',
        payment_proof: null
    })

    const headleSubmitPayment = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const formData = new FormData()

            formData.append('ammount', Number(values.ammount))
            formData.append('payment_type', values.payment_type)
            formData.append('descpition', values.descpition)
            formData.append('payment_reference', values.payment_reference)

            if (values.payment_type === 'INSTITUTE_PLAN_PAYMENT') {
                formData.append('billingCycle', values.billingCycle)
                formData.append('planID', values.planID)
            }

            const paymentProofInput = e.currentTarget.elements.namedItem('payment_proof')
            const paymentProof = paymentProofInput?.files?.[0]

            if (paymentProof) {
                formData.append('payment_proof', paymentProof)
            }

            const res = await API.post('/payment/create-payment', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message
                })

                setTimeout(() => {
                    navigate('/dashboard/my-payments')
                }, 3000)
            }
        } catch (err) {
            setToast({
                success: false,
                message: err.response?.data?.message || 'Failed to create payment'
            })
        } finally {
            setLoading(false)
        }
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

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div className="mb-2 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-violet-400">
                            Education SaaS {auth?.user?.role} INSTITUTE_ADMIN
                        </p>
                    </div>

                    <h1 className="text-xl font-black tracking-tight text-violet-950">
                        Create Payment
                    </h1>

                    <p className="mt-1 text-sm font-medium text-slate-400">
                        Create a new payment for your institution
                    </p>
                </div>

                <div className="flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-violet-50 to-cyan-50 px-4 py-2.5">
                    <span className="h-2 w-2 rounded-full bg-lime-400" />
                    <span className="text-xs font-bold text-violet-700">
                        New Payment
                    </span>
                </div>
            </div>

            <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-violet-100/70">
                <div className="border-b border-violet-50 bg-gradient-to-r from-violet-50 via-white to-cyan-50 px-5 py-4 sm:px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 text-white shadow-md shadow-violet-200">
                            <span className="text-sm font-black">Z</span>
                        </div>

                        <div>
                            <h2 className="text-sm font-black text-violet-950">
                                Payment Configuration
                            </h2>

                            <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                                Configure payment details and subscription information
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={headleSubmitPayment} className="p-5 sm:p-6">
                    <div className="mb-6">
                        <div className="mb-4 flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                            <h3 className="text-xs font-black uppercase tracking-[0.15em] text-violet-700">
                                Payment Information
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <DefaultInput
                                label="Amount"
                                name="ammount"
                                type="number"
                                value={values.ammount}
                                onChange={handleChange}
                                placeholder="Enter payment amount"
                                required
                            />

                            <Dropdown
                                label="Payment Type"
                                name="payment_type"
                                value={values.payment_type}
                                onChange={handleChange}
                                required
                                options={[
                                    ...(auth?.user?.role === 'INSTITUTE_ADMIN'
                                        ? [
                                            {
                                                value: 'INSTITUTE_PLAN_PAYMENT',
                                                label: 'Institute Plan Payment'
                                            }
                                        ]
                                        : []),
                                    {
                                        value: 'STUDENT_COURSE_PAYMENT',
                                        label: 'Student Course Payment'
                                    },
                                    {
                                        value: 'STUDENT_ENROLLMENT_PAYMENT',
                                        label: 'Student Enrollment Payment'
                                    },
                                    {
                                        value: 'COURSE_PAYMENT',
                                        label: 'Course Payment'
                                    },
                                    {
                                        value: 'EXAM_PAYMENT',
                                        label: 'Exam Payment'
                                    },
                                    {
                                        value: 'CERTIFICATE_PAYMENT',
                                        label: 'Certificate Payment'
                                    },
                                    {
                                        value: 'OTHER_PAYMENT',
                                        label: 'Other Payment'
                                    }
                                ]}
                            />

                            <DefaultInput
                                label="Payment Reference"
                                name="payment_reference"
                                value={values.payment_reference}
                                onChange={handleChange}
                                placeholder="Enter payment reference"
                                required
                            />

                            {values.payment_type === 'INSTITUTE_PLAN_PAYMENT' && (
                                <>
                                    <Dropdown
                                        label="Plan"
                                        name="planID"
                                        value={values.planID}
                                        onChange={handleChange}
                                        required
                                        options={[
                                            ...plans.map((plan) => ({
                                                value: plan._id,
                                                label: plan.name
                                            }))
                                        ]}
                                    />

                                    <Dropdown
                                        label="Billing Cycle"
                                        name="billingCycle"
                                        value={values.billingCycle}
                                        onChange={handleChange}
                                        required
                                        options={[
                                            {
                                                value: 'MONTHLY',
                                                label: 'Monthly'
                                            },
                                            {
                                                value: 'YEARLY',
                                                label: 'Yearly'
                                            }
                                        ]}
                                    />
                                </>
                            )}
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="mb-4 flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                            <h3 className="text-xs font-black uppercase tracking-[0.15em] text-violet-700">
                                Payment Description
                            </h3>
                        </div>

                        <TextAreaInput
                            label="Description"
                            name="descpition"
                            value={values.descpition}
                            onChange={handleChange}
                            placeholder="Enter payment description"
                            rows={4}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <div className="mb-4 flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-lime-500" />
                            <h3 className="text-xs font-black uppercase tracking-[0.15em] text-violet-700">
                                Payment Proof
                            </h3>
                        </div>

                        <div className="rounded-2xl bg-gradient-to-r from-violet-50 via-white to-cyan-50 p-4 ring-1 ring-violet-100/70 sm:p-5">
                            <FileInput
                                label="Payment Proof"
                                name="payment_proof"
                                value={values.payment_proof}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {values.payment_type === 'INSTITUTE_PLAN_PAYMENT' && (
                        <div className="mb-6 rounded-2xl bg-gradient-to-r from-violet-50 via-white to-cyan-50 p-4 ring-1 ring-violet-100/70 sm:p-5">
                            <div className="mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-lime-500" />
                                    <h3 className="text-xs font-black uppercase tracking-[0.15em] text-violet-700">
                                        Selected Plan
                                    </h3>
                                </div>

                                <p className="mt-1 text-[10px] font-medium text-slate-400">
                                    Selected subscription plan and billing cycle for this payment
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div className="rounded-xl bg-white px-4 py-3 ring-1 ring-violet-100/70">
                                    <p className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-400">
                                        Plan
                                    </p>

                                    <p className="mt-1 text-xs font-extrabold text-violet-950">
                                        {plans.find((plan) => plan._id === values.planID)?.name || 'No plan selected'}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-white px-4 py-3 ring-1 ring-violet-100/70">
                                    <p className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-400">
                                        Billing Cycle
                                    </p>

                                    <p className="mt-1 text-xs font-extrabold text-violet-950">
                                        {values.billingCycle || 'No billing cycle selected'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col gap-3 border-t border-violet-50 pt-5 sm:flex-row sm:items-center sm:justify-end">
                        <DefaultButton
                            type="submit"
                            label={loading ? 'Creating Payment...' : 'Create Payment'}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatePayment