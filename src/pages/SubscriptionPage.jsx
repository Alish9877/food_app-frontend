import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SubscriptionCard from '../components/SubscriptionCard'
import './SubscriptionPage.css'

const SubscriptionPage = () => {
  const [selectedDays, setSelectedDays] = useState([])
  const [startingDay, setStartingDay] = useState('')
  const [deliveryTime, setDeliveryTime] = useState('')
  const [selectedMeals, setSelectedMeals] = useState([])
  const [error, setError] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const meals = queryParams.getAll('meal')
    setSelectedMeals(meals)
  }, [location])

  const handleDayChange = (day) => {
    setSelectedDays((prevSelectedDays) => {
      if (prevSelectedDays.includes(day)) {
        return prevSelectedDays.filter((selectedDay) => selectedDay !== day)
      }
      if (prevSelectedDays.length >= 5) {
        alert('You can only select up to 5 days.')
        return prevSelectedDays
      }
      return [...prevSelectedDays, day]
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      !startingDay ||
      !deliveryTime ||
      selectedDays.length === 0 ||
      selectedMeals.length === 0
    ) {
      setError('Please fill all required fields.')
      return
    }

    const subscriptionData = {
      startingDay,
      deliveryTime,
      selectedMeals,
      totalPrice: selectedMeals.length * 10
    }

    navigate('/deliveries', { state: { subscriptionData } })
  }

  return (
    <div className="subscription-page">
      <h1>Days & Time</h1>
      {error && <p className="error">{error}</p>}

      <h3>Subscription Days</h3>
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
            />{' '}
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

      <h3>Delivery Time</h3>
      <div className="time-selector">
        <button
          className={deliveryTime === '7AM to 11AM (Morning)' ? 'selected' : ''}
          onClick={() => setDeliveryTime('7AM to 11AM (Morning)')}
        >
          <input
            type="radio"
            checked={deliveryTime === '7AM to 11AM (Morning)'}
            readOnly
          />{' '}
          7AM to 11AM (Morning)
        </button>
        <button
          className={
            deliveryTime === '6PM to 10PM (Night before)' ? 'selected' : ''
          }
          onClick={() => setDeliveryTime('6PM to 10PM (Night before)')}
        >
          <input
            type="radio"
            checked={deliveryTime === '6PM to 10PM (Night before)'}
            readOnly
          />{' '}
          6PM to 10PM (Night before)
        </button>
      </div>

      <button type="submit" className="continue-button" onClick={handleSubmit}>
        Continue
      </button>

      <p>You can always skip a day or make changes from your settings.</p>

      <SubscriptionCard
        subscription={{
          mealPlanName: 'Your Selected Meal Plan',
          startDate: startingDay,
          duration: 1,
          mealsPerDay: selectedMeals.length,
          price: selectedMeals.length * 10
        }}
        selectedMeals={selectedMeals}
      />
    </div>
  )
}

export default SubscriptionPage
