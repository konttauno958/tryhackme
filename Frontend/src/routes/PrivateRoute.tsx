import React from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "./AuthContext"

interface PrivateRouteProps {
  children: JSX.Element
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const auth = useAuth()
  const location = useLocation()

  if (auth.isAuthenticated)
    return <Navigate to="/" state={{ from: location }} replace />

  return children
}

export default PrivateRoute
