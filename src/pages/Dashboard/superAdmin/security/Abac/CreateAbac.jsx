import React, { useState } from 'react'
import useForm from '../../../../../hooks/useForm'
import { useNavigate } from 'react-router-dom'
import { MdAdminPanelSettings, MdSecurity, MdPolicy, MdDelete } from 'react-icons/md'
import { FiShield, FiUsers, FiKey, FiCheckCircle, FiEdit, FiFileText } from 'react-icons/fi'
import CreateRole from './CreateRole'
import CreatePermission from './CreatePermission'
import CreatePolicy from './CreatePolicy'
import RemoveRoles from './RemoveRoles'
import UpdatePermissions from './UpdatePermissions'
import UpdatePolicies from './UpdatePolicies'

const CreateAbac = () => {
    const [clickvalue, setClickValue] = useState(1)

    const headleClickValuse = async (value) => {
        setClickValue(value)
    }

    const tabs = [
        {
            id: 1,
            name: 'Create Roles',
            description: 'Define administrative roles and responsibilities',
            icon: <FiUsers className="w-5 h-5" />,
            color: 'indigo'
        },
        {
            id: 2,
            name: 'Create Permissions',
            description: 'Control access to system resources and actions',
            icon: <FiKey className="w-5 h-5" />,
            color: 'lime'
        },
        {
            id: 3,
            name: 'Create Policies',
            description: 'Configure attribute-based access policies',
            icon: <MdPolicy className="w-5 h-5" />,
            color: 'maroon'
        },
        {
            id: 4,
            name: 'Remove Role',
            description: 'Remove existing roles from the authorization system',
            icon: <MdDelete className="w-5 h-5" />,
            color: 'red'
        },
        {
            id: 5,
            name: 'Update Permissions',
            description: 'Modify existing permissions and access settings',
            icon: <FiEdit className="w-5 h-5" />,
            color: 'blue'
        },
        {
            id: 6,
            name: 'Update Policies',
            description: 'Modify existing attribute-based access policies',
            icon: <FiFileText className="w-5 h-5" />,
            color: 'purple'
        }
    ]

    return (
        <div className="min-h-screen bg-slate-50">

            <div className="w-full">

                <div className="w-full bg-white border border-slate-200 shadow-sm">

                    <div className="relative overflow-hidden border-b border-slate-200">

                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-700" />

                        <div className="p-4 sm:p-6 md:p-8">

                            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                                <div className="flex items-start gap-3 sm:gap-4 min-w-0">

                                    <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-indigo-50 border border-indigo-100 text-indigo-700 shrink-0">
                                        <MdAdminPanelSettings className="w-6 h-6 sm:w-7 sm:h-7" />
                                    </div>

                                    <div className="min-w-0">

                                        <div className="flex flex-wrap items-center gap-2 mb-1">

                                            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-indigo-950 break-words">
                                                ABAC Access Control Management
                                            </h1>

                                            <span className="flex items-center gap-1 px-2 py-1 bg-lime-50 text-lime-700 border border-lime-100 text-[10px] font-bold uppercase tracking-wider shrink-0">
                                                <FiCheckCircle className="w-3 h-3" />
                                                Active
                                            </span>

                                        </div>

                                        <p className="text-sm text-slate-500 leading-5">
                                            Manage roles, permissions and attribute-based security policies
                                        </p>

                                    </div>

                                </div>

                                <div className="flex items-center gap-3 px-3 sm:px-4 py-3 bg-slate-50 border border-slate-200 w-full lg:w-auto">

                                    <FiShield className="w-5 h-5 text-[#8D153A] shrink-0" />

                                    <div className="min-w-0">

                                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            Security Model
                                        </p>

                                        <p className="text-sm font-bold text-indigo-950 break-words">
                                            Attribute-Based Access Control
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="flex h-1">

                            <span className="flex-1 bg-indigo-700" />

                            <span className="w-12 sm:w-20 bg-lime-400" />

                            <span className="w-8 sm:w-12 bg-[#8D153A]" />

                        </div>

                    </div>

                    <div className="p-3 sm:p-4 md:p-6">

                        <div className="mb-4 sm:mb-5">

                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                                Access Control Configuration
                            </p>

                            <p className="text-sm text-slate-500 mt-1 leading-5">
                                Select a management area to configure your authorization framework.
                            </p>

                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

                            {tabs.map((tab) => {

                                const isActive = clickvalue === tab.id

                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => headleClickValuse(tab.id)}
                                        className={`relative w-full min-w-0 text-left p-4 sm:p-5 border transition-all duration-200 ${isActive
                                            ? "bg-indigo-50 border-indigo-200 shadow-sm"
                                            : "bg-white border-slate-200 hover:border-indigo-200 hover:bg-slate-50"
                                            }`}
                                    >

                                        {isActive && (
                                            <span className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-700" />
                                        )}

                                        <div className="flex items-start justify-between gap-3">

                                            <div className={`flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 shrink-0 ${isActive
                                                ? "bg-indigo-700 text-white"
                                                : "bg-slate-100 text-slate-500"
                                                }`}>
                                                {tab.icon}
                                            </div>

                                            {isActive && (
                                                <span className="flex items-center gap-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-lime-700 bg-lime-50 border border-lime-100 px-2 py-1 shrink-0">
                                                    <span className="w-1.5 h-1.5 bg-lime-500" />
                                                    Selected
                                                </span>
                                            )}

                                        </div>

                                        <div className="mt-4 min-w-0">

                                            <h2 className={`text-sm font-bold break-words ${isActive
                                                ? "text-indigo-950"
                                                : "text-slate-700"
                                                }`}>
                                                {tab.name}
                                            </h2>

                                            <p className="text-xs text-slate-500 leading-5 mt-1 break-words">
                                                {tab.description}
                                            </p>

                                        </div>

                                        <div className={`mt-4 h-px ${isActive
                                            ? "bg-indigo-100"
                                            : "bg-slate-100"
                                            }`} />

                                        <div className="flex items-center justify-between gap-2 mt-3">

                                            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                Configuration
                                            </span>

                                            <span className={`text-xs font-bold ${isActive
                                                ? "text-indigo-700"
                                                : "text-slate-400"
                                                }`}>
                                                {String(tab.id).padStart(2, '0')}
                                            </span>

                                        </div>

                                    </button>
                                )
                            })}

                        </div>

                        <div className="mt-5 sm:mt-6 border border-slate-200 bg-white">

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-5 py-4 border-b border-slate-200 bg-slate-50">

                                <div className="flex items-center gap-3 min-w-0">

                                    <div className="w-8 h-8 flex items-center justify-center bg-indigo-50 text-indigo-700 shrink-0">
                                        {clickvalue === 1 && <FiUsers className="w-4 h-4" />}
                                        {clickvalue === 2 && <FiKey className="w-4 h-4" />}
                                        {clickvalue === 3 && <MdPolicy className="w-4 h-4" />}
                                        {clickvalue === 4 && <MdDelete className="w-4 h-4" />}
                                        {clickvalue === 5 && <FiEdit className="w-4 h-4" />}
                                        {clickvalue === 6 && <FiFileText className="w-4 h-4" />}
                                    </div>

                                    <div className="min-w-0">

                                        <h3 className="text-sm font-bold text-indigo-950 break-words">
                                            {clickvalue === 1 && "Role Configuration"}
                                            {clickvalue === 2 && "Permission Configuration"}
                                            {clickvalue === 3 && "Policy Configuration"}
                                            {clickvalue === 4 && "Remove Role Configuration"}
                                            {clickvalue === 5 && "Update Permission Configuration"}
                                            {clickvalue === 6 && "Update Policy Configuration"}
                                        </h3>

                                        <p className="text-[11px] text-slate-400">
                                            ABAC management workspace
                                        </p>

                                    </div>

                                </div>

                                <div className="flex items-center gap-2">

                                    <span className="w-2 h-2 bg-lime-500 shrink-0" />

                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                        Ready
                                    </span>

                                </div>

                            </div>

                            <div className="p-3 sm:p-5 md:p-6 min-w-0 overflow-x-auto">

                                {
                                    (() => {
                                        if (clickvalue === 1) {
                                            return <CreateRole />
                                        }
                                        else if (clickvalue === 2) {
                                            return <CreatePermission />
                                        }
                                        else if (clickvalue === 3) {
                                            return <CreatePolicy />
                                        }
                                        else if(clickvalue === 4) {
                                            return <RemoveRoles />
                                        }
                                        else if(clickvalue === 5) {
                                            return <UpdatePermissions />
                                        }
                                        else if(clickvalue === 6) {
                                            return <UpdatePolicies />
                                        }
                                    })()
                                }

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default CreateAbac