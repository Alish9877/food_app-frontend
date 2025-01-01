import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import DeliveryCard from '../components/DeliveryCard'
import './DeliveryPage.css'

const DeliveryPage = () => {
  const location = useLocation()
  const [deliveries, setDeliveries] = useState([])

  useEffect(() => {
    if (location.state?.subscriptionData) {
      const { startingDay, deliveryTime, selectedMeals, totalPrice } =
        location.state.subscriptionData
      const existingDelivery = deliveries.find(
        (delivery) =>
          delivery.deliveryDate === startingDay &&
          delivery.deliveryTime === deliveryTime
      )

      if (!existingDelivery) {
        const newDelivery = {
          id: Date.now(), // Use a timestamp as a unique identifier
          deliveryDate: startingDay,
          deliveryTime,
          status: 'Pending',
          meals: selectedMeals,
          totalPrice
        }
        setDeliveries((prevDeliveries) => [...prevDeliveries, newDelivery])
      }
    }
  }, [location.state, deliveries])

  const handleSave = (updatedDelivery) => {
    setDeliveries((prevDeliveries) =>
      prevDeliveries.map((delivery) =>
        delivery.id === updatedDelivery.id ? updatedDelivery : delivery
      )
    )
    console.log('Saved delivery:', updatedDelivery)
  }

  return (
    <div className="delivery-page">
      <h1>Deliveries</h1>
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
          <p>No deliveries to display.</p>
        )}
      </div>
    </div>
  )
}

export default DeliveryPage
