import logo from "../../assets/tryhackme_logo_full.png"
import { HeaderStyle } from "../../constants/styles"
import { useAuth } from "../../routes/AuthContext"
import cx from "clsx"

const HeaderComponent = () => {
  const auth = useAuth()

  return (
    <div className={cx(HeaderStyle.container)}>
      <img src={logo} alt="logo" className="w-24 h-12" />

      {
        auth.isAuthenticated ? (
          <button 
            className={cx(HeaderStyle.logoutButton)}
            onClick={() => auth.logout()}
          >
            Log Out
          </button>
        ) : null
      }
    </div>
  )
}

export default HeaderComponent
