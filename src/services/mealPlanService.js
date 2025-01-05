import Client from './api'

// Fetch all meal plans
export const fetchAllMealPlans = async () => {
  try {
    const res = await Client.get('/meal-plans')
    return res.data
  } catch (error) {
    console.error('Error fetching meal plans:', error)
    throw error.response?.data || 'Error fetching meal plans'
  }
}

// Fetch a specific meal plan by ID
export const fetchMealPlanById = async (mealPlanId) => {
  try {
    const res = await Client.get(`/meal-plans/${mealPlanId}`)
    return res.data
  } catch (error) {
    console.error('Error fetching meal plan by ID:', error)
    throw error.response?.data || 'Error fetching meal plan by ID'
  }
}

// Create a new meal plan (Admin only)
export const createMealPlan = async (mealPlanData, imageFile) => {
  const formData = new FormData()
  Object.keys(mealPlanData).forEach((key) => {
    formData.append(key, mealPlanData[key])
  })
  if (imageFile) {
    formData.append('image', imageFile)
  }
  const res = await Client.post('/meal-plans', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return res.data
}

// Update an existing meal plan (Admin only)
export const updateMealPlan = async (mealPlanId, mealPlanData) => {
  try {
    const res = await Client.put(`/meal-plans/${mealPlanId}`, mealPlanData)
    return res.data
  } catch (error) {
    console.error('Error updating meal plan:', error)
    throw error.response?.data || 'Error updating meal plan'
  }
}

// Delete a meal plan (Admin only)
export const deleteMealPlan = async (mealPlanId) => {
  try {
    const res = await Client.delete(`/meal-plans/${mealPlanId}`)
    return res.data
  } catch (error) {
    console.error('Error deleting meal plan:', error)
    throw error.response?.data || 'Error deleting meal plan'
  }
}

export const importExternalMealPlan = async (externalMeal) => {
  try {
    const res = await Client.post('/meal-plans/import-external', {
      externalMeal
    })
    return res.data
  } catch (error) {
    console.error('Error importing external meal plan:', error)
    throw error
  }
}
