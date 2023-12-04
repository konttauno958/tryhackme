import { useState } from "react"
import { Link } from "react-router-dom"
import { ThunkDispatch } from "redux-thunk"
import { useDispatch } from "react-redux"
import { AnyAction } from "redux"
import { SignUpStyle } from "../../constants/styles"
import { SignUpValidate } from "../../constants/content"
import { userSignIn } from "../../features/userSlice"
import { useAuth } from "../../routes/AuthContext"
import { setAuthToken } from "../../api/api"
import PrimaryButton from "../../components/Button/PrimaryButton"
import { NotificationManager } from "react-notifications"
import cx from "clsx"

const SignInComponent: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const [loading, setLoading] = useState(false)

  const auth = useAuth()
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>()

  const handleAdd = async () => {
    setEmailError("")
    setPasswordError("")

    const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    let isValid = true
    if (email.trim() === "") {
      setEmailError(SignUpValidate.EmailError)
      isValid = false
    } else if (!emailRegexPattern.test(email)) {
      setEmailError(SignUpValidate.EmailTypeError)
      isValid = false
    }

    if (password.trim() === "") {
      setPasswordError(SignUpValidate.PasswordError)
      isValid = false
    }

    if (!isValid) return

    const data = { email, password }

    try {
      setLoading(true)

      const result = await dispatch(userSignIn(data))

      if (result.payload.error) {
        setLoading(false)
        return NotificationManager.error(result.payload.error, "Error")
      }

      if (result.payload) {
        setTimeout(() => {
          setLoading(false)
          auth.login(result.payload)
          setAuthToken(result.payload)
        }, 1000)
      }
    } catch (error) {
      console.error("Error occurred while signining:", error)
    }
  }

  return (
    <div className={cx(SignUpStyle.container)}>
      <div className={cx(SignUpStyle.header)}>
        <h1 className={cx(SignUpStyle.title)}>
          Signin
        </h1>
      </div>

      <div className={cx(SignUpStyle.equalCol)}>
        <div className="text-gray-500">Email</div>
        <input
          className={cx(SignUpStyle.input, emailError && "border-red-500")}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && (
          <div className={cx(SignUpStyle.errorTitle)}>{emailError}</div>
        )}
      </div>

      <div className={cx(SignUpStyle.equalCol)}>
        <div className="text-gray-500">Password</div>
        <input
          className={cx(SignUpStyle.input, passwordError && "border-red-500")}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && (
          <div className={cx(SignUpStyle.errorTitle)}>{passwordError}</div>
        )}
      </div>

      <div className={cx(SignUpStyle.buttonContainer)}>
        <Link to="/signup" className={cx(SignUpStyle.linkText)}>
          If you are not registered, click here.
        </Link>

        <PrimaryButton
          varient="Signin"
          handleAdd={handleAdd}
          loading={loading}
        />
      </div>
    </div>
  )
}

export default SignInComponent
