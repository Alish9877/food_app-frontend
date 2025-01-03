// DeliveryPage.jsx
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import DeliveryCard from '../components/DeliveryCard'
import './DeliveryPage.css'

const DeliveryPage = () => {
  const [deliveries, setDeliveries] = useState([])
  const [error, setError] = useState(null)

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.state?.subscriptionData) {
      const {
        startDate,
        mealPlans, // or selectedMeals
        price
      } = location.state.subscriptionData

      // Create a local array of "deliveries"
      // For now, we assume only 1 delivery, but you can do more if needed.
      const newDelivery = {
        id: Date.now(),
        deliveryDate: startDate, // optional initial value
        status: 'Pending',
        // We store meal names in .meals so we can display them
        meals: mealPlans.map((m) =>
          typeof m === 'object' ? m.strMeal || m.name || 'Unnamed Meal' : m
        ),
        totalPrice: price || 0
      }

      setDeliveries([newDelivery])
    }
  }, [location.state])

  // Called when a DeliveryCard is updated
  // (the user picks a date, enters address, etc.)
  const handleDeliveryChange = (updatedDelivery) => {
    setDeliveries((prev) =>
      prev.map((d) => (d.id === updatedDelivery.id ? updatedDelivery : d))
    )
  }

  const handleBackToSubscription = () => {
    navigate('/subscriptions')
  }

  // "Continue" to the final "ReviewPage" with the updated deliveries
  const handleContinue = () => {
    // Validate that each delivery has the required fields:
    // subscription (not set yet?), deliveryDate, location, meals
    // For now, we skip subscription reference or we pass it along
    for (const d of deliveries) {
      if (!d.deliveryDate) {
        setError('Please set a delivery date for all deliveries.')
        return
      }
      if (!d.location) {
        setError(
          'Please fill location info for all deliveries (building/block/etc.).'
        )
        return
      }
      if (!d.meals || d.meals.length === 0) {
        setError('Missing meals for one of the deliveries.')
        return
      }
    }

    // If all is well, pass "deliveries" to the ReviewPage
    setError(null)
    navigate('/review', {
      state: {
        deliveries
        // We might also pass subscriptionData if needed
      }
    })
  }

  return (
    <div className="delivery-page">
      <h1>Delivery Info</h1>
      {error && <p className="error">{error}</p>}
      <p>Please fill in the delivery date & address details below.</p>

      <div className="button-row">
        <button onClick={handleBackToSubscription} className="back-button">
          Back to Subscription
        </button>
        <button onClick={handleContinue} className="continue-button">
          Continue
        </button>
      </div>

      <div className="delivery-container">
        {deliveries.length > 0 ? (
          deliveries.map((delivery) => (
            <DeliveryCard
              key={delivery.id}
              delivery={delivery}
              onDeliveryChange={handleDeliveryChange}
            />
          ))
        ) : (
          <p>No deliveries to show.</p>
        )}
      </div>
    </div>
  )
}

export default DeliveryPage
