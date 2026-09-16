import React, { useState } from 'react'
import useForm from '../../../../../hooks/useForm'
import { useNavigate } from 'react-router-dom'
import API from '../../../../../services/api'
import Toast from '../../../../../component/Toast/Toast'
import DefaultInput from '../../../../../component/Form/DefaultInput'
import TextAreaInput from '../../../../../component/Form/TextAreaInput'
import DefaultButton from '../../../../../component/Buttons/DefaultButton'


const CreateRole = () => {
    const token = localStorage.getItem('access_token')
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const navigate = useNavigate()

    const { values, handleChange } = useForm({
        name: "",
        description: "",
    });

    const headleCreateRole = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const res = await API.post('/admin/roles', values, {
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
        <div className=" bg-white">

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

                <div className="mb-6 border-l-4 border-lime-400 bg-lime-50 px-4 py-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-indigo-950">
                        Role Configuration
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                        Enter the role name and provide a clear description for access control management.
                    </p>
                </div>

                <form onSubmit={headleCreateRole} method="post">

                    <div className="border border-slate-200 bg-white p-5 md:p-6">

                        <div className="mb-5">
                            <h3 className="text-sm font-bold text-indigo-950">
                                Role Information
                            </h3>

                            <div className="mt-2 h-px bg-slate-100" />
                        </div>

                        <div className="space-y-5">

                            <div>
                                <DefaultInput
                                    label={"Role Name (must use Uppercase 'STAFF')"}
                                    value={values.name}
                                    name={'name'}
                                    placeholder={"STAFF (must use Uppercase)"}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <TextAreaInput
                                    label={"Role Description"}
                                    value={values.description}
                                    name={'description'}
                                    placeholder='Role Description'
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                        </div>

                        <div className="mt-7 flex items-center justify-end border-t border-slate-100 pt-5">
                            <DefaultButton
                                type='submit'
                                label={loading ? 'Creating' : 'Create New Role'}
                            />
                        </div>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default CreateRole