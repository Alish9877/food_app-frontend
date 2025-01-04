import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MealPlanCard from '../components/MealPlanCard'
import { fetchAllMealPlans } from '../services/mealPlanService'
import './MealPlansPage.css'

const MealPlansPage = ({ user }) => {
  const [mealPlans, setMealPlans] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedMeals, setSelectedMeals] = useState([])
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/auth/login')
      return
    }
    loadMealPlans()
  }, [user, navigate])

  const loadMealPlans = async () => {
    try {
      const data = await fetchAllMealPlans()
      setMealPlans(data)
      const uniqueCategories = [...new Set(data.map((meal) => meal.category))]
      setCategories(uniqueCategories)
      setError(null)
    } catch (err) {
      console.error('Error fetching meal plans:', err)
      setError('Failed to load meal plans. Please try again later.')
    }
  }

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  const handleAddMeal = (meal) => {
    setSelectedMeals((prev) =>
      prev.includes(meal._id)
        ? prev.filter((id) => id !== meal._id)
        : [...prev, meal._id]
    )
  }

  const handleComplete = () => {
    const selectedMealPlans = selectedMeals
      .map((id) => mealPlans.find((meal) => meal._id === id))
      .filter(Boolean)

    navigate('/subscriptions', {
      state: { selectedMealPlans }
    })
  }

  const filteredMealPlans = selectedCategories.length
    ? mealPlans.filter((meal) => selectedCategories.includes(meal.category))
    : mealPlans

  return (
    <div className="meal-plans-page">
      <h1>Meal Plans</h1>
      {error && <p className="error">{error}</p>}

      <div className="filter-container">
        {categories.map((category) => (
          <label
            key={category}
            className={selectedCategories.includes(category) ? 'selected' : ''}
          >
            <input
              type="checkbox"
              value={category}
              onChange={() => handleCategoryChange(category)}
            />
            {category}
          </label>
        ))}
      </div>

      {selectedMeals.length > 0 && (
        <button className="complete-button" onClick={handleComplete}>
          Continue to Subscription
        </button>
      )}

      <div className="meal-plan-container">
        {filteredMealPlans.length > 0 ? (
          filteredMealPlans.map((mealPlan) => (
            <MealPlanCard
              key={mealPlan._id}
              mealPlan={mealPlan}
              selected={selectedMeals.includes(mealPlan._id)}
              onAdd={handleAddMeal}
              onRemove={handleAddMeal}
            />
          ))
        ) : (
          <p>No meal plans match your filters.</p>
        )}
      </div>
    </div>
  )
}

export default MealPlansPage
