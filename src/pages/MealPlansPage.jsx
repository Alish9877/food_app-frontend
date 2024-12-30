// Placeholder for imports

const MealPlansPage = () => {
  const MealPlans = [
    {
      title: 'Weight Loss Plan',
      MealPerDay: '2-3 meals',
      Calories: 1400,
      Price: '100 BD',
      Description: 'This plan is designed for individuals looking to lose weight. With a daily intake of 1400 calories, it offers a combination of low-calorie, nutrient-dense meals to keep customers satisfied while promoting weight loss.'
    },
    {
      title: 'High Protein Plan',
      MealPerDay: '2-3 meals',
      Calories: 2000,
      Price: '120 BD',
      Description: 'This plan is ideal for people looking to build or maintain muscle mass. With 2000 calories per day, the meals are designed to be high in protein, helping customers feel full and support their workout recovery.'
    },
    {
      title: 'Keto Meal Plan',
      MealPerDay: '2-3 meals',
      Calories: 1600,
      Price: '110 BD',
      Description: 'Designed for keto dieters, this plan focuses on low-carb, high-fat meals to help customers stay in ketosis and burn fat. Each meal is carefully crafted to ensure the appropriate macronutrient balance for keto.'
    },
    {
      title: 'Vegan Plan',
      MealPerDay: '2-3 meals',
      Calories: 1600,
      Price: '105 BD',
      Description: 'This vegan meal plan offers plant-based meals that provide all the essential nutrients, with a focus on whole foods like beans, lentils, quinoa, and vegetables. Perfect for those looking to eat sustainably and healthily.'
    },
    {
      title: 'Mixed Meal Plan',
      MealPerDay: '2-3 meals',
      Calories: 1800,
      Price: '115 BD',
      Description: 'Ideal for those who want a bit of everything—high-protein meals, low-carb options, and plant-based dishes. This plan offers variety each week and helps customers maintain a balanced diet while meeting their energy needs.'
    },
    {
      title: 'Family Meal Plan',
      MealPerDay: '2-3 meals',
      Calories: 2200,
      Price: '150 BD',
      Description: 'This plan is designed for families or individuals who require larger portions. With 2200 calories per day, the meals provide a combination of nutritious, hearty dishes for everyone.'
    }
  ]
  



  return (
    <div className="meal-plans-page">
      <h1>Available Meal Plans:</h1>
      <p>Browse available meal plans and choose one that fits your needs.</p>
    </div>
  );
};

export default MealPlansPage;
