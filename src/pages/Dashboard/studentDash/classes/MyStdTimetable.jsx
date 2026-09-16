import React, { useEffect, useState } from 'react'
import API from '../../../../services/api'
import TimetabeWeeklly from '../../../../component/Timetable/TimetabeWeeklly'

const MyStdTimetable = () => {
    const token = localStorage.getItem('access_token')
    const [myclasses, setMyclasses] = useState([])

    useEffect(() => {
        const fetchmyclasses = async () => {
            const res = await API.get('/classes/student-classes', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (res.data.success === true) {
                setMyclasses(res.data.result)
            }
        }

        if (token) fetchmyclasses()
    }, [token])
    return (
        <div className="w-full space-y-6">
            <TimetabeWeeklly classes={myclasses} />
        </div>
    )
}

export default MyStdTimetable