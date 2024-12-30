const MealPlanCard = ({ mealPlan }) => {
  const { name, description, dishes } = mealPlan

  return (
    <div className="meal-plan-card">
      <h2>{name}</h2>
      <p>{description}</p>
      <ul>
        {dishes && dishes.map((dish, index) => <li key={index}>{dish}</li>)}
      </ul>
    </div>
  )
}

export default MealPlanCard
