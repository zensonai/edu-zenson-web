import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        accessToken: localStorage.getItem("access_token"),
        id: null,
        user: null,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");

        if (accessToken) {
            try {
                const decoded = jwtDecode(accessToken);

                setAuth({
                    accessToken,
                    id: decoded.sub,
                    user: decoded.user || null,
                });
            } catch (error) {
                console.error("ACCESS TOKEN DECODE ERROR:",error);

                setAuth({
                    accessToken: null,
                    id: null,
                    user: null,
                });
            }
        }

        setLoading(false);
    }, []);

    const login = (accessToken, refreshToken) => {
        try {
            const decoded = jwtDecode(accessToken);

            localStorage.setItem("access_token",accessToken);
            localStorage.setItem("refresh_token",refreshToken);

            setAuth({
                accessToken,
                id: decoded.sub,
                user: decoded.user || null,
            });
        } catch (error) {
            console.error("LOGIN TOKEN DECODE ERROR:",error);

            setAuth({
                accessToken: null,
                id: null,
                user: null,
            });
        }
    };

    const updateAccessToken = (newAccessToken) => {
        try {
            const decoded = jwtDecode(newAccessToken);

            localStorage.setItem("access_token",newAccessToken);

            setAuth({
                accessToken: newAccessToken,
                id: decoded.sub,
                user: decoded.user || null,
            });
        } catch (error) {
            console.error("NEW ACCESS TOKEN DECODE ERROR:",error);

            setAuth({
                accessToken: null,
                id: null,
                user: null,
            });
        }
    };

    const logout = (navigate) => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        setAuth({
            accessToken: null,
            id: null,
            user: null,
        });

        navigate("/login",{ replace: true });
    };

    return (
        <AuthContext.Provider
            value={{
                auth,
                loading,
                login,
                logout,
                updateAccessToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);