import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WebSite from '../layouts/WebSite'
import Test from '../pages/testings/Test'
import DefultError from '../component/Errors/DefultError'
import Login from '../pages/auth/Login'
import Home from '../pages/Home/Home'
import Registation from '../pages/auth/Registation'
import VerifyEmail from '../pages/auth/VerifyEmail'
import ForgetPassword from '../pages/auth/ForgetPassword'
import ResetPassword from '../pages/auth/ResetPassword'
import PrivateRoute from './PrivateRoute'
import Dashboard from '../layouts/Dashboard'
import DashError from '../component/Dashboard/DashError'
import Unauthorized from './Unauthorized'
import ABAC from '../pages/Dashboard/superAdmin/security/Abac/ABAC'
import CreateAbac from '../pages/Dashboard/superAdmin/security/Abac/CreateAbac'
import AssignPermissions from '../pages/Dashboard/superAdmin/security/Abac/AssignPermissions'
import MyProfile from '../pages/Dashboard/MyProfile'
import Pricing from '../pages/Home/Pricing'
import Features from '../pages/Home/Features'
import Solutions from '../pages/Home/Solutions'
import Resources from '../pages/Home/Resources'
import Contact from '../pages/Home/Contact'
import Platform from '../pages/Home/Platform'
import PrivacyPolicy from '../pages/Home/PrivacyPolicy'
import TermsOfService from '../pages/Home/TermsOfService'
import Users from '../pages/Dashboard/superAdmin/Users/Users'
import ViewUser from '../pages/Dashboard/superAdmin/Users/ViewUser'
import Plans from '../pages/Dashboard/superAdmin/plans/Plans'
import CreatePlan from '../pages/Dashboard/superAdmin/plans/CreatePlan'
import ViewPlan from '../pages/Dashboard/superAdmin/plans/ViewPlan'
import Institutes from '../pages/Dashboard/superAdmin/institute/Institutes'
import CreateInstitutes from '../pages/Dashboard/superAdmin/institute/CreateInstitutes'
import ViewInstitute from '../pages/Dashboard/superAdmin/institute/ViewInstitute'
import LoginHistory from '../pages/Dashboard/superAdmin/security/auditlogs/LoginHistory'
import ViewAuditlogs from '../pages/Dashboard/superAdmin/security/auditlogs/ViewAuditlogs'
import ViewAuditlog from '../pages/Dashboard/superAdmin/security/auditlogs/ViewAuditlog'
import CreatePayment from '../pages/Dashboard/payments/CreatePayment'
import PaymentsSP from '../pages/Dashboard/payments/PaymentsSP'
import ViewPayment from '../pages/Dashboard/payments/ViewPayment'
import MyPayments from '../pages/Dashboard/MyPayments'
import ViewMyPayment from '../pages/Dashboard/ViewMyPayment'
import CreateStudents from '../pages/Dashboard/instituteAdmin/Students/CreateStudents'
import CreateTeacher from '../pages/Dashboard/instituteAdmin/Teachers/CreateTeacher'
import Students from '../pages/Dashboard/instituteAdmin/Students/Students'
import Teacher from '../pages/Dashboard/instituteAdmin/Teachers/Teacher'
import ViewStudent from '../pages/Dashboard/instituteAdmin/Students/ViewStudent'
import ViewTeacher from '../pages/Dashboard/instituteAdmin/Teachers/ViewTeacher'
import PaymentsIA from '../pages/Dashboard/payments/PaymentsIA'
import ViewInstitutePayment from '../pages/Dashboard/payments/ViewInstitutePayment'
import Settings from '../pages/Dashboard/Settings'
import CreateClass from '../pages/Dashboard/instituteAdmin/classes/CreateClass'
import Classes from '../pages/Dashboard/instituteAdmin/classes/Classes'
import ViewClass from '../pages/Dashboard/instituteAdmin/classes/ViewClass'
import ClassesTimetable from '../pages/Dashboard/instituteAdmin/timetable/ClassesTImetable'
import MyClass from '../pages/Dashboard/teacher/classes/MyClass'
import ViewMyClass from '../pages/Dashboard/teacher/classes/ViewMyClass'
import MyTimetable from '../pages/Dashboard/teacher/classes/MyTimetable'
import MyStudents from '../pages/Dashboard/teacher/students/MyStudents'
import ViewMyStudent from '../pages/Dashboard/teacher/students/ViewMyStudent'
import CreateAssignment from '../pages/Dashboard/teacher/assigments/CreateAssignment'
import Assigments from '../pages/Dashboard/teacher/assigments/Assigments'
import ViewAssignment from '../pages/Dashboard/teacher/assigments/ViewAssignment'
import MyStdClasses from '../pages/Dashboard/studentDash/classes/MyStdClasses'
import MyStdTimetable from '../pages/Dashboard/studentDash/classes/MyStdTimetable'
import ViewStdClass from '../pages/Dashboard/studentDash/classes/ViewStdClass'
import MyAssignments from '../pages/Dashboard/studentDash/assignments/MyAssignments'
import MyProgress from '../pages/Dashboard/studentDash/progress/MyProgress'
import CreateAttendance from '../pages/Dashboard/teacher/attendance/CreateAttendance'
import Attendances from '../pages/Dashboard/teacher/attendance/Attendances'
import ViewAttendance from '../pages/Dashboard/teacher/attendance/ViewAttendance'
import DashHome from '../pages/Dashboard/DashHome'
import Notifications from '../pages/Dashboard/Notifications'


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<WebSite />} >
                    <Route index element={<Home />} />
                    <Route path='*' element={<DefultError />} />

                    <Route path='pricing' element={<Pricing />} />
                    <Route path='features' element={<Features />} />
                    <Route path='solutions' element={<Solutions />} />
                    <Route path='resources' element={<Resources />} />
                    <Route path='contact' element={<Contact />} />
                    <Route path='platform' element={<Platform />} />

                    <Route path='privacy' element={<PrivacyPolicy />} />
                    <Route path='terms' element={<TermsOfService />} />


                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Registation />} />
                    <Route path='verify-email' element={<VerifyEmail />} />
                    <Route path='forget-password' element={<ForgetPassword />} />
                    <Route path='reset-password' element={<ResetPassword />} />
                    <Route path='unauthorized' element={<Unauthorized />} />
                </Route>

                <Route path='/dashboard/' element={<PrivateRoute roles={['SUPER_ADMIN', 'INSTITUTE_ADMIN', 'GUEST', 'STUDENT', 'SYSTEM_STAFF', 'TEACHER']} ><Dashboard /></PrivateRoute>}>
                    <Route path='*' element={<PrivateRoute roles={['SUPER_ADMIN', 'INSTITUTE_ADMIN', 'GUEST', 'STUDENT', 'SYSTEM_STAFF', 'TEACHER']} ><DashError /></PrivateRoute>} />
                    <Route index element={<PrivateRoute roles={['SUPER_ADMIN', 'INSTITUTE_ADMIN', 'GUEST', 'STUDENT', 'SYSTEM_STAFF', 'TEACHER']} ><DashHome /></PrivateRoute>}/>

                    <Route path='my-profile' element={<PrivateRoute roles={['SUPER_ADMIN', 'INSTITUTE_ADMIN', 'GUEST', 'STUDENT', 'SYSTEM_STAFF', 'TEACHER']} ><MyProfile /></PrivateRoute>} />
                    <Route path='settings' element={<PrivateRoute roles={['SUPER_ADMIN', 'INSTITUTE_ADMIN', 'GUEST', 'STUDENT', 'SYSTEM_STAFF', 'TEACHER']} ><Settings /></PrivateRoute>} />
                    <Route path='notifications' element={<PrivateRoute roles={['SUPER_ADMIN', 'INSTITUTE_ADMIN', 'GUEST', 'STUDENT', 'SYSTEM_STAFF', 'TEACHER']} ><Notifications /></PrivateRoute>} />



                    <Route path='security/abac' element={<PrivateRoute roles={['SUPER_ADMIN']} ><ABAC /></PrivateRoute>} />
                    <Route path='security/create-abacs' element={<PrivateRoute roles={['SUPER_ADMIN']} ><CreateAbac /></PrivateRoute>} />
                    <Route path='security/permission-assign' element={<PrivateRoute roles={['SUPER_ADMIN']} ><AssignPermissions /></PrivateRoute>} />
                    <Route path='security/login-history' element={<PrivateRoute roles={['SUPER_ADMIN']} ><LoginHistory /></PrivateRoute>} />
                    <Route path='security/audit-logs' element={<PrivateRoute roles={['SUPER_ADMIN']} ><ViewAuditlogs /></PrivateRoute>} />
                    <Route path='security/view-auditlog/:id' element={<PrivateRoute roles={['SUPER_ADMIN']} ><ViewAuditlog /></PrivateRoute>} />

                    <Route path='users' element={<PrivateRoute roles={['SUPER_ADMIN']} ><Users /></PrivateRoute>} />
                    <Route path='view-user/:id' element={<PrivateRoute roles={['SUPER_ADMIN']} ><ViewUser /></PrivateRoute>} />

                    <Route path='plans' element={<PrivateRoute roles={['SUPER_ADMIN']} ><Plans /></PrivateRoute>} />
                    <Route path='plan/create-plans' element={<PrivateRoute roles={['SUPER_ADMIN']} ><CreatePlan /></PrivateRoute>} />
                    <Route path='plan/view-plan/:id' element={<PrivateRoute roles={['SUPER_ADMIN']} ><ViewPlan /></PrivateRoute>} />

                    <Route path='institutes' element={<PrivateRoute roles={['SUPER_ADMIN']} ><Institutes /></PrivateRoute>} />
                    <Route path='institute/create-institute' element={<PrivateRoute roles={['SUPER_ADMIN']} ><CreateInstitutes /></PrivateRoute>} />
                    <Route path='institute/view-institute/:id' element={<PrivateRoute roles={['SUPER_ADMIN']} ><ViewInstitute /></PrivateRoute>} />



                    <Route path='payment/create-payments' element={<PrivateRoute roles={['SUPER_ADMIN', 'INSTITUTE_ADMIN', 'GUEST', 'STUDENT', 'SYSTEM_STAFF', 'TEACHER']} ><CreatePayment /></PrivateRoute>} />
                    <Route path='my-payments' element={<PrivateRoute roles={['SUPER_ADMIN', 'INSTITUTE_ADMIN', 'GUEST', 'STUDENT', 'SYSTEM_STAFF', 'TEACHER']} ><MyPayments /></PrivateRoute>} />
                    <Route path='view-my-payment/:id' element={<PrivateRoute roles={['SUPER_ADMIN', 'INSTITUTE_ADMIN', 'GUEST', 'STUDENT', 'SYSTEM_STAFF', 'TEACHER']} ><ViewMyPayment /></PrivateRoute>} />

                    <Route path='payments' element={<PrivateRoute roles={['SUPER_ADMIN']} ><PaymentsSP /></PrivateRoute>} />
                    <Route path='payment/view-payment/:id' element={<PrivateRoute roles={['SUPER_ADMIN']} ><ViewPayment /></PrivateRoute>} />

                    <Route path='students' element={<PrivateRoute roles={['SUPER_ADMIN', 'INSTITUTE_ADMIN']} ><Students /></PrivateRoute>} />
                    <Route path='student/create-student' element={<PrivateRoute roles={['SUPER_ADMIN', 'INSTITUTE_ADMIN']} ><CreateStudents /></PrivateRoute>} />
                    <Route path='student/view-student/:id' element={<PrivateRoute roles={['SUPER_ADMIN', 'INSTITUTE_ADMIN']} ><ViewStudent /></PrivateRoute>} />



                    <Route path='teachers' element={<PrivateRoute roles={['SUPER_ADMIN', 'INSTITUTE_ADMIN']} ><Teacher /></PrivateRoute>} />
                    <Route path='teacher/create-teacher' element={<PrivateRoute roles={['SUPER_ADMIN', 'INSTITUTE_ADMIN']} ><CreateTeacher /></PrivateRoute>} />
                    <Route path='teacher/view-teacher/:id' element={<PrivateRoute roles={['SUPER_ADMIN', 'INSTITUTE_ADMIN']} ><ViewTeacher /></PrivateRoute>} />
                    <Route path='manage-institute-payments' element={<PrivateRoute roles={['SUPER_ADMIN', 'INSTITUTE_ADMIN']} ><PaymentsIA /></PrivateRoute>} />
                    <Route path='payment/view-institute-payment/:id' element={<PrivateRoute roles={['SUPER_ADMIN', 'INSTITUTE_ADMIN']} ><ViewInstitutePayment /></PrivateRoute>} />


                    <Route path='classes' element={<PrivateRoute roles={['SUPER_ADMIN', 'INSTITUTE_ADMIN']} ><Classes /></PrivateRoute>} />
                    <Route path='class/create-class' element={<PrivateRoute roles={['SUPER_ADMIN', 'INSTITUTE_ADMIN']} ><CreateClass /></PrivateRoute>} />
                    <Route path='classes/view-class/:id' element={<PrivateRoute roles={['SUPER_ADMIN', 'INSTITUTE_ADMIN']} ><ViewClass /></PrivateRoute>} />
                    
                    <Route path='timetable' element={<PrivateRoute roles={['SUPER_ADMIN', 'INSTITUTE_ADMIN']} ><ClassesTimetable /></PrivateRoute>} />


                    {/* teacher */}
                    <Route path='my-classes' element={<PrivateRoute roles={['SUPER_ADMIN', 'INSTITUTE_ADMIN', 'TEACHER']} ><MyClass /></PrivateRoute>} />
                    <Route path='view-my-class/:id' element={<PrivateRoute roles={['SUPER_ADMIN', 'INSTITUTE_ADMIN', 'TEACHER']} ><ViewMyClass /></PrivateRoute>} />
                    <Route path='my-class/timetable' element={<PrivateRoute roles={['SUPER_ADMIN', 'INSTITUTE_ADMIN', 'TEACHER']} ><MyTimetable /></PrivateRoute>} />
                    
                    <Route path='my-students' element={<PrivateRoute roles={['SUPER_ADMIN', 'INSTITUTE_ADMIN', 'TEACHER']} ><MyStudents /></PrivateRoute>} />
                    <Route path='my-student/view-my-student/:id' element={<PrivateRoute roles={['SUPER_ADMIN', 'INSTITUTE_ADMIN', 'TEACHER']} ><ViewMyStudent /></PrivateRoute>} />
                    
                    <Route path='assigments' element={<PrivateRoute roles={['SUPER_ADMIN', 'INSTITUTE_ADMIN', 'TEACHER']} ><Assigments /></PrivateRoute>} />
                    <Route path='create-assigments' element={<PrivateRoute roles={['SUPER_ADMIN', 'INSTITUTE_ADMIN', 'TEACHER']} ><CreateAssignment /></PrivateRoute>} />
                    
                    <Route path='assigment/view-assigment/:id' element={<PrivateRoute roles={['SUPER_ADMIN', 'INSTITUTE_ADMIN', 'TEACHER', 'STUDENT']} ><ViewAssignment /></PrivateRoute>} />
                    <Route path='mark-attendance' element={<PrivateRoute roles={['SUPER_ADMIN', 'INSTITUTE_ADMIN', 'TEACHER']} ><CreateAttendance /></PrivateRoute>} />
                    <Route path='attendances' element={<PrivateRoute roles={['SUPER_ADMIN', 'INSTITUTE_ADMIN', 'TEACHER']} ><Attendances /></PrivateRoute>} />
                    <Route path='attendance/view-attendance/:id' element={<PrivateRoute roles={['SUPER_ADMIN', 'INSTITUTE_ADMIN', 'TEACHER']} ><ViewAttendance /></PrivateRoute>} />
                    

                    {/* student */}
                    <Route path='student-classes' element={<PrivateRoute roles={['SUPER_ADMIN', 'INSTITUTE_ADMIN', 'STUDENT']} ><MyStdClasses /></PrivateRoute>} />
                    <Route path='student-classe/timetable' element={<PrivateRoute roles={['SUPER_ADMIN', 'INSTITUTE_ADMIN', 'STUDENT']} ><MyStdTimetable /></PrivateRoute>} />
                    <Route path='student-classe/view-class/:id' element={<PrivateRoute roles={['SUPER_ADMIN', 'INSTITUTE_ADMIN', 'STUDENT']} ><ViewStdClass /></PrivateRoute>} />

                    <Route path='my-assigments' element={<PrivateRoute roles={['SUPER_ADMIN', 'INSTITUTE_ADMIN', 'STUDENT']} ><MyAssignments /></PrivateRoute>} />
                    <Route path='my-progress' element={<PrivateRoute roles={['SUPER_ADMIN', 'INSTITUTE_ADMIN', 'STUDENT']} ><MyProgress /></PrivateRoute>} />

                    


                </Route>


            </Routes>
        </BrowserRouter>
    )
}

export default App

