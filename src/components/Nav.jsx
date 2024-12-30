import React from 'react'
import { Link } from 'react-router-dom'
import './MealPlanCard.css'

const Nav = ({ user, handleLogOut }) => {
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
          <>
            <span>Welcome, {user.username}!</span>
            <button onClick={handleLogOut}>Log Out</button>
          </>
        ) : (
          <Link to="/auth/login">Login</Link>
        )}
      </div>
    </nav>
  )
}

export default Nav


