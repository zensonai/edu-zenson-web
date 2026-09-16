import React, { useEffect, useState } from 'react'
import API from '../../../../services/api'
import useForm from '../../../../hooks/useForm'
import DefaultInput from '../../../../component/Form/DefaultInput'
import DefaultButton from '../../../../component/Buttons/DefaultButton'
import Toast from '../../../../component/Toast/Toast'

const AnswerSheets = ({ assigmentID }) => {
    const token = localStorage.getItem('access_token')
    const [answersheets, setAnswersheets] = useState([])
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(null)

    const { values, handleChange } = useForm({
        marks: '',
    })

    useEffect(() => {
        const fetchsubmssions = async () => {
            const res = await API.get(`/assigments/fetch-submitted-submissions/${assigmentID}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (res.data.success === true) {
                setAnswersheets(res.data.result || [])
            }
        }

        if (token && assigmentID) fetchsubmssions()
    }, [token, assigmentID])

    const headleSubmitMarsk = async (e, submissionID) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await API.post(`/assigments/submission-marks/${submissionID}`, values, {
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
        } catch (err) {
            setToast({
                success: false,
                message: err.response?.data?.message || 'Failed to submit marks'
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
                            Education SaaS
                        </p>
                    </div>

                    <h1 className="text-xl font-black tracking-tight text-violet-950">
                        Submitted Answer Sheets
                    </h1>

                    <p className="mt-1 text-sm font-medium text-slate-400">
                        Review student submissions and assign marks
                    </p>
                </div>

                <div className="flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-violet-50 to-cyan-50 px-4 py-2.5">
                    <span className="h-2 w-2 rounded-full bg-lime-400" />

                    <span className="text-xs font-bold text-violet-700">
                        Submissions
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
                                Student Submissions
                            </h2>

                            <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                                Review submitted documents and enter marks
                            </p>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px]">
                        <thead>
                            <tr className="border-b border-violet-100 bg-slate-50/70">
                                <th className="px-5 py-3 text-left text-[9px] font-black uppercase tracking-wider text-violet-400">
                                    Student
                                </th>

                                <th className="px-5 py-3 text-left text-[9px] font-black uppercase tracking-wider text-violet-400">
                                    Submitted At
                                </th>

                                <th className="px-5 py-3 text-left text-[9px] font-black uppercase tracking-wider text-violet-400">
                                    Answer Sheet
                                </th>

                                <th className="px-5 py-3 text-left text-[9px] font-black uppercase tracking-wider text-violet-400">
                                    Marks for assigment
                                </th>

                                <th className="px-5 py-3 text-left text-[9px] font-black uppercase tracking-wider text-violet-400">
                                    Marks
                                </th>

                                <th className="px-5 py-3 text-left text-[9px] font-black uppercase tracking-wider text-violet-400">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {answersheets.length > 0 ? (
                                answersheets.map((submission) => (
                                    <tr
                                        key={submission._id}
                                        className="border-b border-slate-100 last:border-b-0"
                                    >
                                        <td className="px-5 py-4">
                                            <p className="text-xs font-black text-violet-950">
                                                {submission.submitted_by?.name ||
                                                    submission.submitted_by?.fullName ||
                                                    submission.submitted_by?.email ||
                                                    '-'}
                                            </p>
                                        </td>

                                        <td className="px-5 py-4">
                                            <p className="text-xs font-medium text-slate-500">
                                                {submission.submitted_at
                                                    ? new Date(submission.submitted_at).toLocaleString()
                                                    : '-'}
                                            </p>
                                        </td>

                                        <td className="px-5 py-4">
                                            {submission.answer_sheet ? (
                                                <a
                                                    href={`${import.meta.env.VITE_APP_API_FILES}/uploads/answer_sheets/${submission.answer_sheet}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center rounded-lg bg-red-50 px-3 py-2 text-[9px] font-black uppercase tracking-wider text-red-600 transition hover:bg-red-100"
                                                >
                                                    View Document
                                                </a>
                                            ) : (
                                                <span className="text-xs font-medium text-slate-400">
                                                    No document
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-5 py-4">
                                            {submission.marks || '-'}
                                        </td>

                                        <td className="px-5 py-4">
                                            <form
                                                onSubmit={(e) => headleSubmitMarsk(e, submission._id)}
                                                className="w-32"
                                            >
                                                <DefaultInput
                                                    name="marks"
                                                    type="number"
                                                    value={values.marks}
                                                    onChange={handleChange}
                                                    placeholder="Enter marks"
                                                    required
                                                />
                                            </form>
                                        </td>

                                        <td className="px-5 py-4">
                                            <form
                                                onSubmit={(e) => headleSubmitMarsk(e, submission._id)}
                                            >
                                                <DefaultButton
                                                    type="submit"
                                                    label={loading ? 'Saving...' : 'Save Marks'}
                                                    disabled={loading}
                                                />
                                            </form>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="px-5 py-12 text-center"
                                    >
                                        <p className="text-sm font-black text-violet-950">
                                            No submissions found
                                        </p>

                                        <p className="mt-1 text-[10px] font-medium text-slate-400">
                                            Students have not submitted this assignment yet.
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AnswerSheets