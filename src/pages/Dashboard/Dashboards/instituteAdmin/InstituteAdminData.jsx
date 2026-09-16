import React, { useEffect, useState } from 'react'
import API from '../../../../services/api'

const InstituteAdminData = () => {
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
        <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="h-24 bg-indigo-50"></div>

            <div className="relative flex flex-col items-center px-6 pb-7">
                <div className="-mt-12 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-indigo-100 text-3xl font-bold text-indigo-600 shadow-md">
                    {myProfile?.profileImage ? (
                        <img
                            src={`${import.meta.env.VITE_APP_API_FILES}/uploads/profile/${myProfile.profileImage}`}
                            alt="Profile"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        myProfile?.userId?.email?.charAt(0)?.toUpperCase() || 'U'
                    )}
                </div>

                <div className="mt-4 text-center">
                    <h1 className="max-w-full break-all text-lg font-semibold text-gray-900">
                        {myProfile?.userId?.email}
                    </h1>

                    <div className="mt-2 inline-flex items-center rounded-full bg-indigo-50 px-3 py-1">
                        <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                            Institute Admin
                        </span>
                    </div>
                </div>

                <div className="mt-5 flex w-full max-w-xs items-center justify-center border-t border-gray-100 pt-4">
                    <div className="text-center">
                        <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                            Account Role
                        </p>
                        <p className="mt-1 text-sm font-semibold text-gray-700">
                            Institute Administrator
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InstituteAdminData