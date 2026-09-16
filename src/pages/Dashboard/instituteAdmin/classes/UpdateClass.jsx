import React, { useEffect, useState } from 'react'
import { FaCalendarDays, FaClock, FaGraduationCap, FaPlus, FaTrash, FaUsers } from 'react-icons/fa6'
import API from '../../../../services/api'
import useForm from '../../../../hooks/useForm'
import DefaultInput from '../../../../component/Form/DefaultInput'
import Dropdown from '../../../../component/Form/Dropdown'
import DefaultButton from '../../../../component/Buttons/DefaultButton'
import Toast from '../../../../component/Toast/Toast'

const UpdateClass = ({
    token,
    classData,
    classID
}) => {
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const [students, setStudents] = useState([])
    const [selectedStudents, setSelectedStudents] = useState([])
    const [schedule, setSchedule] = useState([])

    const { values, handleChange } = useForm({
        class_name: '',
        description: '',
        students: [],
        schedule: [],
        continue: false
    })

    useEffect(() => {
        if (!classData) return

        values.class_name = classData.class_name || ''
        values.description = classData.description || ''
        values.continue = classData.continue || false

        const existingStudents = classData.students?.map(student => {
            if (typeof student === 'object') {
                return student._id
            }

            return student
        }) || []

        const existingSchedule = classData.schedule?.map(item => ({
            day: item.day,
            startTime: item.startTime,
            endTime: item.endTime
        })) || []

        values.students = existingStudents
        values.schedule = existingSchedule

        setSelectedStudents(existingStudents)
        setSchedule(existingSchedule)
    }, [classData])

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

        setSelectedStudents(updatedStudents)
        values.students = updatedStudents.filter(student => student)
    }

    const addSchedule = () => {
        const updatedSchedule = [
            ...schedule,
            {
                day: '',
                startTime: '',
                endTime: ''
            }
        ]

        setSchedule(updatedSchedule)
        values.schedule = updatedSchedule
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

    const headleUpdateClass = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await API.patch(`/classes/update-class/${classID}`, values, {
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
                message: err.response?.data?.message,
            })
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full min-w-0 bg-white">

            {toast && (
                <div className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <form onSubmit={headleUpdateClass} className="space-y-5">

                <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-violet-100/70">

                    <div className="bg-gradient-to-r from-violet-600 via-violet-600 to-cyan-500 px-4 py-5 sm:px-7 sm:py-6">

                        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                            <div className="flex min-w-0 items-center gap-3 sm:gap-4">

                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white shadow-lg ring-1 ring-white/20 backdrop-blur-sm sm:h-14 sm:w-14">
                                    <FaGraduationCap className="h-5 w-5 sm:h-6 sm:w-6" />
                                </div>

                                <div className="min-w-0">

                                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-violet-100">
                                        Education SaaS
                                    </p>

                                    <h2 className="mt-1 break-words text-lg font-black text-white sm:text-xl">
                                        Update Class
                                    </h2>

                                    <p className="mt-1 text-xs font-medium text-violet-100">
                                        Update class information, students and schedule
                                    </p>

                                </div>

                            </div>

                            <div className="flex w-fit shrink-0 items-center gap-2 rounded-xl bg-white/10 px-3 py-2 ring-1 ring-white/20">

                                <span className="h-2 w-2 rounded-full bg-lime-300" />

                                <span className="text-[10px] font-black uppercase tracking-wider text-white">
                                    Edit Class
                                </span>

                            </div>

                        </div>

                    </div>

                    <div className="p-4 sm:p-7">

                        <div className="grid grid-cols-1 gap-5">

                            <div className="min-w-0">

                                <DefaultInput
                                    label="Class Name"
                                    name="class_name"
                                    value={values.class_name}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        <div className="mt-1">

                            <label className="mb-2 block text-xs font-semibold">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                required
                                rows="5"
                                className="w-full resize-none rounded border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all duration-200 shadow-sm hover:border-gray-300 hover:shadow-md focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300/40"
                                placeholder="Enter class description"
                            />

                        </div>

                    </div>

                </div>

                <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-violet-100/70">

                    <div className="flex flex-col gap-3 border-b border-violet-50 bg-gradient-to-r from-violet-50 via-white to-cyan-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">

                        <div className="flex min-w-0 items-center gap-3">

                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                                <FaUsers className="h-3.5 w-3.5" />
                            </div>

                            <div className="min-w-0">

                                <h3 className="text-xs font-black uppercase tracking-[0.12em] text-violet-950">
                                    Students
                                </h3>

                                <p className="mt-0.5 text-[9px] font-medium text-slate-400">
                                    Manage students enrolled in this class
                                </p>

                            </div>

                        </div>

                        <button
                            type="button"
                            onClick={addStudent}
                            className="flex w-fit items-center gap-2 rounded-xl bg-violet-600 px-3 py-2 text-[10px] font-black uppercase tracking-wider text-white transition hover:bg-violet-700"
                        >
                            <FaPlus className="h-3 w-3" />
                            Add Student
                        </button>

                    </div>

                    <div className="p-4 sm:p-5">

                        {selectedStudents.length > 0 ? (

                            <div className="space-y-3">

                                {selectedStudents.map((student, index) => (

                                    <div
                                        key={index}
                                        className="flex min-w-0 flex-col gap-2 rounded-xl bg-gradient-to-br from-violet-50/70 via-white to-cyan-50/50 p-3 ring-1 ring-violet-100/60 sm:flex-row sm:items-start"
                                    >

                                        <div className="min-w-0 flex-1">

                                            <Dropdown
                                                label={`Student ${index + 1}`}
                                                name={`student_${index}`}
                                                value={student}
                                                onChange={(e) => handleStudentChange(index, e.target.value)}
                                                options={students.map(studentItem => ({
                                                    value: studentItem._id,
                                                    label: studentItem.userId?.email || studentItem.admission_no
                                                }))}
                                            />

                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => removeStudent(index)}
                                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500 transition hover:bg-red-100 sm:mt-7"
                                        >
                                            <FaTrash className="h-3.5 w-3.5" />
                                        </button>

                                    </div>

                                ))}

                            </div>

                        ) : (

                            <div className="rounded-xl bg-slate-50/60 px-4 py-8 text-center ring-1 ring-violet-100/50">

                                <FaUsers className="mx-auto h-6 w-6 text-violet-300" />

                                <p className="mt-3 text-xs font-bold text-slate-400">
                                    No students assigned
                                </p>

                                <button
                                    type="button"
                                    onClick={addStudent}
                                    className="mt-3 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-violet-600 hover:text-violet-700"
                                >
                                    <FaPlus className="h-3 w-3" />
                                    Add Student
                                </button>

                            </div>

                        )}

                    </div>

                </div>

                <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-violet-100/70">

                    <div className="flex flex-col gap-3 border-b border-violet-50 bg-gradient-to-r from-violet-50 via-white to-cyan-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">

                        <div className="flex min-w-0 items-center gap-3">

                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                                <FaCalendarDays className="h-3.5 w-3.5" />
                            </div>

                            <div className="min-w-0">

                                <h3 className="text-xs font-black uppercase tracking-[0.12em] text-violet-950">
                                    Class Schedule
                                </h3>

                                <p className="mt-0.5 text-[9px] font-medium text-slate-400">
                                    Manage class days and times
                                </p>

                            </div>

                        </div>

                        <button
                            type="button"
                            onClick={addSchedule}
                            className="flex w-fit items-center gap-2 rounded-xl bg-violet-600 px-3 py-2 text-[10px] font-black uppercase tracking-wider text-white transition hover:bg-violet-700"
                        >
                            <FaPlus className="h-3 w-3" />
                            Add Schedule
                        </button>

                    </div>

                    <div className="p-4 sm:p-5">

                        {schedule.length > 0 ? (

                            <div className="space-y-3">

                                {schedule.map((item, index) => (

                                    <div
                                        key={index}
                                        className="rounded-xl bg-slate-50/60 p-3 ring-1 ring-violet-100/50 sm:p-4"
                                    >

                                        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">

                                            <div className="min-w-0">

                                                <Dropdown
                                                    label="Day"
                                                    name={`day_${index}`}
                                                    value={item.day}
                                                    onChange={(e) => updateSchedule(index, 'day', Number(e.target.value))}
                                                    options={[
                                                        { value: 0, label: 'Sunday' },
                                                        { value: 1, label: 'Monday' },
                                                        { value: 2, label: 'Tuesday' },
                                                        { value: 3, label: 'Wednesday' },
                                                        { value: 4, label: 'Thursday' },
                                                        { value: 5, label: 'Friday' },
                                                        { value: 6, label: 'Saturday' }
                                                    ]}
                                                />

                                            </div>

                                            <div className="min-w-0">

                                                <label className="mb-2 block text-xs font-semibold">
                                                    Start Time
                                                </label>

                                                <div className="relative">

                                                    <FaClock className="absolute left-4 top-1/2 h-3 w-3 -translate-y-1/2 text-violet-500" />

                                                    <input
                                                        type="time"
                                                        value={item.startTime}
                                                        onChange={(e) => updateSchedule(index, 'startTime', e.target.value)}
                                                        required
                                                        className="w-full rounded border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300/40"
                                                    />

                                                </div>

                                            </div>

                                            <div className="min-w-0">

                                                <label className="mb-2 block text-xs font-semibold">
                                                    End Time
                                                </label>

                                                <div className="relative">

                                                    <FaClock className="absolute left-4 top-1/2 h-3 w-3 -translate-y-1/2 text-cyan-500" />

                                                    <input
                                                        type="time"
                                                        value={item.endTime}
                                                        onChange={(e) => updateSchedule(index, 'endTime', e.target.value)}
                                                        required
                                                        className="w-full rounded border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300/40"
                                                    />

                                                </div>

                                            </div>

                                        </div>

                                        <div className="mt-3 flex justify-end">

                                            <button
                                                type="button"
                                                onClick={() => removeSchedule(index)}
                                                className="flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-[10px] font-black uppercase tracking-wider text-red-500 transition hover:bg-red-100"
                                            >
                                                <FaTrash className="h-3 w-3" />
                                                Remove
                                            </button>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        ) : (

                            <div className="rounded-xl bg-slate-50/60 px-4 py-8 text-center ring-1 ring-violet-100/50">

                                <FaCalendarDays className="mx-auto h-6 w-6 text-violet-300" />

                                <p className="mt-3 text-xs font-bold text-slate-400">
                                    No schedule added
                                </p>

                                <button
                                    type="button"
                                    onClick={addSchedule}
                                    className="mt-3 text-[10px] font-black uppercase tracking-wider text-violet-600 hover:text-violet-700"
                                >
                                    Add Schedule
                                </button>

                            </div>

                        )}

                    </div>

                </div>

                <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-violet-100/70">

                    <div className="flex items-center gap-3 border-b border-violet-50 bg-gradient-to-r from-violet-50 via-white to-cyan-50 px-4 py-4 sm:px-5">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-lime-50 text-lime-600">
                            <FaClock className="h-3.5 w-3.5" />
                        </div>

                        <div className="min-w-0">

                            <h3 className="text-xs font-black uppercase tracking-[0.12em] text-violet-950">
                                Class Type
                            </h3>

                            <p className="mt-0.5 text-[9px] font-medium text-slate-400">
                                Choose whether this class repeats every week
                            </p>

                        </div>

                    </div>

                    <div className="p-4 sm:p-5">

                        <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-gradient-to-br from-lime-50/70 via-white to-violet-50/50 p-4 ring-1 ring-lime-100/70">

                            <input
                                type="checkbox"
                                name="continue"
                                checked={values.continue}
                                onChange={handleChange}
                                className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                            />

                            <span className="min-w-0">

                                <span className="block text-sm font-black text-violet-950">
                                    Repeat Every Week
                                </span>

                                <span className="mt-1 block text-xs font-medium leading-5 text-slate-400">
                                    Keep this class schedule active every week.
                                </span>

                            </span>

                        </label>

                    </div>

                </div>

                <div className="flex flex-col gap-3 rounded-2xl bg-gradient-to-r from-violet-50 via-white to-cyan-50 p-4 ring-1 ring-violet-100/70 sm:flex-row sm:items-center sm:justify-end sm:p-5">

                    <DefaultButton
                        type="submit"
                        label={loading ? 'Updating Class...' : 'Update Class'}
                        disabled={loading}
                    />

                </div>

            </form>

        </div>
    )
}

export default UpdateClass