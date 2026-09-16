import React, { useEffect, useState } from 'react'
import API from '../../services/api'
import UpdateMyProfile from './UpdateMyProfile'

const MyProfile = () => {
    const token = localStorage.getItem('access_token')
    const [myProfile, setMyPorfile] = useState('')

    useEffect(() => {
        const fetcmyProfile = async () => {
            const res = await API.get('/profile/my-profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                setMyPorfile(res.data.result.profile)
            }
        }

        if (token) fetcmyProfile()
    }, [token])

    return (
        <div className="min-h-full w-full bg-white">

            <div className="w-full p-4 sm:p-5 lg:p-6">

                <div className="mb-6">
                    <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                        My Profile
                    </h1>

                    <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                        View your account and personal information
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white sm:rounded-2xl">

                        <div className="border-b border-slate-200 bg-slate-50 px-4 py-4 sm:px-5">
                            <h2 className="text-sm font-bold text-slate-800 sm:text-base">
                                Account Information
                            </h2>
                        </div>

                        <div className="p-4 sm:p-5">

                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-indigo-50 text-lg font-bold text-indigo-600">
                                    {myProfile?.profileImage ? (
                                        <img src={`${import.meta.env.VITE_APP_API_FILES}/uploads/profile/${myProfile.profileImage}`} alt="Profile" className="h-full w-full object-cover" />
                                    ) : (
                                        myProfile?.userId?.email?.charAt(0)?.toUpperCase() || 'U'
                                    )}
                                </div>

                                <div className="min-w-0">
                                    <p className="break-all text-sm font-semibold text-slate-800">
                                        {myProfile?.userId?.email || '—'}
                                    </p>

                                    <p className="mt-1 text-xs text-slate-400">
                                        User Account
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 space-y-4">

                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                        Email
                                    </p>

                                    <p className="mt-1 break-all text-sm font-medium text-slate-700">
                                        {myProfile?.userId?.email || '—'}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                        Role
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-indigo-700">
                                        {myProfile?.userId?.roleId?.name || '—'}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                        Account Status
                                    </p>

                                    <span className={`mt-1 inline-flex rounded-lg px-3 py-1.5 text-xs font-semibold ${myProfile?.userId?.accountStatus === 'ACTIVE' ? 'bg-lime-50 text-lime-700' : myProfile?.userId?.accountStatus === 'SUSPENDED' ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-600'}`}>
                                        {myProfile?.userId?.accountStatus || '—'}
                                    </span>
                                </div>

                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                        Authentication Provider
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-slate-700">
                                        {myProfile?.userId?.authProvider || 'LOCAL'}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                        Email Verified
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-slate-700">
                                        {myProfile?.userId?.emailVerified ? 'Verified' : 'Not Verified'}
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white sm:rounded-2xl lg:col-span-2">

                        <div className="border-b border-slate-200 bg-slate-50 px-4 py-4 sm:px-5">
                            <h2 className="text-sm font-bold text-slate-800 sm:text-base">
                                Personal Information
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-5 p-4 sm:grid-cols-2 sm:p-5">

                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                    First Name
                                </p>

                                <p className="mt-1 text-sm font-medium text-slate-700">
                                    {myProfile?.firstName || '—'}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                    Last Name
                                </p>

                                <p className="mt-1 text-sm font-medium text-slate-700">
                                    {myProfile?.lastName || '—'}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                    Middle Name
                                </p>

                                <p className="mt-1 text-sm font-medium text-slate-700">
                                    {myProfile?.middleName || '—'}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                    Display Name
                                </p>

                                <p className="mt-1 text-sm font-medium text-slate-700">
                                    {myProfile?.displayName || '—'}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                    Title
                                </p>

                                <p className="mt-1 text-sm font-medium text-slate-700">
                                    {myProfile?.title || '—'}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                    Date of Birth
                                </p>

                                <p className="mt-1 text-sm font-medium text-slate-700">
                                    {myProfile?.dateOfBirth || '—'}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                    Gender
                                </p>

                                <p className="mt-1 text-sm font-medium text-slate-700">
                                    {myProfile?.gender || '—'}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                    NIC
                                </p>

                                <p className="mt-1 text-sm font-medium text-slate-700">
                                    {myProfile?.nic || '—'}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                    Passport Number
                                </p>

                                <p className="mt-1 text-sm font-medium text-slate-700">
                                    {myProfile?.passportNumber || '—'}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                    Nationality
                                </p>

                                <p className="mt-1 text-sm font-medium text-slate-700">
                                    {myProfile?.nationality || '—'}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                    Phone
                                </p>

                                <p className="mt-1 text-sm font-medium text-slate-700">
                                    {myProfile?.phone || '—'}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                    Alternate Phone
                                </p>

                                <p className="mt-1 text-sm font-medium text-slate-700">
                                    {myProfile?.alternatePhone || '—'}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                    Country
                                </p>

                                <p className="mt-1 text-sm font-medium text-slate-700">
                                    {myProfile?.country || '—'}
                                </p>
                            </div>

                            <div className="sm:col-span-2">
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                    Address
                                </p>

                                <p className="mt-1 text-sm font-medium text-slate-700">
                                    {[myProfile?.addressLine1, myProfile?.addressLine2, myProfile?.city, myProfile?.state, myProfile?.postalCode, myProfile?.country].filter(Boolean).join(', ') || '—'}
                                </p>
                            </div>

                        </div>
                    </div>

                </div>

                <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white sm:rounded-2xl">

                    <div className="border-b border-slate-200 bg-slate-50 px-4 py-4 sm:px-5">
                        <h2 className="text-sm font-bold text-slate-800 sm:text-base">
                            Emergency Contact
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-5 p-4 sm:grid-cols-3 sm:p-5">

                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                Name
                            </p>

                            <p className="mt-1 text-sm font-medium text-slate-700">
                                {myProfile?.emergencyContactName || '—'}
                            </p>
                        </div>

                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                Phone
                            </p>

                            <p className="mt-1 text-sm font-medium text-slate-700">
                                {myProfile?.emergencyContactPhone || '—'}
                            </p>
                        </div>

                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                Relationship
                            </p>

                            <p className="mt-1 text-sm font-medium text-slate-700">
                                {myProfile?.emergencyContactRelationship || '—'}
                            </p>
                        </div>

                    </div>
                </div>

                <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white sm:rounded-2xl">

                    <div className="border-b border-slate-200 bg-slate-50 px-4 py-4 sm:px-5">
                        <h2 className="text-sm font-bold text-slate-800 sm:text-base">
                            Social Information
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-5 p-4 sm:grid-cols-2 sm:p-5">

                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                Facebook
                            </p>

                            <p className="mt-1 break-all text-sm font-medium text-slate-700">
                                {myProfile?.facebook || '—'}
                            </p>
                        </div>

                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                Website
                            </p>

                            <p className="mt-1 break-all text-sm font-medium text-slate-700">
                                {myProfile?.website || '—'}
                            </p>
                        </div>

                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                LinkedIn
                            </p>

                            <p className="mt-1 break-all text-sm font-medium text-slate-700">
                                {myProfile?.linkedin || '—'}
                            </p>
                        </div>

                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                User ID
                            </p>

                            <p className="mt-1 break-all text-sm font-medium text-slate-700">
                                {myProfile?.userId?._id || '—'}
                            </p>
                        </div>

                    </div>
                </div>

                <div className="p-4">
                    <UpdateMyProfile 
                        token={token}
                        profileData={myProfile}
                    />
                </div>

            </div>
        </div>
    )
}

export default MyProfile