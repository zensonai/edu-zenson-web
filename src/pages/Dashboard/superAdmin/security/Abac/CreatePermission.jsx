import React, { useState } from 'react'
import useForm from '../../../../../hooks/useForm'
import { useNavigate } from 'react-router-dom'
import API from '../../../../../services/api'
import Toast from '../../../../../component/Toast/Toast'
import DefaultInput from '../../../../../component/Form/DefaultInput'
import TextAreaInput from '../../../../../component/Form/TextAreaInput'
import DefaultButton from '../../../../../component/Buttons/DefaultButton'
import Dropdown from '../../../../../component/Form/Dropdown'

const CreatePermission = () => {
    const token = localStorage.getItem('access_token')
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const navigate = useNavigate()

    const { values, handleChange } = useForm({
        name: "",
        resource: "",
        action: "",
        description: "",
    });

    const headlePermsissions = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const res = await API.post('/admin/permissions', values, {
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
            });
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white">

            {toast && (
                <div className="fixed top-6 right-6 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div className="">

                <div className="mb-6 border-l-4 border-indigo-700 bg-indigo-50 px-4 py-3">

                    <p className="text-xs font-bold uppercase tracking-wider text-indigo-950">
                        Permission Configuration
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                        Configure the permission name, resource, action and description.
                    </p>

                </div>

                <form onSubmit={headlePermsissions} method="post">

                    <div className="border border-slate-200 bg-white p-5 md:p-6">

                        <div className="mb-5">

                            <h3 className="text-sm font-bold text-indigo-950">
                                Permission Information
                            </h3>

                            <div className="mt-2 h-px bg-slate-100" />

                        </div>

                        <div className="grid grid-cols-1 gap-0 md:grid-cols-2">

                            <div>
                                <DefaultInput
                                    label={"Permission Name"}
                                    value={values.name}
                                    name={'name'}
                                    placeholder={"ASSIGNMENT_ACCESS"}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <DefaultInput
                                    label={"Resource"}
                                    value={values.resource}
                                    name={'resource'}
                                    placeholder={"ASSIGNMENT"}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <Dropdown
                                    label={"Action"}
                                    value={values.action}
                                    name={'action'}
                                    onChange={handleChange}
                                    required
                                    options={[
                                        { value: "ACCESS", label: "Access" },
                                        { value: "CREATE", label: "Create" },
                                        { value: "READ", label: "Read" },
                                        { value: "UPDATE", label: "Update" },
                                        { value: "DELETE", label: "Delete" },
                                        { value: "MANAGE", label: "Manage" },
                                        { value: "APPROVE", label: "Approve" },
                                        { value: "REJECT", label: "Reject" },
                                        { value: "ASSIGN", label: "Assign" },
                                        { value: "DOWNLOAD", label: "Download" },
                                        { value: "UPLOAD", label: "Upload" },
                                        { value: "EXPORT", label: "Export" },
                                        { value: "IMPORT", label: "Import" }
                                    ]}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <TextAreaInput
                                    label={"Permission Description"}
                                    value={values.description}
                                    name={'description'}
                                    placeholder='Allow students to access assignments'
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                        </div>

                        <div className="mt-7 flex items-center justify-end border-t border-slate-100 pt-5">

                            <DefaultButton
                                type='submit'
                                label={loading ? 'Creating' : 'Create New Permission'}
                            />

                        </div>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default CreatePermission