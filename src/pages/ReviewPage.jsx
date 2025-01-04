import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { createSubscription } from '../services/subscriptionService'

const ReviewPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { subscriptionData, deliveries } = location.state || {}

  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    if (!subscriptionData) {
      setError('No subscription data found. Redirecting to subscription page.')
      setTimeout(() => navigate('/subscriptions'), 2000)
    }
  }, [subscriptionData, navigate])

  const handleConfirm = async () => {
    if (!subscriptionData) {
      setError('No subscription data to confirm.')
      return
    }

    try {
      const payload = {
        ...subscriptionData,
        user: subscriptionData.user || 'defaultUserId',
        mealPlans: subscriptionData.mealPlans.map((meal) => meal._id),
        deliveries: deliveries.map(({ id, ...rest }) => ({
          ...rest,
          _id: new Date().getTime().toString(16)
        }))
      }

      await createSubscription(payload)
      setSuccessMessage('Subscription created successfully! Redirecting...')
      setTimeout(() => navigate('/dashboard'), 2000)
    } catch (err) {
      console.error('Error confirming subscription:', err)
      setError('Failed to confirm subscription. Please try again later.')
    }
  }

  if (error) {
    return <p className="error">{error}</p>
  }

  if (!subscriptionData) {
    return null // Avoid rendering if no data is available
  }

  return (
    <div className="review-page">
      <h1>Review Your Subscription</h1>
      {successMessage && <p className="success">{successMessage}</p>}

      <div className="subscription-summary">
        <h3>Subscription Summary</h3>
        <p>
          <strong>Start Date:</strong> {subscriptionData.startDate}
        </p>
        <p>
          <strong>Duration:</strong> {subscriptionData.duration} months
        </p>
        <p>
          <strong>Delivery Time:</strong>{' '}
          {subscriptionData.preferences?.join(', ')}
        </p>
        <p>
          <strong>Selected Days:</strong>{' '}
          {subscriptionData.selectedDays?.join(', ')}
        </p>
        <p>
          <strong>Total Price:</strong> ${subscriptionData.price}
        </p>
        <h4>Selected Meals:</h4>
        <ul>
          {subscriptionData.mealPlans.map((meal) => (
            <li key={meal._id || meal.idMeal}>{meal.name || meal.strMeal}</li>
          ))}
        </ul>
      </div>

      {deliveries && deliveries.length > 0 && (
        <div className="delivery-summary">
          <h3>Delivery Details</h3>
          {deliveries.map((delivery, index) => (
            <div key={index} className="delivery-info">
              <p>
                <strong>Delivery Date:</strong> {delivery.deliveryDate}
              </p>
              <p>
                <strong>Location:</strong>{' '}
                {delivery.location || 'No location provided'}
              </p>
              <p>
                <strong>Meals:</strong>
              </p>
              <ul>
                {delivery.meals.map((meal, idx) => (
                  <li key={idx}>{meal}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <button className="confirm-button" onClick={handleConfirm}>
        Confirm Subscription
      </button>
    </div>
  )
}

export default ReviewPage
