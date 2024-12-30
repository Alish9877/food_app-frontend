// Placeholder for imports
import './MealPlan.css';
const MealPlanCard = ({ mealPlan }) => {
  // Placeholder: Destructure meal plan details as needed
  const { name, description, dishes } = mealPlan;

  return (
    <div className="meal-plan-card">
      <h2>{name}</h2>
      <p>{description}</p>
      <ul>
        {dishes && dishes.map((dish, index) => (
          <li key={index}>{dish}</li>
        ))}
      </ul>
    </div>
  );
};

export default MealPlanCard;
