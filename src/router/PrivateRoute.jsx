import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, roles }) => {
    const { auth, loading } = useAuth();

    if (loading) {
        return null;
    }

    if (!auth.accessToken) {
        return <Navigate to="/login" replace />;
    }

    if (auth.user && roles && !roles.includes(auth.user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default PrivateRoute;