import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import SubscriptionCard from '../components/SubscriptionCard'
import './SubscriptionPage.css'

const SubscriptionPage = () => {
  const [selectedDays, setSelectedDays] = useState([])
  const [startingDay, setStartingDay] = useState('')
  const [deliveryTime, setDeliveryTime] = useState('')
  const [Duration, setDuration] = useState('')
  const [selectedMeals, setSelectedMeals] = useState([])
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  // Extract mealPlans and backendMealPlans from location.state
  const { mealPlans = [], backendMealPlans = [] } = location.state || {}

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
        setError('You can only select up to 5 days.')
        return prevSelectedDays
      }
      return [...prevSelectedDays, day]
    })
  }

  const calculateTotalPrice = () => {
    const selectedMealPlans = [
      ...mealPlans.filter((meal) => selectedMeals.includes(meal.idMeal)),
      ...backendMealPlans.filter((meal) => selectedMeals.includes(meal._id))
    ]
    return selectedMealPlans.reduce((sum, meal) => sum + (meal.price || 0), 0)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (
      !startingDay ||
      !deliveryTime ||
      !Duration||
      selectedDays.length === 0 ||
      selectedMeals.length === 0
    ) {
      setError('Please fill all required fields.');
      return;
    }
  
    const totalPrice = calculateTotalPrice();
  
    const subscriptionData = {
      startingDay,
      deliveryTime,
      Duration,
      selectedDays,
      selectedMeals,
      totalPrice,
    };
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to perform this action.');
        return;
      }
  
      const response = await axios.post('http://localhost:3001/subscriptions', subscriptionData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setSuccessMessage('Subscription saved successfully!');
      console.log('Saved subscription:', response.data);
  
      setTimeout(() => {
        navigate('/deliveries', { state: { subscriptionData } });
      }, 2000);
    } catch (error) {
      console.error('Error saving subscription:', error);
      setError('Failed to save subscription. Please try again later.');
    }
  };
  

  return (
    <div className="subscription-page">
      <h1>Days & Time</h1>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}

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

      <h3>Duration</h3>
      <select 
  name="duration" 
  id="duration" 
  value={Duration} 
  onChange={(e) => setDuration(e.target.value)}
>
  <option value="">Select Duration</option>
  <option value="1">1 month</option>
  <option value="2">2 months</option>
  <option value="3">3 months</option>
  <option value="6">6 months</option>
</select>

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

      <p>You can always skip a day or make changes from your settings.</p>

      <SubscriptionCard
        subscription={{
          mealPlanName: 'Your Selected Meal Plan',
          startDate: startingDay,
          duration: Duration,
          mealsPerDay: selectedMeals.length,
          price: calculateTotalPrice()
        }}
        selectedMeals={selectedMeals}
      />

      <button type="submit" className="continue-button" onClick={handleSubmit}>
        Continue
      </button>
    </div>
  )
}

export default SubscriptionPage
