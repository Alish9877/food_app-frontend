import React from 'react';
import './MealPlanCard.css';

const MealPlanCard = ({ mealPlan }) => {
  const { strMeal: mealPlanName, strCategory, strArea, strMealThumb: image, price } = mealPlan;

  return (
    <div className="meal-plan-card">
      <h3>Meal Plan: {mealPlanName}</h3>
      <img src={image} alt={mealPlanName} />
      <p>Category: {strCategory}</p>
      <p>Area: {strArea}</p>
      <p>Price: ${price}</p>
    </div>
  );
};

export default MealPlanCard;
