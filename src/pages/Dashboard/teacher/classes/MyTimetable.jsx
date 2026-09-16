import React, { useEffect, useState } from 'react'
import API from '../../../../services/api'
import TimetabeWeeklly from '../../../../component/Timetable/TimetabeWeeklly'

const MyTimetable = () => {
    const token = localStorage.getItem('access_token')
    const [classes, setClasses] = useState([])

    useEffect(() => {
        const fetchclasses = async () => {
            const res = await API.get('/classes/fetch-teacherclasses', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                setClasses(res.data.result)
            }
        }

        if (token) fetchclasses()
    }, [token])
    return (
        <div className="w-full space-y-6">
            <TimetabeWeeklly classes={classes} />
        </div>
    )
}

export default MyTimetable