import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './MealPlanCard.css'
import './Nav.css'

const Nav = ({ user, handleLogOut }) => {
  const [showDropdown, setShowDropdown] = useState(false)

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev)
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.user-menu')) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link>
        {user && (
          <>
            <Link to="/meal-plans">Meal Plans</Link>
            <Link to="/dashboard">Dashboard</Link>
            {user.role === 'Admin' && <Link to="/admin">Admin Dashboard</Link>}
          </>
        )}
      </div>
      <div className="auth-links">
        {user ? (
          <div className="user-menu">
            <span
              className="user-welcome"
              onClick={toggleDropdown}
              aria-expanded={showDropdown}
            >
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
                    if (window.confirm('Are you sure you want to log out?')) {
                      handleLogOut()
                    }
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
