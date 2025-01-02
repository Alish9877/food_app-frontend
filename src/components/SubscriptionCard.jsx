const SubscriptionCard = ({ subscription, selectedMeals }) => {
  const { mealPlanName, startDate, duration, mealsPerDay, price } = subscription

  return (
    <div className="subscription-card">
      <h3>Meal Plan: {mealPlanName || 'N/A'}</h3>
      <p>
        Start Date:{' '}
        {startDate ? new Date(startDate).toLocaleDateString() : 'N/A'}
      </p>
      <p>Duration: {duration || 'N/A'} months</p>
      <p>Meals Per Day: {mealsPerDay || 'N/A'}</p>
      <p>Price: ${price ? price.toFixed(2) : '0.00'}</p>
      <ul>
        {selectedMeals && selectedMeals.length > 0 ? (
          selectedMeals.map((meal, index) => <li key={index}>{meal}</li>)
        ) : (
          <p>No meals selected</p>
        )}
      </ul>
    </div>
  )
}

export default SubscriptionCard
