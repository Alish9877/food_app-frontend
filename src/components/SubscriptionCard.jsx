const SubscriptionCard = ({ subscription, selectedMeals }) => {
  const { mealPlanName, startDate, duration, mealsPerDay, price } = subscription

  return (
    <div className="subscription-card">
      <h3> {mealPlanName}</h3>
      <p>Start Date: {new Date(startDate).toLocaleDateString()}</p>
      <p>Duration: {duration} months</p>
      <p>Meals Per Day: {mealsPerDay}</p>
      <p>Price: ${price.toFixed(2)}</p>
      <h4>Selected Meals:</h4>
      <ul>
        {selectedMeals.map((meal, index) => (
          <li key={index}>{meal}</li>
        ))}
      </ul>
    </div>
  )
}

export default SubscriptionCard
