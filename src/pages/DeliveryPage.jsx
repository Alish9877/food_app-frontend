import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import DeliveryCard from '../components/DeliveryCard'
import './DeliveryPage.css'

const DeliveryPage = () => {
  const [deliveries, setDeliveries] = useState([])
  const [error, setError] = useState(null)
  const location = useLocation()

  useEffect(() => {
    // Check if there's subscription data passed from the previous page
    if (location.state && location.state.subscriptionData) {
      const { startingDay, deliveryTime, selectedMeals, totalPrice } =
        location.state.subscriptionData

      const newDelivery = {
        id: Date.now(), // Temporary unique ID
        deliveryDate: startingDay,
        deliveryTime,
        status: 'Pending',
        meals: selectedMeals,
        totalPrice
      }

      // Add the new delivery to the list
      setDeliveries((prev) => [...prev, newDelivery])
    }
  }, [location.state])

  const handleSave = async (updatedDelivery) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/deliveries',
        updatedDelivery
      )
      setDeliveries((prevDeliveries) =>
        prevDeliveries.map((delivery) =>
          delivery.id === updatedDelivery.id ? updatedDelivery : delivery
        )
      )
      console.log('Saved delivery:', response.data)
    } catch (error) {
      console.error('Error saving delivery:', error)
      setError('Failed to save delivery. Please try again later.')
    }
  }

  return (
    <div className="delivery-page">
      <h1>Deliveries</h1>
      {error && <p className="error">{error}</p>}
      <p>Track your meal deliveries here.</p>

      <div className="delivery-container">
        {deliveries.length > 0 ? (
          deliveries.map((delivery) => (
            <DeliveryCard
              key={delivery.id}
              delivery={delivery}
              handleSave={handleSave}
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
