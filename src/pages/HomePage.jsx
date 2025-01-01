import { Link } from 'react-router-dom'
import './HomePage.css'

const HomePage = ({ user }) => {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Welcome to Food App</h1>
        <p>
          Explore meal plans, manage subscriptions, and track your deliveries
          effortlessly!
        </p>
        <div className="auth-buttons">
          <Link to="/auth/register" className="home-button">
            Register
          </Link>
          <Link to="/auth/login" className="home-button">
            Login
          </Link>
        </div>
      </header>
      {user && (
        <div className="home-actions">
          <Link to="/meal-plans" className="home-button">
            View Meal Plans
          </Link>
          <Link to="/subscriptions" className="home-button">
            Manage Subscriptions
          </Link>
          <Link to="/deliveries" className="home-button">
            Track Deliveries
          </Link>
        </div>
      )}
      <footer className="home-footer">
        <p>&copy; {new Date().getFullYear()} Food App. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default HomePage
