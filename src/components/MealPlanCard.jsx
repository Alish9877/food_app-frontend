import './MealPlanCard.css';

const MealPlanCard = ({ mealPlan, isSelected, handleAddMeal }) => {
  const { strMeal: mealPlanName, strCategory, strArea, strMealThumb: image, price } = mealPlan;

  return (
    <div className="meal-plan-card">
      <h3>Meal Plan: {mealPlanName}</h3>
      <img src={image} alt={mealPlanName} />
      <p>Category: {strCategory}</p>
      <p>Area: {strArea}</p>
      <p>Price: ${price}</p>
      <button
        className={`add-button ${isSelected ? 'selected' : ''}`}
        onClick={() => handleAddMeal(mealPlan)}
      >
        {isSelected ? 'Remove' : 'Add'}
      </button>
    </div>
  );
};

export default MealPlanCard;
