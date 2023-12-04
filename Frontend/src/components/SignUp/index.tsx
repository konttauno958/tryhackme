import { useState } from 'react';
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { ThunkDispatch } from "redux-thunk"
import { useDispatch } from "react-redux"
import { AnyAction } from "redux"
import { SignUpStyle } from "../../constants/styles"
import PrimaryButton from "../../components/Button/PrimaryButton"
import { SignUpValidate } from "../../constants/content"
import { userSignUp } from "../../features/userSlice"
import { NotificationManager } from "react-notifications"
import cx from "clsx"

const SignUpComponent: React.FC = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [usernameError, setUsernameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>()

  const handleAdd = async () => {
    setUsernameError("")
    setEmailError("")
    setPasswordError("")
    setConfirmPasswordError("")

    const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    let isValid = true
    if (username.trim() === "") {
      setUsernameError(SignUpValidate.UsernameError)
      isValid = false
    }

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

    if (confirmPassword.trim() === "") {
      setConfirmPasswordError(SignUpValidate.ConfirmPasswordError)
      isValid = false
    }

    if (password.trim() !== "" && confirmPassword.trim() !== "" && password !== confirmPassword) {
      setConfirmPasswordError(SignUpValidate.PasswordMatchError)
      isValid = false
    }

    if (!isValid) return

    const data = {
      username, email, password,
    }

    try {
      setLoading(true)

      const result = await dispatch(userSignUp(data))

      if (result.payload.error) {
        setLoading(false)
        NotificationManager.error(result.payload.error, "Error")
      }

      if (result.payload === "success") {
        NotificationManager.success("User created successfully", "Success")

        setTimeout(() => {
          setLoading(false)
          navigate("/signin")
        }, 1000)
      }
    } catch(error) {
      console.error("Error occurred while registering:", error)
    }
  };
    return (
      <div className={cx(SignUpStyle.container)}>
        <div className={cx(SignUpStyle.header)}>
          <h1 className={cx(SignUpStyle.title)}>
              SignUp
          </h1>
        </div>

        <div className={cx(SignUpStyle.equalCol)}>
          <div className="text-gray-500">Username</div>
          <input
            className={cx(SignUpStyle.input, usernameError && "border-red-500")}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {usernameError && (
            <div className={cx(SignUpStyle.errorTitle)}>{usernameError}</div>
          )}
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

        <div className={cx(SignUpStyle.equalCol)}>
          <div className="text-gray-500">Confirm Password</div>
          <input
            className={cx(SignUpStyle.input, confirmPasswordError && "border-red-500")}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmPasswordError && (
            <div className={cx(SignUpStyle.errorTitle)}>{confirmPasswordError}</div>
          )}
        </div>

        <div className={cx(SignUpStyle.buttonContainer)}>
          <Link to="/signin" className={cx(SignUpStyle.linkText)}>
            If you have been already registered, click here.
          </Link>

          <PrimaryButton
            varient="SignUp"
            handleAdd={handleAdd}
            loading={loading}
          />
        </div>
      </div>
    )
}

export default SignUpComponent
