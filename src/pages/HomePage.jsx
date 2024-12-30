import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Welcome to Food App</h1>
        <p>
          Explore meal plans, manage subscriptions, and track your deliveries
          effortlessly!
        </p>
      </header>
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
      <footer className="home-footer">
        <p>&copy; {new Date().getFullYear()} Food App. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default HomePage
