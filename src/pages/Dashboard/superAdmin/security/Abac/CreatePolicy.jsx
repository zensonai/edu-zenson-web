import React, { useEffect, useState } from 'react'
import useForm from '../../../../../hooks/useForm'
import API from '../../../../../services/api'
import Toast from '../../../../../component/Toast/Toast'
import DefaultInput from '../../../../../component/Form/DefaultInput'
import TextAreaInput from '../../../../../component/Form/TextAreaInput'
import DefaultButton from '../../../../../component/Buttons/DefaultButton'
import Dropdown from '../../../../../component/Form/Dropdown'

const CreatePolicy = () => {
    const token = localStorage.getItem('access_token')
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const [permissions, setPermissions] = useState([])
    const [permissionsLoading, setPermissionsLoading] = useState(true)

    const [conditions, setConditions] = useState([
        {
            attribute: "",
            operator: "",
            value: "",
        }
    ])

    const { values, handleChange } = useForm({
        name: "",
        description: "",
        permissionId: "",
        effect: "",
        version: 1,
    })

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const res = await API.get('/admin/permissions', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.data.success === true) {
                    setPermissions(res.data.result || [])
                }
            }
            catch (err) {
                setToast({
                    success: false,
                    message: err.response?.data?.message || 'Failed to load permissions',
                })
            }
            finally {
                setPermissionsLoading(false)
            }
        }

        fetchPermissions()
    }, [token])

    const handleConditionChange = (index, field, value) => {
        setConditions((currentConditions) =>
            currentConditions.map((condition, conditionIndex) =>
                conditionIndex === index
                    ? {
                        ...condition,
                        [field]: value,
                    }
                    : condition
            )
        )
    }

    const addCondition = () => {
        setConditions((currentConditions) => [
            ...currentConditions,
            {
                attribute: "",
                operator: "",
                value: "",
            }
        ])
    }

    const removeCondition = (index) => {
        setConditions((currentConditions) =>
            currentConditions.filter(
                (_, conditionIndex) => conditionIndex !== index
            )
        )
    }

    const convertValue = (value, operator) => {
        if (operator === 'IN' || operator === 'NOT_IN') {
            if (Array.isArray(value)) {
                return value
            }

            return value
                .split(',')
                .map((item) => item.trim())
                .filter((item) => item !== '')
                .map((item) => {
                    const number = Number(item)

                    return item !== '' &&
                        !Number.isNaN(number)
                        ? number
                        : item
                })
        }

        const trimmedValue = String(value).trim()

        if (
            trimmedValue !== '' &&
            !Number.isNaN(Number(trimmedValue))
        ) {
            return Number(trimmedValue)
        }

        return trimmedValue
    }

    const headleCreatePolicy = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const formattedConditions = conditions
                .filter(
                    (condition) =>
                        condition.attribute &&
                        condition.operator
                )
                .map((condition) => ({
                    attribute: condition.attribute,
                    operator: condition.operator,
                    value: convertValue(
                        condition.value,
                        condition.operator
                    ),
                }))

            const payload = {
                name: values.name,
                description: values.description,
                permissionId: values.permissionId,
                effect: values.effect,
                version: Number(values.version),
                conditions: formattedConditions,
            }

            const res = await API.post('/admin/policies', payload, {
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
                message: err.response?.data?.message || 'Failed to create policy',
            })
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

            <div className="mb-6 border-l-4 border-lime-400 bg-lime-50 px-4 py-3">

                <p className="text-xs font-bold uppercase tracking-wider text-indigo-950">
                    Policy Configuration
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                    Define which permission is allowed or denied and specify the conditions required for access.
                </p>

            </div>

            <form onSubmit={headleCreatePolicy} method="post">

                <div className="border border-slate-200 bg-white p-5 md:p-6">

                    <div className="mb-5">

                        <h3 className="text-sm font-bold text-indigo-950">
                            Policy Information
                        </h3>

                        <div className="mt-2 h-px bg-slate-100" />

                    </div>

                    <div className="grid grid-cols-1 gap-0 md:grid-cols-2">

                        <div>
                            <DefaultInput
                                label={"Policy Name"}
                                value={values.name}
                                name={'name'}
                                placeholder={"ALLOW_STUDENT_ASSIGNMENT_MONDAY_TO_FRIDAY"}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Dropdown
                                label={"Permission"}
                                value={values.permissionId}
                                name={'permissionId'}
                                onChange={handleChange}
                                required
                                options={
                                    permissionsLoading
                                        ? []
                                        : permissions.map((permission) => ({
                                            value: permission._id,
                                            label: `${permission.name} - ${permission.resource} - ${permission.action}`
                                        }))
                                }
                            />
                        </div>

                        <div>
                            <TextAreaInput
                                label={"Policy Description"}
                                value={values.description}
                                name={'description'}
                                placeholder={"Students can access assignments Monday to Friday from 9 AM to 3 PM"}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Dropdown
                                label={"Effect"}
                                value={values.effect}
                                name={'effect'}
                                onChange={handleChange}
                                required
                                options={[
                                    {
                                        value: "ALLOW",
                                        label: "Allow"
                                    },
                                    {
                                        value: "DENY",
                                        label: "Deny"
                                    }
                                ]}
                            />
                        </div>

                        <div>
                            <DefaultInput
                                label={"Version"}
                                value={values.version}
                                name={'version'}
                                type={'number'}
                                placeholder={"1"}
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>

                    <div className="mt-8 border-t border-slate-200 pt-6">

                        <div className="mb-5 flex items-center justify-between gap-4">

                            <div>
                                <h3 className="text-sm font-bold text-indigo-950">
                                    Policy Conditions
                                </h3>

                                <p className="mt-1 text-xs text-slate-500">
                                    Add one or more conditions that must all match for this policy.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={addCondition}
                                className="border border-indigo-700 bg-indigo-700 px-4 py-2 text-xs font-bold text-white transition hover:bg-indigo-800"
                            >
                                + Add Condition
                            </button>

                        </div>

                        <div className="space-y-4">

                            {conditions.map((condition, index) => (

                                <div
                                    key={index}
                                    className="border border-slate-200 bg-slate-50 p-5"
                                >

                                    <div className="mb-4 flex items-center justify-between">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-7 w-7 items-center justify-center bg-indigo-700 text-xs font-bold text-white">
                                                {index + 1}
                                            </div>

                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-wider text-indigo-950">
                                                    Condition {index + 1}
                                                </p>

                                                <p className="text-[11px] text-slate-400">
                                                    Attribute matching rule
                                                </p>
                                            </div>

                                        </div>

                                        {conditions.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeCondition(index)}
                                                className="border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                                            >
                                                Remove
                                            </button>
                                        )}

                                    </div>

                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                                        <div>
                                            <DefaultInput
                                                label={"Attribute"}
                                                value={condition.attribute}
                                                name={`attribute-${index}`}
                                                placeholder={"subject.role"}
                                                onChange={(e) =>
                                                    handleConditionChange(
                                                        index,
                                                        'attribute',
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                        </div>

                                        <div>
                                            <Dropdown
                                                label={"Operator"}
                                                value={condition.operator}
                                                name={`operator-${index}`}
                                                onChange={(e) =>
                                                    handleConditionChange(
                                                        index,
                                                        'operator',
                                                        e.target.value
                                                    )
                                                }
                                                required
                                                options={[
                                                    {
                                                        value: "EQUALS",
                                                        label: "Equals"
                                                    },
                                                    {
                                                        value: "NOT_EQUALS",
                                                        label: "Not Equals"
                                                    },
                                                    {
                                                        value: "IN",
                                                        label: "In"
                                                    },
                                                    {
                                                        value: "NOT_IN",
                                                        label: "Not In"
                                                    },
                                                    {
                                                        value: "EXISTS",
                                                        label: "Exists"
                                                    },
                                                    {
                                                        value: "NOT_EXISTS",
                                                        label: "Not Exists"
                                                    },
                                                    {
                                                        value: "CONTAINS",
                                                        label: "Contains"
                                                    },
                                                    {
                                                        value: "STARTS_WITH",
                                                        label: "Starts With"
                                                    },
                                                    {
                                                        value: "ENDS_WITH",
                                                        label: "Ends With"
                                                    },
                                                    {
                                                        value: "GREATER_THAN",
                                                        label: "Greater Than"
                                                    },
                                                    {
                                                        value: "GREATER_THAN_OR_EQUAL",
                                                        label: "Greater Than or Equal"
                                                    },
                                                    {
                                                        value: "LESS_THAN",
                                                        label: "Less Than"
                                                    },
                                                    {
                                                        value: "LESS_THAN_OR_EQUAL",
                                                        label: "Less Than or Equal"
                                                    }
                                                ]}
                                            />
                                        </div>

                                        <div>
                                            <DefaultInput
                                                label={"Value"}
                                                value={
                                                    Array.isArray(condition.value)
                                                        ? condition.value.join(', ')
                                                        : condition.value
                                                }
                                                name={`value-${index}`}
                                                placeholder={
                                                    condition.operator === "IN" ||
                                                        condition.operator === "NOT_IN"
                                                        ? "1, 2, 3, 4, 5"
                                                        : "STUDENT"
                                                }
                                                onChange={(e) =>
                                                    handleConditionChange(
                                                        index,
                                                        'value',
                                                        e.target.value
                                                    )
                                                }
                                                required={
                                                    condition.operator !== "EXISTS" &&
                                                    condition.operator !== "NOT_EXISTS"
                                                }
                                            />
                                        </div>

                                    </div>

                                    {(condition.operator === "IN" ||
                                        condition.operator === "NOT_IN") && (
                                            <div className="mt-3 border-l-4 border-indigo-500 bg-white px-4 py-3">

                                                <p className="text-[11px] font-semibold text-slate-600">
                                                    Enter multiple values separated by commas.
                                                </p>

                                                <p className="mt-1 text-[11px] text-slate-400">
                                                    Example: 1, 2, 3, 4, 5
                                                </p>

                                            </div>
                                        )}

                                </div>

                            ))}

                        </div>

                    </div>

                    <div className="mt-7 flex items-center justify-end border-t border-slate-100 pt-5">

                        <DefaultButton
                            type='submit'
                            label={loading ? 'Creating' : 'Create New Policy'}
                        />

                    </div>

                </div>

            </form>

        </div>
    )
}

export default CreatePolicy