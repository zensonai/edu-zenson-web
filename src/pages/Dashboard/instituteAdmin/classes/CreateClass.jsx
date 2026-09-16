import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
import DefaultInput from '../../../../component/Form/DefaultInput'
import DefaultButton from '../../../../component/Buttons/DefaultButton'
import Dropdown from '../../../../component/Form/Dropdown'

const CreateClass = () => {
    const token = localStorage.getItem('access_token')

    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const [teachers, setTeachers] = useState([])
    const [students, setStudents] = useState([])
    const [selectedStudents, setSelectedStudents] = useState([''])
    const [schedule, setSchedule] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchteachers = async () => {
            const res = await API.get('/teacher/institute-teachers', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                setTeachers(res.data.result)
            }
        }

        if (token) fetchteachers()
    }, [token])

    useEffect(() => {
        const fectchstudents = async () => {
            const res = await API.get('/student/institute-students', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                setStudents(res.data.result)
            }
        }

        if (token) fectchstudents()
    }, [token])

    const { values, handleChange } = useForm({
        class_name: '',
        description: '',
        teacher: '',
        students: [],
        schedule: [],
        continue: false
    })

    const handleStudentChange = (index, value) => {
        const updatedStudents = [...selectedStudents]

        updatedStudents[index] = value

        setSelectedStudents(updatedStudents)
        values.students = updatedStudents.filter(student => student)
    }

    const addStudent = () => {
        setSelectedStudents([
            ...selectedStudents,
            ''
        ])
    }

    const removeStudent = (index) => {
        const updatedStudents = selectedStudents.filter(
            (_, studentIndex) => studentIndex !== index
        )

        setSelectedStudents(
            updatedStudents.length > 0 ? updatedStudents : ['']
        )

        values.students = updatedStudents.filter(student => student)
    }

    const addSchedule = () => {
        setSchedule([
            ...schedule,
            {
                day: '',
                startTime: '',
                endTime: ''
            }
        ])
    }

    const updateSchedule = (index, field, value) => {
        const updatedSchedule = [...schedule]

        updatedSchedule[index][field] = value

        setSchedule(updatedSchedule)
        values.schedule = updatedSchedule
    }

    const removeSchedule = (index) => {
        const updatedSchedule = schedule.filter(
            (_, scheduleIndex) => scheduleIndex !== index
        )

        setSchedule(updatedSchedule)
        values.schedule = updatedSchedule
    }

    const headleCreateClass = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            values.students = selectedStudents.filter(student => student)
            values.schedule = schedule

            const res = await API.post('/classes/create-class', values, {
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
                    navigate('/dashboard/classes')
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

    const teacherOptions = teachers.map((teacher) => ({
        value: teacher._id,
        label: teacher.userId?.email || 'Teacher Email'
    }))

    const studentOptions = students.map((student) => ({
        value: student._id,
        label: student.userId?.email || 'Student Email'
    }))

    const dayOptions = [
        { value: 0, label: 'Sunday' },
        { value: 1, label: 'Monday' },
        { value: 2, label: 'Tuesday' },
        { value: 3, label: 'Wednesday' },
        { value: 4, label: 'Thursday' },
        { value: 5, label: 'Friday' },
        { value: 6, label: 'Saturday' }
    ]

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
                                Class Management
                            </p>

                            <h1 className="text-xl font-black tracking-tight text-violet-950 sm:text-2xl">
                                Create Class
                            </h1>

                            <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500 sm:text-sm">
                                Create a new class, assign a teacher and students, and configure the class schedule.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 self-start rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-violet-100 lg:self-auto">
                        <FiShield className="h-4 w-4 text-violet-600" />

                        <span className="text-[10px] font-black uppercase tracking-wider text-violet-700">
                            Class Setup
                        </span>
                    </div>
                </div>
            </div>

            <form onSubmit={headleCreateClass} className="space-y-5">
                <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                    <div className="border-b border-violet-50 bg-gradient-to-r from-violet-50/70 via-white to-white px-5 py-4 sm:px-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                                <FiBook className="h-4 w-4" />
                            </div>

                            <div>
                                <h2 className="text-sm font-black text-violet-950">
                                    Class Information
                                </h2>

                                <p className="text-[11px] text-slate-400">
                                    Enter the basic class details
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-x-5 px-5 py-5 md:grid-cols-2 sm:px-6">
                        <DefaultInput
                            label="Class Name"
                            name="class_name"
                            value={values.class_name}
                            onChange={handleChange}
                            placeholder="Enter class name"
                            required
                        />

                        <DefaultInput
                            label="Description"
                            name="description"
                            value={values.description}
                            onChange={handleChange}
                            placeholder="Enter class description"
                            required
                        />
                    </div>
                </div>

                <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                    <div className="border-b border-cyan-50 bg-gradient-to-r from-cyan-50/70 via-white to-white px-5 py-4 sm:px-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600">
                                <FiUser className="h-4 w-4" />
                            </div>

                            <div>
                                <h2 className="text-sm font-black text-violet-950">
                                    Class Members
                                </h2>

                                <p className="text-[11px] text-slate-400">
                                    Assign the teacher and students
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 px-5 py-5 md:grid-cols-2 sm:px-6">
                        <Dropdown
                            label="Teacher"
                            name="teacher"
                            value={values.teacher}
                            onChange={handleChange}
                            required
                            options={teacherOptions}
                        />

                        <div>
                            {selectedStudents.map((student, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-2"
                                >
                                    <div className="flex-1">
                                        <Dropdown
                                            label={`Student ${index + 1}`}
                                            name={`student-${index}`}
                                            value={student}
                                            onChange={(e) =>
                                                handleStudentChange(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            required
                                            options={studentOptions}
                                        />
                                    </div>

                                    {selectedStudents.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeStudent(index)}
                                            className="mt-7 text-xs font-bold text-red-500 hover:text-red-600"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={addStudent}
                                className="mb-5 rounded-xl bg-cyan-600 px-4 py-2 text-xs font-black text-white transition hover:bg-cyan-700"
                            >
                                Add Student
                            </button>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                    <div className="border-b border-violet-50 bg-gradient-to-r from-violet-50/70 via-white to-white px-5 py-4 sm:px-6">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                                    <FiCalendar className="h-4 w-4" />
                                </div>

                                <div>
                                    <h2 className="text-sm font-black text-violet-950">
                                        Class Schedule
                                    </h2>

                                    <p className="text-[11px] text-slate-400">
                                        Add one or more days with different class times
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={addSchedule}
                                className="rounded-xl bg-violet-600 px-4 py-2 text-xs font-black text-white transition hover:bg-violet-700"
                            >
                                Add Schedule
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4 px-5 py-5 sm:px-6">
                        {schedule.length === 0 && (
                            <div className="rounded-xl border border-dashed border-slate-200 px-5 py-8 text-center">
                                <FiCalendar className="mx-auto mb-2 h-6 w-6 text-slate-300" />

                                <p className="text-xs font-bold text-slate-500">
                                    No schedule added
                                </p>

                                <p className="mt-1 text-[11px] text-slate-400">
                                    Add a schedule to define the class days and times.
                                </p>
                            </div>
                        )}

                        {schedule.map((item, index) => (
                            <div
                                key={index}
                                className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100"
                            >
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <FiClock className="h-4 w-4 text-violet-600" />

                                        <span className="text-xs font-black text-violet-950">
                                            Schedule {index + 1}
                                        </span>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => removeSchedule(index)}
                                        className="text-[11px] font-bold text-red-500 hover:text-red-600"
                                    >
                                        Remove
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <Dropdown
                                        label="Day"
                                        name={`day-${index}`}
                                        value={item.day}
                                        onChange={(e) =>
                                            updateSchedule(
                                                index,
                                                'day',
                                                Number(e.target.value)
                                            )
                                        }
                                        required
                                        options={dayOptions}
                                    />

                                    <DefaultInput
                                        label="Start Time"
                                        type="time"
                                        value={item.startTime}
                                        onChange={(e) =>
                                            updateSchedule(
                                                index,
                                                'startTime',
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                    <DefaultInput
                                        label="End Time"
                                        type="time"
                                        value={item.endTime}
                                        onChange={(e) =>
                                            updateSchedule(
                                                index,
                                                'endTime',
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                    <div className="border-b border-cyan-50 bg-gradient-to-r from-cyan-50/70 via-white to-white px-5 py-4 sm:px-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600">
                                <FiCalendar className="h-4 w-4" />
                            </div>

                            <div>
                                <h2 className="text-sm font-black text-violet-950">
                                    Weekly Schedule
                                </h2>

                                <p className="text-[11px] text-slate-400">
                                    Choose whether this schedule repeats every week
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="px-5 py-5 sm:px-6">
                        <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-violet-50 p-4 ring-1 ring-violet-100">
                            <input
                                type="checkbox"
                                name="continue"
                                checked={values.continue}
                                onChange={handleChange}
                                className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                            />

                            <div>
                                <p className="text-xs font-black text-violet-950">
                                    Continue every week
                                </p>

                                <p className="mt-1 text-[11px] text-slate-500">
                                    The class will continue every week on the selected days and times.
                                </p>
                            </div>
                        </label>
                    </div>
                </div>

                <div className="flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-violet-50 via-white to-cyan-50 p-4 ring-1 ring-violet-100/70 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                    <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-lime-600 shadow-sm ring-1 ring-lime-100">
                            <FiCheckCircle className="h-4 w-4" />
                        </div>

                        <div>
                            <p className="text-xs font-black text-violet-950">
                                Ready to create class
                            </p>

                            <p className="mt-1 text-[11px] leading-4 text-slate-500">
                                Make sure the class details, teacher, students and schedule are correct.
                            </p>
                        </div>
                    </div>

                    <div className="w-full sm:w-auto">
                        <DefaultButton
                            type="submit"
                            label={loading ? 'Creating Class...' : 'Create Class'}
                            disabled={loading}
                            loading={loading}
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateClass