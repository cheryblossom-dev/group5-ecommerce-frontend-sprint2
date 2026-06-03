import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export const GuestRoute = () => {
    const { user, loading } = useAuth();
    if (loading) return null;

    return !user ? <Outlet /> : <Navigate to="/" replace />;
};

export const PrivateRoute = () => {
    const { user, loading } = useAuth();
    if (loading) return null;

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export const AdminRoute = () => {
    const { user, loading } = useAuth();
    if (loading) return null;

    return user && user.role === "admin" ? (
        <Outlet />
    ) : (
        <Navigate to="/" replace />
    );
};
