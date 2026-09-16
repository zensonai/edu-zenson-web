import React, { useEffect, useState } from 'react'
import {
    FiCheckCircle,
    FiShield,
    FiUser,
    FiBook,
    FiCalendar,
    FiClock
} from 'react-icons/fi'
import useForm from '../../../../hooks/useForm'
import API from '../../../../services/api'
import Toast from '../../../../component/Toast/Toast'
import DefaultButton from '../../../../component/Buttons/DefaultButton'
import Dropdown from '../../../../component/Form/Dropdown'
import { FaClock } from 'react-icons/fa6'

const CreateAttendance = () => {
    const token = localStorage.getItem('access_token')

    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const [classes, setClasses] = useState([])
    const [selectedClass, setSelectedClass] = useState(null)
    const [students, setStudents] = useState([])

    const { values, handleChange } = useForm({
        class: '',
        students: [],
        mark_attendance: true
    })

    useEffect(() => {
        const fetchclasses = async () => {
            try {
                const res = await API.get('/classes/fetch-teacherclasses', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.data.success === true) {
                    setClasses(res.data.result)
                }
            }
            catch (err) {
                setToast({
                    success: false,
                    message: err.response?.data?.message || 'Unable to load classes'
                })
            }
        }

        if (token) fetchclasses()
    }, [token])

    const handleClassChange = (e) => {
        const classId = e.target.value

        handleChange(e)

        const selected = classes.find(item => item._id === classId)

        setSelectedClass(selected || null)

        if (selected?.students) {
            const attendanceStudents = selected.students.map(student => ({
                stdID: student._id,
                is_attend: false
            }))

            setStudents(selected.students)
            values.students = attendanceStudents
        }
        else {
            setStudents([])
            values.students = []
        }
    }

    const handleAttendanceChange = (studentId, isAttend) => {
        const updatedStudents = values.students.map(student =>
            student.stdID === studentId
                ? {
                    ...student,
                    is_attend: isAttend
                }
                : student
        )

        values.students = updatedStudents
        setStudents([...students])
    }

    const handleMarkAttedance = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await API.post('/classes/mark-attendance', values, {
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
                message: err.response?.data?.message || 'Unable to mark attendance',
            })
        }
        finally {
            setLoading(false)
        }
    }

    const classOptions = classes.map((classItem) => ({
        value: classItem._id,
        label: classItem.class_name
    }))

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
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-200">
                            <FiBook className="h-6 w-6" />
                        </div>

                        <div>
                            <p className="mb-1 text-[9px] font-black uppercase tracking-[0.18em] text-violet-500">
                                Attendance Management
                            </p>

                            <h1 className="text-xl font-black tracking-tight text-violet-950 sm:text-2xl">
                                Mark Attendance
                            </h1>

                            <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500 sm:text-sm">
                                Select a class and record attendance for the students assigned to the class.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 self-start rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-violet-100 lg:self-auto">
                        <FiShield className="h-4 w-4 text-violet-600" />

                        <span className="text-[10px] font-black uppercase tracking-wider text-violet-700">
                            Attendance
                        </span>
                    </div>
                </div>
            </div>

            <form onSubmit={handleMarkAttedance} className="space-y-5">
                <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                    <div className="border-b border-violet-50 bg-gradient-to-r from-violet-50/70 via-white to-white px-5 py-4 sm:px-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                                <FiBook className="h-4 w-4" />
                            </div>

                            <div>
                                <h2 className="text-sm font-black text-violet-950">
                                    Class Selection
                                </h2>

                                <p className="text-[11px] text-slate-400">
                                    Select the class for today's attendance
                                </p>
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5">
                            <FaClock className="h-4 w-4 shrink-0 text-red-500" />

                            <p className="text-[11px] font-bold leading-4 text-red-700">
                                Attendance is available from class start time until 30 minutes after the class ends.
                            </p>
                        </div>

                    </div>

                    <div className="px-5 py-5 sm:px-6">
                        <Dropdown
                            label="Class"
                            name="class"
                            value={values.class}
                            onChange={handleClassChange}
                            required
                            options={classOptions}
                        />
                    </div>
                </div>

                {selectedClass && (
                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                        <div className="border-b border-cyan-50 bg-gradient-to-r from-cyan-50/70 via-white to-white px-5 py-4 sm:px-6">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600">
                                        <FiUser className="h-4 w-4" />
                                    </div>

                                    <div>
                                        <h2 className="text-sm font-black text-violet-950">
                                            Student Attendance
                                        </h2>

                                        <p className="text-[11px] text-slate-400">
                                            {selectedClass.class_name} student attendance
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-cyan-100">
                                    <FiCalendar className="h-4 w-4 text-cyan-600" />

                                    <span className="text-[10px] font-black uppercase tracking-wider text-cyan-700">
                                        Today's Attendance
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 px-5 py-5 sm:px-6">
                            {students.length === 0 && (
                                <div className="rounded-xl border border-dashed border-slate-200 px-5 py-8 text-center">
                                    <FiUser className="mx-auto mb-2 h-6 w-6 text-slate-300" />

                                    <p className="text-xs font-bold text-slate-500">
                                        No students found
                                    </p>

                                    <p className="mt-1 text-[11px] text-slate-400">
                                        This class does not have any students assigned.
                                    </p>
                                </div>
                            )}

                            {students.map((student, index) => {
                                const attendance = values.students.find(
                                    item => item.stdID === student._id
                                )

                                return (
                                    <div
                                        key={student._id}
                                        className="flex flex-col gap-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100 sm:flex-row sm:items-center sm:justify-between"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                                                <FiUser className="h-4 w-4" />
                                            </div>

                                            <div>
                                                <p className="text-xs font-black text-violet-950">
                                                    Student {index + 1}
                                                </p>

                                                <p className="mt-1 text-[11px] text-slate-500">
                                                    {student.userId?.email || student.admission_no || 'Student'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => handleAttendanceChange(student._id, true)}
                                                className={`rounded-xl px-4 py-2 text-xs font-black transition ${attendance?.is_attend
                                                    ? 'bg-lime-600 text-white'
                                                    : 'bg-white text-slate-500 ring-1 ring-slate-200 hover:bg-lime-50 hover:text-lime-700'
                                                    }`}
                                            >
                                                Present
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleAttendanceChange(student._id, false)}
                                                className={`rounded-xl px-4 py-2 text-xs font-black transition ${attendance && !attendance.is_attend
                                                    ? 'bg-red-500 text-white'
                                                    : 'bg-white text-slate-500 ring-1 ring-slate-200 hover:bg-red-50 hover:text-red-600'
                                                    }`}
                                            >
                                                Absent
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}

                {selectedClass && (
                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                        <div className="border-b border-violet-50 bg-gradient-to-r from-violet-50/70 via-white to-white px-5 py-4 sm:px-6">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                                    <FiClock className="h-4 w-4" />
                                </div>

                                <div>
                                    <h2 className="text-sm font-black text-violet-950">
                                        Attendance Confirmation
                                    </h2>

                                    <p className="text-[11px] text-slate-400">
                                        Review the attendance before submitting
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="px-5 py-5 sm:px-6">
                            <div className="flex flex-col gap-4 rounded-2xl bg-violet-50 p-4 ring-1 ring-violet-100 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-xs font-black text-violet-950">
                                        Ready to mark attendance
                                    </p>

                                    <p className="mt-1 text-[11px] leading-4 text-slate-500">
                                        Confirm the attendance status for all students before submitting.
                                    </p>
                                </div>

                                <div className="w-full sm:w-auto">
                                    <DefaultButton
                                        type="submit"
                                        label={loading ? 'Marking Attendance...' : 'Mark Attendance'}
                                        disabled={loading || students.length === 0}
                                        loading={loading}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    )
}

export default CreateAttendance