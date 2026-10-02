import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    FaFilePdf,
    FaClipboardList,
    FaGraduationCap,
    FaCalendarDays,
    FaCircleCheck,
    FaFileLines,
    FaLock
} from 'react-icons/fa6'
import API from '../../../../services/api'
import UpdateAssigment from './UpdateAssigment'
import { useAuth } from '../../../../context/AuthContext'
import SubmitAssigment from '../../studentDash/assignments/SubmitAssigment'
import AnswerSheets from './AnswerSheets'

const ViewAssignment = () => {
    const [loadError, setLoadError] = useState('')
    const { id } = useParams()
    const token = localStorage.getItem('access_token')
    const [assigment, setAssigment] = useState(null)
    const [mysubmissions, setMysubmissions] = useState([])
    const [loading, setLoading] = useState(true)
    const { auth } = useAuth()

    const isTeacher = auth?.user?.role === 'TEACHER'

    const endpoint = isTeacher
        ? `/assigments/fetch-my-assgnmnet/${id}`
        : `/assigments/student-assigment/${id}`

    useEffect(() => {
        const fetchassignment = async () => {
            setLoadError('')
            setLoading(true)
            try {
                const res = await API.get(endpoint, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (res.data.success === true) {
                    setAssigment(res.data.result)
                }
            } catch (err) {
                const message = err.response?.data?.message
                setLoadError(Array.isArray(message) ? message.join(' ') : message || 'Unable to load this record. Please try again.')
            } finally {
                setLoading(false)
            }
        }

        if (token && id && auth?.user?.role) {
            fetchassignment()
        }
    }, [token, id, auth?.user?.role])

    useEffect(() => {
        const fetchMySubmissions = async () => {
            const res = await API.get('/assigments/fetch-student-subissions', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (res.data.success === true) {
                setMysubmissions(res.data.result || [])
            }
        }

        if (token && !isTeacher) {
            fetchMySubmissions()
        }
    }, [token, isTeacher])

    const currentSubmission = mysubmissions.find((submission) => {
        const submissionAssignmentID =
            submission.assigment?._id || submission.assigment

        return submissionAssignmentID?.toString() === id?.toString()
    })

    const hasSubmitted = Boolean(currentSubmission)

    if (loadError) {
        return (
            <div className="w-full bg-white p-4">
                <p role="alert" className="text-sm text-slate-700">{loadError}</p>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="w-full min-w-0 max-w-full overflow-hidden bg-white p-3 sm:p-4">
                <div className="mb-6">
                    <div className="mb-2 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />

                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-violet-400">
                            Education SaaS
                        </p>
                    </div>

                    <h1 className="text-xl font-black tracking-tight text-violet-950">
                        Assignment Details
                    </h1>

                    <p className="mt-1 text-sm font-medium text-slate-400">
                        Loading assignment details
                    </p>
                </div>

                <div className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-violet-100/70">
                    <div className="mx-auto h-10 w-10 animate-pulse rounded-xl bg-violet-100" />

                    <p className="mt-4 text-xs font-bold text-slate-400">
                        Loading assignment...
                    </p>
                </div>
            </div>
        )
    }

    if (!assigment) {
        return (
            <div className="w-full min-w-0 max-w-full overflow-hidden bg-white p-3 sm:p-4">
                <div className="mb-6">
                    <div className="mb-2 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />

                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-violet-400">
                            Education SaaS
                        </p>
                    </div>

                    <h1 className="text-xl font-black tracking-tight text-violet-950">
                        Assignment Details
                    </h1>
                </div>

                <div className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-violet-100/70">
                    <FaClipboardList className="mx-auto h-8 w-8 text-violet-300" />

                    <p className="mt-4 text-sm font-bold text-slate-400">
                        Assignment not found
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full min-w-0 max-w-full overflow-hidden bg-white p-3 sm:p-4">
            <div className="mb-5 flex min-w-0 flex-col gap-4 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
                <div className="min-w-0">
                    <div className="mb-2 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />

                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-violet-400">
                            Education SaaS
                        </p>
                    </div>

                    <h1 className="text-xl font-black tracking-tight text-violet-950">
                        Assignment Details
                    </h1>

                    <p className="mt-1 text-sm font-medium text-slate-400">
                        View assignment and class information
                    </p>
                </div>

                <div className="flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-violet-50 to-cyan-50 px-4 py-2.5">
                    <span className="h-2 w-2 rounded-full bg-lime-400" />

                    <span className="text-xs font-bold text-violet-700">
                        Assignment
                    </span>
                </div>
            </div>

            <div className="space-y-5">
                <div className="w-full min-w-0 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-violet-100/70">
                    <div className="bg-gradient-to-r from-violet-600 via-violet-600 to-cyan-500 px-5 py-6 sm:px-7">
                        <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex min-w-0 items-center gap-4">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-xl font-black text-white shadow-lg ring-1 ring-white/20 backdrop-blur-sm">
                                    <FaClipboardList className="h-6 w-6" />
                                </div>

                                <div className="min-w-0">
                                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                                        <h2 className="max-w-full break-words text-xl font-black text-white">
                                            {assigment.name || 'Assignment'}
                                        </h2>

                                        <span className="inline-flex max-w-full break-all rounded-lg bg-white/15 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white ring-1 ring-white/20">
                                            Assignment
                                        </span>
                                    </div>

                                    <p className="mt-1 text-xs font-medium text-violet-100">
                                        Assignment information and academic details
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 self-start rounded-xl bg-white/10 px-3 py-2 ring-1 ring-white/20 sm:self-auto">
                                <span className="h-2 w-2 rounded-full bg-lime-300" />

                                <span className="text-[10px] font-black uppercase tracking-wider text-white">
                                    Active
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 sm:p-7">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="min-w-0 rounded-xl bg-gradient-to-br from-violet-50 to-white p-4 ring-1 ring-violet-100/70">
                                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                    Assignment Name
                                </p>

                                <div className="mt-2 flex min-w-0 items-start gap-2">
                                    <FaClipboardList className="mt-0.5 h-3 w-3 shrink-0 text-violet-500" />

                                    <p className="min-w-0 break-words text-sm font-black text-violet-950">
                                        {assigment.name || '-'}
                                    </p>
                                </div>
                            </div>

                            <div className="min-w-0 rounded-xl bg-gradient-to-br from-cyan-50 to-white p-4 ring-1 ring-cyan-100/70">
                                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-cyan-500">
                                    Class
                                </p>

                                <div className="mt-2 flex min-w-0 items-start gap-2">
                                    <FaGraduationCap className="mt-0.5 h-3 w-3 shrink-0 text-cyan-500" />

                                    <p className="min-w-0 break-words text-sm font-black text-violet-950">
                                        {assigment.class?.class_name || '-'}
                                    </p>
                                </div>
                            </div>

                            <div className="min-w-0 rounded-xl bg-gradient-to-br from-lime-50 to-white p-4 ring-1 ring-lime-100/70">
                                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-lime-600">
                                    Due Date
                                </p>

                                <div className="mt-2 flex items-center gap-2">
                                    <FaCalendarDays className="h-3 w-3 shrink-0 text-lime-500" />

                                    <p className="text-sm font-black text-violet-950">
                                        {assigment.due_date
                                            ? new Date(assigment.due_date).toLocaleDateString()
                                            : '-'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-2">
                    <div className="min-w-0 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-violet-100/70">
                        <div className="flex items-center gap-3 border-b border-violet-50 bg-gradient-to-r from-violet-50 via-white to-cyan-50 px-5 py-4">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                                <FaFileLines className="h-3.5 w-3.5" />
                            </div>

                            <div className="min-w-0">
                                <h3 className="text-xs font-black uppercase tracking-[0.12em] text-violet-950">
                                    Assignment Information
                                </h3>

                                <p className="mt-0.5 text-[9px] font-medium text-slate-400">
                                    Assignment description and details
                                </p>
                            </div>
                        </div>

                        <div className="p-4 sm:p-5">
                            <div className="space-y-2">
                                <div className="flex min-w-0 flex-col gap-1 rounded-xl bg-slate-50/60 px-3 py-3 ring-1 ring-violet-100/50 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="shrink-0 text-[9px] font-black uppercase tracking-wider text-violet-400">
                                        Assignment ID
                                    </p>

                                    <p className="break-all text-xs font-bold text-violet-950 sm:text-right">
                                        {assigment._id || '-'}
                                    </p>
                                </div>

                                <div className="flex min-w-0 flex-col gap-1 rounded-xl bg-slate-50/60 px-3 py-3 ring-1 ring-violet-100/50">
                                    <p className="shrink-0 text-[9px] font-black uppercase tracking-wider text-violet-400">
                                        Description
                                    </p>

                                    <p className="break-words text-xs font-bold leading-5 text-violet-950">
                                        {assigment.description || '-'}
                                    </p>
                                </div>

                                <div className="flex min-w-0 flex-col gap-1 rounded-xl bg-slate-50/60 px-3 py-3 ring-1 ring-violet-100/50 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="shrink-0 text-[9px] font-black uppercase tracking-wider text-violet-400">
                                        Due Date
                                    </p>

                                    <p className="break-all text-xs font-bold text-violet-950 sm:text-right">
                                        {assigment.due_date
                                            ? new Date(assigment.due_date).toLocaleString()
                                            : '-'}
                                    </p>
                                </div>

                                <div className="flex min-w-0 flex-col gap-1 rounded-xl bg-slate-50/60 px-3 py-3 ring-1 ring-violet-100/50 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="shrink-0 text-[9px] font-black uppercase tracking-wider text-violet-400">
                                        Created At
                                    </p>

                                    <p className="break-all text-xs font-bold text-violet-950 sm:text-right">
                                        {assigment.createdAt
                                            ? new Date(assigment.createdAt).toLocaleString()
                                            : '-'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="min-w-0 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-violet-100/70">
                        <div className="flex items-center gap-3 border-b border-violet-50 bg-gradient-to-r from-violet-50 via-white to-cyan-50 px-5 py-4">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
                                <FaFilePdf className="h-3.5 w-3.5" />
                            </div>

                            <div className="min-w-0">
                                <h3 className="text-xs font-black uppercase tracking-[0.12em] text-violet-950">
                                    Assignment Document
                                </h3>

                                <p className="mt-0.5 text-[9px] font-medium text-slate-400">
                                    Assignment document attached to this assignment
                                </p>
                            </div>
                        </div>

                        <div className="p-4 sm:p-5">
                            <div className="rounded-xl bg-gradient-to-br from-red-50 via-white to-violet-50 p-5 ring-1 ring-red-100/70">
                                <div className="flex flex-col items-center text-center">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500 shadow-sm ring-1 ring-red-100">
                                        <FaFilePdf className="h-6 w-6" />
                                    </div>

                                    <p className="mt-3 break-all text-xs font-black text-violet-950">
                                        {assigment.assigment_docs || 'Assignment Document'}
                                    </p>

                                    <a
                                        href={`${import.meta.env.VITE_APP_API_FILES}/uploads/assigments/${assigment.assigment_docs}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-[10px] font-black uppercase tracking-wider text-white transition-all duration-200 hover:bg-red-600"
                                    >
                                        <FaFilePdf className="h-3.5 w-3.5" />
                                        Open Assignment PDF
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="min-w-0 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-violet-100/70">
                    <div className="flex items-center gap-3 border-b border-violet-50 bg-gradient-to-r from-violet-50 via-white to-cyan-50 px-5 py-4">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                            <FaGraduationCap className="h-3.5 w-3.5" />
                        </div>

                        <div className="min-w-0">
                            <h3 className="text-xs font-black uppercase tracking-[0.12em] text-violet-950">
                                Class Information
                            </h3>

                            <p className="mt-0.5 text-[9px] font-medium text-slate-400">
                                Class details associated with this assignment
                            </p>
                        </div>
                    </div>

                    <div className="p-4 sm:p-5">
                        <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="min-w-0 rounded-xl bg-gradient-to-br from-violet-50/60 via-white to-cyan-50/40 px-4 py-3 ring-1 ring-violet-100/60">
                                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-violet-400">
                                    Class Name
                                </p>

                                <p className="mt-2 break-words text-sm font-black text-violet-950">
                                    {assigment.class?.class_name || '-'}
                                </p>
                            </div>

                            <div className="min-w-0 rounded-xl bg-gradient-to-br from-cyan-50/60 via-white to-violet-50/40 px-4 py-3 ring-1 ring-cyan-100/60">
                                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-cyan-500">
                                    Class Description
                                </p>

                                <p className="mt-2 break-words text-sm font-black text-violet-950">
                                    {assigment.class?.description || '-'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    isTeacher ?
                        <AnswerSheets
                            assigmentID={id}
                        />
                        :
                        <div className=""></div>
                }

                {
                    isTeacher ?
                        <div className="">
                            <UpdateAssigment
                                token={token}
                                assigmntData={assigment}
                                assgmentID={id}
                            />
                        </div>
                        :
                        new Date(assigment.due_date) > new Date() ?
                            <div className="space-y-4">
                                {
                                    hasSubmitted &&
                                    <div className="w-full overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
                                        <div className="border-b border-emerald-50 bg-gradient-to-r from-emerald-50 via-white to-cyan-50 px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                                                    <FaCircleCheck className="h-4 w-4" />
                                                </div>

                                                <div className="min-w-0">
                                                    <h3 className="text-sm font-black uppercase tracking-[0.12em] text-emerald-950">
                                                        Assignment Submitted
                                                    </h3>

                                                    <p className="mt-1 text-[10px] font-medium text-slate-400">
                                                        Your answer sheet has already been submitted for this assignment.
                                                    </p>
                                                </div>

                                                <div className="ml-auto flex shrink-0 items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5">
                                                    <FaCircleCheck className="h-3 w-3 text-emerald-600" />

                                                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700">
                                                        Submitted
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-5">
                                            <div className="flex flex-col gap-4 rounded-xl bg-emerald-50/50 p-4 ring-1 ring-emerald-100 sm:flex-row sm:items-center sm:justify-between">
                                                <div className="flex min-w-0 items-center gap-3">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-red-500 shadow-sm ring-1 ring-emerald-100">
                                                        <FaFilePdf className="h-4 w-4" />
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="text-[9px] font-black uppercase tracking-wider text-emerald-600">
                                                            Submitted Answer Sheet
                                                        </p>
                                                        <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                                                            <p className="break-all text-xs font-bold text-violet-950">
                                                                {currentSubmission.answer_sheet || 'Answer sheet submitted'}
                                                            </p>

                                                            {currentSubmission.answer_sheet && (
                                                                <a
                                                                    href={`${import.meta.env.VITE_APP_API_FILES}/uploads/answer_sheets/${currentSubmission.answer_sheet}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg bg-violet-600 px-3 py-1.5 text-[9px] font-black uppercase tracking-wider text-white transition-all duration-200 hover:bg-violet-700"
                                                                >
                                                                    <FaFilePdf className="h-3 w-3" />
                                                                    View
                                                                </a>
                                                            )}
                                                        </div>

                                                    </div>

                                                </div>

                                                {
                                                    currentSubmission.submitted_at &&
                                                    <p className="text-[10px] font-medium text-slate-400 sm:text-right">
                                                        Submitted on{' '}
                                                        {new Date(currentSubmission.submitted_at).toLocaleString()}
                                                    </p>
                                                }
                                            </div>
                                        </div>

                                        <div className="mt-4 rounded-xl border border-red-100 bg-red-50/60 px-4 py-3">
                                            <p className="font-bold leading-5 text-red-600">
                                                If you need to update your answer sheet, upload a new document using the form below. Your current document will be replaced with the newly uploaded document.
                                            </p>
                                        </div>
                                    </div>
                                }

                                <SubmitAssigment
                                    assigmentID={id}
                                    classID={assigment.class?._id}
                                />
                            </div>
                            :
                            <div className="w-full overflow-hidden rounded-2xl border border-red-100 bg-white shadow-sm">
                                <div className="border-b border-red-50 bg-gradient-to-r from-red-50 via-white to-orange-50 px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-500">
                                            <FaLock className="h-4 w-4" />
                                        </div>

                                        <div className="min-w-0">
                                            <h3 className="text-sm font-black uppercase tracking-[0.12em] text-red-950">
                                                Submission Closed
                                            </h3>

                                            <p className="mt-1 text-[10px] font-medium text-slate-400">
                                                The deadline for this assignment has passed.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5">
                                    <div className="flex items-center justify-between rounded-xl bg-red-50/60 p-4 ring-1 ring-red-100">
                                        <div>
                                            <p className="text-xs font-black text-red-950">
                                                Deadline Passed
                                            </p>

                                            <p className="mt-1 text-[10px] font-medium text-red-500">
                                                New submissions are no longer accepted.
                                            </p>
                                        </div>

                                        <FaLock className="h-5 w-5 text-red-400" />
                                    </div>
                                </div>
                            </div>
                }
            </div>
        </div>
    )
}

export default ViewAssignment