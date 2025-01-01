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
  const [selectedMeals, setSelectedMeals] = useState([]) // Changed from Set to Array
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/auth/login') // Redirect if not logged in
      return
    }
    fetchExternalMealPlans()
    fetchBackendMealPlans()
  }, [user, navigate])

  const fetchExternalMealPlans = async () => {
    try {
      const response = await axios.get(
        'https://www.themealdb.com/api/json/v1/1/search.php?s'
      )
      const mealsWithPrice = response.data.meals.map((meal) => {
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
        ...new Set(mealsWithPrice.map((meal) => meal.strCategory))
      ]
      setCategories(uniqueCategories)
      setError(null)
    } catch (error) {
      console.error('Error fetching external meal plans:', error)
      setError('Failed to load external meal plans. Please try again later.')
    }
  }

  const fetchBackendMealPlans = async () => {
    try {
      const response = await axios.get('http://localhost:3001/meal-plans') // Adjust backend URL
      setBackendMealPlans(response.data)
      const uniqueCategories = [
        ...new Set(response.data.map((meal) => meal.category))
      ]
      setCategories((prevCategories) => [
        ...new Set([...prevCategories, ...uniqueCategories])
      ])
      setError(null)
    } catch (error) {
      console.error('Error fetching backend meal plans:', error)
      setError('Failed to load custom meal plans. Please try again later.')
    }
  }

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((c) => c !== category)
        : [...prevSelected, category]
    )
  }

  const handleAddMeal = (meal) => {
    setSelectedMeals((prevSelected) => {
      let updatedMeals
      if (prevSelected.includes(meal.idMeal || meal._id)) {
        updatedMeals = prevSelected.filter(
          (id) => id !== (meal.idMeal || meal._id)
        )
      } else {
        updatedMeals = [...prevSelected, meal.idMeal || meal._id]
      }
      return updatedMeals
    })
  }

  const saveSelectedMealsToDatabase = async () => {
    try {
      const selectedMealPlans = [
        ...mealPlans.filter((meal) => selectedMeals.includes(meal.idMeal)),
        ...backendMealPlans.filter((meal) => selectedMeals.includes(meal._id))
      ]
      const payload = {
        userId: user.id, // Ensure this is valid
        selectedMeals: selectedMealPlans.map((meal) => meal.idMeal || meal._id)
      }

      console.log('Payload:', payload) // Log payload for debugging

      await axios.post(
        'http://localhost:3001/meal-plans/selected-meals',
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      setSuccessMessage('Selected meals saved successfully!')
      setError(null)
    } catch (error) {
      console.error('Error saving selected meals:', error)
      setError('Failed to save selected meals. Please try again later.')
    }
  }

  const handleComplete = async () => {
    try {
      // Temporarily bypass save to database
      console.log('Selected meals (temporarily not saved):', selectedMeals);
      const selectedMealPlans = [
        ...mealPlans.filter((meal) => selectedMeals.includes(meal.idMeal)),
        ...backendMealPlans.filter((meal) => selectedMeals.includes(meal._id)),
      ];
      const queryString = selectedMealPlans
        .map((meal) => `meal=${encodeURIComponent(meal.name || meal.strMeal)}`)
        .join('&');
      navigate(`/subscriptions?${queryString}`);
    } catch (error) {
      console.error('Error completing the selection:', error);
    }
  };
  

  const allMealPlans = [...mealPlans, ...backendMealPlans]

  const filteredMealPlans = selectedCategories.length
    ? allMealPlans.filter((meal) =>
        selectedCategories.includes(meal.strCategory || meal.category)
      )
    : allMealPlans

  return (
    <div className="meal-plans-page">
      <h1>Meal Plans</h1>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
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
          Complete
        </button>
      )}
      <div className="meal-plan-container">
        {filteredMealPlans.length > 0 ? (
          filteredMealPlans.map((mealPlan) => (
            <MealPlanCard
              key={mealPlan.idMeal || mealPlan._id}
              mealPlan={mealPlan}
              isSelected={selectedMeals.includes(
                mealPlan.idMeal || mealPlan._id
              )}
              handleAddMeal={handleAddMeal}
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
