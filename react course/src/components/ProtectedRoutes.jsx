import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
    const { user } = useContext(AuthContext);
    if (!user) return <Navigate to="/auth" replace />

    return (
        <Outlet />
    )
}

export default ProtectedRoutes