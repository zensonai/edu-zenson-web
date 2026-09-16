import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { getDeviceId } from "../utils/deviceId";

const API = axios.create({
    baseURL: import.meta.env.VITE_APP_API,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

let refreshPromise = null;

API.interceptors.request.use(
    (config) => {
        const deviceId = getDeviceId();
        const accessToken = localStorage.getItem("access_token");

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        config.headers["x-device-id"] = deviceId;

        return config;
    },
    (error) => Promise.reject(error)
);

API.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status !== 401 ||
            !originalRequest ||
            originalRequest._retry ||
            originalRequest.url?.includes("/auth/login") ||
            originalRequest.url?.includes("/auth/register") ||
            originalRequest.url?.includes("/auth/refresh-token")
        ) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        const refreshToken = localStorage.getItem("refresh_token");

        if (!refreshToken) {
            return Promise.reject(error);
        }

        try {
            if (!refreshPromise) {
                refreshPromise = (async () => {
                    const accessToken = localStorage.getItem("access_token");

                    let institutionId;

                    if (accessToken) {
                        try {
                            const decoded = jwtDecode(accessToken);

                            if (decoded?.user?.institutionId) {
                                institutionId = (
                                    decoded.user.institutionId._id ?? decoded.user.institutionId
                                ).toString();
                            }
                        } catch (decodeError) {
                            institutionId = undefined;
                        }
                    }

                    const requestData = {
                        refreshToken: refreshToken,
                    };

                    if (institutionId) {
                        requestData.institutionId = institutionId;
                    }

                    const response = await axios.post(
                        `${import.meta.env.VITE_APP_API}/auth/refresh-token`,
                        requestData,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "x-device-id": getDeviceId(),
                            },
                            withCredentials: true,
                        }
                    );

                    const newAccessToken = response.data.accessToken;
                    const newRefreshToken = response.data.refreshToken;

                    if (!newAccessToken || !newRefreshToken) {
                        throw new Error("Refresh response does not contain both tokens");
                    }

                    localStorage.setItem("access_token", newAccessToken);
                    localStorage.setItem("refresh_token", newRefreshToken);

                    return newAccessToken;
                })();
            }

            const newAccessToken = await refreshPromise;

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return API(originalRequest);
        } catch (refreshError) {
            console.error("REFRESH TOKEN ERROR:", refreshError.response?.data || refreshError.message);
            console.error("REFRESH TOKEN STATUS:", refreshError.response?.status);

            return Promise.reject(refreshError);
        } finally {
            if (refreshPromise) {
                refreshPromise = null;
            }
        }
    }
);

export default API;
