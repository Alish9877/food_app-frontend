
import Client from './api';

// Fetch all meal plans
export const getAllMealPlans = async () => {
  try {
    const response = await Client.get('/meal-plans');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch meal plans:', error);
    throw error;
  }
};

// Create a new meal plan (Admin only)
export const createMealPlan = async (mealPlanData) => {
  try {
    const response = await Client.post('/meal-plans', mealPlanData);
    return response.data;
  } catch (error) {
    console.error('Failed to create meal plan:', error);
    throw error;
  }
};

// Update an existing meal plan (Admin only)
export const updateMealPlan = async (mealPlanId, mealPlanData) => {
  try {
    const response = await Client.put(`/meal-plans/${mealPlanId}`, mealPlanData);
    return response.data;
  } catch (error) {
    console.error('Failed to update meal plan:', error);
    throw error;
  }
};

// Delete a meal plan (Admin only)
export const deleteMealPlan = async (mealPlanId) => {
  try {
    const response = await Client.delete(`/meal-plans/${mealPlanId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete meal plan:', error);
    throw error;
  }
};

import Client from "./api";

// fetch all
export const getAllMealPlans = async () => {
  try {
    const response = await Client.get('//meal-plans')
    return response.data
  } catch (error) {
    console.error('Failed to fetch Meal Plans:', error)
    throw error
  }
}

// fetch by user
export const getUserMealPlan = async (mealPlanData) => {
  try {
    const response = await Client.get('/meal-plans' , mealPlanData)
    return response.data
  } catch (error) {
    console.error('Failed to fetch user Meal Plan:', error)
    throw error;
  }
}

// Update MealPlan (Admin only)
export const updateMealPlan = async (mealPlanId , mealPlanData) => {
  try {
    const response = await Client.put(`/meal-plans/${mealPlanId}` , mealPlanData)
    return response.data
  } catch (error) {
    console.error('Failed to update Meal Plans:', error)
    throw error
  }
}


// delete meal plan
export const deleteMealPlan = async(mealPlanId) => {
  try {
    const response = await Client.delete(`/meal-plans/${mealPlanId}`)
    return response.data
  } catch (error) {
    console.log('failed to delete meal plan:', error)
    throw error
  }
}


