import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// Assuming you have these service methods for final DB creation
import { createSubscription } from '../services/subscriptionService'
import { createDelivery } from '../services/deliveryService'

const ReviewPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // We expect subscriptionData + deliveries arrays in location.state
  // from the DeliveryPage or earlier steps
  const { subscriptionData, deliveries = [] } = location.state || {}

  // We can show messages or handle loading states if we want
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState(null)

  // If data doesn't exist, handle it or redirect:
  if (!subscriptionData || deliveries.length === 0) {
    return (
      <div>
        <h1>Review</h1>
        <p>No data to review. Did you skip previous steps?</p>
      </div>
    )
  }

  // A final "Confirm Everything" function
  const handleConfirm = async () => {
    setLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      // 1. Create the Subscription in DB
      //    subscriptionData must contain the required fields that match your schema:
      //    user is typically set on backend from token or you can pass userId if needed
      //    mealPlans => array of meal IDs or full objects
      //    startDate, duration, mealsPerDay, price, selectedDays, preferences, etc.
      const subscriptionRes = await createSubscription({
        startDate: subscriptionData.startDate,
        duration: subscriptionData.duration,
        mealsPerDay: subscriptionData.mealsPerDay,
        price: subscriptionData.price,
        selectedDays: subscriptionData.selectedDays,
        mealPlans: subscriptionData.mealPlans.map((meal) => meal._id || meal),
        preferences: subscriptionData.preferences || []
        // user is typically assigned by the server from token,
        // or pass subscriptionData.user if your server requires it
      })

      // subscriptionRes should contain the newly created Subscription doc, including _id
      const subscriptionId = subscriptionRes._id

      // 2. Create each Delivery, referencing the newly created Subscription ID
      // For example, if you have 1 or multiple deliveries
      for (const d of deliveries) {
        // Each d must have the required fields for your deliverySchema:
        // subscription, deliveryDate, status (pending), location, meals
        // We'll combine building/block/flat into d.location if not done previously
        const deliveryData = {
          subscription: subscriptionId,
          deliveryDate: new Date(d.deliveryDate || Date.now()), // must be future
          status: d.status || 'Pending',
          location: d.location || 'No address provided', // your schema requires location
          meals: d.meals || []
        }

        // createDelivery from your deliveryService
        await createDelivery(deliveryData)
      }

      setSuccessMessage('All subscription & deliveries confirmed!')
      // Optionally navigate to a success page or do something else
      // navigate('/confirmation')
    } catch (err) {
      console.error('Error finalizing everything:', err)
      setError(
        'Failed to confirm subscription and deliveries. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  // A simple summary UI
  return (
    <div>
      <h1>Review & Confirm</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      {/* Subscription Summary */}
      <h2>Subscription Summary</h2>
      <p>Start Date: {subscriptionData.startDate}</p>
      <p>Duration: {subscriptionData.duration} months</p>
      <p>Meals Per Day: {subscriptionData.mealsPerDay}</p>
      <p>Selected Days: {subscriptionData.selectedDays?.join(', ')}</p>
      <p>Price: ${subscriptionData.price}</p>
      <p>Delivery Time: {subscriptionData.preferences?.[0]}</p>
      <ul>
        {subscriptionData.mealPlans?.map((meal, idx) => {
          // If meal is an object, show meal name or strMeal
          const mealName =
            typeof meal === 'object' ? meal.strMeal || meal.name : meal
          return <li key={idx}>{mealName}</li>
        })}
      </ul>

      {/* Deliveries Summary */}
      <h2>Delivery Summary</h2>
      {deliveries.map((d, i) => (
        <div
          key={i}
          style={{
            border: '1px solid #ccc',
            margin: '1rem 0',
            padding: '1rem'
          }}
        >
          <h3>Delivery {i + 1}</h3>
          <p>Delivery Date: {d.deliveryDate}</p>
          <p>Status: {d.status}</p>
          <p>Address: {d.location}</p>
          <ul>
            {d.meals?.map((meal, idx) => (
              <li key={idx}>{meal}</li>
            ))}
          </ul>
          <p>Total Price: ${d.totalPrice?.toFixed(2) || '0.00'}</p>
        </div>
      ))}

      <button onClick={handleConfirm} disabled={loading}>
        {loading ? 'Confirming...' : 'Confirm Everything'}
      </button>
    </div>
  )
}

export default ReviewPage
