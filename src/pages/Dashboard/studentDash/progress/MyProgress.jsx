import React, { useEffect, useMemo, useState } from 'react'
import API from '../../../../services/api'
import BarChart from '../../../../component/Dashboard/Charts/BarChart'
import LineChart from '../../../../component/Dashboard/Charts/LineChart'
import ProgressCircle from '../../../../component/Dashboard/Charts/ProgressCircle'
import {
    FaArrowTrendUp,
    FaBookOpen,
    FaClock,
    FaFileCircleCheck,
    FaGraduationCap,
    FaPercent,
    FaSpinner
} from 'react-icons/fa6'

const MyProgress = () => {
    const token = localStorage.getItem('access_token')

    const [mysubmissions, setMysubmissions] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMySubmissions = async () => {
            try {
                setLoading(true)

                const res = await API.get('/assigments/fetch-student-subissions', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (res.data.success === true) {
                    setMysubmissions(res.data.result || [])
                }
            } catch (error) {
                setMysubmissions([])
            } finally {
                setLoading(false)
            }
        }

        if (token) {
            fetchMySubmissions()
        } else {
            setLoading(false)
        }
    }, [token])

    const submissionStats = useMemo(() => {
        const total = mysubmissions.length

        const gradedSubmissions = mysubmissions.filter((item) => {
            return (
                item.marks !== undefined &&
                item.marks !== null &&
                item.marks !== '' &&
                Number.isFinite(Number(item.marks))
            )
        })

        const graded = gradedSubmissions.length

        const pending = Math.max(total - graded, 0)

        const totalMarks = gradedSubmissions.reduce((sum, item) => {
            return sum + Number(item.marks)
        }, 0)

        const averageMarks = graded > 0
            ? totalMarks / graded
            : 0

        const marksPercentage = Math.min(
            Math.max(Math.round(averageMarks), 0),
            100
        )

        return {
            total,
            graded,
            pending,
            totalMarks,
            averageMarks,
            marksPercentage
        }
    }, [mysubmissions])

    const assignmentBarData = useMemo(() => {
        if (submissionStats.total === 0) {
            return []
        }

        return [
            {
                name: 'Assignments',
                Submitted: submissionStats.total,
                Graded: submissionStats.graded,
                Pending: submissionStats.pending
            }
        ]
    }, [submissionStats])

    const assignmentBars = [
        {
            dataKey: 'Submitted',
            name: 'Submitted',
            color: '#6366f1',
            barSize: 30
        },
        {
            dataKey: 'Graded',
            name: 'Graded',
            color: '#84cc16',
            barSize: 30
        },
        {
            dataKey: 'Pending',
            name: 'Pending',
            color: '#f97316',
            barSize: 30
        }
    ]

    const submissionLineData = useMemo(() => {
        return mysubmissions
            .filter((item) => {
                return (
                    item.marks !== undefined &&
                    item.marks !== null &&
                    item.marks !== '' &&
                    Number.isFinite(Number(item.marks))
                )
            })
            .sort((a, b) => {
                const firstDate = new Date(
                    a.createdAt ||
                    a.updatedAt ||
                    a.submittedAt ||
                    a.created_at ||
                    0
                )

                const secondDate = new Date(
                    b.createdAt ||
                    b.updatedAt ||
                    b.submittedAt ||
                    b.created_at ||
                    0
                )

                return firstDate - secondDate
            })
            .map((item, index) => {
                const date =
                    item.createdAt ||
                    item.updatedAt ||
                    item.submittedAt ||
                    item.created_at

                return {
                    name: date
                        ? new Date(date).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric'
                        })
                        : `#${index + 1}`,
                    Marks: Number(item.marks)
                }
            })
    }, [mysubmissions])

    return (
        <div className="w-full bg-white p-3 sm:p-4 lg:p-6">

            <div className="mb-5 rounded-2xl bg-gradient-to-br from-indigo-50 via-white to-orange-50 p-5 ring-1 ring-indigo-100 sm:p-6">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex min-w-0 items-center gap-3">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                            <FaGraduationCap className="h-5 w-5" />
                        </div>

                        <div className="min-w-0">

                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-400">
                                Student Dashboard
                            </p>

                            <h1 className="mt-1 text-xl font-black tracking-tight text-indigo-950 sm:text-2xl">
                                My Progress
                            </h1>

                            <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
                                Track your assignment submission and academic marks.
                            </p>

                        </div>

                    </div>

                    <div className="flex w-fit items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-indigo-100">

                        <FaArrowTrendUp className="h-3.5 w-3.5 text-lime-500" />

                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-600">
                            Live Progress
                        </span>

                    </div>

                </div>

            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-indigo-100">

                    <div className="flex items-center justify-between">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                            <FaBookOpen className="h-4 w-4" />
                        </div>

                        <span className="rounded-lg bg-indigo-50 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-indigo-600">
                            Assignments
                        </span>

                    </div>

                    <p className="mt-4 text-2xl font-black text-indigo-950">
                        {submissionStats.total}
                    </p>

                    <p className="mt-1 text-xs font-bold text-slate-400">
                        Total submissions
                    </p>

                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-lime-100">

                    <div className="flex items-center justify-between">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-50 text-lime-600">
                            <FaFileCircleCheck className="h-4 w-4" />
                        </div>

                        <span className="rounded-lg bg-lime-50 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-lime-700">
                            Graded
                        </span>

                    </div>

                    <p className="mt-4 text-2xl font-black text-lime-700">
                        {submissionStats.graded}
                    </p>

                    <p className="mt-1 text-xs font-bold text-slate-400">
                        Marked submissions
                    </p>

                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-orange-100">

                    <div className="flex items-center justify-between">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                            <FaClock className="h-4 w-4" />
                        </div>

                        <span className="rounded-lg bg-orange-50 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-orange-600">
                            Pending
                        </span>

                    </div>

                    <p className="mt-4 text-2xl font-black text-orange-600">
                        {submissionStats.pending}
                    </p>

                    <p className="mt-1 text-xs font-bold text-slate-400">
                        Waiting for marks
                    </p>

                </div>

            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">

                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-indigo-100 sm:p-5">

                    <div className="mb-3">

                        <p className="text-[9px] font-black uppercase tracking-wider text-indigo-400">
                            Academic Marks
                        </p>

                        <h2 className="mt-1 text-sm font-black text-indigo-950">
                            Marks Progress
                        </h2>

                    </div>

                    <div className="flex justify-center">

                        {loading ? (
                            <div className="flex h-[180px] items-center justify-center">
                                <FaSpinner className="h-5 w-5 animate-spin text-indigo-500" />
                            </div>
                        ) : (
                            <ProgressCircle
                                value={submissionStats.marksPercentage}
                                size={180}
                                color="#6366f1"
                                backgroundColor="#e5e7eb"
                                strokeWidth={18}
                            />
                        )}

                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2">

                        <div className="rounded-xl bg-indigo-50 p-3">

                            <div className="flex items-center gap-2">

                                <FaPercent className="h-3 w-3 text-indigo-600" />

                                <span className="text-[10px] font-bold text-indigo-800">
                                    Average
                                </span>

                            </div>

                            <p className="mt-1 text-lg font-black text-indigo-700">
                                {submissionStats.marksPercentage}%
                            </p>

                        </div>

                        <div className="rounded-xl bg-orange-50 p-3">

                            <div className="flex items-center gap-2">

                                <FaBookOpen className="h-3 w-3 text-orange-500" />

                                <span className="text-[10px] font-bold text-orange-800">
                                    Graded
                                </span>

                            </div>

                            <p className="mt-1 text-lg font-black text-orange-600">
                                {submissionStats.graded}
                            </p>

                        </div>

                    </div>

                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-indigo-100 sm:p-5 xl:col-span-2">

                    <div className="mb-3 flex items-start justify-between gap-3">

                        <div>

                            <p className="text-[9px] font-black uppercase tracking-wider text-indigo-400">
                                Assignment Progress
                            </p>

                            <h2 className="mt-1 text-sm font-black text-indigo-950">
                                Submission Overview
                            </h2>

                        </div>

                        <FaBookOpen className="h-4 w-4 text-indigo-400" />

                    </div>

                    <div className="min-h-[300px]">

                        {loading ? (
                            <div className="flex h-[300px] items-center justify-center">
                                <FaSpinner className="h-5 w-5 animate-spin text-indigo-500" />
                            </div>
                        ) : assignmentBarData.length > 0 ? (
                            <BarChart
                                data={assignmentBarData}
                                bars={assignmentBars}
                                height={300}
                                showGrid={true}
                                showLegend={true}
                            />
                        ) : (
                            <div className="flex h-[300px] items-center justify-center">
                                <div className="text-center">

                                    <FaBookOpen className="mx-auto h-6 w-6 text-slate-300" />

                                    <p className="mt-2 text-xs font-bold text-slate-400">
                                        No assignment submissions available
                                    </p>

                                </div>
                            </div>
                        )}

                    </div>

                </div>

            </div>

            <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-orange-100 sm:p-5">

                <div className="mb-3 flex items-start justify-between gap-3">

                    <div>

                        <p className="text-[9px] font-black uppercase tracking-wider text-orange-500">
                            Academic Performance
                        </p>

                        <h2 className="mt-1 text-sm font-black text-indigo-950">
                            Marks Progress
                        </h2>

                    </div>

                    <FaPercent className="h-4 w-4 text-orange-500" />

                </div>

                <div className="min-h-[300px]">

                    {loading ? (
                        <div className="flex h-[300px] items-center justify-center">
                            <FaSpinner className="h-5 w-5 animate-spin text-orange-500" />
                        </div>
                    ) : submissionLineData.length > 0 ? (
                        <LineChart
                            data={submissionLineData}
                            lines={[
                                {
                                    dataKey: 'Marks',
                                    name: 'Marks',
                                    color: '#f97316',
                                    strokeWidth: 3,
                                    dotSize: 4
                                }
                            ]}
                            xKey="name"
                            height={300}
                            showGrid={true}
                            showLegend={true}
                        />
                    ) : (
                        <div className="flex h-[300px] items-center justify-center">
                            <div className="text-center">

                                <FaPercent className="mx-auto h-6 w-6 text-slate-300" />

                                <p className="mt-2 text-xs font-bold text-slate-400">
                                    No graded submissions available
                                </p>

                            </div>
                        </div>
                    )}

                </div>

            </div>

        </div>
    )
}

export default MyProgress