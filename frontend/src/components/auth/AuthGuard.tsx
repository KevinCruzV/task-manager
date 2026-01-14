import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "../../api/auth/auth.store";

export function AuthGuard() {
    const location = useLocation();

    if (!isAuthenticated()) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    return <Outlet />;
}