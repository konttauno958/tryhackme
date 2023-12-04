import React from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "./AuthContext"

interface ProtectedRouteProps {
  children: JSX.Element
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const auth = useAuth()
  const location = useLocation()

  if (!auth.isAuthenticated)
    return <Navigate to="/signin" state={{ from: location }} replace />

  return children
}

export default ProtectedRoute
