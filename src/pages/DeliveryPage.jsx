import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import DeliveryCard from '../components/DeliveryCard'


const DeliveryPage = () => {
  const [deliveries, setDeliveries] = useState([])
  const [error, setError] = useState(null)
  const [updateMessage, setUpdateMessage] = useState(null)

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const subscriptionData = location.state?.subscriptionData
    if (subscriptionData) {
      const { startDate, mealPlans, price } = subscriptionData

      const newDelivery = {
        id: Date.now(),
        deliveryDate: startDate,
        status: 'Pending',
        meals: mealPlans.map((m) =>
          typeof m === 'object' ? m.strMeal || m.name || 'Unnamed Meal' : m
        ),
        totalPrice: price || 0
      }
      setDeliveries([newDelivery])
    }
  }, [location.state])

  const handleDeliveryChange = (updatedDelivery) => {
    setDeliveries((prev) =>
      prev.map((d) => (d.id === updatedDelivery.id ? updatedDelivery : d))
    )
  }

  const handleDeliveryUpdated = () => {
    setUpdateMessage('Delivery updated!')
    setTimeout(() => setUpdateMessage(null), 2000)
  }

  const handleBackToSubscription = () => {
    navigate('/subscriptions')
  }

  const validateDeliveries = () => {
    for (const d of deliveries) {
      if (!d.deliveryDate) {
        return 'Please set a delivery date for all deliveries.'
      }
      if (!d.location) {
        return 'Please fill location info for all deliveries (building/block/etc.).'
      }
      if (!d.meals || d.meals.length === 0) {
        return 'Missing meals for one of the deliveries.'
      }
    }
    return null
  }

  const handleContinue = () => {
    const validationError = validateDeliveries()
    if (validationError) {
      setError(validationError)
      return
    }

    setError(null)
    navigate('/review', {
      state: {
        subscriptionData: location.state?.subscriptionData,
        deliveries
      }
    })
  }

  return (
    <div className="delivery-page">
      <h1>Delivery Info</h1>
      {error && <p className="error">{error}</p>}
      {updateMessage && <p className="success">{updateMessage}</p>}

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
              onUpdated={handleDeliveryUpdated}
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
