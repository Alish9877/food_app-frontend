import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MealPlanCard from '../components/MealPlanCard'; 
import './MealPlansPage.css';

const MealPlansPage = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    fetchMealPlans();
  }, []);

  const fetchMealPlans = async () => {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s');
      const mealsWithPrice = response.data.meals.map(meal => {
        let price;
        switch (meal.strCategory) {
          case 'Seafood':
            price = 20;
            break;
          case 'Beef':
            price = 15;
            break;
          case 'Chicken':
            price = 12;
            break;
          case 'Vegetarian':
            price = 10;
            break;
          case 'Dessert':
            price = 8;
            break;
          default:
            price = 5;
        }
        return { ...meal, price };
      });

      setMealPlans(mealsWithPrice);
      const uniqueCategories = [...new Set(mealsWithPrice.map(meal => meal.strCategory))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching meal plans:', error);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((c) => c !== category)
        : [...prevSelected, category]
    );
  };

  const filteredMealPlans = selectedCategories.length
    ? mealPlans.filter((meal) => selectedCategories.includes(meal.strCategory))
    : mealPlans;

  return (
    <div className="meal-plans-page">
      <h1>Meal Plans</h1>
      <div className="filter-container">
        {categories.map((category) => (
          <label key={category}>
            <input
              type="checkbox"
              value={category}
              onChange={() => handleCategoryChange(category)}
            />
            {category}
          </label>
        ))}
      </div>
      <div className="meal-plan-container">
        {filteredMealPlans.map((mealPlan) => (
          <MealPlanCard key={mealPlan.idMeal} mealPlan={mealPlan} />
        ))}
      </div>
    </div>
  );
};

export default MealPlansPage;
