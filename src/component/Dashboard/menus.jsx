import {
    BiSolidDashboard,
    BiBuildings,
    BiShield,
} from "react-icons/bi";

import {
    FaUsers,
    FaUserShield,
    FaClipboardList,
    FaUserGraduate,
    FaSchool,
    FaBook,
    FaCalendarAlt,
    FaUserCheck,
    FaTasks,
    FaClipboardCheck,
    FaChartLine,
    FaChartBar,
    FaFileAlt,
    FaBullhorn,
    FaEnvelope,
    FaBell,
    FaBuilding,
    FaGraduationCap,
    FaCreditCard,
} from "react-icons/fa";

import {
    MdBusiness,
    MdWorkspacePremium,
    MdSecurity,
    MdSettings,
    MdHistory,
    MdAssessment,
    MdPeople,
    MdAdminPanelSettings,
    MdFolder,
    MdPayments,
} from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";

import { FaChalkboardUser, FaFile, FaFileCircleCheck, FaPeopleGroup, FaRankingStar, FaTags, FaUserLock } from "react-icons/fa6";


export const superAdminMenu = [
    {
        section: "Main",
        items: [
            {
                name: "Dashboard",
                link: "/dashboard",
                icon: <BiSolidDashboard />,
            },
        ],
    },
    {
        section: "institute",
        items: [
            {
                name: "institute Management",
                icon: <FaSchool />,
                submenu: [
                    {
                        name: "Institute",
                        link: "/dashboard/institutes",
                    },
                    {
                        name: "Create New Institute",
                        link: "/dashboard/institute/create-institute",
                    },
                ],
            },
        ],
    },
    {
        section: "System",
        items: [
            {
                name: "Plan Management",
                icon: <FaTags />,
                submenu: [
                    {
                        name: "Plans",
                        link: "/dashboard/plans",
                    },
                    {
                        name: "Create New Plans",
                        link: "/dashboard/plan/create-plans",
                    },
                ],
            },
        ],
    },
    {
        section: "Payment",
        items: [
            {
                name: "Payments Management",
                icon: <MdPayments />,
                submenu: [
                    {
                        name: "Payments",
                        link: "/dashboard/payments",
                    },
                ],
            },
        ],
    },
    {
        section: "Security",
        items: [
            {
                name: "ABAC Management",
                icon: <FaUserLock />,
                submenu: [
                    {
                        name: "ABAC",
                        link: "/dashboard/security/abac",
                    },
                    {
                        name: "Create ABACs",
                        link: "/dashboard/security/create-abacs",
                    },
                    {
                        name: "Permission Assign ",
                        link: "/dashboard/security/permission-assign",
                    },
                ],
            },
            {
                name: "User Management",
                icon: <FaUsers />,
                submenu: [
                    {
                        name: "Users",
                        link: "/dashboard/users",
                    },
                ],
            },
            {
                name: "Security Management",
                icon: <MdSecurity />,
                submenu: [
                    {
                        name: "Login history",
                        link: "/dashboard/security/login-history",
                    },
                    {
                        name: "Audit Logs",
                        link: "/dashboard/security/audit-logs",
                    },
                ],
            },
        ],
    },
];


export const instituteAdminMenu = [
    {
        section: "Main",
        items: [
            {
                name: "Dashboard",
                link: "/dashboard",
                icon: <BiSolidDashboard />,
            },
        ],
    },
    {
        section: "Payment",
        items: [
            {
                name: "Payments Management",
                icon: <MdPayments />,
                submenu: [
                    {
                        name: "Payments",
                        link: "/dashboard/my-payments",
                    },
                    {
                        name: "Institute Payments",
                        link: "/dashboard/manage-institute-payments",
                    },
                    {
                        name: "Create Payments",
                        link: "/dashboard/payment/create-payments",
                    },
                ],
            },
        ],
    },

    {
        section: "Institute Users",
        items: [
            {
                name: "Student Management",
                icon: <FaUserGraduate />,
                submenu: [
                    {
                        name: "Students",
                        link: "/dashboard/students",
                    },
                    {
                        name: "Create Student",
                        link: "/dashboard/student/create-student",
                    },
                ],
            },
            {
                name: "Teacher Management",
                icon: <FaChalkboardUser />,
                submenu: [
                    {
                        name: "Teachers",
                        link: "/dashboard/teachers",
                    },
                    {
                        name: "Create Student",
                        link: "/dashboard/teacher/create-teacher",
                    },
                ],
            },
        ],
    },

    {
        section: "Classes",
        items: [
            {
                name: "Classes Management",
                icon: <FaPeopleGroup />,
                submenu: [
                    {
                        name: "Classes",
                        link: "/dashboard/classes",
                    },
                    {
                        name: "Create Classes",
                        link: "/dashboard/class/create-class",
                    },
                ],
            },
            {
                name: "Time Table",
                icon: <FaCalendarAlt />,
                submenu: [
                    {
                        name: "Timetable",
                        link: "/dashboard/timetable",
                    },
                ],
            },
        ],
    },
];


export const studentMenu = [
    {
        section: "Main",
        items: [
            {
                name: "Dashboard",
                link: "/dashboard",
                icon: <BiSolidDashboard />,
            },
        ],
    },

    {
        section: "Classes",
        items: [
            {
                name: "My Classes",
                icon: <FaPeopleGroup />,
                submenu: [
                    {
                        name: "Classes",
                        link: "/dashboard/student-classes",
                    },
                    {
                        name: "My Classes Timetable",
                        link: "/dashboard/student-classe/timetable",
                    },
                ],
            },
        ],
    },


    {
        section: "Exam & Marks",
        items: [
            {
                name: "Assigments",
                icon: <FaFile />,
                submenu: [
                    {
                        name: "My Assigments",
                        link: "/dashboard/my-assigments",
                    },
                ],
            },
            {
                name: "My Progress",
                icon: <FaRankingStar />,
                submenu: [
                    {
                        name: "Progress",
                        link: "/dashboard/my-progress",
                    },
                ],
            },
        ],
    },

    {
        section: "Payment",
        items: [
            {
                name: "Payments Management",
                icon: <MdPayments />,
                submenu: [
                    {
                        name: "Payments",
                        link: "/dashboard/my-payments",
                    },
                    {
                        name: "Create Payments",
                        link: "/dashboard/payment/create-payments",
                    },
                ],
            },
        ],
    },

];


export const teacherMenu = [
    {
        section: "Main",
        items: [
            {
                name: "Dashboard",
                link: "/dashboard",
                icon: <BiSolidDashboard />,
            },
        ],
    },

    {
        section: "Classes",
        items: [
            {
                name: "My Classes",
                icon: <FaPeopleGroup />,
                submenu: [
                    {
                        name: "Classes",
                        link: "/dashboard/my-classes",
                    },
                    {
                        name: "My Classes Timetable",
                        link: "/dashboard/my-class/timetable",
                    },
                ],
            },
        ],
    },

    {
        section: "Attendance",
        items: [
            {
                name: "Attendance",
                icon: <FaUserCheck />,
                submenu: [
                    {
                        name: "Mark Attendance",
                        link: "/dashboard/mark-attendance",
                    },
                    {
                        name: "Attendance",
                        link: "/dashboard/attendances",
                    },
                ],
            },
        ],
    },

    {
        section: "Students",
        items: [
            {
                name: "My Students",
                icon: <FaPeopleGroup />,
                submenu: [
                    {
                        name: "Students",
                        link: "/dashboard/my-students",
                    },
                ],
            },
        ],
    },

    {
        section: "Exam & Marks",
        items: [
            {
                name: "Assigments",
                icon: <FaFile />,
                submenu: [
                    {
                        name: "Assigments",
                        link: "/dashboard/assigments",
                    },
                    {
                        name: "Create Assigments",
                        link: "/dashboard/create-assigments",
                    },
                ],
            },
        ],
    },

    {
        section: "Payment",
        items: [
            {
                name: "Payments Management",
                icon: <MdPayments />,
                submenu: [
                    {
                        name: "Payments",
                        link: "/dashboard/my-payments",
                    },
                    {
                        name: "Create Payments",
                        link: "/dashboard/payment/create-payments",
                    },
                ],
            },
        ],
    },



];

export const systemstaffMenu = [
    {
        section: "Main",
        items: [
            {
                name: "Dashboard",
                link: "/dashboard",
                icon: <BiSolidDashboard />,
            },
        ],
    },


    {
        section: "Payment",
        items: [
            {
                name: "Payments Management",
                icon: <MdPayments />,
                submenu: [
                    {
                        name: "Payments",
                        link: "/dashboard/my-payments",
                    },
                    {
                        name: "Create Payments",
                        link: "/dashboard/payment/create-payments",
                    },
                ],
            },
        ],
    },

];

export const menus = {
    SUPER_ADMIN: superAdminMenu,
    INSTITUTE_ADMIN: instituteAdminMenu,
    STUDENT: studentMenu,
    TEACHER: teacherMenu,
    SYSTEM_STAFF: systemstaffMenu,
};