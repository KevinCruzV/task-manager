import { createBrowserRouter, Navigate } from "react-router-dom";
import { isAuthenticated } from "./api/auth/auth.store";
import { AuthGuard } from "./components/auth/AuthGuard";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage"; 
import { TasksPage } from "./pages/TasksPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: isAuthenticated() 
          ? <Navigate to='/tasks' replace />
          : <Navigate to='/login' replace />,
    },
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
    {
        element: <AuthGuard />,
        children: [{ path: '/tasks', element: <TasksPage /> }],
    },
    { path: '*', element: <Navigate to='/' replace /> },
]);