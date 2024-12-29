import Client from "./api";


export const getAllMealPlans = async () => {
  try {
    const response = await Client.get('//meal-plans');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch Meal Plans:', error);
    throw error;
  }
}