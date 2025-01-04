const SubscriptionCard = ({ subscription, selectedMeals }) => {
  return (
    <div className="subscription-card">
      <h3>{subscription.mealPlanName || 'Your Selected Meals'}</h3>
      <p>Start Date: {subscription.startDate}</p>
      <p>Duration: {subscription.duration} months</p>
      <p>Meals Per Day: {subscription.mealsPerDay}</p>
      <p>Total Price: ${subscription.price}</p>
      <ul>
        {selectedMeals.map((meal, index) => {
          const imageSrc =
            meal.image?.url ||
            (meal.image?.data
              ? `data:${meal.image.contentType};base64,${Buffer.from(
                  meal.image.data
                ).toString('base64')}`
              : '')
          const mealName = meal.name || meal.strMeal || '(Unnamed Meal)'

          return (
            <li key={`${mealName}-${index}`}>
              {imageSrc && <img src={imageSrc} alt={mealName} />}
              {mealName}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SubscriptionCard
