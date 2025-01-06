import { useState, useEffect, useId } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SubscriptionCard from '../components/SubscriptionCard'
import './SubscriptionPage.css'

const SubscriptionPage = ({ user }) => {
  const [selectedDays, setSelectedDays] = useState([])
  const [startingDay, setStartingDay] = useState('')
  const [deliveryTime, setDeliveryTime] = useState('')
  const [duration, setDuration] = useState('')
  const [selectedMealObjects, setSelectedMealObjects] = useState([])

  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const location = useLocation()
  const navigate = useNavigate()

  const { selectedMealPlans = [] } = location.state || {}

  useEffect(() => {
    if (!user) {
      navigate('/auth/login')
      return
    }
    if (selectedMealPlans.length > 0) {
      setSelectedMealObjects(selectedMealPlans)
    } else {
      setError('No meals selected. Please go back and select meals.')
    }
  }, [user, selectedMealPlans, navigate])

  const handleRemoveMeal = (mealObj) => {
    setSelectedMealObjects((prev) => prev.filter((m) => m !== mealObj))
  }

  const handleDayChange = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day].slice(0, 5)
    )
  }

  const calculateTotalPrice = () => {
    return selectedMealObjects.reduce((sum, m) => sum + (m.price || 0), 0)
  }

  const totalPrice = calculateTotalPrice()

  const mealsPerDay = selectedMealObjects.length

  const handleDeliveryTimeToggle = (time) => {
    setDeliveryTime((prev) => (prev === time ? '' : time))
  }

  const handleBack = () => {
    navigate('/meal-plans')
  }

  const handleContinue = (e) => {
    e.preventDefault()

    if (
      !user ||
      !startingDay ||
      !deliveryTime ||
      !duration ||
      selectedDays.length === 0 ||
      selectedMealObjects.length === 0
    ) {
      setError('Please fill all required fields.')
      return
    }

    const subscriptionData = {
      startDate: startingDay,
      duration: Number(duration),
      mealsPerDay,
      price: totalPrice,
      selectedDays,
      mealPlans: selectedMealObjects,
      user: user?.id || '',
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

      <h3>Delivery Time</h3>
      <div className="time-checkboxes">
        <label>
          <input
            type="checkbox"
            checked={deliveryTime === '7AM to 11AM (Morning)'}
            onChange={() => handleDeliveryTimeToggle('7AM to 11AM (Morning)')}
          />
          7AM to 11AM (Morning)
        </label>
        <label>
          <input
            type="checkbox"
            checked={deliveryTime === '6PM to 10PM (Night before)'}
            onChange={() =>
              handleDeliveryTimeToggle('6PM to 10PM (Night before)')
            }
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
          {selectedMealObjects.map((mealObj, index) => {
            const mealName = mealObj.strMeal || mealObj.name || '(Unnamed Meal)'
            return (
              <li key={mealObj._id || mealObj.idMeal || index}>
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
        selectedMeals={selectedMealObjects}
      />
    </div>
  )
}

export default SubscriptionPage


