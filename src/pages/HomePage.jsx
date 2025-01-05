import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchAllMealPlans } from '../services/mealPlanService'
import './HomePage.css'

const HomePage = ({ user }) => {
  const [mealPlans, setMealPlans] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadMealPlans = async () => {
      try {
        const data = await fetchAllMealPlans()
        setMealPlans(data)
      } catch (err) {
        console.error('Error fetching meal plans:', err)
        setError('Failed to load meal plans. Please try again later.')
      }
    }
    loadMealPlans()
  }, [])

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Welcome {user?.username ? `, ${user.username}` : 'to Food App'}</h1>
        <p>
          Explore meal plans, manage subscriptions, and track your deliveries
          effortlessly!
        </p>
        {!user ? (
          <div className="auth-buttons">
            <Link to="/auth/register" className="home-button">
              Register
            </Link>
            <Link to="/auth/login" className="home-button">
              Login
            </Link>
          </div>
        ) : (
          <div className="home-actions">
            <Link to="/meal-plans" className="home-button">
              View Meal Plans
            </Link>
            <Link to="/dashboard" className="home-button">
              Dashboard
            </Link>
            {user.role === 'Admin' && (
              <Link to="/admin" className="home-button">
                Admin Dashboard
              </Link>
            )}
          </div>
        )}
      </header>
      <main className="home-slideshow">
        {error && <p className="error">{error}</p>}
        {mealPlans.length > 0 ? (
          <div className="slideshow-container">
            {mealPlans.map((mealPlan) => (
              <div key={mealPlan._id} className="slideshow-slide">
                <img
                  src={mealPlan.image}
                  alt={mealPlan.name}
                  className="slideshow-image"
                />
                <div className="slideshow-content">
                  <h3>{mealPlan.name}</h3>
                  <p>{mealPlan.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading meal plans...</p>
        )}
      </main>
      <footer className="home-footer">
        <p>&copy; {new Date().getFullYear()} Food App. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default HomePage
