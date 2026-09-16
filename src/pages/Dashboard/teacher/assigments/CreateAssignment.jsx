import React, { useEffect, useState } from 'react'
import useForm from '../../../../hooks/useForm'
import Toast from '../../../../component/Toast/Toast'
import { useNavigate } from 'react-router-dom'
import API from '../../../../services/api'
import DefaultButton from '../../../../component/Buttons/DefaultButton'
import DefaultInput from '../../../../component/Form/DefaultInput'
import TextAreaInput from '../../../../component/Form/TextAreaInput'
import Dropdown from '../../../../component/Form/Dropdown'
import FileInput from '../../../../component/Form/FileInput'
import { useAuth } from '../../../../context/AuthContext'

const CreateAssignment = () => {
    const token = localStorage.getItem('access_token')
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const [classes, setClasses] = useState([])

    const { auth } = useAuth()

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

    const { values, handleChange } = useForm({
        class: '',
        name: '',
        description: '',
        due_date: '',
        assigment_docs: null
    })

    const handleSubmitAssignment = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const formData = new FormData()

            formData.append('class', values.class)
            formData.append('name', values.name)
            formData.append('description', values.description)
            formData.append('due_date', values.due_date)

            const assignmentDocsInput = e.currentTarget.elements.namedItem('assigment_docs')
            const assignmentDocs = assignmentDocsInput?.files?.[0]

            if (assignmentDocs) {
                formData.append('assigment_docs', assignmentDocs)
            }

            const res = await API.post('/assigments/create-assigment', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message
                })

                setTimeout(() => {
                    navigate('/dashboard/assigments')
                }, 3000)
            }
        } catch (err) {
            setToast({
                success: false,
                message: err.response?.data?.message || 'Failed to create assignment'
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full bg-white p-4">
            {toast && (
                <div className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div className="mb-2 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-violet-400">
                            Education SaaS {auth?.user?.role}
                        </p>
                    </div>

                    <h1 className="text-xl font-black tracking-tight text-violet-950">
                        Create Assignment
                    </h1>

                    <p className="mt-1 text-sm font-medium text-slate-400">
                        Create a new assignment for your class
                    </p>
                </div>

                <div className="flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-violet-50 to-cyan-50 px-4 py-2.5">
                    <span className="h-2 w-2 rounded-full bg-lime-400" />
                    <span className="text-xs font-bold text-violet-700">
                        New Assignment
                    </span>
                </div>
            </div>

            <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-violet-100/70">
                <div className="border-b border-violet-50 bg-gradient-to-r from-violet-50 via-white to-cyan-50 px-5 py-4 sm:px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 text-white shadow-md shadow-violet-200">
                            <span className="text-sm font-black">Z</span>
                        </div>

                        <div>
                            <h2 className="text-sm font-black text-violet-950">
                                Assignment Configuration
                            </h2>

                            <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                                Configure assignment details, class and submission document
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmitAssignment} className="p-5 sm:p-6">
                    <div className="mb-6">
                        <div className="mb-4 flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                            <h3 className="text-xs font-black uppercase tracking-[0.15em] text-violet-700">
                                Assignment Information
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <Dropdown
                                label="Class"
                                name="class"
                                value={values.class}
                                onChange={handleChange}
                                required
                                options={[
                                    ...classes.map((classItem) => ({
                                        value: classItem._id,
                                        label: classItem.class_name
                                    }))
                                ]}
                            />

                            <DefaultInput
                                label="Assignment Name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                placeholder="Enter assignment name"
                                required
                            />

                            <DefaultInput
                                label="Due Date"
                                name="due_date"
                                type="date"
                                value={values.due_date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="mb-4 flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                            <h3 className="text-xs font-black uppercase tracking-[0.15em] text-violet-700">
                                Assignment Description
                            </h3>
                        </div>

                        <TextAreaInput
                            label="Description"
                            name="description"
                            value={values.description}
                            onChange={handleChange}
                            placeholder="Enter assignment description"
                            rows={5}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <div className="mb-4 flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-lime-500" />
                            <h3 className="text-xs font-black uppercase tracking-[0.15em] text-violet-700">
                                Assignment Document
                            </h3>
                        </div>

                        <div className="rounded-2xl bg-gradient-to-r from-violet-50 via-white to-cyan-50 p-4 ring-1 ring-violet-100/70 sm:p-5">
                            <FileInput
                                label="Assignment Document"
                                name="assigment_docs"
                                value={values.assigment_docs}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {values.class && (
                        <div className="mb-6 rounded-2xl bg-gradient-to-r from-violet-50 via-white to-cyan-50 p-4 ring-1 ring-violet-100/70 sm:p-5">
                            <div className="mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-lime-500" />
                                    <h3 className="text-xs font-black uppercase tracking-[0.15em] text-violet-700">
                                        Selected Class
                                    </h3>
                                </div>

                                <p className="mt-1 text-[10px] font-medium text-slate-400">
                                    Assignment will be available to the students in this class
                                </p>
                            </div>

                            <div className="rounded-xl bg-white px-4 py-3 ring-1 ring-violet-100/70">
                                <p className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-400">
                                    Class
                                </p>

                                <p className="mt-1 text-xs font-extrabold text-violet-950">
                                    {classes.find((classItem) => classItem._id === values.class)?.class_name || 'No class selected'}
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col gap-3 border-t border-violet-50 pt-5 sm:flex-row sm:items-center sm:justify-end">
                        <DefaultButton
                            type="submit"
                            label={loading ? 'Creating Assignment...' : 'Create Assignment'}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateAssignment