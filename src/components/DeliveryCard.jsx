import { useState } from 'react'
import './DeliveryCard.css'

const DeliveryCard = ({ delivery, onDeliveryChange, onUpdated }) => {
  const { id, status, meals, totalPrice } = delivery

  const [deliveryDate, setDeliveryDate] = useState(delivery.deliveryDate || '')
  const [building, setBuilding] = useState('')
  const [block, setBlock] = useState('')
  const [street, setStreet] = useState('')
  const [flat, setFlat] = useState('')

  const handleUpdateClick = () => {
    if (!deliveryDate) {
      alert('Delivery date is required and must be in the future!')
      return
    }
    if (!building && !block && !street && !flat) {
      alert('At least one address field must be provided.')
      return
    }

    const locationString = [
      building ? `Bldg ${building}` : '',
      block ? `Block ${block}` : '',
      street ? `St ${street}` : '',
      flat ? `Flat ${flat}` : ''
    ]
      .filter(Boolean)
      .join(', ')

    const updatedDelivery = {
      ...delivery,
      deliveryDate,
      status: status || 'Pending',
      location: locationString,
      meals: meals || []
    }

    onDeliveryChange(updatedDelivery)
    if (onUpdated) onUpdated()
  }

  return (
    <div className="delivery-card">
      <h3>Delivery #{id}</h3>
      <p>Status: {status || 'Pending'}</p>
      <ul>
        {meals?.map((meal, index) => (
          <li key={index}>{meal}</li>
        ))}
      </ul>
      <p>Total Price: ${totalPrice ? totalPrice.toFixed(2) : '0.00'}</p>

      <label>Delivery Date (must be future):</label>
      <input
        type="date"
        value={deliveryDate}
        onChange={(e) => setDeliveryDate(e.target.value)}
      />

      <div className="optional-fields">
        <input
          type="text"
          placeholder="Building"
          value={building}
          onChange={(e) => setBuilding(e.target.value)}
        />
        <input
          type="text"
          placeholder="Block"
          value={block}
          onChange={(e) => setBlock(e.target.value)}
        />
        <input
          type="text"
          placeholder="Street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <input
          type="text"
          placeholder="Flat"
          value={flat}
          onChange={(e) => setFlat(e.target.value)}
        />
      </div>

      <button onClick={handleUpdateClick}>Update Delivery</button>
    </div>
  )
}

export default DeliveryCard
