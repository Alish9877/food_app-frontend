import { useState } from 'react'
import { Link } from 'react-router-dom'

const Nav = ({ user, handleLogOut }) => {
  const [showDropdown, setShowDropdown] = useState(false)

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev)
  }

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/meal-plans">Meal Plans</Link>
        {user && (
          <>
            <Link to="/subscriptions">Subscriptions</Link>
            <Link to="/deliveries">Deliveries</Link>
            {user.role === 'Admin' && <Link to="/admin">Admin Dashboard</Link>}
          </>
        )}
      </div>
      <div className="auth-links">
        {user ? (
          <div className="user-menu">
            <span className="user-welcome" onClick={toggleDropdown}>
              Welcome, {user.username}!
            </span>
            {showDropdown && (
              <div className="dropdown-menu">
                <Link
                  to="/account-settings"
                  onClick={() => setShowDropdown(false)}
                >
                  Account Settings
                </Link>
                <button
                  onClick={() => {
                    setShowDropdown(false)
                    handleLogOut()
                  }}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/auth/login">Login</Link>
        )}
      </div>
    </nav>
  )
}

export default Nav
