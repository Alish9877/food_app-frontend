import './SubscriptionCard.css';

const SubscriptionCard = ({ subscription }) => {
  const { strMeal: mealPlanName, strCategory, strArea, strMealThumb: image } = subscription;

  return (
    <div className="subscription-card">
      <h3>Meal Plan: {mealPlanName}</h3>
      <img src={image} alt={mealPlanName} />
      <p>Category: {strCategory}</p>
      <p>Area: {strArea}</p>
    </div>
  );
};

export default SubscriptionCard;
