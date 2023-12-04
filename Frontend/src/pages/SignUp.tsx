import { NotificationContainer } from "react-notifications"
import cx from "clsx"
import LayoutComponent from "../components/Layout"
import SignUpComponent from "../components/SignUp"
import { SignUpStyle } from "../constants/styles"
import logo from "../assets/tryhackme_logo_full.png"
import "react-notifications/lib/notifications.css"

const SignUpPage: React.FC = () => {
  
  return (
    <LayoutComponent>
      <NotificationContainer />

      <img src={logo} alt="logo" className={cx(SignUpStyle.logo)} />

      <SignUpComponent />
    </LayoutComponent>
  )
}

export default SignUpPage
