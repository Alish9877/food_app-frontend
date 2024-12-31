const SubscriptionCard = ({ subscription }) => {
  const { mealPlanName, startDate, duration, mealsPerDay, price } = subscription
  return (
    <div className="subscription-card">
      <h3>Meal Plan: {mealPlanName}</h3>
      <p>Start Date: {new Date(startDate).toLocaleDateString()}</p>
      <p>Duration: {duration} months</p>
      <p>Meals Per Day: {mealsPerDay}</p>
      <p>Price: ${price.toFixed(2)}</p>
    </div>
  )
}
export default SubscriptionCard