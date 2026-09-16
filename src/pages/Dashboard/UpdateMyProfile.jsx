import React, { useEffect, useState } from 'react'
import API from '../../services/api'
import DefaultInput from '../../component/Form/DefaultInput'
import TextAreaInput from '../../component/Form/TextAreaInput'
import DefaultButton from '../../component/Buttons/DefaultButton'
import Dropdown from '../../component/Form/Dropdown'
import DateInput from '../../component/Form/DateInput'
import FileInput from '../../component/Form/FileInput'
import Toast from '../../component/Toast/Toast'
import useForm from '../../hooks/useForm'
import defultImage from '../../assets/User.png'

const UpdateMyProfile = ({
    token,
    profileData
}) => {
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(null)
    const [imagePreview, setImagePreview] = useState(profileData?.profileImage || '')
    const [profileImage, setProfileImage] = useState(null)

    const { values, handleChange, setValues } = useForm({
        firstName: '',
        lastName: '',
        middleName: '',
        displayName: '',
        title: '',
        dateOfBirth: '',
        gender: '',
        nic: '',
        passportNumber: '',
        nationality: '',
        phone: '',
        alternatePhone: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        emergencyContactRelationship: '',
        facebook: '',
        bio: '',
        website: '',
        linkedin: '',
    })

    useEffect(() => {
        if (!profileData) return

        setValues({
            firstName: profileData?.firstName || '',
            lastName: profileData?.lastName || '',
            middleName: profileData?.middleName || '',
            displayName: profileData?.displayName || '',
            title: profileData?.title || '',
            dateOfBirth: profileData?.dateOfBirth
                ? new Date(profileData.dateOfBirth).toISOString().split('T')[0]
                : '',
            gender: profileData?.gender || '',
            nic: profileData?.nic || '',
            passportNumber: profileData?.passportNumber || '',
            nationality: profileData?.nationality || '',
            phone: profileData?.phone || '',
            alternatePhone: profileData?.alternatePhone || '',
            addressLine1: profileData?.addressLine1 || '',
            addressLine2: profileData?.addressLine2 || '',
            city: profileData?.city || '',
            state: profileData?.state || '',
            postalCode: profileData?.postalCode || '',
            emergencyContactName: profileData?.emergencyContactName || '',
            emergencyContactPhone: profileData?.emergencyContactPhone || '',
            emergencyContactRelationship: profileData?.emergencyContactRelationship || '',
            facebook: profileData?.facebook || '',
            bio: profileData?.bio || '',
            website: profileData?.website || '',
            linkedin: profileData?.linkedin || '',
        })

        setImagePreview(profileData?.profileImage || '')
    }, [profileData, setValues])

    const handleImageChange = (e) => {
        const file = e.target.files?.[0]

        if (!file) return

        setProfileImage(file)
        setImagePreview(URL.createObjectURL(file))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const requestValues = {
                firstName: values.firstName,
                lastName: values.lastName,
                middleName: values.middleName,
                displayName: values.displayName,
                title: values.title,
                dateOfBirth: values.dateOfBirth
                    ? new Date(values.dateOfBirth).toISOString()
                    : values.dateOfBirth,
                gender: values.gender,
                nic: values.nic,
                passportNumber: values.passportNumber,
                nationality: values.nationality,
                phone: values.phone,
                alternatePhone: values.alternatePhone,
                addressLine1: values.addressLine1,
                addressLine2: values.addressLine2,
                city: values.city,
                state: values.state,
                postalCode: values.postalCode,
                emergencyContactName: values.emergencyContactName,
                emergencyContactPhone: values.emergencyContactPhone,
                emergencyContactRelationship: values.emergencyContactRelationship,
                facebook: values.facebook,
                bio: values.bio,
                website: values.website,
                linkedin: values.linkedin,
            }

            const formData = new FormData()

            Object.entries(requestValues).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    formData.append(key, value)
                }
            })

            if (profileImage) {
                formData.append('profileImage', profileImage)
            }

            const res = await API.patch('/profile/update-my-profile', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
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
        } catch (error) {
            setToast({
                success: false,
                message: error.response?.data?.message || 'Profile update failed'
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full">
            {toast && (
                <div className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <form onSubmit={handleSubmit} className="w-full">

                <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                        <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full bg-indigo-50">
                            <img
                                src={
                                    values.profileImage
                                        ? `${import.meta.env.VITE_APP_API_FILES}/uploads/profile/${values.profileImage}`
                                        : defultImage
                                }
                                alt="Profile"
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <div className="w-full">
                            <FileInput
                                label="Upload Profile Image"
                                name="profileImage"
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-4 border-t border-gray-200 pt-4">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Profile Information
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Update your basic profile information.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <DefaultInput
                            label="First Name"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                        />

                        <DefaultInput
                            label="Last Name"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                        />

                        <DefaultInput
                            label="Middle Name"
                            name="middleName"
                            value={values.middleName}
                            onChange={handleChange}
                        />

                        <DefaultInput
                            label="Display Name"
                            name="displayName"
                            value={values.displayName}
                            onChange={handleChange}
                        />

                        <DefaultInput
                            label="Title"
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                        />

                        <DateInput
                            label="Date of Birth"
                            name="dateOfBirth"
                            value={values.dateOfBirth}
                            onChange={handleChange}
                        />

                        <Dropdown
                            label="Gender"
                            name="gender"
                            value={values.gender}
                            onChange={handleChange}
                            options={[
                                {
                                    label: 'Male',
                                    value: 'MALE'
                                },
                                {
                                    label: 'Female',
                                    value: 'FEMALE'
                                },
                                {
                                    label: 'Other',
                                    value: 'OTHER'
                                }
                            ]}
                        />

                        <DefaultInput
                            label="Nationality"
                            name="nationality"
                            value={values.nationality}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="mb-6 mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Contact Information
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Update your contact and identification details.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <DefaultInput
                            label="NIC"
                            name="nic"
                            value={values.nic}
                            onChange={handleChange}
                        />

                        <DefaultInput
                            label="Passport Number"
                            name="passportNumber"
                            value={values.passportNumber}
                            onChange={handleChange}
                        />

                        <DefaultInput
                            label="Phone"
                            name="phone"
                            value={values.phone}
                            onChange={handleChange}
                        />

                        <DefaultInput
                            label="Alternate Phone"
                            name="alternatePhone"
                            value={values.alternatePhone}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Address
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Update your current address information.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <DefaultInput
                            label="Address Line 1"
                            name="addressLine1"
                            value={values.addressLine1}
                            onChange={handleChange}
                        />

                        <DefaultInput
                            label="Address Line 2"
                            name="addressLine2"
                            value={values.addressLine2}
                            onChange={handleChange}
                        />

                        <DefaultInput
                            label="City"
                            name="city"
                            value={values.city}
                            onChange={handleChange}
                        />

                        <DefaultInput
                            label="State"
                            name="state"
                            value={values.state}
                            onChange={handleChange}
                        />

                        <DefaultInput
                            label="Postal Code"
                            name="postalCode"
                            value={values.postalCode}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Emergency Contact
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Keep an emergency contact available on your profile.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <DefaultInput
                            label="Emergency Contact Name"
                            name="emergencyContactName"
                            value={values.emergencyContactName}
                            onChange={handleChange}
                        />

                        <DefaultInput
                            label="Emergency Contact Phone"
                            name="emergencyContactPhone"
                            value={values.emergencyContactPhone}
                            onChange={handleChange}
                        />

                        <DefaultInput
                            label="Emergency Contact Relationship"
                            name="emergencyContactRelationship"
                            value={values.emergencyContactRelationship}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Social & Personal Information
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Add your personal information and social links.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <DefaultInput
                            label="Facebook"
                            name="facebook"
                            value={values.facebook}
                            onChange={handleChange}
                        />

                        <DefaultInput
                            label="Website"
                            name="website"
                            value={values.website}
                            onChange={handleChange}
                        />

                        <DefaultInput
                            label="LinkedIn"
                            name="linkedin"
                            value={values.linkedin}
                            onChange={handleChange}
                        />

                        <TextAreaInput
                            label="Bio"
                            name="bio"
                            value={values.bio}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <DefaultButton
                        type="submit"
                        disabled={loading}
                        label={loading ? 'Updating Profile...' : 'Update Profile'}
                    />
                </div>

            </form>
        </div>
    )
}

export default UpdateMyProfile