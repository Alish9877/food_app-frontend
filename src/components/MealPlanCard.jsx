import React from "react";

// Destructure the 'mealPlan' prop correctly
const MealPlanCard = ({ mealPlan }) => {
  return (
    <div className="meal-plan-card">
      <h2>{mealPlan.title}</h2>
      <p><strong>Meal Per Day:</strong> {mealPlan.MealPerDay}</p>
      <p><strong>Calories:</strong> {mealPlan.Calories}</p>
      <p><strong>Price:</strong> {mealPlan.Price}</p>
      <p><strong>Description:</strong> {mealPlan.Description}</p>
    </div>
  )
}

export default MealPlanCard
