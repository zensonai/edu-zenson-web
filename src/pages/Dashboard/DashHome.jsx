import React from 'react'
import { useAuth } from '../../context/AuthContext'
import AdminCardsData from './Dashboards/superAdmin/AdminCardsData'
import TimeCard from '../../component/others/TimeCard'
import LastAuditLogs from './Dashboards/superAdmin/lastAuditLogs'
import UserPieChart from './Dashboards/superAdmin/UserPieChart'
import AdminPayment from './Dashboards/superAdmin/AdminPayment'
import InstituteAdminCards from './Dashboards/instituteAdmin/InstituteAdminCards'
import UsersPieInstitute from './Dashboards/instituteAdmin/UsersPieInstitute'
import InstituteAdminData from './Dashboards/instituteAdmin/InstituteAdminData'
import TeacherDataCard from './Dashboards/teacher/TeacherDataCard'
import LastNotifications from './Dashboards/teacher/LastNotifications'
import StudentCardData from './Dashboards/student/StudentCardData'

const DashHome = () => {
    const { auth } = useAuth()
    return (
        <div>
            <div className="lg:flex">
                <div className="lg:w-3/4">
                    <div className="">
                        {
                            auth?.user?.role === "SUPER_ADMIN" ?
                                <AdminCardsData />
                                :
                                auth?.user?.role === "INSTITUTE_ADMIN" ?
                                    <InstituteAdminCards />
                                    :
                                    auth?.user?.role === "TEACHER" ?
                                        <TeacherDataCard />
                                        :
                                        <StudentCardData />
                        }
                    </div>
                </div>
                <div className="lg:w-1/4 ml-4 mr-2 lg:mt-0 mt-4">
                    <div>
                        <TimeCard />
                    </div>

                    <div className="mt-4">
                        {
                            auth?.user?.role === "SUPER_ADMIN" ?
                                <LastAuditLogs />
                                :
                                auth?.user?.role === "INSTITUTE_ADMIN" ?
                                    <InstituteAdminData />
                                    :
                                    <LastNotifications />
                        }
                    </div>
                </div>
            </div>

            <div className="lg:flex mt-4">
                <div className="lg:w-2/6">
                    {
                        auth?.user?.role === "SUPER_ADMIN" ?
                            <UserPieChart />
                            :
                            auth?.user?.role === "INSTITUTE_ADMIN" ?
                                <UsersPieInstitute />
                                :
                                <div className=""></div>

                    }
                </div>
                <div className="lg:w-4/6 lg:ml-4 mr-2">
                    {
                        auth?.user?.role === "SUPER_ADMIN" || auth?.user?.role === "INSTITUTE_ADMIN" ?
                            <AdminPayment />
                            :
                            <div className=""></div>
                    }
                </div>
            </div>

        </div>
    )
}

export default DashHome