import { useContext } from "react";
import { AuthContext } from '../context/AuthContext';
import { Outlet, Navigate, useLocation } from "react-router-dom";

export default function PrivatRouter() {
    const { loading, currentUser } = useContext(AuthContext)
    const location = useLocation()

 return loading ? 'loading...' :
    currentUser ? (
        <Outlet />
    ) : (
        <Navigate to='/login' replace state={{ from: location.pathname, message: 'user needs authentication' }} />
    )
}
