import React, { useMemo } from 'react'
import { FaClock, FaGraduationCap } from 'react-icons/fa6'

const TimetabeWeeklly = ({ classes = [] }) => {
    const days = [
        { id: 0, name: 'Sunday', short: 'Sun' },
        { id: 1, name: 'Monday', short: 'Mon' },
        { id: 2, name: 'Tuesday', short: 'Tue' },
        { id: 3, name: 'Wednesday', short: 'Wed' },
        { id: 4, name: 'Thursday', short: 'Thu' },
        { id: 5, name: 'Friday', short: 'Fri' },
        { id: 6, name: 'Saturday', short: 'Sat' },
    ]

    const timeSlots = useMemo(() => {
        const times = []

        for (let hour = 6; hour <= 22; hour++) {
            times.push(`${String(hour).padStart(2, '0')}:00`)
        }

        return times
    }, [])

    const getClassForDay = (day) => {
        return classes.flatMap(classItem =>
            (classItem.schedule || [])
                .filter(schedule => schedule.day === day)
                .map(schedule => ({
                    ...schedule,
                    classItem
                }))
        )
    }

    const getTopPosition = (time) => {
        const [hour, minute] = time.split(':').map(Number)
        return ((hour - 6) * 60 + minute) / 60 * 72
    }

    const getHeight = (startTime, endTime) => {
        const [startHour, startMinute] = startTime.split(':').map(Number)
        const [endHour, endMinute] = endTime.split(':').map(Number)

        const start = startHour * 60 + startMinute
        const end = endHour * 60 + endMinute

        return ((end - start) / 60) * 72
    }

    return (
        <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 px-5 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                        <FaGraduationCap />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Weekly Timetable</h2>
                        <p className="text-sm text-gray-500">Class schedule for the week</p>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <div className="min-w-[1000px]">
                    <div className="grid grid-cols-[80px_repeat(7,minmax(130px,1fr))] border-b border-gray-200 bg-gray-50">
                        <div className="border-r border-gray-200 p-3" />

                        {days.map(day => (
                            <div key={day.id} className="border-r border-gray-200 px-3 py-3 text-center last:border-r-0">
                                <p className="hidden text-xs font-medium text-gray-500 md:block">{day.name}</p>
                                <p className="text-sm font-bold text-gray-900 md:hidden">{day.short}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-[80px_repeat(7,minmax(130px,1fr))]">
                        <div className="relative">
                            {timeSlots.map(time => (
                                <div key={time} className="h-[72px] border-b border-r border-gray-200 px-2 pt-2 text-right text-[11px] font-medium text-gray-400">
                                    {time}
                                </div>
                            ))}
                        </div>

                        {days.map(day => {
                            const dayClasses = getClassForDay(day.id)

                            return (
                                <div key={day.id} className="relative border-r border-gray-200 last:border-r-0">
                                    {timeSlots.map(time => (
                                        <div key={time} className="h-[72px] border-b border-gray-100" />
                                    ))}

                                    {dayClasses.map((item, index) => {
                                        const top = getTopPosition(item.startTime)
                                        const height = Math.max(getHeight(item.startTime, item.endTime), 48)

                                        return (
                                            <div
                                                key={`${item.classItem._id}-${item._id || index}`}
                                                className="absolute left-1 right-1 overflow-hidden rounded-xl border border-indigo-200 bg-indigo-50 p-2 shadow-sm"
                                                style={{
                                                    top: `${top}px`,
                                                    height: `${height}px`
                                                }}
                                            >
                                                <p className="truncate text-xs font-bold text-indigo-700">
                                                    {item.classItem.class_name}
                                                </p>

                                                <div className="mt-1 flex items-center gap-1 text-[10px] font-medium text-gray-600">
                                                    <FaClock className="text-indigo-500" />
                                                    <span>{item.startTime} - {item.endTime}</span>
                                                </div>

                                                <p className="mt-1 truncate text-[10px] text-gray-500">
                                                    {item.classItem.teacher?.userId?.email || 'Teacher not assigned'}
                                                </p>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimetabeWeeklly