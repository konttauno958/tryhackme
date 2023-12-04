import cx from "clsx"
import { NotificationContainer } from "react-notifications"
import LayoutComponent from "../components/Layout"
import SignInComponent from "../components/SignIn";
import { SignUpStyle } from "../constants/styles"
import logo from "../assets/tryhackme_logo_full.png"
import "react-notifications/lib/notifications.css"

const SignInPage: React.FC = () => {
  return (
    <LayoutComponent>
      <NotificationContainer />

      <img src={logo} alt="logo" className={cx(SignUpStyle.logo)} />

      <SignInComponent />
    </LayoutComponent>
  )
}

export default SignInPage
