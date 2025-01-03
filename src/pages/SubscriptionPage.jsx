import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SubscriptionCard from '../components/SubscriptionCard'
import './SubscriptionPage.css'

const SubscriptionPage = () => {
  const [selectedDays, setSelectedDays] = useState([])
  const [startingDay, setStartingDay] = useState('')
  const [deliveryTime, setDeliveryTime] = useState('')
  const [duration, setDuration] = useState('')
  const [mealsPerDay, setMealsPerDay] = useState('')
  const [selectedMealObjects, setSelectedMealObjects] = useState([])

  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const location = useLocation()
  const navigate = useNavigate()

  const { selectedMealPlans = [] } = location.state || {}

  useEffect(() => {
    if (!selectedMealPlans.length) {
      console.warn(
        'No selectedMealPlans found. Maybe user navigated incorrectly.'
      )
    }
    setSelectedMealObjects(selectedMealPlans)
  }, [selectedMealPlans])

  const handleRemoveMeal = (mealObj) => {
    setSelectedMealObjects((prev) => prev.filter((m) => m !== mealObj))
  }

  const handleDayChange = (day) => {
    setSelectedDays((prev) => {
      if (prev.includes(day)) {
        return prev.filter((d) => d !== day)
      }
      if (prev.length >= 5) {
        setError('You can only select up to 5 days.')
        return prev
      }
      return [...prev, day]
    })
  }

  const calculateTotalPrice = () => {
    return selectedMealObjects.reduce((sum, m) => sum + (m.price || 0), 0)
  }
  const totalPrice = calculateTotalPrice()

  const handleMealsPerDayChange = (e) => {
    const num = Number(e.target.value)
    setMealsPerDay(num)
    if (selectedMealObjects.length > num) {
      setSelectedMealObjects((prev) => prev.slice(0, num))
    }
  }

  const handleCheckMorning = () => {
    if (deliveryTime === '7AM to 11AM (Morning)') {
      setDeliveryTime('')
    } else {
      setDeliveryTime('7AM to 11AM (Morning)')
    }
  }

  const handleCheckNight = () => {
    if (deliveryTime === '6PM to 10PM (Night before)') {
      setDeliveryTime('')
    } else {
      setDeliveryTime('6PM to 10PM (Night before)')
    }
  }

  const handleBack = () => {
    navigate('/meal-plans')
  }

  const handleContinue = (e) => {
    e.preventDefault()

    if (
      !startingDay ||
      !deliveryTime ||
      !duration ||
      !mealsPerDay ||
      selectedDays.length === 0 ||
      selectedMealObjects.length === 0
    ) {
      setError('Please fill all required fields.')
      return
    }

    const subscriptionData = {
      startDate: startingDay,
      duration: Number(duration),
      mealsPerDay: Number(mealsPerDay),
      price: totalPrice,
      selectedDays,
      mealPlans: selectedMealObjects,
      preferences: [deliveryTime]
    }

    setSuccessMessage('Subscription details set. Proceeding...')
    setTimeout(() => {
      navigate('/deliveries', { state: { subscriptionData } })
    }, 1000)
  }

  return (
    <div className="subscription-page">
      <h1>Finalize Subscription</h1>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}

      <div className="button-row">
        <button onClick={handleBack} className="back-button">
          Back
        </button>
        <button onClick={handleContinue} className="continue-button">
          Continue
        </button>
      </div>

      <h3>Select Days</h3>
      <div className="day-selector">
        {[
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ].map((day) => (
          <button
            key={day}
            className={selectedDays.includes(day) ? 'selected' : ''}
            onClick={() => handleDayChange(day)}
          >
            <input
              type="checkbox"
              checked={selectedDays.includes(day)}
              readOnly
            />
            {day}
          </button>
        ))}
      </div>

      <h3>Starting Day</h3>
      <input
        type="date"
        value={startingDay}
        onChange={(e) => setStartingDay(e.target.value)}
      />

      <h3>Duration (months)</h3>
      <select value={duration} onChange={(e) => setDuration(e.target.value)}>
        <option value="">Select Duration</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="6">6</option>
      </select>

      <h3>Meals Per Day (1 to 3)</h3>
      <select value={mealsPerDay} onChange={handleMealsPerDayChange}>
        <option value="">Select</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>

      <h3>Delivery Time</h3>
      <div className="time-checkboxes">
        <label>
          <input
            type="checkbox"
            checked={deliveryTime === '7AM to 11AM (Morning)'}
            onChange={handleCheckMorning}
          />
          7AM to 11AM (Morning)
        </label>
        <label>
          <input
            type="checkbox"
            checked={deliveryTime === '6PM to 10PM (Night before)'}
            onChange={handleCheckNight}
          />
          6PM to 10PM (Night before)
        </label>
      </div>

      <h3>Selected Meals</h3>
      <p>Total Price: ${totalPrice}</p>
      {selectedMealObjects.length === 0 ? (
        <p>No meals selected yet.</p>
      ) : (
        <ul>
          {selectedMealObjects.map((mealObj) => {
            const mealName =
              mealObj.strMeal || mealObj.name || '(Untitled Meal)'
            return (
              <li key={mealName}>
                {mealName}{' '}
                <button onClick={() => handleRemoveMeal(mealObj)}>
                  Remove
                </button>
              </li>
            )
          })}
        </ul>
      )}

      <SubscriptionCard
        subscription={{
          mealPlanName: 'Your Selected Meals',
          startDate: startingDay,
          duration,
          mealsPerDay,
          price: totalPrice
        }}
        selectedMeals={selectedMealObjects.map(
          (m) => m.strMeal || m.name || '(Untitled Meal)'
        )}
      />
    </div>
  )
}

export default SubscriptionPage
