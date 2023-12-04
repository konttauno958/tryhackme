import React, { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useAuth } from "./AuthContext"
import { setAuthToken } from "../api/api"
import ProtectedRoute from "./ProtectedRoute"
import PrivateRoute from "./PrivateRoute"
import HomePage from "../pages"
import SignUpPage from "../pages/SignUp"
import SignInPage from "../pages/SignIn"

const AppRouter: React.FC = () => {
  const auth = useAuth()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      auth.login(token)
      setAuthToken(token)
    }
  },[])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/signup" element={<PrivateRoute><SignUpPage /></PrivateRoute>} />
        <Route path="/signin" element={<PrivateRoute><SignInPage /></PrivateRoute>} />
      </Routes>
    </Router>
  )
}

export default AppRouter
