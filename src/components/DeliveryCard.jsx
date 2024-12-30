const DeliveryCard = ({ delivery }) => {
  const { deliveryDate, status, meals } = delivery

  return (
    <div className="delivery-card">
      <h3>Delivery Date: {new Date(deliveryDate).toLocaleDateString()}</h3>
      <p>Status: {status}</p>
      <ul>
        {meals && meals.map((meal, index) => <li key={index}>{meal}</li>)}
      </ul>
    </div>
  )
}

export default DeliveryCard
