import React, { useState } from 'react'
import useForm from '../../../hooks/useForm'
import API from '../../../services/api'
import Toast from '../../../component/Toast/Toast'

const UpdatePayment = ({
    token,
    paymentdata,
    paymentID
}) => {
    const [toast, setToast] = useState(false)
    const [approveloading, setApproveLoading] = useState(false)
    const [rejectloading, setRejectLoading] = useState(false)

    const { values, handleChange } = useForm({
        reject_reson: '',
    })

    const headleApprovePayment = async (e) => {
        e.preventDefault();
        setApproveLoading(true)

        try {
            const res = await API.patch(`/payment/approve-payment/${paymentID}`, {}, {
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
            });
        }
        finally {
            setApproveLoading(false)
        }
    }

    const headlerRejectPayment = async (e) => {
        e.preventDefault();
        setApproveLoading(true)

        try {
            const res = await API.patch(`/payment/reject-payment/${paymentID}`, { values }, {
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
            });
        }
        finally {
            setApproveLoading(false)
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

            <div className="mb-6">

                <div className="mb-2 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />

                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-violet-400">
                        Education SaaS
                    </p>
                </div>

                <h1 className="text-xl font-black tracking-tight text-violet-950">
                    Update Payment
                </h1>

                <p className="mt-1 text-sm font-medium text-slate-400">
                    Review and update payment status
                </p>

            </div>

            <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-violet-100/70">

                <div className="border-b border-violet-50 bg-gradient-to-r from-violet-50 via-white to-cyan-50 px-5 py-4 sm:px-6">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 text-white shadow-md shadow-violet-200">
                            <span className="text-sm font-black">
                                P
                            </span>
                        </div>

                        <div>
                            <h2 className="text-sm font-black text-violet-950">
                                Payment Update
                            </h2>

                            <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                                Approve or reject this payment record
                            </p>
                        </div>

                    </div>

                </div>

                <form className="p-5 sm:p-6">

                    <div className="mb-6">

                        <div className="mb-4 flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />

                            <h3 className="text-xs font-black uppercase tracking-[0.15em] text-violet-700">
                                Payment Information
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                            <div className="rounded-xl bg-slate-50/60 p-4 ring-1 ring-violet-100/60">
                                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                    Payment Type
                                </p>

                                <p className="mt-2 text-sm font-black text-violet-950">
                                    {paymentdata?.payment_type || '-'}
                                </p>
                            </div>

                            <div className="rounded-xl bg-slate-50/60 p-4 ring-1 ring-violet-100/60">
                                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                    Amount
                                </p>

                                <p className="mt-2 text-sm font-black text-violet-950">
                                    {paymentdata?.ammout || '-'}
                                </p>
                            </div>

                            <div className="rounded-xl bg-slate-50/60 p-4 ring-1 ring-violet-100/60">
                                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                    Payment Status
                                </p>

                                <p className="mt-2 text-sm font-black text-violet-950">
                                    {paymentdata?.payment_status || '-'}
                                </p>
                            </div>

                            <div className="rounded-xl bg-slate-50/60 p-4 ring-1 ring-violet-100/60">
                                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                    User Email
                                </p>

                                <p className="mt-2 break-all text-sm font-black text-violet-950">
                                    {paymentdata?.userId?.email || '-'}
                                </p>
                            </div>

                        </div>

                    </div>

                    <div className="mb-6 rounded-2xl bg-gradient-to-r from-violet-50 via-white to-cyan-50 p-4 ring-1 ring-violet-100/70 sm:p-5">

                        <div className="mb-4">

                            <div className="flex items-center gap-2">

                                <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />

                                <h3 className="text-xs font-black uppercase tracking-[0.15em] text-violet-700">
                                    Reject Payment
                                </h3>

                            </div>

                            <p className="mt-1 text-[10px] font-medium text-slate-400">
                                Provide a reason if this payment needs to be rejected
                            </p>

                        </div>

                        <textarea
                            name="reject_reson"
                            value={values.reject_reson}
                            onChange={handleChange}
                            placeholder="Enter rejection reason"
                            rows={4}
                            className="w-full rounded-xl border-0 bg-white px-4 py-3 text-sm font-medium text-violet-950 outline-none ring-1 ring-violet-100 transition-all duration-200 placeholder:text-slate-300 focus:ring-2 focus:ring-violet-400"
                        />

                    </div>

                    <div className="flex flex-col gap-3 border-t border-violet-50 pt-5 sm:flex-row sm:items-center sm:justify-end">

                        <button
                            type="button"
                            onClick={headlerRejectPayment}
                            disabled={rejectloading}
                            className="flex items-center justify-center rounded-xl bg-red-50 px-5 py-3 text-xs font-black text-red-500 ring-1 ring-red-100 transition-all duration-200 hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {rejectloading ? 'Rejecting Payment...' : 'Reject Payment'}
                        </button>

                        <button
                            type="button"
                            onClick={headleApprovePayment}
                            disabled={approveloading}
                            className="flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-3 text-xs font-black text-white shadow-md shadow-violet-200 transition-all duration-200 hover:from-violet-700 hover:to-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {approveloading ? 'Approving Payment...' : 'Approve Payment'}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default UpdatePayment