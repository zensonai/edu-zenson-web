import React, { useState } from 'react'
import useForm from '../../../../hooks/useForm'
import API from '../../../../services/api'
import FileInput from '../../../../component/Form/FileInput'
import Toast from '../../../../component/Toast/Toast'
import DefaultButton from '../../../../component/Buttons/DefaultButton'

const SubmitAssigment = ({
    assigmentID,
    classID
}) => {
    const token = localStorage.getItem('access_token')
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)

    const { values, handleChange } = useForm({
        answer_sheet: null
    })

    const headleSubmitAnswerSheet = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const formData = new FormData()

            const answerSheetInput = e.currentTarget.elements.namedItem('answer_sheet')
            const answerSheet = answerSheetInput?.files?.[0]

            if (!answerSheet) {
                setToast({
                    success: false,
                    message: 'Please select your answer sheet'
                })
                setLoading(false)
                return
            }

            formData.append('answer_sheet', answerSheet)

            const res = await API.patch(`/assigments/submit-assignment/${classID}/${assigmentID}`, formData, {
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
                    window.location.reload()
                }, 3000)
            }
        } catch (err) {
            setToast({
                success: false,
                message: err.response?.data?.message || 'Failed to submit assignment'
            })
        } finally {
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

            <form onSubmit={headleSubmitAnswerSheet} className="space-y-5">
                <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                    <div className="border-b border-violet-50 bg-gradient-to-r from-violet-50/70 via-white to-white px-5 py-4 sm:px-6">
                        <div>
                            <h2 className="text-sm font-black text-violet-950">
                                Submit Assignment
                            </h2>
                            <p className="text-[11px] text-slate-400">
                                Upload your answer sheet
                            </p>
                        </div>
                    </div>

                    <div className="px-5 py-5 sm:px-6">
                        <FileInput
                            label="Answer Sheet"
                            name="answer_sheet"
                            value={values.answer_sheet}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-violet-50 via-white to-cyan-50 p-4 ring-1 ring-violet-100/70 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                    <div>
                        <p className="text-xs font-black text-violet-950">
                            Ready to submit
                        </p>
                        <p className="mt-1 text-[11px] leading-4 text-slate-500">
                            Make sure your answer sheet is selected before submitting.
                        </p>
                    </div>

                    <div className="w-full sm:w-auto">
                        <DefaultButton
                            type="submit"
                            label={loading ? 'Submitting Assignment...' : 'Submit Assignment'}
                            disabled={loading}
                            loading={loading}
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SubmitAssigment