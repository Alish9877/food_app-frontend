import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import MealPlanCard from '../components/MealPlanCard'
import './MealPlansPage.css'

const MealPlansPage = ({ user }) => {
  const [mealPlans, setMealPlans] = useState([])
  const [backendMealPlans, setBackendMealPlans] = useState([])
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
    fetchExternalMealPlans()
    fetchBackendMealPlans()
  }, [user, navigate])

  // Fetch external meals from TheMealDB
  const fetchExternalMealPlans = async () => {
    try {
      const res = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s')
      const meals = res.data.meals || []
      const mealsWithPrice = meals.map((meal) => {
        let price
        switch (meal.strCategory) {
          case 'Seafood':
            price = 69
            break
          case 'Beef':
            price = 50
            break
          case 'Chicken':
            price = 30
            break
          case 'Vegetarian':
            price = 25
            break
          case 'Dessert':
            price = 22
            break
          default:
            price = 10
        }
        return { ...meal, price }
      })
      setMealPlans(mealsWithPrice)
      const uniqueCategories = [
        ...new Set(mealsWithPrice.map((m) => m.strCategory))
      ]
      setCategories(uniqueCategories)
      setError(null)
    } catch (err) {
      console.error('Error fetching external meal plans:', err)
      setError('Failed to load external meal plans. Please try again later.')
    }
  }

  // Fetch meal plans from your local CRUD backend
  const fetchBackendMealPlans = async () => {
    try {
      const res = await axios.get('http://localhost:3001/meal-plans')
      setBackendMealPlans(res.data)
      const uniqueCategories = [...new Set(res.data.map((meal) => meal.category))]
      setCategories((prev) => [...new Set([...prev, ...uniqueCategories])])
      setError(null)
    } catch (err) {
      console.error('Error fetching backend meal plans:', err)
      setError('Failed to load custom meal plans. Please try again later.')
    }
  }

  // Toggle category filters
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  // Toggle "Add" or "Remove" for a meal in selectedMeals
  const handleAddMeal = (meal) => {
    const uniqueId = meal._id || meal.idMeal
    const isRemoving = selectedMeals.includes(uniqueId)

    if (isRemoving) {
      setSelectedMeals((prev) => prev.filter((id) => id !== uniqueId))
    } else {
      setSelectedMeals((prev) => [...prev, uniqueId])
    }
  }


  // Move to SubscriptionPage with the user’s selected meals
  const handleComplete = () => {
    console.log('Selected meals (local only):', selectedMeals)

    const selectedMealPlans = [
      ...mealPlans.filter((m) => selectedMeals.includes(m.idMeal)),
      ...backendMealPlans.filter((m) => selectedMeals.includes(m._id))
    ]

    navigate('/subscriptions', {
      state: {
        selectedMealPlans,
        mealPlans,
        backendMealPlans
      }
    })
  }

  // Merge external + backend for display
  const allMealPlans = [...mealPlans, ...backendMealPlans]

  // Filter by categories
  const filteredMealPlans = selectedCategories.length
    ? allMealPlans.filter((m) =>
        selectedCategories.includes(m.strCategory || m.category)
      )
    : allMealPlans

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
          filteredMealPlans.map((mealPlan) => {
            const uniqueId = mealPlan._id || mealPlan.idMeal
            const isSelected = selectedMeals.includes(uniqueId)
            return (
              <MealPlanCard
                key={uniqueId}
                mealPlan={mealPlan}
                isSelected={isSelected}
                handleAddMeal={handleAddMeal}
              />
            )
          })
        ) : (
          <p>No meal plans match your filters.</p>
        )}
      </div>
    </div>
  )
}

export default MealPlansPage
