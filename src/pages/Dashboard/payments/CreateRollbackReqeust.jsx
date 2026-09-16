import React, { useState } from 'react'
import API from '../../../services/api'
import useForm from '../../../hooks/useForm'
import Toast from '../../../component/Toast/Toast'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import TextAreaInput from '../../../component/Form/TextAreaInput'

const CreateRollbackReqeust = ({ id }) => {
    const token = localStorage.getItem('access_token')

    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)

    const { values, handleChange } = useForm({
        descpition: '',
    });

    const headleCreateRollbackRequest = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const res = await API.post(`/payment/payment-rollback-reqeust/${id}`, values, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
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
                            Education SaaS
                        </p>
                    </div>

                    <h1 className="text-xl font-black tracking-tight text-violet-950">
                        Create Rollback Request
                    </h1>

                    <p className="mt-1 text-sm font-medium text-slate-400">
                        Submit a request to rollback this payment
                    </p>

                </div>

                <div className="flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-violet-50 to-cyan-50 px-4 py-2.5">

                    <span className="h-2 w-2 rounded-full bg-amber-400" />

                    <span className="text-xs font-bold text-violet-700">
                        Rollback Request
                    </span>

                </div>

            </div>

            <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-violet-100/70">

                <div className="border-b border-violet-50 bg-gradient-to-r from-violet-50 via-white to-cyan-50 px-5 py-4 sm:px-6">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 text-white shadow-md shadow-violet-200">

                            <span className="text-sm font-black">
                                R
                            </span>

                        </div>

                        <div>

                            <h2 className="text-sm font-black text-violet-950">
                                Rollback Request Configuration
                            </h2>

                            <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                                Provide the reason for requesting this payment rollback
                            </p>

                        </div>

                    </div>

                </div>

                <form onSubmit={headleCreateRollbackRequest} className="p-5 sm:p-6">

                    <div className="mb-6">

                        <div className="mb-4 flex items-center gap-2">

                            <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />

                            <h3 className="text-xs font-black uppercase tracking-[0.15em] text-violet-700">
                                Rollback Information
                            </h3>

                        </div>

                        <div className="rounded-2xl bg-gradient-to-r from-violet-50 via-white to-cyan-50 p-4 ring-1 ring-violet-100/70 sm:p-5">

                            <TextAreaInput
                                label="Rollback Description"
                                name="descpition"
                                value={values.descpition}
                                onChange={handleChange}
                                placeholder="Enter the reason for requesting the payment rollback"
                                rows={5}
                                required
                            />

                        </div>

                    </div>

                    <div className="flex flex-col gap-3 border-t border-violet-50 pt-5 sm:flex-row sm:items-center sm:justify-end">

                        <DefaultButton
                            type="submit"
                            label={loading ? 'Creating Request...' : 'Create Rollback Request'}
                        />

                    </div>

                </form>

            </div>

        </div>
    )
}

export default CreateRollbackReqeust